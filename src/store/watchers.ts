import { watch } from '@vue/composition-api';
import { ObjectId } from 'bson';
import * as Realm from 'realm-web';
import store, { useUserGetters, useDbGetters, useRealmAppState, useUserActions } from '@/store';
import { MutationTypes } from './modules/db/mutations';

const { app } = useRealmAppState(['app']);

const { getUser } = useUserGetters(['getUser']);
const { fetchUser } = useUserActions(['fetchUser']);
const { collection } = useDbGetters(['collection']);
// eslint-disable-next-line import/prefer-default-export
export const setUser = watch(
  getUser,
  async newUser => {
    if (!newUser && localStorage.getItem('apollo-token')) {
      await fetchUser(localStorage.getItem('apollo-token'));
    } else if (newUser) {
      const user = await collection.value!('User').findOne({ _id: new ObjectId(newUser._id) });
      store.commit(`db/${MutationTypes.setUser}`, user);
    } else {
      app.value.logIn(Realm.Credentials.anonymous());
    }
  },
  {
    immediate: true
  }
);
