import axios from 'axios';
import { ActionTree, ActionContext } from 'vuex';
import { RootState } from '../../state';
import { MutationTypes } from './mutations';
import { MutationTypes as DbMutation } from '../db/mutations';
import userState from './state';

// eslint-disable-next-line no-shadow
export enum ActionTypes {
  loginUser = 'loginUser',
  fetchUser = 'fetchUser',
  refreshToken = 'refreshToken',
  forcedLogout = 'forcedLogout'
}
type UserActionCtx = ActionContext<typeof userState, RootState>;

export interface UserActions extends ActionTree<typeof userState, RootState> {
  loginUser: (ctx: UserActionCtx, payload) => Promise<void>;
}

export const actions: UserActions = {
  async loginUser({ commit }, data) {
    try {
      commit(MutationTypes.LOGIN_USER, data);
      commit(`db/${DbMutation.setUser}`, data);
      return data;
    } catch (err) {
      commit(MutationTypes.LOGIN_ERROR, err);
      throw err;
    }
  },

  async refreshToken({ commit, dispatch }, data) {
    try {
      const tknData = {
        refresh_token: localStorage.getItem('apollo-refresh-token')
      };
      const resp = await axios.post(`${process.env.VUE_APP_AUTH0}/generate-access-token`, tknData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (resp.data.data) {
        localStorage.setItem('apollo-token', resp.data.data.access_token);
        localStorage.setItem('apollo-refresh-token', resp.data.data.refresh_token);
        window.location.href = `/portfolio`;
      }
    } catch (error) {
      console.log(error);
    }
  },

  async fetchUser({ commit, dispatch }, data) {
    try {
      const resp = await axios.get(`${process.env.VUE_APP_AUTH0}/get-mongo-user`, {
        headers: {
          Authorization: `Bearer ${data}`
        }
      });
      commit(MutationTypes.LOGIN_USER, resp.data);
      commit(`db/${DbMutation.setUser}`, resp.data);
      return resp.data;
    } catch (err) {
      console.log(err);
      if (err) {
        dispatch('refreshToken', localStorage.getItem('apollo-token'));
        dispatch('forcedLogout');
      }
      commit(MutationTypes.LOGIN_ERROR, err);
      throw err;
    }
  },

  async forcedLogout() {
    localStorage.removeItem('apollo-token');
    localStorage.removeItem('apollo-refresh-token');
    window.location.href = `/login?forcedLogout=true`;
  }
};
