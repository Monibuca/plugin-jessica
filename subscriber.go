package jessica

import (
	"encoding/binary"
	"net"
	"net/http"
	"regexp"
	"time"

	"github.com/gobwas/ws"
	. "m7s.live/engine/v4"
	"m7s.live/engine/v4/codec"
	"m7s.live/engine/v4/util"
)

var streamPathReg = regexp.MustCompile("/(jessica/)?((.+)(\\.flv)|(.+))")

type JessicaSubscriber struct {
	Subscriber
	head []byte
}

func (j *JessicaSubscriber) WriteAVCC(avcc net.Buffers, typ byte, ts uint32) {
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
	j.Writer.(net.Conn).SetWriteDeadline(time.Now().Add(time.Second * time.Duration(jessicaConfig.WriteTimeout)))
	_, err = clone.WriteTo(j)
}

func (j *JessicaSubscriber) OnEvent(event any) {
	switch v := event.(type) {
	case AudioDeConf:
		j.WriteAVCC(v.AVCC, 1, 0)
	case VideoDeConf:
		j.WriteAVCC(v.AVCC, 2, 0)
	case *AudioFrame:
		j.WriteAVCC(v.AVCC, 1, v.AbsTime-j.SkipTS)
	case *VideoFrame:
		j.WriteAVCC(v.AVCC, 2, v.AbsTime-j.SkipTS)
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
	if _, err := tag.WriteTo(j); err != nil {
		j.Stop()
	}
}

func (j *JessicaFLV) OnEvent(event any) {
	switch v := event.(type) {
	case ISubscriber:
		if err := ws.WriteHeader(j, ws.Header{
			Fin:    true,
			OpCode: ws.OpBinary,
			Length: int64(13),
		}); err != nil {
			j.Stop()
		}
		if _, err := j.Write(codec.FLVHeader); err != nil {
			j.Stop()
		}
	case FLVFrame:
		j.WriteFLVTag(v)
	default:
		j.Subscriber.OnEvent(event)
	}
}

func (j *JessicaConfig) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	isFlv := false
	parts := streamPathReg.FindStringSubmatch(r.RequestURI)
	if parts == nil {
		w.WriteHeader(404)
		return
	}
	streamPath := parts[3]
	if streamPath == "" {
		streamPath = parts[5]
	} else {
		isFlv = true
	}
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
	}
	go func() {
		b := []byte{0}
		for _, err := conn.Read(b); err == nil; _, err = conn.Read(b) {

		}
		specific.Stop()
	}()
	if isFlv {
		specific.PlayFLV()
	} else {
		specific.PlayRaw()
	}
}
