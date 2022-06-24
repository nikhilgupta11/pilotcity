import { bool } from 'aws-sdk/clients/signer';
import { ObjectId } from 'bson';

export type CommentType = 'stakeholders' | 'organizers' | 'team';
export interface CommentAuthor {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  profile?: {
    large?: string;
    medium?: string;
    small?: string;
  };
}

export interface Comment {
  _id?: ObjectId;
  student_document_id?: ObjectId;
  participant_id?: ObjectId;
  program_id?: ObjectId;
  program_team_id?: ObjectId;
  content: string;
  created?: Date;
  updated?: Date;
  parent_id?: ObjectId;
  is_deleted?: boolean;
  author?: CommentAuthor;
  status?: 'pending' | 'failed' | 'sent';
  activity: string;
  conversation_type?: CommentType;
}
