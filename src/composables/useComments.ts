import {
  computed,
  ComputedRef,
  ref,
  Ref,
  watchEffect,
  watch,
  onBeforeUnmount
} from '@vue/composition-api';
import { ObjectId } from 'bson';
import { OperationModeType } from '../@types/operationMode.d';
import { CommentAuthor, Comment, CommentType } from '../@types/comment.d';
import {
  addNewComment,
  fetchComments,
  fetchTeamComments,
  updateComment,
  deleteComment
} from '../api/commentApi';
import { OperationMode } from '../constants/operationMode';

export default function useComments(
  currentUser: ComputedRef<CommentAuthor>,
  operationMode: ComputedRef<OperationModeType>,
  userType: ComputedRef<'organizer' | 'stakeholder' | 'participant' | ''>,
  currentActivity: ComputedRef<string>,
  studentDoc: Ref<{
    data: Record<string, any>;
  } | null>,
  teamDoc: Ref<{
    data: Record<string, any>;
  } | null>,
  previewModeEnabled: ComputedRef<boolean>
) {
  const comments: Ref<Comment[]> = ref([]);

  const commentsTypes: ComputedRef<CommentType[]> = computed(() => {
    if (
      operationMode.value === OperationMode.Setup ||
      previewModeEnabled.value ||
      currentActivity.value === 'start'
    ) {
      return [];
    }
    if (operationMode.value === OperationMode.Participant) {
      return ['team', 'stakeholders', 'organizers'];
    }
    if (operationMode.value === OperationMode.Monitor && userType.value === 'stakeholder') {
      return ['stakeholders'];
    }
    if (operationMode.value === OperationMode.Monitor && userType.value === 'organizer') {
      return ['organizers'];
    }
    return [];
  });

  const currentCommentType: Ref<CommentType> = ref(commentsTypes.value[0]);
  watch(commentsTypes, newCommentsTypes => {
    // eslint-disable-next-line prefer-destructuring
    currentCommentType.value = newCommentsTypes[0];
  });

  let refreshCommentIntervalId;
  const getComments = async () => {
    if (commentsTypes.value.length === 0) {
      clearInterval(refreshCommentIntervalId);
      return;
    }

    const studentDocumentId = studentDoc.value?.data._id ?? null;
    const teamId = teamDoc.value?.data._id ?? null;
    const programId = studentDoc.value?.data.program_id;

    if (!refreshCommentIntervalId) {
      refreshCommentIntervalId = setInterval(() => {
        getComments();
      }, 10000);
    }

    if (currentCommentType.value === 'team') {
      // We are not passing studentDocumentId here because comments for teams are categorized by teamId
      comments.value = await fetchTeamComments(
        currentActivity.value,
        currentCommentType.value,
        teamId,
        programId
      );
    } else {
      comments.value = await fetchComments(
        studentDocumentId,
        currentActivity.value,
        currentCommentType.value,
        null,
        programId
      );
    }
  };

  watchEffect(async () => {
    getComments();
  });

  onBeforeUnmount(() => {
    clearInterval(refreshCommentIntervalId);
  });

  const handleAddComment = async (newCommentContent: string) => {
    const teamId = teamDoc.value?.data._id ?? null;
    const studentDocumentId = studentDoc.value?.data._id ?? null;
    const programId = studentDoc.value?.data.program_id;

    const newComment: Comment = {
      student_document_id: studentDocumentId,
      participant_id: studentDoc.value?.data.participant_id,
      program_id: programId,
      program_team_id: teamId,
      created: new Date(),
      updated: new Date(),
      is_deleted: false,
      author: currentUser.value,
      content: newCommentContent,
      activity: currentActivity.value,
      conversation_type: currentCommentType.value
    };

    try {
      await addNewComment(newComment);

      getComments(); // TODO: optimize this
    } catch {
      console.log('Failed to submit comment');
    }
  };

  const handleCommentModeChanged = (newCommentType: CommentType) => {
    currentCommentType.value = newCommentType;
  };

  const handleEditComment = async ({ _id, content }) => {
    try {
      await updateComment(_id, content);

      getComments(); // TODO: optimize this
    } catch {
      console.log('Failed to submit comment');
    }
  };

  const handleDeleteComment = async (_id: ObjectId) => {
    try {
      await deleteComment(_id);

      getComments(); // TODO: optimize this
    } catch {
      console.log('Failed to delete comment');
    }
  };

  return {
    comments,
    handleAddComment,
    commentsTypes,
    handleCommentModeChanged,
    currentCommentType,
    handleEditComment,
    handleDeleteComment
  };
}
