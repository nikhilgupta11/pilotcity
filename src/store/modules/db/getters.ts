import { GetterTree } from 'vuex';
import { RootState } from '@/store/state';
import dbState from './state';
import { GetterTypes as UserGetters } from '../user/getters';
// eslint-disable-next-line no-shadow
export const enum GetterTypes {
  collection = 'collection'
}
type DbGetterCtx<T> = (
  state: typeof dbState,
  getters: any,
  rootState: RootState,
  rootGetters: any
) => T;
export interface DbGetters extends GetterTree<typeof dbState, RootState> {
  collection: DbGetterCtx<Realm.Services.MongoDBDatabase['collection'] | null | undefined>;
  functions: DbGetterCtx<Realm.DefaultFunctionsFactory & Realm.BaseFunctionsFactory>;
}
export const getters: DbGetters = {
  collection: (_state, _gets, rootState, rootGetters) => {
    return rootGetters[`auth/${UserGetters.getUser}`]
      ? rootGetters[`auth/${UserGetters.getUser}`]?.mongoClient('mongodb-atlas').db('Primary')
          .collection
      : null;
  },
  functions: (_state, _gets, rootGetters, rootState) => {
    return rootState[`auth/getUser`].functions;
  }
};
