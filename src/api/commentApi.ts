/* eslint-disable import/prefer-default-export */
import { ObjectId } from 'bson';
import type { Comment, CommentType } from '../@types/comment.d';
import { useDbGetters } from '../store';

const { collection } = useDbGetters(['collection']);

export const fetchComments = (
  studentDocumentId: ObjectId | null,
  activity: string,
  commentType: CommentType,
  teamId?: ObjectId,
  program_id?: ObjectId
) => {
  type CommentQuery = {
    student_document_id?: ObjectId;
    program_team_id?: ObjectId;
    activity: string;
    conversation_type: CommentType;
    program_id: ObjectId;
    is_deleted: boolean;
  };
  const query: CommentQuery = {
    activity,
    conversation_type: commentType,
    program_id,
    is_deleted: false
  };

  if (studentDocumentId) {
    query.student_document_id = studentDocumentId;
  }

  if (teamId) {
    query.program_team_id = teamId;
  }

  return collection.value!('Comment').aggregate([
    {
      $match: query
    },
    { $sort: { created: -1 } }
  ]);
};

export const fetchTeamComments = (
  activity: string,
  commentType: CommentType,
  teamId: ObjectId,
  program_id: ObjectId
) => {
  return fetchComments(null, activity, commentType, teamId, program_id);
};

export const addNewComment = (comment: Comment) => {
  return collection.value!('Comment').insertOne(comment);
};

export const updateComment = (commentId: ObjectId | string, content: string) => {
  const updatedComment = {
    $set: {
      content,
      updated: new Date()
    }
  };

  return collection.value!('Comment').updateOne({ _id: commentId }, updatedComment);
};

export const deleteComment = (commentId: ObjectId) => {
  const updatedComment = {
    $set: {
      is_deleted: true,
      updated: new Date()
    }
  };

  return collection.value!('Comment').updateOne({ _id: commentId }, updatedComment);
};
