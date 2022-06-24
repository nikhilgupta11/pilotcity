import Vue from 'vue';
import './installCompositionApi';

import VueApollo from 'vue-apollo';
import VueMask from 'v-mask';
import provider from '@/vue-apollo';
import { ValidationObserver, ValidationProvider } from '@/validation';

import datadogRum from './tracer';

import App from './App.vue';
import DefaultLayout from './layouts/Default.vue';
import NoNavLayout from './layouts/NoNav.vue';
import Landing from './layouts/Landing.vue';
// import './registerServiceWorker';
// eslint-disable-next-line import/no-named-as-default
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css';
import './store/watchers';

datadogRum.startSessionReplayRecording();

Vue.config.productionTip = false;

Vue.component('DefaultLayout', DefaultLayout);
Vue.component('NoNavLayout', NoNavLayout);
Vue.component('LandingLayout', Landing);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.use(VueMask);
Vue.use(VueApollo);
Vue.use(VueApollo);

new Vue({
  apolloProvider: provider,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
