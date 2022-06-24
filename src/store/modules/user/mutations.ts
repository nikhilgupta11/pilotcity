import { MutationTree } from 'vuex';
import userState from './state';

// eslint-disable-next-line no-shadow
export const enum MutationTypes {
  LOGIN_ANON = '🐱‍👤✔ Login Anonymous',
  LOGIN_ERROR = '🔐❌ Login Error',
  LOGIN_USER = '😎✔ Login User',
  OPEN_DIALOG = 'Open Dialog'
}

export const mutations = {
  [MutationTypes.LOGIN_ANON](state, user: typeof userState.user) {
    state.user = user;
  },
  [MutationTypes.LOGIN_USER](state, user: typeof userState.user) {
    state.user = user;
  },
  [MutationTypes.OPEN_DIALOG](state, data) {
    state.isOpenDialog = data;
  },
  [MutationTypes.LOGIN_ERROR](state, errorCode: string) {
    state.error = errorCode;
    console.error('Could not login');
  }
};
