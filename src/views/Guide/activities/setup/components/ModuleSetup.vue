/* eslint-disable @typescript-eslint/camelcase */
<template>
  <v-container class="module-edit">
    <validation-observer class="module-edit__container">
      <div>
        <div class="headline d-flex justify-center font-weight-bold mb-6">Get started</div>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-text-field
            v-model="programDoc.data.programName"
            :error-messages="errors"
            rounded
            class="mt-5"
            prepend-icon="mdi-music-accidental-sharp"
            outlined
            hint="Psst... This will be your public display name"
            label="Employer Name"
            placeholder="Enter your organization name"
          ></v-text-field>
        </validation-provider>
        <div class="d-flex justify-end mt-0">
          <!-- <a href="/scope" target="_blank" style="text-decoration: none"> -->
          <v-btn
            color="grey darken-4"
            outlined
            class="font-weight-bold mr-3 mt-0"
            small
            rounded
            depressed
            @click="showScope = true"
          >
            Build a scope
          </v-btn>
          <v-dialog v-model="showScope" persistent fullscreen max-width="100%">
            <v-card>
              <v-card-text>
                <Scope
                  @update:closeScopeDialog="showScope = false"
                  @update:useScope="useScope($event)"
                ></Scope>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- </a> -->
        </div>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-textarea
            v-model="programDoc.data.programDesc"
            :error-messages="errors"
            rounded
            class="mt-5 mb-5"
            outlined
            three-line
            counter="280"
            label="What's your project scope?"
            prepend-icon="mdi-text-subject"
            placeholder="In a tweet or less, what are you asking students to do?"
            hint="This will be displayed when students explore programs"
          ></v-textarea>
        </validation-provider>
        <!-- <v-file-input label="Upload cover photo" outlined></v-file-input> -->
        <!-- <v-file-input
          v-model="files"
          class="mt-5 mb-5"
          color="grey"
          label="Cover Image"
          placeholder="Upload your program cover photo"
          outlined
          :show-size="1000"
        >
          <template v-slot:selection="{ index, text }">
            <v-chip v-if="index < 2" color="grey" dark label small>
              {{ text }}
            </v-chip>

            <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </v-file-input> -->

        <!-- LOCATION / CITY OF RESIDENCE -->

        <validation-provider v-slot="{ errors }" rules="required" slim>
          <v-combobox
            v-model="programDoc.data.rewards"
            :items="rewardOptions"
            :search-input="rewardSearch"
            :error-messages="errors"
            rounded
            prepend-icon="mdi-trophy"
            label="Reward for winning students"
            multiple
            small-chips
            hide-details
            outlined
            class="module-setup__combobox mt-5 mb-5"
          >
            <template #no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Press <kbd>enter</kbd> to add reward
                    <!-- <strong>{{ rewardSearch }}</strong
                    >". -->
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #selection="{ attrs, item, parent, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                label
                small
                :class="'start-adk-career-options'"
                @click="parent.selectItem(item)"
              >
                <span class="pr-2">
                  {{ item }}
                </span>
                <v-icon small> mdi-close </v-icon>
              </v-chip>
            </template>
          </v-combobox>
        </validation-provider>

        <validation-provider v-slot="{ errors }" rules="required" slim>
          <v-combobox
            v-model="programDoc.data.pathways"
            :items="pathwayOptions"
            :search-input="pathwaySearch"
            :error-messages="errors"
            rounded
            prepend-icon="mdi-sign-direction"
            label="What are the career pathways of this project & program?"
            multiple
            small-chips
            hide-details
            outlined
            class="module-setup__combobox mt-5 mb-5"
          >
            <template #no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Press <kbd>enter</kbd> to add reward
                    <!-- <strong>{{ rewardSearch }}</strong
                    >". -->
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #selection="{ attrs, item, parent, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                label
                small
                :class="'start-adk-career-options'"
                @click="parent.selectItem(item)"
              >
                <span class="pr-2">
                  {{ item }}
                </span>
                <v-icon> mdi-close </v-icon>
              </v-chip>
            </template>
          </v-combobox>
        </validation-provider>
        <!--
        <v-file-input
          hide-details
          :rules="employerImage"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
          label="Upload your logo or avatar"
          outlined
          rounded
        ></v-file-input> -->

        <!-- <validation-provider v-slot="{ errors }" slim> -->
        <!-- <v-select
            rounded
            :error-messages="errors"
            :items="pilotcityColors"
            :item-color="programDoc.data.colors"
            prepend-icon="mdi-format-color-fill"
            hide-selected
            :color="programDoc.data.colors"
            label="Chose a color to be displayed?"
            hide-details
            outlined
            class="module-setup__combobox mt-12 mb-12"
          >
          </v-select> -->
        <!-- <v-color-picker
            v-model="programDoc.data.colors"
            disabled
            :item-color="programDoc.data.colors"
            :error-messages="errors"
            :items="pilotcityColors"
            dot-size="25"
            hide-canvas
            hide-inputs
            hide-mode-switch
            show-swatches
            :swatches="pilotcityColors"
            swatches-max-height="100"
          ></v-color-picker> -->

        <!-- THIS IS THE ONE -->
        <!-- <div class="d-flex justify-center">
          <validation-provider v-slot="{ errors }" slim>
            <v-color-picker
              v-model="selectedColor"
              :error-messages="errors"
              hide-canvas
              hide-sliders
              hide-inputs
              hide-mode-switch
              show-swatches
              :items="pilotcityColors"
              :swatches="pilotcityColors"
              swatches-max-height="100"
            ></v-color-picker>
          </validation-provider>
        </div> -->

        <div class="headline d-flex justify-center mt-12 font-weight-bold">Optional</div>

        <!-- <v-img
          class="pl-auto ml-auto module-setup__map-selected mb-5"
          :aspect-ratio="16 / 9"
          width="94%"
          src="https://f.hubspotusercontent00.net/hubfs/2480959/Screen%20Shot%202020-11-25%20at%2010.42.51%20PM.png"
        ></v-img> -->

        <!-- Required Skills -->

        <validation-provider v-slot="{ errors }" slim>
          <v-combobox
            v-model="programDoc.data.requiredSkills"
            :error-messages="errors"
            :items="requiredSkillOptions"
            :search-input="skillSearch"
            rounded
            prepend-icon="mdi-head-snowflake-outline"
            hide-selected
            label="Any pre-existing knowledge, tech or tools required?"
            multiple
            small-chips
            hide-details
            outlined
            class="module-setup__combobox mt-12 mb-12"
          >
            <template #no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> Press <kbd>enter</kbd> to add item </v-list-item-title>

                  <!-- <v-list-item-title>
                    Press <kbd>enter</kbd> to add the skill "<strong>{{ skillSearch }}</strong
                    >".
                  </v-list-item-title> -->
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #selection="{ attrs, item, parent, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                label
                small
                :class="'start-adk-career-options'"
                @click="parent.selectItem(item)"
              >
                <span class="pr-2">
                  {{ item }}
                </span>
                <v-icon small> mdi-close </v-icon>
              </v-chip>
            </template>
          </v-combobox>
        </validation-provider>

        <!-- Technology -->
        <!-- <validation-provider v-slot="{ errors }" rules="required" slim>
          <v-combobox
            v-model="programDoc.data.requiredTech"
            rounded
            :items="requiredTechOptions"
            :search-input="techSearch"
            :error-messages="errors"
            prepend-icon="mdi-monitor-cellphone"
            hide-selected
            label="List any technology or tools required"
            multiple
            small-chips
            hide-details
            solo
            outlined
            class="module-setup__combobox mt-12 mb-12"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Press <kbd>enter</kbd> to add "<strong>{{ techSearch }}</strong
                    >" as required technology.
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attrs, item, parent, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                label
                small
                @click="parent.selectItem(item)"
              >
                <span class="pr-2">
                  {{ item }}
                </span>
                <v-icon small> mdi-close </v-icon>
              </v-chip>
            </template>
          </v-combobox>
        </validation-provider> -->

        <!-- LOCATION / CITY OF RESIDENCE -->
        <div class="startAdkAutoComplete my-id__wrapper">
          <!-- School District -->
          <validation-provider v-slot="{ errors }" style="position: relative" rules="required">
            <a-autocomplete
              v-model="programDoc.data.requiredResidency"
              :error-message="errors"
              is-rounded="true"
              placeholder="Search Residency"
              left-icon="mdi-map-check"
              type="region"
              style="margin-bottom: 25px"
              @val="setRegionValue"
            />
          </validation-provider>
        </div>

        <div class="module-setup__question-title mt-12">
          What's your preferred age range for student participants?
        </div>

        <v-range-slider
          v-model="programDoc.data.ageRange"
          :tick-labels="ages"
          label="Age"
          min="13"
          max="24"
          ticks="always"
          tick-size="1"
          class="age-range-slider mt-10 mb-10"
        >
          <template #thumb-label>
            <v-icon dark> </v-icon>
          </template>
        </v-range-slider>
      </div>
      <div class="module-setup__license-button mt-12">
        <!-- LINK LICENSE PROGRAM TO STRIPE WITH DISCOUNT CODE -->
        <v-btn
          :disabled="readonly"
          :loading="saveLoading"
          rounded
          class="font-weight-bold setup-adk-start"
          x-large
          dark
          depressed
          @click="saveProgram"
          >Save Program</v-btn
        >
        <!-- <v-btn
          :dark="!invalid"
          :disabled="invalid || readonly"
          :loading="licenseLoading"
          class="ml-2"
          x-large
          rounded
          depressed
          @click="licenseFun"
          >Save and Next</v-btn
        > -->
        <v-alert
          v-if="status.length"
          :type="status.includes('Saved') ? 'green' : 'green'"
          dense
          class="mt-3 white--text presets__alert"
          >{{ status }}</v-alert
        >
      </div>
    </validation-observer>
  </v-container>
</template>

<script lang="ts">
import {
  Ref,
  reactive,
  toRefs,
  defineComponent,
  computed,
  ref,
  onMounted,
  PropType,
  watch,
  inject
} from '@vue/composition-api';
import _, { range } from 'lodash';
import AAutocomplete from '@/components/atoms/AAutocomplete.vue';
import Scope from '../../../../Explore/Scope.vue';

// TODO: move this to @pilocity/shared
const enum ProgramActivityStatus {
  NeedSetup = 'need_setup',
  CompleteSetup = 'complete_setup',
  Standard = 'standard'
}

export default defineComponent({
  name: 'ModuleSetup',
  components: {
    Scope,
    AAutocomplete
  },
  props: {
    value: {
      required: true,
      type: Object as () => {
        data: Record<string, any>; // Gives access to Document
        update: () => Promise<any>; // Gives access to update Method
        changeStream: any; // Gives access to mongodb Collection Changestream
      }
    },
    licenseProgram: {
      required: true,
      type: Function as PropType<() => any>
    }
  },
  setup(_props, ctx) {
    const readonly = inject('readonly', false);

    // data binding
    const programDoc = computed({
      get: () => _props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    const loader: Ref<any> = ref(null);

    function setRegionValue(e) {
      if (e.target) {
        programDoc.value.data.requiredResidency = e.target.value;
      } else if (e.formatted_address) {
        programDoc.value.data.requiredResidency = e.formatted_address;
      }
    }

    onMounted(() => {
      loader.value!.process();
    });
    const options = reactive({
      reward: [
        { text: 'Paid Work Experience', color: 'grey darken-2' },
        { text: 'Unpaid Work Experience', color: 'grey darken-2' }
      ],
      pathway: [
        { text: 'Agriculture & Natural Resources', color: 'grey darken-2' },
        { text: 'Arts, Media & Entertainment', color: 'grey darken-2' },
        { text: 'Building & Construction Trades', color: 'grey darken-2' },
        { text: 'Business & Finance', color: 'grey darken-2' },
        { text: 'Education, Childhood Development & Family Services', color: 'grey darken-2' },
        { text: 'Energy, Environment & Utilities', color: 'grey darken-2' },
        { text: 'Engineering & Architecture', color: 'grey darken-2' },
        { text: 'Fashion & Interior Design', color: 'grey darken-2' },
        { text: 'Health Science & Medical Technology', color: 'grey darken-2' },
        { text: 'Hospitality, Tourism & Recreation', color: 'grey darken-2' },
        { text: 'Information & Communication Technologies', color: 'grey darken-2' },
        { text: 'Manufacturing & Product Design', color: 'grey darken-2' },
        { text: 'Marketing, Sales & Service', color: 'grey darken-2' },
        { text: 'Public Services', color: 'grey darken-2' },
        { text: 'Transportation', color: 'grey darken-2' }
      ],

      pilotcityColors: [
        '#6eba80',
        '#3c9dcd',
        '#ea6764',
        '#eda1bf',
        '#fec34b',
        '#bdbdbd',
        '#ae90b0',
        '#f79961',
        '#000000'
      ],
      requiredTechOptions: [],
      requiredSkillOptions: [],
      rewardOptions: ['Paid Work Experience', 'Unpaid Work Experience'],
      rewardPresets: ['Paid Work Experience', 'Unpaid Work Experience'],
      pathwayOptions: [
        'Agriculture & Natural Resources',
        'Arts, Media & Entertainment',
        'Building & Construction Trades',
        'Business & Finance',
        'Education, Childhood Development & Family Services',
        'Energy, Environment & Utilities',
        'Engineering & Architecture',
        'Fashion & Interior Design',
        'Health Science & Medical Technology',
        'Hospitality, Tourism & Recreation',
        'Information & Communication Technologies',
        'Manufacturing & Product Design',
        'Marketing, Sales & Service',
        'Public Services',
        'Transportation'
      ],
      ages: range(13, 25),
      residencySearch: null,
      skillSearch: null,
      techSearch: null,
      rewardSearch: null,
      pathwaySearch: null,
      employerImage: [
        (value: any) => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ]
    });

    const dataProperties = [
      'programName',
      'programDesc',
      'ageRange',
      'requiredResidency',
      'requiredSkills',
      'requiredTech',
      'rewards',
      'pathways',
      'colors'
    ];
    const writeFields = dataProperties.map(prop => {
      if (!programDoc.value.data[prop]) {
        if (prop === 'programName' || prop === 'programDesc' || prop === 'colors')
          return { [prop]: '' };
        if (prop === 'ageRange') return { [prop]: [13, 24] };

        return { [prop]: [] };
      }
      return {};
    });
    programDoc.value = {
      ...programDoc.value,
      data: {
        ...Object.assign({}, ...writeFields),
        ...programDoc.value.data
      }
    };
    // Save Function Handling
    const status = ref('');
    const saveData = reactive({
      saveLoading: false
    });
    async function saveProgram() {
      saveData.saveLoading = true;
      try {
        programDoc.value.data.start_activity_status = ProgramActivityStatus.CompleteSetup;
        await programDoc.value.update();
        status.value = 'Success';
      } catch (err) {
        console.log(err);
        status.value = `${'Uh oh, try again later'}${err}`;
      }
      saveData.saveLoading = false;
    }
    watch(programDoc, () => {
      const storedCurSavedScope = JSON.parse(localStorage.getItem('curSavedScope'));
      if (storedCurSavedScope != null) programDoc.value.data.programDesc = storedCurSavedScope;
    });
    // Checkout Function Handling
    const licenseData = reactive({
      licenseLoading: false
    });
    const color = reactive({
      pilotcityColors: [
        ['#6eba80', '#3c9dcd', '#ea6764'],
        ['#eda1bf', '#fec34b', '#bdbdbd'],
        ['#ae90b0', '#f79961', '#000000']
      ],
      // ENTER ACTIVITY COLOR
      selectedColor: '#dedede'
    });
    const getColor = computed(() => {
      return color.selectedColor.substring(0, 7);
    });
    async function licenseFun() {
      licenseData.licenseLoading = true;
      try {
        await _props.licenseProgram();
        status.value = 'Success, onward...';
      } catch (err) {
        status.value = `Uh of, try again later ${err}`;
      }
      licenseData.licenseLoading = false;
    }
    const showScope = false;

    return {
      ...toRefs(options),
      programDoc,
      ...toRefs(saveData),
      saveProgram,
      ...toRefs(licenseData),
      licenseFun,
      status,
      ...toRefs(color),
      getColor,
      readonly,
      loader,
      setRegionValue,
      showScope
    };
  },
  methods: {
    useScope(text) {
      this.programDoc.data.programDesc = text;
      this.showScope = false;
    }
  }
});
</script>

<style lang="scss">
.module-setup {
  &__question-title {
    font-family: Raleway;
    font-size: 18px;
    font-weight: 700;
    line-height: 30px;
    text-align: center;
    // margin-top: 25px;
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

  &__license-button {
    text-align: center;
    // display: flex;
    // flex-direction: column;
  }

  &__section-title {
    color: #000000;
    font-size: 25px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 40px;
  }

  &__map-selected {
    // width: 95%;
    // height: 275px;
    background-color: #dedede;
    border-radius: 5px;
  }
}

.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none;
}

.my-id__wrapper {
  width: 100%;
  padding: 0 !important;
  .v-input__control {
    .v-select__slot {
      padding: 0 24px;
      padding-left: 12px !important;
    }
    .v-input__slot {
      border-radius: 28px;
    }
  }
  .v-input__append-outer {
    margin-left: 0;
  }

  .loaderGIF {
    @media (max-width: 767px) {
      right: -5px !important;
    }
  }
}

.start-adk-career-options {
  @media (max-width: 991px) {
    flex-wrap: wrap;
    white-space: normal;
    height: fit-content !important;
    padding: 5px 12px;

    .v-icon {
      font-size: 21px !important;
    }
  }
}

.age-range-slider {
  .v-label {
    @media (max-width: 767px) {
      margin-right: 6px !important;
    }
  }
  .v-slider__tick-label {
    @media (max-width: 767px) {
      font-size: 11px;
    }
  }
}
</style>
