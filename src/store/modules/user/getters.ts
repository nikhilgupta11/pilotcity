import { ObjectId } from 'bson';
import { GetterTree } from 'vuex';
import { RootState } from '../../state';
import userState from './state';

export const enum GetterTypes {
  getUser = 'getUser',
  getId = 'getId',
  getObjectId = 'getObjectId',
  isDialogOpen = 'isDialogOpen'
}
type UserGetterCtx<T> = (
  state: typeof userState,
  getters: any,
  rootState: RootState,
  rootGetters: any
) => T;
export interface UserGetters extends GetterTree<typeof userState, RootState> {
  getUser: UserGetterCtx<any | null>;
  getId: UserGetterCtx<string | null>;
  getObjectId: UserGetterCtx<ObjectId | null>;
  isDialogOpen: UserGetterCtx<boolean>;
}
export const getters: UserGetters = {
  getUser: state => {
    return state.user;
  },
  getId: state => {
    return state.user._id.toString();
  },
  getObjectId: state => {
    if (state.user) return new ObjectId(state.user?._id);
    return null;
  },
  isDialogOpen: state => {
    console.log(state.isOpenDialog);
    return state.isOpenDialog;
  }
};
