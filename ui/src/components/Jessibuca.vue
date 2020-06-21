<template>
    <Modal
        v-bind="$attrs"
        draggable
        v-on="$listeners"
        :title="targetURL"
        @on-ok="onClosePreview"
        @on-cancel="onClosePreview"
    >
        <video ref="flvjs" v-show="protocol=='flv.js'" style="width:488px;height:275px"></video>
        <canvas id="canvas" width="488" height="275" style="background: black" v-show="protocol!='flv.js'" />
        <div slot="footer">
            <mu-radio value="ws-raw" v-model="protocol" label="ws-raw"></mu-radio>
            <mu-radio value="ws-flv" v-model="protocol" label="ws-flv"></mu-radio>
            <mu-radio value="http-flv" v-model="protocol" label="http-flv"></mu-radio>
            <mu-radio value="flv.js" v-model="protocol" label="flv.js"></mu-radio>
            <!-- <Button v-if="audioEnabled" @click="turnOff" icon="md-volume-up" />
            <Button v-else @click="turnOn" icon="md-volume-off"></Button>-->
        </div>
    </Modal>
</template>
<style scoped>
</style>
<script>
let h5lc = null;
let flvPlayer = null;
import flvjs from "flv.js";
export default {
    name: "Jessibuca",
    props: {
        audioCodec: String,
        videoCodec: String,
        port:String
    },
    data() {
        return {
            audioEnabled: true,
            protocol: "ws-raw",
            url: "",
            targetURL: "",
            decoderTable: {
                AAC_AVC: "ff",
                AAC_H265: "hevc_aac",
                MP3_AVC: "ff_mp3",
                MP3_H265: "hevc_mp3",
                AVC: "ff",
                H265: "hevc_aac"
            }
        };
    },
    watch: {
        audioEnabled(value) {
            h5lc.audioEnabled(value);
        },
        decoder(value) {
            if (h5lc) {
                h5lc.destroy();
            }
            h5lc = new window.Jessibuca({
                canvas: document.getElementById("canvas"),
                decoder: value,
                videoBuffer:0.2
            });
        },
        protocol(v) {
            switch (v) {
                case "ws-raw":
                    this.targetURL = "ws://" + this.url;
                    break;
                case "ws-flv":
                    this.targetURL = "ws://" + this.url + ".flv";
                    break;
                case "http-flv":
                    this.targetURL = "http://" + this.url.replace(this.port,"2020") + ".flv";
                    break;
                case "flv.js":
                    h5lc.close();
                    this.targetURL = "ws://" + this.url + ".flv"
                    flvPlayer = flvjs.createPlayer(
                        {
                            type: "flv",
                            isLive: true,
                            url: this.targetURL
                        },
                        {
                            fixAudioTimestampGap: false
                        }
                    );
                    flvPlayer.attachMediaElement(this.$refs.flvjs);
                    flvPlayer.load();
                    flvPlayer.play();
            }
           if(v!="flv.js"){
               h5lc.play(this.targetURL);
               if(flvPlayer) {
                    flvPlayer.destroy();
                    flvPlayer = null;
                }
           }
        }
    },
    computed: {
        decoder() {
            let js = this.decoderTable[this.audioCodec + "_" + this.videoCodec];
            if (!js) {
                js = this.decoderTable[this.videoCodec] || "ff";
            }
            return "jessibuca/" + js + ".js";
        }
    },
    mounted() {
        let s = document.createElement("script");
        s.src = "/jessibuca/renderer.js";
        s.onload = function() {
            s.onload = null;
            h5lc = new window.Jessibuca({
                canvas: document.getElementById("canvas"),
                decoder: "jessibuca/ff.js"
            });
        };
        this.$root.$el.append(s);
    },
    methods: {
        play(url) {
            this.url = url;
            if (this.protocol == "ws-raw") {
                this.targetURL = "ws://" + url;
                h5lc.play(this.targetURL);
            } else {
                this.protocol = "ws-raw";
            }
        },
        onClosePreview() {
            h5lc.close();
            flvPlayer.destroy();
        },
        destroy() {
            h5lc.destroy();
        },
        turnOn() {
            this.audioEnabled = true;
        },
        turnOff() {
            this.audioEnabled = false;
        }
    }
};
</script>

