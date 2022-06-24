<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <v-container class="module-edit">
      <div class="module-edit__container">
        <!-- NO SETUP NECESSARY / COMMENT OUT IF SETUP IS NECESSARY -->
        <!-- <div class="module-setup
        __none">No setup necessary</div> -->
        <!-- ENTER CONTENT HERE -->
        <!-- <v-divider class="presets__divider"></v-divider> -->
        <div class="headline font-weight-bold text-center mb-10">Enter organization info</div>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-text-field
            v-model="programDoc.data.programName"
            :error-messages="errors"
            prepend-icon="mdi-music-accidental-sharp"
            rounded
            label="Employer Name"
            hint="Enter your organization name"
            outlined
          ></v-text-field>
        </validation-provider>
        <!-- :rules="{
            regex: /(?:http|https):\/\/(?:www.)(?:\w+|\d+)(?:.com)/
          }" -->

        <!-- <validation-provider v-slot="{ errors }" slim rules="required">
          <v-text-field
            v-model="programDoc.data.adks[index].employerWebsite"
            :error-messages="errors"
            label="Employer Website"
            hint="Enter your website address"
            outlined
          ></v-text-field>
        </validation-provider> -->

        <!-- <v-divider class="presets__divider"></v-divider> -->
        <!-- <div class="presets__section-title">Define Scope</div> -->
        <div class="module-setup__buildscope">
          <!-- INSERT V-DIALOG HERE TO OPEN UP PROMPT BUILDER WE BUILT LAST YEAR FOR TEACHERS -->
          <!-- <v-btn depressed outlined x-small>Build Scope Now</v-btn> -->
        </div>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-textarea
            v-model="programDoc.data.programDesc"
            :error-messages="errors"
            rounded
            prepend-icon="mdi-text-subject"
            counter="280"
            outlined
            label="What is the project scope?"
            placeholder="In a tweet or less, define your project scope for students"
          ></v-textarea>
        </validation-provider>

        <validation-provider v-slot="{ errors }" slim>
          <v-select
            v-model="programDoc.data.adks[index].projectReq"
            :items="items"
            :error-messages="errors"
            rounded
            outlined
            flat
            prepend-icon="mdi-telegram"
            chips
            multiple
            label="Project requirements"
          >
            <template #selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
                class="no-whitespace"
              >
                <strong>{{ item }}</strong
                >&nbsp;
                <span></span>
              </v-chip>
            </template>
          </v-select>
        </validation-provider>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-textarea
            v-model="programDoc.data.adks[index].aboutOrg"
            :error-messages="errors"
            rounded
            prepend-icon="mdi-book-open-variant"
            outlined
            hint="Enter a blurb from your website"
            class="mb-3"
            label="About your organization"
            placeholder="In a paragraph or less, describe your organization"
          ></v-textarea>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          :rules="
            ({
              regex: /(?:http|https):\/\/(?:www.)(?:\w+|\d+)(?:.com)/
            },
            { required: true })
          "
          slim
        >
          <v-text-field
            v-model="programDoc.data.adks[index].resourceWeb"
            :error-messages="errors"
            outlined
            label="Website"
            placeholder="https://www.employername.com/"
            prepend-icon="mdi-search-web"
            rounded
          ></v-text-field>
        </validation-provider>

        <v-divider class="presets__divider"></v-divider>

        <div class="headline font-weight-bold text-center mb-10">
          Short answers to key questions
        </div>

        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-text-field
            v-model="programDoc.data.adks[index].interviewProblem"
            :error-messages="errors"
            outlined
            counter="280"
            label="What is the urgency of this problem?"
            placeholder="In a tweet or less, answer the question for student participants."
            prepend-icon="mdi-hexagon-slice-2"
            rounded
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-text-field
            v-model="programDoc.data.adks[index].interviewSolution"
            :error-messages="errors"
            outlined
            counter="280"
            label="Who could be possible users of the solution created?"
            placeholder="In a tweet or less, answer the question for student participants."
            prepend-icon="mdi-hexagon-slice-3"
            rounded
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-text-field
            v-model="programDoc.data.adks[index].interviewOpportunity"
            :error-messages="errors"
            outlined
            counter="280"
            label="What are the opportunities?"
            placeholder="In a tweet or less, answer the question for student participants."
            prepend-icon="mdi-hexagon-slice-4"
            rounded
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-text-field
            v-model="programDoc.data.adks[index].interviewChallenge"
            :error-messages="errors"
            outlined
            counter="280"
            label="What are the known challenges?"
            placeholder="In a tweet or less, answer the question for student participants."
            prepend-icon="mdi-hexagon-slice-5"
            rounded
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-text-field
            v-model="programDoc.data.adks[index].interviewRequest"
            :error-messages="errors"
            outlined
            counter="280"
            label="Why are you requesting projects from students?"
            placeholder="In a tweet or less, answer the question for student participants."
            prepend-icon="mdi-hexagon-slice-6"
            rounded
          ></v-text-field>
        </validation-provider>

        <!-- <validation-provider v-slot="{ errors }" slim rules="required">
          <v-select
            v-model="programDoc.data.adks[index].outcome"
            :error-messages="errors"
            :items="outcomes"
            chips
            label="Preset Outcomes"
            multiple
            outlined
            rounded
            disabled
          ></v-select>
        </validation-provider> -->
        <div class="module-setup__buildscope">
          <!-- INSERT V-DIALOG HERE TO OPEN UP PROMPT BUILDER WE BUILT LAST YEAR FOR TEACHERS -->
          <!-- <v-btn depressed outlined disabled x-small>Connected with activities</v-btn> -->
        </div>
        <!-- <validation-provider v-slot="{ errors }" slim rules="required">
          <v-select
            v-model="programDoc.data.adks[index].deliverable"
            :items="deliverables"
            :error-messages="errors"
            chips
            disabled
            label="Preset Deliverables"
            multiple
            outlined
            rounded
          ></v-select>
        </validation-provider> -->

        <v-divider class="presets__divider"></v-divider>
        <div class="headline font-weight-bold text-center mb-10">Share social media links</div>

        <div
          class="d-flex flex-row pa-0 justify-center"
          :class="$vuetify.breakpoint.xs ? 'flex-wrap' : ''"
        >
          <div
            class="d-flex media-link-wrapper"
            :class="$vuetify.breakpoint.xs ? 'flex-wrap' : 'flex-column'"
          >
            <div>
              <validation-provider
                v-slot="{ errors }"
                :rules="{
                  regex:
                    /^(?:(?:http|https):\/\/)?(?:www.)?instagram.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/
                }"
                slim
              >
                <v-text-field
                  v-model="programDoc.data.adks[index].resourceInsta"
                  :error-messages="errors"
                  outlined
                  class="ma-2"
                  label="Instagram URL"
                  placeholder="https://www.instagram.com/username"
                  append-icon="mdi-instagram"
                  rounded
                ></v-text-field>
              </validation-provider>
            </div>
            <div>
              <validation-provider
                v-slot="{ errors }"
                :rules="{
                  regex:
                    /(?:http|https):\/\/(?:www.)?linkedin.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/
                }"
                slim
              >
                <v-text-field
                  v-model="programDoc.data.adks[index].resourceLinkedIn"
                  :error-messages="errors"
                  outlined
                  class="ma-2"
                  label="LinkedIn URL"
                  placeholder="https://www.linkedin.com/username"
                  append-icon="mdi-linkedin"
                  rounded
                ></v-text-field>
              </validation-provider>
            </div>
            <div>
              <validation-provider
                v-slot="{ errors }"
                :rules="{
                  regex:
                    /^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/
                }"
                slim
              >
                <v-text-field
                  v-model="programDoc.data.adks[index].resourceFacebook"
                  :error-messages="errors"
                  outlined
                  class="ma-2"
                  label="Facebook URL"
                  placeholder="https://www.facebook.com/username"
                  append-icon="mdi-facebook"
                  rounded
                ></v-text-field>
              </validation-provider>
            </div>
          </div>

          <div
            class="d-flex media-link-wrapper"
            :class="$vuetify.breakpoint.xs ? 'flex-wrap' : 'flex-column'"
          >
            <div>
              <validation-provider
                v-slot="{ errors }"
                :rules="{
                  regex:
                    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
                }"
                slim
              >
                <v-text-field
                  v-model="programDoc.data.adks[index].resourceYouTube"
                  :error-messages="errors"
                  outlined
                  class="ma-2"
                  label="YouTube URL"
                  placeholder="https://www.youtube.com/username"
                  append-icon="mdi-youtube"
                  rounded
                ></v-text-field>
              </validation-provider>
            </div>

            <div>
              <validation-provider
                v-slot="{ errors }"
                :rules="{
                  regex:
                    /(?:http|https):\/\/(?:www.)?twitter.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/
                }"
                slim
              >
                <v-text-field
                  v-model="programDoc.data.adks[index].resourceTwitter"
                  :error-messages="errors"
                  outlined
                  class="ma-2"
                  label="Twitter URL"
                  placeholder="https://twitter.com/username"
                  append-icon="mdi-twitter"
                  rounded
                ></v-text-field>
              </validation-provider>
            </div>

            <div>
              <validation-provider
                v-slot="{ errors }"
                :rules="{
                  regex: /^((?:https?:)?\/\/)?((?:www)\.)?((?:(.*)\.com))(.*)/
                }"
                slim
              >
                <v-text-field
                  v-model="programDoc.data.adks[index].resourceDrive"
                  :error-messages="errors"
                  outlined
                  class="ma-2"
                  label="Get Started Folder"
                  placeholder="https://drive.google.com/foldername"
                  append-icon="mdi-folder-google-drive"
                  rounded
                ></v-text-field>
              </validation-provider>
            </div>
          </div>
        </div>

        <div class="module-default__scope mt-12">
          <v-btn
            class="setup-adk-scope"
            :disabled="invalid || readonly"
            :loading="loading"
            x-large
            rounded
            depressed
            outlined
            @click="process()"
            >Save</v-btn
          >
        </div>
        <v-alert
          v-if="success || error"
          :color="success ? 'green' : 'red'"
          dense
          class="mt-3 white--text presets__alert"
          >{{ message }}</v-alert
        >
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
/* eslint-disable no-unused-expressions */
import {
  reactive,
  toRefs,
  PropType,
  computed,
  defineComponent,
  inject
} from '@vue/composition-api';
import { loading } from 'pcv4lib/src';
import { ValidationObserver, ValidationProvider } from '@/validation';
import { deliverablesValue, chips, items } from './const';
import MongoDoc from './types';

// TODO: move this to @pilocity/shared
const enum ProgramActivityStatus {
  NeedSetup = 'need_setup',
  CompleteSetup = 'complete_setup',
  Standard = 'standard'
}

export default defineComponent({
  name: 'ModuleSetup',

  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
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

    const index = programDoc.value.data.adks.findIndex(obj => {
      if (obj) {
        return obj.name === 'scope';
      }
      return false;
    });

    const initScopeSetup = {
      employerWebsite: '',
      projectScope: '',
      introVideo: '',
      aboutOrg: '',
      outcome: ['Build portfolio project', 'Qualify to win work experiences to execute on project'],
      deliverable: ['Ideate', 'Pitch', 'Make', 'Demonstration'],
      projectReq: '',
      resourceWeb: '',
      resourceInsta: '',
      resourceLinkedIn: '',
      resourceFacebook: '',
      resourceYouTube: '',
      resourceTwitter: '',
      resourceDrive: '',
      interviewProblem: '',
      interviewSolution: '',
      interviewOpportunity: '',
      interviewChallenge: '',
      interviewReqeust: '',
      required: false
    };

    programDoc.value.data.adks[index] = {
      ...initScopeSetup,
      ...programDoc.value.data.adks[index]
    };

    // const status = ref('');
    const setup = reactive({
      outcomes: [
        'Build portfolio project',
        'Qualify to win work experiences to execute on project'
      ],
      // outcomesValue,
      deliverables: ['Ideate', 'Pitch', 'Make', 'Demo'],
      deliverablesValue,
      chips,
      items
    });

    return {
      ...toRefs(setup),
      // status,
      index,
      programDoc,
      readonly,
      ...loading(
        () =>
          programDoc.value.update(() => ({
            isComplete: true,
            adkIndex: index,
            status: ProgramActivityStatus.CompleteSetup
          })),
        'Success',
        'Try again later'
      )
    };
  }
});
</script>

<style lang="scss">
.module-setup {
  &__buildscope {
    text-align: right;
    margin-bottom: 10px;
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
}

.v-chip {
  &.no-whitespace {
    height: fit-content;
    padding: 3px 12px;
    span {
      white-space: normal;
    }
  }
}
.media-link-wrapper {
  > div {
    width: 100%;
  }
}
</style>
