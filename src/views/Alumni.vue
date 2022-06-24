<template>
  <div>
    <iframe
      src="https://www.videoask.com/fs60gfvzu"
      allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
      width="100%"
      height="100vh"
      style="border: none; border-radius: 0px"
      class="alumni-menu"
    >
    </iframe>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Alumni',

  components: {},

  setup() {
    return {
      errors: []
    };
  }
};
</script>

<style lang="scss">
.alumni-menu {
  height: 100vh;
  width: 100vw;
}
</style>
