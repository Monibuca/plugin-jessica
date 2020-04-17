<template>
    <Modal
        v-bind="$attrs"
        draggable
        v-on="$listeners"
        :title="url"
        @on-ok="onClosePreview"
        @on-cancel="onClosePreview"
    >
        <canvas id="canvas" width="488" height="275" style="background: black" />
        <div slot="footer">
            <Button v-if="audioEnabled" @click="turnOff" icon="md-volume-up" />
            <Button v-else @click="turnOn" icon="md-volume-off"></Button>
        </div>
    </Modal>
</template>

<script>
let h5lc = null;
export default {
    name: "Jessibuca",
    props: {
        audioCodec: String,
        videoCodec: String
    },
    data() {
        return {
            audioEnabled: true,
            url: "",
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
                decoder: value
            });
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
            h5lc.play(url);
        },
        onClosePreview() {
            h5lc.close();
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

