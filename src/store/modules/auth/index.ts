import { Module } from 'vuex';
import { RootState } from '@/store/state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import state from './state';

// Returns the shared instance of the Realm app.
const auth: Module<typeof state, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
export default auth;
