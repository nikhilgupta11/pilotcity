const MONITOR_HEADER = [
  { text: 'Order', align: 'center', value: 'index', sortable: false, width: '5%' },
  // { text: 'Group', align: 'center', value: 'group', sortable: false, width: '5%' },
  { text: 'Activity', align: 'start', value: 'activity', sortable: false, width: '25%' },

  // { text: 'Type', align: 'center', value: 'type', sortable: false, width: '10%' },
  // { text: 'Progress', align: 'start', value: 'progress', sortable: false, width: '25%' },
  // { text: 'Completion', align: 'center', value: 'completion', sortable: false, width: '10%' },
  { text: 'Status', align: 'center', value: 'status', sortable: false, width: '10%' },
  { text: 'Completed Time', align: 'start', value: 'completedTime', sortable: false, width: '20%' },
  { text: 'Monitor', align: 'center', value: 'click', sortable: false, width: '25%' }
];

const ACTIVITIES = [
  {
    text: 'All Activities',
    value: ''
  },
  {
    text: 'Scope'
  },
  {
    text: 'Community'
  },
  {
    text: 'Team'
  },
  {
    text: 'Train'
  },
  {
    text: 'Research'
  },
  {
    text: 'Tinker'
  },
  {
    text: 'Ideate'
  },
  {
    text: 'Pitch'
  },
  {
    text: 'Forum'
  },
  {
    text: 'Make'
  },
  {
    text: 'Demo'
  },
  {
    text: 'Auto Apply'
  },
  {
    text: 'Interview'
  },
  {
    text: 'Offer'
  }
];

export { MONITOR_HEADER, ACTIVITIES };
