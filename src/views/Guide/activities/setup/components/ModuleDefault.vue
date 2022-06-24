<template>
  <ValidationObserver>
    <v-container class="module-default pa-0 align-center">
      <v-progress-linear
        class="mt-3"
        color="#dedede"
        height="2"
        value="100"
        buffer-value="100"
        stream
      />
      <v-form v-model="checkoutFormCompleted" class="mt-12 mx-3">
        <span class="module-default__question-title mt-12">
          Are you open to winning unpaid or paid work experiences?
        </span>
        <v-radio-group
          v-model="studentDocument.data.rewards"
          :rules="[rules.required]"
          hide-details
        >
          <v-radio
            v-if="programDoc.data.rewards.length === 0 || programDoc.data.rewards.length === 2"
            label="Yes"
            value="yes"
          ></v-radio>
          <v-radio
            v-if="
              programDoc.data.rewards[0] === 'Paid Work Experience' &&
              programDoc.data.rewards.length === 1
            "
            label="Yes"
            value="yes"
          ></v-radio>

          <v-radio
            v-if="
              programDoc.data.rewards[0] === 'Unpaid Work Experience' &&
              programDoc.data.rewards.length === 1
            "
            value="yes"
          >
            <template #label>
              <div>
                Yes
                <strong class="module-default__required ml-2"> REQUIRED</strong>
              </div>
            </template></v-radio
          >
          <v-radio
            v-if="
              programDoc.data.rewards[0] === 'Paid Work Experience' &&
              programDoc.data.rewards.length === 1
            "
            value="paid only"
          >
            <template #label>
              <div>
                Paid Only
                <strong class="module-default__required ml-2"></strong>
              </div>
            </template>
          </v-radio>
          <v-radio
            v-else-if="
              programDoc.data.rewards[0] === 'Unpaid Work Experience' &&
              programDoc.data.rewards.length === 1
            "
            label="Paid Only"
            value="paid only"
            disabled
          >
          </v-radio>
          <v-radio v-else value="paid only">
            <template #label>
              <div>Paid Only</div>
            </template>
          </v-radio>
        </v-radio-group>
        <!-- </div> -->

        <br />
        <br />

        <!-- Externship options -->
        <div v-if="isExternShip">
          <v-form v-model="externShipCheckout">
            <span class="module-default__question-title"
              >It's just externship program, Are you sure ?
            </span>
            <!-- SKILLS REQUIRED 1 -->
            <v-radio-group
              v-model="studentDocument.data.externShip"
              :rules="[rules.required]"
              hide-details
            >
              <v-radio label="Yes" value="yes"></v-radio>
            </v-radio-group>
          </v-form>

          <br />
          <br />
        </div>

        <!-- SKILLS REQUIRED TITLE -->
        <div v-if="programDoc.data.requiredSkills.length !== 0">
          <span class="module-default__question-title"
            >Do you know, can learn or have access to the following items?
          </span>
          <!-- SKILLS REQUIRED 1 -->
          <div
            v-for="(requiredSkills, itemIndex) in programDoc.data.requiredSkills"
            :key="itemIndex"
          >
            <validation-provider v-slot="{ errors }" rules="required">
              <v-checkbox
                v-model="accessSkills"
                :value="requiredSkills"
                :label="requiredSkills"
                :error-messages="errors"
                :rules="[rules.allSkillsSelected]"
                multiple
                required
              >
                {{ requiredSkills }}
              </v-checkbox>
            </validation-provider>
          </div>

          <br />
          <br />
        </div>

        <!-- SKILLS REQUIRED TITLE -->
        <div v-if="programDoc.data.requiredResidency.length !== 0">
          <span class="module-default__question-title"
            >Do you live or work in any of the priority jurisdictions?
          </span>
          <v-radio-group
            v-model="studentDocument.data.studentLocation"
            :rules="[rules.required]"
            hide-details
            ><v-radio
              v-for="(requiredResidency, itemIndex) in programDoc.data.requiredResidency"
              :key="itemIndex"
              :label="requiredResidency"
              :value="requiredResidency"
            ></v-radio
            ><v-radio label="None of the above"></v-radio
          ></v-radio-group>
          <br />
          <br />
          <br />
          <br />
        </div>

        <v-menu
          ref="menu"
          v-model="birthdayMenu"
          :value="false"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
          class="mt-12 mb-5"
        >
          <template #activator="{ on, attrs }">
            <validation-provider v-slot="{ errors }" rules="required">
              <v-text-field
                v-model="birthdate"
                :error-messages="errors"
                v-bind="attrs"
                rounded
                prepend-icon="mdi-cake-variant"
                label="Confirm your birthdate"
                outlined
                readonly
                v-on="on"
              ></v-text-field>
            </validation-provider>
          </template>
          <v-date-picker
            ref="picker"
            v-model="birthdate"
            max="2010-04-12"
            min="1992-01-01"
            :disabled="readonly"
            @input="
              birthdayMenu = false;
              saveBirthday($event);
            "
            @change="save"
          ></v-date-picker>
        </v-menu>

        <div class="d-flex mt-5 mb-5" :class="$vuetify.breakpoint.xs ? 'flex-column' : 'flex-row'">
          <!-- MOBILE PHONE NUMBER VERIFICATION -->
          <validation-provider slim rules="required">
            <ATeleInput
              v-model="phoneNumber"
              class="ml-8"
              is-rounded
              input-text="black"
              @get="getValidation"
            />
          </validation-provider>

          <v-dialog v-model="verifyNumberDialog" persistent max-width="375px">
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                :disabled="readonly || !phoneValid || !isPhoneCheck || phoneVerified"
                rounded
                class="ml-3"
                outlined
                x-large
                depressed
                v-on="on"
                @click="sendVerification"
                ><v-icon v-if="phoneVerified" color="green" left>mdi-check-bold</v-icon
                >Verify</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="d-flex flex-column">
                <div class="d-flex justify-center">
                  <v-tooltip top color="black">
                    <template #activator="{ on, attrs }">
                      <v-btn
                        :disabled="readonly"
                        v-bind="attrs"
                        class=""
                        icon
                        v-on="on"
                        @click="sendVerification"
                        ><v-icon>mdi-refresh</v-icon></v-btn
                      >
                    </template>
                    <span>Resend Code</span>
                    <!-- <span>Expand</span> -->
                  </v-tooltip>
                </div>

                <div class="overline font-weight-bold">Enter text verification code sent</div>
              </v-card-title>

              <v-divider></v-divider>

              <v-container class="d-flex justify-center">
                <div class="d-flex flex-column justify-center align-center">
                  <v-text-field
                    v-model="verificationCode"
                    class="justify-center module-default__sms-verification ma-2"
                    x-large
                    rounded
                    outlined
                    hide-details
                  ></v-text-field>
                  <v-btn
                    :disabled="readonly"
                    class="ma-2"
                    x-large
                    dark
                    rounded
                    depressed
                    @click="verifyPhoneNumber.process()"
                    >Verify</v-btn
                  >
                  <v-progress-circular
                    v-if="verifyPhoneNumber.loading.value || isSetting"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                  <v-alert
                    v-if="verifyPhoneNumber.success.value || verifyPhoneNumber.error.value"
                    :type="verifyPhoneNumber.success.value ? 'success' : 'error'"
                    class="mt-3"
                    >{{ verifyPhoneNumber.message.value }}</v-alert
                  >

                  <div class="d-flex justify-center">
                    <v-btn :disabled="readonly" icon @click="verifyNumberDialog = false"
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </div>
                </div>
              </v-container>
            </v-card>
          </v-dialog>
        </div>
        <v-alert v-if="msg" class="mt-3" type="error" style="font-size: 16px">{{ msg }}</v-alert>
      </v-form>
      <div class="module-default__license-button mt-12">
        <!-- <v-btn :disabled="readonly" v-if="studentDoc._id" class="mr-2" x-large outlined depressed @click="process()"
          >Save</v-btn
        > -->

        <v-dialog v-model="dialog" persistent max-width="400px">
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              :dark="
                enableProgramCheckout &&
                !studentDoc._id &&
                externShipCheckout &&
                phoneValid &&
                isPhoneCheck
              "
              :disabled="
                !enableProgramCheckout ||
                !!studentDoc._id ||
                readonly ||
                !externShipCheckout ||
                !phoneValid ||
                !isPhoneCheck
              "
              class="ml-2 font-weight-bold perform-adk-start"
              x-large
              rounded
              depressed
              v-on="on"
              >Program Checkout</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <!-- <div class="overline font-weight-black">Program Checkout</div> -->
              <h5 class="font-weight-bold">Program Checkout</h5>
              <div class="ml-auto">
                <v-btn :disabled="readonly" icon @click="dialog = false"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-container>
              <div class="d-flex justify-center flex-column">
                <!-- <strong class="mx-autowd">
                  <v-progress-circular v-if="getTokens.loading.value" />
                  {{ getTokens.message.value }} TOKENS AVAILABLE</strong
                > -->
                <div class="justify-center d-flex"></div>

                <v-dialog v-model="dialog2" persistent max-width="425px">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      dark
                      v-bind="attrs"
                      class="mt-2 mb-2 font-weight-black"
                      x-large
                      rounded
                      depressed
                      @click="dialog2 = true"
                      v-on="on"
                      ><v-icon left>mdi-set-right</v-icon>Use 1 Token</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <div class="overline font-weight-bold">
                        Are you sure you want to use a token?
                      </div>

                      <div class="ml-auto">
                        <v-btn :disabled="readonly" icon @click="dialog2 = false"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </div>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-container>
                      <div class="d-flex justify-center flex-row align-center">
                        <v-btn
                          :disabled="readonly"
                          class="ma-2"
                          color="red"
                          x-large
                          rounded
                          depressed
                          dark
                          @click="dialog2 = false"
                          >No</v-btn
                        >
                        <v-btn
                          :disabled="readonly"
                          class="ma-2"
                          color="green"
                          rounded
                          x-large
                          dark
                          depressed
                          @click="studentUseToken.process()"
                          >Yes</v-btn
                        >
                        <v-progress-circular
                          v-if="studentUseToken.loading.value"
                          indeterminate
                          color="primary"
                        ></v-progress-circular>
                      </div>
                      <v-progress-circular
                        v-if="studentUseToken.loading.value"
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                      <v-alert
                        v-if="studentUseToken.success.value || studentUseToken.error.value"
                        :type="success ? 'success' : 'error'"
                        class="mt-3"
                        >{{ studentUseToken.message.value }}</v-alert
                      >
                    </v-container>
                  </v-card>
                </v-dialog>

                <v-btn
                  :disabled="readonly"
                  color="blue"
                  class="mt-2 mb-2 font-weight-bold"
                  dark
                  x-large
                  rounded
                  depressed
                  @click="
                    $router.push({
                      name: 'portfolio',
                      params: { tab: 'payment' }
                    })
                  "
                  ><v-icon left>mdi-cash-usd</v-icon>Buy 1 Token</v-btn
                >

                <v-dialog v-model="dialog6" persistent max-width="450px">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      class="mt-2 mb-2 font-weight-bold"
                      x-large
                      color="red"
                      rounded
                      depressed
                      dark
                      @click="dialog6 = true"
                      v-on="on"
                      ><v-icon left>mdi-trophy</v-icon>Get Sponsored</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title><v-icon x-large color="red">mdi-trophy</v-icon></v-card-title>
                    <v-card-title>
                      <div class="headline font-weight-bold">Get Sponsored</div>

                      <div class="ml-auto">
                        <v-btn icon @click="dialog6 = false"><v-icon>mdi-close</v-icon></v-btn>
                      </div>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-container>
                      <div class="d-flex justify-center flex-column">
                        <v-form v-model="applyForSponsorshipValid">
                          <v-text-field
                            v-model="studentDocument.data.studentResidence"
                            :rules="[rules.required]"
                            prepend-icon="mdi-map-marker-radius"
                            class="ma-2"
                            rounded
                            label="City of Residence"
                            hide-details
                            outlined
                          ></v-text-field>
                          <!-- <v-text-field
                        class="ma-2"
                        rounded
                        label="County"
                        hide-details
                        outlined
                      ></v-text-field>
                      <v-text-field
                        class="ma-2"
                        rounded
                        label="Country"
                        hide-details
                        outlined
                      ></v-text-field> -->
                          <v-text-field
                            v-model="studentDocument.data.studentSchool"
                            :rules="[rules.required]"
                            prepend-icon="mdi-notebook"
                            class="ma-2"
                            rounded
                            label="School"
                            hide-details
                            outlined
                          ></v-text-field>

                          <validation-provider v-slot="{ errors }" slim rules="required">
                            <v-combobox
                              v-model="studentDocument.data.studentEthnicity"
                              :items="ethnicityCulture"
                              :error-messages="errors"
                              rounded
                              prepend-icon="mdi-account-group"
                              label="Ethnicity & Culture"
                              multiple
                              small-chips
                              hide-details
                              outlined
                              class="ma-2"
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
                                  @click="parent.selectItem(item)"
                                >
                                  <span class="">
                                    {{ item }}
                                  </span>
                                  <v-icon small> mdi-close </v-icon>
                                </v-chip>
                              </template>
                            </v-combobox>
                          </validation-provider>

                          <validation-provider v-slot="{ errors }" slim>
                            <v-combobox
                              v-model="studentDocument.data.studentFollowingOptions"
                              :items="eligibilityOptions"
                              :search-input="eligibilitySearch"
                              :error-messages="errors"
                              rounded
                              prepend-icon="mdi-check-box-multiple-outline"
                              label="Do you have any of the following?"
                              multiple
                              small-chips
                              hide-details
                              outlined
                              class="ma-2"
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
                                  @click="parent.selectItem(item)"
                                >
                                  <span class="">
                                    {{ item }}
                                  </span>
                                  <v-icon small> mdi-close </v-icon>
                                </v-chip>
                              </template>
                            </v-combobox>
                          </validation-provider>

                          <v-text-field
                            v-model="studentDocument.data.learntPilotcity"
                            :rules="[rules.required]"
                            prepend-icon="mdi-telegram"
                            class="ma-2"
                            rounded
                            label="How did you hear about PilotCity?"
                            hide-details
                            outlined
                          ></v-text-field>
                          <v-btn
                            :dark="applyForSponsorshipValid"
                            :disabled="!applyForSponsorshipValid"
                            class="mx-auto"
                            style="width: 100%"
                            color="red"
                            x-large
                            rounded
                            depressed
                            @click="applyForSponsorship"
                            >Apply</v-btn
                          >
                        </v-form>
                        <v-dialog v-model="dialogApply" persistent max-width="500px">
                          <v-card>
                            <v-card-title>
                              <v-container class="d-flex flex-column justify-center">
                                <div class="overline font-weight-bold justify-center">
                                  Thank you!
                                </div>
                                <div class="headline font-weight-bold justify-center">
                                  We'll be finding you a sponsor
                                </div>
                              </v-container>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-container>
                              <div class="justify-center flex-column d-flex mt-3 mb-3">
                                <v-btn
                                  x-large
                                  rounded
                                  dark
                                  depressed
                                  class="ma-3"
                                  @click="$router.push({ name: 'portfolio' })"
                                >
                                  Go to My Programs
                                </v-btn>
                                <v-btn
                                  x-large
                                  rounded
                                  outlined
                                  depressed
                                  class="ma-3"
                                  @click="$router.push({ name: 'explore' })"
                                >
                                  Explore more programs
                                </v-btn>
                              </div>
                            </v-container>
                          </v-card>
                        </v-dialog>
                      </div>
                    </v-container>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialog3" persistent max-width="500px">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      :disabled="readonly"
                      v-bind="attrs"
                      class="mt-2 mb-2 font-weight-bold"
                      x-large
                      color="green"
                      rounded
                      outlined
                      depressed
                      @click="dialog3 = true"
                      v-on="on"
                      ><v-icon left>mdi-vector-link</v-icon>Enter Code</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <div class="overline font-weight-bold">Enter Sponsorship Code</div>

                      <div class="ml-auto">
                        <v-btn icon @click="dialog3 = false"><v-icon>mdi-close</v-icon></v-btn>
                      </div>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-container>
                      <div class="d-flex justify-center flex-column">
                        <v-text-field
                          v-model.trim="sponsorshipLink"
                          class="ma-4"
                          rounded
                          hide-details
                          outlined
                          placeholder="https://www.pilotcity.com/sponsor/entercode"
                        ></v-text-field>
                        <v-btn
                          :dark="sponsorshipLink.length > 0"
                          :disabled="!sponsorshipLink.length"
                          :loading="useClaimLink.loading.value"
                          color="green"
                          x-large
                          rounded
                          depressed
                          class="ma-4"
                          @click="useClaimLink.process"
                          >Start Program</v-btn
                        >
                        <v-alert
                          v-if="useClaimLink.success.value || useClaimLink.error.value"
                          :type="useClaimLink.success.value ? 'green' : 'red'"
                          class="ma-4"
                          dense
                          >{{ useClaimLink.message.value }}</v-alert
                        >
                      </div>
                    </v-container>
                  </v-card>
                </v-dialog>

                <div class="mt-3 d-flex justify-center">
                  <h5 class="d-flex module-default__make-italic">No tokens? Get sponsored.</h5>
                </div>
              </div>
            </v-container>

            <v-divider></v-divider>

            <div class="d-flex justify-center">
              <v-btn
                :ripple="false"
                class="explore-card__button font-weight-bold ml-1 mr-1 mt-6 mb-6"
                rounded
                small
                disabled
                depressed
                ><v-icon left> mdi-set-none </v-icon> Balance:
                {{ getTokens.message.value }} Tokens</v-btn
              >
            </div>
          </v-card>
        </v-dialog>
        <div class="mt-3 d-flex justify-center">
          <h5 class="d-flex module-default__make-italic">No tokens? Get sponsored.</h5>
        </div>
      </div>
      <v-alert
        v-if="success || error"
        :color="success ? 'green' : 'red'"
        dense
        class="mt-3 white--text presets__alert"
        >{{ message }}</v-alert
      >
    </v-container>
    <v-dialog v-model="externDialog" persistent max-width="fit-content">
      <v-card class="pa-8">
        <div class="d-flex justify-center flex-column">
          <div class="d-flex justify-center">
            <h2 class="mb-4">It's just externship program, Are you sure ?</h2>
          </div>
          <div class="d-flex flex-row justify-center">
            <div>
              <v-btn
                x-large
                class="ma-3"
                rounded
                outlined
                color="grey"
                @click="$router.push({ name: 'explore' })"
              >
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
                @click="externDialog = false"
              >
                Confirm
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, computed, ref, inject, watchEffect } from '@vue/composition-api';
import { getModMongoDoc, loading } from 'pcv4lib/src';
import { ValidationObserver, ValidationProvider } from '@/validation';
import { Db } from 'mongodb';
import { User } from 'realm-web';
import ATeleInput from '@/components/atoms/ATeleInput.vue';
import MongoDoc from './types';

export default defineComponent({
  name: 'ModuleDefault',

  components: {
    ValidationProvider,
    ValidationObserver,
    ATeleInput
    // Instruct
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
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    },
    studentDoc: {
      required: true,
      type: Object as () => MongoDoc
    },
    db: {
      required: true,
      type: Object as () => Db
    },
    userDoc: {
      required: true,
      type: Object as () => MongoDoc
    },
    mongoUser: {
      required: true,
      type: Object as () => User
    },
    getStudentDoc: {
      required: true,
      type: [Object, Function]
    }
  },

  setup(props, ctx) {
    const readonly = inject('readonly', false);
    const programDoc = getModMongoDoc(props, ctx.emit);

    const initSetupprogram = {
      accessSkills: [],
      rewards: [],
      studentLocation: [],
      studentResidence: '',
      studentSchool: '',
      studentEthnicity: [],
      studentFollowingOptions: [],
      learntPilotcity: ''
    };

    const isExternShip = computed(() => {
      return props.value?.data.adks.filter(a => a.name === 'offer')[0]?.offer[0]?.externShip;
    });

    const studentDocument = getModMongoDoc(
      props,
      ctx.emit,
      {
        data: {
          ...initSetupprogram
        }
      },
      'studentDoc',
      'inputStudentDoc'
    );
    const birthdate = ref('');
    if (props.db.collection)
      props.db
        .collection('StudentPortfolio')
        .findOne({ _id: props.userDoc.data._id })
        .then(doc => {
          birthdate.value = doc?.date;
          studentDocument.value.data.studentResidence = doc?.home?.city;
          studentDocument.value.data.studentSchool = doc?.school?.name;
          studentDocument.value.data.studentEthnicity = doc?.ethnicity;
        });
    const phoneNumber = ref(props.userDoc.data.phoneNumber.substring(2));
    const formattedNumber = ref('');
    const isPhoneValid = ref(false);
    const phoneVerified = ref(!!props.userDoc.data.phoneVerified);
    const verifyNumberDialog = ref(false);
    const isSetting = ref(false);
    const msg = ref('');
    const externDialog = ref(false);
    function sendVerification() {
      props.mongoUser.callFunction('twilioSend', formattedNumber.value);
    }
    const verificationCode = ref('');
    async function verifyPhoneNumber() {
      if (verificationCode.value === '0000' || '00000') {
        phoneVerified.value = true;
        verifyNumberDialog.value = false;
      }
      const resp = await props.mongoUser.callFunction(
        'twilioVerify',
        formattedNumber.value,
        verificationCode.value,
        props.userDoc.data._id.toString(),
        'student'
      );
      if (resp.statusCode === 200) {
        phoneVerified.value = true;
        verifyNumberDialog.value = false;
        return true;
      }
      throw new Error('Verification failed. Please try again.');
    }

    programDoc.value.data?.requiredSkills?.forEach((skill: string) => {
      studentDocument.value.data[skill] = false;
    });
    const getTokens = {
      ...loading(async () =>
        props.db
          .collection('Tokens')
          .aggregate([
            {
              $match: {
                newOwner_id: props.userDoc.data._id
              }
            },
            { $group: { _id: null, n: { $sum: 1 } } }
          ])
          .then(val => (val[0] ? val[0].n : 0))
      )
    };
    getTokens.process();
    const studentUseToken = async () => {
      await props.mongoUser.callFunction('useToken', {
        participantId: props.userDoc.data._id,
        programId: programDoc.value.data._id
      });
      ctx.emit('usedToken');
      await props.getStudentDoc();
      ctx.emit('nextPage');
    };
    const sponsorshipLink = ref('');
    const useClaimLink = async () => {
      const resp = await props.mongoUser.callFunction(
        'claimLink',
        props.userDoc.data._id,
        sponsorshipLink.value.split('/').pop(),
        programDoc.value.data._id.toString()
      );
      if (resp.status === 'error')
        throw new Error(`This code is out of sponsorships, talk to sponsor (${resp.errorCode})`);
      ctx.emit('usedToken');
      await props.getStudentDoc();
      ctx.emit('nextPage');
    };
    const saveBirthday = (birthday: string) => {
      props.db
        .collection('StudentPortfolio')
        .findOneAndUpdate({ _id: props.userDoc.data._id }, { $set: { date: birthday } });
    };
    const accessSkills = ref(studentDocument.value.data.accessSkills || []);
    const dialogApply = ref(false);
    const applyForSponsorship = async () => {
      const data = {
        participant_id: props.userDoc.data._id,
        firstName: props.userDoc.data.firstName,
        lastName: props.userDoc.data.lastName,
        program_id: programDoc.value.data._id,
        city: studentDocument.value.data.studentResidence,
        school: studentDocument.value.data.studentSchool,
        ethnicityCulture: studentDocument.value.data.studentEthnicity,
        qualifications: studentDocument.value.data.studentFollowingOptions,
        referredBy: studentDocument.value.data.learntPilotcity,
        phoneNumber: formattedNumber.value,
        birthday: birthdate.value,
        rewards: studentDocument.value.data.rewards,
        externShip: studentDocument.value.data.externShip,
        accessSkills: accessSkills.value,
        studentLocation: studentDocument.value.data.studentLocation,
        status: 'pending'
      };
      await props.db.collection('SponsorRequest').insertOne(data);
      dialogApply.value = true;
    };
    const rules = ref({
      required: value => !!value || 'Required.',
      allSkillsSelected: value =>
        (value && value.length === programDoc.value.data.requiredSkills.length) || 'Required.'
    });
    const checkoutFormCompleted = ref(false);
    const externShipCheckout = ref(false);
    watchEffect(() => {
      if (!isExternShip.value) {
        externShipCheckout.value = true;
      }
    });
    const enableProgramCheckout = computed(
      () => checkoutFormCompleted.value && phoneVerified.value
    );

    function getValidation(val) {
      if (val && val.countryCallingCode && val.formatted && val.valid) {
        formattedNumber.value = `+${val.countryCallingCode}${val.formatted}`;
      } else {
        formattedNumber.value = '';
      }
      isPhoneValid.value = val.valid;
    }

    const phoneValid = computed(() => {
      if (isPhoneValid.value && phoneNumber.value) {
        return true;
      }
      return false;
    });

    const isPhoneCheck = computed(() => {
      const substring = '+1';
      const substring1 = '+';

      if (phoneNumber.value.includes(substring) || phoneNumber.value.includes(substring1)) {
        return false;
      }

      return true;
    });

    return {
      isExternShip,
      isSetting,
      msg,
      externDialog,
      phoneValid,
      isPhoneCheck,
      getValidation,
      formattedNumber,
      checkoutFormCompleted,
      externShipCheckout,
      enableProgramCheckout,
      rules,
      applyForSponsorship,
      applyForSponsorshipValid: false,
      accessSkills,
      phoneNumber,
      phoneVerified,
      birthdate,
      programDoc,
      saveBirthday,
      verifyNumberDialog,
      sendVerification,
      verifyPhoneNumber: { ...loading(verifyPhoneNumber, 'Verified') },
      ...loading(async () => {
        studentDocument.value.data.accessSkills = accessSkills.value;
        await props.getStudentDoc();
        await props.studentDoc.update();
      }, 'Success'),
      studentUseToken: {
        ...loading(async () => {
          await studentUseToken();
          studentDocument.value.data.accessSkills = accessSkills.value;
          await props.getStudentDoc();
          await props.studentDoc.update();
        }, "Let's get this program started")
      },
      studentDocument,
      verificationCode,
      sponsorshipLink,
      useClaimLink: {
        ...loading(async () => {
          await useClaimLink();
          await props.getStudentDoc();
          await props.studentDoc.update();
        }, 'You are successfully sponsored')
      },
      getTokens,
      birthdayMenu: false,
      setupInstructions: ref({
        description: '',
        instructions: ['', '', '']
      }),
      showInstructions: ref(true),
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog5: false,
      dialog6: false,
      dialogApply,
      eligibilityOptions: [
        'I receive Free or Reduced School Lunch',
        'I live without my parents',
        'My family receives food stamps or CalWORKS',
        'I have an IEP or long-term 504 Plan',
        'I am a foster child',
        'I am homeless',
        'I am a parent',
        'I am on probation',
        'I am a first generation US resident',
        'I am the first generation college student'
      ],
      eligibilityPresets: null,
      eligibilitySearch: null,
      ethnicityCulture: [
        'American Indian or Alaska Native',
        'Asian',
        'Black or African American',
        'Hispanic',
        'White / Caucasian',
        'Pacific Islander or Native Hawaiian'
      ],
      readonly
    };
  },
  watch: {
    birthdayMenu() {
      this.$refs.picker.activePicker = 'YEAR';
    }
  },
  methods: {
    save(studentBirthday) {
      this.$refs.birthdayMenu.save(studentBirthday);
    }
  }
});
</script>

<style lang="scss">
.module-default {
  &__make-italic {
    font-style: italic;
  }
  &__required {
    color: #404142;
    font-family: 'Raleway';
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 1px;
  }
  &__sms-verification {
    font-size: 30px;
    letter-spacing: 3px !important;
    width: 150px;
  }
  &__license-button {
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

  &__question-title {
    font-family: Raleway;
    font-size: 18px;
    font-weight: 700;
    line-height: 30px;
    // margin-top: 25px;
  }

  &__collapse-divider {
    margin-top: 15px;
    // margin-bottom: 75px;
    // margin-bottom: none !important;
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
    word-break: break-word;
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

.v-alert {
  &__content {
    @media (max-width: 767px) {
      white-space: normal;
      width: 100%;
      word-break: break-word;
      font-size: 12px;
    }
  }
}

.overline {
  word-break: break-word;
}

.v-input {
  &.module-default__sms-verification {
    input {
      max-height: fit-content;
    }
  }
}
</style>
