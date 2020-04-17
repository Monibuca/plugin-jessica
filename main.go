package jessica

import (
	"io/ioutil"
	"log"
	"mime"
	"net/http"
	"path"
	"strings"

	. "github.com/Monibuca/engine"
	. "github.com/Monibuca/engine/util"
)

var config = new(ListenerConfig)
var publicPath string

func init() {
	InstallPlugin(&PluginConfig{
		Name:   "Jessica",
		Type:   PLUGIN_SUBSCRIBER,
		Config: config,
		Run:    run,
	})
}
func run() {
	log.Printf("server Jessica start at %s", config.ListenAddr)
	http.HandleFunc("/jessibuca/", jessibuca)
	log.Fatal(http.ListenAndServe(config.ListenAddr, http.HandlerFunc(WsHandler)))
}
func jessibuca(w http.ResponseWriter, r *http.Request) {
	filePath := strings.TrimPrefix(r.URL.Path, "/jessibuca")
	if mime := mime.TypeByExtension(path.Ext(filePath)); mime != "" {
		w.Header().Set("Content-Type", mime)
	}
	if f, err := ioutil.ReadFile(publicPath + filePath); err == nil {
		if _, err = w.Write(f); err != nil {
			w.WriteHeader(500)
		}
	} else {
		w.WriteHeader(404)
	}
}
