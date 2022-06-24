import createMockStore from './store.spec';

const { store } = createMockStore();
describe('realmApp', () => {
  it('Contains our realmApp connected to mongo', () => {
    expect(store.state.realmApp.app.id).toBe(process.env.VUE_APP_REALM_ID);
  });
});
