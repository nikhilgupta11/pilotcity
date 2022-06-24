<template>
  <v-parallax :src="background" dark height="100%" class="landing__hero-default">
    <div class="d-flex landing__testimonialWrapper">
      <div class="landing__left mb-auto">
        <div
          :class="`landing__text-testimonial d-flex flex-column align-start font-weight-bold ${color}--text`"
        >
          <v-icon left dark>mdi-comment-quote</v-icon>
          {{ content }}
        </div>
        <div class="landing__text-testimonial-body d-flex flex-row">
          <div>
            <v-avatar size="75">
              <v-img :src="user.avatar" />
            </v-avatar>
          </div>
          <div class="landing__text-testimonial-title d-flex flex-column justify-center">
            <div :class="`landing__text-testimonial-name font-weight-bold ${color}--text`">
              {{ user.name }}
            </div>
            <div class="landing__text-testimonial-name font-weight-bold">{{ user.position }}</div>
          </div>
        </div>
      </div>
      <div v-if="!!rightLogo" class="landing__right landing__testimonial-logo font-weight-bold">
        <v-img class="testimonialLogo" :src="rightLogo" />
      </div>
    </div>
  </v-parallax>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'green'
    },
    content: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    background: {
      type: String,
      required: true
    },
    rightLogo: {
      type: String,
      default: ''
    }
  },

  setup(props) {}
});
</script>

<style lang="scss"></style>
