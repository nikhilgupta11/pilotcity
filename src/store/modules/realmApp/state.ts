import * as Realm from 'realm-web';

const state: { app: Realm.App } = {
  app: new Realm.App({
    id: process.env.VUE_APP_REALM_ID,
    baseUrl: 'https://realm.mongodb.com'
  })
};
export default state;
