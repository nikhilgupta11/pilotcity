<template>
  <div class="guide-bar">
    <v-card class="program-card">
      <v-expand-x-transition>
        <div v-show="expand" class="guide-bar__container">
          <v-list class="guide-bar__list">
            <v-container fluid>
              <v-tooltip right>
                <template #activator="{ on, attrs }">
                  <v-btn
                    x-large
                    depressed
                    icon
                    class="ml-2"
                    v-bind="attrs"
                    @click="$router.push({ name: 'landing' })"
                    v-on="on"
                  >
                    <v-icon color="black" x-large>mdi-home</v-icon>
                  </v-btn>
                </template>
                <span>Home</span>
              </v-tooltip>

              <div class="">
                <v-btn
                  class="font-weight-bold guide-bar__activities"
                  x-small
                  rounded
                  depressed
                  disabled
                  >Build projects to win internships</v-btn
                >
              </div>
              <div class="guide-bar__explore-participants-title mt-5 mb-3">
                Explore <br />Employers
              </div>

              <div
                class="guide-bar__explore-filter-btn pb-2 mb-3"
                :class="$vuetify.breakpoint.xs ? 'pl-0' : 'pl-2'"
              >
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      icon
                      x-large
                      v-on="on"
                      @click="$emit('update:programFilter', 'All')"
                    >
                      <v-icon :color="programFilter === 'All' ? '#6fc284' : 'grey'"
                        >mdi-sign-direction</v-icon
                      >
                    </v-btn>
                  </template>
                  <span>All Employers</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      icon
                      x-large
                      v-on="on"
                      @click="$emit('update:programFilter', 'Bookmarked')"
                    >
                      <v-icon :color="programFilter === 'Bookmarked' ? '#fec34b' : 'grey'"
                        >mdi-bookmark</v-icon
                      >
                    </v-btn>
                  </template>
                  <span>Bookmarked</span>
                </v-tooltip>
              </div>
              <div class="mb-12" :class="$vuetify.breakpoint.xs ? 'pl-0' : 'pl-3 '">
                <v-chip
                  class="guide-bar__activities-chips font-weight-bold"
                  rounded
                  dark
                  color="grey darken-1"
                  depressed
                  >Activities include</v-chip
                >

                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      outlined
                      color="grey darken-1"
                      depressed
                      v-on="on"
                      ><v-icon left small>mdi-rocket-outline</v-icon>Start Program</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold">Qualify, checkout and start program</span>
                </v-tooltip>

                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="#3c9dcd"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-book-open</v-icon>Scope</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold">Review project scope</span>
                </v-tooltip>

                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="#ae90b0"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-discord</v-icon>Community</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold"
                    >Join and engage in our online student community</span
                  >
                </v-tooltip>

                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="#eda1bf"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-account-supervisor-circle</v-icon>Team</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold">Join, create or manage project teams</span>
                </v-tooltip>

                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="#6eba80"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-teach</v-icon>Train</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold">Watch employer-made video content</span>
                </v-tooltip>

                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="#ea6764"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-bookmark-multiple</v-icon>Research</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold">Research employer-provided resources</span>
                </v-tooltip>

                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="#f79961"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-timetable</v-icon>Tinker</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold"
                    >Tinker, practice and log time spent on project</span
                  >
                </v-tooltip>

                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="#fec34b"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-head-flash-outline</v-icon>Ideate</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold"
                    >Brainstorm, answer and iterate on your project idea</span
                  >
                </v-tooltip>
                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="#3c9dcd"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-elevator-passenger</v-icon>Pitch</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold"
                    >Write your one sentence and elevator pitches</span
                  >
                </v-tooltip>
                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="#ea6764"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-comment-text-multiple-outline</v-icon>Forum</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold"
                    >Ask and answer questions with your program peers</span
                  >
                </v-tooltip>

                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="#6eba80"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-feather</v-icon>Make</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold"
                    >Design, prototype and log your project milestones</span
                  >
                </v-tooltip>
                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="#eda1bf"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-telegram</v-icon>Demo</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold"
                    >Demonstrate and present your project by recording a video</span
                  >
                </v-tooltip>

                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="#f79961"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-check-all</v-icon>Auto-Apply</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold"
                    >Review completed activities and auto-apply for internship</span
                  >
                </v-tooltip>
                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="#3c9dcd"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-account-supervisor-circle-outline</v-icon
                      >Interview</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold"
                    >Interview asynchronously with employer</span
                  >
                </v-tooltip>

                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      color="purple"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-offer</v-icon>Offer</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold"
                    >Accept or decline anticipated position offer</span
                  >
                </v-tooltip>

                <v-tooltip right color="black">
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      class="guide-bar__activities-chips font-weight-bold"
                      rounded
                      dark
                      outlined
                      color="grey darken-1"
                      depressed
                      v-on="on"
                      ><v-icon small left>mdi-balloon</v-icon>Program Results</v-chip
                    >
                  </template>
                  <span class="d-flex font-weight-bold">View your end of program results</span>
                </v-tooltip>
              </div>

              <v-combobox
                :value="pathwaysFilter"
                :filter="filter"
                :hide-no-data="!search"
                :items="pathways"
                :search-input.sync="search"
                label="Filter by Pathways"
                multiple
                hide-selected
                prepend-inner-icon="mdi-sign-direction"
                rounded
                small-chips
                hide-details
                outlined
                class="guide-bar__combobox mt-4 mb-4"
                :class="$vuetify.breakpoint.md ? 'mx-4' : ''"
                @input="handlePathwaysFilterInput($event)"
              >
                <template #selection="{ attrs, item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    :color="`${item.color}`"
                    :input-value="selected"
                    :class="'explore-dropdown'"
                    dark
                    :x-large="$vuetify.breakpoint.xs ? true : false"
                  >
                    <v-icon
                      :large="$vuetify.breakpoint.xs ? true : false"
                      left
                      @click="parent.selectItem(item)"
                    >
                      mdi-close
                    </v-icon>
                    <span class="pr-2">{{ item.text }}</span>
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
                    :x-large="$vuetify.breakpoint.xs ? true : false"
                    @keyup.enter="edit(index, item)"
                  ></v-text-field>
                  <v-chip
                    v-else
                    :x-large="$vuetify.breakpoint.xs ? true : false"
                    :class="'explore-dropdown'"
                    :color="`${item.color}`"
                    dark
                    label
                  >
                    <span>{{ item.text }}</span>
                  </v-chip>
                  <v-spacer></v-spacer>
                </template>
              </v-combobox>
              <v-combobox
                rounded
                :filter="filter"
                :hide-no-data="!search"
                :items="residenceOptions"
                :search-input.sync="search"
                hide-selected
                prepend-inner-icon="mdi-map-marker"
                label="Filter by Priority Location"
                small-chips
                hide-details
                outlined
                class="guide-bar__combobox mt-4 mb-4"
                :class="$vuetify.breakpoint.md ? 'mx-4' : ''"
                @input="val => $emit('update:residenceFilter', val)"
              >
                <template #selection="{ item }">
                  <v-chip
                    :x-large="$vuetify.breakpoint.xs ? true : false"
                    :class="'explore-dropdown'"
                    :color="`${item.color}`"
                    dark
                  >
                    <span>{{ item }}</span>
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
                    class="explore-dropdown mb-2"
                    :x-large="$vuetify.breakpoint.xs ? true : false"
                    dark
                    label
                  >
                    <span>{{ item }}</span>
                  </v-chip>
                  <v-spacer></v-spacer>
                </template>
              </v-combobox>
            </v-container>
          </v-list>
        </div>
      </v-expand-x-transition>
    </v-card>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from '@vue/composition-api';
import USlocations from '@/constants/us-residencies';
import { BAR_SEQUENCE, BAR_ITEMS2, BAR_AGES, BAR_PATHWAYS } from '@/constants/explore';

export default defineComponent({
  name: 'Bar',
  props: {
    programFilter: {
      required: true,
      type: String
    },
    pathwaysFilter: {
      required: true,
      type: Array as PropType<Array<Record<string, any>>>
    },
    residenceOptions: {
      required: true,
      type: Array
    }
  },

  setup(props, ctx) {
    function logThis(val: string) {
      console.log(val);
    }
    const vertical = ref(true);
    const expand = ref(true); // open or closed sidebar
    const steps = ref(15); // number of lines
    const activeStep = ref(1); // open line
    const actions = ref([
      {
        icon: 'account-group',
        fn: 'my-portfolio'
      },
      {
        icon: 'message-outline',
        fn: 'my-chat'
      },
      {
        icon: 'square-edit-outline',
        fn: 'my-post'
      },
      {
        icon: 'cog',
        fn: 'my-settings'
      }
    ]);
    const sequence = ref(BAR_SEQUENCE);
    const handlePathwaysFilterInput = val => {
      if (val.length > 1 && val[val.length - 1].text === 'All')
        ctx.emit(
          'update:pathwaysFilter',
          val.filter(filter => filter.text === 'All')
        );
      else if (val.length > 1)
        ctx.emit(
          'update:pathwaysFilter',
          val.filter(filter => filter.text !== 'All')
        );
      else ctx.emit('update:pathwaysFilter', val);
    };
    return {
      handlePathwaysFilterInput,
      steps,
      expand,
      activeStep,
      sequence,
      actions,
      logThis,
      vertical
    };
  },
  data: () => ({
    activator: null,
    attach: null,
    colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    editing: null,
    editingIndex: -1,
    sortitems: [
      { title: 'School' },
      { title: 'Grade' },
      { title: 'Team' },
      { title: 'Completion' }
    ],
    items2: BAR_ITEMS2,

    pathwaysStandard: [
      {
        text: 'All Employers',
        color: 'grey darken-4'
      }
    ],

    citizen: [
      {
        text: 'Student',
        color: 'grey darken-4'
      },
      {
        text: 'Teacher',
        color: 'grey darken-4'
      },
      {
        text: 'Parent',
        color: 'grey darken-4'
      },
      {
        text: 'School',
        color: 'grey darken-4'
      },
      {
        text: 'Employer',
        color: 'grey darken-4'
      },
      {
        text: 'Sponsor',
        color: 'grey darken-4'
      }
    ],
    citizenStandard: {
      text: 'Student',
      color: 'grey darken-4'
    },
    city: USlocations.US_LOCATIONS,
    age: BAR_AGES,

    pathways: BAR_PATHWAYS,

    nonce: 1,
    menu: false,
    model: [],
    x: 0,
    search: null,
    y: 0
  }),
  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.editingIndex = index;
      } else {
        this.editing = null;
        this.editingIndex = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = val => (val != null ? val : '');

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1;
    }
  }
});
</script>

<style lang="scss">
$stepper-step-step-width: 100px;
$stepper-step-step-height: 50px;

.program-card {
  max-width: 25vw;
  color: #dedede !important;
}
.v-application--is-ltr .guide-bar .v-stepper--vertical .v-stepper__content {
  margin: -16px -12px -24px 12px;
}
.theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error)
  .v-stepper__step__step {
  align-items: center;
  border-radius: 50%;
  display: inline-flex;
  font-size: 0.75rem;
  justify-content: center;
  height: 16px;
  min-width: 16px;
  width: 16px;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error)
  .v-stepper__step__step {
  background: #ffffff !important;
  border: 1px solid #dedede;
  margin-left: 5px;
}

.mdi-check::before {
  font-weight: 900;
}

.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none !important;
}

.v-list-item__content {
  display: inline !important;
}

.guide-bar {
  display: flex;
  height: 100vh;

  &__activities-chips {
    margin: 3px;
    @media (max-width: 767px) {
      font-size: 16px !important;
    }
  }

  &__explore-participants-title {
    font-family: Raleway;
    font-size: 36px;
    padding-left: 16px;
    font-weight: 800;
    line-height: 42px;
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
    height: 100%;
    border-radius: 0;
    box-shadow: none !important;
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
    max-height: 100vh;
    background-color: transparent;
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
    width: 24vw;
    overflow-y: auto;
  }
}

.guide-bar {
  &__sub {
    padding-left: 67px;
  }
  &__container {
    height: 100vh;
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
  }

  &__expand-icon {
    margin-top: 10px;
    cursor: pointer;
  }

  &__sidebar-icon {
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
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
.explore-dropdown {
  height: fit-content !important;
  padding: 5px 12px !important;
  span {
    white-space: normal !important;
  }
}

.guide-bar__explore-filter-btn {
  .v-btn__content {
    padding-left: 0 !important;
  }
}
</style>
<style lang="scss" scoped></style>
