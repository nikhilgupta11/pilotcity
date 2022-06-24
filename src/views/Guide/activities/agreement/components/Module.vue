<template>
  <v-container class="module">
    <div class="module__navbar">
      <v-btn
        v-if="currentPage != 'preview' && userType === 'organizer'"
        :disabled="readonly"
        class="module__navbar-button font-weight-bold"
        outlined
        small
        rounded
        depressed
        @click="currentPage = 'preview'"
        >Preview</v-btn
      >

      <v-btn
        v-if="currentPage == 'preview' && userType === 'organizer'"
        :disabled="readonly"
        class="module__navbar-button font-weight-bold"
        dark
        small
        rounded
        depressed
        color="red"
        @click="currentPage = 'setup'"
        >Exit Preview</v-btn
      >

      <!-- COMMENT OUT UNTIL VERSION WHERE CUSTOMIZABILITY IS ALLOWED -->

      <!-- <v-menu v-if="currentPage != 'preview'" offset-y left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn :disabled="readonly" v-bind="attrs" small icon class="module__navbar-button" v-on="on">
            <v-icon color="grey lighten-1">mdi-cog</v-icon></v-btn
          >
        </template>
        <v-card class="module__menu">
          <v-btn :disabled="readonly" color="white" class="module__settings-menu" tile depressed>
            <v-icon left color="#404142">mdi-arrow-horizontal-lock </v-icon>Lock</v-btn
          >
          <v-divider></v-divider>
          <v-btn :disabled="readonly" color="white" class="module__settings-menu" tile depressed>
            <v-icon left color="#ea6764">mdi-trash-can-outline </v-icon>Delete</v-btn
          >
          <v-divider></v-divider>
          <v-color-picker
            v-model="selectedColor"
            disabled
            dot-size="25"
            hide-canvas
            hide-inputs
            hide-mode-switch
            show-swatches
            :swatches="pilotcityColors"
            swatches-max-height="100"
          ></v-color-picker>
        </v-card>
      </v-menu> -->
    </div>
    <div v-if="userRole == 'participant'" class="timerchip__container text-right">
      <v-chip class="ma-2 font-weight-bold overline" dark text-color="white">
        {{ durationFormat }}
      </v-chip>
    </div>
    <div class="module__container" :style="{ 'border-color': getColor }">
      <div class="module__title">
        <div class="module__image rounded-circle">
          <v-icon light x-large :color="selectedColor">mdi-fountain-pen-tip</v-icon>
        </div>
        <div class="d-flex align-center justify-center mt-12">
          <h1 class="mt-auto mb-auto">{{ moduleName }}</h1>
        </div>
      </div>
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
      <div class="module__body">
        <v-progress-linear
          v-if="currentPage != 'preview'"
          color="#dedede"
          height="2"
          value="100"
          buffer-value="100"
          stream
        />
        <div v-if="currentPage != 'preview'" class="module__pagination">
          <div v-for="page in subpages" :key="page" :class="{ active: currentPage == page }">
            <div class="module__pagination-button--active" />
            <v-btn
              :disabled="readonly"
              :ripple="false"
              class="module__pagination-button"
              elevation="0"
              color="#ffffff"
              height="40"
              small
              @click="currentPage = page"
            >
              {{ page }}
            </v-btn>
          </div>
        </div>
        <div class="module__page">
          <keep-alive>
            <!-- eslint-disable vue/no-mutating-props -->
            <component
              :is="getComponent"
              v-model="value"
              :user-type="userType"
              :user-doc="userDoc"
              :db="db"
              :mongo-user="mongoUser"
              :student-doc="studentDoc || { data: { adks: [] }, update: () => {} }"
              :docusign-api-domain="docusignApiDomain"
              @calculate-timer="calculateTimer"
              @inputStudentDoc="$emit(userType === 'participant' ? 'inputStudentDoc' : 'n', $event)"
            />
          </keep-alive>
        </div>
      </div>
    </div>
  </v-container>
</template>
<style lang="scss">
.v-timeline-item__divider {
  // align-items: start !important;
}

.module {
  &__container {
    @media (max-width: 1199px) {
      border: 2px solid;
    }
  }
  &__image {
    @media (max-width: 767px) {
      top: calc(-79px / 2) !important;
    }
  }
  .module-edit__container {
    @media (max-width: 767px) {
      max-width: 100%;
      .v-input__slot {
        fieldset {
          min-width: 100%;
        }
      }
    }
  }
  &__trash {
    // justify-content: start;
    align-items: start;
    // align-content: start;
  }

  &__header-chips {
    padding-bottom: 15px;
  }

  .v-btn__content {
    @media (max-width: 767px) {
      font-size: 12px;
    }
  }
}

.v-btn__content.module__chat-menu-button {
  justify-content: left;
  width: 100%;
}
.module__menu {
  .v-color-picker {
    &__controls {
      display: none;
    }
  }
}
</style>
<script lang="ts">
/* eslint-disable no-prototype-builtins */
/* eslint-disable vue/no-mutating-props */
/* eslint-disable no-param-reassign */
import {
  computed,
  reactive,
  ref,
  toRefs,
  defineComponent,
  PropType,
  inject,
  watch
} from '@vue/composition-api';
import * as Realm from 'realm-web';
import Instruct from './ModuleInstruct.vue';
import Monitor from './ModuleMonitor.vue';
import Setup from './ModuleSetup.vue';
import Presets from './ModulePresets.vue';
import Default from './ModuleDefault.vue';
import '../styles/module.scss';

// import { Db } from 'mongodb';
import { MongoDoc } from './types';

// type MongoDBDatabase = globalThis.Realm.Services.MongoDBDatabase;

export default defineComponent({
  name: 'Agreement',

  components: {
    'module-monitor': Monitor,
    'module-setup': Setup,
    'module-presets': Presets,
    'module-preview': Default,
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
    userType: {
      required: true,
      type: String
    },
    mongoUser: {
      required: true,
      type: Object as () => Realm.User
    },
    db: {
      required: true,
      type: Object as PropType<any>
    },
    docusignApiDomain: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const readonly = inject('readonly', false);
    const moduleName = ref('Agreement');
    const page = reactive({
      subpages: ['Setup', 'Presets'],
      currentPage: 'Setup'
    });
    if (props.userType === 'organizer') {
      page.currentPage = 'setup';
    } else {
      page.currentPage = 'preview';
    }
    const getComponent = computed(() => {
      return `module-${page.currentPage.toLowerCase()}`;
    });
    const color = reactive({
      pilotcityColors: [
        ['#6eba80', '#3c9dcd', '#ea6764'],
        ['#eda1bf', '#fec34b', '#bdbdbd'],
        ['#ae90b0', '#f79961', '#000000']
      ],
      // ENTER ACTIVITY COLOR
      selectedColor: '#ea6764'
    });
    const getColor = computed(() => {
      return color.selectedColor.substring(0, 7);
    });
    const config = ref({
      description: '',
      instruct: ['']
    });
    const menu = ref(false);
    // timeline
    const timelineData = reactive({
      events: [] as {
        id: number;
        text: string;
        time: string;
      }[],
      input: '',
      nonce: 0
    });
    const timeline = computed(() => {
      return timelineData.events.slice().reverse();
    });
    function comment() {
      const time = new Date().toTimeString();
      timelineData.events.push({
        id: timelineData.nonce,
        text: timelineData.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (_match, contents) => {
          return ` ${contents
            .split(' ')
            .map((v: string) => v.charAt(0))
            .join('')}`;
        })
      });
      timelineData.input = '';
    }
    const showInstructions = ref(true);

    const userRole = computed(() => {
      return props.userType;
    });
    const durationFormat = ref('');
    const { studentDoc } = toRefs(props);

    const calculateTime = (startTime: any, Time2: any) => {
      let diff = (Time2 - startTime) / 1000;
      diff = Math.abs(Math.floor(diff));

      const days = Math.floor(diff / (24 * 60 * 60));
      let leftSec = diff - days * 24 * 60 * 60;

      const hrs = Math.floor(leftSec / (60 * 60));
      leftSec -= hrs * 60 * 60;

      const min = Math.floor(leftSec / 60);
      leftSec -= min * 60;
      return `${days}d:${hrs}h:${min}m`;
    };

    function calculateTimer() {
      const adkIndex = studentDoc?.value?.data.adks.findIndex(obj => obj.name === 'agreement') ?? 0;
      if (
        userRole.value === 'participant' &&
        studentDoc?.value?.data.adks[adkIndex].hasOwnProperty('activityEndedOn')
      ) {
        const startTime = studentDoc.value.data.adks[adkIndex].activityStartedOn;
        const endTime = studentDoc.value.data.adks[adkIndex].activityEndedOn;

        durationFormat.value = calculateTime(startTime, endTime);
      } else if (
        userRole.value === 'participant' &&
        !studentDoc?.value?.data.adks[adkIndex].hasOwnProperty('activityStartedOn')
      ) {
        const startTime = new Date();
        studentDoc.value.data.adks[adkIndex].activityStartedOn = startTime;
        props?.studentDoc?.update();
        durationFormat.value = calculateTime(startTime, startTime);
        const x = setInterval(() => {
          const currentTime = new Date();
          let diff = (currentTime - startTime) / 1000;
          diff = Math.abs(Math.floor(diff));

          const days = Math.floor(diff / (24 * 60 * 60));
          let leftSec = diff - days * 24 * 60 * 60;

          const hrs = Math.floor(leftSec / (60 * 60));
          leftSec -= hrs * 60 * 60;

          const min = Math.floor(leftSec / 60);
          leftSec -= min * 60;
          durationFormat.value = `${days}d:${hrs}h:${min}m`;
          if (studentDoc?.value?.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
            clearInterval(x);
          }
        }, 60000);
      } else if (
        userRole.value === 'participant' &&
        studentDoc?.value?.data.adks[adkIndex].hasOwnProperty('activityStartedOn')
      ) {
        durationFormat.value = calculateTime(
          new Date(),
          studentDoc.value.data.adks[adkIndex].activityStartedOn
        );
        const x = setInterval(() => {
          const currentTime = new Date();
          let diff = (currentTime - studentDoc.value.data.adks[adkIndex].activityStartedOn) / 1000;
          diff = Math.abs(Math.floor(diff));

          const days = Math.floor(diff / (24 * 60 * 60));
          let leftSec = diff - days * 24 * 60 * 60;

          const hrs = Math.floor(leftSec / (60 * 60));
          leftSec -= hrs * 60 * 60;

          const min = Math.floor(leftSec / 60);
          leftSec -= min * 60;
          durationFormat.value = `${days}d:${hrs}h:${min}m`;
          if (studentDoc?.value?.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
            clearInterval(x);
          }
        }, 60000);
      }
    }

    if (userRole.value === 'participant' && props.studentDoc?.data.adks !== undefined) {
      if (props?.studentDoc?.data.adks.findIndex(obj => obj.name === 'agreement') === -1) {
        props.studentDoc.data.adks.push({ name: 'agreement' });
        props.studentDoc.update().then(() => {
          calculateTimer();
        });
      } else {
        calculateTimer();
      }
    } else if (userRole.value === 'participant') {
      watch(
        () => studentDoc?.value,
        newData => {
          if (
            newData?.data.adks.findIndex(
              (objdata: { name: string }) => objdata.name === 'agreement'
            )
          ) {
            calculateTimer();
          } else {
            props.studentDoc?.data.adks.push({ name: 'agreement' });
            props.studentDoc?.update().then(() => {
              calculateTimer();
            });
          }
        }
      );
    }

    return {
      ...toRefs(color),
      ...toRefs(page),
      config,
      moduleName,
      showInstructions,
      menu,
      getComponent,
      getColor,
      ...toRefs(timelineData),
      timeline,
      comment,
      readonly,
      calculateTimer
    };
  }
});
</script>
