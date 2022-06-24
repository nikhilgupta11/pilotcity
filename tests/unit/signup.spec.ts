import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Signup from '@/views/Signup.vue';
import createMockStore from './store/store.spec';

const [localVue, vuetify] = [createLocalVue(), new Vuetify()];
localVue.use(Vuex);
describe('Signup.vue', () => {
  let { store } = createMockStore();
  let wrapper = mount(Signup, { store, localVue, vuetify });
  beforeEach(() => {
    ({ store } = createMockStore());
    wrapper = mount(Signup, { store, localVue, vuetify });
  });
  afterEach(() => {
    wrapper.destroy();
  });
  it("allows people URL's with a token and tokenID to confirm email addresses", () => {});
  it('renders a different view when an email is verified', () => {});
  it('redirects if a validation token is expired', () => {});
});
