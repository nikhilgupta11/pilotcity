import { Module } from 'vuex';
import { RootState } from '@/store/state';
import { actions } from './actions';
import { mutations } from './mutations';
import state from './state';

const fileStorage: Module<typeof state, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};
export default fileStorage;
