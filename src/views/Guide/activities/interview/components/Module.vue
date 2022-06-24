<template>
  <!--  TODO: make the inputs into actual components -->
  <v-container class="module">
    <div class="module__navbar">
      <!-- <v-btn :disabled="readonly"
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
      <!-- Test comment1 -->

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
    <div class="module__container" style="position: relative" :style="{ 'border-color': getColor }">
      <v-btn
        v-if="userType === 'participant'"
        class="dialog-auto"
        depressed
        color="gray"
        small
        rounded
        @click="autoapplyDialog = true"
      >
        Edit Summer Plans
        <v-icon light small class="ml-1">mdi-pencil</v-icon>
      </v-btn>
      <m-default-adk-autoapply
        v-if="userType === 'participant' && programDoc"
        :value="programDoc"
        :is-open="autoapplyDialog"
        :student-doc="studentDoc"
        :user-type="userType"
        @toggle="autoapplyDialog = !autoapplyDialog"
      />
      <div class="module__title">
        <div class="module__image rounded-circle">
          <v-icon light x-large :color="selectedColor"
            >mdi-account-supervisor-circle-outline</v-icon
          >
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
          <keep-alive>
            <component
              :is="getComponent"
              :user-type="userType"
              :fetch-program="fetchProgram"
              :student-doc="studentDoc || { data: { adks: [] }, update: () => {} }"
              :program-doc="value"
              :user-doc="userDoc"
              @inputStudentDoc="$emit(userType === 'participant' ? 'inputStudentDoc' : 'n', $event)"
            />
          </keep-alive>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import {
  computed,
  reactive,
  ref,
  toRefs,
  defineComponent,
  inject,
  PropType
} from '@vue/composition-api';
import '../styles/module.scss';
// import { Collection } from 'mongodb';
import { getModMongoDoc } from 'pcv4lib/src';
import MDefaultAdkAutoapply from '@/components/molecules/m-default-adk-autoapply.vue';
import Setup from './ModuleSetup.vue';
import Presets from './ModulePresets.vue';
import Default from './ModuleDefault.vue';
import MongoDoc from './types';
import { Timeline } from '../../autoApply/components/types';

export default defineComponent({
  name: 'Interview',

  components: {
    'module-setup': Setup,
    'module-presets': Presets,
    'module-preview': Default,
    MDefaultAdkAutoapply
  },
  props: {
    value: {
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
    userDoc: {
      required: true
    },
    fetchProgram: {
      required: true
    },
    currentPageTable: {
      type: Number,
      default: 0
    }
  },
  setup(props: any, ctx: any) {
    const readonly = inject('readonly', false);
    const autoapplyDialog = ref(false);
    //
    // props.programCollection.findOne({
    //   _id: props.programId
    // });
    // ENTER ACTIVITY NAME BELOW
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });
    const studentDocument = computed({
      get: () => props.studentDoc,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });
    const index = programDoc.value.data.adks.findIndex(obj => {
      if (obj) {
        return obj.name === 'interview';
      }
      return false;
    });
    if (index === -1) {
      const initInterview = {
        name: 'interview'
      };
      programDoc.value.data.adks.push(initInterview);
    }

    if (props.userType === 'participant') {
      const stdIndex = studentDocument.value?.data?.adks?.findIndex(obj => {
        if (obj) {
          return obj.name === 'interview';
        }
        return false;
      });
      if (stdIndex === -1) {
        autoapplyDialog.value = true;
        const initInterview = {
          name: 'interview'
        };
        studentDocument.value?.data?.adks?.push(initInterview);
        studentDocument.value.update();
      }
    }
    const moduleName = ref('Interview');
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
      selectedColor: '#3c9dcd'
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
    return {
      ...toRefs(color),
      ...toRefs(page),
      config,
      moduleName,
      menu,
      getComponent,
      getColor,
      ...toRefs(timelineData),
      comment,
      programDoc,
      readonly,
      autoapplyDialog,
      studentDocument
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

.dialog-auto {
  position: absolute;
  right: 20px;
  top: 14px;
  z-index: 10;
}
</style>
