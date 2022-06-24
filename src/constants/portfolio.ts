const CITIZEN_TYPES = [
  {
    text: 'Student',
    value: 'Student'
  },
  {
    text: 'Employer',
    value: 'Employer'
  },
  {
    text: 'Teacher',
    value: 'Teacher'
  },
  {
    text: 'School',
    value: 'School'
  },
  {
    text: 'Parent',
    value: 'Parent'
  },
  {
    text: 'Organizer',
    value: 'Organizer'
  }
];

const GRADE_LEVEL = [
  {
    text: '6th Grade',
    value: '6'
  },
  {
    text: '7th Grade',
    value: '7'
  },
  {
    text: '8th Grade',
    value: '8'
  },
  {
    text: '9th Grade',
    value: '9'
  },
  {
    text: '10th Grade',
    value: '10'
  },
  {
    text: '11th Grade',
    value: '11'
  },
  {
    text: '12th Grade',
    value: '12'
  },
  {
    text: 'College Freshmen',
    value: '13'
  },

  {
    text: 'College Sophomore',
    value: '14'
  },

  {
    text: 'College Junior',
    value: '15'
  },
  {
    text: 'College Senior',
    value: '16'
  },
  {
    text: 'Not Listed',
    value: 'Not Listed'
  }
];

const SUPER_GENDER = [
  {
    text: 'Female',
    value: 'Female'
  },
  {
    text: 'Male',
    value: 'Male'
  },
  {
    text: 'Transgender Female',
    value: 'Transgender Female'
  },
  {
    text: 'Transgender Male',
    value: 'Transgender Male'
  },
  {
    text: 'Gender Variant / Non-Conforming',
    value: 'Gender Variant / Non-Conforming'
  },

  {
    text: 'Not Listed',
    value: 'Not Listed'
  }
];

const ETHNICITY = [
  {
    text: 'American Indian or Alaska Native',
    value: 'American Indian or Alaska Native'
  },
  {
    text: 'Asian',
    value: 'Asian'
  },
  {
    text: 'Black or African American',
    value: 'Black or African American'
  },
  {
    text: 'Hispanic',
    value: 'Hispanic'
  },
  {
    text: 'Pacific Islander or Native Hawaiian',
    value: 'Pacific Islander or Native Hawaiian'
  },

  {
    text: 'White / Caucasian',
    value: 'White / Caucasian'
  }
];

const GUARDIAN = [
  {
    text: 'Mother',
    value: 'Mother'
  },
  {
    text: 'Father',
    value: 'Father'
  },
  {
    text: 'Sister',
    value: 'Sister'
  },
  {
    text: 'Brother',
    value: 'Brother'
  },
  {
    text: 'Grandmother',
    value: 'Grandfather'
  },

  {
    text: 'Aunt',
    value: 'Aunt'
  },
  {
    text: 'Uncle',
    value: 'Uncle'
  },
  {
    text: 'Friend',
    value: 'Friend'
  },
  {
    text: 'None',
    value: 'None'
  }
];

const HOME_LANG = [
  {
    text: 'Arabic',
    value: 'Arabic'
  },

  {
    text: 'Bengali',
    value: 'Bengali'
  },

  {
    text: 'Chinese',
    value: 'Chinese'
  },

  {
    text: 'English',
    value: 'English'
  },

  {
    text: 'French',
    value: 'French'
  },

  {
    text: 'German',
    value: 'German'
  },

  {
    text: 'Hindi',
    value: 'Hindi'
  },

  {
    text: 'Italian',
    value: 'Italian'
  },

  {
    text: 'Japanese',
    value: 'Japanese'
  },

  {
    text: 'Korean',
    value: 'Korean'
  },

  {
    text: 'Lahnda',
    value: 'Lahnda'
  },

  {
    text: 'Marathi',
    value: 'Marathi'
  },

  {
    text: 'Portuguese',
    value: 'Portuguese'
  },

  {
    text: 'Russian',
    value: 'Russian'
  },

  {
    text: 'Spanish',
    value: 'Spanish'
  },

  {
    text: 'Tagalog',
    value: 'Tagalog'
  },

  {
    text: 'Tamil',
    value: 'Tamil'
  },

  {
    text: 'Telugu',
    value: 'Telugu'
  },

  {
    text: 'Turkish',
    value: 'Turkish'
  },

  {
    text: 'Urdu',
    value: 'Urdu'
  },

  {
    text: 'Vietnamese',
    value: 'Vietnamese'
  },

  {
    text: 'Not Listed',
    value: 'Not Listed'
  }
];

const SCHOOL_ROLE = [
  {
    text: 'Principal',
    value: 'Principal'
  },
  {
    text: 'Assistant Principal',
    value: 'Assistant Principal'
  },
  {
    text: 'Teacher on Special Assignment (TOSA)',
    value: 'Teacher on Special Assignment (TOSA)'
  },
  {
    text: 'Director',
    value: 'Director'
  },
  {
    text: 'Manager',
    value: 'Manager'
  },
  {
    text: 'Coordinator',
    value: 'Coordinator'
  },
  {
    text: 'Specialist',
    value: 'Specialist'
  },
  {
    text: 'Not Listed',
    value: 'Not Listed'
  }
];

const STATE = [
  'AK',
  'AL',
  'AR',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'IA',
  'ID',
  'IL',
  'IN',
  'KS',
  'KY',
  'LA',
  'MA',
  'MD',
  'ME',
  'MI',
  'MN',
  'MO',
  'MS',
  'MT',
  'NC',
  'ND',
  'NE',
  'NH',
  'NJ',
  'NM',
  'NV',
  'NY',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VA',
  'VT',
  'WA',
  'WI',
  'WV',
  'WY'
];

const ALL_INVITE_HEADER = [
  {
    text: 'Index',
    align: 'start',
    value: 'index',
    sortable: false,
    width: '5%'
  },
  { text: 'Status', value: 'status', width: '10%' },
  { text: 'Date', value: 'date', width: '15%' },
  { text: 'First Name', value: 'contact', width: '15%' },
  { text: 'Last Name', value: 'contact', width: '15%' },
  { text: 'User Type', value: 'contact', width: '10%' },
  { text: 'Email', value: 'contact', width: '25%' },
  { text: 'Action', value: 'contact', width: '10%' }

  // {
  //   text: 'Pending',
  //   value: 'pending',
  //   sortable: false,
  //   width: '15%'
  // }
];

const SPONSOR_LINKS_TABLE_HEADER = [
  {
    text: 'Sponsor',
    align: 'start',
    value: 'sponsor',
    sortable: false,
    width: '30%'
  },
  { text: 'Link & Code', value: 'shareCode', width: '40%', sortable: false },
  { text: 'Uses', value: 'uses', width: '15%', sortable: false },
  { text: 'Delete', value: 'revoke', width: '15%', sortable: false }
  //   { text: 'Expires', value: 'expireAt', width: '25%' }
];

const BALANCE_HEADER = [
  {
    text: 'Index',
    align: 'start',
    value: 'index',
    sortable: false,
    width: '5%'
  },
  { text: 'Name', value: 'name', width: '25%' },
  { text: 'Date', value: 'date', width: '25%' },
  { text: 'Amount', value: 'amount', width: '25%' }
];

export {
  CITIZEN_TYPES,
  GRADE_LEVEL,
  SUPER_GENDER,
  ETHNICITY,
  GUARDIAN,
  HOME_LANG,
  SCHOOL_ROLE,
  STATE,
  ALL_INVITE_HEADER,
  SPONSOR_LINKS_TABLE_HEADER,
  BALANCE_HEADER
};
