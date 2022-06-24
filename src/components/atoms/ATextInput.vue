<template>
  <v-text-field
    v-model="inputValue"
    x-large
    :rounded="rounded"
    :readonly="readonly"
    :class="[defaultClasses]"
    :type="type"
    :single-line="singleLine"
    :outlined="outlined"
    :full-width="fullWidth"
    :label="label"
    :placeholder="placeholder"
    :color="color"
    :disabled="disabled"
    :dark="dark"
    :append-icon="appendIcon"
    :error-messages="errors"
    @click:append="toggleShow"
    @keyup.enter="keyupEnter"
    @change="onChange"
  >
    <slot></slot>
  </v-text-field>
</template>

<script lang="ts">
import { computed } from '@vue/composition-api';

export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    appendIcon: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    singleLine: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    defaultClasses: {
      type: String,
      default: ''
    },
    toggleShow: {
      type: Function,
      default: () => {}
    },
    onChange: {
      type: Function,
      default: () => {}
    },
    keyupEnter: {
      type: Function,
      default: () => {}
    },
    errors: {
      type: Array,
      default: () => {}
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
