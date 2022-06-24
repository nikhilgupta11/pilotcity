const MANAGE_TABLE_ITEMS = [
  { title: 'Detail', image: 'https://picsum.photos/510/300?random' },
  { title: 'Manage', image: 'https://picsum.photos/510/300?random' },
  { title: 'Participant', image: 'https://picsum.photos/510/300?random' },
  { title: 'Detail', image: 'https://picsum.photos/510/300?random' },
  { title: 'Manage', image: 'https://picsum.photos/510/300?random' },
  { title: 'Participant', image: 'https://picsum.photos/510/300?random' }
];

const MANAGE_STAKE_HOLDERS_HEADER = [
  {
    text: 'Index',
    align: 'start',
    value: 'index',
    sortable: false,
    width: '5%'
  },
  { text: 'First Name', value: 'first', width: '20%' },
  { text: 'Last Name', value: 'last', width: '20%' },
  { text: 'Organization', value: 'organization', width: '25%' },
  {
    text: 'Role',
    value: 'role',
    sortable: false,
    width: '25%'
  }
];

const MANAGE_STAKE_HOLDERS_ITEMS = [
  { first: 'Prajit', last: 'saravanan', organization: 'IHS' },
  { first: 'Akheel', last: 'Shaik', organization: 'IHS' },
  { first: 'Jerold', last: 'Inocencio', organization: 'IHS' },
  { first: 'Eric', last: 'Reyes', organization: 'IHS' },
  { first: 'Derick', last: 'Lee', organization: 'IHS' },
  { first: 'Monica', last: 'Willemsz', organization: 'IHS' },
  { first: 'Stephanie', last: 'Betancourt', organization: 'AHS' },
  { first: 'Kenneth', last: 'Thai', organization: 'AHS' },
  { first: 'Kristen', last: 'Chan', organization: 'AHS' },
  { first: 'Sean', last: 'Morgan', organization: 'AHS' },
  { first: 'Prajit', last: 'saravanan', organization: 'IHS' },
  { first: 'Akheel', last: 'Shaik', organization: 'IHS' },
  { first: 'Jerold', last: 'Inocencio', organization: 'IHS' },
  { first: 'Eric', last: 'Reyes', organization: 'IHS' },
  { first: 'Derick', last: 'Lee', organization: 'IHS' },
  { first: 'Monica', last: 'Willemsz', organization: 'IHS' },
  { first: 'Stephanie', last: 'Betancourt', organization: 'AHS' },
  { first: 'Kenneth', last: 'Thai', organization: 'AHS' },
  { first: 'Kristen', last: 'Chan', organization: 'AHS' },
  { first: 'Sean', last: 'Morgan', organization: 'AHS' }
];

const PARTICIPANTS_HEADERS = [
  {
    text: 'Order',
    align: 'start',
    value: 'index',
    sortable: false,
    width: '5%'
  },
  { text: 'First Name', value: 'first', width: '20%' },
  { text: 'Last Name', value: 'last', width: '20%' },
  { text: 'School', value: 'school', width: '25%' },
  {
    text: 'Approve',
    value: 'approve',
    sortable: false,
    width: '15%'
  },
  {
    text: 'Deny',
    value: 'deny',
    sortable: false,
    width: '10%'
  }
];

const PARTICIPANTS_ITEMS = [
  { first: 'Prajit', last: 'saravanan', school: 'Irvington High School' },
  { first: 'Akheel', last: 'Shaik', school: 'Arroyo High School' },
  { first: 'Jerold', last: 'Inocencio', school: 'San Leandro High School' },
  { first: 'Eric', last: 'Reyes', school: 'Ocean Charter High School' },
  { first: 'Derick', last: 'Lee', school: 'Berkeley Technology Academy' },
  { first: 'Monica', last: 'Willemsz', school: 'Skyline High School' },
  { first: 'Stephanie', last: 'Betancourt', school: 'Antioch High School' },
  { first: 'Kenneth', last: 'Thai', school: 'American High School' },
  { first: 'Kristen', last: 'Chan', school: 'Mission San Jose High School' },
  { first: 'Sean', last: 'Morgan', school: 'American High School' },
  { first: 'Prajit', last: 'saravanan', school: 'Irvington High School' },
  { first: 'Akheel', last: 'Shaik', school: 'Irvington High School' },
  { first: 'Jerold', last: 'Inocencio', school: 'Arroyo High School' },
  { first: 'Eric', last: 'Reyes', school: 'Arroyo High School' },
  { first: 'Derick', last: 'Lee', school: 'San Leandro High School' },
  { first: 'Monica', last: 'Willemsz', school: 'College Park High School' },
  { first: 'Stephanie', last: 'Betancourt', school: 'San Leandro High School' },
  { first: 'Kenneth', last: 'Thai', school: 'Arroyo High School' },
  { first: 'Kristen', last: 'Chan', school: 'Alameda High School' },
  { first: 'Sean', last: 'Morgan', school: 'American High School' }
];

const LIST_VIEW_HEADERS = [
  {
    text: 'Index',
    align: 'start',
    value: 'index',
    sortable: false,
    width: '5%'
  },
  { text: 'First Name', value: 'first', width: '20%' },
  { text: 'Last Name', value: 'last', width: '20%' },
  { text: 'Organization', value: 'organization', width: '25%' }
];

const LIST_VIEW_ITEMS = [
  { first: 'Prajit', last: 'saravanan', organization: 'IHS' },
  { first: 'Akheel', last: 'Shaik', organization: 'IHS' },
  { first: 'Jerold', last: 'Inocencio', organization: 'IHS' },
  { first: 'Eric', last: 'Reyes', organization: 'IHS' },
  { first: 'Derick', last: 'Lee', organization: 'IHS' },
  { first: 'Monica', last: 'Willemsz', organization: 'IHS' },
  { first: 'Stephanie', last: 'Betancourt', organization: 'AHS' },
  { first: 'Kenneth', last: 'Thai', organization: 'AHS' },
  { first: 'Kristen', last: 'Chan', organization: 'AHS' },
  { first: 'Sean', last: 'Morgan', organization: 'AHS' },
  { first: 'Prajit', last: 'saravanan', organization: 'IHS' },
  { first: 'Akheel', last: 'Shaik', organization: 'IHS' },
  { first: 'Jerold', last: 'Inocencio', organization: 'IHS' },
  { first: 'Eric', last: 'Reyes', organization: 'IHS' },
  { first: 'Derick', last: 'Lee', organization: 'IHS' },
  { first: 'Monica', last: 'Willemsz', organization: 'IHS' },
  { first: 'Stephanie', last: 'Betancourt', organization: 'AHS' },
  { first: 'Kenneth', last: 'Thai', organization: 'AHS' },
  { first: 'Kristen', last: 'Chan', organization: 'AHS' },
  { first: 'Sean', last: 'Morgan', organization: 'AHS' }
];

const FILTER_CHIPS = [
  {
    label: 'Outcomes',
    color: 'green'
  },
  {
    label: 'Participants',
    color: 'blue'
  },
  {
    label: 'Projects',
    color: 'red'
  }
];

const NAV_ITEMS = [
  { title: 'Detail', color: 'purple' },
  { title: 'Setup', color: 'orange' },
  { title: 'Manage', color: 'blue' },
  { title: 'Participants', color: 'green' },
  { title: 'Stakeholders', color: 'red' }
];

export {
  MANAGE_TABLE_ITEMS,
  MANAGE_STAKE_HOLDERS_HEADER,
  MANAGE_STAKE_HOLDERS_ITEMS,
  PARTICIPANTS_HEADERS,
  PARTICIPANTS_ITEMS,
  LIST_VIEW_HEADERS,
  LIST_VIEW_ITEMS,
  FILTER_CHIPS,
  NAV_ITEMS
};
