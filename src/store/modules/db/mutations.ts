import { MutationTree } from 'vuex';
import dbState from './state';
// eslint-disable-next-line no-shadow
export const enum MutationTypes {
  setUser = 'Set Current User 🧔🧩'
}
export const mutations: MutationTree<typeof dbState> = {
  [MutationTypes.setUser](state, user: typeof dbState.user) {
    state.user = user;
  }
};
