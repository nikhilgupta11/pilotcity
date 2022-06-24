<template>
  <Loading v-slot="{ loading }" :process-now="true" :callback="loadData">
    <v-skeleton-loader
      :loading="loading"
      type="heading, list-item-two-line, list-item-two-line, list-item-three-line"
    >
      <div v-if="students" class="guide__container">
        <div class="guide__bar">
          <guide-bar
            v-model="selectedStudent"
            :error-code="errorCode"
            :students="students"
            :programs="programs"
            @update:activityFilter="activityFilter = $event"
            @resolveStudentApplication="
              resolveStudentApplication($event.studentId, $event.accept, $event.newOffer)
            "
            @monitor-click="handleMonitorButtonClick"
          />
        </div>
        <template v-if="currentView === 'participant'">
          <div v-if="selectedStudent" class="monitor__page">
            <!-- for the make offer to override the offer app -->
            <div v-if="!selectedStudent.showMakeOfferForm">
              <div class="guide__activity-title-button">
                <v-avatar size="50" color="grey lighten-2">
                  <v-img :src="selectedStudent.profile && selectedStudent.profile.small"></v-img>
                </v-avatar>
              </div>
              <div class="guide__activity-title">
                <div>{{ selectedStudent.name }}'s Activities</div>
                <div>
                  <v-chip-group
                    ><v-chip dark small color="blue" class="font-weight-bold">{{
                      selectedStudent.program
                    }}</v-chip
                    ><v-chip outlined small color="blue" class="font-weight-bold">{{
                      selectedStudent.teamName
                    }}</v-chip
                    ><v-chip outlined small class="font-weight-bold"
                      >Grade {{ selectedStudent.grade }}</v-chip
                    ><v-chip outlined small class="font-weight-bold">{{
                      selectedStudent.school ? selectedStudent.school.name : ''
                    }}</v-chip></v-chip-group
                  >
                  <v-progress-linear
                    color="green"
                    class="mt-6 mb-6 white--text"
                    rounded
                    striped
                    height="25"
                    :value="
                      calculateProgramCompletion(selectedStudent.adks, selectedStudent.teamAdks)
                    "
                  >
                    <template #default="{ value }">
                      <strong class="completion-text2 font-weight-black"
                        >{{ Math.ceil(value) }}%</strong
                      >
                    </template>
                  </v-progress-linear>
                </div>
              </div>

              <div class="guide__table">
                <ListView
                  :selected-student="selectedStudent"
                  :student-adks="selectedStudent.adks"
                  :team-adks="selectedStudent.teamAdks"
                  :program-adks="selectedStudent.programAdks"
                  :activity-filter="activityFilter"
                  @monitor-click="handleMonitorButtonClick"
                />
              </div>
            </div>

            <div v-else>
              <OfferCard
                v-model="selectedStudent"
                :error-code="errorCode"
                @resolveStudentApplication="
                  resolveStudentApplication($event.studentId, $event.accept, $event.newOffer)
                "
              />
            </div>
          </div>
        </template>
        <div v-else class="monitor__page">
          <Guide
            :key="String(selectedStudent.participant_id)"
            :student-id="String(selectedStudent.participant_id)"
            :program-id="String(selectedStudent.program_id)"
            :page="monitorRoute.page"
            :monitor-organizer-view="monitorRoute.monitorOrganizerView"
            :open-as-widget="true"
            @exit-monitor="handleExitMonitor"
            @new-page="handleActivityNewPage"
          />
        </div>
      </div>

      <v-dialog
        :value="selectedStudent && selectedStudent.showMakeOfferDialog"
        max-width="450px"
        @input="handleMakeOfferDialogVisibleChange"
      >
        <v-card :loading="selectedStudent && selectedStudent.isMakingOffer">
          <v-card-title class="d-flex flex-column">
            <div v-if="selectedStudent && selectedStudent.isMakingOffer">
              <div class="d-flex justify-center">
                <v-icon class="mb-6 mt-6" color="gray" x-large>mdi-timer-sand</v-icon>
              </div>
              <div class="headline font-weight-bold">Processing...</div>
            </div>
            <div v-else-if="selectedStudent && selectedStudent.makingOfferFailed">
              <div class="d-flex justify-center">
                <v-icon class="mb-6 mt-6" color="red" x-large>mdi-close</v-icon>
              </div>

              <div class="headline font-weight-bold">Uh-oh! The process failed.</div>
              <v-card-text class="text-center text-capitalize">
                {{ selectedStudent.makingOfferFailedReason }}
              </v-card-text>
            </div>
            <div v-else>
              <div class="d-flex justify-center">
                <v-icon
                  v-if="!selectedStudent || !selectedStudent.makingOfferFailed"
                  class="mb-6 mt-6"
                  color="green"
                  x-large
                  >mdi-check-all</v-icon
                >
                <v-icon v-else class="mb-6 mt-6" color="orange" x-large>
                  mdi-emoticon-neutral-outline
                </v-icon>
              </div>

              <div class="headline font-weight-bold">
                {{ selectedStudent && selectedStudent.makingOfferFinishedMessage }}
              </div>
            </div>
          </v-card-title>

          <div class="d-flex flex-row justify-center pa-3">
            <v-btn
              class="ma-2"
              x-large
              rounded
              outlined
              depressed
              @click="handleMakeOfferDialogClose"
              >Back to Monitor</v-btn
            >
          </div>
        </v-card>
      </v-dialog>
    </v-skeleton-loader>
  </Loading>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, set, toRefs, computed } from '@vue/composition-api';
import { ObjectId } from 'bson';
import { useUserGetters, useDbGetters, useDbState } from '@/store';
import Loading from '@/components/Loading.vue';
import calculateProgramCompletion from '@/utils/calculateProgramCompletion';
import { useVideoAsk } from '@/composables/useVideoAsk';
import { CommentAuthor } from '@/@types/comment.d';
import { OperationMode } from '@/constants/operationMode';
import Bar from './Bar.vue';
import ListView from './components/TableView.vue';
import Guide from '../Guide/Guide.vue';
import OfferCard from './components/OfferCard.vue';
import { StudentStatus, getStudentStatus } from './studentStatus';

export default defineComponent({
  name: 'Monitor',
  components: {
    'guide-bar': Bar,
    ListView,
    Loading,
    Guide,
    OfferCard
  },
  setup(_, ctx) {
    const state = reactive({
      students: [] as Record<string, any>[],
      programs: [] as Record<string, any>[],
      selectedStudent: { adks: [], programAdks: [], teamAdks: [] } as
        | Record<string, any>
        | undefined,
      activityFilter: '',
      currentView: 'participant',
      monitorRoute: {
        page: 1,
        monitorOrganizerView: false
      }
    });

    const { user } = useDbState(['user']);
    const { getObjectId, getUser } = useUserGetters(['getObjectId', 'getUser']);
    const { collection } = useDbGetters(['collection']);
    const { functions } = useDbGetters(['functions']);
    let studentDocs;
    async function loadData() {
      const autoMonitors = await collection.value!('Monitor').find({
        owner: getObjectId.value
      });
      const autoMonitoredStudents: ObjectId[] = [];
      autoMonitors.forEach(obj => {
        autoMonitoredStudents.push(...obj.monkey.map(student => student.userID));
      });
      const studentQuery = {
        stakeholders: { $exists: true, $ne: null },
        program_id: { $exists: true, $ne: null } as Record<string, any> | ObjectId,
        $or: [
          { stakeholders: getObjectId.value },
          { stakeholders: user.value?.email },
          { participant_id: { $in: autoMonitoredStudents } }
        ]
      };
      if (ctx.root.$route.query && ctx.root.$route.query.program)
        // Organizer view of Monitor
        studentQuery.program_id = new ObjectId(ctx.root.$route.query.program as string);
      studentDocs = await collection.value!('Student').find(studentQuery);
      // collect ids
      const studentIds = studentDocs.map(doc => doc.participant_id);
      const programIds = studentDocs.map(doc => doc.program_id);
      // collect docs corresponding to those ids
      const userDocs = await collection.value!('User').find({ _id: { $in: studentIds } });
      const programDocs = await collection.value!('Program').find({ _id: { $in: programIds } });
      const teamDocs = await collection.value!('ProgramTeam').find({
        'members._id': { $in: studentIds }
      });
      const studentPortfolios = await collection.value!('StudentPortfolio').find({
        _id: { $in: studentIds }
      });
      const availableStds = studentDocs.filter(std => {
        const users = userDocs.map(st => st._id.toString());
        return users.includes(std.participant_id.toString());
      });
      // collect data from all docs into one object
      state.students = availableStds.map(studentDoc => {
        const userDoc = userDocs.find(doc => doc._id.equals(studentDoc.participant_id));
        const programDoc = programDocs.find(doc => doc._id.equals(studentDoc.program_id));
        const teamDoc = teamDocs.find(
          doc =>
            doc.members.some(member => member._id.equals(studentDoc.participant_id)) &&
            doc.program_id.equals(studentDoc.program_id)
        );
        const studentPortfolio = studentPortfolios.find(doc =>
          doc._id.equals(studentDoc.participant_id)
        );
        return {
          ...studentDoc,
          program: programDoc ? programDoc?.programName : 'No name',
          programAdks: programDoc ? programDoc.adks : [],
          defaultOffer: programDoc
            ? programDoc.adks.find(adk => adk.name === 'offer')?.offer?.[0]
            : 'No offer',
          newOffer: {},
          teamName: teamDoc ? teamDoc.name : 'No Team',
          teamAdks: teamDoc ? teamDoc.adks : [],
          studentStatus: getStudentStatus(studentDoc),
          // controllable if current user is organizer of the student's program
          controllable: programDoc
            ? programDoc.organizers.some(userId => userId.equals(getObjectId.value))
            : 'No data',
          // make offer stuff
          showMakeOfferForm: false,
          showMakeOfferDialog: false,
          isMakingOffer: false,
          isRejecting: false,
          makingOfferFailed: false,
          makingOfferFailedReason: '',
          makingOfferFinishedMessage: '',
          school: studentPortfolio ? studentPortfolio.school : 'No School',
          grade: studentPortfolio ? studentPortfolio.grade : 'No Grade',
          name: `${userDoc?.firstName} ${userDoc?.lastName}`,
          profile: userDoc?.profile
        }; // * add other fields from userDoc/studentPortfolio needed here
      });
      state.programs = programDocs;
      if (ctx.root.$route.params.participantId)
        // select student from route params if it was provided
        state.selectedStudent = state.students.find(
          student => student._id.toString() === ctx.root.$route.params.participantId
        );
      else [state.selectedStudent] = state.students;
    }

    const studentInfo = student => [
      `${student.grade}th Grade`,
      student.school.name,
      student.program
    ];

    const errorCode = ref(0);
    const errorMessage = '';

    const viewValue = ref(0);

    async function resolveStudentApplication(
      studentId: ObjectId,
      accept: boolean,
      newOffer?: Record<string, boolean | number | string | undefined>
    ) {
      const selectedStudent = state.students.find(student => student._id.equals(studentId));
      const offerDetails = { ...newOffer };
      if (!selectedStudent) return;
      selectedStudent.showMakeOfferDialog = true;
      selectedStudent.isMakingOffer = true;
      selectedStudent.makingOfferFailed = false;
      set(selectedStudent, 'loadingResolveApplication', true);
      // replace presets with custom values if they are entered
      ['InternshipProject', 'Position', 'Compensation'].forEach(field => {
        const fieldName = field[0].toLowerCase() + field.slice(1);
        offerDetails[fieldName] =
          offerDetails[fieldName] === 'custom' ? undefined : offerDetails[fieldName];

        if (offerDetails[`custom${field}`]) {
          offerDetails[fieldName] = offerDetails[`custom${field}`];
          offerDetails[`custom${field}`] = true;
        } else {
          offerDetails[`custom${field}`] = false;
        }
      });

      try {
        const result: {
          statusCode: number;
          error?: string;
        } = await functions.value?.callFunction('resolveStudentApplication', {
          studentId: selectedStudent._id.toHexString(),
          accept,
          offerDetails: accept ? offerDetails : null
        });
        if (result.statusCode === 200) {
          set(selectedStudent, 'applicationStatus', accept ? 'accepted' : 'rejected');
          set(
            selectedStudent,
            'studentStatus',
            accept ? StudentStatus.organizerMadeOffer : StudentStatus.organizerShelvedStudent
          );
          selectedStudent.makingOfferFailed = false;

          selectedStudent.makingOfferFinishedMessage = accept
            ? 'Your offer has been sent!'
            : 'Thank you for your decision.';
        } else {
          selectedStudent.makingOfferFailedReason = result.error ?? '';
          selectedStudent.makingOfferFailed = true;
        }
        selectedStudent.isMakingOffer = false;
        if (selectedStudent.isRejecting) {
          selectedStudent.isRejecting = false;
          selectedStudent.showMakeOfferForm = false;
        }
        errorCode.value = result.statusCode;
        set(selectedStudent, 'loadingResolveApplication', false);
      } catch (error) {
        selectedStudent.showMakeOfferDialog = true;
        selectedStudent.makingOfferFailed = true;
      }
    }

    const handleMonitorButtonClick = ({ page }) => {
      state.currentView = 'monitor';
      state.monitorRoute.page = page;
      state.monitorRoute.monitorOrganizerView = true;
    };

    const handleExitMonitor = () => {
      state.currentView = 'participant';
    };

    const handleActivityNewPage = newPage => {
      state.monitorRoute.page = newPage;
    };

    const IndexStudentValue = ref(0);

    const setIndexValue = IndexValueStudent => {
      IndexStudentValue.value = IndexValueStudent;
    };

    const handleMakeOfferDialogClose = () => {
      if (state.selectedStudent) {
        state.selectedStudent.showMakeOfferForm = false;
        state.selectedStudent.showMakeOfferDialog = false;
      }
    };

    const handleMakeOfferDialogVisibleChange = (visible: boolean) => {
      if (state.selectedStudent) {
        state.selectedStudent.showMakeOfferDialog = visible;
      }
    };

    const currentUser = computed(() => {
      const userInfo: CommentAuthor = {
        _id: user.value?.data?._id,
        firstName: user.value?.data?.firstName,
        lastName: user.value?.data?.lastName,
        profile: user.value?.data?.profile
      };

      return userInfo;
    });

    const operationMode = computed(() => {
      return OperationMode.Monitor;
    });

    const userType = computed(() => {
      let userType: 'organizer' | 'stakeholder' | 'participant' | '' = 'stakeholder';

      if (ctx.root.$route.query && ctx.root.$route.query.program) {
        userType = 'organizer';
      }
      return userType;
    });

    useVideoAsk(user, operationMode, userType);

    return {
      ...toRefs(state),
      loadData,
      studentInfo,
      setIndexValue,
      calculateProgramCompletion,
      resolveStudentApplication,
      viewValue,
      handleMonitorButtonClick,
      handleExitMonitor,
      handleActivityNewPage,
      errorCode,
      errorMessage,
      IndexStudentValue,
      handleMakeOfferDialogClose,
      handleMakeOfferDialogVisibleChange
    };
  }
});
</script>

<style lang="scss">
.completion-text2 {
  font-family: 'Roboto';
  font-size: 15px;
}
.monitor__ {
  &page {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow-y: scroll;
    @media (max-width: 767px) {
      z-index: 999;
    }
  }
}
.guide {
  &__activity-title-button {
    margin: 25px 25px 0px 25px;
  }

  &__student-info {
    margin: 0 25px;
  }

  &__activity-title {
    font-family: Raleway;
    font-size: 32px;
    font-weight: 700;
    margin: 25px;
  }

  &__container {
    width: 100%;
    height: 100vh;
    display: flex;
    // border: 12px solid #000000;
    background-color: transparent;
  }
  &__bar {
    width: fit-content;
    height: fit-content;
    @media (max-width: 767px) {
      width: 100%;
    }
  }
  &__page {
    width: 100%;
    height: fit-content;
    //display: flex;
    position: relative;
  }
  &__locks {
    height: 95vh;
    width: 70px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    &--left {
      left: 0;
      top: 0;
    }
    &--right {
      right: 0;
      top: 0;
    }
  }
  &__lock {
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
  &__table {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    z-index: -1;
    background-color: transparent;
  }
}
</style>
