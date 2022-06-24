import * as Realm from 'realm-web';

const state: { user: typeof Realm.User; error: string | false } = {
  user: Realm.User,
  error: false
};
export default state;
