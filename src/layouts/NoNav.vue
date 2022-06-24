<template>
  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts">
import { useUserGetters } from '@/store';

export default {
  setup() {
    return {
      getUser: useUserGetters(['getUser']).getUser
    };
  }
};
</script>
