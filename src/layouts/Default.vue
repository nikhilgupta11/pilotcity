<template>
  <v-main>
    <!-- <v-banner v-if="getUser" class="caption" color="blue" dark>
      Please refresh the page if you're experiencing any issues. You will be asked to login again
      due to security reasons. Please text us at: <u>(510) 330-0024</u> in case you're blocked.
    </v-banner> -->
    <Navbar :user="getUser" :loading="loading"></Navbar>
    <router-view />
  </v-main>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import { useToolGetters, useUserGetters } from '@/store';

export default {
  components: {
    Navbar
  },
  setup() {
    const { getLinearLoading: loading } = useToolGetters(['getLinearLoading']);
    return {
      getUser: useUserGetters(['getUser']).getUser,
      loading
    };
  }
};
</script>

<style lang="scss" scoped>
.banner {
  font-weight: bolder;
  font-size: 18px !important;
}
</style>
