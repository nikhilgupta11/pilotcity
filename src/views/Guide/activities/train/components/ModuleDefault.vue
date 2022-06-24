/* eslint-disable max-len */
<template>
  <v-container class="module-default pa-0" style="position: relative">
    <v-progress-circular
      v-if="isLoading"
      class="adk-loader"
      size="40"
      indeterminate
      color="black"
    ></v-progress-circular>
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
    <v-expansion-panels v-model="panel" tile accordion flat class="module-default__playlist">
      <v-expansion-panel
        v-for="(linkObj, index) in trainAdk.trainProgress"
        :key="index"
        v-model="panel"
        :disabled="!linkObj.unlocked"
        class="module-default__playlist-panel"
      >
        <v-expansion-panel-header
          :class="{ 'grey--text text--lighten-2': linkObj.unlocked === false }"
          disable-icon-rotate
          class="module-default__video-title"
        >
          {{ linkObj.name }}
          <v-badge v-if="linkObj.newCandidate" color="green" content="New"></v-badge>
          <template #actions>
            <v-icon
              v-if="linkObj.unlocked && !linkObj.completed"
              style="position: absolute; right: 24px; top: 20px"
              color="warning"
            >
              mdi-alert-circle
            </v-icon>
            <v-icon
              v-if="linkObj.completed"
              style="position: absolute; right: 24px; top: 15px"
              color="teal"
            >
              mdi-check
            </v-icon>
          </template>
          <v-icon v-if="!linkObj.unlocked" style="position: absolute; right: 24px" color="error">
            mdi-lock-outline
          </v-icon>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="module-default__video-content-panel">
          <iframe
            :src="getIframeUrl(linkObj.link)"
            width="100%"
            height="380px"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
          <div class="d-flex justify-center">
            <v-checkbox
              v-model="linkObj.completed"
              label="Have you finished the video?"
              @click="videoComplete(index)"
            />
          </div>
          <div class="d-flex justify-center mt-2 mb-4">
            <v-btn
              :disabled="readonly"
              depressed
              outlined
              x-small
              a
              href="https://www.youtube.com/pilotcity"
              target="_blank"
              v-bind:style="{
                width: $vuetify.breakpoint.xs ? '80% !important' : ' ',
                height: 'fit-content',
                padding: $vuetify.breakpoint.xs ? '5px' : '8px 15px'
              }"
            >
              Subscribe to PilotCity YouTube
            </v-btn>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <br />
    <br />
    <div
      class="module-default__scope justify-center"
      v-bind:style="{ width: $vuetify.breakpoint.xs ? '90%' : ' ' }"
    >
      <v-btn
        :disabled="readonly"
        :loading="saveLoading"
        class="mr-2 perform-adk-train-save"
        x-large
        rounded
        outlined
        depressed
        @click="saveProcessData()"
      >
        Save
      </v-btn>
      <v-btn
        :disabled="!finishButtonDisabled || userType === 'stakeholder' || readonly"
        :loading="loading"
        x-large
        depressed
        rounded
        color="#6eba80"
        class="white--text ml-2 perform-adk-train-complete"
        @click="saveData()"
      >
        Complete
      </v-btn>
      <v-alert
        v-if="successmsg.length > 0 || errormsg.length > 0"
        :color="successmsg.length > 0 ? 'green' : 'red'"
        dense
        class="mt-3 white--text presets__alert"
      >
        {{ successmsg.length > 0 ? successmsg : errormsg }}
      </v-alert>
      <v-alert
        v-if="saveSuccessMsg.length > 0 || saveErrorMsg.length > 0"
        :color="saveSuccessMsg.length > 0 ? 'green' : 'red'"
        dense
        class="mt-3 white--text presets__alert"
      >
        {{ saveSuccessMsg.length > 0 ? saveSuccessMsg : saveErrorMsg }}
      </v-alert>
    </div>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable no-prototype-builtins */
/* eslint-disable vue/no-mutating-props */
/* eslint-disable no-param-reassign */
import { ObjectId } from 'bson';
import { computed, defineComponent, inject, ref } from '@vue/composition-api';
import { loading, getModAdk } from 'pcv4lib/src';
import axios from 'axios';
import { useUserGetters } from '@/store';
import type MongoDoc from './types';
import Instruct from './ModuleInstruct.vue';

export default defineComponent({
  name: 'ModuleDefault',
  components: {
    Instruct
  },
  props: {
    value: {
      required: true,
      type: Object as () => MongoDoc
    },
    studentDoc: {
      required: true,
      type: Object as () => MongoDoc
    },
    userType: {
      required: true,
      type: String
    },
    fetchProgram: {
      required: true,
      type: [Object, Function]
    }
  },
  setup(props, ctx) {
    const readonly = inject('readonly', false);
    const { adkData: trainAdk, adkIndex } = getModAdk(
      props,
      ctx.emit,
      'train',
      {
        trainProgress: (
          props.value.data?.adks?.find(obj => obj && obj.name === 'train')?.videoLinks as any[]
        ).map((obj: any) => ({
          ...obj,
          unlocked: false,
          completed: false
        }))
      },
      'studentDoc',
      'inputStudentDoc'
    );
    const trainAdkData = ref(trainAdk.value);
    trainAdk.value.trainProgress[0].unlocked = true;
    trainAdk.value.trainProgress[0].newCandidate = false;
    console.log(trainAdk.value.trainProgress[0].newCandidate);
    const panel = trainAdk.value.trainProgress.findIndex(
      (obj: any) => obj.unlocked && !obj.completed
    );
    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    const showInstructions = ref(true);
    // Questions Array
    const newAPIData = ref([]);
    const {
      loading: saveLoading,
      process: saveProcess,
      message: saveMessage,
      error: saveError,
      success: saveSuccess
    } = loading(() => props.studentDoc.update(), 'Success', 'Try again later');
    const finishButtonDisabled = ref(
      trainAdk.value.trainProgress.every((item: any) => (item.completed ? true : null))
    );
    function videoComplete(index: number) {
      trainAdk.value.trainProgress[index].newCandidate = false;
      if (trainAdk.value.trainProgress[index + 1]) {
        trainAdk.value.trainProgress[index + 1].unlocked =
          !trainAdk.value.trainProgress[index + 1].unlocked;
      }
      if (
        !trainAdk.value.trainProgress[index].completed &&
        trainAdk.value.trainProgress[index + 1]
      ) {
        for (let i = index; i < trainAdk.value.trainProgress.length - 1; i += 1) {
          trainAdk.value.trainProgress[i + 1].unlocked = false;
          trainAdk.value.trainProgress[i + 1].completed = false;
        }
      }
      const lastVideoLink = trainAdk.value.trainProgress[trainAdk.value.trainProgress.length - 1];
      if (lastVideoLink.completed && lastVideoLink.unlocked) {
        finishButtonDisabled.value = true;
      } else {
        finishButtonDisabled.value = false;
      }
    }
    const isLoading = ref(false);
    async function fetchFormData() {
      isLoading.value = true;
      const API_ENDPOINT = process.env.VUE_APP_TRAINADK_NEW_BADGE;
      const dataValue = props.studentDoc.data._id.toString();
      try {
        const res = await axios.post(
          `${API_ENDPOINT}?program_id=${ctx.root.$route.params.programId}&student_id=${dataValue}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        if (res) {
          props.fetchProgram();
        }
        trainAdk.value.trainProgress[0].unlocked = true;
        trainAdk.value.trainProgress[0].newCandidate = false;
        isLoading.value = false;
      } catch (err) {
        console.log(err);
      }
    }
    fetchFormData();

    const videoAskLink = ref('');
    function getIframeUrl(url: string) {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);

      if (match && match[7].length === 11) {
        return `https://www.youtube.com/embed/${match[7]}`;
      }
      return url;
    }

    if (
      trainAdk.value.trainProgress.filter(obj => obj.completed === true).length > 0 &&
      trainAdk.value.trainProgress.filter(obj => obj.completed === true).length !==
        trainAdk.value.trainProgress.length
    ) {
      const trainDataValue = trainAdk.value.trainProgress.filter(
        obj => obj.completed === true
      ).length;

      trainAdk.value.trainProgress[trainDataValue].unlocked = true;
    }

    const saveSuccessMsg = ref('');
    const saveErrorMsg = ref('');
    const saveloadingstatus = ref(false);

    async function saveProcessData() {
      try {
        if (props.studentDoc.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
          props.studentDoc.data.adks[adkIndex].activityModifiedOn = new Date();
        }

        await props.studentDoc.update();
        saveSuccessMsg.value = 'Success';
        saveErrorMsg.value = '';
        saveloadingstatus.value = false;
      } catch (err) {
        saveSuccessMsg.value = '';
        saveErrorMsg.value = 'Try again later';
        saveloadingstatus.value = false;
      }
    }

    const successmsg = ref('');
    const errormsg = ref('');
    const loadingstatus = ref(false);

    async function saveData() {
      loadingstatus.value = true;
      try {
        if (props.studentDoc.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
          props.studentDoc.data.adks[adkIndex].activityModifiedOn = new Date();
        } else {
          props.studentDoc.data.adks[adkIndex].activityEndedOn = new Date();
        }
        await props.studentDoc.update(() => ({
          isComplete: true,
          adkIndex
        }));
        ctx.emit('calculate-timer');
        successmsg.value = 'Success';
        errormsg.value = '';
        loadingstatus.value = false;
      } catch (err) {
        successmsg.value = '';
        errormsg.value = 'Try again later';
        loadingstatus.value = false;
      }
    }

    return {
      finishButtonDisabled,
      trainAdk,
      showInstructions,
      setupInstructions,
      fetchFormData,
      saveMessage,
      saveError,
      saveLoading,
      isLoading,
      saveSuccess,
      trainAdkData,
      saveProcess,
      getIframeUrl,
      videoComplete,
      successmsg,
      errormsg,
      loadingstatus,
      saveData,
      panel,
      saveProcessData,
      saveSuccessMsg,
      saveErrorMsg,
      saveloadingstatus,
      readonly,
      ...loading(
        () =>
          props.studentDoc.update(() => ({
            isComplete: true,
            adkIndex
          })),
        'Success',
        'Try again later'
      )
    };
  }
});
</script>

<style lang="scss">
.v-expansion-panel-content__wrap {
  // padding: 0px !important;
}
.module-default {
  &__video-title {
    font-weight: 800;
    line-height: 25px !important;
    font-size: 16px !important;
    color: #404142;
    padding-right: 55px;
    word-break: break-all;
    display: inline-block;

    .v-badge {
      font-family: sans-serif;
      line-height: 22px;

      .v-badge__wrapper {
        display: inline-block;
        width: auto;
        height: auto;
        position: relative;
        padding-left: 10px;
        top: 0px;
        text-transform: uppercase;
      }

      .v-badge__badge {
        position: relative;
        left: unset !important;
        right: unset !important;
      }
    }
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
    // margin-bottom: none !important;
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
  }
  &__playlist {
    width: 100%;
  }
  &__playlist-panel {
    border-bottom: 1px solid #dedede;
  }
  &__video-content-panel {
  }
}
.v-expansion-panel-content__wrap {
  padding: 0px !important;
}
.adk-loader {
  position: absolute;
  top: 50%;
  z-index: 10 !important;
}
</style>
