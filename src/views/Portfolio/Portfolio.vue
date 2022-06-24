<template>
  <!--  TODO: make the inputs into actual components -->
  <Loading ref="loader" :callback="processQuery" :process-now="true">
    <div class="profile__wrapper">
      <div class="profile__mode-container pc-container">
        <!-- <v-snackbar
          v-model="snackbar"
          class="snackbar-announcement"
          color="pink"
          rounded
          timeout="-1"
          bottom
        >
          <span class="font-weight-bold">
            <v-icon left>mdi-rocket-launch</v-icon>
            Attend
            <a
              target="_blank"
              class="white--text text-decoration-underline"
              href="https://www.eventbrite.com/e/pilotcity-airtime-2021-tickets-151832387759"
            >
              PilotCity Airtime 2021
            </a>
            our epic digital hackathon over weekend of May 28 - 30
          </span>
          <template #action="{ attrs }">
            <v-btn v-bind="attrs" icon @click="snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
          </template>
        </v-snackbar> -->

        <!-- <v-btn
          class="profile__mode font-weight-bold mr-5"
          depressed
          color="red"
          dark
          large
          rounded
          @click="currentTab = 'sponsor'"
        >
          <v-icon left>mdi-trophy</v-icon>Sponsor
        </v-btn> -->
        <v-btn
          class="profile__mode"
          depressed
          color="grey"
          dark
          outlined
          large
          rounded
          :default="$vuetify.breakpoint.xs ? 'false' : 'true'"
          @click="currentTab = 'my-programs'"
        >
          My Portfolio
        </v-btn>
        <div class="profile__spacer d-none d-lg-block" />
        <v-btn
          class="profile__mode font-weight-bold"
          color="black"
          large
          outlined
          rounded
          :default="$vuetify.breakpoint.xs ? 'false' : 'true'"
          @click="currentTab = 'balance'"
        >
          {{ tickets }} Tokens
        </v-btn>
        <v-btn
          class="profile__mode white--text font-weight-bold"
          depressed
          color="blue"
          :rounded="$vuetify.breakpoint.xs ? 'true' : 'false'"
          :default="$vuetify.breakpoint.xs ? 'false' : 'true'"
          @click="currentTab = 'payment'"
        >
          <v-icon left>mdi-cash-usd</v-icon>
          Buy Tokens
        </v-btn>
        <v-btn
          class="profile__mode white--text font-weight-bold"
          depressed
          color="green"
          :rounded="$vuetify.breakpoint.xs ? 'true' : 'false'"
          :default="$vuetify.breakpoint.xs ? 'false' : 'true'"
          @click="currentTab = 'referral'"
        >
          <v-icon left>mdi-telegram</v-icon>Invite
        </v-btn>
      </div>
      <div class="profile__container pc-container">
        <div
          v-if="
            (user && currentTab == 'my-programs') ||
            (user && currentTab == 'settings') ||
            (user && currentTab == 'citizen-id')
          "
          align-items="center"
          class="profile__sub-container text-center mt-12"
        >
          <div>
            <profile :size="150" editable />
            <span class="profile__name">{{ user.firstName }} {{ user.lastName }}</span>
          </div>
          <v-btn
            v-for="id in user.userTypes"
            :key="id"
            rounded
            class="pl-6 pr-6 ma-2 profile__citizen-chips"
            dark
            large
            depressed
            :color="IDs[id]"
            @click="clickProfile(id)"
          >
            {{ id }}
          </v-btn>

          <v-btn
            class="pl-6 pr-6 ma-2 profile__citizen-chips"
            color="black"
            outlined
            rounded
            large
            @click="currentTab = 'settings'"
          >
            Settings
          </v-btn>
        </div>

        <component
          :is="currentTab"
          :exp-component="currentProfile"
          @changeTab="currentTab = $event"
        />
      </div>
    </div>
  </Loading>
</template>

<script lang="ts">
import { ref, Ref, watch } from '@vue/composition-api';

import { useUserGetters, useDbState } from '@/store';
import { MY_TOKEN_CUSTOMER } from '@/services/graphql/queries';

import Loading from '@/components/Loading.vue';
import Profile from '@/components/Profile.vue';

import MyPrograms from './views/MyPrograms.vue';
import CitizenId, { components as citizenComponents, components } from './views/CitizenID.vue';
import Balance from './views/Balance.vue';
import Payment from './views/Payment.vue';
import Referral from './views/Referral.vue';
import Settings from './views/Settings.vue';
import Sponsor from './views/Sponsor.vue';

export default {
  name: 'Portfolio',

  components: {
    MyPrograms,
    CitizenId,
    Balance,
    Payment,
    Referral,
    Loading,
    Settings,
    Profile,
    Sponsor
  },

  setup(_props, context) {
    const { user } = useDbState(['user']);
    const tickets = ref(0);
    const loader: Ref<any> = ref(null);
    const currentTab: Ref<
      | 'my-programs'
      | 'citizen-id'
      | 'balance'
      | 'payment'
      | 'referral'
      | 'loading'
      | 'settings'
      | 'profile'
      | 'sponsor'
    > = ref(
      [
        'my-programs',
        'citizen-id',
        'balance',
        'payment',
        'referral',
        'loading',
        'settings',
        'profile',
        'sponsor'
      ].includes(context.root._route.params.component)
        ? context.root._route.params.component
        : 'my-programs'
    );
    const currentProfile: Ref<keyof typeof citizenComponents> = ref('general-id');
    const IDs = ref({
      Employer: 'purple',
      Organizer: 'purple',
      Student: 'green',
      Teacher: 'pink',
      School: 'blue',
      Parent: 'yellow'
    });

    watch(currentTab, newTab => {
      console.log(newTab);
      context.root.$router.replace({
        params: {
          component: newTab,
          profile: newTab === 'citizen-id' ? currentProfile.value : null
        }
      });
    });
    watch(currentProfile, newProfile => {
      context.root.$router.replace({
        params: {
          profile: newProfile
        }
      });
    });
    const id = useUserGetters(['getId']).getId;
    console.log(id);
    const processQuery = () =>
      context.root.$apolloProvider.defaultClient
        .query({
          query: MY_TOKEN_CUSTOMER,
          variables: { id: id.value }
        })
        .then(({ data: { tokens } }) => {
          tickets.value = tokens.length;
        });
    const clickTab = id => {
      currentTab.value = id;
    };
    const clickProfile = (profile: string) => {
      currentTab.value = 'citizen-id';
      currentProfile.value = `${profile.toLowerCase()}-id` as keyof typeof citizenComponents;
    };
    watch(
      user,
      newUser => {
        const types = newUser?.userTypes;
        if (types?.includes('School') || types?.includes('Parent')) currentTab.value = 'payment';
        else if (types?.includes('Teacher')) {
          // currentTab.value = 'invite';
        } else currentTab.value = 'my-programs';
        loader.value!.process();
      },
      { deep: true }
    );

    return {
      currentTab,
      currentProfile,
      clickProfile,
      IDs,
      tickets,
      loader,
      clickTab,
      processQuery,
      user,
      snackbar: true
    };
  }
};
</script>
