import { createLocalVue } from '@vue/test-utils';
import Vuex, { StoreOptions } from 'vuex';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import fileStorage from '@/store/modules/fileStorage';
import { ActionTypes as FileStorageActionTypes } from '@/store/modules/fileStorage/actions';
import auth from '../../../src/store/modules/auth';
import realmApp from '../../../src/store/modules/realmApp';
import { RootState } from '../../../src/store/state';

function mockActions<T extends Record<string, any>>(actions: T): Record<keyof T, () => jest.Mock> {
  const mock = {};
  Object.keys(actions).forEach(key => {
    mock[key] = jest.fn();
  });
  return mock as Record<keyof T, () => jest.Mock>;
}

function createMockStore(opts?: { unmocked?: boolean }) {
  const mockAuth = Object.assign(auth, { actions: mockActions(AuthActionTypes) });
  const mockFileStorage = Object.assign(fileStorage, {
    actions: mockActions(FileStorageActionTypes)
  });
  const storeOpts: StoreOptions<RootState> = {
    modules: {
      auth: opts?.unmocked ? auth : mockAuth,
      realmApp,
      fileStorage: opts?.unmocked ? fileStorage : mockFileStorage
    }
  };
  return { store: new Vuex.Store<RootState>(storeOpts), authActions: mockAuth.actions };
}
const localVue = createLocalVue();
localVue.use(Vuex);

describe('RootStore', () => {
  let { store } = createMockStore();
  beforeEach(() => {
    ({ store } = createMockStore());
  });
  it('contains two modules', () => {
    expect(store.hasModule('auth')).toBe(true);
    expect(store.hasModule('realmApp')).toBe(true);
  });
});
export default createMockStore;
