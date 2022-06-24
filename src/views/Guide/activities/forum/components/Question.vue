<template>
  <v-expansion-panels v-model="openPanels" flat readonly class="mb-8">
    <v-expansion-panel>
      <v-expansion-panel-header hide-actions disabled>
        <div class="module-default__question-header">{{ question.text }}</div>
      </v-expansion-panel-header>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header hide-actions>
        <div class="d-flex" :class="$vuetify.breakpoint.xs ? 'flex-column' : 'flex-row'">
          <v-btn small rounded outlined depressed @click="toggleComments"
            >{{ question.comments.length }} Replies</v-btn
          >
          <div class="reply-reaction-icon flex-row d-flex">
            <v-btn
              :disabled="userType === 'stakeholder' || readonly"
              class="ml-2 mr-1"
              small
              depressed
              rounded
              color="white"
              @click="$emit('likeQuestion', question._id)"
              ><v-icon
                :color="questionIsLiked(studentAdkData, question) ? 'green' : 'grey'"
                left
                small
                >mdi-thumb-up</v-icon
              >
              {{ question.likes }}
            </v-btn>
            <v-btn
              :disabled="userType === 'stakeholder' || readonly"
              class="ml-2 mr-1"
              small
              depressed
              rounded
              color="white"
              @click="$emit('dislikeQuestion', question._id)"
              ><v-icon
                :color="questionIsDisliked(studentAdkData, question) ? 'red' : 'grey'"
                left
                small
                >mdi-thumb-down</v-icon
              >
              {{ question.dislikes }}
            </v-btn>
            <v-btn
              :disabled="readonly"
              class="ml-3 mr-2"
              small
              icon
              @click="$emit('flagQuestion', question._id)"
              ><v-icon
                :color="questionIsFlagged(studentAdkData, question) ? 'orange' : 'grey lighten-2'"
                small
                >mdi-flag</v-icon
              >
            </v-btn>
            <v-btn
              :disabled="userType === 'stakeholder' || readonly"
              class="ml-6 mr-3"
              small
              icon
              @click="$emit('bookmarkQuestion', question._id)"
              ><v-icon
                :color="
                  questionIsBookmarked(studentAdkData, question) ? 'yellow' : 'grey lighten-2'
                "
                small
                >mdi-bookmark</v-icon
              >
            </v-btn>
          </div>
        </div>
      </v-expansion-panel-header>
      <CommentSection
        :question="question"
        :student-adk-data="studentAdkData"
        :user-doc="userDoc"
        :user-type="userType"
        v-on="$listeners"
      />
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, inject } from '@vue/composition-api';
import CommentSection from './CommentSection.vue';
import { MongoDoc, Question } from './types';
import {
  questionIsBookmarked,
  questionIsDisliked,
  questionIsLiked,
  questionIsFlagged
} from './helpers';

export default defineComponent({
  name: 'Question',
  components: { CommentSection },

  props: {
    question: {
      required: true,
      type: Object as PropType<Question>
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
    },
    userDoc: {
      required: false,
      type: Object as PropType<MongoDoc>,
      default: () => {}
    }
  },
  setup(props) {
    const readonly = inject('readonly', false);
    const openPanels = ref<number | null>(null);
    const toggleComments = () => {
      if (openPanels.value) openPanels.value = null;
      else openPanels.value = 1;
    };
    return {
      questionIsLiked,
      questionIsBookmarked,
      questionIsDisliked,
      questionIsFlagged,
      openPanels,
      toggleComments,
      readonly
    };
  }
});
</script>
