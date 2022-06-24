<template>
  <ValidationObserver v-slot="{}" slim>
    <v-container class="module-edit">
      <div class="module-edit__container">
        <!-- <v-divider class="presets__divider"></v-divider> -->
        <!-- <div class="module-setup__question-title">Ask question here for setup</div>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-text-field
            v-model="example"
            :error-messages="errors"
            label="Example"
            outlined
          ></v-text-field>
        </validation-provider> -->
        <!-- BREAK -->
        <div class="module-setup__question-title mb-3">
          What will be their internship project? Select at least one.
        </div>
        <validation-provider>
          <v-checkbox
            v-model="programDoc.data.adks[index].offer[0].internshipProject1"
            dense
            label="Continue development of pre-internship project and/or additionally assigned tasks"
          ></v-checkbox>
        </validation-provider>
        <validation-provider>
          <v-checkbox
            v-model="programDoc.data.adks[index].offer[0].internshipProject2"
            dense
            label="Continue development of pre-internship project only"
          ></v-checkbox>
        </validation-provider>
        <validation-provider>
          <v-checkbox
            v-model="programDoc.data.adks[index].offer[0].internshipProject3"
            dense
            label="Completion of pre-internship project into production"
          ></v-checkbox>
        </validation-provider>

        <!-- BREAK -->
        <v-divider class="mt-6"></v-divider>
        <div class="module-setup__question-title">
          Is a driver's license, car or transport to workplace required?
        </div>

        <validation-provider>
          <v-radio-group v-model="programDoc.data.adks[index].offer[0].licenseRequirement">
            <v-radio label="No (Recommended for digital internship)"></v-radio>
            <v-radio label="Yes"></v-radio>
          </v-radio-group>
        </validation-provider>

        <!-- BREAK -->
        <v-divider class="mt-6"></v-divider>
        <div class="module-setup__question-title mb-3">What position titles can you offer?</div>
        <v-checkbox
          v-model="programDoc.data.adks[index].offer[0].intern"
          dense
          label="Intern"
        ></v-checkbox>
        <v-checkbox
          v-model="programDoc.data.adks[index].offer[0].fellow"
          dense
          label="Fellow"
        ></v-checkbox>

        <v-checkbox
          v-model="programDoc.data.adks[index].offer[0].eir"
          dense
          label="Entrepreneur-in-Residence"
        ></v-checkbox>

        <v-checkbox
          v-model="programDoc.data.adks[index].offer[0].apprentice"
          dense
          label="Apprentice"
        ></v-checkbox>
        <v-checkbox
          v-model="programDoc.data.adks[index].offer[0].extern"
          dense
          label="Extern"
        ></v-checkbox>
        <v-checkbox
          v-model="programDoc.data.adks[index].offer[0].preApprentice"
          dense
          label="Pre-Apprentice"
        ></v-checkbox>
        <v-checkbox
          v-model="programDoc.data.adks[index].offer[0].preInternship"
          dense
          label="Pre-Internship"
        ></v-checkbox>

        <!-- BREAK -->
        <v-divider class="mt-6"></v-divider>
        <div class="module-setup__question-title">
          What is the Summer internship start & deadline date?
        </div>

        <v-row class="d-flex mt-3">
          <v-col class="mt-3">
            <v-dialog
              ref="dialog"
              v-model="modal1"
              :return-value.sync="date1"
              persistent
              width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="programDoc.data.adks[index].offer[0].internshipStart"
                  v-bind="attrs"
                  disabled
                  rounded
                  outlined
                  label="Start Date"
                  append-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="programDoc.data.adks[index].offer[0].internshipStart"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal1 = false"> Cancel </v-btn>
                <v-btn text color="primary" @click="modal1 = false"> OK </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-col class="mt-3">
            <v-dialog
              ref="dialog"
              v-model="modal2"
              :return-value.sync="date2"
              persistent
              width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="programDoc.data.adks[index].offer[0].internshipEnd"
                  v-bind="attrs"
                  outlined
                  rounded
                  disabled
                  label="Deadline Date"
                  append-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="programDoc.data.adks[index].offer[0].internshipEnd"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal2 = false"> Cancel </v-btn>
                <v-btn text color="primary" @click="modal2 = false"> OK </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>

        <!-- <v-row class="mt-3">
          <v-col cols="12" sm="6">
            <v-date-picker v-model="workDates" range></v-date-picker>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="dateRangeText"
              label="Date range"
              prepend-icon="mdi-calendar"
              readonly
            ></v-text-field>
          </v-col>
        </v-row> -->

        <!-- BREAK -->
        <v-divider class="mt-6"></v-divider>

        <div class="module-setup__question-title">
          What is the minimum & maximum amount of working hours?
        </div>
        <v-row class="d-flex mt-3">
          <v-col class="mt-3">
            <v-select
              v-model="programDoc.data.adks[index].offer[0].minHours"
              :items="minHours"
              rounded
              label="Minimum Hours"
              outlined
            ></v-select>
          </v-col>
          <!-- <div class="ml-3 mr-3"></div> -->
          <v-col class="mt-3">
            <v-select
              v-model="programDoc.data.adks[index].offer[0].maxHours"
              :items="maxHours"
              rounded
              label="Maximum Hours"
              outlined
            ></v-select>
          </v-col>
        </v-row>

        <!-- BREAK -->
        <v-divider class="mt-6"></v-divider>
        <div class="module-setup__question-title">Who will be the employer-of-record?</div>

        <v-radio-group v-model="programDoc.data.adks[index].offer[0].employerRecord">
          <v-radio label="My organization will run payroll"></v-radio>
          <v-radio label="PilotCity (20% admin fee from total budget)"></v-radio>
        </v-radio-group>
        <!-- BREAK -->

        <v-divider class="mt-6"></v-divider>
        <div class="module-setup__question-title mb-3">
          What compensation options can you offer? Select at least one.
        </div>
        <v-checkbox
          v-model="programDoc.data.adks[index].offer[0].compensation1"
          dense
          label="$250 Stipend (+20% w/ PilotCity employer-of-record)"
        ></v-checkbox>
        <v-checkbox
          v-model="programDoc.data.adks[index].offer[0].compensation2"
          dense
          label="$350 Stipend (+20% w/ PilotCity employer-of-record)"
        ></v-checkbox>
        <v-checkbox
          v-model="programDoc.data.adks[index].offer[0].compensation3"
          dense
          label="$500 Stipend (+20% w/ PilotCity employer-of-record)"
        ></v-checkbox>
        <v-checkbox
          v-model="programDoc.data.adks[index].offer[0].compensation4"
          dense
          label="$595 Stipend (+20% w/ PilotCity employer-of-record, Recommended)"
        ></v-checkbox>
        <v-checkbox
          v-model="programDoc.data.adks[index].offer[0].compensation5"
          dense
          label="W2 Employee (Minimum wage or more)"
        ></v-checkbox>
        <v-checkbox
          v-model="programDoc.data.adks[index].offer[0].compensation6"
          dense
          label="Unpaid ($0)"
        ></v-checkbox>
        <!-- BREAK -->
        <v-divider class="mt-6"></v-divider>
        <div class="module-setup__question-title">
          What is the minimum & maximum compensation budget?
        </div>
        <v-row class="d-flex mt-3">
          <v-col class="mt-3">
            <v-select
              v-model="programDoc.data.adks[index].offer[0].minimumBudget"
              :items="minBudget"
              label="Minimum"
              rounded
              outlined
            ></v-select>
          </v-col>
          <v-col class="mt-3">
            <v-select
              v-model="programDoc.data.adks[index].offer[0].maximumBudget"
              :items="maxBudget"
              label="Maximum"
              rounded
              outlined
            ></v-select>
          </v-col>
        </v-row>

        <!-- BREAK -->
        <v-divider class="mt-6"></v-divider>
        <div class="module-setup__question-title">
          When is the last date for students to accept their offers?
        </div>

        <v-col class="mt-3">
          <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent>
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="programDoc.data.adks[index].offer[0].acceptanceDeadline"
                v-bind="attrs"
                outlined
                disabled
                label="Acceptance deadline"
                append-icon="mdi-calendar"
                readonly
                rounded
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="programDoc.data.adks[index].offer[0].acceptanceDeadline"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.update(date)"> OK </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>

        <!-- BREAK -->
        <v-divider class="mt-6"></v-divider>
        <div class="module-setup__question-title">
          Is there possibility of continuation or re-hire?
        </div>

        <v-radio-group v-model="programDoc.data.adks[index].offer[0].continuation">
          <v-radio label="Yes"></v-radio>
          <v-radio label="No"></v-radio>
        </v-radio-group>

        <!-- BREAK -->
        <v-divider class="mt-6"></v-divider>

        <div class="module-setup__question-title">
          Would you like to incentivize pre-internship completion by automatically issuing &
          rewarding an
          <v-chip color="purple" rounded small class="font-weight-bold white--text mb-1"
            >Extern</v-chip
          >
          title?
        </div>
        <div class="d-flex justify-center mt-2">
          <!-- LEARN MORE ABOUT CREDENTIAL -->

          <v-dialog
            v-model="learnCredential"
            :max-width="$vuetify.breakpoint.xs ? '100%' : '50vw'"
            content-class="record-video-badge-selection"
          >
            <template #activator="{ on, attrs }">
              <v-btn class="mb-2" v-bind="attrs" outlined rounded depressed x-small v-on="on"
                >Learn more</v-btn
              >
            </template>
            <v-card class="d-flex flex-column">
              <v-container class="mt-auto mb-auto d-flex justify-center flex-column pa-10">
                <div class="font-weight-bold">
                  By issuing an
                  <v-chip color="purple" rounded small class="font-weight-bold white--text mb-1"
                    >Extern</v-chip
                  >
                  title upon pre-internship completion, students rejected after the interview or
                  unable to pursue an internship gain a title acknowledging the time they spent on
                  their project for résumé building & educational advancement.
                </div>
                <br />

                <div class="font-weight-bold">
                  <h5>
                    According to
                    <a target="_blank" href="https://tallo.com/blog/externship-vs-internship/"
                      >Tallo.com</a
                    >
                  </h5>
                </div>
                <div class="">
                  <h5 class="font-weight-regular">
                    Externships are temporary job training programs and learning opportunities that
                    usually last anywhere from a
                    <span class="font-weight-bold">single day to six weeks</span>. They allow
                    curious students and trainees to get a glimpse into the real-life workplace,
                    often through shadowing an employee, observing a jobsite, or
                    <span class="font-weight-bold">volunteering temporarily</span>.
                  </h5>
                </div>

                <br />

                <div class="font-weight-bold">
                  <h5>
                    According to
                    <a
                      target="_blank"
                      href="https://www.indeed.com/career-advice/finding-a-job/what-is-an-externship"
                      >Indeed.com</a
                    >
                  </h5>
                </div>

                <div class="">
                  <h5 class="font-weight-regular">
                    Externships usually occur
                    <span class="font-weight-bold">during the school year</span>, as a part of a
                    student's curriculum, and provide an experiential learning environment that
                    offers real-world insight to theoretical topics being learned about in school.
                    In most cases, externs perform mostly job shadowing and may work on
                    <span class="font-weight-bold">small projects</span>.
                  </h5>
                </div>
                <br />
                <div class="font-weight-bold">
                  <h5>
                    According to
                    <a target="_blank" href="https://en.wikipedia.org/wiki/Externship"
                      >Wikipedia.org</a
                    >
                  </h5>
                </div>

                <div class="">
                  <h5 class="font-weight-regular">
                    Externships are experiential learning opportunities, similar to internships,
                    provided by partnerships between
                    <span class="font-weight-bold">educational institutions</span> and employers to
                    give students practical experiences in their field of study
                  </h5>
                </div>
                <div class="mt-6 d-flex justify-center">
                  <v-btn outlined rounded depressed @click="learnCredential = false"> Close</v-btn>
                </div>
              </v-container>
            </v-card>
          </v-dialog>

          <!-- LEARN MORE ABOUT CREDENTIAL -->
        </div>

        <v-radio-group v-model="programDoc.data.adks[index].offer[0].externCredential">
          <v-radio label="Yes (Recommended)" @click="triggerRadio"></v-radio>
          <v-radio label="Opt-out" @click="triggerRadio"></v-radio>
          <v-radio
            label="Offer externship only and not internship"
            @click="openExternDialog"
          ></v-radio>
        </v-radio-group>

        <v-dialog v-model="externDialog" persistent max-width="fit-content">
          <v-card class="pa-8">
            <div class="d-flex justify-center flex-column">
              <div class="d-flex justify-center">
                <h2 class="mb-4">
                  Are you sure, you want to offer externship and not internship ?
                </h2>
              </div>
              <div class="d-flex flex-row justify-center">
                <div>
                  <v-btn x-large class="ma-3" rounded outlined color="grey" @click="cancelExtern">
                    Close
                  </v-btn>
                </div>
                <div>
                  <v-btn
                    rounded
                    x-large
                    dark
                    class="ma-3 font-weight-bold"
                    depressed
                    color="purple"
                    @click="confirmExtern"
                  >
                    Confirm
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card>
        </v-dialog>

        <!-- BREAK -->

        <!-- BREAK -->

        <!-- BREAK -->

        <!-- NO SETUP NECESSARY / COMMENT OUT IF SETUP IS NECESSARY -->
        <!-- <div class="module-setup__none">No setup necessary</div> -->
        <!-- ENTER CONTENT HERE -->

        <div center class="module-setup__save-button">
          <v-btn
            :loading="loading"
            center
            class="mt-12 setup-adk-offer"
            x-large
            rounded
            outlined
            depressed
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
import {
  defineComponent,
  ref,
  computed,
  PropType,
  toRefs,
  reactive,
  watch,
  watchEffect
} from '@vue/composition-api';
import { loading } from 'pcv4lib/src';
import { ValidationObserver, ValidationProvider } from '@/validation';
import MongoDoc from './types';
import { minBudget, maxBudget, minHours, maxHours } from './const';

// TODO: move this to @pilocity/shared
const enum ProgramActivityStatus {
  NeedSetup = 'need_setup',
  CompleteSetup = 'complete_setup',
  Standard = 'standard'
}

export default defineComponent({
  name: 'ModuleSetup',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    }
  },
  setup(props, ctx) {
    const externDialog = ref(false);
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

    function triggerRadio() {
      programDoc.value.data.adks[index].offer[0].externShip = false;
    }

    function openExternDialog() {
      externDialog.value = true;
    }

    function confirmExtern() {
      externDialog.value = false;
      programDoc.value.data.adks[index].offer[0].externShip = true;
    }

    function cancelExtern() {
      programDoc.value.data.adks[index].offer[0].externCredential = false;
      externDialog.value = false;
    }

    const initOfferSetup = {
      offer: [
        {
          internshipProject1: true,
          internshipProject2: false,
          internshipProject3: false,
          licenseRequirement: 0,
          employerRecord: 0,
          intern: true,
          fellow: false,
          eir: false,
          extern: false,
          externShip: false,
          apprentice: false,
          preApprentice: false,
          preInternship: false,
          externCredential: 0,
          continuation: 0,
          compensation1: false,
          compensation2: false,
          compensation3: false,
          compensation4: true,
          compensation5: false,
          compensation6: true,
          minimumBudget: '$1,000',
          maximumBudget: '$5,000',
          internshipStart: '2022-06-20',
          internshipEnd: '2022-08-19',
          minHours: 180,
          maxHours: 240,
          acceptanceDeadline: '2022-06-17',
          required: false
        }
      ]
    };

    const setup = reactive({
      minBudget,
      maxBudget,
      minHours,
      maxHours
    });

    const date = ref('');
    const modal = ref('');
    const date1 = ref('');
    const modal1 = ref('');
    const date2 = ref('');
    const modal2 = ref('');

    programDoc.value.data.adks[index] = {
      ...initOfferSetup,
      ...programDoc.value.data.adks[index]
    };
    // Handle Save

    function populate() {
      programDoc.value.data.adks[index].offer.push(initOfferSetup.offer[0]);
    }

    const learnCredential = ref(false);

    return {
      ...toRefs(setup),
      programDoc,
      index,
      populate,
      ...loading(
        () =>
          programDoc.value.update(() => ({
            adkIndex: index,
            isComplete: true,
            status: ProgramActivityStatus.CompleteSetup
          })),
        'Success',
        'Try again later'
      ),
      date,
      modal,
      date1,
      modal1,
      date2,
      modal2,
      learnCredential,
      openExternDialog,
      externDialog,
      cancelExtern,
      confirmExtern,
      triggerRadio
    };
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
    // margin-top: 50px;
    margin-top: 35px;
  }
  &__save-button {
    display: flex;

    justify-content: center;
  }
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
.v-dialog {
  &.record-video-badge-selection {
    @media (max-width: 767px) {
      height: 80%;
      margin: 24px 10px 0;
    }
  }
}
</style>
