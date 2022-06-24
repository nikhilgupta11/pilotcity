import { ActionTree, ActionContext } from 'vuex';
import * as Realm from 'realm-web';
import { RootState } from '@/store/state';
// import { onLogin, onLogout } from '@/vue-apollo';
import { MutationTypes as DbMutationTypes } from '@/store/modules/db/mutations';
import { MutationTypes } from './mutations';
import authState from './state';

// eslint-disable-next-line no-shadow
export enum ActionTypes {
  loginAnon = 'loginAnon',
  loginUser = 'loginUser',
  signup = 'signup',
  confirmUser = 'confirmUser',
  logout = 'logout',
  resetPassword = 'resetPassword',
  resendEmailConfirmation = 'resendEmailConfirmation',
  sendResetPassword = 'sendResetPassword'
}
type AuthActionCtx = ActionContext<typeof authState, RootState>;

export interface AuthActions extends ActionTree<typeof authState, RootState> {
  // loginAnon: (ctx: AuthActionCtx) => Promise<void>;
  loginUser: (
    ctx: AuthActionCtx,
    payload: { email: string; password: string }
  ) => Promise<RootState['realmApp']['app']['currentUser']>;
  signup: (ctx: AuthActionCtx, payload: { email: string; password: string }) => Promise<void>;
  confirmUser: (
    ctx: AuthActionCtx,
    payload: {
      token: string;
      tokenId: string;
      username: string;
    }
  ) => Promise<void>;
  logout: (ctx: AuthActionCtx) => Promise<void>;
  resetPassword: (
    ctx: AuthActionCtx,
    payload: { token: string; tokenId: string; password: string }
  ) => Promise<void>;
  resendEmailConfirmation: (ctx: AuthActionCtx, payload: { email: string }) => Promise<void>;
  sendResetPassword: (ctx: AuthActionCtx, payload: { email: string }) => Promise<void>;
}
export const actions: AuthActions = {
  async loginUser({ commit }, data) {
    try {
      commit(MutationTypes.LOGIN_USER, data);
      return data;
    } catch (err) {
      commit(MutationTypes.LOGIN_ERROR, err);
      throw err;
    }
  },
  async signup({ commit, rootState }, { email, password }: { email: string; password: string }) {
    try {
      await rootState.realmApp.app.emailPasswordAuth.registerUser(email, password);
      commit(MutationTypes.SIGNUP);
    } catch (err) {
      commit(MutationTypes.SIGNUP_ERROR, err);
      throw err;
    }
  },
  async confirmUser({ commit, rootState }, { token, tokenId }) {
    try {
      await rootState.realmApp.app.emailPasswordAuth.confirmUser(token, tokenId);
      commit(MutationTypes.CONFIRMED_USER);
    } catch (err) {
      commit(MutationTypes.CONFIRMATION_ERROR, err);
      throw new Error('Could not confirm the user');
    }
  },
  async logout({ commit, rootState }) {
    try {
      await rootState.realmApp.app.currentUser?.logOut();
      // await onLogout();
      commit(`db/${DbMutationTypes.setUser}`, null, { root: true });
      commit(MutationTypes.LOGOUT);
    } catch (err) {
      commit(MutationTypes.LOGOUT_ERROR, err);
    }
  },
  async resetPassword({ commit, rootState }, { token, tokenId, password }) {
    try {
      await rootState.realmApp.app.emailPasswordAuth.resetPassword(token, tokenId, password);
      commit(MutationTypes.PASSWORD_RESET);
    } catch (err) {
      commit(MutationTypes.PASSWORD_RESET_ERROR, err);
      throw new Error('Could not reset Password');
    }
  },
  async changePassword({ commit, rootState }, { email, password }) {
    try {
      const args: any = [];
      await rootState.realmApp.app.emailPasswordAuth.callResetPasswordFunction(
        email,
        password,
        args
      );
      commit(MutationTypes.PASSWORD_RESET);
    } catch (err) {
      commit(MutationTypes.PASSWORD_RESET_ERROR, err);
      throw new Error('Could not reset Password');
    }
  },
  async resendEmailConfirmation({ commit, rootState }, { email }) {
    try {
      await rootState.realmApp.app.emailPasswordAuth.resendConfirmationEmail(email);
      commit(MutationTypes.SIGNUP);
    } catch (err) {
      commit(MutationTypes.SIGNUP_ERROR, err);
      throw new Error('Could not send email verification');
    }
  },
  async sendResetPassword({ rootState }, { email }) {
    return rootState.realmApp.app.emailPasswordAuth.sendResetPasswordEmail(email);
  }
};
