import gql from 'graphql-tag';

const TOKEN = gql`
  query Token($id: ObjectId!) {
    tokens(query: { _id: $id }) {
      owner_id
    }
  }
`;

const USER = gql`
  query User($id: ObjectId!) {
    users(query: { _id: $id }) {
      _id
      firstName
      lastName
      sponsorName
    }
  }
`;

const GET_TRANSFER_HISTORY = gql`
  query getTransferHistrory($query: TransactionQueryInput!) {
    transaction(query: $query) {
      tokenLog {
        event
        timestamp
        tokensSent
        sentTo
      }
    }
  }
`;

const GET_NAMES = gql`
  query getNames($nameQuery: UserQueryInput!) {
    users(query: $nameQuery) {
      _id
      firstName
      lastName
    }
  }
`;

const MY_TOKEN_CUSTOMER = gql`
  query myTokensCustomer($id: ObjectId!) {
    tokens(query: { newOwner_id: $id }) {
      customer_id
    }
  }
`;

const SETUP_ROUTE_USER = gql`
  query setupRouteUser($query: UserQueryInput!) {
    user(query: $query) {
      userTypes
    }
  }
`;

const ALL_PORTFOLIOS = gql`
  query allPortfolios($id: ObjectId!) {
    Employer: employerPortfolio(query: { _id: $id }) {
      _id
    }
    Organizer: organizerPortfolio(query: { _id: $id }) {
      _id
    }
    Parent: parentPortfolio(query: { _id: $id }) {
      _id
    }
    School: schoolPortfolio(query: { _id: $id }) {
      _id
    }
    Student: studentPortfolio(query: { _id: $id }) {
      _id
    }
    Teacher: teacherPortfolio(query: { _id: $id }) {
      _id
    }
  }
`;

const REFFERERAL_LOG = gql`
  query refferalLog($input: TransactionQueryInput!) {
    transaction(query: $input) {
      referral {
        sentTo
        timestamp
      }
    }
  }
`;

const REFERAL_LOG_USERS = gql`
  query referalLogUsers($input: UserQueryInput!) {
    users(query: $input) {
      _id
      email
    }
  }
`;

const MY_TOKEN_OWNER = gql`
  query myTokensOwner($id: ObjectId!) {
    tokens(query: { newOwner_id: $id }) {
      _id
      owner_id
    }
  }
`;

const USERS = gql`
  query Users($userQueryInputs: [UserQueryInput!]) {
    users(query: { OR: $userQueryInputs }) {
      _id
      firstName
      lastName
      sponsorName
    }
  }
`;

const THIS_INVITE = gql`
  query thisInvite($id: ObjectId) {
    transaction(query: { _id: $id }) {
      referral {
        sentTo
        timestamp
      }
    }
  }
`;

const THIS_EMPLOYER = gql`
  query thisEmployer($id: ObjectId) {
    employerPortfolio(query: { _id: $id }) {
      employerName
      jobTitle
      industry
      primaryProduct
      work {
        streetAddress
        city
        state
        zipcode
      }
    }
  }
`;

const THIS_ORGANIZER = gql`
  query thisOrganizer($id: ObjectId) {
    organizerPortfolio(query: { _id: $id }) {
      organizerName
      jobTitle
      industry
      primaryProduct
      work {
        streetAddress
        city
        state
        zipcode
      }
    }
  }
`;

const THIS_GENERAL_USER = gql`
  query thisGeneralUser($id: ObjectId!) {
    user(query: { _id: $id }) {
      firstName
      lastName
      phoneNumber
      userTypes
      email
    }
  }
`;

const THIS_PARENT = gql`
  query thisParent($id: ObjectId) {
    parentPortfolio(query: { _id: $id }) {
      parent {
        streetAddress
        city
        state
        zipcode
      }
      email
    }
  }
`;

const THIS_SCHOOL = gql`
  query thisSchool($id: ObjectId) {
    schoolPortfolio(query: { _id: $id }) {
      staffType
      position
      schoolDistrict
      district {
        streetAddress
        city
        state
        zipcode
      }
    }
  }
`;

const THIS_STUDENT = gql`
  query thisStudent($id: ObjectId) {
    studentPortfolio(query: { _id: $id }) {
      school {
        name
        district
      }
      guardian {
        email
        relationship
        firstName
        lastName
      }
      home {
        streetAddress
        language
        city
        state
        zipcode
      }
      date
      ethnicity
      gender
      grade
      invited
    }
  }
`;

const THIS_TEACHER = gql`
  query thisTeacher($id: ObjectId) {
    teacherPortfolio(query: { _id: $id }) {
      schoolDistrict
      schoolName
      subjects
      schools {
        streetAddress
        city
        state
        zipcode
      }
    }
  }
`;

export {
  TOKEN,
  USER,
  GET_TRANSFER_HISTORY,
  GET_NAMES,
  MY_TOKEN_CUSTOMER,
  SETUP_ROUTE_USER,
  ALL_PORTFOLIOS,
  REFFERERAL_LOG,
  REFERAL_LOG_USERS,
  MY_TOKEN_OWNER,
  USERS,
  THIS_INVITE,
  THIS_EMPLOYER,
  THIS_ORGANIZER,
  THIS_GENERAL_USER,
  THIS_PARENT,
  THIS_SCHOOL,
  THIS_STUDENT,
  THIS_TEACHER
};
