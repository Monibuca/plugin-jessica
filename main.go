package jessica // import "m7s.live/plugin/jessica/v4"

import (
	. "m7s.live/engine/v4"
	"m7s.live/engine/v4/config"
)

type JessicaConfig struct {
	config.HTTP
	config.Subscribe
}
var jessicaConfig = new(JessicaConfig)
var JessicaPlugin = InstallPlugin(jessicaConfig)

func (j *JessicaConfig) OnEvent(event any) {
}
