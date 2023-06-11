package jessica

import (
	"github.com/gobwas/ws"
	. "m7s.live/engine/v4"
	"m7s.live/engine/v4/util"
)

type JessicaH26x struct {
	JessicaBase
}

func (j *JessicaH26x) OnEvent(event any) {
	switch v := event.(type) {
	case VideoFrame:
		annexB := v.GetAnnexB()
		if j.IsWebSocket {
			if err := ws.WriteHeader(j, ws.Header{
				Fin:    true,
				OpCode: ws.OpBinary,
				Length: int64(util.SizeOfBuffers(annexB)),
			}); err != nil {
				j.Stop()
				return
			}
		}
		if _, err := annexB.WriteTo(j.Writer); err != nil {
			j.Stop()
		}
	default:
		j.Subscriber.OnEvent(event)
	}
}
