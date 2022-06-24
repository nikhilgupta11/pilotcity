<template>
  <v-container class="module-default pa-0">
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
    <div>
      <div class="module-default__overall-statement">
        <div class="module-default__secondary-statement">
          <span class="module-default__main-statement">Congrats!</span>
          You’ve won a position with your employer. Please review and agree to the following terms.
          Accept or decline thereafter.
        </div>
      </div>

      <div class="module-edit__container-table">
        <Table
          v-if="studentDoc && studentDoc.data && studentDoc.data.offerDetails"
          ref="table"
          :value="value"
          :student-doc="studentDoc"
          :user-type="userType"
          class="module-default__table-view"
          @validation-event="invalid = $event"
        ></Table>
      </div>

      <div class="module-default__row__buttons">
        <div v-if="!adkData.completed">
          <v-dialog v-model="dialog.decline" persistent max-width="500px">
            <template #activator="{ on, attrs }">
              <v-btn
                :disabled="userType === 'stakeholder' || readonly"
                v-bind="attrs"
                x-large
                color="grey"
                rounded
                depressed
                :ripple="false"
                outlined
                class="ml-3 mr-3"
                v-on="on"
                >Decline</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="d-flex flex-column">
                <div class="overline font-weight-bold">
                  Are you sure you want to decline the offer?
                </div>
              </v-card-title>

              <v-divider></v-divider>

              <v-container class="justify-center">
                <v-row class="justify-center mt-3 mb-5">
                  <v-btn
                    :disabled="readonly"
                    class="ma-2"
                    outlined
                    x-large
                    rounded
                    depressed
                    @click="dialog.decline = false"
                    >Cancel</v-btn
                  >

                  <v-btn
                    :disabled="readonly"
                    class="ma-2 perform-adk-offer-decline"
                    x-large
                    dark
                    color="red"
                    rounded
                    :loading="decline.loading.value"
                    depressed
                    @click="decline.process()"
                    >Decline Offer</v-btn
                  >
                </v-row>
                <v-alert
                  v-if="decline.error.value"
                  color="red"
                  dense
                  class="mt-3 mb-3 white--text presets__alert"
                  >There was an error, try again in a bit.</v-alert
                >
              </v-container>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog.accept" persistent max-width="500px">
            <template #activator="{ on, attrs }">
              <v-btn
                color="#ae90b0"
                class="module-default__row__buttons-accept white--text"
                x-large
                rounded
                depressed
                :disabled="userType === 'stakeholder' || invalid || readonly"
                :loading="accept.loading.value"
                v-bind="attrs"
                v-on="on"
                >Accept</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="d-flex flex-column">
                <div class="overline font-weight-bold">Ready to accept your offer?</div>
              </v-card-title>

              <v-divider></v-divider>

              <v-container class="justify-center">
                <v-row class="justify-center mt-3 mb-5">
                  <v-btn
                    :disabled="readonly"
                    class="ma-2"
                    outlined
                    x-large
                    rounded
                    depressed
                    @click="dialog.accept = false"
                    >Cancel</v-btn
                  >

                  <v-btn
                    :disabled="readonly"
                    class="ma-2 perform-adk-offer-accept"
                    x-large
                    dark
                    color="green"
                    rounded
                    :loading="accept.loading.value"
                    depressed
                    @click="accept.process()"
                    >Accept Offer</v-btn
                  >
                </v-row>
                <v-alert
                  v-if="accept.error.value"
                  color="red"
                  dense
                  class="mt-3 white--text presets__alert"
                  >There was an error, try again in a bit.</v-alert
                >
              </v-container>
            </v-card>
          </v-dialog>
        </div>
        <template v-else>
          <div v-show="adkData.offerStatus">
            <div class="module-default__statement3 headline font-weight-bold mt-12 justify-center">
              Congratulations on accepting your offer! <br />
            </div>
            <div
              class="
                module-default__statement4
                headline
                font-weight-medium
                justify-center
                mt-5
                ml-12
                mr-12
              "
              :class="$vuetify.breakpoint.xs ? 'ml-6 mr-6' : ''"
            >
              Our internship program will be rolling out on our platform that includes weeking
              meetings with employers, digital coworking with other interns, clock-in features and
              piloting your project. Stay tuned.
            </div>
          </div>
          <div v-show="!adkData.offerStatus">
            <div class="module-default__statement3 headline font-weight-bold mt-12 justify-center">
              We hope you enjoyed the program, and wish for you to participate again! <br />
            </div>
            <div
              class="
                module-default__statement4
                headline
                font-weight-medium
                justify-center
                mt-5
                ml-12
                mr-12
              "
            >
              Thank you and look out for your program results on My Portfolio later in 2021
            </div>
          </div>
        </template>
        <!-- ENTER CONTENT HERE -->
        <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
        <!-- <div class="module-default__none">Design your activity here</div> -->
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable no-prototype-builtins */
/* eslint-disable vue/no-mutating-props */
/* eslint-disable no-param-reassign */
import { defineComponent, ref, PropType, reactive, inject } from '@vue/composition-api';
import { getModAdk, loading } from 'pcv4lib/src';
import Instruct from './ModuleInstruct.vue';
import Table from './TableView.vue';
import MongoDoc from './types';

export default defineComponent({
  name: 'ModuleDefault',

  components: {
    Instruct,
    Table
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    studentDoc: {
      required: true,
      type: Object as PropType<MongoDoc>
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
    const readonly = inject('readonly', false);
    const { adkData, adkIndex } = getModAdk(
      props,
      ctx.emit,
      'offer',
      {},
      'studentDoc',
      'inputStudentDoc'
    );
    const dialog = reactive({
      accept: false,
      decline: false
    });
    const invalid = ref(true);
    async function acceptOffer() {
      try {
        adkData.value.offerStatus = true;
        if (props.studentDoc.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
          props.studentDoc.data.adks[adkIndex].activityModifiedOn = new Date();
        } else {
          props.studentDoc.data.adks[adkIndex].activityEndedOn = new Date();
        }
        await props.studentDoc.update(() => ({
          isComplete: true,
          adkIndex
        }));
        ctx.emit('calculate-timer');
      } catch (err) {
        adkData.value.offerStatus = undefined;
        throw err;
      }
    }

    async function declineOffer() {
      try {
        adkData.value.offerStatus = false;
        if (props.studentDoc.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
          props.studentDoc.data.adks[adkIndex].activityModifiedOn = new Date();
        } else {
          props.studentDoc.data.adks[adkIndex].activityEndedOn = new Date();
        }
        await props.studentDoc.update(() => ({
          isComplete: true,
          adkIndex
        }));
        ctx.emit('calculate-timer');
      } catch (err) {
        adkData.value.offerStatus = undefined;
        throw err;
      }
    }

    const showInstructions = ref(true);
    return {
      showInstructions,
      adkData,
      adkIndex,
      accept: loading(acceptOffer, 'Success', 'Try again later'),
      decline: loading(declineOffer, 'Success', 'Try again later'),
      dialog,
      invalid,
      readonly
    };
  }
});
</script>

<style lang="scss">
.module-default {
  &__statement3 {
    text-align: center;
    color: #ae90b0;
  }
  &__statement4 {
    text-align: center;
    color: #d3d3d3;
  }
  &__row__buttons {
    // justify-content: center;
    text-align: center;
    &-accept {
      margin: 20px;
    }
    &-reject {
      margin: 20px;
    }
  }
  &__table-view {
    width: 100%;
    // padding-left: 10px;
    // padding-right: 10px;
    margin-bottom: 20px;
  }
  &__agreement {
    font-family: Raleway;
    font-size: 15px;
    font-weight: 700;
    margin-top: auto;
    margin-bottom: auto;
  }
  &__row {
    flex-direction: row;
    display: flex;
    width: 75%;
  }

  &__overall-statement {
    text-align: center;
    max-width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
  }

  &__countdown {
    font-family: Raleway;
    font-size: 40px;
    font-weight: 900;
    text-align: center;
    // margin: 20px;
    margin-bottom: 5%;
  }

  &__main-statement {
    font-family: Raleway;
    font-size: 20px;
    font-weight: 900;
    text-align: center;
    // margin: 20px;
    color: #ae90b0;
  }
  &__secondary-statement {
    font-family: Raleway;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    // margin-left: auto;
    // margin-right: auto;
    // max-width: 75%;
    margin-bottom: 10%;
  }

  &__second-statement {
    font-family: Raleway;
    font-size: 18px;
    font-weight: 800;
    text-align: center;
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
    // margin-bottom: none !important;
    margin-right: none;
    margin-left: none;
    padding-right: none;
    padding-left: none;
    // width: 100%;
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
