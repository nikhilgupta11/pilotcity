<template>
  <div>
    <h1>Must be logged in to view this page</h1>
    <h2>You will be directed shortly</h2>
  </div>
</template>
<script lang="ts">
import { onMounted } from '@vue/composition-api';
import { useToolActions } from '@/store';

const { setLinearLoader } = useToolActions(['setLinearLoader']);

export default {
  setup(_props, ctx) {
    onMounted(() => {
      setLinearLoader({
        func: () =>
          new Promise<void>(resolve => {
            setTimeout(() => {
              ctx.root.$router.push({ name: 'login' });
              resolve();
            }, 2000);
          })
      });
    });
    return {};
  }
};
</script>
