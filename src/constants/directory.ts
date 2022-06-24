const headerValue = [
  {
    text: 'Contact Preferences',
    align: 'start',
    value: 'preference',
    sortable: false,
    width: '10%'
  },
  {
    text: 'Name',
    align: 'start',
    value: 'name',
    sortable: true,
    width: '25%'
  },

  {
    text: 'Position',
    align: 'start',
    value: 'role',
    sortable: true,
    width: '25%'
  },
  {
    text: 'Email',
    align: 'start',
    value: 'email',
    sortable: false,
    width: '25%'
  },
  {
    text: 'Phone',
    align: 'start',
    value: 'phoneNumber',
    sortable: false,
    width: '25%'
  }

  // { text: 'Discord', align: 'start', value: 'discord', sortable: false, width: '25%' }
];

const itemValue = [
  {
    firstName: 'Prajit',
    lastName: 'Saravanan',
    role: 'Liaison',
    email: 'mazlein@cognixion.com',
    phoneNumber: '(510) 676-5861'
  },
  {
    firstName: 'Prajit',
    lastName: 'Saravanan',
    role: 'Intern',
    email: 'prajit@gmail.com',
    phoneNumber: '(510) 555-5555'
  },
  {
    firstName: 'lurii',
    lastName: 'Tatishchev',
    role: 'Fellow',
    email: 'pveda@gmail.com',
    phoneNumber: '(510) 555-5555'
  },
  {
    firstName: 'lurii',
    lastName: 'Tatishchev',
    role: 'Intern',
    email: 'ytat@gmail.com',
    phoneNumber: '(510) 555-5555'
  }
];

// eslint-disable-next-line import/prefer-default-export
export { headerValue, itemValue };
