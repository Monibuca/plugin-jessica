package jessica

import (
	"encoding/binary"
	"net"
	"net/http"
	"regexp"

	. "github.com/Monibuca/engine/v4"
	"github.com/Monibuca/engine/v4/codec"
	"github.com/Monibuca/engine/v4/common"
	"github.com/Monibuca/engine/v4/util"
	"github.com/gobwas/ws"
)

var streamPathReg = regexp.MustCompile("/(jessica/)?((.+)(\\.flv)|(.+))")

type JessicaSubscriber struct {
	Subscriber
	head []byte
}

func (j *JessicaSubscriber) WriteAVCC(avcc net.Buffers) {
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
	if _, err = j.Write(j.head); err != nil {
		return
	}
	_, err = avcc.WriteTo(j)
}

func (j *JessicaSubscriber) OnEvent(event any) {
	switch v := event.(type) {
	case AudioDeConf:
		j.head[0] = 1
		binary.BigEndian.PutUint32(j.head[1:], 0)
		j.WriteAVCC(v.AVCC)
	case VideoDeConf:
		j.head[0] = 2
		binary.BigEndian.PutUint32(j.head[1:], 0)
		j.WriteAVCC(v.AVCC)
	case AudioFrame:
		j.head[0] = 1
		binary.BigEndian.PutUint32(j.head[1:], v.AbsTime)
		j.WriteAVCC(v.AVCC)
	case VideoFrame:
		j.head[0] = 2
		binary.BigEndian.PutUint32(j.head[1:], v.AbsTime)
		j.WriteAVCC(v.AVCC)
	default:
		j.Subscriber.OnEvent(event)
	}
}

type JessicaFLV struct {
	Subscriber
}

func (j *JessicaFLV) WriteFLVTag(tag net.Buffers) {
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
	case AudioDeConf:
		j.WriteFLVTag(v.FLV)
	case VideoDeConf:
		j.WriteFLVTag(v.FLV)
	case common.MediaFrame:
		j.WriteFLVTag(v.GetFLV())
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
	conn, _, _, err := ws.UpgradeHTTP(r, w)
	if err != nil {
		return
	}
	baseStream := Subscriber{}
	baseStream.ID = r.RemoteAddr
	var specific ISubscriber
	if isFlv {
		specific = &JessicaFLV{baseStream}
	} else {
		specific = &JessicaSubscriber{baseStream, make([]byte, 5)}
	}
	go func() {
		b := []byte{0}
		for _, err := conn.Read(b); err == nil; _, err = conn.Read(b) {

		}
		specific.Stop()
	}()

	if err := plugin.Subscribe(streamPath, specific); err == nil {
		specific.OnEvent(conn)        //注入writer
		specific.OnEvent(r.Context()) //注入context
		if isFlv {
			if err := ws.WriteHeader(conn, ws.Header{
				Fin:    true,
				OpCode: ws.OpBinary,
				Length: int64(13),
			}); err != nil {
				specific.Stop()
				return
			}
			if _, err := conn.Write(codec.FLVHeader); err != nil {
				specific.Stop()
			}
		}
		specific.PlayBlock(specific)
	} else {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
}
