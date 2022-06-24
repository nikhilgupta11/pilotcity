<template>
  <div class="partner-invite__videoask-background">
    <iframe
      :src="`https://www.videoask.com/${invitePages[getInvitee].video}`"
      allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
      width="100%"
      height="800px"
      style="border: none; border-radius: 0px"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch, Ref, ComputedRef, reactive } from '@vue/composition-api';
import { PARTNER_PAGES, PARTNER_TESTIMONIALS } from '../constants/partnerInvite';

export default {
  name: 'Partner',

  components: {},

  props: {
    partnerName: {
      type: String,
      default: ''
    }
  },

  setup(props, { root: { $router } }) {
    const invitePages = reactive(PARTNER_PAGES);
    const inviteTestimonials = reactive(PARTNER_TESTIMONIALS);
    const pass: Ref<string> = ref('');
    const inputPassword: Ref<string> = ref('');
    const getInvitee: ComputedRef<string> = computed(() =>
      (props.partnerName as string)
        .split('-')
        .map(word => word[0].toUpperCase() + word.substring(1))
        .join(' ')
    );
    const getInviteColor: ComputedRef<string> = computed(() => {
      const { user } = invitePages[getInvitee.value];
      if (user === 'school') return 'blue';
      if (user === 'employer') return 'purple';
      if (user === 'parent') return 'yellow';
      if (user === 'teacher') return 'pink';
      if (user === 'student') return 'green';
      if (user === 'sponsor') return 'red';
      return '';
    });

    onMounted(() => {
      const valid =
        typeof invitePages[
          (props.schoolName as string)
            .split('-')
            .map(word => word[0].toUpperCase() + word.substring(1))
            .join(' ')
        ] !== 'undefined';
      if (!valid) $router.push({ name: '404' });
    });

    return {
      pass,
      inputPassword,
      invitePages,
      inviteTestimonials,
      getInviteColor,
      getInvitee,
      show1: ref(false),
      activitiesDialog: false,
      testimonialssDialog: false
    };
  }
};
</script>

<style lang="scss">
.partner-invite {
  &__videoask-background {
    background-color: #000000;
    height: 100vh;
    width: 100vw;
    color: #000000;
  }
}
</style>
