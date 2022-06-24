import gql from 'graphql-tag';

const TRANSFER_TOKENS = gql`
  mutation transferTokens($senderId: ObjectId!, $recipientEmail: String!, $tokenIds: [ObjectId!]) {
    sendTokensMutation(
      input: { token_ids: $tokenIds, sender_id: $senderId, recipient_email: $recipientEmail }
    ) {
      recipient {
        firstName
        lastName
      }
      timestamp
      tokensSent
    }
  }
`;

const SEND_INVITE = gql`
  mutation sendInvite($input: SendReferalInput!) {
    sendRefferal(input: $input) {
      status
    }
  }
`;

const SEND_PARTICIPANTS_REFFERAL = gql`
  mutation sendParticipantsRefferal($email: String!, $id: ObjectId!, $name: String!) {
    sendRefferal(input: { email: $email, name: $name, id: $id }) {
      status
    }
  }
`;

const SEND_GUARDIAN_REFFERAL = gql`
  mutation sendGuardianRefferal($email: String!, $id: ObjectId!, $name: String!) {
    sendRefferal(input: { email: $email, name: $name, id: $id }) {
      status
    }
  }
`;

export { TRANSFER_TOKENS, SEND_INVITE, SEND_PARTICIPANTS_REFFERAL, SEND_GUARDIAN_REFFERAL };
