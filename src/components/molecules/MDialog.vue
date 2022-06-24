<template>
  <v-dialog
    v-model="dialog"
    :width="width"
    :fullscreen="fullscreen"
    :max-width="maxWidth"
    :persistent="persistent"
    :scrollable="scrollable"
  >
    <slot />
  </v-dialog>
</template>

<script lang="ts">
import { computed } from '@vue/composition-api';
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: null
    },
    origin: {
      type: String,
      default: ''
    },
    persistent: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: [String, Number],
      default: null
    },
    scrollable: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const dialog = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });
    return { dialog };
  }
};
</script>