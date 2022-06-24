<template>
  <v-parallax :src="background" dark height="100%" class="black">
    <div class="landing__2-column">
      <div class="landing__left pl-16 pb-16">
        <div
          class="
            invite__text-testimonial-white
            pt-16
            pb-8
            d-flex
            flex-column
            align-start
            white--text
            font-weight-bold
          "
        >
          <v-icon left dark>{{ icon }}</v-icon>
          {{ testimonial }}
        </div>
        <div class="landing__text-testimonial-body">
          <div>
            <v-avatar size="75">
              <v-img :src="user.avatar" />
            </v-avatar>
          </div>
          <div class="landing__text-testimonial-title">
            <div class="landing__text-testimonial-name-black">{{ user.name }}</div>
            <div class="landing__text-testimonial-position">{{ user.position }}</div>
          </div>
        </div>
      </div>
    </div>
  </v-parallax>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    background: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    testimonial: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },

  setup() {}
});
</script>

<style lang="scss" scoped>
.invite {
  &__text-testimonial-white {
    font-family: Montserrat;
    font-size: 22px;
    max-width: 75%;
  }
}
</style>
