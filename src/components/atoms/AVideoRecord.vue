<template>
  <video id="vid" ref="myVideo" class="video-js vjs-default-skin" playsinline></video>
</template>

<script>
/* eslint-disable */
import 'video.js/dist/video-js.css'
import 'videojs-record/dist/css/videojs.record.css'
import videojs from 'video.js'
import 'webrtc-adapter'
import RecordRTC from 'recordrtc'
import Record from 'videojs-record/dist/videojs.record.js'

export default {
  data() {
    return {
      player: '',
      options: {
        controls: true,
        autoplay: false,
        fluid: false,
        loop: false,
        width: 620,
        height: 340,
        bigPlayButton: false,
        controlBar: {
          volumePanel: false
        },
        plugins: {
          record: {
            audio: true,
            video: true,
            debug: true,
            maxLength: 300
          }
        }
      }
    };
  },
  mounted() {
    /* eslint-disable no-console */
    this.initPlayer()

    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
        console.log('started recording!');
    });

    const blobToBase64 = blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
        blobToBase64(this.player.recordedData).then((res) => {
          this.$emit('media', res);
          this.$emit('player', this.player);
        })
    });

    // error handling
    this.player.on('error', (element, error) => {
        console.warn(error);
    });

    this.player.on('deviceError', () => {
        console.error('device error:', this.player.deviceErrorCode);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    initPlayer() {
      this.player = videojs(this.$refs.myVideo, this.options, () => {
        videojs.log('Using video.js');
      });
    },

    removePlayer() {
      this.player.record().stopStream();
      this.player.record().reset();
    }
  }
}
</script>

<style lang="scss" scoped>
.video-js {
  width: auto !important;
  height: 500px !important;
}
</style>
