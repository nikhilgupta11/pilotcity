<template>
  <v-timeline-item class="mb-3 d-flex align-center" color="#ea6764" fill-dot small>
    <template #icon>
      <v-avatar size="20" color="grey lighten-2"><v-img :src="comment.avatar" /></v-avatar>
    </template>
    <v-row justify="space-between" class="d-flex align-center mb-2">
      <v-col
        class="module-default__answer-text d-flex align-center"
        :cols="$vuetify.breakpoint.xs ? '12' : '8'"
        :class="$vuetify.breakpoint.xs ? 'text-left mb-2' : ' '"
        v-bind:style="{ padding: $vuetify.breakpoint.xs ? '0 !important' : ' ' }"
        v-text="comment.text"
      ></v-col>
      <!-- <v-col class="text-right" cols="3" v-text="event.time"></v-col> -->
      <v-col
        class="d-flex align-center"
        :cols="$vuetify.breakpoint.xs ? '12' : '4'"
        v-bind:style="{ padding: $vuetify.breakpoint.xs ? '0 !important' : ' ' }"
        :class="$vuetify.breakpoint.xs ? 'text-left' : 'text-right'"
      >
        <!-- POSTER, STUDENT PARTICIPANT OR ORGANIZER CAN DELETE POSTS -->
        <!-- <v-btn small class="module__trash" icon
													><v-icon small color="grey" class="module__trash"
														>mdi-trash-can-outline</v-icon
													></v-btn
												> -->

        <v-btn
          :disabled="userType === 'stakeholder' || readonly"
          class="module__trash"
          small
          icon
          v-bind:style="{ width: $vuetify.breakpoint.xs ? 'auto !important' : ' ' }"
          @click="$emit('likeComment', questionId, comment._id)"
          ><v-icon
            :disabled="userType === 'stakeholder'"
            :color="commentIsLiked(studentAdkData, comment) ? 'pink' : 'grey'"
            class="module__trash"
            small
            >mdi-heart</v-icon
          ></v-btn
        >
        <!-- ANYONE CAN FLAG COMMENTS -->
        <v-btn
          small
          class="module__trash"
          icon
          :disabled="readonly"
          v-bind:style="{ width: $vuetify.breakpoint.xs ? 'auto !important' : ' ' }"
          @click="$emit('flagComment', questionId, comment._id)"
          ><v-icon
            :color="commentIsFlagged(studentAdkData, comment) ? 'orange' : 'grey lighten-2'"
            small
            class="module__trash"
            >mdi-flag</v-icon
          ></v-btn
        >
      </v-col>
    </v-row>
  </v-timeline-item>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from '@vue/composition-api';
import { ObjectId } from 'bson';
import { commentIsFlagged, commentIsLiked } from './helpers';
import { Comment } from './types';

export default defineComponent({
  name: 'Comment',

  props: {
    questionId: {
      required: true,
      type: Object as PropType<ObjectId>
    },
    comment: {
      required: true,
      type: Object as PropType<Comment>
    },
    studentAdkData: {
      required: true,
      type: Object
    },
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    }
  },
  setup() {
    const readonly = inject('readonly', false);
    return { commentIsFlagged, commentIsLiked, readonly };
  }
});
</script>
