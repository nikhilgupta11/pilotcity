import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '../../state';
import toolState from './state';
import { MutationTypes } from './mutations';

// eslint-disable-next-line no-shadow
export enum ActionTypes {
  setLinearLoader = 'setLinearLoader'
}
type AuthActionCtx = ActionContext<typeof toolState, RootState>;
export interface ToolActions extends ActionTree<typeof toolState, RootState> {
  setLinearLoader: <T>(
    ctx: AuthActionCtx,
    payload: { func: (...args: any[]) => Promise<T> }
  ) => Promise<T>;
}
export const actions: ToolActions = {
  async setLinearLoader({ commit }, { func }) {
    try {
      commit(MutationTypes.LOADING_START);
      const ret = await func();
      commit(MutationTypes.LOADING_END);
      return ret;
    } catch (err) {
      commit(MutationTypes.GLOBAL_TOOL_ERR, err);
      throw new Error('Callback could not be completed');
    }
  }
};
