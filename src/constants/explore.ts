const LIST_VIEW_HEADER = [
  { text: 'Order', align: 'center', value: 'index', sortable: false, width: '5%' },
  { text: 'Group', align: 'center', value: 'group', sortable: false, width: '5%' },
  { text: 'Activity', align: 'start', value: 'activity', sortable: false, width: '25%' },

  { text: 'Type', align: 'center', value: 'type', sortable: false, width: '10%' },
  // { text: 'Progress', align: 'start', value: 'progress', sortable: false, width: '25%' },
  // { text: 'Completion', align: 'center', value: 'completion', sortable: false, width: '10%' },
  { text: 'Status', align: 'center', value: 'status', sortable: false, width: '10%' },
  { text: 'Last Updated', align: 'start', value: 'updated', sortable: false, width: '20%' },
  { text: 'Monitor', align: 'center', value: 'click', sortable: false, width: '25%' }
];

const LIST_VIEW_ITEMS = [
  { index: '1', activity: 'Join', completion: '100%', updated: 'Today at 7:30pm' },
  {
    index: '2',
    activity: 'Scope',
    completion: '100%',
    updated: 'Yesterday at 12:30pm'
  },
  { index: '3', activity: 'Team', completion: '100%', updated: 'Jul 12 at 3:30pm' },
  { index: '4', activity: 'Discord', completion: '100%', updated: 'Oct 10 at 7:30pm' },
  { index: '5', activity: 'Train', completion: '100%', updated: 'Oct 15 at 3:30pm' },
  { index: '6', activity: 'Research', completion: '100%', updated: 'Oct 16 at 3:30pm' },
  { index: '7', activity: 'Practice', completion: '0%', updated: 'Oct 2 at 7:30pm' },
  { index: '8', activity: 'Ideate', completion: '0%', updated: 'Oct 23 at 9:30pm' },
  { index: '9', activity: 'Pitch', completion: '0%', updated: 'Oct 5 at 8:30pm' },
  { index: '10', activity: 'Interact', completion: '0%', updated: 'Oct 4 at 7:30pm' },
  { index: '11', activity: 'Design & Prototype', completion: '0%', updated: 'Oct 23 at 7:30pm' },
  { index: '12', activity: 'Prospect', completion: '0%', updated: 'Oct 9 at 8:30pm' },
  { index: '13', activity: 'Demonstration', completion: '0%', updated: 'Oct 31 at 4:30pm' },
  { index: '14', activity: 'Present', completion: '0%', updated: 'Oct 20 at 3:30pm' },
  { index: '15', activity: 'Auto-Apply', completion: '0%', updated: 'Oct 40 at 2:30pm' },
  { index: '16', activity: 'Interview', completion: '0%', updated: 'Oct 20 at 1:30pm' },
  { index: '17', activity: 'Offer', completion: '0%', updated: 'Oct 11 at 8:30pm' },
  { index: '18', activity: 'Results', completion: '0%', updated: 'Oct 16 at 8:30pm' }
];

const BAR_SEQUENCE = {
  Project: {
    icon: '',
    color: 'green',
    submodule: [
      { title: 'Launch Day' },
      { title: 'Cowork' },
      {
        title: 'Research & Practice'
      },
      {
        title: 'Ideate'
      },
      {
        title: 'Hack Day'
      },
      {
        title: 'Reflection'
      },
      {
        title: 'Design & Prototype'
      },
      {
        title: 'Package'
      },
      {
        title: 'Demo Day'
      },
      {
        title: 'Finish Lane'
      }
    ]
  },
  Internship: {
    icon: '',
    color: 'purple',
    submodule: [
      {
        title: 'Auto-App'
      },
      {
        title: 'Interviews'
      },
      {
        title: 'Offers'
      }
    ]
  }
};

const BAR_ITEMS2 = [
  {
    items: [
      { title: 'Irvington High School' },
      { title: '9th Grade' },
      { title: 'City of Fremont' }
    ],
    title: 'Prajit Saravanan'
  },
  {
    items: [{ title: 'Arroyo High School' }, { title: '12th Grade' }, { title: 'Team Drones' }],
    title: 'Eric Reyes'
  },
  {
    items: [
      { title: 'Irvington High School' },
      { title: '12th Grade' },
      { title: 'City of Fremont' }
    ],
    title: 'Akheel Shaik'
  },
  {
    items: [{ title: 'Hillsdale High School' }, { title: '10th Grade' }, { title: 'Typeform' }],
    title: 'Noah MacLean'
  },
  {
    items: [
      { title: 'Irvington High School' },
      { title: '12th Grade' },
      { title: 'Kaiser Permanente' }
    ],
    title: 'Eric Xie'
  },
  {
    items: [
      { title: 'Washington High School' },
      { title: '11th Grade' },
      { title: 'Strategy of Things' }
    ],
    title: 'Maya Campos'
  },
  {
    items: [
      { title: 'Irvington High School' },
      { title: '9th Grade' },
      { title: 'City of Fremont' }
    ],
    title: 'Prajit Saravanan'
  },
  {
    items: [{ title: 'Arroyo High School' }, { title: '12th Grade' }, { title: 'Team Drones' }],
    title: 'Eric Reyes'
  },
  {
    items: [
      { title: 'Irvington High School' },
      { title: '12th Grade' },
      { title: 'City of Fremont' }
    ],
    title: 'Akheel Shaik'
  },
  {
    items: [{ title: 'Hillsdale High School' }, { title: '10th Grade' }, { title: 'Typeform' }],
    title: 'Noah MacLean'
  },
  {
    items: [
      { title: 'Irvington High School' },
      { title: '12th Grade' },
      { title: 'Kaiser Permanente' }
    ],
    title: 'Eric Xie'
  },
  {
    items: [
      { title: 'Washington High School' },
      { title: '11th Grade' },
      { title: 'Strategy of Things' }
    ],
    title: 'Maya Campos'
  },
  {
    items: [
      { title: 'Irvington High School' },
      { title: '9th Grade' },
      { title: 'City of Fremont' }
    ],
    title: 'Prajit Saravanan'
  },
  {
    items: [{ title: 'Arroyo High School' }, { title: '12th Grade' }, { title: 'Team Drones' }],
    title: 'Eric Reyes'
  },
  {
    items: [
      { title: 'Irvington High School' },
      { title: '12th Grade' },
      { title: 'City of Fremont' }
    ],
    title: 'Akheel Shaik'
  },
  {
    items: [{ title: 'Hillsdale High School' }, { title: '10th Grade' }, { title: 'Typeform' }],
    title: 'Noah MacLean'
  },
  {
    items: [
      { title: 'Irvington High School' },
      { title: '12th Grade' },
      { title: 'Kaiser Permanente' }
    ],
    title: 'Eric Xie'
  },
  {
    items: [
      { title: 'Washington High School' },
      { title: '11th Grade' },
      { title: 'Strategy of Things' }
    ],
    title: 'Maya Campos'
  }
];

const BAR_AGES = [
  {
    text: 'All Ages',
    color: 'grey darken-4'
  },
  {
    text: '12',
    color: 'grey darken-4'
  },
  {
    text: '13',
    color: 'grey darken-4'
  },
  {
    text: '14',
    color: 'grey darken-4'
  },
  {
    text: '15',
    color: 'grey darken-4'
  },
  {
    text: '16',
    color: 'grey darken-4'
  },
  {
    text: '17',
    color: 'grey darken-4'
  },
  {
    text: '18',
    color: 'grey darken-4'
  },
  {
    text: '19',
    color: 'grey darken-4'
  },
  {
    text: '20',
    color: 'grey darken-4'
  },
  {
    text: '21',
    color: 'grey darken-4'
  },
  {
    text: '22',
    color: 'grey darken-4'
  }
];

const BAR_PATHWAYS = [
  // { header: 'Filter by programs' },
  {
    text: 'All',
    color: 'grey darken-4'
  },
  {
    text: 'Agriculture & Natural Resources',
    color: 'grey darken-4'
  },
  {
    text: 'Arts, Media & Entertainment',
    color: 'grey darken-4'
  },
  {
    text: 'Building & Construction Trades',
    color: 'grey darken-4'
  },
  {
    text: 'Business & Finance',
    color: 'grey darken-4'
  },
  {
    text: 'Education, Childhood Development & Family Services',
    color: 'grey darken-4'
  },
  {
    text: 'Energy, Environment & Utilities',
    color: 'grey darken-4'
  },
  {
    text: 'Engineering & Architecture',
    color: 'grey darken-4'
  },
  {
    text: 'Fashion & Interior Design',
    color: 'grey darken-4'
  },
  {
    text: 'Health Science & Medical Technology',
    color: 'grey darken-4'
  },
  {
    text: 'Hospitality, Tourism & Recreation',
    color: 'grey darken-4'
  },
  {
    text: 'Information & Communication Technologies',
    color: 'grey darken-4'
  },
  {
    text: 'Manufacturing & Product Design',
    color: 'grey darken-4'
  },
  {
    text: 'Marketing, Sales & Service',
    color: 'grey darken-4'
  },
  {
    text: 'Public Services',
    color: 'grey darken-4'
  },
  {
    text: 'Transportation',
    color: 'grey darken-4'
  }
];

export { LIST_VIEW_HEADER, LIST_VIEW_ITEMS, BAR_SEQUENCE, BAR_ITEMS2, BAR_AGES, BAR_PATHWAYS };
