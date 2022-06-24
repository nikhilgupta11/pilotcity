import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { RootState } from '../../state';
import state from './state';

const tools: Module<typeof state, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
export default tools;
