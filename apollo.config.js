module.exports = {
  client: {
    includes: ['src/**/*.{js,jsx,ts,tsx,vue,gql}'],
    service: process.env.NODE_ENV === 'production' ? 'program' : 'programDev'
  },
  service: {
    name: 'programDev',
    endpoint:
      'https://us-west-2.aws.realm.mongodb.com/api/client/v2.0/app/programdev-aogmg/graphql',
    headers: {
      Authorization: 'Bearer izTC1d309E0MmJGq2TQxe1Qmecl6n7LR9RdIUHbo6xsjDgUjsGg47wJMQa29Uw6b'
    }
  }
};
