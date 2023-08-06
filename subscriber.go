package jessica

import (
	"encoding/binary"
	"net"
	"net/http"
	"path"
	"strings"
	"time"

	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
	"github.com/pion/rtp"
	"go.uber.org/zap"
	. "m7s.live/engine/v4"

	"m7s.live/engine/v4/track"
	"m7s.live/engine/v4/util"
)

type JessicaBase struct {
	Subscriber
	IsWebSocket bool
}
type JessicaSubscriber struct {
	JessicaBase
	head []byte
}

func (j *JessicaSubscriber) WriteAVCC(typ byte, ts uint32, avcc ...[]byte) {
	j.head[0] = typ
	binary.BigEndian.PutUint32(j.head[1:], ts)
	err := ws.WriteHeader(j, ws.Header{
		Fin:    true,
		OpCode: ws.OpBinary,
		Length: int64(util.SizeOfBuffers(avcc) + 5),
	})
	defer func() {
		if err != nil {
			j.Stop(zap.Error(err))
		}
	}()
	if err != nil {
		return
	}
	var clone net.Buffers
	clone = append(append(clone, j.head), avcc...)
	if jessicaConfig.WriteTimeout > 0 {
		j.Writer.(net.Conn).SetWriteDeadline(time.Now().Add(jessicaConfig.WriteTimeout))
	}
	_, err = clone.WriteTo(j.Writer)
}

func (j *JessicaSubscriber) OnEvent(event any) {
	switch v := event.(type) {
	case AudioDeConf:
		j.WriteAVCC(1, 0, v)
	case VideoDeConf:
		j.WriteAVCC(2, 0, v)
	case AudioFrame:
		j.WriteAVCC(1, v.AbsTime, v.AVCC.ToBuffers()...)
	case VideoFrame:
		j.WriteAVCC(2, v.AbsTime, v.AVCC.ToBuffers()...)
	default:
		j.Subscriber.OnEvent(event)
	}
}

func (j *JessicaConfig) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ext := path.Ext(r.URL.Path)
	streamPath := strings.TrimPrefix(r.URL.Path, "/")
	streamPath = strings.TrimSuffix(streamPath, ext)
	if r.URL.RawQuery != "" {
		streamPath += "?" + r.URL.RawQuery
	}
	baseStream := JessicaBase{}
	var conn net.Conn
	var err error
	if r.Header.Get("Upgrade") == "websocket" {
		baseStream.IsWebSocket = true
		conn, _, _, err = ws.UpgradeHTTP(r, w)
		if err != nil {
			return
		}
	} else {
		if ext == ".flv" {
			w.Header().Set("Content-Type", "video/x-flv")
		} else {
			w.Header().Set("Content-Type", "application/octet-stream")
		}
		w.Header().Set("Transfer-Encoding", "identity")
		w.WriteHeader(http.StatusOK)
		if hijacker, ok := w.(http.Hijacker); ok && j.WriteTimeout > 0 {
			conn, _, _ = hijacker.Hijack()
			conn.SetWriteDeadline(time.Now().Add(j.WriteTimeout))
		} else {
			w.(http.Flusher).Flush()
		}
	}
	if conn == nil { //注入writer
		baseStream.SetIO(w)
	} else {
		baseStream.SetIO(conn)
	}
	baseStream.SetParentCtx(r.Context()) //注入context
	baseStream.ID = r.RemoteAddr
	var specific ISubscriber
	copyConfig := *&j.Subscribe
	switch ext {
	case ".flv":
		specific = &JessicaFLV{baseStream}
	case ".h264", ".h265":
		copyConfig.SubVideoTracks = strings.Split(ext, ".")[1:]
		copyConfig.SubAudio = false
		baseStream.Config = &copyConfig
		specific = &JessicaH26x{baseStream}
	default:
		specific = &JessicaSubscriber{baseStream, make([]byte, 5)}
	}

	if err = JessicaPlugin.Subscribe(streamPath, specific); err != nil {
		if baseStream.IsWebSocket {
			wsutil.WriteServerText(conn, []byte(err.Error()))
		} else {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}
		return
	}
	play := specific.PlayRaw
	if ext == ".flv" {
		play = specific.PlayFLV
	}
	defer specific.Stop()
	if baseStream.IsWebSocket {
		go play()
		b, err := wsutil.ReadClientBinary(conn)
		var rtpPacket rtp.Packet
		if err == nil {
			dc := track.NewDataTrack[[]byte]("voice")
			dc.Attach(specific.GetSubscriber().Stream)
			for err == nil {
				err = rtpPacket.Unmarshal(b)
				if err == nil {
					dc.Push(rtpPacket.Payload)
				}
				b, err = wsutil.ReadClientBinary(conn)
			}
		} else {
			// baseStream.Error("receive", zap.Error(err))
		}
	} else {
		play()
	}
}
