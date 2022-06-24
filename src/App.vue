<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
// import * as Sentry from '@sentry/vue';
// import Navbar from '@/components/Navbar.vue';
import { computed, defineComponent, ref } from '@vue/composition-api';
import Navbar from '@/components/Navbar.vue';
import store, { useToolGetters, useDbGetters, useUserGetters } from '@/store';
import '@/styles/main.scss';

export default defineComponent({
  name: 'App',
  components: {
    Navbar
    // Profile
  },
  setup(props, context) {
    const { collection } = useDbGetters(['collection']);
    const { getUser, getObjectId, isDialogOpen } = useUserGetters([
      'getUser',
      'getObjectId',
      'isDialogOpen'
    ]);
    document.title = 'PilotCity  |  Build projects to win internships';
    const { getLinearLoading: loading } = useToolGetters(['getLinearLoading']);
    const password = ref('');
    const show1 = ref(false);
    const isResetting = ref(false);

    const layout = computed(() => {
      return `${context.root.$route.meta.layout || 'default'}-layout`;
    });

    return {
      layout,
      loading,
      isDialogOpen,
      password,
      show1,
      isResetting
    };
  }
});
</script>
<style lang="scss">
.timerchip {
  &__container {
    width: 100% !important;
    max-width: 700px !important;
  }
}
</style>
