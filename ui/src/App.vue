<template>
    <div>
        <stream-table>
            <template v-slot="scope">
                <m-button @click="preview(scope)">预览</m-button>
            <template>
        </stream-table>
        <Jessibuca ref="jessibuca" v-model="showPreview"
            :port="ListenAddr.split(':').pop()"
            :videoCodec="currentStream && CodecID(currentStream.VideoInfo.CodecID)"
            :audioCodec="currentStream && SoundFormat(currentStream.AudioInfo.SoundFormat)"></Jessibuca>
        <!-- <Subscribers :data="currentStream && currentStream.SubscriberInfo || []" v-model="showSubscribers" /> -->
    </div>
</template>

<script>
import Jessibuca from "./components/Jessibuca";
// import Subscribers from "./components/Subscribers";
let summaryES = null;
export default {
    components: {
        Jessibuca,
        // Subscribers,
    },
    props: {
        ListenAddr: String
    },
    data() {
        return {
            showPreview: false,
            currentStream: null,
            showSubscribers: false,
        };
    },
    computed: {
        host() {
            return location.hostname + ":" + this.ListenAddr.split(":").pop();
        }
    },
    methods: {
        preview({row}) {
            this.currentStream = row;
            this.onPlay(this.host + "/" + row.StreamPath);
        },
        onPlay(url) {
            this.showPreview = true;
            this.$nextTick(() => this.$refs.jessibuca.play(url));
        },
        onShowDetail(item) {
            this.showSubscribers = true;
            this.currentStream = item;
        }
    },
    destroyed() {
        if (this.$refs.jessibuca) this.$refs.jessibuca.destroy();
    }
};
</script>

<style scoped>
td {
    padding-left: 5px;
    padding-right: 5px;
}

.empty {
    color: #eb5e46;
    width: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}
</style>