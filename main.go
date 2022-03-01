package jessica // import "m7s.live/plugin/jessica/v4"

import (
	. "m7s.live/engine/v4"
	"m7s.live/engine/v4/config"
)

type JessicaConfig struct {
	config.HTTP
	config.Subscribe
}

var plugin = InstallPlugin(new(JessicaConfig))

func (j *JessicaConfig) OnEvent(event any) {
}
