package jessica

import (
	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
	"go.uber.org/zap"
	. "m7s.live/engine/v4"
	"m7s.live/engine/v4/codec"
	"m7s.live/engine/v4/util"
)

type JessicaFLV struct {
	JessicaBase
}

func (j *JessicaFLV) WriteFLVTag(tag FLVFrame) {
	if j.IsWebSocket {
		if err := ws.WriteHeader(j, ws.Header{
			Fin:    true,
			OpCode: ws.OpBinary,
			Length: int64(util.SizeOfBuffers(tag)),
		}); err != nil {
			j.Stop(zap.Error(err))
			return
		}
	}
	if _, err := tag.WriteTo(j.Writer); err != nil {
		j.Stop(zap.Error(err))
	}
}

func (j *JessicaFLV) OnEvent(event any) {
	switch v := event.(type) {
	case ISubscriber:
		if err := wsutil.WriteServerBinary(j, codec.FLVHeader); err != nil {
			j.Stop(zap.Error(err))
		}
	case FLVFrame:
		j.WriteFLVTag(v)
	default:
		j.Subscriber.OnEvent(event)
	}
}
