package jessica

import (
	"encoding/binary"
	"net"
	"net/http"
	"strings"
	"time"

	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
	"github.com/pion/rtp"
	. "m7s.live/engine/v4"
	"m7s.live/engine/v4/codec"
	"m7s.live/engine/v4/util"
)

type JessicaSubscriber struct {
	Subscriber
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
			j.Stop()
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

type JessicaFLV struct {
	Subscriber
}

func (j *JessicaFLV) WriteFLVTag(tag FLVFrame) {
	if err := ws.WriteHeader(j, ws.Header{
		Fin:    true,
		OpCode: ws.OpBinary,
		Length: int64(util.SizeOfBuffers(tag)),
	}); err != nil {
		j.Stop()
		return
	}
	if _, err := tag.WriteTo(j.Writer); err != nil {
		j.Stop()
	}
}

func (j *JessicaFLV) OnEvent(event any) {
	switch v := event.(type) {
	case ISubscriber:
		if err := wsutil.WriteServerBinary(j, codec.FLVHeader); err != nil {
			j.Stop()
		}
	case FLVFrame:
		j.WriteFLVTag(v)
	default:
		j.Subscriber.OnEvent(event)
	}
}

func (j *JessicaConfig) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	isFlv := strings.HasSuffix(r.URL.Path, ".flv")
	streamPath := strings.TrimSuffix(strings.TrimPrefix(r.URL.Path, "/"), ".flv")
	if r.URL.RawQuery != "" {
		streamPath += "?" + r.URL.RawQuery
	}
	conn, _, _, err := ws.UpgradeHTTP(r, w)
	if err != nil {
		return
	}
	baseStream := Subscriber{}
	baseStream.SetIO(conn)               //注入writer
	baseStream.SetParentCtx(r.Context()) //注入context
	baseStream.ID = r.RemoteAddr
	var specific ISubscriber
	if isFlv {
		specific = &JessicaFLV{baseStream}
	} else {
		specific = &JessicaSubscriber{baseStream, make([]byte, 5)}
	}
	if err = JessicaPlugin.Subscribe(streamPath, specific); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if isFlv {
		go specific.PlayFLV()
	} else {
		go specific.PlayRaw()
	}
	defer specific.Stop()
	b, err := wsutil.ReadClientBinary(conn)
	var rtpPacket rtp.Packet
	if err == nil {
		dc := specific.GetSubscriber().Stream.NewDataTrack("voice", nil)
		dc.Attach()
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
}
