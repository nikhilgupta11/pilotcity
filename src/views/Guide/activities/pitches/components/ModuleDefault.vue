<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <div>
      <div class="module-default__instructions">
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
      </div>
      <v-progress-linear
        class="mt-3"
        color="#dedede"
        height="2"
        value="100"
        buffer-value="100"
        stream
      />
      <div class="pa-6">
        <div class="mb-10">
          <v-menu open-on-hover offset-y>
            <template #activator="{ on, attrs }">
              <v-btn
                :disabled="readonly"
                v-bind="attrs"
                class="font-weight-bold"
                rounded
                dark
                depressed
                v-on="on"
                ><v-icon left>mdi-form-select</v-icon>
                {{ finalDraftSaved + ' #' + display }}
              </v-btn>
            </template>
            <v-card v-for="draft in totalDrafts" :key="draft" class="module__menu">
              <v-btn
                :disabled="readonly"
                outlined
                small
                class="draft-button mt-2 mb-1"
                width="100%"
                depressed
                rounded
                @click="showDraft(draft)"
              >
                Draft #{{ totalDrafts - draft }}
              </v-btn>
              <!-- <v-divider></v-divider>
              <v-btn :disabled="readonly"
                small
                color="white"
                class="module__chat-menu-button v-btn__content"
                tile
                depressed
              >
                <v-icon left color="#404142">mdi-form-select</v-icon>3rd Draft</v-btn
              >
              <v-divider></v-divider>
              <v-btn :disabled="readonly"
                small
                color="white"
                class="module__chat-menu-button v-btn__content"
                tile
                depressed
              >
                <v-icon left color="#404142">mdi-form-select</v-icon>2nd Draft</v-btn
              >
              <v-divider></v-divider>
              <v-btn :disabled="readonly"
                small
                color="white"
                class="module__chat-menu-button v-btn__content"
                tile
                depressed
              >
                <v-icon left color="#404142">mdi-form-select</v-icon>1st Draft</v-btn
              > -->
            </v-card>
          </v-menu>
        </div>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-textarea
            v-model="onePitch"
            :error-messages="errors"
            :disabled="disabledPastDraft == 1"
            :readonly="userType === 'stakeholder'"
            rounded
            auto-grow
            placeholder="Describe your solution in one sentence"
            prepend-inner-icon="mdi-text-short"
            class="module-default__textarea"
            outlined
            rows="3"
            row-height="30"
            maxlength="144"
            counter="144"
            label="One Sentence Pitch"
          ></v-textarea>
        </validation-provider>

        <br />
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-textarea
            v-model="elevatorPitch"
            :error-messages="errors"
            :disabled="disabledPastDraft == 1"
            :readonly="userType === 'stakeholder'"
            rounded
            placeholder="Write your sixty second elevator pitch"
            prepend-inner-icon="mdi-text-subject"
            class="module-default__textarea"
            outlined
            rows="7"
            row-height="70"
            maxlength="500"
            counter="500"
            label="Elevator Pitch"
          ></v-textarea>
        </validation-provider>
        <br />
        <div class="d-flex" :class="$vuetify.breakpoint.xs ? 'flex-column' : 'flex-row'">
          <div
            class="d-flex"
            :class="$vuetify.breakpoint.xs ? 'justify-center m-auto mb-3' : 'mr-auto justify-start'"
          >
            <v-btn
              class="perform-adk-pitch-draft"
              v-if="disabledPastDraft == 0"
              :disabled="readonly || unmakeFD == 1 || loading"
              :loading="loading"
              rounded
              x-large
              outlined
              depressed
              v-bind:style="{ width: $vuetify.breakpoint.xs ? '100%' : ' ' }"
              @click="draftSave"
              ><v-icon v-if="success == true" :value="success == true" left color="green"
                >mdi-check-bold</v-icon
              >
              <v-icon v-if="errorMsg == true" :value="errorMsg == true" left color="red"
                >mdi-close-thick</v-icon
              >

              Save Draft</v-btn
            >
          </div>
          <div
            class="d-flex"
            :class="$vuetify.breakpoint.xs ? 'justify-center m-auto' : 'ml-auto justify-end'"
          >
            <v-btn
              v-if="unmakeFD == 0 && isValue"
              :disabled="invalid || readonly || loading"
              :loading="loading"
              x-large
              rounded
              color="#3c9dcd"
              class="font-weight-bold white--text perform-adk-pitch-final-draft"
              v-bind:style="{ width: $vuetify.breakpoint.xs ? '100%' : ' ' }"
              depressed
              @click="finalDraft"
            >
              Make Final Draft
            </v-btn>
            <v-btn
              v-if="unmakeFD == 1"
              :disabled="invalid || readonly || loading"
              :loading="loading"
              x-large
              rounded
              color="#ea6764"
              class="font-weight-bold white--text"
              depressed
              @click="unmakeFinalDraft"
              ><v-icon color="white" left>mdi-lead-pencil</v-icon>
              Continue to Edit
            </v-btn>
          </div>

          <!-- <div><v-btn small disabled depressed>Current Version</v-btn></div>
        <div><v-btn small outlined depressed>Version 4</v-btn></div>
        <div><v-btn small outlined depressed>Version 3</v-btn></div>
        <div><v-btn small outlined depressed>Version 2</v-btn></div>
        <div><v-btn small outlined depressed>Version 1</v-btn></div> -->
        </div>
        <!-- ENTER CONTENT HERE -->
        <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
        <!-- <div class="module-default__none">Design your activity here</div> -->
      </div>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
/* eslint-disable no-param-reassign */
/* eslint-disable vue/no-mutating-props */
/* eslint-disable no-prototype-builtins */
import { defineComponent, PropType, ref, computed } from '@vue/composition-api';
import { getModAdk } from 'pcv4lib/src';
// import Swal from 'sweetalert2';
import Instruct from './ModuleInstruct.vue';
import MongoDoc from './types';

export default defineComponent({
  name: 'ModuleDefault',
  components: {
    Instruct
  },
  props: {
    teamDoc: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    readonly: {
      required: false,
      default: false
    },
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    }
  },
  setup(props, ctx) {
    const initPitchDefault = {
      valueDrafts: []
    };
    const { adkData: teamAdkData, adkIndex } = getModAdk(
      props,
      ctx.emit,
      'Pitch',
      initPitchDefault,
      'teamDoc',
      'inputTeamDoc'
    );

    const isValue = computed(() => {
      if (props.teamDoc.data?.adks[adkIndex]?.valueDrafts?.length) {
        return true;
      }
      return false;
    });

    const isValueDraft = computed(() => {
      if (props.teamDoc.data?.adks[adkIndex]?.valueDrafts) {
        return true;
      }
      return false;
    });

    const totalDrafts = computed(() => {
      return (
        props.teamDoc.data?.adks[adkIndex] &&
        props.teamDoc.data?.adks[adkIndex]?.valueDrafts?.length
      );
    });

    const adkData = ref(teamAdkData.value);
    // console.log(adkData.value);
    const IndexVal = ref(totalDrafts.value);
    const display = ref(IndexVal.value);
    const finalDraftSaved = ref('Draft');
    const disabledPastDraft = ref(0);
    const unmakeFD = ref(0);
    const loading = ref(false);
    const success = ref(false);
    const errorMsg = ref(false);
    const finalDraftMsg = ref(false);
    const unmakeFDMsg = ref(false);
    const onePitch = ref('');
    const elevatorPitch = ref('');
    if (adkData.value.valueDrafts.length > 0) {
      onePitch.value = adkData.value.valueDrafts[IndexVal.value - 1].onePitch;
      elevatorPitch.value = adkData.value.valueDrafts[IndexVal.value - 1].elevatorPitch;
      if (adkData.value.valueDrafts[IndexVal.value - 1].finalDraft === true) {
        disabledPastDraft.value = 1;
        unmakeFD.value = 1;
        finalDraftSaved.value = 'Final Draft';
      }
    }
    const saveActivityEndModified = () => {
      if (props.teamDoc.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
        props.teamDoc.data.adks[adkIndex].activityModifiedOn = new Date();
      } else {
        props.teamDoc.data.adks[adkIndex].activityEndedOn = new Date();
      }
    };
    const activityModified = () => {
      if (props.teamDoc.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
        props.teamDoc.data.adks[adkIndex].activityModifiedOn = new Date();
      }
    };
    async function draftSave() {
      const teamIndex = props.teamDoc?.data.adks.findIndex(function findOfferObj(obj) {
        return obj.name === 'Pitch';
      });

      if (teamIndex === -1) {
        const initPractice = {
          name: 'Pitch'
        };
        props.teamDoc.data.adks.push(initPractice);
      }
      if (!isValueDraft.value) {
        props.teamDoc.data.adks[adkIndex].valueDrafts = [];
      }
      loading.value = true;
      success.value = false;
      errorMsg.value = false;
      setTimeout(() => {
        loading.value = false;
        // success.value = true;
      }, 3000);
      const draftNum = adkData.value.valueDrafts.length - 1;
      const draft = ref({
        onePitch: onePitch.value,
        elevatorPitch: elevatorPitch.value,
        finalDraft: false
        // draftIndex: IndexVal.value + 1
        // index: ''
      });
      if (onePitch.value.length !== 0 || elevatorPitch.value.length !== 0) {
        if (adkData.value.valueDrafts.length - 1 < 0) {
          props.teamDoc.data?.adks[adkIndex]?.valueDrafts?.push(draft.value);
          // console.log('draft saved, first draft');
          // console.log(adkData.value.valueDrafts);
          // eslint-disable-next-line no-plusplus
          IndexVal.value++;
          // eslint-disable-next-line no-plusplus
          // display.value++;
          // console.log(display.value);
          // success.value = true;
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Draft saved',
          //   text: 'Nice, keep it up!',
          //   showConfirmButton: false,
          //   timer: 2500,
          //   allowOutsideClick: false
          // });
          activityModified();
          await props.teamDoc.update();
          // loading.value = false;
          success.value = true;
        } else if (
          onePitch.value !== adkData.value.valueDrafts[draftNum].onePitch ||
          elevatorPitch.value !== adkData.value.valueDrafts[draftNum].elevatorPitch
        ) {
          props.teamDoc.data?.adks[adkIndex]?.valueDrafts?.push(draft.value);
          // console.log('draft saved');
          // console.log(adkData.value.valueDrafts);
          // success = true;
          // eslint-disable-next-line no-plusplus
          IndexVal.value++;
          // eslint-disable-next-line no-plusplus
          display.value++;
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Draft saved!',
          //   text: 'nice, keep it up!',
          //   showConfirmButton: false,
          //   timer: 2500,
          //   allowOutsideClick: false
          // });
          activityModified();
          await props.teamDoc.update();
          success.value = true;
        } else if (
          onePitch.value === adkData.value.valueDrafts[draftNum].onePitch ||
          elevatorPitch.value === adkData.value.valueDrafts[draftNum].elevatorPitch
        ) {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: 'Make sure you write something new!',
          //   showConfirmButton: false,
          //   timer: 2500,
          //   allowOutsideClick: false
          // });
          // console.log('duplicate data');
          // success = false;
          errorMsg.value = true;
        }
      } else {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'You forgot to write something in!',
        //   showConfirmButton: false,
        //   timer: 2500,
        //   allowOutsideClick: false
        // });
        errorMsg.value = true;
      }
      // loading.value = false;
    }
    const indexNum = '';
    const finalDraftIndex = ref('');
    async function finalDraft() {
      loading.value = true;
      disabledPastDraft.value = 1;
      setTimeout(() => {
        loading.value = false;
        unmakeFD.value = 1;
        // success.value = true;
      }, 3000);
      const draft = ref({
        onePitch: onePitch.value,
        elevatorPitch: elevatorPitch.value,
        finalDraft: true
        // draftIndex: IndexVal.value + 1
        // index: ''
      });
      // console.log('saved final draft');
      props.teamDoc.data?.adks[adkIndex]?.valueDrafts?.push(draft.value);
      finalDraftSaved.value = 'Final Draft';
      display.value = totalDrafts.value - 1;
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Congratulations!',
      //   text:
      //     'You have marked this draft to be your final draft. If you need to make edits press the unmake final draft button.',
      //   showConfirmButton: false,
      //   timer: 2500,
      //   allowOutsideClick: false
      // });
      saveActivityEndModified();
      await props.teamDoc.update(() => ({
        isComplete: true,
        adkIndex
      }));
      ctx.emit('calculate-timer');
      // await props.teamDoc!.update();
      // props.teamDoc!.update();
      // loading.value = false;
      finalDraftMsg.value = true;
      // console.log(adkData.value.valueDrafts[adkData.value.valueDrafts.length - 1]);
      IndexVal.value = totalDrafts.value - 1;
    }
    function showDraft(draft: number) {
      IndexVal.value = totalDrafts.value - draft;
      display.value = IndexVal.value;
      onePitch.value = props.teamDoc.data.adks[adkIndex].valueDrafts[IndexVal.value].onePitch;
      elevatorPitch.value =
        props.teamDoc.data.adks[adkIndex].valueDrafts[IndexVal.value].elevatorPitch;
      if (totalDrafts.value - draft !== totalDrafts.value - 1) {
        disabledPastDraft.value = 1;
      } else {
        disabledPastDraft.value = 0;
      }
      if (props.teamDoc.data.adks[adkIndex].valueDrafts[IndexVal.value].finalDraft === true) {
        finalDraftSaved.value = 'Final Draft';
        unmakeFD.value = 1;
        disabledPastDraft.value = 1;
      } else {
        finalDraftSaved.value = 'Draft';
      }
      return draft;
    }
    async function unmakeFinalDraft() {
      loading.value = true;
      unmakeFD.value = 0;
      disabledPastDraft.value = 0;
      finalDraftSaved.value = 'Draft';
      setTimeout(() => {
        loading.value = false;
        // success.value = true;
      }, 3000);
      // console.log('unmakeFD');
      // Swal.fire({
      //   icon: 'info',
      //   title: 'Unmade Final Draft',
      //   text:
      //     'Draft is unmade as final draft. You can now make changes to this draft and continue to make new ones. Remember to mark one as final draft when you are done!',
      //   showConfirmButton: false,
      //   timer: 2500,
      //   allowOutsideClick: false
      //   // footer: 'asd'
      // });
      adkData.value.valueDrafts[adkData.value.valueDrafts.length - 1].finalDraft = false;
      // unmakeFD.value = 0;
      // disabledPastDraft.value = 0;
      // finalDraftSaved.value = 'Draft';
      // props.teamDoc.update(() => ({
      //   isComplete: false,
      //   adkIndex
      // }));
      activityModified();
      await props.teamDoc!.update();
      // loading.value = false;
      unmakeFDMsg.value = true;
    }
    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    return {
      onePitch,
      totalDrafts,
      isValue,
      isValueDraft,
      elevatorPitch,
      setupInstructions,
      showInstructions: 'true',
      draftSave,
      IndexVal,
      finalDraft,
      showDraft,
      // draftNum,
      finalDraftSaved,
      indexNum,
      finalDraftIndex,
      display,
      adkData,
      disabledPastDraft,
      unmakeFD,
      unmakeFinalDraft,
      // ...loading(draftSave)
      loading,
      errorMsg,
      finalDraftMsg,
      unmakeFDMsg,
      success
    };
  }
  // setup() {
  //   const onePitch = ref();
  //   const elevatorPitch = ref();
  //   const setupInstructions = ref({
  //     description: '',
  //     instructions: ['', '', '']
  //   });
  //   const showInstructions = ref(true);
  //   return {
  //     setupInstructions,
  //     showInstructions,
  //     elevatorPitch,
  //     onePitch
  //   };
  // }
});
</script>

<style lang="scss">
.draft-button {
  &.v-menu__content {
    box-shadow: none;
  }
}
.module-default {
  &__row {
    flex-direction: row;
    display: flex;
  }
  &__textarea {
    // width: 100%;
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
  &__collapse-divider {
    margin-top: 15px;
    // margin-bottom: 75px;
    margin-right: none;
    margin-left: none;
    padding-right: none;
    padding-left: none;
    width: 100%;
  }
  &__collapse-title {
    color: grey;
    text-align: center;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 2px;
    font-size: 12px;
  }
  &__container {
    // width: 100%;
    // padding: none;
    // margin: none;
    margin-top: 0px;
    padding: 0px;
  }
  &__employer-title {
    font-size: 25px;
    font-weight: 700;
  }
  &__scope {
    font-size: 22px;
    font-weight: 800;
    text-align: center;
    max-width: 95%;
    margin: auto;
  }
  &__youtube {
    height: 400px;
    width: 95%;
    border-radius: 25px;
    // margin: 0px;
    background-color: #dedede;
    // text-align: center;
    // justify-content: center;
    // align-items: center;
    // padding-top: auto;
    // padding-bottom: auto;
  }
  &__about {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }
  &__faq {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }
  &__faq-chat {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 5%;
  }
  &__faq-chat-line {
    margin: 5px;
  }
  &__faq-avatar {
    margin: 5px;
  }
  &__faq-question {
    // text-align: left;
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 800;
    color: #404142;
  }
  &__faq-answer {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: white;
    font-style: italic;
  }
  &__faq-answer-dark {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: #404142;
    font-style: italic;
  }
  &__faq-answer-dark-highlight {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0px;
    color: #404142;
  }
  &__specs-title {
    font-weight: 800;
  }
}
</style>
