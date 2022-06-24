<template>
  <v-parallax
    :src="background"
    dark
    height="100%"
    class="landing__hero-default landing__studentChoiceEmployerWrapper"
  >
    <div class="d-flex studentChoice">
      <div class="landing__left">
        <slot name="right" />
      </div>
      <div class="landing__right font-weight-bold">
        <v-icon dark x-large :color="color">{{ icon }}</v-icon
        ><br />
        <div :class="`landing__text-subtitle ${color}--text`">{{ title }}</div>
        <div class="landing__text-body" v-html="description" />
        <v-btn :to="to.to" rounded outlined depressed dark large class="white--text">
          {{ to.button }}
        </v-btn>
      </div>
    </div>
    <div class="landing__content-grid d-flex flex-row justify-center">
      <slot name="bottom" />
    </div>
  </v-parallax>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'pink'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    to: {
      type: Object,
      required: true
    },
    background: {
      type: String,
      required: true
    }
  },

  setup() {}
});
</script>

<style lang="scss" scoped>
.landing {
  &__text-body {
    font-weight: 500;
    font-size: 20px;
    line-height: 50px;
  }
}
</style>
