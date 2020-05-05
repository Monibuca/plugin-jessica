package jessica

import (
	"io/ioutil"
	"log"
	"mime"
	"net/http"
	"path"
	"path/filepath"
	"strings"

	. "github.com/Monibuca/engine/v2"
	. "github.com/logrusorgru/aurora"
)

var config = new(ListenerConfig)
var publicPath string

func init() {
	plugin := &PluginConfig{
		Name:   "Jessica",
		Type:   PLUGIN_SUBSCRIBER,
		Config: config,
		Run:    run,
	}
	InstallPlugin(plugin)
	publicPath = filepath.Join(plugin.Dir, "ui", "public")
}
func run() {
	Print(Green("server Jessica start at"), BrightBlue(config.ListenAddr))
	http.HandleFunc("/jessibuca/", jessibuca)
	log.Fatal(http.ListenAndServe(config.ListenAddr, http.HandlerFunc(WsHandler)))
}
func jessibuca(w http.ResponseWriter, r *http.Request) {
	filePath := strings.TrimPrefix(r.URL.Path, "/jessibuca")
	if mime := mime.TypeByExtension(path.Ext(filePath)); mime != "" {
		w.Header().Set("Content-Type", mime)
	}
	if f, err := ioutil.ReadFile(filepath.Join(publicPath, filePath)); err == nil {
		if _, err = w.Write(f); err != nil {
			w.WriteHeader(500)
		}
	} else {
		w.WriteHeader(404)
	}
}
