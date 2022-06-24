<template>
  <v-btn
    :style="customCss"
    :color="color"
    :disabled="disabled"
    :dark="dark"
    :depressed="depressed"
    :outlined="outlined"
    :x-large="XLarge"
    :x-small="XLarge"
    :rounded="rounded"
    :loading="loading"
    :type="type"
    :height="height"
    :width="width"
    :link="link"
    :right="right"
    :left="left"
    :href="href"
    :ripple="ripple"
    :icon="icon"
    :fab="fab"
    @click="$emit('click')"
  >
    {{ badgeText }}
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: 'AButton',
  props: {
    customCss: {
      type: String,
      require: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    badgeText: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      dafault: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    depressed: {
      type: Boolean,
      default: false
    },
    fab: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    btnSmall: {
      type: Boolean,
      default: false
    },
    XLarge: {
      type: Boolean,
      default: false
    },
    XSmall: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: ''
    },
    link: {
      type: Boolean,
      default: false
    },
    href: {
      type: [String, Object],
      default: null
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    ripple: {
      type: [String, Object, Boolean],
      default: null
    }
    // vOn: {
    //   type: [Function, Object],
    //   default: () => {}
    // }
  }
};
</script>
