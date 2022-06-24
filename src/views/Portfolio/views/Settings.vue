<template>
  <div class="my-settings__container">
    <div class="my-settings__wrapper-left">
      <v-navigation-drawer floating tag="aside" :permanent="true">
        <v-list class="py-0">
          <v-list-item
            v-for="item in idItems"
            :key="item.title"
            link
            @click="currentID = item.title"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>

    <div class="my-settings__content">
      <!-- General -->
      <SettingsName />
      <v-divider class="my-settings__divider"></v-divider>
      <SettingsNotifications />

      <v-divider class="my-settings__divider"></v-divider>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api';

import SettingsName from './setting/SettingsName.vue';
import SettingsNotifications from './setting/SettingsNotification.vue';

export default {
  name: 'Settings',

  components: {
    SettingsName,
    SettingsNotifications
  },

  setup() {
    const idItems = ref([{ title: 'General', icon: 'mdi-key' }]);
    return { idItems };
  }
};
</script>

<style lang="scss" scoped>
.my-settings {
  &__container {
    margin-top: 75px;
    display: flex;
    flex-direction: row;
    padding-left: 12%;
    padding-right: 12%;
    @media (max-width: 991px) {
      flex-direction: column;
      padding: 0 15px;
    }
  }
  &__wrapper {
    &-right {
      flex-grow: 1;
      display: flex;
      justify-content: left;
      padding-left: 50px;
    }
  }

  &__content {
    width: 70%;
    @media (max-width: 991px) {
      width: 100%;
    }
  }
  &__title {
    font-family: Raleway;
    font-size: 30px;
    color: #000000;
    font-weight: 800;
    padding-bottom: 50px;
  }

  &__subtitle {
    font-family: Raleway;
    font-size: 22px;
    color: #000000;
    font-weight: 700;
    margin-bottom: 25px;
  }

  &__divider {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  &__save {
    margin-top: 30px;
  }
}
</style>
