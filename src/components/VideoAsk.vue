<template>
  <iframe
    :src="videoAskUrl"
    allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
    style="border: none; border-radius: 0px"
    class="mobile__videoask-iframe"
  >
  </iframe>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { DailyAction } from '@/constants/daily-action';

export default defineComponent({
  name: 'VideoAsk',
  props: {
    mode: {
      type: String,
      default: 'clockin',
      required: true
    },
    email: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    phone: {
      type: String,
      default: '',
      required: true
    },
    event: {
      type: String,
      default: '',
      required: true
    },
    programId: {
      type: String,
      default: '',
      required: true
    },
    participantId: {
      type: String,
      default: '',
      required: true
    }
  },

  setup(props) {
    const { mode, email, name, phone, event, programId, participantId } = props;

    const videoAskUrl = computed(() => {
      const clockInId = process.env.VUE_APP_VIDEO_ASK_CLOCK_IN_ID;
      const clockOutId = process.env.VUE_APP_VIDEO_ASK_CLOCK_OUT_ID;
      let videoAskId;
      if (mode === DailyAction.clockin) {
        videoAskId = clockInId;
      } else {
        videoAskId = clockOutId;
      }

      return `https://www.videoask.com/${videoAskId}#contact_email=${email}&contact_name=${name}&contact_phone_number=${phone}&event=${event}&program_id=${programId}&participant_id=${participantId}`;
    });

    console.log(`Opening video ask iframe at ${videoAskUrl.value}`);

    return {
      videoAskUrl
    };
  }
});
</script>
