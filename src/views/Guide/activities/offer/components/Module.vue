<template>
  <!--  TODO: make the inputs into actual components -->
  <v-container class="module">
    <div class="module__navbar">
      <!-- <v-btn
        v-if="currentPage == 'preview'"
        dark
        class="module__navbar-button"
        small
        depressed
        color="grey lighten-1"
        rounded
        >00:00:00</v-btn
      > -->
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
    <div class="module__container" :style="{ 'border-color': getColor }">
      <div class="module__title">
        <div class="module__image rounded-circle">
          <v-icon light x-large :color="selectedColor">mdi-offer</v-icon>
        </div>
        <div class="d-flex align-center justify-center mt-12">
          <h1 class="mt-auto mb-auto">{{ moduleName }}</h1>
        </div>
      </div>
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
          <component
            :is="getComponent"
            v-model="programDoc"
            :user-type="userType"
            :student-doc="studentDoc || { data: { adks: [] }, update: () => {} }"
            @calculate-timer="calculateTimer"
            @inputStudentDoc="$emit(userType === 'participant' ? 'inputStudentDoc' : 'n', $event)"
          />
        </div>
      </div>
    </div>
  </v-container>
</template>

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
import '../styles/module.scss';
import Monitor from './ModuleMonitor.vue';
import Setup from './ModuleSetup.vue';
import Presets from './ModulePresets.vue';
import Default from './ModuleDefault.vue';
import Table from './TableView.vue';
import MongoDoc from './types';

export default defineComponent({
  name: 'Offer',

  components: {
    'module-monitor': Monitor,
    'module-setup': Setup,
    'module-presets': Presets,
    'module-preview': Default,
    'table-view': Table
  },

  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    studentDoc: {
      required: true,
      type: Object as PropType<MongoDoc | null>
    },
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    }
  },

  setup(
    props,
    ctx // props
  ) {
    // ENTER ACTIVITY NAME BELOW
    const readonly = inject('readonly', false);
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    const index = programDoc.value.data.adks.findIndex(obj => {
      if (obj) {
        return obj.name === 'offer';
      }
      return false;
    });
    if (index === -1) {
      const initOffer = {
        name: 'offer'
      };
      programDoc.value.data.adks.push(initOffer);
    }
    const moduleName = ref('Offer');
    const page = reactive({
      subpages: ['Setup', 'Presets'],
      currentPage: 'Setup'
    });
    if (props.userType === 'organizer') {
      page.currentPage = 'Setup';
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
      selectedColor: '#ae90b0'
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
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents) => {
          return ` ${contents
            .split(' ')
            .map((v: string) => v.charAt(0))
            .join('')}`;
        })
      });
      timelineData.input = '';
    }

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
      const adkIndex = studentDoc.value?.data.adks.findIndex(obj => obj.name === 'scope') ?? 0;
      if (
        userRole.value === 'participant' &&
        studentDoc.value?.data.adks[adkIndex].hasOwnProperty('activityEndedOn')
      ) {
        const startTime = studentDoc.value.data.adks[adkIndex].activityStartedOn;
        const endTime = studentDoc.value.data.adks[adkIndex].activityEndedOn;

        durationFormat.value = calculateTime(startTime, endTime);
      } else if (
        userRole.value === 'participant' &&
        !studentDoc.value?.data.adks[adkIndex].hasOwnProperty('activityStartedOn')
      ) {
        const startTime = new Date();
        studentDoc.value.data.adks[adkIndex].activityStartedOn = startTime;
        props.studentDoc?.update();
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
          if (studentDoc.value?.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
            clearInterval(x);
          }
        }, 60000);
      } else if (
        userRole.value === 'participant' &&
        studentDoc.value?.data.adks[adkIndex].hasOwnProperty('activityStartedOn')
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
          if (studentDoc.value?.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
            clearInterval(x);
          }
        }, 60000);
      }
    }

    if (userRole.value === 'participant' && props.studentDoc?.data.adks !== undefined) {
      if (props.studentDoc.data.adks.findIndex(obj => obj.name === 'scope') === -1) {
        props.studentDoc.data.adks.push({ name: 'scope' });
        props.studentDoc.update().then(() => {
          calculateTimer();
        });
      } else {
        calculateTimer();
      }
    } else if (userRole.value === 'participant') {
      watch(
        () => studentDoc.value,
        newData => {
          if (
            newData?.data.adks.findIndex((objdata: { name: string }) => objdata.name === 'scope')
          ) {
            calculateTimer();
          } else {
            props.studentDoc?.data.adks.push({ name: 'scope' });
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
      menu,
      getComponent,
      getColor,
      ...toRefs(timelineData),
      durationFormat,
      userRole,
      calculateTimer,
      timeline,
      comment,
      programDoc,
      readonly
    };
  }
});
</script>

<style lang="scss">
html,
body {
  font-family: 'Raleway';
  font-size: 16px;
  width: 100%;
  height: 100%;
}

.v-timeline-item__divider {
  // align-items: start !important;
}

.module {
  &__pagination {
    max-width: 100%;
    justify-content: center;
    margin-bottom: 38px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    & > div.active {
      & .module__pagination-button {
        color: #000;
      }
      & .module__pagination-button--active {
        background-color: #000;
      }
    }
    &-button {
      &.v-btn.theme--light {
        color: #bdbdbd;
        width: 100%;
        font-weight: 900;
      }
      &--active {
        width: 100%;
        height: 6px;
        border-radius: 0px 0px 5px 5px;
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
