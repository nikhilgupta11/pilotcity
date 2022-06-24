<template>
  <div class="guide-bar">
    <div class="guide-bar__expand">
      <div @click="openGuideBar">
        <v-tooltip right color="black">
          <template #activator="{ on, attrs }"
            ><v-icon v-bind="attrs" color="#404142" class="guide-bar__sidebar-icon" v-on="on">{{
              expand ? 'mdi-chevron-double-left' : 'mdi-chevron-double-right'
            }}</v-icon>
          </template>
          <span>Collapse</span>
        </v-tooltip>
      </div>
      <v-divider class="grey lighten-1"></v-divider>
      <div v-if="programToMonitor">
        <v-tooltip right color="black">
          <template #activator="{ on, attrs }"
            ><v-icon
              v-bind="attrs"
              color="#404142"
              class="guide-bar__sidebar-icon"
              v-on="on"
              @click="
                $router.push({ name: 'guide', params: { programId: programToMonitor, page: 0 } })
              "
              >mdi-progress-wrench</v-icon
            >
          </template>
          <span>Setup Program</span>
        </v-tooltip>
      </div>

      <div>
        <v-tooltip right color="black">
          <template #activator="{ on, attrs }"
            ><v-icon
              v-bind="attrs"
              color="blue"
              class="guide-bar__sidebar-icon"
              v-on="on"
              @click="$router.push({ name: 'Monitor' })"
              >mdi-monitor-dashboard</v-icon
            >
          </template>
          <span>Monitor Program</span>
        </v-tooltip>
      </div>

      <v-divider class="grey lighten-1"></v-divider>

      <div>
        <v-tooltip right color="black">
          <template #activator="{ on, attrs }"
            ><v-icon
              v-bind="attrs"
              color="#404142"
              class="guide-bar__sidebar-icon"
              v-on="on"
              @click="$router.push({ name: 'portfolio' })"
              >mdi-fingerprint</v-icon
            >
          </template>
          <span>My Portfolio</span>
        </v-tooltip>
      </div>
    </div>

    <v-expand-x-transition>
      <v-card v-show="expand" class="program-card">
        <div class="guide-bar__container">
          <v-list class="guide-bar__list">
            <div class="guide-bar__monitor-participants-title">
              <div>
                <v-btn class="mt-1 mb-3" x-small rounded disabled depressed
                  >PilotCity Flagship Program</v-btn
                >
              </div>
              <div v-if="programToMonitor">
                <v-icon large color="black">mdi-monitor-dashboard</v-icon>
                {{ programFilter[0].text }}
              </div>
              <div v-else>
                <v-icon large color="black">mdi-monitor-dashboard</v-icon>
                Monitor Programs
              </div>
              <!-- <h5 ></h5> -->
            </div>

            <v-container fluid>
              <v-combobox
                v-if="!programToMonitor"
                v-model="programFilter"
                rounded
                :filter="filter"
                :hide-no-data="!search"
                :items="programFilterItems"
                :search-input.sync="search"
                hide-selected
                label="Filter by Programs"
                multiple
                small-chips
                hide-details
                outlined
                class="guide-bar__combobox mt-4 mb-4"
                @input="handleProgramFilterInput"
              >
                <template #selection="{ attrs, item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    rounded
                    v-bind="attrs"
                    :input-value="selected"
                    color="blue"
                    small
                    dark
                  >
                    <v-icon left small @click="parent.selectItem(item)"> mdi-close </v-icon>
                    <span class="pr-2 font-weight-bold">
                      {{ item.text }}
                    </span>
                  </v-chip>
                </template>

                <template #item="{ index, item }">
                  <v-text-field
                    v-if="editing === item"
                    v-model="editing.text"
                    autofocus
                    flat
                    background-color="transparent"
                    hide-details
                    solo
                    @keyup.enter="edit(index, item)"
                  ></v-text-field>
                  <v-chip
                    v-else
                    class="font-weight-bold"
                    rounded
                    :color="`${item.color}`"
                    dark
                    small
                  >
                    {{ item.text }}
                  </v-chip>
                  <v-spacer></v-spacer>
                </template>
              </v-combobox>

              <v-select
                v-model="activityFilter"
                rounded
                :filter="filter"
                :hide-no-data="!search"
                :items="activities"
                :search-input.sync="search"
                hide-selected
                label="Filter by Completion"
                small-chips
                hide-details
                outlined
                class="guide-bar__combobox mt-4 mb-4"
                @input="val => $emit('update:activityFilter', val)"
              >
                <template #selection="{ attrs, item, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    color="green"
                    :input-value="selected"
                    small
                    rounded
                    dark
                  >
                    <span class="pr-2 font-weight-bold">
                      {{ item.text }}
                    </span>
                  </v-chip>
                </template>

                <template #item="{ index, item }">
                  <v-text-field
                    v-if="editing === item"
                    v-model="editing.text"
                    autofocus
                    flat
                    background-color="transparent"
                    hide-details
                    solo
                    @keyup.enter="edit(index, item)"
                  ></v-text-field>
                  <v-chip v-else class="font-weight-bold" color="green" rounded dark small>
                    {{ item.text }}
                  </v-chip>
                  <v-spacer></v-spacer>
                </template>
              </v-select>
              <div class="d-flex align-center" style="justify-content: center">
                <v-btn
                  v-if="localStoredVal"
                  class="mb-4"
                  depressed
                  rounded
                  outlined
                  small
                  :ripple="false"
                  @click="filterDialog = true"
                  ><v-icon left>mdi-calendar-month</v-icon>
                  <label v-if="studentFilter === 'Custom' && localStoredVal.filterValue.length">
                    Custom - {{ localStoredVal.filterValue.join(' ~ ') }}
                  </label>
                  <label v-else>
                    Filtered by {{ localStoredVal.type }}: {{ localStoredVal.filterValue }}
                  </label>
                </v-btn>
                <v-btn
                  v-else
                  class="mb-4 mr-auto"
                  depressed
                  rounded
                  outlined
                  small
                  :ripple="false"
                  @click="filterDialog = true"
                >
                  <v-icon left>mdi-calendar-month</v-icon>Filter by Time
                </v-btn>
                <v-btn
                  v-if="studentFilter && localStoredVal"
                  class="mb-auto mr-auto ml-2"
                  height="27px"
                  width="27px"
                  fab
                  depressed
                  dark
                  small
                  color="grey lighten-1"
                  @click="removeFilter"
                >
                  <v-icon dark small> mdi-close </v-icon>
                </v-btn>
              </div>

              <v-dialog v-model="filterDialog" persistent width="450">
                <v-card>
                  <v-card-title class="d-flex justify-space-between">
                    <h3>Filter by Time</h3>
                    <v-btn icon @click="filterDialog = false">
                      <v-icon color="grey lighten-1" large>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <div class="d-flex flex-column pa-8">
                    <v-select
                      v-model="studentFilter"
                      :items="filters"
                      label="Select Filter"
                      hide-selected
                      outlined
                      rounded
                      hide-details
                      class="guide-bar__combobox mb-5"
                    ></v-select>

                    <v-select
                      v-if="studentFilter === 'Year'"
                      v-model="selectedYear"
                      :items="yearList"
                      label="Select Year"
                      hide-selected
                      outlined
                      rounded
                      hide-details
                      class="guide-bar__combobox"
                    ></v-select>

                    <v-select
                      v-if="studentFilter === 'Cycle'"
                      v-model="selectedRange"
                      :items="yearRangeList"
                      label="Select Year Cycle"
                      hide-selected
                      outlined
                      rounded
                      class="guide-bar__combobox"
                    ></v-select>

                    <range-picker v-if="studentFilter === 'Custom'" @input="setDateRange" />
                  </div>
                  <v-container class="d-flex justify-center flex-column">
                    <div class="d-flex flex-row justify-center mb-3">
                      <v-btn
                        class="ma-2 white--text"
                        x-large
                        rounded
                        color="red"
                        depressed
                        @click="removeFilter"
                      >
                        Clear
                      </v-btn>
                      <v-btn
                        v-if="studentFilter === 'Custom'"
                        class="ma-2 white--text"
                        x-large
                        :disabled="!isValidDate"
                        :dark="isValidDate"
                        color="green"
                        rounded
                        depressed
                        @click="setFilter"
                      >
                        <v-icon left>mdi-check-all</v-icon>
                        Save Filter
                      </v-btn>
                      <v-btn
                        v-else
                        class="ma-2 white--text"
                        :disabled="!studentFilter"
                        :dark="studentFilter !== ''"
                        x-large
                        color="green"
                        rounded
                        depressed
                        @click="setFilter"
                      >
                        <v-icon left>mdi-check-all</v-icon>
                        Save Filter
                      </v-btn>
                    </div>
                  </v-container>
                </v-card>
              </v-dialog>

              <div class="">
                <template>
                  <div class="">
                    <v-menu offset-y>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          rounded
                          class="mb-1"
                          small
                          outlined
                          depressed
                          v-bind="attrs"
                          v-on="on"
                          ><v-icon left>mdi-sort-variant</v-icon>Sort by
                          {{ sortByStudentData }}</v-btn
                        >
                      </template>
                      <v-list>
                        <v-list-item v-for="(item, index) in sortitems" :key="index" link small>
                          <v-list-item-title
                            @click="
                              sortByStudentData = item.title;
                              dateFilteredStudents();
                            "
                          >
                            {{ item.title }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <div class="mt-3 ml-1">
                      <h5>{{ studentList.length }} of {{ students.length }} participants</h5>
                    </div>
                  </div>
                </template>
              </div>
            </v-container>
            <!-- <v-subheader
              class="guide-bar__monitor-category white--text overline font-weight-black pr-10"
              >Internship
            </v-subheader>
            <br /> -->
            <v-subheader
              class="guide-bar__monitor-category white--text overline font-weight-black pr-10"
              >Project
            </v-subheader>
            <v-list-group
              v-for="student in studentList"
              :key="student.title"
              :value="student._id.equals(value._id)"
              :prepend-icon="student.action"
              no-action
              @click="$emit('input', student)"
            >
              <template #activator>
                <v-list-item class="guide-bar__list-item-title">
                  <v-list-item-avatar size="36" color="grey lighten-2">
                    <v-img :src="student.profile && student.profile.small"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      class="ml-2 guide-bar__list-item-title"
                      v-text="student.name"
                    ></v-list-item-title>
                    <v-chip
                      v-if="sortByStudentData === 'Team'"
                      class="mt-1 mb-1"
                      color="red"
                      rounded
                      dark
                      small
                      >{{ student.teamName }}</v-chip
                    >

                    <!-- PROGRESS BAR -->
                    <v-progress-linear
                      v-else-if="showProgressBar(sortByStudentData, student)"
                      color="green"
                      class="mt-2 white--text"
                      height="15"
                      rounded
                      :value="calculateProgramCompletion(student.adks, student.teamAdks)"
                    >
                      <template #default="{ value }">
                        <strong class="completion-text font-weight-black"
                          >{{ Math.ceil(value) }}%</strong
                        >
                      </template>
                    </v-progress-linear>

                    <!-- Watch Interview -->
                    <v-btn
                      v-if="
                        student.adks.length &&
                        student.adks.filter(a => a.name === 'interview')[0] &&
                        student.adks.filter(a => a.name === 'interview')[0].videoAskResponse
                      "
                      class="mt-1 mb-1 font-weight-bold"
                      color="blue"
                      rounded
                      depressed
                      small
                      dark
                      @click="
                        openInterviewDialog(
                          student.adks.filter(a => a.name.toLowerCase() === 'interview')[0]
                        )
                      "
                    >
                      Watch Interview
                      <v-icon right>mdi-eye</v-icon>
                    </v-btn>

                    <div v-if="sortByStudentData === 'Name' || sortByStudentData === 'Completion'">
                      <!-- OFFER ACCEPTED/DECLINED -->
                      <div
                        v-if="
                          student.studentStatus === StudentStatus.studentAcceptedOffer ||
                          student.studentStatus === StudentStatus.studentDeclinedOffer
                        "
                      >
                        <v-btn
                          class="mt-1 mb-1 font-weight-bold"
                          rounded
                          disabled
                          depressed
                          x-small
                          >{{
                            student.studentStatus === StudentStatus.studentAcceptedOffer
                              ? 'OFFER ACCEPTED'
                              : 'OFFER DECLINED'
                          }}</v-btn
                        >
                      </div>

                      <!-- APPLICATION STATUS -->
                      <v-btn
                        v-else-if="
                          student.studentStatus === StudentStatus.organizerMadeOffer ||
                          student.studentStatus === StudentStatus.organizerShelvedStudent
                        "
                        class="mt-1 mb-1 font-weight-bold"
                        rounded
                        disabled
                        depressed
                        outlined
                        x-small
                        >{{
                          student.studentStatus === StudentStatus.organizerMadeOffer
                            ? 'awaiting acceptance'
                            : 'applicant rejected'
                        }}
                      </v-btn>
                      <div v-else-if="student.studentStatus === StudentStatus.awaitingOffer">
                        <div v-if="student.controllable">
                          <!-- MAKE OFFER -->

                          <v-btn
                            class="mt-1 mb-1 font-weight-bold"
                            color="green"
                            rounded
                            depressed
                            small
                            dark
                            @click="showMakeOfferForm(student._id)"
                            >Make Offer<v-icon right>mdi-offer</v-icon></v-btn
                          >

                          <!-- REJECT APPLICATION -->
                          <v-dialog v-model="student.isRejecting" max-width="500px">
                            <template #activator="{ on, attrs }">
                              <v-btn
                                v-bind="attrs"
                                class="mt-1 mb-1 ml-1 font-weight-bold"
                                rounded
                                color="red"
                                depressed
                                icon
                                v-on="on"
                                @click="showMakeOfferForm(student._id)"
                                ><v-icon>mdi-close-circle-outline</v-icon></v-btn
                              >
                            </template>
                            <v-card>
                              <v-card-title class="d-flex flex-column justify-center">
                                <span class="headline mt-1 mb-1">
                                  Are you sure you want to reject
                                </span>
                                <span class="headline font-weight-bold mt-1 mb-1">
                                  {{ student.name }}?
                                </span>
                              </v-card-title>

                              <v-divider></v-divider>

                              <v-container class="d-flex justify-center">
                                <v-row class="d-flex justify-center mt-3 mb-5">
                                  <v-btn
                                    class="ma-2"
                                    outlined
                                    x-large
                                    rounded
                                    depressed
                                    @click="student.isRejecting = false"
                                    >Cancel</v-btn
                                  >
                                  <v-btn
                                    x-large
                                    depressed
                                    color="red"
                                    rounded
                                    dark
                                    class="ma-2"
                                    :loading="student.loadingResolveApplication"
                                    @click="
                                      $emit('resolveStudentApplication', {
                                        studentId: student._id,
                                        accept: false
                                      })
                                    "
                                  >
                                    Reject
                                  </v-btn>
                                </v-row>
                              </v-container>
                            </v-card>
                          </v-dialog>
                        </div>

                        <!-- INTERVIEW COMPLETED, AWAITING OFFER -->
                        <div v-else>
                          <v-btn
                            class="mt-1 mb-1 font-weight-bold"
                            rounded
                            disabled
                            depressed
                            x-small
                            >Awaiting Offer</v-btn
                          >
                        </div>
                      </div>
                    </div>

                    <!-- AWAITING INTERVIEW -->
                    <v-btn
                      v-if="student.studentStatus === StudentStatus.awaitingInterview"
                      class="mt-1 mb-1 font-weight-bold"
                      rounded
                      disabled
                      outlined
                      depressed
                      x-small
                      >Awaiting Interview</v-btn
                    >

                    <!-- UNLOCKING INTERVIEW -->
                    <v-btn
                      v-if="student.studentStatus === StudentStatus.unlockingInterview"
                      :key="`${student._id}-${unlockInterViewKey}`"
                      class="mt-1 mb-1 font-weight-bold"
                      rounded
                      disabled
                      outlined
                      depressed
                      x-small
                      >Unlocking interview in {{ getTimeToInterview(student) }}</v-btn
                    >
                    <!-- <v-chip
                      v-else-if="sortByStudentData === 'School' || sortByStudentData === 'Grade'"
                      class="mt-1 mb-1 guide-bar__sortable-chip"
                      color="red"
                      rounded
                      dark
                      small
                      >{{
                        (sortByStudentData === 'School' && student.school.name) ||
                        formatStudentGrade(student.grade)
                      }}</v-chip> -->
                  </v-list-item-content>
                </v-list-item>
              </template>

              <div class="guide-bar__sub">
                <v-chip-group v-for="info in studentInfo(student)" :key="info"
                  ><v-chip small disabled label color="black" outlined v-text="info"></v-chip>
                </v-chip-group>
              </div>
            </v-list-group>
            <v-dialog
              v-model="watchInterviewDialog"
              :width="$vuetify.breakpoint.xs ? '100%' : '50vw'"
              content-class="intw-dialog"
            >
              <v-card v-if="ansUrl" style="position: relative; background: transparent">
                <v-btn class="int-cls-btn" icon @click="watchInterviewDialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <iframe
                  :src="ansUrl"
                  allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
                  width="100%"
                  height="600px"
                  style="border: none; border-radius: 0px"
                ></iframe>
              </v-card>
            </v-dialog>
            <div v-if="!studentList.length">
              <v-list-group no-action>
                <template #activator>
                  <v-list-item class="guide-bar__list-item-title">
                    <v-list-item-avatar size="36" color="grey lighten-2">
                      <v-img src="https://picsum.photos/510/300?random"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="ml-2 guide-bar__list-item-title"
                        >No participants yet</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </template>

                <div class="guide-bar__sub">
                  <v-progress-linear color="green" class="mt-2 green--text" height="15" rounded>
                    <template>
                      <strong class="completion-text font-weight-black">0%</strong>
                    </template>
                  </v-progress-linear>
                  <v-chip-group
                    ><v-chip small disabled label color="black" outlined>No data yet</v-chip>
                  </v-chip-group>
                </div>
              </v-list-group>
            </div>
          </v-list>
        </div>
      </v-card>
    </v-expand-x-transition>
  </div>
</template>

<script lang="ts">
import {
  toRefs,
  reactive,
  PropType,
  computed,
  defineComponent,
  onBeforeUnmount,
  ref,
  watchEffect
} from '@vue/composition-api';
import { ObjectId } from 'bson';
import _, { functions } from 'lodash';
import moment from 'moment';
import calculateProgramCompletion from '@/utils/calculateProgramCompletion';
import { ACTIVITIES } from '@/constants/monitor';
import { useDbGetters } from '@/store';
import rangePicker from '@/components/atoms/ADateRangePicker.vue';
import { StudentStatus } from './studentStatus';

export default defineComponent({
  name: 'Bar',
  components: {
    rangePicker
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<Record<string, any>>
    },
    students: {
      required: true,
      type: Array as PropType<Array<Record<string, any>>>
    },
    programs: {
      required: true,
      type: Array as PropType<Array<Record<string, any>>>
    },
    errorCode: {
      required: true,
      type: Number
    }
  },
  setup(props, ctx) {
    const state = reactive({
      activator: null,
      attach: null,
      expand: window.innerWidth >= 760,
      makeOffer: false,
      sortByStudentData: 'Completion',
      colors: ['blue'],
      editing: null,
      activityFilter: '',
      editingIndex: -1,
      sortitems: [
        { title: 'Name' },
        { title: 'School' },
        { title: 'Team' },
        { title: 'Grade' },
        { title: 'Completion' }
      ],
      programFilter: [
        {
          text: 'All Programs',
          color: 'blue'
        }
      ],
      programFilterItems: [
        {
          text: 'All Programs',
          color: 'blue'
        }
      ],
      organizerProgram: null as Record<string, any> | null, // * used only for Organizer view of Monitor
      search: null,
      unlockInterViewKey: 1,
      intervalId: 0
    });
    const { collection } = useDbGetters(['collection']);
    const filters = ['Cycle', 'Year', 'Custom'];
    const yearRangeList = ['2020-2021', '2021-2022', '2022-2023'];
    const studentFilter = ref('');
    const selectedYear = ref('');
    const selectedRange = ref('');
    const dateRange = ref([]);
    const filterDialog = ref(false);
    const monitorType = ref('');
    const studentList = ref([]);
    const localStoredVal = ref('');
    const watchInterviewDialog = ref(false);
    const ansUrl = ref('');

    function openInterviewDialog(val) {
      watchInterviewDialog.value = true;
      ansUrl.value = val.videoAskResponse.contact.share_url;
    }

    watchEffect(() => {
      if (!watchInterviewDialog.value) {
        ansUrl.value = '';
      }
    });

    const yearList = computed(() => {
      const rangeOfYears = (start, end) =>
        Array(end - start + 1)
          .fill(start)
          .map((year, index) => year + index);
      return rangeOfYears(2020, moment().year());
    });

    const isValidDate = computed(() => {
      if (dateRange.value[0] < dateRange.value[1]) {
        return true;
      }
      return false;
    });

    function setDateRange(val) {
      dateRange.value = val;
    }

    const turnOn = ref(1);
    const programToMonitor = computed(() =>
      ctx.root.$route.query ? ctx.root.$route.query.program : null
    );

    // if programId provided in query, must be Organzier view. Set filter to the program
    if (programToMonitor.value) {
      (async () => {
        let program = props.programs.find(obj => obj._id.toString() === programToMonitor.value)!;
        // Edge case (program has no participants): query for this specfic program
        if (!program) {
          program = await collection.value!('Program').findOne({
            _id: new ObjectId(programToMonitor.value as string)
          });
          ctx.emit('input', null);
        }
        state.organizerProgram = program;
        state.programFilter = [
          {
            text: program.programName,
            color: 'blue'
          }
        ];
      })();
    }

    props.programs
      .map(doc => doc.programName)
      .forEach((name: string) => {
        state.programFilterItems.push({ text: name, color: _.sample(state.colors) as string });
      });

    const sortAlphabetically = (a, b, key) => {
      const textA = key === 'school' ? a.school.name?.toUpperCase() : a[key]?.toUpperCase();
      const textB = key === 'school' ? b.school.name?.toUpperCase() : b[key]?.toUpperCase();
      if (textA < textB) return -1;
      if (textA > textB) return 1;
      return 0;
    };

    const filteredStudents = computed(() => {
      const filters = state.programFilter.map(obj => obj.text);
      return props.students.filter(
        student =>
          filters.some(filter => filter === 'All Programs' || filters.includes(student.program)) &&
          (student.adks.length === 0 ||
            student.adks.some(
              adk =>
                state.activityFilter.length === 0 ||
                (adk.name &&
                  adk.name.toLowerCase() === state.activityFilter?.toLowerCase() &&
                  adk.isComplete)
            ))
      );
    });

    const filterbyDateRange = computed(() => {
      const students: any = [];
      for (let j = 0; j < filteredStudents.value.length; j++) {
        const element = filteredStudents.value[j];
        const d = moment(element.created).format('YYYY-MM-DD');
        element.created = d;
        students.push(element);
      }
      return students;
    });

    watchEffect(() => {
      if (studentFilter.value !== 'Custom') {
        dateRange.value = [];
      }
      if (studentFilter.value !== 'Year') {
        selectedYear.value = '';
      }
      if (studentFilter.value !== 'Cycle') {
        selectedRange.value = '';
      }
    });

    function getFilter() {
      localStoredVal.value = ctx.root.$route.query.program
        ? JSON.parse(localStorage.getItem(`setFilter_${ctx.root.$route.query.program}`))
        : JSON.parse(localStorage.getItem(`setFilter_general`));
      if (localStoredVal.value) {
        const preference: any = ctx.root.$route.query.program
          ? JSON.parse(localStorage.getItem(`setFilter_${ctx.root.$route.query.program}`))
          : JSON.parse(localStorage.getItem(`setFilter_general`));

        studentFilter.value = preference.type;

        if (preference.type === 'Cycle') {
          selectedRange.value = preference.filterValue;
        } else if (studentFilter.value === 'Year') {
          selectedYear.value = preference.filterValue;
        } else {
          dateRange.value = preference.filterValue;
        }
      }
    }

    if (ctx.root.$route.query.program) {
      monitorType.value = 'Student';
      getFilter();
    } else {
      monitorType.value = 'General';
      getFilter();
    }

    function dateFilteredStudents() {
      const f = filterbyDateRange.value;

      studentList.value = f;

      if (studentFilter.value === 'Custom' && dateRange.value.length === 2) {
        studentList.value = f.filter(
          d => d.created >= dateRange.value[0] && d.created <= dateRange.value[1]
        );
      }

      if (studentFilter.value === 'Year' && selectedYear.value) {
        studentList.value = f.filter(
          d => d.created.split('-')[0] === JSON.stringify(selectedYear.value)
        );
      }

      if (studentFilter.value === 'Cycle' && selectedRange.value) {
        studentList.value = f.filter(
          d =>
            d.created.split('-')[0] >= selectedRange.value.split('-')[0] &&
            d.created.split('-')[0] <= selectedRange.value.split('-')[1]
        );
      }

      if (state.sortByStudentData === 'Name') {
        studentList.value = studentList.value
          .slice()
          .sort((a, b) => sortAlphabetically(a, b, 'name'));
      }

      if (state.sortByStudentData === 'Team')
        studentList.value = studentList.value
          .slice()
          .sort((a, b) => sortAlphabetically(a, b, 'teamName'));
      if (state.sortByStudentData === 'School')
        studentList.value = studentList.value
          .slice()
          .sort((a, b) => sortAlphabetically(a, b, 'school'));
      if (state.sortByStudentData === 'Grade')
        studentList.value = studentList.value
          .slice()
          .sort((a, b) => parseInt(a.grade, 10) - parseInt(b.grade, 10));
      if (state.sortByStudentData === 'Completion') {
        studentList.value = studentList.value.slice().sort((a, b) => {
          if (a?.studentStatus !== 0 || b?.studentStatus !== 0)
            return b?.studentStatus - a?.studentStatus;

          return (
            calculateProgramCompletion(b?.adks, b?.teamAdks) -
            calculateProgramCompletion(a?.adks, a?.teamAdks)
          );
        });
      }

      getFilter();
    }

    dateFilteredStudents();

    function setFilter() {
      const filter = {
        type: studentFilter.value
      };

      if (studentFilter.value === 'Cycle') {
        filter.filterValue = selectedRange.value;
      } else if (studentFilter.value === 'Year') {
        filter.filterValue = selectedYear.value;
      } else {
        filter.filterValue = dateRange.value;
      }

      if (monitorType.value === 'Student') {
        localStorage.setItem(`setFilter_${ctx.root.$route.query.program}`, JSON.stringify(filter));
      } else {
        localStorage.setItem(`setFilter_general`, JSON.stringify(filter));
      }
      dateFilteredStudents();
      filterDialog.value = false;
    }

    function removeFilter() {
      if (monitorType.value === 'Student') {
        localStorage.removeItem(`setFilter_${ctx.root.$route.query.program}`);
      } else {
        localStorage.removeItem(`setFilter_general`);
      }

      selectedYear.value = '';
      selectedRange.value = '';
      dateRange.value = [];
      studentFilter.value = '';
      filterDialog.value = false;
      dateFilteredStudents();
    }

    const formatStudentGrade = grade => `${grade}th Grade`;

    const studentInfo = student => {
      const info = {
        School: student.school.name,
        Team: student.teamName,
        Grade: formatStudentGrade(student.grade)
      };
      const filtered = Object.keys(info)
        .filter(key => key !== state.sortByStudentData)
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: info[key]
          };
        }, {});
      return [
        ...Object.values(filtered),
        student.program,
        student.lastSaved ? student.lastSaved.toLocaleString() : 'N/A'
      ];
    };

    const handleProgramFilterInput = () => {
      if (
        state.programFilter.length > 1 &&
        state.programFilter[state.programFilter.length - 1].text === 'All Programs'
      )
        state.programFilter = state.programFilter.filter(filter => filter.text === 'All Programs');
      else if (state.programFilter.length > 1)
        state.programFilter = state.programFilter.filter(filter => filter.text !== 'All Programs');
    };

    const edit = (index, item) => {
      if (!state.editing) {
        state.editing = item;
        state.editingIndex = index;
      } else {
        state.editing = null;
        state.editingIndex = -1;
      }
    };

    const filter = (item, queryText, itemText) => {
      if (item.header) return false;

      const hasValue = val => (val != null ? val : '');

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1;
    };

    state.intervalId = window.setInterval(() => {
      state.unlockInterViewKey += 1;
    }, 1000);

    const getTimeToInterview = student => {
      const autoapplyAdk = student.adks.find(adk => adk.name === 'autoapply');

      const now = moment();
      const startTime = moment(autoapplyAdk?.startTime);
      const timeToInterview = moment.duration(startTime.diff(now));

      const format =
        timeToInterview.asSeconds() >= 86400 ? 'w [weeks], d [days]' : 'hh [hrs]:mm [min]';
      const diff = timeToInterview.format(format);
      return `${diff}`;
    };

    onBeforeUnmount(() => {
      window.clearInterval(state.intervalId);
    });

    function showMakeOfferForm(studentId: ObjectId) {
      const selectedStudent = props.students.find(student => student._id.equals(studentId));
      if (selectedStudent) {
        selectedStudent.showMakeOfferForm = true;
        ctx.emit('input-value', selectedStudent);
      }
    }

    const showProgressBar = (sorting, student) => {
      return (
        (sorting === 'Name' || sorting === 'Completion') &&
        student.studentStatus === StudentStatus.notAutoApplied
      );
    };
    return {
      ...toRefs(state),
      filters,
      openInterviewDialog,
      watchInterviewDialog,
      ansUrl,
      studentList,
      filterDialog,
      monitorType,
      localStoredVal,
      isValidDate,
      getFilter,
      removeFilter,
      setFilter,
      filterbyDateRange,
      dateFilteredStudents,
      selectedRange,
      setDateRange,
      selectedYear,
      yearList,
      yearRangeList,
      studentFilter,
      programToMonitor,
      filteredStudents,
      // sortedStudents,
      showMakeOfferForm,
      studentInfo,
      formatStudentGrade,
      calculateProgramCompletion,
      edit,
      filter,
      activities: ACTIVITIES,
      handleProgramFilterInput,
      getTimeToInterview,
      turnOn,
      StudentStatus,
      showProgressBar
    };
  },
  methods: {
    openGuideBar() {
      this.expand = !this.expand;
    }
  }
});
</script>

<style lang="scss">
$stepper-step-step-width: 100px;
$stepper-step-step-height: 50px;

.mdi-offer-large {
  font-size: 50px !important;
  size: 40px;
}

.int-cls-btn {
  position: absolute;
  right: -20px;
  background: #fff;
  top: -20px;
}

.intw-dialog {
  overflow: unset !important;
}

.completion-text {
  font-family: 'Roboto';
  font-size: 12px;
}

.program-card {
  max-width: 25vw;
}

.guide-bar {
  display: flex;
  height: 100vh;
  @media (max-width: 991px) {
    height: 65px !important;
  }
  &__monitor-category {
    background-color: #404142;
    color: white;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    width: fit-content;
    height: 22px;
  }
  &__monitor-participants-title {
    font-family: Raleway;
    font-size: 28px;
    font-weight: 800;
    padding: 12px;
  }

  &__cta1 {
    margin-right: auto;
    margin-top: 15px;
  }

  &__cta2 {
    margin-bottom: 25px;
    margin-right: auto;
    margin-top: 15px;
  }

  &__stepper-content {
    height: 110vh;
  }

  &__timeline-item {
    text-transform: uppercase;
    font-size: 9px;
    color: #939598;
    letter-spacing: 1.5px;
    font-weight: 900;
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  &__timeline-item-setup {
    margin-left: 10px;
    margin-right: 10px;
  }
  .v-card.v-sheet {
    display: block;
    -webkit-transition: display 0.35s ease-out;
    transition: display 0.5s ease-in-out;
    border-radius: 0;
    box-shadow: none !important;
    @media (max-width: 991px) {
      width: 100%;
      max-width: 100%;
      position: fixed;
      top: 59px;
      z-index: 9999;
      background-color: #fff;
      height: calc(100vh - 59px);
    }
  }
  .v-stepper {
    box-shadow: none;
    overflow-x: hidden;
    background-color: transparent !important;

    .v-stepper__step:first-child {
      padding: 0 0 16px 0;
    }
    .v-stepper__step {
      padding: 24px 0 16px 0;
      background-color: transparent !important;
    }
  }

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    @media (max-width: 767px) {
      padding-left: 22px;
      padding-top: 22px;
      padding-bottom: 22px;
      padding-right: 22px;
      display: flex;
      flex-direction: column;
      height: fit-content;
      background-color: transparent;
    }
  }

  &__list-item {
    font-family: Raleway;
    font-size: 12px;
    font-weight: 700;
  }

  &__list-item-title {
    font-family: Raleway;
    font-weight: 700;
    font-size: 14px !important;
    padding: 0px !important;
  }

  &__list {
    width: 25vw;
    overflow-y: auto;
  }
}

.guide-bar {
  &__sub {
    width: 280px;
    padding-left: 67px;
  }
  &__container {
    height: 100vh;
    @media (max-width: 1199px) {
      height: 100% !important;
    }
  }
  &__highlight {
    height: 9px;
    width: 90%;
    border-radius: 0 0 5px 5px;
    background-color: #3c9dcd;
  }
  &__title {
    max-width: 100%;
    padding-right: 5%;
    display: flex;
    font-family: Raleway;
    font-weight: 800;
    margin-top: 12px;
    margin-bottom: 12px;
    font-size: 18px;
    text-align: left !important;
  }
  &__stepper {
    flex: 1 1 auto;
    width: 100%;
    justify-content: center;
    overflow-y: auto;
    background-color: transparent !important;

    &-content {
      width: 100%;
      min-height: webkit-min-content;
      display: flex;
    }
  }

  &__expand {
    height: fit-content;
    height: 100vh;
    padding: 12px;
    flex-direction: column;
    display: flex;
    background: #eeeeee;
    @media (max-width: 991px) {
      height: 60px !important;
      flex-direction: row !important;
      width: 100% !important;
      position: fixed !important;
      justify-content: space-between !important;
      z-index: 999 !important;
      hr {
        display: none;
      }
    }
  }

  &__expand-icon {
    margin-top: 10px;
    cursor: pointer;
  }

  &__sidebar-icon {
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    @media (max-width: 767px) {
      font-size: 35px !important;
      margin: 0 !important;
    }
  }

  &__list {
    @media (max-width: 1199px) {
      width: 100% !important;
    }
  }

  &__actions {
    width: 90%;
    display: flex;
    justify-content: center;
    background-color: #3c9dcd;
    margin: 10px 10px 10px 10px;
    border-radius: 10px;
    padding: 15px 0 15px 0;

    &-list {
      width: 100%;
      max-width: 80%;
      display: flex;
      justify-content: space-around;
      min-width: 200px;
    }
  }
}
</style>
