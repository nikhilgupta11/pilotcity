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
    <div style="width: 100%">
      <!-- ENTER CONTENT HERE -->
      <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
      <!-- <div class="module-default__none">Design your activity here</div> -->
      <div class="module-default__scope mt-12 pl-5 pr-5">
        <v-btn
          :disabled="readonly"
          :href="programDoc.data.adks[index].resourceWeb"
          dense
          color="blue"
          small
          rounded
          outlined
          depressed
          target="_blank"
          >{{ sampleEmployerName }} {{ programDoc.data.programName
          }}<v-icon small right>mdi-open-in-new</v-icon>
        </v-btn>
        <br />
        <br />
        {{ sampleProjectScope }}
        {{ programDoc.data.programDesc }}
      </div>
      <br />
      <br />
      <!-- <div class="module-default__youtube"></div> -->
      <br />
      <br />
      <div class="faq">
        <v-btn disabled large rounded depressed>Frequently Asked Questions</v-btn>
        <br />
        <br />

        <template>
          <v-timeline>
            <v-timeline-item
              v-for="n in 1"
              :key="n + '' + Math.random()"
              color="grey"
              fill-dot
              left
              small
            >
              <v-card outlined color="grey lighten-3" class="elevation-0">
                <v-card-text class="faq-answer"
                  ><div class="faq-answer-dark">
                    <!-- Hi, I'm with -->
                    <span class="faq-answer-dark-highlight"></span>

                    <span class="faq-answer-dark-highlight">
                      <!-- programDoc.data.adks[index].rfp.employerName --> </span
                    >Below are answers to some key questions from the employer
                  </div></v-card-text
                >
              </v-card>
            </v-timeline-item>

            <v-timeline-item
              v-for="n in 1"
              :key="n + '' + Math.random()"
              class="align-center"
              color="red"
              fill-dot
              right
              small
            >
              <template #opposite>
                <span class="faq-question">What is the urgency of this problem?</span>
              </template>
              <v-card color="red" dark outlined class="elevation-0">
                <v-card-text class="faq-answer"
                  ><div class="faq-answer">
                    {{ sampleInterviewProblem }}
                    {{ programDoc.data.adks[index].interviewProblem }}
                  </div></v-card-text
                >
              </v-card>
            </v-timeline-item>

            <v-timeline-item
              v-for="n in 1"
              :key="n + '' + Math.random()"
              class="align-center"
              right
              color="green"
              fill-dot
              small
            >
              <template #opposite>
                <span class="faq-question"
                  >Who could be possible users of the solution created?</span
                >
              </template>
              <v-card color="green" dark outlined class="elevation-0">
                <v-card-text class="faq-answer"
                  ><div class="faq-answer">
                    {{ sampleInterviewSolution }}
                    {{ programDoc.data.adks[index].interviewSolution }}
                  </div></v-card-text
                >
              </v-card>
            </v-timeline-item>

            <v-timeline-item
              v-for="n in 1"
              :key="n + '' + Math.random()"
              class="align-center"
              right
              color="purple"
              fill-dot
              small
            >
              <template #opposite>
                <span class="faq-question">What are the opportunities?</span>
              </template>
              <v-card color="purple" dark outlined class="elevation-0">
                <v-card-text class="faq-answer"
                  ><div class="faq-answer">
                    {{ sampleInterviewOpportunity }}
                    {{ programDoc.data.adks[index].interviewOpportunity }}
                  </div></v-card-text
                >
              </v-card>
            </v-timeline-item>

            <v-timeline-item
              v-for="n in 1"
              :key="n + '' + Math.random()"
              class="align-center"
              right
              color="pink"
              fill-dot
              small
            >
              <template #opposite>
                <span class="faq-question">What are the known challenges?</span>
              </template>
              <v-card color="pink" dark outlined class="elevation-0">
                <v-card-text class="faq-answer"
                  ><div class="faq-answer">
                    {{ sampleInterviewChallenge }}
                    {{ programDoc.data.adks[index].interviewChallenge }}
                  </div></v-card-text
                >
              </v-card>
            </v-timeline-item>

            <v-timeline-item
              v-for="n in 1"
              :key="n + '' + Math.random()"
              class="align-center"
              right
              color="blue"
              fill-dot
              small
            >
              <template #opposite>
                <span class="faq-question">Why are you requesting projects from students?</span>
              </template>
              <v-card color="blue" dark outlined class="elevation-0">
                <v-card-text class="faq-answer"
                  ><div class="faq-answer">
                    {{ sampleIR }}
                    {{ programDoc.data.adks[index].interviewRequest }}
                  </div></v-card-text
                >
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </template>
      </div>
      <br />
      <br />
      <template>
        <v-card tile outlined elevation="0" max-width="" class="mx-auto">
          <v-toolbar elevation="0" dark color="blue">
            <v-icon class="mr-4" large>mdi-clipboard-list</v-icon>
            <v-toolbar-title class="module-default__specs-title"
              >Project Specifications</v-toolbar-title
            >
          </v-toolbar>
          <v-subheader class="font-weight-bold">Outcomes</v-subheader>
          <v-list two-line subheader>
            <v-list-item class="demoClass">
              <div
                v-for="(outcome, itemIndex) in programDoc.data.adks[index].outcome"
                :key="itemIndex + '' + Math.random()"
              >
                <v-chip-group column>
                  <v-chip dark> {{ outcome }} </v-chip>
                </v-chip-group>
              </div>
            </v-list-item>
          </v-list>
          <!-- <v-divider></v-divider> -->
          <v-subheader class="font-weight-bold">Deliverables</v-subheader>
          <v-list two-line subheader>
            <v-list-item class="demoClass">
              <div
                v-for="(deliverable, itemIndex) in programDoc.data.adks[index].deliverable"
                :key="itemIndex + '' + Math.random()"
              >
                <v-chip-group>
                  <v-chip dark>{{ deliverable }}</v-chip>
                </v-chip-group>
              </div>
            </v-list-item>
          </v-list>
          <!-- <v-divider></v-divider> -->
          <v-subheader class="font-weight-bold">Requirements</v-subheader>
          <v-list two-line subheader>
            <v-list-item v-if="programDoc.data.adks[index].projectReq === ''">
              <div>
                <v-chip-group>
                  <v-chip>{{ sampleProjectReq }}</v-chip>
                </v-chip-group>
              </div>
            </v-list-item>
            <v-list-item
              v-for="(requirements, itemIndex) in programDoc.data.adks[index].projectReq"
              :key="itemIndex + '' + Math.random()"
            >
              <template #default="{}">
                <v-list-item-action>
                  <v-checkbox input-value="true" disabled color="primary"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ requirements }} </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list>
          <!-- <v-divider></v-divider> -->
          <v-subheader class="font-weight-bold">Resources</v-subheader>
          <v-list class="resources-item" two-line subheader>
            <v-list-item
              v-if="
                programDoc.data.adks[index].resourceDrive === '' &&
                programDoc.data.adks[index].resourceWeb === '' &&
                programDoc.data.adks[index].resourceInsta === '' &&
                programDoc.data.adks[index].resourceFacebook === '' &&
                programDoc.data.adks[index].resourceYouTube === '' &&
                programDoc.data.adks[index].resourceLinkedIn === '' &&
                programDoc.data.adks[index].resourceTwitter === ''
              "
            >
              <div>
                <v-chip-group>
                  <v-chip>{{ sampleResourceChip }}</v-chip>
                </v-chip-group>
              </div>
            </v-list-item>
            <v-list-item>
              <div>
                <v-btn
                  v-if="programDoc.data.adks[index].resourceDrive != ''"
                  id="resourcebutton"
                  :disabled="readonly"
                  :href="programDoc.data.adks[index].resourceDrive"
                  class="ma-1"
                  depressed
                  small
                  outlined
                  target="_blank"
                  >Get Started Folder</v-btn
                >
                <v-btn
                  v-if="programDoc.data.adks[index].resourceWeb != ''"
                  :disabled="readonly"
                  :href="programDoc.data.adks[index].resourceWeb"
                  class="ma-1"
                  depressed
                  small
                  outlined
                  target="_blank"
                  >Website</v-btn
                >
                <v-btn
                  v-if="programDoc.data.adks[index].resourceInsta != ''"
                  :disabled="readonly"
                  :href="programDoc.data.adks[index].resourceInsta"
                  class="ma-1"
                  depressed
                  small
                  outlined
                  target="_blank"
                  >Instagram</v-btn
                >
                <v-btn
                  v-if="programDoc.data.adks[index].resourceLinkedIn != ''"
                  :disabled="readonly"
                  :href="programDoc.data.adks[index].resourceLinkedIn"
                  class="ma-1"
                  depressed
                  small
                  outlined
                  target="_blank"
                  >LinkedIn</v-btn
                >
                <v-btn
                  v-if="programDoc.data.adks[index].resourceFacebook != ''"
                  :disabled="readonly"
                  :href="programDoc.data.adks[index].resourceFacebook"
                  class="ma-1"
                  depressed
                  small
                  outlined
                  target="_blank"
                  >Facebook</v-btn
                >
                <v-btn
                  v-if="programDoc.data.adks[index].resourceYouTube != ''"
                  :disabled="readonly"
                  :href="programDoc.data.adks[index].resourceYouTube"
                  class="ma-1"
                  depressed
                  small
                  outlined
                  target="_blank"
                  >YouTube</v-btn
                >
                <v-btn
                  v-if="programDoc.data.adks[index].resourceTwitter != ''"
                  :disabled="readonly"
                  :href="programDoc.data.adks[index].resourceTwitter"
                  class="ma-1"
                  depressed
                  small
                  outlined
                  target="_blank"
                  >Twitter</v-btn
                >
                <!-- <v-btn :disabled="readonly" class="ma-1" depressed small outlined>Articles</v-btn>
                <v-btn :disabled="readonly" class="ma-1" depressed small outlined>Product Specifications</v-btn>
                <v-btn :disabled="readonly" class="ma-1" depressed small outlined>Reports</v-btn> -->
              </div>
            </v-list-item>
          </v-list>
          <v-subheader class="font-weight-bold">About</v-subheader>
          <v-list two-line subheader>
            <v-card-text class="module-default__about-text">
              {{ sampleaboutOrg }}
              {{ programDoc.data.adks[index].aboutOrg }}</v-card-text
            >
          </v-list>
        </v-card>
      </template>
      <br />
      <br />
      <!-- <div class="module-default__about">
        <v-btn dense color="blue" large rounded outlined depressed>About</v-btn>
        <br />
        <br />
        Kaiser Permanente (/ˈkaɪzər pɜːrməˈnɛnteɪ/; KP) is an American integrated managed care
        consortium, based in Oakland, California, United States, founded in 1945 by industrialist
        Henry J. Kaiser and physician Sidney Garfield. Kaiser Permanente is made up of three
        distinct but interdependent groups of entities: the Kaiser Foundation Health Plan, Inc.
        (KFHP) and its regional operating subsidiaries; Kaiser Foundation Hospitals; and the
        regional Permanente Medical Groups. As of 2017, Kaiser Permanente operates in eight states
        (Hawaii, Washington, Oregon, California, Colorado, Maryland, Virginia, Georgia) and the
        District of Columbia, and is the largest managed care organization in the United States.
      </div>
      <br />
      <br /> -->
      <!-- <v-divider></v-divider> -->
      <br />
      <br />
      <div class="d-flex justify-center" :class="$vuetify.breakpoint.xs ? 'mx-3' : 'mx-0'">
        <v-checkbox
          v-model="adkData.acknowledgeScope"
          single-line
          outlined
          full-width
          @click="$emit('update')"
        >
          <template #label>
            <div>I acknowledge I have reviewed the following project scope</div>
          </template>
        </v-checkbox>
      </div>
      <div class="module-default__scope mt-3">
        <v-btn
          :disabled="userType === 'stakeholder' || !adkData.acknowledgeScope || readonly"
          :loading="loadingstatus"
          x-large
          depressed
          color="#3c9dcd"
          class="white--text perform-adk-scope"
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
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable no-prototype-builtins */
/* eslint-disable vue/no-mutating-props */
/* eslint-disable no-param-reassign */
import { defineComponent, PropType, computed, ref, inject } from '@vue/composition-api';
import { getModAdk, loading } from 'pcv4lib/src';
import Instruct from './ModuleInstruct.vue';
import MongoDoc from './types';

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
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    },
    studentDoc: {
      required: true,
      type: Object as () => MongoDoc
    }
  },
  setup(props, ctx) {
    const readonly = inject('readonly', false);
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    const index = programDoc.value.data.adks.findIndex(function findScopeObj(obj) {
      return obj.name === 'scope';
    });

    const initScopeSetup = {
      scope: {
        employerName: '',
        employerWebsite: '',
        projectScope: '',
        introVideo: '',
        aboutOrg: '',
        outcome: [
          'Build portfolio project',
          'Qualify to win work experiences to execute on project'
        ],
        deliverable: ['Ideate', 'Pitch', 'Make', 'Demo'],
        projectReq: '',
        resourceWeb: '',
        resourceInsta: '',
        resourceLinkedIn: '',
        resourceFacebook: '',
        resourceYouTube: '',
        resourceDrive: '',
        resourceTwitter: '',
        interviewProblem: '',
        interviewSolution: '',
        interviewOpportunity: '',
        interviewChallenge: '',
        interviewReqeust: '',
        required: false
      }
    };
    programDoc.value.data.adks[index] = {
      ...initScopeSetup,
      ...programDoc.value.data.adks[index]
    };

    const { adkData, adkIndex } = getModAdk(
      props,
      ctx.emit,
      'scope',
      {
        acknowledgeScope: false
      },
      'studentDoc',
      'inputStudentDoc'
    );
    let sampleEmployerName = ref('');
    const sampleProjectScope = ref('');
    let sampleInterviewProblem = ref('');
    let sampleInterviewSolution = ref('');
    let sampleInterviewOpportunity = ref('');
    let sampleInterviewChallenge = ref('');
    let sampleIR = ref('');
    const sampleOutcome = ref('');
    const sampleDeliverable = ref('');
    let sampleProjectReq = ref('');
    let sampleaboutOrg = ref('');
    let sampleResourceChip = ref('');
    if (programDoc.value.data.adks[index].employerName === '') {
      sampleEmployerName = ref('Your employer name goes here');
    }
    // if (programDoc.programDesc === '') {
    //   sampleProjectScope = ref('Your employer is crafting their project scope');
    // }
    if (programDoc.value.data.adks[index].interviewProblem === '') {
      sampleInterviewProblem = ref('Awaiting an answer from your employer');
    }
    if (programDoc.value.data.adks[index].interviewSolution === '') {
      sampleInterviewSolution = ref('Awaiting an answer from your employer');
    }
    if (programDoc.value.data.adks[index].interviewOpportunity === '') {
      sampleInterviewOpportunity = ref('Awaiting an answer from your employer');
    }
    if (programDoc.value.data.adks[index].interviewChallenge === '') {
      sampleInterviewChallenge = ref('Awaiting an answer from your employer');
      sampleIR = ref('Awaiting an answer from your employer');
    }
    // if (programDoc.value.data.adks[index].rfp.outcome === '') {
    //   sampleOutcome = ref('SAMPLE OUTPUT 6');
    // }
    // if (programDoc.value.data.adks[index].rfp.deliverable === '') {
    //   sampleDeliverable = ref('SAMPLE OUTPUT 7');
    // }
    if (programDoc.value.data.adks[index].projectReq === '') {
      sampleProjectReq = ref('None');
    }
    if (programDoc.value.data.adks[index].aboutOrg === '') {
      sampleaboutOrg = ref('Awaiting a blurb about your employer');
    }
    if (
      programDoc.value.data.adks[index].resourceDrive === '' &&
      programDoc.value.data.adks[index].resourceWeb === '' &&
      programDoc.value.data.adks[index].resourceInsta === '' &&
      programDoc.value.data.adks[index].resourceFacebook === '' &&
      programDoc.value.data.adks[index].resourceYouTube === '' &&
      programDoc.value.data.adks[index].resourceLinkedIn === ''
    ) {
      sampleResourceChip = ref('None');
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
        await props.studentDoc?.update(() => {
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

    return {
      index,
      adkData,
      programDoc,
      initScopeSetup,
      sampleEmployerName,
      sampleProjectScope,
      sampleInterviewProblem,
      sampleInterviewSolution,
      sampleInterviewOpportunity,
      sampleInterviewChallenge,
      sampleIR,
      sampleOutcome,
      sampleDeliverable,
      sampleProjectReq,
      sampleaboutOrg,
      sampleResourceChip,
      saveData,
      successmsg,
      errormsg,
      loadingstatus,
      readonly,
      ...loading(
        () =>
          props.studentDoc.update(() => {
            return {
              isComplete: true,
              adkIndex
            };
          }),
        'Success',
        'Try again later'
      )
      // setup
    };
  },
  data() {
    return {
      showInstructions: 'true'
    };
  }
  // setup() {
  //   const setupInstructions = ref({
  //     description: '',
  //     instructions: ['', '', '']
  //   });
  //   const showInstructions = ref(true);
  //   return {
  //     setupInstructions,
  //     showInstructions
  //   };
  // }
});
</script>

<style lang="scss">
.faq {
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  max-width: 90%;
  margin: auto;
  line-height: 30px;
}
.faq-chat {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 5%;
}
.faq-chat-line {
  margin: 5px;
}
.faq-avatar {
  margin: 5px;
}
.faq-question {
  // text-align: left;
  font-family: 'Raleway';
  font-size: 13px;
  font-weight: 700;
  color: #404142;
}
.faq-answer {
  text-align: left;
  font-family: 'Raleway';
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0px;
  color: white;
  font-style: italic;
}
.faq-answer-dark {
  text-align: left;
  font-family: 'Raleway';
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0px;
  color: #404142;
  font-style: italic;
}
.faq-answer-dark-highlight {
  text-align: left;
  font-family: 'Raleway';
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0px;
  color: #404142;
}

.v-timeline-item__divider {
  margin-top: auto;
  margin-bottom: auto;
}

.demoClass {
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    height: fit-content !important;
    min-height: fit-content !important;
  }
  .v-item-group {
    .v-chip {
      @media (max-width: 767px) {
        height: fit-content;
        padding: 6px 12px;
        .v-chip__content {
          white-space: normal;
        }
      }
    }
  }
}

.resources-item {
  .v-list-item {
    justify-content: center;
  }
}
.module-default {
  &__about-text {
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.2px;
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
    // width: 100%;
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

    @media (max-width: 767px) {
      a.v-btn {
        height: fit-content !important;
        padding: 5px 12px !important;
        .v-btn__content {
          white-space: normal;
          width: 100%;
        }
      }
    }
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

  &__specs-title {
    font-weight: 800;
  }
}
</style>
