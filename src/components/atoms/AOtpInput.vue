<template>
  <div>
    <v-text-field
      v-model="inputValue"
      rounded
      color="white"
      class="signup__input"
      placeholder="Enter 6 digit OTP"
      v-mask="'######'"
      x-large
      outlined
      full-width
      dark
    />
  </div>
</template>

<script lang="ts">
import { computed } from '@vue/composition-api';
import '@trevoreyre/autocomplete-vue/dist/style.css';

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const inputValue = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    return { inputValue };
  }
};
</script>

<style lang="scss" scoped>
.style-1 {
  .otp-input-8-field {
    border-radius: 4px;
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
}
</style>
