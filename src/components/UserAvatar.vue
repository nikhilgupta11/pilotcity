<template>
  <div>
    <v-img v-if="avatarUrl" class="rounded-circle" :width="size" :height="size" :src="avatarUrl">
    </v-img>
    <v-avatar v-else class="initials" color="accent" :size="size">{{ initials }} </v-avatar>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api';
import type { CommentAuthor } from '@/@types/comment.d';
import type { User } from '@/@types/user.d';

export default defineComponent({
  name: 'UserAvatar',

  props: {
    user: {
      required: true,
      type: Object as PropType<User | CommentAuthor>
    },
    size: {
      required: true,
      type: Number
    }
  },
  setup(props) {
    const initials = computed(
      () =>
        `${props.user.firstName?.toUpperCase().charAt(0)} ${props.user?.lastName
          ?.toUpperCase()
          .charAt(0)}`
    );

    const avatarUrl = computed(() => {
      return props.user.profile?.medium;
    });

    return {
      initials,
      avatarUrl
    };
  }
});
</script>

<style lang="scss">
.initials {
  font-family: Raleway;
  font-weight: 900;
  letter-spacing: 0px;
}
</style>
