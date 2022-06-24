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
    <v-data-table
      :headers="header"
      :items="researchAdk.researchProgress"
      :items-per-page="100"
      :hide-default-footer="true"
      class="module-default__data-table research-default-data"
    >
      <template #item.click="{ item }">
        <!-- WHEN REVIEWED AND CONFIRMED -->
        <v-icon v-if="item.completed" color="green"> mdi-checkbox-marked-circle </v-icon>
        <!-- WHEN ONE HAS BEEN REVIEWED OR CONFIRMED -->
        <v-icon v-else-if="item.viewed" color="yellow"> mdi-alert-circle </v-icon>
        <!-- WHEN NONE HAVE BEEN REVIEWED OR CONFIRMED -->
        <v-icon v-else color="grey"> mdi-close-circle </v-icon>
      </template>
      <template #item.resource="{ item }">
        {{ item.resource }}
        <v-badge v-if="item.newCandidate" color="green" content="New"></v-badge>
      </template>
      <template #item.cta="{ item }">
        <v-btn
          v-if="item.viewed"
          :disabled="readonly"
          :href="item.link"
          x-small
          outlined
          depressed
          target="_blank"
        >
          <v-icon v-if="userType !== 'stakeholder'" left x-small color="green"
            >mdi-check-bold </v-icon
          >Goto Link</v-btn
        >
        <v-btn
          v-else
          :disabled="readonly"
          :href="item.link"
          x-small
          outlined
          depressed
          target="_blank"
          @click="goToLink(item)"
        >
          Goto Link
        </v-btn>
      </template>
      <template #item.required="{ item }">
        <v-btn v-if="item.required" :disabled="readonly" x-small color="red" outlined depressed
          >Required</v-btn
        >
        <v-btn v-else depressed :disabled="readonly" x-small>Recommended</v-btn>
      </template>
      <template #item.finish="{ item }">
        <v-checkbox
          v-model="item.completed"
          :disabled="!item.viewed || userType === 'stakeholder'"
          type="checkbox"
          @click="$emit('update')"
        />
      </template>
    </v-data-table>
    <div
      class="module-default__scope mt-12"
      v-bind:style="{ width: $vuetify.breakpoint.xs ? '90%' : ' ' }"
    >
      <v-btn
        :disabled="readonly"
        :loading="loadingdatastatus"
        class="mr-2 perform-adk-research-save"
        rounded
        x-large
        outlined
        depressed
        @click="saveProcessData()"
      >
        Save
      </v-btn>
      <v-btn
        :disabled="userType === 'stakeholder' || !isComplete || readonly"
        :loading="loading"
        x-large
        color="#ea6764"
        class="white--text perform-adk-research-complete"
        depressed
        rounded
        @click="saveData()"
        >Complete</v-btn
      >
      <v-alert
        v-if="successmsg.length > 0 || errormsg.length > 0"
        :color="successmsg.length > 0 ? 'green' : 'red'"
        dense
        class="mt-3 white--text presets__alert"
        >{{ successmsg.length > 0 ? successmsg : errormsg }}</v-alert
      >
      <v-alert
        v-if="successdatamsg.length > 0 || errordatamsg.length > 0"
        :color="successdatamsg.length > 0 ? 'green' : 'red'"
        dense
        class="mt-3 white--text presets__alert"
        >{{ successdatamsg.length > 0 ? successdatamsg : errordatamsg }}</v-alert
      >
    </div>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable no-prototype-builtins */
/* eslint-disable vue/no-mutating-props */
/* eslint-disable no-param-reassign */
import { defineComponent, ref, computed, PropType, inject } from '@vue/composition-api';
import { loading, getModAdk } from 'pcv4lib/src';
import axios from 'axios';
import MongoDoc from './types';
import { items, HEADER } from './const';
import Instruct from './ModuleInstruct.vue';

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
    userType: {
      required: true,
      type: String
    },
    studentDoc: {
      required: true,
      type: Object as () => MongoDoc
    }
  },
  setup(props, ctx) {
    // props
    const readonly = inject('readonly', false);

    const { adkData: researchAdk, adkIndex } = getModAdk(
      props,
      ctx.emit,
      'research',
      {
        researchProgress: (
          props.value.data?.adks?.find(obj => obj && obj.name === 'research')
            ?.researchLinks as any[]
        )?.map((obj: any) => ({
          ...obj,
          viewed: false,
          completed: false
        }))
      },
      'studentDoc',
      'inputStudentDoc'
    );
    // layout
    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    const researchAdkData = ref(researchAdk.value);
    const {
      loading: saveLoading,
      process: saveProcess,
      message: saveMessage,
      error: saveError,
      success: saveSuccess
    } = loading(() => new Promise(resolve => resolve(undefined)), 'Success', 'Try again later');
    const showInstructions = ref(true);
    const finishButtonDisabled = ref(1);
    const isComplete = computed(() => {
      return researchAdk.value.researchProgress?.every(
        (item: any) => !item.required || (item.viewed && item.completed)
      );
    });
    const isLoading = ref(false);
    async function fetchFormData() {
      const API_ENDPOINT = process.env.VUE_APP_RESEARCHADK_NEW_BADGE;
      const studentId = props.studentDoc.data._id.toString();
      try {
        isLoading.value = true;
        const res = await axios.post(
          `${API_ENDPOINT}?program_id=${ctx.root.$route.params.programId}&student_id=${studentId}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        if (res) {
          isLoading.value = false;
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchFormData();

    function goToLink(item) {
      const link = researchAdk.value.researchProgress.filter(l => l.link === item.link);
      link[0].viewed = true;
      if (link[0].newCandidate) {
        link[0].newCandidate = false;
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
        await props.studentDoc.update(() => {
          return {
            isComplete: true,
            adkIndex
          };
        });
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

    const successdatamsg = ref('');
    const errordatamsg = ref('');
    const loadingdatastatus = ref(false);

    async function saveProcessData() {
      loadingdatastatus.value = true;
      try {
        if (props.studentDoc.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
          props.studentDoc.data.adks[adkIndex].activityModifiedOn = new Date();
        }
        await props.studentDoc.update();
        successdatamsg.value = 'Success';
        errordatamsg.value = '';
        loadingdatastatus.value = false;
      } catch (err) {
        successdatamsg.value = '';
        errordatamsg.value = 'Try again later';
        loadingdatastatus.value = false;
      }
    }

    return {
      header: HEADER,
      items,
      setupInstructions,
      finishButtonDisabled,
      showInstructions,
      fetchFormData,
      researchAdkData,
      researchAdk,
      isComplete,
      isLoading,
      successdatamsg,
      errordatamsg,
      loadingdatastatus,
      saveProcessData,
      saveMessage,
      saveError,
      saveSuccess,
      saveLoading,
      saveData,
      successmsg,
      errormsg,
      loadingstatus,
      goToLink,
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
.module-default {
  &__data-table {
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
    // padding: none;
    // margin: none;
    margin-top: 0px;
    padding: 0px;
    // max-width: 100%;
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
}

.research-default-data {
  .v-data-table__mobile-row {
    .v-data-table__mobile-row__header {
      @media (max-width: 767px) {
        padding-right: 20px;
      }
    }
  }
  .v-badge {
    font-family: sans-serif;
    line-height: 22px;

    .v-badge__wrapper {
      display: inline-block;
      width: auto;
      height: auto;
      position: relative;
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
.adk-loader {
  position: absolute;
  top: 50%;
  z-index: 10 !important;
}
</style>
