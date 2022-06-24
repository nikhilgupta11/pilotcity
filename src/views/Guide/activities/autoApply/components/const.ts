export const HEADER = [
  { text: 'Group', align: 'center', value: 'group', sortable: false, width: '10%' },
  { text: 'Order', align: 'center', value: 'index', sortable: false, width: '5%' },

  { text: 'Activity', align: 'start', value: 'activity', sortable: false, width: '45%' },

  { text: 'Type', align: 'center', value: 'type', sortable: false, width: '15%' },

  { text: 'Status', align: 'center', value: 'status', sortable: false, width: '5%' }
];

export const items = [
  {
    // need to ask
    index: 1,
    activity: 'Start',
    completion: '100%',
    updated: 'Today at 7:30pm',
    type: 'Activity',
    group: 'Onboard',
    color: 'green'
  },
  {
    index: 2,
    activity: 'Scope',
    completion: '100%',
    updated: 'Yesterday at 12:30pm',
    type: 'Activity',
    group: 'Onboard',
    color: 'green'
  },
  {
    index: 3,
    activity: 'Community',
    completion: '100%',
    updated: 'Oct 10 at 7:30pm',
    type: 'Activity',
    group: 'Onboard',
    color: 'green'
  },
  {
    // need to ask
    index: 4,
    activity: 'Team',
    completion: '100%',
    updated: 'Jul 12 at 3:30pm',
    type: 'Activity',
    group: 'Onboard',
    color: 'green'
  },
  {
    index: 5,
    activity: 'Train',
    completion: '100%',
    updated: 'Oct 15 at 3:30pm',
    type: 'Activity',
    group: 'Research',
    color: 'green'
  },
  {
    index: 6,
    activity: 'Research',
    completion: '100%',
    updated: 'Oct 16 at 3:30pm',
    type: 'Activity',
    group: 'Research',
    color: 'green'
  },
  {
    index: 7,
    activity: 'Tinker',
    completion: '0%',
    updated: 'Oct 2 at 7:30pm',
    type: 'Deliverable',
    group: 'Research',
    color: 'green'
  },
  {
    index: 8,
    activity: 'Ideate',
    completion: '0%',
    updated: 'Oct 23 at 9:30pm',
    type: 'Deliverable',
    group: 'Design',
    color: 'green'
  },
  {
    index: 9,
    activity: 'Pitch',
    completion: '0%',
    updated: 'Oct 5 at 8:30pm',
    type: 'Deliverable',
    group: 'Design',
    color: 'green'
  },
  {
    index: 10,
    activity: 'Forum',
    completion: '0%',
    updated: 'Oct 4 at 7:30pm',
    type: 'Activity',
    group: 'Design',
    color: 'green'
  },
  {
    index: 11,
    activity: 'Make',
    completion: '0%',
    updated: 'Oct 23 at 7:30pm',
    type: 'Deliverable',
    group: 'Prototype',
    color: 'green'
  },
  {
    index: 12,
    activity: 'Demo',
    completion: '0%',
    updated: 'Oct 31 at 4:30pm',
    type: 'Deliverable',
    group: 'Prototype',
    color: 'green'
  }
];

export const group = ['Setup', 'Project', 'Screening', 'Internship'];
export const required = ['Creator requires this activity', 'Yes', 'No'];
export const lockOrder = ['Creator locked activity group and placement order', 'Yes', 'No'];
export const deliverable = ['Yes', 'No'];
export const notifications = ['Creator turned on by default', 'Turn on', 'Turn off'];
export const accessibility = [
  'Creator has turned off accessibility anytime',
  'Creator has turned on accessibility anytime',
  'Yes',
  'No'
];
export const endEarly = [
  'Creator has not allowed participants to end early after this activity',
  'Creator has allow end early option only at preset order placement',
  'Yes',
  'No'
];
