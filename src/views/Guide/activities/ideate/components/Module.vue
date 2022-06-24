<template>
  <!--  TODO: make the inputs into actual components -->
  <v-container class="module">
    <div class="module__navbar">
      <v-btn
        v-if="currentPage != 'preview' && userType === 'organizer'"
        :disabled="readOnly"
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
        :disabled="readOnly"
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
          <v-btn :disabled="readOnly" v-bind="attrs" small icon class="module__navbar-button" v-on="on">
            <v-icon color="grey lighten-1">mdi-cog</v-icon></v-btn
          >
        </template>
        <v-card class="module__menu">
          <v-btn :disabled="readOnly" color="white" class="module__settings-menu" tile depressed>
            <v-icon left color="#404142">mdi-arrow-horizontal-lock </v-icon>Lock</v-btn
          >
          <v-divider></v-divider>
          <v-btn :disabled="readOnly" color="white" class="module__settings-menu" tile depressed>
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
    <div :style="{ 'border-color': getColor }" class="module__container">
      <div class="module__title">
        <div class="module__image rounded-circle">
          <v-icon :color="selectedColor" light x-large>mdi-head-flash-outline</v-icon>
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
              :disabled="readOnly"
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
              v-model="programDoc"
              :user-doc="userDoc"
              :user-type="userType"
              :team-doc="teamDoc || { data: { adks: [] } }"
              :readonly="readOnly"
              @calculate-timer="calculateTimer"
            />
          </keep-alive>
        </div>
      </div>
    </div>
    <!-- TIMELINE START -->

    <!-- TIMELINE END -->
  </v-container>
</template>
<style lang="scss">
html,
body {
  font-family: 'Raleway';
  font-size: 16px;
  width: 100%;
  height: 100%;
}

.module {
  &__trash {
    align-items: start;
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
  watch,
  onMounted,
  Ref
} from '@vue/composition-api';
import '../styles/module.scss';
import Setup from './ModuleSetup.vue';
import Presets from './ModulePresets.vue';
import Default from './ModuleDefault.vue';
import MongoDoc from './types';

export default defineComponent({
  name: 'Ideate',

  components: {
    'module-setup': Setup,
    'module-presets': Presets,
    'module-preview': Default
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    userDoc: {
      required: true,
      type: Object as PropType<MongoDoc | null>,
      default: () => {}
    },
    getTeamDoc: {
      required: false,
      type: Function,
      default: () => {}
    },
    teamDoc: {
      required: false,
      type: Object as PropType<MongoDoc | null>,
      default: () => {}
    },
    studentDoc: {
      required: false,
      type: Object as PropType<MongoDoc | null>,
      default: () => {}
    },
    userType: {
      required: true,
      type: String
    },
    readonly: {
      required: false,
      default: false
    }
  },

  setup(props, ctx) {
    const readonlyInjected = inject('readonly', false);
    const readonlyProps = props.readonly;
    const readOnly = readonlyInjected || readonlyProps;
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });
    props.getTeamDoc();
    const index = programDoc.value.data.adks.findIndex(obj => {
      if (obj) {
        return obj.name === 'ideate';
      }
      return false;
    });
    if (index === -1) {
      const initIdeate = {
        name: 'ideate'
      };
      programDoc.value.data.adks.push(initIdeate);
    }

    const moduleName = ref('Ideate');
    const page = reactive({
      subpages: ['Setup', 'Presets'],
      currentPage: 'Setup'
    });
    if (props.userType === 'organizer') {
      page.currentPage = 'Presets';
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
      selectedColor: '#fec34b'
    });
    const getColor = computed(() => {
      return color.selectedColor.substring(0, 7);
    });
    const config = ref({
      description: '',
      instruct: ['']
    });
    const menu = ref(false);

    const testUser = ref({
      id: '5e9f8f8f8f8f8f8f8f8f8f8',
      name: 'Test User',
      avatar: 'http://placekitten.com/1200/1200'
    });
    // timeline
    const timelineData = reactive({
      events: [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tincidunt ultricies. Maecenas bibendum nisl vel mi viverra, nec ultrices orci euismod.',
          time: '1:00',
          author: {
            id: Math.random(),
            name: 'John Doe',
            avatar: 'http://placekitten.com/1200/1200'
          }
        },
        {
          id: 2,
          text: 'Nulla non laoreet sapien. Aenean eu imperdiet dui. Cras tempus, metus at sollicitudin ornare, turpis elit pellentesque risus, nec iaculis dui nunc quis justo. Donec ultrices fermentum nisl et pretium. Fusce tincidunt ullamcorper lacus, sed venenatis ex placerat at',
          time: '1:00',
          author: {
            id: Math.random(),
            name: 'John Doe',
            avatar: 'http://placekitten.com/1200/1200'
          }
        },
        {
          id: 4,
          text: 'Curabitur eu fermentum augue, quis suscipit tellus.',
          time: '1:00',
          author: {
            id: Math.random(),
            name: 'John Doe',
            avatar: 'http://placekitten.com/1200/1200'
          }
        },
        {
          id: 5,
          text: 'Sed vitae risus in augue vulputate pharetra ut at justo. Vivamus scelerisque iaculis dui, volutpat molestie ante venenatis vitae. Sed commodo pellentesque volutpat',
          time: '1:00',
          author: {
            id: Math.random(),
            name: 'John Doe',
            avatar: 'http://placekitten.com/1200/1200'
          }
        },
        {
          id: 6,
          text: 'In pretium erat ut nulla scelerisque, nec laoreet ante cursus. Etiam volutpat eu libero sit amet vestibulum. Etiam sit amet arcu tempor, interdum arcu vitae, iaculis ipsum. Morbi tristique, nibh non sodales lacinia, neque turpis malesuada velit, eu molestie justo elit eu nisi. Nam sagittis ultricies justo, vitae fringilla sem auctor non. Donec velit nisl, dapibus eu iaculis eget, posuere vitae sem. Suspendisse semper, velit eu bibendum efficitur, ipsum mauris gravida neque, non scelerisque tellus est ut mauris. Curabitur ac convallis elit. Etiam ligula odio, interdum in mollis quis, consequat efficitur justo.',
          time: '1:00',
          author: {
            id: Math.random(),
            name: 'John Doe',
            avatar: 'http://placekitten.com/1200/1200'
          }
        }
      ],
      input: '',
      nonce: 0
    });
    const timeline = computed(() => {
      return timelineData.events.slice().reverse();
    });

    const userRole = computed(() => {
      return props.userType;
    });

    const durationFormat = ref('');

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
      const adkIndex = props.teamDoc.data.adks.findIndex(obj => obj.name === 'Ideate');
      if (
        userRole.value === 'participant' &&
        props.teamDoc.data.adks[adkIndex].hasOwnProperty('activityEndedOn')
      ) {
        const startTime = props.teamDoc.data.adks[adkIndex].activityStartedOn;
        const endTime = props.teamDoc.data.adks[adkIndex].activityEndedOn;

        durationFormat.value = calculateTime(startTime, endTime);
      } else if (
        userRole.value === 'participant' &&
        !props.teamDoc.data.adks[adkIndex].hasOwnProperty('activityStartedOn')
      ) {
        const startTime = new Date();
        props.teamDoc.data.adks[adkIndex].activityStartedOn = startTime;
        // props.teamDoc?.update();
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
          if (props.teamDoc.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
            clearInterval(x);
          }
        }, 60000);
      } else if (
        userRole.value === 'participant' &&
        props.teamDoc.data.adks[adkIndex].hasOwnProperty('activityStartedOn')
      ) {
        durationFormat.value = calculateTime(
          new Date(),
          props.teamDoc.data.adks[adkIndex].activityStartedOn
        );
        const x = setInterval(() => {
          const currentTime = new Date();
          let diff = (currentTime - props.teamDoc.data.adks[adkIndex].activityStartedOn) / 1000;
          diff = Math.abs(Math.floor(diff));

          const days = Math.floor(diff / (24 * 60 * 60));
          let leftSec = diff - days * 24 * 60 * 60;

          const hrs = Math.floor(leftSec / (60 * 60));
          leftSec -= hrs * 60 * 60;

          const min = Math.floor(leftSec / 60);
          leftSec -= min * 60;
          durationFormat.value = `${days}d:${hrs}h:${min}m`;
          if (props.teamDoc.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
            clearInterval(x);
          }
        }, 60000);
      }
    }

    if (userRole.value === 'participant' && props.teamDoc.data.adks !== undefined) {
      if (props.teamDoc.data.adks.findIndex(obj => obj.name === 'Ideate') === -1) {
        props.teamDoc.data.adks.push({ name: 'Ideate' });
        // props.teamDoc?.update().then(() => {
        //   calculateTimer();
        // });
      } else {
        // calculateTimer();
      }
    } else if (userRole.value === 'participant') {
      watch(
        () => props.teamDoc,
        newData => {
          if (
            newData.data.adks.findIndex((objdata: { name: string }) => objdata.name === 'Ideate')
          ) {
            // calculateTimer();
          } else {
            props.teamDoc.data.adks.push({ name: 'Ideate' });
            // props.teamDoc?.update().then(() => {
            //   calculateTimer();
            // });
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
      programDoc,
      readOnly
    };
  }
});
</script>
