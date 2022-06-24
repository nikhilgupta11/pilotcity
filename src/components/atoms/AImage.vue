<template>
  <v-img
    :src="src"
    :alt="alt"
    class="height-full bg-black"
    :max-height="maxHeight"
    :min-height="minHeight"
    :min-width="minWidth"
    :max-width="maxWidth"
    :height="height"
    :width="width"
    :dark="dark"
    :light="light"
    :contain="contain"
  >
    <slot />
  </v-img>
</template>

<script lang="ts">
export default {
  props: {
    src: {
      type: [String, Object],
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    maxHeight: {
      type: String,
      default: ''
    },
    minHeight: {
      type: String,
      default: ''
    },
    minWidth: {
      type: String,
      default: ''
    },
    maxWidth: {
      type: String,
      default: ''
    },
    dark: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    contain: {
      type: Boolean,
      default: false
    }
  }
};
</script>
