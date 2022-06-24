// .storybook/preview.js
import { addDecorator } from '@storybook/vue';
import '@mdi/font/css/materialdesignicons.css';
import VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';
import router from '@/router';
import vuetify from './vuetify_storybook';

Vue.use(VueCompositionAPI);
addDecorator(() => ({
  vuetify,
  router,
  template: `
    <v-app>
      <v-main>
        <v-container fluid >
          <story/>
        </v-container>
      </v-main>
    </v-app>
    `
}));
