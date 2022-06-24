export enum CacheKeys {
  AccessToken = 'videoask:access-token',
  RefreshToken = 'videoask:refresh-token'
}
// Auth Interfaces
export interface GetFirstRefreshTokenInput {
  grant_type: 'authorization_code';
  code: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

export interface GetRefreshTokenInput {
  grant_type: 'refresh_token';
  refresh_token: string;
  client_id: string;
  client_secret: string;
  scope: 'openid+profile+email+offline_access';
}
/**
 * All refresh token responses contain the same fields
 *
 * @interface GetRefreshTokenResp
 */
export interface GetRefreshTokenResp {
  access_token: string;
  refresh_token: string;
  scope: string;
  expires_in: number;
  token_type: 'Bearer';
}

interface Answer {
  answer_id: string;
  created_at: Date;
  media_url?: string;
  input_text?: string;
  is_public?: boolean;
  file_uploads?: unknown[];
  question_id?: string;
  share_id: string;
  share_url: string;
  type: 'poll' | 'video';
  transcription?: string; // only availabled on form_response_transcribed event
}

export interface Variables {
  program_id: string;
  event: string; // this was meant to just be clock in or clock out
  participant_id: string;
}

export interface Contact {
  contact_id?: string;
  organization_id?: string;
  respondent_id?: unknown;
  name: string;
  email: string; // use this to find the user
  phone_number?: unknown;
  thumbnail?: unknown;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
  answers?: Answer[];
  platform?: string;
  tags?: unknown[];
  variables?: Variables;
  are_answers_public?: boolean;
  are_messages_public?: boolean;
  share_id?: string;
  share_url?: string;
  consent_given?: unknown;
}

export interface Metadata {
  primary_color?: string;
  secondary_color?: string;
  background_color?: string;
  locale?: string;
  show_form_title?: boolean;
  live_recording?: boolean;
  show_overlay_close_button?: boolean;
  show_player_controls?: boolean;
  square_button_radius?: number;
}

export interface To {
  type?: string;
  value?: string;
}

export interface Details {
  to?: To;
}

export interface Condition {
  op?: string;
  vars?: unknown[];
}

export interface LogicAction {
  action?: string;
  details?: Details;
  condition?: Condition;
}

export interface Metadata2 {
  text?: string;
  darken_text_background?: boolean;
  fit_video?: boolean;
  overlay_text_size?: number;
}

export interface Question {
  allowed_answer_media_types?: string[];
  created_at?: Date;
  form_id?: string;
  logic_actions?: LogicAction[];
  media_id?: string;
  media_type?: string;
  media_url?: string;
  metadata?: Metadata2;
  question_id?: string;
  share_id?: string;
  share_url?: string;
  thumbnail?: string;
  transcode_status?: string;
  transcribe_status?: string;
  type?: string;
  updated_at?: Date;
  collect_contact_information?: boolean;
  label?: string;
}

export interface Variable {
  key?: string;
  type?: string;
}

export interface Notifications {
  send_contact_message_emails?: boolean;
}

export interface Form {
  form_id: string;
  organization_id?: string;
  title?: string;
  requires_contact_info?: boolean;
  requires_contact_email?: boolean;
  requires_contact_name?: boolean;
  requires_contact_phone_number?: boolean;
  requires_consent?: boolean;
  show_contact_name?: boolean;
  show_contact_email?: boolean;
  show_contact_phone_number?: boolean;
  show_consent?: boolean;
  hide_branding?: boolean;
  metadata?: Metadata;
  share_id?: string;
  share_url?: string;
  created_at?: Date;
  updated_at?: Date;
  respondents_count?: number;
  author_id?: string;
  questions?: Question[];
  are_answers_public?: boolean;
  are_messages_public?: boolean;
  variables?: Variable[];
  notifications?: Notifications;
  responses_share_id?: string;
  responses_share_url?: string;
  tag_share_id?: string;
  tag_share_url?: string;
  idle_deadline_time_in_minutes?: number;
}

export interface VideoaskEvent {
  event_id: string;
  event_type: string;
  interaction_id: string;
  contact: Contact;
  form: Form;
}

export interface CreateTagInput {
  title: string;
}
export interface Tag {
  title: string;
  tag_id: string;
}
export interface FetchTagResp {
  count: number;
  next: null; // The docs don't specify a type other than null // TODO update later
  previous: null; // TODO update later
  results: Tag[];
}
