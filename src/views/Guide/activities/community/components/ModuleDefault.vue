<template>
  <v-container class="module-default pa-0">
    <div class="module-default__instructions">
      <v-expansion-panels v-model="showInstructions" class="module-default__instructions" flat>
        <v-expansion-panel>
          <v-expansion-panel-header
            v-show="showInstructions"
            hide-actions
            class="pa-0"
            @click="showInstructions = true"
          >
            <template #default="{ open }">
              <v-scroll-y-transition hide-on-leave>
                <div v-if="!open" class="d-flex flex-column justify-center">
                  <v-icon color="grey" class="d-flex justify-center"> mdi-chevron-down </v-icon>
                  <div class="module-default__collapse-title">INSTRUCTIONS</div>
                </div>
              </v-scroll-y-transition>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <Instruct readonly />
            <div @click="showInstructions = true">
              <div class="module-default__collapse-title">CLOSE</div>
              <v-icon color="grey" class="d-flex justify-center"> mdi-chevron-up </v-icon>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <v-progress-linear
      class="mt-3"
      color="#dedede"
      height="2"
      value="100"
      buffer-value="100"
      stream
    />
    <!-- ENTER CONTENT HERE -->
    <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
    <!-- <div class="module-default__none">Design your activity here</div> -->

    <!-- <v-btn class="mt-2 font-weight-bold" x-large depressed dark color="#ae90b0"
          >Click here when done (Mongo Changestream)</v-btn
        > -->

    <!-- PRE-LINKED DISCORD START -->
    <v-container
      v-if="!isToken && !isDisconnected"
      class="mt-12 d-flex flex-column justify-center pa-6"
    >
      <v-row class="pl-6 pr-6 mb-3 overline d-flex justify-center font-weight-black">
        <!-- Chat with team & PilotCity student community -->
        Join the PilotCity online student community
      </v-row>
      <v-row class="pl-6 pr-6">
        <v-btn
          :disabled="userType === 'stakeholder'"
          rounded
          class="
            perform-adk-community-create
            module-default__goto-discord
            ma-2
            pl-auto
            pr-auto
            font-weight-bold
            white--text
          "
          :href="DISCORD_REGISTER"
          x-large
          depressed
          color="#ae90b0"
          @click="saveProgramId()"
          ><v-icon left>mdi-discord</v-icon>Create Discord Account</v-btn
        >
      </v-row>
      <v-row class="pl-6 pr-6">
        <v-btn
          :disabled="userType === 'stakeholder'"
          rounded
          :href="DISCORD_AUTH"
          class="
            perform-adk-community-auth
            module-default__goto-discord
            ma-2
            pl-auto
            pr-auto
            font-weight-bold
          "
          x-large
          depressed
          outlined
          color="#ae90b0"
          @click="saveProgramId()"
          ><v-icon left>mdi-account-circle-outline</v-icon>Connect existing account</v-btn
        >
      </v-row>
      <v-row class="pl-6 pr-6 mb-1 mt-6 caption d-flex justify-center font-italic">
        <h4>
          <!-- Chat with team & PilotCity student community -->
          <span class="mr-1">Can't access Discord?</span> Try your mobile phone or
          <span class="skip" @click="showSkipConfirmation = true">skip connection to Discord</span>
        </h4>
      </v-row>

      <v-dialog v-model="showSkipConfirmation" width="500">
        <v-card>
          <v-card-title class="d-flex flex-column">
            <div class="overline font-weight-bold">
              Are you sure you want to skip connection to Discord?
            </div>
          </v-card-title>

          <v-divider></v-divider>
          <div class="pa-8 pt-4">
            <v-card-actions class="d-flex justify-center mt-3">
              <v-btn
                class="mr-2 pl-6 pr-6 font-weight-bold"
                depressed
                x-large
                outlined
                rounded
                :ripple="false"
                @click="showSkipConfirmation = false"
                >Nevermind</v-btn
              >
              <v-btn
                color="red"
                depressed
                x-large
                rounded
                :ripple="false"
                class="white--text font-weight-bold pl-4 pr-6"
                @click="skipDiscord"
              >
                <v-icon color="yellow" left>mdi-alert</v-icon>Skip Activity
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog>
    </v-container>
    <!-- PRE-LINKED DISCORD END -->

    <!-- POST-LINKED DISCORD START -->
    <v-container
      v-if="isToken && !isDisconnected"
      class="mt-12 d-flex flex-column justify-center pa-6"
    >
      <v-row v-if="userType !== 'stakeholder'" class="pl-md-6 pr-md-6 pl-0 pr-0">
        <v-avatar class="ma-3 lighten-2 avtarImage" color="grey" size="60">
          <img v-if="avatarSource.length" :src="avatarSource" />
          <img v-else src="@/assets/discord.png" />
        </v-avatar>
        <!-- <v-progress-circular size="20" indeterminate /> -->
        <v-text-field
          :value="discordUsername"
          class="ma-3"
          append
          rounded
          x-large
          readonly
          outlined
          label="Your Discord Username"
        >
          <template slot="append-outer">
            <v-progress-circular v-if="isFetching" size="20" indeterminate />
            <v-icon v-else>mdi-discord</v-icon>
          </template>
        </v-text-field>
      </v-row>
      <v-row v-if="userType === 'stakeholder'" class="pl-md-6 pr-md-6 pl-0 pr-0">
        <v-avatar class="ma-3 lighten-2" color="grey" size="60"></v-avatar>

        <v-text-field
          class="ma-3"
          append-outer-icon="mdi-discord"
          rounded
          x-large
          readonly
          outlined
          value="Discord username hidden"
          label="Your Discord Username"
        ></v-text-field>
      </v-row>

      <v-row class="pl-md-6 pr-md-6 pl-0 pr-0">
        <v-btn
          :disabled="userType === 'stakeholder'"
          rounded
          target="_blank"
          class="
            module-default__goto-discord
            ma-2
            pl-auto
            pr-auto
            font-weight-bold
            white--text
            perform-adk-community-join
          "
          x-large
          depressed
          color="#ae90b0"
          @click="joinCommunity"
        >
          <v-progress-circular v-if="isJoining" class="mr-2" size="20" indeterminate />
          <v-icon v-else left>mdi-discord</v-icon>
          Explore Community
        </v-btn>
      </v-row>
    </v-container>

    <v-container v-if="isDisconnected" class="mt-12 d-flex flex-column justify-center pa-6">
      <v-row class="pl-md-6 pr-md-6 pl-0 pr-0">
        <v-btn
          :disabled="userType === 'stakeholder'"
          rounded
          :href="DISCORD_AUTH"
          class="module-default__goto-discord ma-2 pl-auto pr-auto font-weight-bold"
          x-large
          depressed
          outlined
          color="#ae90b0"
          @click="saveProgramId()"
          ><v-icon left>mdi-account-circle-outline</v-icon>Reconnect your account</v-btn
        >
      </v-row>
    </v-container>

    <!-- POST-LINKED DISCORD END -->

    <!-- Discord to coordinate teams, and post events, communication with employers, link your Discord account below: -->
  </v-container>
</template>

<script lang="ts">
import { ref, reactive, toRefs, PropType, defineComponent, computed } from '@vue/composition-api';
import { getModAdk } from 'pcv4lib/src';
import axios from 'axios';
import Instruct from './ModuleInstruct.vue';
import { MongoDoc } from './types';

const API_ENDPOINT = 'https://discord.com/api/users/@me';
const CHANNEL_URL = 'https://discord.com/channels/@me/';

export default defineComponent({
  name: 'ModuleDefault',
  components: {
    Instruct
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    userDoc: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    studentDoc: {
      required: false,
      type: Object as PropType<MongoDoc>,
      default: () => {}
    },
    teamDoc: {
      required: false,
      type: Object as PropType<MongoDoc>,
      default: () => {}
    },
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    },
    mongoUser: {
      required: false,
      type: Object,
      default: () => {}
    }
  },
  setup(props, ctx) {
    const communityIndex = props.studentDoc.data.adks.findIndex(obj => obj.name === 'community');
    const communityObj = props.studentDoc.data.adks[communityIndex];
    const showSkipConfirmation = ref(false);
    const studentDocument = computed({
      get: () => props.studentDoc,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });
    const isDisconnected = ref(false);
    const isToken = computed(() => {
      if (communityObj.discordInfo && communityObj.discordInfo.discordAccessToken) {
        return true;
      }
      return false;
    });
    const state = reactive({
      avatarSource: '',
      discordUsername: 'Username #0000',
      accessToken: '',
      studentAdkIndex: -1
    });
    const isFetching = ref(false);
    const isJoining = ref(false);
    const DISCORD_AUTH = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${process.env.VUE_APP_DISCORD_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_DISCORD_REDIRECT}&response_type=code&scope=identify`;
    const DISCORD_REGISTER = `https://discord.com/register?redirect_to=%2Foauth2%2Fauthorize%3Fclient_id%3D${process.env.VUE_APP_DISCORD_CLIENT_ID}%26redirect_uri%3D${process.env.VUE_APP_DISCORD_REDIRECT}%26response_type%3Dcode%26scope%3Didentify%2520guilds.join%2520gdm.join%2520email`;

    if (props.studentDoc) {
      const { adkIndex: studentAdkIndex } = getModAdk(
        props,
        ctx.emit,
        'community',
        {},
        'studentDoc',
        'inputStudentDoc'
      );
      state.studentAdkIndex = studentAdkIndex;
    }

    function saveProgramId() {
      localStorage.setItem('programId', props.value.data._id.toString());
    }

    const getUser = async () => {
      try {
        isFetching.value = true;
        props.mongoUser?.functions
          .callFunction(
            'refreshDiscordAccessToken',
            props.studentDoc.data._id.toString(),
            props.studentDoc.data.adks[communityIndex].discordInfo.discordRefreshToken
          )
          .then(async res => {
            if (res.status === 'success') {
              const {
                data: { id, avatar, username, discriminator }
              } = await axios.get(API_ENDPOINT, {
                headers: {
                  Authorization: `Bearer ${props.studentDoc.data.adks[communityIndex].discordInfo.discordAccessToken}`
                }
              });
              state.avatarSource =
                avatar !== null ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` : '';
              state.discordUsername = `${username} #${discriminator}`;
              studentDocument.value.data.adks[communityIndex].discordInfo.discordId = id;
              studentDocument.value.data.adks[communityIndex].discordInfo.discordUsername =
                username;
              studentDocument.value.data.adks[communityIndex].discordInfo.avatarSrc = avatar;
              studentDocument.value.update();
              isFetching.value = false;
            } else {
              isDisconnected.value = true;
            }
          });
      } catch (err) {
        isFetching.value = false;
        console.log(err);
      }
    };

    async function joinCommunity() {
      try {
        isJoining.value = true;
        const API_ENDPOINT = process.env.VUE_APP_DISCORD_JOIN;
        const payload = props.studentDoc.data.adks[communityIndex].discordInfo;
        const data = {
          discordId: payload.discordId,
          userName: payload.discordUsername,
          discordAccessToken: payload.discordAccessToken
        };
        const resp = await axios.post(API_ENDPOINT, data).then(() => {
          window.open(
            'https://discord.com/channels/688863898686062675/738994257200939068',
            '_blank'
          );
        });
        isJoining.value = false;
      } catch (err) {
        if (err.response.data && err.response.data.message === 'Member already added') {
          window.open(
            'https://discord.com/channels/688863898686062675/738994257200939068',
            '_blank'
          );
        }
        isJoining.value = false;
      }
    }

    if (isToken.value) {
      // when a user already has an access token
      getUser();
    }

    const getChannelUrl = (id: string) => CHANNEL_URL + id;

    async function skipDiscord() {
      studentDocument.value.data.adks[communityIndex].discordIntegraionSkipped = true;
      await studentDocument.value.update();
      showSkipConfirmation.value = false;
    }

    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    const showInstructions = ref(true);
    return {
      ...toRefs(state),
      DISCORD_AUTH,
      skipDiscord,
      showSkipConfirmation,
      DISCORD_REGISTER,
      isFetching,
      setupInstructions,
      communityObj,
      isJoining,
      joinCommunity,
      getChannelUrl,
      showInstructions,
      saveProgramId,
      communityIndex,
      studentDocument,
      isToken,
      isDisconnected
    };
  }
});
</script>

<style lang="scss">
.module-default {
  &__goto-discord {
    width: 100%;
  }
  &__none {
    border-radius: 5px;
    // border: 1px solid #dedede;
    height: 100px;
    text-align: center;
    background-color: #dedede;
    font-weight: 700;
    color: #ffffff;
    font-size: 18px;
    padding-top: 35px;
  }

  &__collapse-divider {
    margin-top: 15px;
    // margin-bottom: 75px;
    margin-right: none;
    margin-left: none;
    padding-right: none;
    padding-left: none;
    width: 100%;
  }

  &__collapse-title {
    color: grey;
    text-align: center;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 2px;
    font-size: 12px;
  }

  &__container-discord {
    // width: 100%;
    // padding: none;
    // margin: none;
    margin-top: 0px;
    padding: 0px;
    display: flex;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  &__employer-title {
    font-size: 25px;
    font-weight: 700;
  }

  &__scope {
    font-size: 22px;
    font-weight: 800;
    text-align: center;
    max-width: 95%;
    margin: auto;
  }
  &__youtube {
    height: 400px;
    width: 95%;
    border-radius: 25px;
    background-color: #dedede;
  }
  .row {
    @media (max-width: 767px) {
      margin-left: 0 !important;
      margin-right: 0 !important;
      justify-content: center;
    }
  }
  .v-btn {
    @media (max-width: 767px) {
      min-width: unset !important;
      width: 100% !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      margin-bottom: 5px;
    }
  }
  &__about {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq-chat {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 5%;
  }
  &__faq-chat-line {
    margin: 5px;
  }

  &__faq-avatar {
    margin: 5px;
  }

  &__faq-question {
    // text-align: left;
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 800;
    color: #404142;
  }

  &__faq-answer {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: white;
    font-style: italic;
  }

  &__faq-answer-dark {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: #404142;
    font-style: italic;
  }

  &__faq-answer-dark-highlight {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0px;
    color: #404142;
  }

  &__specs-title {
    font-weight: 800;
  }
}
.skip {
  cursor: pointer;
  font-size: 12px;
  text-decoration: underline;
}
</style>
