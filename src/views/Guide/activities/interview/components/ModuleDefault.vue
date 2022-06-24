<template>
  <div>
    <v-container v-if="isFormUrl" class="pa-0">
      <template v-if="isInterviewCompleted">
        <div class="module-default__statement3 headline font-weight-bold mt-12 justify-center">
          Thank you for interviewing!<br />
        </div>

        <div
          class="
            module-default__statement4
            headline
            font-weight-medium
            justify-center
            mt-8
            ml-12
            mr-12
            mb-12
          "
          :class="$vuetify.breakpoint.xs ? 'ml-6 mr-6' : ''"
        >
          Next step is to await a position offer. You will receive a text message if you are offered
          position.
        </div>

        <iframe
          v-if="adkData && adkData.videoAskResponse"
          :src="
            adkData.videoAskResponse &&
            adkData.videoAskResponse.contact &&
            adkData.videoAskResponse.contact.share_url
          "
          allow="autoplay *; encrypted-media *; fullscreen *;"
          width="100%"
          height="600px"
          style="border: none; border-radius: 0px"
        ></iframe>

        <v-dialog v-model="redoInterview" persistent max-width="600px">
          <template #activator="{ on, attrs }">
            <div class="d-flex justify-center">
              <v-btn
                v-bind="attrs"
                :disabled="userType === 'stakeholder' || readonly"
                :ripple="false"
                rounded
                class="module-default__log-btn mt-12"
                depressed
                x-large
                outlined
                v-on="on"
                >Redo Interview</v-btn
              >
            </div>
          </template>

          <v-card>
            <v-card-title class="d-flex flex-column justify-center">
              <div class="overline font-weight-bold d-flex justify-center">
                Are you sure you want to delete & redo your interview?
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-container class="d-flex flex-column justify-center">
              <div class="d-flex flex-row justify-center mt-4 mb-6">
                <v-btn
                  :disabled="readonly"
                  class="ma-2"
                  outlined
                  x-large
                  rounded
                  depressed
                  @click="redoInterview = false"
                  >Cancel</v-btn
                >
                <v-btn
                  :disabled="readonly"
                  class="ma-2"
                  color="red"
                  x-large
                  dark
                  rounded
                  depressed
                  :loading="loading"
                  @click="process()"
                  >Delete & Redo</v-btn
                >
                <v-alert v-if="error" color="red" dense class="mt-3 white--text presets__alert"
                  >There was an error, try again in a bit.</v-alert
                >
              </div>
            </v-container>
          </v-card>
        </v-dialog>
      </template>
      <div class="module-default pa-0" v-else>
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

        <iframe
          :src="`${programDoc.data.adks[index].form_url}#contact_email=${encodeURI(
            userDoc.data.email
          )}&contact_name=${encodeURI(
            userDoc.data.firstName + ' ' + userDoc.data.lastName
          )}&contact_phone_number=${encodeURI(userDoc.data.phoneNumber)}&program_id=${encodeURI(
            programDoc.data._id
          )}`"
          allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
          width="100%"
          height="600px"
          style="border: none; border-radius: 0px"
          class="mt-6"
        ></iframe>
        <h3 class="text-center pa-4 mt-3">
          Once you're done with interview, please click on button to submit the answers
        </h3>
        <dir class="d-flex flex-column align-center justify-center">
          <v-btn
            class="ma-2 mt-4"
            color="blue"
            :disabled="isInterviewCompleted"
            :dark="!isInterviewCompleted"
            x-large
            rounded
            depressed
            :loading="isFetching"
            @click="fetchStatus"
          >
            Submit
          </v-btn>
        </dir>
      </div>
    </v-container>
    <v-container v-else class="module-default pa-0">
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
      <!-- PRE-INTERVIEW -->
      <iframe
        v-if="loaded && !adkData.completed"
        :src="`https://www.videoask.com/${
          programDoc.data.videoAskShareId
        }#contact_email=${encodeURI(userDoc.data.email)}&contact_name=${encodeURI(
          userDoc.data.firstName + ' ' + userDoc.data.lastName
        )}&contact_phone_number=${encodeURI(userDoc.data.phoneNumber)}&program_id=${encodeURI(
          programDoc.data._id
        )}`"
        allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
        width="100%"
        height="600px"
        style="border: none; border-radius: 0px"
      >
      </iframe>
      <!-- POST-INTERVIEW -->

      <template v-else>
        <div class="module-default__statement3 headline font-weight-bold mt-12 justify-center">
          Thank you for interviewing!<br />
        </div>

        <div
          class="
            module-default__statement4
            headline
            font-weight-medium
            justify-center
            mt-8
            ml-12
            mr-12
            mb-12
          "
          :class="$vuetify.breakpoint.xs ? 'ml-6 mr-6' : ''"
        >
          Next step is to await a position offer. You will receive a text message if you are offered
          position.
        </div>

        <iframe
          v-if="adkData && adkData.videoAskResponse"
          :src="
            adkData.videoAskResponse &&
            adkData.videoAskResponse.contact &&
            adkData.videoAskResponse.contact.share_url
          "
          allow="autoplay *; encrypted-media *; fullscreen *;"
          width="100%"
          height="600px"
          style="border: none; border-radius: 0px"
        ></iframe>

        <v-dialog v-model="redoInterview" persistent max-width="600px">
          <template #activator="{ on, attrs }">
            <div class="d-flex justify-center">
              <v-btn
                v-bind="attrs"
                :disabled="userType === 'stakeholder' || readonly"
                :ripple="false"
                rounded
                class="module-default__log-btn mt-12"
                depressed
                x-large
                outlined
                v-on="on"
                >Redo Interview</v-btn
              >
            </div>
          </template>

          <v-card>
            <v-card-title class="d-flex flex-column justify-center">
              <div class="overline font-weight-bold d-flex justify-center">
                Are you sure you want to delete & redo your interview?
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-container class="d-flex flex-column justify-center">
              <div class="d-flex flex-row justify-center mt-4 mb-6">
                <v-btn
                  :disabled="readonly"
                  class="ma-2"
                  outlined
                  x-large
                  rounded
                  depressed
                  @click="redoInterview = false"
                  >Cancel</v-btn
                >
                <v-btn
                  :disabled="readonly"
                  class="ma-2"
                  color="red"
                  x-large
                  dark
                  rounded
                  depressed
                  :loading="loading"
                  @click="process()"
                  >Delete & Redo</v-btn
                >
                <v-alert v-if="error" color="red" dense class="mt-3 white--text presets__alert"
                  >There was an error, try again in a bit.</v-alert
                >
              </div>
            </v-container>
          </v-card>
        </v-dialog>
      </template>
    </v-container>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  ref,
  computed,
  watch,
  onBeforeUnmount
} from '@vue/composition-api';
import { getModAdk, getModMongoDoc, loading } from 'pcv4lib/src';
import axios from 'axios';
import Instruct from './ModuleInstruct.vue';
import MongoDoc from './types';

export default defineComponent({
  name: 'ModuleDefault',

  components: {
    Instruct
  },
  props: {
    studentDoc: {
      required: true
    },
    programDoc: {
      required: true,
      type: Object as () => MongoDoc
    },
    userDoc: {
      required: true
    },
    userType: {
      required: true,
      type: String
    },
    timeline: {
      type: Array
    }
  },
  setup(props, ctx) {
    const index = props.programDoc.data.adks.findIndex(obj => obj && obj.name === 'interview');
    const isFetching = ref(false);
    const isFormUrl = computed(() => {
      if (
        props.programDoc.data &&
        props.programDoc.data.adks[index] &&
        props.programDoc.data.adks[index].form_url
      ) {
        return true;
      }
      return false;
    });
    const readonly = inject('readonly', false);
    const studentDocument = getModMongoDoc(props, ctx.emit, {}, 'studentDoc', 'inputStudentDoc');
    const { adkData, adkIndex } = getModAdk(
      props,
      ctx.emit,
      'interview',
      {},
      'studentDoc',
      'inputStudentDoc'
    );

    const loaded = ref(false);
    function callUpdate() {
      if (!isFormUrl.value) {
        // eslint-disable-next-line no-return-assign
        studentDocument.value.update().then(() => (loaded.value = true));
      }
    }
    callUpdate();
    const redoInterview = ref(false);
    const resetInterview = async () => {
      delete adkData.value.completed;
      delete adkData.value.videoAskResponse;
      await studentDocument.value.update();
      redoInterview.value = false;
    };

    const isInterviewPending = ref(true);
    const isInterviewCompleted = computed(() => {
      return !!props.studentDoc.data.adks[adkIndex].completed;
    });

    async function fetchStatus() {
      try {
        isFetching.value = true;
        const API_ENDPOINT = process.env.VUE_APP_VIDASK_STATUS;
        const res = await axios.get(`${API_ENDPOINT}`, {
          params: {
            student_id: studentDocument.value.data._id.toString()
          }
        });
        const setFunction = setInterval(() => {
          props.studentDoc.update();
          if (isInterviewCompleted.value) {
            clearInterval(setFunction);
          }
        }, 10000);
        isFetching.value = false;
      } catch (error) {
        isFetching.value = false;
        console.log(error);
      }
    }

    watch(isInterviewCompleted, val => {
      if (val) {
        fetchStatus();
      }
    });

    return {
      adkData,
      isInterviewPending,
      index,
      studentDocument,
      isFormUrl,
      loaded,
      ...loading(resetInterview, 'Success', 'Try again later'),
      redoInterview,
      readonly,
      callUpdate,
      fetchStatus,
      isFetching,
      isInterviewCompleted
    };
  },
  data() {
    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    const showInstructions = ref(true);
    return {
      setupInstructions,
      showInstructions
    };
  }
});
</script>

<style lang="scss">
.v-expansion-panel-content__wrap {
  padding: 0px !important;
}
.module-default {
  &__statement3 {
    text-align: center;
    color: #3c9dcd;
  }
  &__statement4 {
    text-align: center;
    color: #2d2a2a !important;
  }
  &__playlist-panel {
    border-bottom: 1px solid #dedede;
  }
  &__video-title {
    font-weight: 800;
    line-height: 25px !important;
    font-size: 16px !important;
    color: #404142;
  }
  &__question-video {
    background-color: #dedede;
    height: 300px;
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
  &__container {
    width: 100%;
    // padding: none;
    // margin: none;
    margin-top: 0px;
    padding: 0px;
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
    // margin: 0px;
    background-color: #dedede;
    // text-align: center;
    // justify-content: center;
    // align-items: center;
    // padding-top: auto;
    // padding-bottom: auto;
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
  &__under-development {
    font-family: 'Raleway';
    font-weight: 800;
    font-size: 30px;
    letter-spacing: 0px;
    margin: 30px;
    text-align: center;
  }
}
</style>
