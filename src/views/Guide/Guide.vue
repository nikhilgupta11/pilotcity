<template>
  <Loading v-slot="{ loading }" :process-now="true" :callback="fetchProgram">
    <v-skeleton-loader
      :loading="loading"
      type="heading, list-item-two-line, list-item-two-line, list-item-three-line"
      class="guide__container"
    >
      <div class="guide__bar">
        <guide-bar
          v-if="programDoc.data._id && timeline"
          v-model="currentPage"
          :timeline="timeline"
          :title="programDoc.data.programName"
          :student-doc="studentDoc"
          :needsetup="needsetup"
          :program-doc="programDoc"
          :fetch-program="fetchProgram"
          :user-doc="userDoc"
          :stakeholder-ids="
            studentDoc && studentDoc.data.stakeholders ? studentDoc.data.stakeholders : []
          "
          :student-status="studentStatus"
          :adks-with-preview-mode="adksWithPreviewMode"
          :preview-enabled="previewModeEnabled"
          :can-publish-program="canPublishProgram"
          :operation-mode="operationMode"
          @unlock="handleUnlockStep"
        />
      </div>

      <div :class="containerClass">
        <template v-if="operationMode === OperationMode.Setup">
          <div class="guide__setupbutton">
            <v-btn class="font-weight-bold" small depressed dark color="orange">Setup Mode</v-btn>
          </div>
        </template>

        <div v-if="operationMode === OperationMode.Preview" class="guide__setupbutton">
          <v-btn small depressed dark class="font-weight-bold" @click="handleExitPreview">
            <v-icon left>mdi-close-thick</v-icon>
            Exit Preview
          </v-btn>
        </div>

        <div v-if="operationMode === OperationMode.Monitor" class="guide__setupbutton">
          <v-btn small depressed dark class="font-weight-bold" @click="handleExitMonitor">
            <v-icon left>mdi-close-thick</v-icon>
            Exit Monitor
          </v-btn>
        </div>

        <div
          v-if="currentPage != 0 && operationMode !== OperationMode.Preview"
          class="guide__locks guide__locks--left unlocked"
        >
          <v-tooltip dark right>
            <template #activator="{ on, attrs }">
              <v-icon
                v-if="
                  operationMode === OperationMode.Participant ||
                  operationMode === OperationMode.Monitor
                "
                v-bind="attrs"
                x-large
                color="green"
                class="guide__lock ml-2 perform-adks-previous"
                :disabled="previewModeEnabled && currentPage !== 1"
                v-on="on"
                @click="prevPage"
              >
                {{ previewModeEnabled && currentPage !== 1 ? 'mdi-lock' : 'mdi-lock-open' }}
              </v-icon>
            </template>

            <span>Unlocked Activity</span>
          </v-tooltip>

          <v-tooltip dark right>
            <template #activator="{ on, attrs }">
              <v-icon
                v-if="operationMode === OperationMode.Setup"
                v-bind="attrs"
                x-large
                color="green"
                class="guide__lock ml-2 setup-adks-previous"
                v-on="on"
                @click="prevPage"
                >mdi-check-circle</v-icon
              >
            </template>

            <span>Last Activity Setup</span>
          </v-tooltip>

          <v-icon
            :disabled="previewModeEnabled && currentPage !== 1"
            x-large
            color="grey darken-3"
            class="guide__lock"
            @click="prevPage"
          >
            mdi-chevron-double-left
          </v-icon>
        </div>

        <div class="guide__activities">
          <component
            :is="currentUnit"
            v-if="programDoc && programDoc.data.dateCreated && userDoc.data && teamDocLoaded"
            v-model="programDoc"
            :student-doc="studentDoc"
            :team-doc="teamDoc"
            :get-team-doc="getTeamDoc"
            :license-program="licenseProgram"
            :user-type="userType"
            :db="db"
            :user-doc="userDoc"
            :mongo-user="mongoUser"
            :current-user="mongoUser"
            :timeline="timeline"
            :upload-item="uploadItem"
            :get-student-doc="getStudentDoc"
            :fetch-program="fetchProgram"
            :docusign-api-domain="docusignApiDomain"
            :operation-mode="operationMode"
            @inputStudentDoc="studentDoc = $event"
            @inputTeamDoc="teamDoc = $event"
            @inputUserDoc="userDoc = $event"
            @nextPage="handleGoToNextPage"
            @usedToken="getStudentDoc()"
          />

          <Comments
            v-if="shouldDisplayComments"
            style="max-width: 675px"
            :comments="comments"
            :current-user="currentUser"
            :available-types="commentsTypes"
            :type="currentCommentType"
            @add-comment="handleAddComment"
            @comment-mode-changed="handleCommentModeChanged"
            @edit-comment="handleEditComment"
            @delete-comment="handleDeleteComment"
          />
          <!-- </div> -->
          <v-snackbar
            v-if="studentDoc && operationMode === OperationMode.Participant"
            v-model="snackbar"
            class="snackbar-announcement2"
            color="green"
            timeout="-1"
            min-width="fit-content"
            top
          >
            <span class="font-weight-bold">
              <v-icon left>mdi-timer-sand</v-icon>
              Deadline to interview is Tuesday, May 31, 11:59pm PST after our
              <a
                target="_blank"
                class="snackbar-text"
                style="text-decoration: underline"
                href="https://www.eventbrite.com/e/pilotcity-airtime-2022-tickets-315787728597"
                >digital hackathon</a
              >
            </span>
            <template #action="{ attrs }">
              <v-btn v-bind="attrs" icon @click="snackbar = false"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </template>
          </v-snackbar>

          <!-- POPUP -->

          <!-- <v-dialog
            v-if="studentDoc && operationMode === OperationMode.Participant"
            v-model="announcement4"
            width="28%"
          >
            <template #activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on"></div>
            </template>
            <v-card class="mobile__deliverable-card2">
              <div class="videoask-black-background">
                <iframe
                  src="https://www.videoask.com/fn3uzg0ed"
                  allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
                  width="100%"
                  height="600px"
                  style="border: none"
                >
                </iframe>
              </div>
            </v-card>
          </v-dialog> -->

          <v-dialog
            v-if="
              operationMode === OperationMode.Participant &&
              (userDoc.data.airtime2022 === '' || !userDoc.data.airtime2022)
            "
            v-model="announcement4"
            persistent
            width="50%"
          >
            <template #activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on"></div>
            </template>
            <v-card class="mobile__deliverable-card2">
              <v-container class="mt-auto mb-auto d-flex justify-center flex-column pa-0 ma-0">
                <div class="d-flex justify-center mt-8 mr-8 ml-8 flex-column">
                  <v-icon x-large color="green" class="mb-3">mdi-checkbox-marked-circle</v-icon>
                  <div
                    class="
                      headline
                      font-weight-bold
                      d-flex
                      justify-center
                      mobile__title
                      text-center
                    "
                  >
                    🏁 You're auto-registered to our digital hackathon!
                  </div>

                  <div class="d-flex justify-center text-center ml-12 mr-12 mt-12">
                    It is this Friday 4pm - Sunday 12am to meet your employer, get live alumni help
                    & join workshops. Sprint to the deadline by completing the Interview by Tue, May
                    31, 11:59pm PST
                  </div>
                </div>
                <div class="d-flex justify-center pa-4 flex-column"></div>
              </v-container>

              <div class="d-flex justify-center">
                <v-btn
                  class="pl-auto pr-auto mb-12 ma-3"
                  x-large
                  dark
                  color="red"
                  depressed
                  rounded
                  @click="
                    announcement4 = false;
                    airtimeUser('OPT-OUT');
                  "
                >
                  Opt-out
                </v-btn>

                <v-btn
                  class="pl-auto pr-auto mb-12 ma-3 font-weight-bold"
                  x-large
                  dark
                  color="green"
                  depressed
                  rounded
                  @click="
                    announcement4 = false;
                    airtimeUser('OPT-IN');
                  "
                >
                  I'll be there
                </v-btn>
              </div>
              <v-divider></v-divider>
              <div class="d-flex justify-center">
                <a
                  href="https://www.pilotcity.com/airtime2022"
                  target="_blank"
                  style="text-decoration: none"
                >
                  <v-btn rounded depressed outlined class="font-weight-bold ma-8"
                    ><v-icon left>mdi-broadcast</v-icon>Goto PilotCity Airtime 2022</v-btn
                  >
                </a>
              </div>
            </v-card>
          </v-dialog>

          <v-snackbar v-model="successNoti" timeout="10000">
            Thanks for your response. Go checkout
            <a
              href="https://www.pilotcity.com/airtime2022"
              target="_blank"
              style="text-decoration: none"
              color="blue"
              >PilotCity Airtime 2022
            </a>
            <template #action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="successNoti = false"> Close </v-btn>
            </template>
          </v-snackbar>

          <!-- POPUP -->

          <div
            v-if="currentPage != maxIndex && operationMode !== OperationMode.Preview"
            class="guide__locks guide__locks--right locked"
          >
            <v-icon
              :disabled="!isNextUnlocked"
              x-large
              color="grey darken-3"
              class="guide__lock"
              @click="nextPage"
              >mdi-chevron-double-right</v-icon
            >
            <v-tooltip dark left>
              <template #activator="{ on, attrs }">
                <v-icon
                  v-if="
                    operationMode === OperationMode.Participant ||
                    operationMode === OperationMode.Monitor
                  "
                  v-bind="attrs"
                  x-large
                  :color="isNextUnlocked ? 'green' : 'red'"
                  class="guide__lock mr-2 perform-adks-next"
                  :disabled="!isNextUnlocked"
                  v-on="on"
                  @click="nextPage"
                  >{{ isNextUnlocked ? 'mdi-lock-open' : 'mdi-lock' }}</v-icon
                >
              </template>
              <span>{{ isNextUnlocked ? 'Unlocked' : 'Locked' }} Activity</span>
            </v-tooltip>

            <v-tooltip dark left>
              <template #activator="{ on, attrs }">
                <v-icon
                  v-if="operationMode === OperationMode.Setup"
                  v-bind="attrs"
                  x-large
                  color="orange"
                  class="guide__lock mr-2 setup-adks-next"
                  :disabled="!isNextUnlocked"
                  v-on="on"
                  @click="nextPage"
                  >mdi-progress-wrench</v-icon
                >
              </template>
              <span>Setup Next Activity</span>
            </v-tooltip>
          </div>
        </div>
        <Overlay
          v-show="shouldDisplayOverlay"
          @goto:last-setup="handleChangeStep('last-setup')"
          @goto:last="handleChangeStep('last')"
          @close="handleCloseOverlay"
          @goto:next="handleChangeStep('next')"
          @goto:next-setup="handleChangeStep('next-setup')"
        />
      </div>
    </v-skeleton-loader>
  </Loading>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  Ref,
  watch,
  watchEffect,
  provide
} from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { retry, switchMap } from 'rxjs/operators';
import { isFinite } from 'lodash';

import { defer, iif, of, throwError } from 'rxjs';
import { from as ixfrom, iif as ixiif, of as ixof } from 'ix/asynciterable';
import { flatMap as ixflatMap } from 'ix/asynciterable/operators';

import { ObjectId } from 'bson';
import axios from 'axios';
import store, { useUserGetters, useDbGetters, useRealmAppState, useDbState } from '@/store';
import Loading from '@/components/Loading.vue';
import { MutationTypes as DbMutationTypes } from '@/store/modules/db/mutations';
import type { CommentAuthor } from '@/@types/comment.d';
import Comments from '@/components/comments/Comments.vue';

import useComments from '@/composables/useComments';
import { useVideoAsk } from '@/composables/useVideoAsk';

import { OperationMode } from '@/constants/operationMode';
import type { OperationModeType } from '@/@types/operationMode.d';
import { FileStorageActions } from '../../store/modules/fileStorage/actions';
import Bar from './components/Bar.vue';
import { getStudentStatus, StudentStatus } from '../Monitor/studentStatus';
import Overlay from './components/Overlay.vue';
import AdkSetup from './activities/setup/components/Module.vue';
import AdkScope from './activities/scope/components/Module.vue';
import Community from './activities/community/components/Module.vue';
import AdkTeam from './activities/team/components/Module.vue';
import Train from './activities/train/components/Module.vue';
import Research from './activities/research/components/Module.vue';
import Tinker from './activities/tinker/components/Module.vue';
import Ideate from './activities/ideate/components/Module.vue';
import Pitches from './activities/pitches/components/Module.vue';
import Forum from './activities/forum/components/Module.vue';
import Make from './activities/make/components/Module.vue';
import Demo from './activities/demo/components/Module.vue';
import AutoApply from './activities/autoApply/components/Module.vue';
import Interview from './activities/interview/components/Module.vue';
import Offer from './activities/offer/components/Module.vue';
import Agreement from './activities/agreement/components/Module.vue';

export const enum ProgramActivityStatus {
  NeedSetup = 'need_setup',
  CompleteSetup = 'complete_setup',
  Standard = 'standard'
}

export interface ITimeLineItem {
  step: string;
  unlocked: boolean;
  category: 'project' | 'internship';
  tooltip: string;
  status?: ProgramActivityStatus;
}

export default defineComponent({
  name: 'Guide',

  components: {
    'guide-bar': Bar,
    Overlay,
    Loading,
    start: AdkSetup,
    scope: AdkScope,
    community: Community,
    team: AdkTeam,
    train: Train,
    research: Research,
    tinker: Tinker,
    Ideate,
    Pitch: Pitches,
    forum: Forum,
    make: Make,
    demo: Demo,
    autoapply: AutoApply,
    interview: Interview,
    offer: Offer,
    agreement: Agreement,
    Comments
  },

  props: {
    studentId: {
      type: String,
      required: false,
      default: ''
    },
    programId: {
      type: String,
      required: false,
      default: ''
    },
    page: {
      type: Number,
      required: false,
      default: 1
    },
    monitorOrganizerView: {
      type: Boolean,
      required: false,
      default: false
    },
    openAsWidget: {
      type: Boolean,
      required: false,
      default: false
    },
    previewView: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(_props, ctx) {
    const adks = ref([
      'start',
      'scope',
      'community',
      'team',
      'train',
      'research',
      'tinker',
      'Ideate',
      'Pitch',
      'forum',
      'make',
      'demo',
      'interview',
      'offer',
      'agreement'
    ]);

    // const getUserDoc = () =>
    //   collection.value!('User').findOne({
    //     program_id: new ObjectId(programId),
    //     participant_id: participant_id.value
    //   });

    // const optOutAirtime2022 = (airtime2022: string) => {
    //   props.db
    //     .collection('StudentPortfolio')
    //     .findOneAndUpdate({ _id: props.userDoc.data._id }, { $set: { date: birthday } });
    // };

    // props.db
    //      .collection('users')
    //      .findOne({
    //         _id: props.userDoc.data._id,             airtime2022: {$exists: false}
    //      }).then(doc => {
    //         airtime2022PopUpDialog = true
    //      };

    const needsetup = ref(['start', 'scope', 'train', 'research', 'interview', 'offer']);
    const shouldCloseDisplayOverlay = ref(false);
    const adksWithPreviewMode = ref(process.env.VUE_APP_PREVIEW_MODE_ADKS?.split(',') || []);
    const { getObjectId } = useUserGetters(['getObjectId']);

    const { studentId, programId, openAsWidget, monitorOrganizerView } = _props;

    // Get the participant id from the logged in user, if there's participant id on the URL, use that
    // eslint-disable-next-line camelcase
    const participant_id: Ref<ObjectId | null> = ref(getObjectId.value);
    if (studentId) {
      participant_id.value = new ObjectId(studentId as string);
    }

    const { collection } = useDbGetters(['collection']);
    const programDoc: Ref<{
      data: Record<string, any>; // Gives access to Document
      update: (shouldMarkAsComplete?) => Promise<any>; // Gives access to update Method
      changeStream: any; // Gives access to mongodb Collection Changestream
    }> = ref({
      data: {},
      update: async () => null,
      changeStream: undefined
    });
    //! Doc Creation

    const { app } = useRealmAppState(['app']);
    const db = app.value.currentUser?.mongoClient('mongodb-atlas').db('Primary');
    const teamChangeStream = collection.value!('ProgramTeam').watch({
      filter: {
        'fullDocument.program_id': new ObjectId(programId),
        'fullDocument.members._id': participant_id.value
      }
    });
    const teamDocLoaded = ref(false);
    const teamDoc: Ref<{
      data: Record<string, any>; // Gives access to Document
      update: (shouldMarkAsComplete?) => Promise<any>; // Gives access to update Method
      changeStream: any; // Gives access to mongodb Collection Changestream
    } | null> = ref(null);

    const studentDoc: Ref<{
      data: Record<string, any>; // Gives access to Document
      update: (shouldMarkAsComplete?) => Promise<any>; // Gives access to update Method
      changeStream: any; // Gives access to mongodb Collection Changestream
    } | null> = ref(null);
    const studentChangeStream = collection.value!('Student').watch({
      filter: {
        'fullDocument.program_id': new ObjectId(programId),
        'fullDocument.participant_id': participant_id.value
      }
    });

    const { user } = useDbState(['user']);

    const userChangeStream = collection.value!('User').watch({
      filter: {
        'fullDocument._id': participant_id.value
      }
    });

    const userDoc = ref({
      data: user.value,
      update: () => {},
      changeStream: userChangeStream
    });
    watch(user, () => {
      userDoc.value.data = user.value;
    });

    const userType = computed(() => {
      // This is to make sure that we don't prematurely set the user type to stakeholder
      // while program docuemnt is not loaded
      if (!programDoc.value.data.organizers?.length) {
        return '';
      }
      if (
        programDoc.value.data.organizers?.some(
          id => id.toString() === getObjectId.value?.toString()
        )
      ) {
        return 'organizer';
      }
      if (studentId) {
        return 'stakeholder';
      }
      return 'participant';
    });

    const studentStatus = ref<StudentStatus | null>(null);

    const timeline: Ref<ITimeLineItem[] | null> = ref(null);

    const maxIndex = adks.value.length - 1;
    const currentPage = computed({
      get: () => _props.page,
      set: newPage => {
        if (newPage <= maxIndex && newPage >= 0) {
          if (openAsWidget) {
            ctx.emit('new-page', newPage);
            return;
          }
          shouldCloseDisplayOverlay.value = false;
          ctx.root.$router
            ?.replace({
              params: {
                programId,
                page: newPage.toString()
              },
              query: { ...ctx.root.$route?.query }
            })
            .catch(() => {}); // TODO: Handle error, find a better way to redirect the page instead of using setter
        }
      }
    });
    const currentUnit = computed(() => adks.value[currentPage.value]);
    const previewModeEnabled = computed(() => {
      return _props.previewView === true && userType.value === 'participant';
    });
    const isInPreviewMode = computed(() => {
      return previewModeEnabled.value && adksWithPreviewMode.value.includes(currentUnit.value);
    });
    const operationMode = computed(() => {
      if (monitorOrganizerView) {
        return OperationMode.Monitor;
      }
      if (userType.value === 'organizer') return OperationMode.Setup;
      if (userType.value === 'participant') return OperationMode.Participant;
      if (isInPreviewMode.value) return OperationMode.Preview;
      return OperationMode.None;
    });

    provide('readonly', isInPreviewMode);

    const getTimeline = () => {
      if (!programDoc.value.data._id) return null;

      const adkDoc = programDoc.value.data.adks;
      const studentDocAdk = studentDoc.value?.data.adks;
      const teamDocAdk = teamDoc.value?.data.adks;

      studentStatus.value = getStudentStatus(studentDoc.value?.data);

      const projectTimeline: ITimeLineItem[] = adks.value.map(adk => {
        let unlocked = false;
        let category: 'project' | 'internship' = 'project';
        let status: ProgramActivityStatus = ProgramActivityStatus.Standard;
        const tooltipsList: { [key: string]: string } = {
          start: 'Go to activity',
          scope: 'Go to activity',
          community: 'Go to activity',
          team: 'Go to activity',
          train: 'Go to activity',
          research: 'Go to activity',
          tinker: 'Go to activity',
          Ideate: 'Go to activity',
          Pitch: 'Go to  activity',
          forum: 'Go to  activity',
          make: 'Go to activity',
          demo: 'Go to activity',
          autoapply: 'Go to activity',
          interview: 'Go to activity',
          offer: 'Go to  activity',
          agreement: 'Go to activity'
        };

        const tooltip = tooltipsList[adk];

        // const adkObject = adkDoc?.find(adkObject => adkObject.name === adk);
        const adkObject = adkDoc?.find(adkObject => {
          if (adkObject) {
            return adkObject.name === adk;
          }
          return false;
        });
        const finishsedSetup = adkObject?.status === ProgramActivityStatus.CompleteSetup;

        status = adkObject?.status || ProgramActivityStatus.Standard;

        const currentAdkIndex = needsetup.value.findIndex(needSetup => needSetup === adk);
        const previousAdk = needsetup.value[currentAdkIndex - 1];
        const previousAdkFinishedSetup =
          adkDoc?.find(adkObject => {
            if (adkObject) {
              return adkObject.name === previousAdk;
            }
            return false;
          })?.status === ProgramActivityStatus.CompleteSetup;
        // adkDoc?.find(adkObject => adkObject.name === previousAdk)?.status ===
        // ProgramActivityStatus.CompleteSetup;

        switch (operationMode.value) {
          case OperationMode.Setup:
            switch (adk.toLowerCase()) {
              case 'start':
                unlocked = true;
                status =
                  programDoc.value.data.start_activity_status || ProgramActivityStatus.Standard;
                break;
              case 'scope':
                unlocked =
                  finishsedSetup ||
                  !!programDoc.value.data.licensed ||
                  programDoc.value.data.start_activity_status ===
                    ProgramActivityStatus.CompleteSetup;
                break;
              default:
                if (!needsetup.value.includes(adk)) {
                  unlocked = true;
                } else {
                  unlocked = finishsedSetup || previousAdkFinishedSetup;
                }
                break;
            }

            unlocked = unlocked || !needsetup.value.includes(adk);
            break;
          default:
            if (studentDocAdk && Array.isArray(studentDocAdk)) {
              switch (adk.toLowerCase().trim()) {
                case 'start':
                  unlocked = !!programDoc.value.data.participants
                    ?.map(id => id.toString())
                    .includes(participant_id.value?.toString());
                  break;
                case 'scope':
                  unlocked = !!studentDocAdk?.find(a => a.name === adk)?.completed;
                  break;
                case 'community':
                  unlocked =
                    studentDoc.value?.data.adks.find(a => a.name === adk)?.completed ||
                    !!studentDocAdk?.find(a => a.name === adk)?.discordInfo ||
                    studentDocAdk?.find(a => a.name === adk)?.discordIntegraionSkipped;
                  break;
                case 'team':
                  unlocked = !!teamDoc.value && !!teamDoc.value?.data;
                  break;
                case 'train':
                  unlocked = !!studentDocAdk.find(a => a.name === adk)?.completed;
                  break;
                case 'research':
                  unlocked =
                    !!studentDocAdk?.find(a => a.name === adk)?.completed ||
                    !!studentDocAdk?.find(a => a.name === adk)?.activityEndedOn;
                  break;
                case 'interview':
                  unlocked = studentDoc.value?.data.applicationStatus;
                  break;
                case 'offer':
                  unlocked = !!studentDocAdk?.find(a => a.name === adk)?.offerStatus;
                  break;
                case 'agreement':
                  category = 'internship';
                  unlocked = !!studentDocAdk?.find(adkObject => adkObject.name === adk)?.completed;
                  break;
                default:
                  unlocked = !!studentDocAdk?.find(adkObject => adkObject.name === adk)?.completed;
              }
            }
            if (teamDocAdk) {
              switch (adk.toLowerCase()) {
                case 'make':
                  unlocked =
                    teamDocAdk?.find(adkObject => adkObject.name === adk)?.logs.length >= 3;
                  break;
                case 'forum':
                  unlocked =
                    teamDocAdk?.find(adkObject => adkObject.name === adk)?.questionsAsked.length >=
                    1;
                  break;
                default:
                  unlocked =
                    unlocked || teamDocAdk?.find(adkObject => adkObject.name === adk)?.completed;
              }
            }

            unlocked = unlocked || false;
        }
        const timelineItem: ITimeLineItem = {
          step: adk,
          unlocked,
          category,
          tooltip,
          status
        };
        return timelineItem;
      });

      timeline.value = projectTimeline;

      return timeline.value;
    };

    const getStudentDoc = () =>
      collection.value!('Student')
        .findOne({
          program_id: new ObjectId(programId),
          participant_id: participant_id.value
        })
        .then(doc => {
          if (doc) {
            studentDoc.value = {
              _id: doc._id,
              data: doc,
              update: async (
                shouldMarkAsComplete: () => {
                  isComplete: boolean;
                  adkIndex: number;
                }
              ) => {
                if (shouldMarkAsComplete) {
                  const { isComplete, adkIndex } = shouldMarkAsComplete();
                  // if user has completed the module & field hasn't been set
                  const adk = studentDoc.value?.data.adks?.[adkIndex];
                  if (isComplete && !adk.completed) {
                    adk.completed = new Date();
                  }
                }
                await getTimeline();

                return collection.value!('Student').findOneAndUpdate(
                  {
                    _id: doc._id
                  },
                  {
                    ...studentDoc.value?.data,
                    lastSaved: new Date()
                  }
                );
              }
            } as any;
          }
        });

    const getTeamDoc = () =>
      collection.value!('ProgramTeam')
        .findOne({
          program_id: new ObjectId(programId),
          $or: [{ 'members._id': participant_id.value }, { owner: participant_id.value }]
        })
        .then(doc => {
          if (doc)
            teamDoc.value = {
              data: doc,
              changeStream: teamChangeStream,
              update: async (
                shouldMarkAsComplete: () => {
                  isComplete: boolean;
                  adkIndex: number;
                }
              ) => {
                if (shouldMarkAsComplete) {
                  const { isComplete, adkIndex } = shouldMarkAsComplete();

                  // if user has completed the module & field hasn't been set
                  const adk = teamDoc.value?.data.adks?.[adkIndex];
                  if (isComplete && !adk.completed) {
                    adk.completed = new Date();
                  }
                }
                getTimeline();

                return collection.value!('ProgramTeam').findOneAndUpdate(
                  {
                    _id: doc._id
                  },
                  { ...teamDoc.value?.data, lastSaved: new Date() }
                );
              }
            } as any;
          teamDocLoaded.value = true;
        });

    const mongoUser = app.value.currentUser;

    async function fetchProgram() {
      programDoc.value.data = await collection.value!('Program').findOne({
        _id: new ObjectId(programId)
      });
      // initialize Properties
      programDoc.value.data = {
        adks: [],
        ...programDoc.value.data
      };
    }

    // Checkout Session Logic
    // const { createCheckoutSession } = useStripeActions(['createCheckoutSession']);
    // const licensePriceId = 'price_1IENzxLnkQGEgDQncNKPhwPr';
    // const cancelUrl = window.location.href; // Bring them back to the setupprogram
    // Nav logic

    const docusignApiDomain = computed(() => {
      return process.env.VUE_APP_DOCUSIGN_API_DOMAIN;
    });

    // TODO: there's a duplication of this logic in Bar.vue file, refactor this using Vue composable functions
    const nextUnlockedAdk = computed(() => {
      let nextUnlockedAdk: ITimeLineItem | undefined;

      // Find the first incomplete adk in the list
      const firstUnlockedAdk = timeline.value?.find(adk => !adk.unlocked);

      if (firstUnlockedAdk) {
        nextUnlockedAdk = firstUnlockedAdk;
      }
      return nextUnlockedAdk;
    });

    const isStepUnlocked = (adkObject: ITimeLineItem, operationMode: OperationModeType) => {
      if (operationMode === OperationMode.Setup) {
        return adkObject.unlocked;
      }
      return adkObject?.unlocked || adkObject.step === nextUnlockedAdk.value?.step;
    };

    const isNextUnlocked = computed(() => {
      const nextPage = timeline.value?.[currentPage.value + 1];
      if (!nextPage) {
        return false;
      }
      return isStepUnlocked(nextPage, operationMode.value);
    });
    const nextPage = () => {
      if (isNextUnlocked.value) currentPage.value += 1;
    };
    const prevPage = () => {
      currentPage.value -= 1;
    };
    const nextSetupPage = () => {
      const currentPageIndex = adks.value.indexOf(currentUnit.value);

      for (let i = currentPageIndex; i < adks.value.length; i++) {
        const targetAdk = adks.value[i];

        if (
          needsetup.value.includes(targetAdk) &&
          (timeline.value?.[i].unlocked || targetAdk === 'interview') // TODO: remove special logic for interview once we finish backend development
        ) {
          currentPage.value = i;
          break;
        }
      }
    };
    const lastSetupPage = () => {
      const currentPageIndex = adks.value.indexOf(currentUnit.value);

      for (let i = currentPageIndex; i >= 0; i--) {
        const targetAdk = adks.value[i];

        if (
          needsetup.value.includes(targetAdk) &&
          (timeline.value?.[i].unlocked || targetAdk === 'interview') // TODO: remove special logic for interview once we finish backend development
        ) {
          currentPage.value = i;
          break;
        }
      }
    };
    watchEffect(() => {
      const maxLength = maxIndex;
      if (currentPage.value >= maxLength) {
        currentPage.value = maxLength;
      }
      if (currentPage.value < 0) {
        currentPage.value = 0;
      }
    });
    async function licenseProgram() {
      programDoc.value.data.licensed = new Date();
      await programDoc.value.update();
      nextPage();
    }
    ixfrom(userChangeStream).forEach(change => {
      store.commit(`db/${DbMutationTypes.setUser}`, (change as any).fullDocument, { root: true });
      getTimeline();
    });
    programDoc.value.update = async (
      shouldMarkAsComplete: () => {
        isComplete: boolean;
        adkIndex: number;
        status: ProgramActivityStatus;
      }
    ) => {
      // if user has completed the module for the first time, we'll mark it
      if (shouldMarkAsComplete) {
        const { isComplete, adkIndex, status } = shouldMarkAsComplete();
        const adk = programDoc.value.data.adks?.[adkIndex];

        if (status === ProgramActivityStatus.CompleteSetup) {
          adk.status = status;
        }

        // if user has completed the module & field hasn't been set
        if (isComplete && !adk.completed) {
          adk.completed = new Date();
        }
      }
      programDoc.value.data = await collection.value!('Program').findOneAndUpdate(
        {
          _id: new ObjectId(programId)
        },
        { ...programDoc.value.data, lastSaved: new Date() },
        { returnNewDocument: true }
      );
      getTimeline();

      return programDoc.value.data;
    };
    // streams
    ixfrom(studentChangeStream).forEach(async change => {
      if (!studentDoc.value) await getStudentDoc();
      studentDoc.value!.data = (change as any).fullDocument;
    });
    ixfrom(teamChangeStream)
      .pipe(
        ixflatMap((change: any) =>
          ixiif(
            () =>
              change?.fullDocument?.members
                ?.map(member => member._id.toString())
                .includes(participant_id.value?.toString()),
            ixof(change),
            ixof(null)
          )
        )
      )
      .forEach(change => {
        if (change) {
          teamDoc.value = {
            data: change.fullDocument,
            changeStream: teamChangeStream,
            update: async (
              shouldMarkAsComplete: () => {
                isComplete: boolean;
                adkIndex: number;
              }
            ) => {
              if (shouldMarkAsComplete) {
                const { isComplete, adkIndex } = shouldMarkAsComplete();
                // if user has completed the module & field hasn't been set
                const adk = teamDoc.value?.data.adks?.[adkIndex];
                if (isComplete && !adk.completed) {
                  adk.completed = new Date();
                }
              }
              return collection.value!('ProgramTeam').findOneAndUpdate(
                {
                  _id: change.fullDocument._id
                },
                { ...teamDoc.value?.data, lastSaved: new Date() }
              );
            }
          };
        } else teamDoc.value = null;
        getTimeline();
      });
    defer(() => Promise.all([getTeamDoc(), getStudentDoc()]))
      .pipe(
        switchMap(() => {
          getTimeline();
          return iif(
            () => !!timeline.value,
            of(timeline.value),
            throwError(new Error('Timeline must exist'))
          );
        }),
        retry(10)
      )
      .subscribe(timeline => {
        if (!timeline) return;

        // If user is at the first ADK, or trying to access a locked ADK, we'll redirect the user to the first unlocked ADK
        if (operationMode.value === OperationMode.Monitor) return;
        if (_props.page === 0 || !timeline.find(adk => adk.step === currentUnit.value)?.unlocked) {
          // Find the first unlocked adk in the list
          let firstUnlockedAdkIndex = 0;
          if (!previewModeEnabled.value) {
            firstUnlockedAdkIndex = timeline.findIndex(adk => !!adk.unlocked);
          }
          if (firstUnlockedAdkIndex > -1) {
            currentPage.value = firstUnlockedAdkIndex;
          }
        }
      });
    const { useActions: useFileStorageActions } = createNamespacedHelpers<
      any,
      any,
      FileStorageActions,
      any
    >(store, 'fileStorage');
    const { uploadItem } = useFileStorageActions(['uploadItem']);

    const handleExitMonitor = () => {
      if (openAsWidget) {
        ctx.emit('exit-monitor');
      } else {
        ctx.root.$router.$router.push({
          name: 'Monitor',
          params: { participantId: studentDoc.value?.data._id.toString() },
          query: {
            program: monitorOrganizerView ? programDoc.value?.data._id.toString() : null
          }
        });
      }
    };

    const handleExitPreview = () => {
      currentPage.value = 0;
    };

    const finishedSetup = (adkName: string) => {
      if (adkName === 'start') {
        return (
          programDoc.value?.data?.start_activity_status === ProgramActivityStatus.CompleteSetup
        );
      }
      // TODO: remove this when setup mode for Interview is implemented
      if (adkName === 'interview') {
        return true;
      }
      return (
        // programDoc.value?.data?.adks?.find(adk => adk !== null && adk.name === adkName)?.status ===
        // ProgramActivityStatus.CompleteSetup
        programDoc.value?.data?.adks?.find(adk => {
          if (adk) {
            return adk.name === adkName;
          }
          return false;
        })?.status === ProgramActivityStatus.CompleteSetup
      );
    };

    const stepsRequireSetupCompletePercentage = computed(() => {
      const totalStepsRequireSetup = needsetup.value?.length;
      let completedSteps = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const stepName of needsetup.value || []) {
        if (finishedSetup(stepName)) {
          completedSteps += 1;
        }
      }

      return Math.floor((completedSteps / totalStepsRequireSetup) * 100);
    });

    const currentUnitRequiresSetup = computed(() => {
      return currentUnit.value && needsetup.value?.includes(currentUnit.value);
    });

    const shouldDisplayOverlay = computed(() => {
      return (
        operationMode.value === OperationMode.Setup &&
        !currentUnitRequiresSetup.value &&
        !shouldCloseDisplayOverlay.value
      );
    });

    const containerClass = computed(() => {
      return {
        guide__page_organizer: operationMode.value === OperationMode.Setup,
        guide__page_participant: operationMode.value === OperationMode.Participant,
        guide__page_monitor: operationMode.value === OperationMode.Monitor,
        guide__preview_view: operationMode.value === OperationMode.Preview,
        'almost-done':
          stepsRequireSetupCompletePercentage.value > 51 &&
          stepsRequireSetupCompletePercentage.value < 99,
        done: stepsRequireSetupCompletePercentage.value === 100
      };
    });

    const handleUnlockStep = (step: ITimeLineItem) => {
      const currentStepIndex = timeline.value?.findIndex(adk => adk.step === step.step) || -1;

      if (timeline.value?.length && currentStepIndex > -1) {
        timeline.value[currentStepIndex].unlocked = true;
      }
    };

    const handleGoToNextPage = () => {
      ctx.root.$router.push({
        name: 'guide',
        params: {
          programId,
          page: currentPage.value + 1
        },
        query: {
          preview: 'false'
        }
      });
    };

    const canPublishProgram = computed(() => {
      return operationMode.value === OperationMode.Setup && needsetup.value.every(finishedSetup);
    });

    const handleChangeStep = (action: 'last-setup' | 'next-setup' | 'last' | 'next') => {
      switch (action) {
        case 'last-setup':
          lastSetupPage();
          break;
        case 'next-setup':
          nextSetupPage();
          break;
        case 'last':
          prevPage();
          break;
        case 'next':
          nextPage();
          break;
        default:
          break;
      }
    };

    const handleCloseOverlay = () => {
      shouldCloseDisplayOverlay.value = true;
    };

    const currentUser = computed(() => {
      const user: CommentAuthor = {
        _id: userDoc.value?.data?._id,
        firstName: userDoc.value?.data?.firstName,
        lastName: userDoc.value?.data?.lastName,
        profile: userDoc.value?.data?.profile
      };

      return user;
    });

    const {
      comments,
      handleAddComment,
      commentsTypes,
      handleCommentModeChanged,
      currentCommentType,
      handleEditComment,
      handleDeleteComment
    } = useComments(
      currentUser,
      operationMode,
      userType,
      currentUnit,
      studentDoc,
      teamDoc,
      previewModeEnabled
    );

    const shouldDisplayComments = computed(() => {
      return commentsTypes.value.length > 0 && currentUnit.value !== 'start';
    });

    useVideoAsk(user, operationMode, userType, programDoc.value);

    const announcement4 = ref(true);
    const successNoti = ref(false);
    async function airtimeUser(val) {
      try {
        const data = {
          airtime2022: val
        };
        const res = await axios.post(`${process.env.VUE_APP_OPT_IN}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apollo-token')}`
          }
        });

        if (res.data.data) {
          successNoti.value = true;
        }
      } catch (error) {
        console.log(error);
      }
    }

    return {
      currentUnit,
      successNoti,
      getTeamDoc,
      maxIndex,
      currentPage,
      nextPage,
      prevPage,
      timeline,
      fetchProgram,
      programDoc,
      licenseProgram,
      isNextUnlocked,
      db,
      teamDoc,
      studentDoc,
      userDoc,
      userType,
      mongoUser,
      getStudentDoc,
      teamDocLoaded,
      needsetup,
      uploadItem,
      snackbar: true,
      handleExitMonitor,
      studentStatus,
      docusignApiDomain,
      containerClass,
      adksWithPreviewMode,
      handleUnlockStep,
      handleExitPreview,
      isInPreviewMode,
      previewModeEnabled,
      handleGoToNextPage,
      canPublishProgram,
      operationMode,
      OperationMode,
      stepsRequireSetupCompletePercentage,
      shouldDisplayOverlay,
      handleChangeStep,
      handleCloseOverlay,
      currentUser,
      handleAddComment,
      handleEditComment,
      comments,
      shouldDisplayComments,
      isStepUnlocked,
      nextUnlockedAdk,
      commentsTypes,
      handleCommentModeChanged,
      currentCommentType,
      handleDeleteComment,
      announcement4,
      airtimeUser,
      user
    };
  }
});
</script>
<style lang="scss">
.videoask-black-background {
  background-color: #000000;
}
.snackbar-announcement2 {
  margin-left: 11%;

  @media (max-width: 767px) {
    margin-left: 0px !important;
  }
}
.snackbar-text {
  color: white !important;
}
.guide__ {
  &container {
    width: 100%;
    display: flex;
    background-color: transparent;
  }
  &bar {
    width: fit-content;
    height: fit-content;
    @media (max-width: 991px) {
      width: unset;
    }
  }
  &page_participant {
    width: 100%;
    height: 100vh;
    position: relative;
    border: 12px solid transparent;
  }
  &page_monitor {
    width: 100%;
    height: 100vh;
    position: relative;
    border: 12px solid #dedede;
  }
  &page_organizer {
    width: 100%;
    height: 100vh;
    position: relative;
    border: 12px solid orange;
    @media (max-width: 991px) {
      border: 0;
      height: calc(100% - 60px);
    }
    @media (max-width: 767px) {
      padding-top: 57px;
    }

    &.almost-done {
      border-color: #fec34b;
    }
    &.done {
      border-color: #6eba80;
    }
  }
  &preview_view {
    border: 12px solid #dedede;
  }
  &page {
    width: 100%;
    height: 100vh;
    position: relative;
    border: 12px solid transparent;
  }
  &activities {
    overflow: scroll;
    width: 100%;
    height: 97vh;
    @media (max-width: 1199px) {
      height: 100%;
    }
  }
  &activities2 {
    width: 100%;
    height: 97vh;
    background-color: rgba(64, 65, 66, 0.8);
    z-index: -1;
  }

  &activities3 {
    z-index: 0;
  }

  &setupbutton {
    background-color: transparent;
    z-index: 50;
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 1199px) {
      top: 40px;
    }
  }
  &nosetuprequired {
    background-color: transparent;
    z-index: 50;
    position: absolute;
    // top: 43%;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &locks {
    height: 97vh;
    width: 70px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    @media (max-width: 991px) {
      margin: 10px;
      height: auto;
      position: fixed;
      z-index: 99;
      bottom: 0px !important;
      top: unset !important;
      display: flex;
      align-items: end;
    }
    &--left {
      left: 0;
      top: 0;
    }
    &--right {
      right: 0;
      top: 0;
    }
  }
  &lock {
    z-index: 99;
    color: var(--v-accent-base);
    &.unlocked {
      &:hover {
        color: var(--v-success-base);
      }
    }

    &.locked {
      &:hover {
        color: var(--v-error-base);
      }
    }
  }
}
</style>
