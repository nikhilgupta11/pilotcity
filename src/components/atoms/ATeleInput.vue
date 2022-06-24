<template>
  <div>
    <vue-tel-input
      v-model="inputValue"
      :class="[isRounded ? 'rounded' : '']"
      default-country="US"
      placeholder="Enter your phone"
      v-mask="'(###) ###-####'"
      @validate="$emit('get', $event)"
      :input-options="inputObject"
      style="color: white"
      :disabled="disabled"
    ></vue-tel-input>
  </div>
</template>

<script lang="ts">
import { computed } from '@vue/composition-api';
import { VueTelInput } from 'vue-tel-input';

export default {
  components: {
    VueTelInput
  },

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isRounded: {
      type: Boolean,
      default: false
    },
    inputText: {
      type: String,
      default: null
    }
  },

  setup(props, ctx) {
    const styleClasses = computed(() => {
      if (props.inputText === 'black') {
        return ['vti__input', 'vue-tel-input:focus-within'];
      }
      return ['vti__input', 'input-text', 'vue-tel-input:focus-within'];
    });
    const inputObject = {
      styleClasses: styleClasses.value,
      placeholder: 'Phone'
    };
    const inputValue = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    return { inputValue, inputObject };
  }
};
</script>
<style src="vue-tel-input/dist/vue-tel-input.css"></style>
<style lang="scss">
.vti__input {
  padding: 18px 12px;
  padding-right: 35px;
  background: transparent;
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
    font-size: 16px;
  }
}
.input-text {
  color: white !important;
}
.vue-tel-input:focus-within {
  box-shadow: none !important;
}
.v-application .rounded {
  border-radius: 28px !important;
}
.vti__dropdown {
  pointer-events: none !important;
  &:hover {
    background-color: transparent !important;
  }
}
</style>
