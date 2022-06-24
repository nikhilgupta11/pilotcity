<template>
  <v-container style="overflow: hidden">
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn v-bind="attrs" small dark depressed v-on="on"
          ><v-icon left>{{ selectedMenuIcon }}</v-icon
          >{{ selectedMenuLabel }}</v-btn
        >
      </template>
      <v-card class="module__menu">
        <template v-for="menu in menus">
          <v-btn
            :key="`${menu.value}-button`"
            small
            color="white"
            class="module__chat-menu-button v-btn__content"
            tile
            depressed
            @click="handleCommentModeChange(menu.value)"
          >
            <v-icon left color="#404142">{{ menu.icon }}</v-icon
            >{{ menu.label }}</v-btn
          >
          <v-divider :key="`${menu.value}-divider`"></v-divider>
        </template>
      </v-card>
    </v-menu>
    <v-timeline dense clipped>
      <v-timeline-item fill-dot class="white--text mb-12" color="pink" large>
        <template #icon>
          <UserAvatar :size="52" :user="currentUser" />
        </template>
        <v-text-field
          v-model="newComment"
          hide-details
          flat
          label="Leave a comment..."
          solo
          @keydown.enter="addComment"
        >
          <template #append>
            <v-btn
              :disabled="isNewCommentEmpty"
              class="mx-0"
              outlined
              depressed
              @click="addComment"
            >
              Post
            </v-btn>
          </template>
        </v-text-field>
      </v-timeline-item>

      <v-slide-x-transition group>
        <v-timeline-item
          v-for="comment in mappedComments"
          :key="comment._id.toHexString()"
          class="mb-3 d-flex align-center"
          fill-dot
        >
          <template #icon>
            <UserAvatar :size="34" :user="comment.author" />
          </template>
          <v-row justify="space-between d-flex align-center">
            <v-col cols="12" md="8">
              <div
                v-if="
                  comment._id.toHexString() ===
                  (commentBeingEditedId && commentBeingEditedId.toHexString())
                "
              >
                <v-textarea
                  class="edit-comment-text"
                  :value="comment.content"
                  solo
                  hide-details
                  flat
                  @keydown.esc="cancelEditComment"
                  @keydown.enter="saveComment(comment)"
                  @input="handleCommentChange"
                ></v-textarea>
                <div>
                  <v-btn class="mr-2" depressed rounded :ripple="false" @click="cancelEditComment"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="#007a5a"
                    depressed
                    rounded
                    :ripple="false"
                    class="white--text"
                    @click="saveComment(comment)"
                    >Save</v-btn
                  >
                </div>
              </div>

              <div v-else>
                {{ comment.content }}
                <span v-if="isCommentEdited(comment)" class="edited-comment-label">(edited)</span>
              </div>
            </v-col>
            <v-col class="overline" cols="12" md="3">
              {{ formatTime(comment.updated) }}
            </v-col>
            <v-col class="kabab-menu text-right" cols="1">
              <v-menu v-if="!!comment.createdByCurrentUser" content-class="comment-menu" top left>
                <template #activator="{ on, attrs }">
                  <v-btn dark icon v-bind="attrs" v-on="on">
                    <v-icon small color="grey">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    class="comment-menu-item"
                    @click="handleCommentActionClick('edit', comment)"
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    class="comment-menu-item"
                    @click="handleCommentActionClick('delete', comment)"
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-trash-can</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>

    <v-dialog v-model="showDeleteConfirmation" width="500">
      <v-card>
        <v-card-title class="d-flex flex-column">
          <div class="overline font-weight-bold">Are you sure you want to delete this comment?</div>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions class="d-flex justify-center mt-3">
          <v-btn
            class="mr-2"
            depressed
            rounded
            :ripple="false"
            @click="showDeleteConfirmation = false"
            >Just Kidding</v-btn
          >
          <v-btn
            color="#E53935"
            depressed
            rounded
            :ripple="false"
            class="white--text"
            @click="handleConfirmDeleteComment"
          >
            OK. Delete it
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, Ref } from '@vue/composition-api';
import type { Comment, CommentAuthor, CommentType } from '@/@types/comment.d';
import UserAvatar from '@/components/UserAvatar.vue';
import moment from 'moment';
import { ObjectId } from 'bson';

export default defineComponent({
  name: 'Comments',

  components: {
    UserAvatar
  },

  props: {
    comments: {
      required: true,
      type: Array as PropType<Comment[]>
    },
    currentUser: {
      required: true,
      type: Object as PropType<CommentAuthor>
    },
    type: {
      required: false,
      type: String as PropType<CommentType>,
      default: 'team'
    },
    availableTypes: {
      required: false,
      type: Array as PropType<CommentType[]>,
      default: () => ['team', 'organizers', 'stakeholders']
    }
  },

  setup(props, ctx) {
    const mappedComments = computed(() => {
      return props.comments.map(comment => {
        return {
          ...comment,
          createdByCurrentUser:
            comment.author?._id.toHexString() === props.currentUser._id.toHexString()
        };
      });
    });

    const newComment = ref('');

    const isNewCommentEmpty = computed(() => {
      return newComment.value.trim().length === 0;
    });

    const addComment = () => {
      if (isNewCommentEmpty.value) return;
      ctx.emit('add-comment', newComment.value);
      newComment.value = '';
    };

    const formatTime = (time: Date) => {
      const now = moment();
      const created = moment(time);

      if (now.diff(created, 'days') < 1) {
        return created.fromNow();
      }
      return created.format('MMM D, YYYY');
    };

    const selectedMenu = ref(props.type);

    const labels = {
      stakeholders: 'Stakeholders Only',
      organizers: 'Organizers Only',
      team: 'Team Only'
    };

    const icons = {
      stakeholders: 'mdi-account-group',
      organizers: 'mdi-account-cog',
      team: 'mdi-account-multiple'
    };

    const selectedMenuLabel = computed(() => {
      return labels[selectedMenu.value];
    });

    const selectedMenuIcon = computed(() => {
      return icons[selectedMenu.value];
    });

    const menus = computed(() => {
      return props.availableTypes.map(type => {
        return {
          label: labels[type],
          value: type,
          icon: icons[type]
        };
      });
    });

    const handleCommentModeChange = (type: CommentType) => {
      selectedMenu.value = type;
      ctx.emit('comment-mode-changed', type);
    };

    const commentBeingEditedId: Ref<ObjectId | undefined> = ref(undefined);
    const commentBeingEditedContent: Ref<string | undefined> = ref(undefined);
    const commentBeingDeletedId: Ref<ObjectId | undefined> = ref(undefined);
    const showDeleteConfirmation = ref(false);

    const handleCommentActionClick = (action: 'edit' | 'delete', comment: Comment) => {
      if (action === 'edit') {
        commentBeingEditedId.value = comment._id;
      } else if (action === 'delete') {
        commentBeingDeletedId.value = comment._id;
        showDeleteConfirmation.value = true;
      }
    };

    const cancelEditComment = () => {
      commentBeingEditedId.value = undefined;
      commentBeingEditedContent.value = undefined;
    };

    const handleCommentChange = (newComment: string) => {
      commentBeingEditedContent.value = newComment;
    };

    const saveComment = (comment: Comment) => {
      if (commentBeingEditedId.value) {
        ctx.emit('edit-comment', {
          _id: comment._id,
          content: commentBeingEditedContent.value
        });
      }
      cancelEditComment();
    };

    const isCommentEdited = (comment: Comment) => {
      return comment.created?.getTime() !== comment.updated?.getTime();
    };

    const handleConfirmDeleteComment = () => {
      console.log(commentBeingDeletedId.value);
      ctx.emit('delete-comment', commentBeingDeletedId.value);
      commentBeingDeletedId.value = undefined;
      showDeleteConfirmation.value = false;
    };

    return {
      mappedComments,
      addComment,
      newComment,
      formatTime,
      selectedMenu,
      selectedMenuLabel,
      selectedMenuIcon,
      menus,
      handleCommentModeChange,
      handleCommentActionClick,
      commentBeingEditedId,
      cancelEditComment,
      handleCommentChange,
      commentBeingEditedContent,
      saveComment,
      isCommentEdited,
      showDeleteConfirmation,
      handleConfirmDeleteComment,
      isNewCommentEmpty
    };
  }
});
</script>

<style scoped lang="scss">
.comment-wrapper {
  > span {
    width: 100%;

    .comment-list-items {
      margin-bottom: 12px;
      position: relative;
      padding-bottom: 0;
      margin-bottom: 35px;
      @media (max-width: 767px) {
        margin-bottom: 45px;
        width: 100%;
      }
    }
  }
}
.comment-menu {
  border: 1px solid #dadada;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);

  cursor: pointer;

  .comment-menu-item {
    &:hover {
      background-color: #fafafa;
    }
    .v-list-item__icon {
      margin-right: 12px;
    }
  }
}

.edit-comment-text {
  border: 1px solid;
  margin-bottom: 8px;
}

.kabab-menu {
  @media (max-width: 991px) {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.edited-comment-label {
  font-size: 13px;
  white-space: nowrap;
  color: rgb(129, 131, 133);
}
</style>
