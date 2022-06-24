<template>
  <v-container class="module-default pa-0">
    <v-progress-linear
      class="mt-3"
      color="#dedede"
      height="2"
      value="100"
      buffer-value="100"
      stream
    />
    <v-container v-if="editStatus" class="mt-6 d-flex flex-column justify-center pa-6">
      <div class="module__header text-md-h5 mb-6 text-sm-subtitle-1 d-flex align-center">
        <v-row>
          <v-col cols="12" class="text-center">
            <h4>
              {{
                isAdultParticipant
                  ? 'Thank you. We have sent the agreement to your email account for signing'
                  : "We have sent the agreement to your Guardian's email account for signing, as well as a copy to your email for your records"
              }}
            </h4>
          </v-col>
        </v-row>
      </div>
      <v-row class="pl-6 pr-6 mt-12">
        <v-btn
          :disabled="readonly"
          rounded
          class="
            module-default__goto-discord
            ma-2
            pl-auto
            pr-auto
            font-weight-bold
            white--text
            mb-5
          "
          x-large
          depressed
          color="#BDBDBD"
          @click="enableEdit"
          >{{ 'Edit details & generate new agreeement' }}</v-btn
        >
        <v-btn
          v-if="isAdultParticipant"
          :disabled="readonly"
          rounded
          class="module-default__goto-discord ma-2 pl-auto pr-auto font-weight-bold white--text"
          x-large
          depressed
          color="#ea6764"
          @click="openAgreementDialog"
          >Sign here</v-btn
        >
      </v-row>
    </v-container>
    <v-container v-else-if="completed" class="mt-6 d-flex flex-column justify-center pa-6">
      <div class="module__header text-md-h5 mb-6 text-sm-subtitle-1 d-flex align-center">
        <v-row>
          <v-col cols="12" class="text-center">
            <h4>
              {{ 'Thank you for signing. Complete or continue your internship below.' }}
            </h4>
          </v-col>
        </v-row>
      </div>
      <v-row class="pl-6 pr-6 mt-12">
        <v-btn
          :disabled="readonly"
          rounded
          class="module-default__goto-discord ma-2 pl-auto pr-auto font-weight-bold white--text"
          x-large
          depressed
          color="#ea6764"
          @click="goToMobile()"
          >{{ 'Go to Mobile Web App' }}</v-btn
        >
      </v-row>
    </v-container>
    <ValidationObserver v-else-if="!completed" ref="allform" v-slot="{ invalid }">
      <v-container class="mt-6 d-flex flex-column justify-center pa-6">
        <div class="module__header text-md-h5 mb-6 text-sm-subtitle-1 d-flex align-center">
          <input disabled value="Personal" type="text" class="module__header-text mb-5" />
        </div>
        <v-row class="mt-6 justify-center">
          <ValidationObserver ref="studentForm" v-slot="{ invalid }">
            <v-form>
              <v-row>
                <v-col cols="12">
                  <v-alert
                    v-if="studentError.length > 0"
                    dense
                    class="mt-3 white--text presets__alert"
                    type="error"
                    >{{ studentError }}</v-alert
                  >
                  <v-alert
                    v-if="studentSuccess.length > 0"
                    dense
                    class="mt-3 white--text presets__alert"
                    type="success"
                    >{{ studentSuccess }}</v-alert
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="dob" rules="required">
                    <v-text-field
                      v-model="studentData.birth"
                      large
                      outlined
                      rounded
                      type="date"
                      :error-messages="errors"
                      label="Confirm Birth date"
                      placeholder="Confirm Birth Date here..."
                      @input="statusStudentChange('dob')"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="firstName" rules="required">
                    <v-text-field
                      v-model="studentData.firstName"
                      large
                      outlined
                      rounded
                      :error-messages="errors"
                      label="Student First Name"
                      placeholder="Student First Name here..."
                      @keyup="statusStudentChange()"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="lastName" rules="required">
                    <v-text-field
                      v-model="studentData.lastName"
                      large
                      outlined
                      rounded
                      :error-messages="errors"
                      label="Student Last Name"
                      placeholder="Student Last Name here..."
                      @keyup="statusStudentChange()"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="address" rules="required">
                    <v-text-field
                      v-model="studentData.studentAddress"
                      large
                      outlined
                      rounded
                      :error-messages="errors"
                      label="Mailing Street Address"
                      placeholder="Mailing Street Address here..."
                      @keyup="statusStudentChange()"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="city" rules="required">
                    <v-text-field
                      v-model="studentData.city"
                      large
                      outlined
                      rounded
                      :error-messages="errors"
                      label="City"
                      placeholder="City here..."
                      @keyup="statusStudentChange()"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="state" rules="required">
                    <v-text-field
                      v-model="studentData.state"
                      large
                      outlined
                      rounded
                      :error-messages="errors"
                      label="State"
                      placeholder="State here..."
                      @keyup="statusStudentChange()"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="zipcode" rules="required">
                    <v-text-field
                      v-model="studentData.zipcode"
                      large
                      outlined
                      rounded
                      :error-messages="errors"
                      label="Zip code"
                      placeholder="Zip code here..."
                      @keyup="statusStudentChange()"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                    <v-text-field
                      v-model="studentData.email"
                      large
                      outlined
                      rounded
                      disabled
                      :error-messages="errors"
                      type="email"
                      label="Student Email"
                      placeholder="Student Email here..."
                      @keyup="statusStudentChange()"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <validation-provider name="phoneNumber" rules="required">
                    <ATeleInput
                      v-model="studentData.phoneNumber"
                      :disabled="true"
                      @get="getValidation"
                      is-rounded
                      inputText="black"
                      @input="changePhoneVerification('student')"
                    />
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6">
                  <v-btn
                    block
                    :disabled="invalid || readonly || !phoneValid || !isPhoneCheck"
                    elevation="1"
                    outlined
                    x-large
                    rounded
                    text
                    @click="verifyStudent()"
                    ><v-icon v-if="phoneVerified" color="green" left>mdi-check-bold</v-icon
                    >{{ 'Verify' }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </ValidationObserver>
        </v-row>
        <div
          v-if="isAdultParticipant === false"
          class="module__header text-md-h5 mt-12 mb-6 text-sm-subtitle-1 mt-12 d-flex align-center"
        >
          <input disabled value="Guardian" type="text" class="module__header-text mb-5" />
        </div>
        <v-row :class="isAdultParticipant === false ? 'mt-3 mb-6 justify-center' : ''">
          <ValidationObserver ref="guardianForm" v-slot="{ invalid }">
            <v-form v-if="isAdultParticipant === false" id="guardianForm">
              <v-row v-if="guardianError.length > 0 || guardianSuccess.length > 0" class="mb-3">
                <v-col cols="12">
                  <v-alert
                    v-if="guardianError.length > 0"
                    dense
                    class="mt-3 white--text presets__alert"
                    type="error"
                    >{{ guardianError }}</v-alert
                  >
                  <v-alert
                    v-if="guardianSuccess.length > 0"
                    dense
                    class="mt-3 white--text presets__alert"
                    type="success"
                    >{{ guardianSuccess }}</v-alert
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="firstName" rules="required">
                    <v-text-field
                      v-model="guardianData.firstName"
                      large
                      outlined
                      rounded
                      :error-messages="errors"
                      label="Guardian First Name"
                      placeholder="Guardian First Name here..."
                      @keyup="statusGuardianChange()"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6">
                  <validation-provider v-slot="{ errors }" name="lastName" rules="required">
                    <v-text-field
                      v-model="guardianData.lastName"
                      large
                      outlined
                      rounded
                      :error-messages="errors"
                      label="Guardian Last Name"
                      placeholder="Guardian Last Name here..."
                      @keyup="statusGuardianChange()"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                    <v-text-field
                      v-model="guardianData.email"
                      large
                      outlined
                      rounded
                      :error-messages="errors"
                      label="Guardian Email"
                      placeholder="Guardian Email here..."
                      @keyup="statusGuardianChange()"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="guardianphoneNumber"
                    rules="required"
                  >
                    <v-text-field
                      v-model="guardianData.phoneNumber"
                      v-mask="'+1(###) ###-####'"
                      large
                      outlined
                      rounded
                      :error-messages="errors"
                      label="Guardian Phone"
                      placeholder="Phone Number here.."
                      @keyup="changePhoneVerification('guardian')"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6">
                  <v-btn
                    block
                    elevation="1"
                    :disabled="invalid || readonly"
                    outlined
                    x-large
                    rounded
                    text
                    @click="verifyGuardian()"
                    ><v-icon v-if="guardianphoneVerified" color="green" left>mdi-check-bold</v-icon
                    >{{ 'Verify' }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </ValidationObserver>
        </v-row>
        <v-row v-if="studentChange || guardianChange" class="pl-6 pr-6 mt-12">
          <v-alert dense class="mt-12 white--text presets__alert" type="error">{{
            studentChange && guardianChange
              ? 'Please verify Student and Guardian'
              : guardianChange
              ? 'Please verify Guardian'
              : studentChange
              ? 'Please verify Student'
              : ''
          }}</v-alert>
        </v-row>
        <v-row :class="!studentChange && !guardianChange ? 'pl-6 pr-6 mt-12' : 'pl-6 pr-6'">
          <v-btn
            rounded
            :disabled="
              changeFormStatus || readonly ? true : invalid || !phoneValid || !isPhoneCheck
            "
            class="module-default__goto-discord ma-2 pl-auto pr-auto font-weight-bold white--text"
            x-large
            depressed
            color="#ea6764"
            @click="openAgreementDialog()"
            ><v-icon left>mdi-adobe-acrobat</v-icon>Generate Agreement</v-btn
          >
        </v-row>
      </v-container>
    </ValidationObserver>

    <v-dialog v-model="verifyDialog" persistent max-width="375px">
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
                  @click="verificationUser == 'Personal' ? verifyStudent() : verifyGuardian()"
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
            <v-alert
              v-if="studentError.length > 0"
              dense
              class="mt-3 white--text presets__alert"
              type="error"
              >{{ studentError }}</v-alert
            >
            <ValidationObserver ref="studentForm" v-slot="{ invalid }">
              <validation-provider
                v-slot="{ errors }"
                name="guardianphoneNumber"
                rules="required|min:6|max:6"
              >
                <v-text-field
                  v-model="verificationCode"
                  v-mask="'######'"
                  :error-messages="errors"
                  class="justify-center module-default__sms-verification ma-2"
                  x-large
                  rounded
                  outlined
                  hide-details
                ></v-text-field>
              </validation-provider>
              <div class="d-flex justify-center">
                <v-btn
                  class="ma-2 dark-button"
                  x-large
                  :disabled="invalid || readonly"
                  :loading="isLoading"
                  rounded
                  depressed
                  @click="
                    verificationUser == 'Personal'
                      ? verifyStudentProfile()
                      : verifyGuardianProfile()
                  "
                  >Verify</v-btn
                >
              </div>
              <div class="d-flex justify-center">
                <v-btn :disabled="readonly" icon @click="verifyDialogClose()"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </div>
            </ValidationObserver>
          </div>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="ageDialog" persistent max-width="525">
      <v-card>
        <v-card-text>
          <v-container class="d-flex justify-center">
            <div class="d-flex flex-column justify-center align-center">
              <div class="d-flex justify-center text-center">
                <h3 class="pa-4 pt-5">
                  {{
                    "We have sent the agreement to your Guardian's email account for signing, as well as a copy to your email for your records"
                  }}
                </h3>
              </div>
              <div class="d-flex justify-center">
                <v-btn :disabled="readonly" icon @click="ageDialog = false"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </div>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable no-prototype-builtins */
/* eslint-disable vue/no-mutating-props */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { defineComponent, PropType, ref, computed, watch, inject } from '@vue/composition-api';
import { getModAdk, loading } from 'pcv4lib/src';
import * as Realm from 'realm-web';
import axios from 'axios';
import { ObjectId } from 'bson';
import ATeleInput from '@/components/atoms/ATeleInput.vue';
import { MongoDoc } from './types';

type MongoDBDatabase = any;
export default defineComponent({
  name: 'ModuleDefault',
  components: {
    ATeleInput
  },
  props: {
    value: {
      // programDoc
      required: true,
      type: Object as PropType<MongoDoc>
    },
    userDoc: {
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
    },
    mongoUser: {
      required: true,
      type: Object as () => Realm.User
    },
    db: {
      required: true,
      type: Object as PropType<MongoDBDatabase>
    },
    docusignApiDomain: {
      required: true,
      type: String
    }
  },
  setup(props, ctx) {
    const readonly = inject('readonly', false);
    const { adkData, adkIndex } = getModAdk(
      props,
      ctx.emit,
      'agreement',
      {},
      'studentDoc',
      'inputStudentDoc'
    );
    const studentData = ref({
      _id: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      studentAddress: '',
      birth: '',
      phoneVerified: '',
      city: '',
      zipcode: '',
      state: ''
    });
    const guardianData = ref({
      _id: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      phoneVerified: ''
    });
    const verificationCode = ref();
    const verifyDialog = ref(false);
    const verificationUser = ref('');
    const error = ref('');
    const completed = ref(false);
    const studentChange = ref(false);
    const guardianChange = ref(false);
    const studentError = ref('');
    const studentSuccess = ref('');
    const guardianError = ref('');
    const guardianSuccess = ref('');
    const studentagreementStatus = ref(false);
    const guardianagreementStatus = ref(false);
    const ageDialog = ref(false);
    const formattedNumber = ref('');
    const isPhoneValid = ref(false);
    const indexAdk = async (adkName: string) => {
      return props.studentDoc.data.adks.findIndex(
        (objdata: { name: string }) => objdata.name === adkName
      );
    };
    const isAdultParticipant = ref(false);
    const editStatus = ref(false);
    watch(
      () => props.studentDoc,
      newData => {
        if (
          newData.data.adks.findIndex((objdata: { name: string }) => objdata.name === 'agreement')
        )
          fillForm();
      }
    );
    const enableEdit = () => {
      editStatus.value = false;
    };
    const fillData = async () => {
      const studentGuardianData = await props.db!.collection('StudentPortfolio').findOne({
        _id: new ObjectId(props.userDoc?.data._id)
      });
      studentData.value = {
        _id: props.userDoc?.data._id,
        firstName: props.userDoc?.data.firstName,
        lastName: props.userDoc?.data.lastName,
        phoneNumber: props.userDoc?.data.phoneNumber.substring(2),
        email: props.userDoc?.data.email,
        studentAddress: studentGuardianData.home?.streetAddress,
        city: studentGuardianData.home?.city,
        state: studentGuardianData.home?.state,
        zipcode: studentGuardianData.home?.zipcode,
        birth: studentGuardianData.date,
        phoneVerified:
          props.userDoc.data.phoneVerified !== undefined ? props.userDoc.data.phoneVerified : ''
      };
      guardianData.value = {
        _id: props.userDoc?.data._id,
        firstName: studentGuardianData.guardian.firstName,
        lastName: studentGuardianData.guardian.lastName,
        email: studentGuardianData.guardian.email,
        phoneNumber:
          studentGuardianData.guardian.phoneNumber !== undefined
            ? studentGuardianData.guardian.phoneNumber
            : '',
        phoneVerified:
          studentGuardianData.guardian.phoneVerified !== undefined
            ? studentGuardianData.guardian.phoneVerified
            : ''
      };
      isAdultParticipant.value = !(getAge() < 18);
    };
    const getAge = () => {
      const birthDate = new Date(studentData.value.birth);
      const todayDate = new Date();
      let years = todayDate.getFullYear() - birthDate.getFullYear();
      if (
        todayDate.getMonth() < birthDate.getMonth() ||
        (todayDate.getMonth() === birthDate.getMonth() && todayDate.getDate() < birthDate.getDate())
      ) {
        years--;
      }
      return years;
    };
    const fillForm = async () => {
      const index = await indexAdk('agreement');
      if (
        props.studentDoc.data.adks[index].completed !== undefined &&
        props.studentDoc.data.adks[index].completed != null &&
        typeof props.studentDoc.data.adks[index].completed === 'object'
      ) {
        completed.value = true;
      } else if (
        props.studentDoc.data.adks[index].envelopeId !== undefined &&
        props.studentDoc.data.adks[index].envelopeId != null &&
        props.studentDoc.data.adks[index].envelopeId.length > 0
      ) {
        const resp = await axios.post(
          `${props.docusignApiDomain}docusign/envelope/status`,
          {
            envelopeId:
              props.studentDoc.data.adks[index].envelopeId !== undefined
                ? props.studentDoc.data.adks[index].envelopeId
                : ''
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': '27a45e64-e427-4d09-8382-3c4b76952b03'
            }
          }
        );
        if (
          resp.status !== undefined &&
          resp.status === 200 &&
          resp.data.envelopeDetails.status === 'completed'
        ) {
          completed.value = true;
          completeAdk();
        } else if (
          resp.status !== undefined &&
          resp.status === 200 &&
          (resp.data.envelopeDetails.status === 'sent' ||
            resp.data.envelopeDetails.status === 'delivered')
        ) {
          editStatus.value = true;
          fillData();
        } else {
          fillData();
        }
      } else {
        fillData();
      }
    };
    const statusStudentChange = (name: string) => {
      if (name === 'dob') isAdultParticipant.value = !(getAge() < 18);
      studentChange.value = true;
      studentError.value = '';
      studentSuccess.value = '';
      studentagreementStatus.value = true;
    };
    const statusGuardianChange = () => {
      guardianChange.value = true;
      guardianError.value = '';
      guardianSuccess.value = '';
      guardianagreementStatus.value = true;
    };
    const changeFormStatus = computed(() => {
      // eslint-disable-next-line no-nested-ternary
      return studentData.value.hasOwnProperty('phoneVerified') &&
        studentData.value.phoneVerified.length === 0
        ? true
        : false ||
          (guardianData.value.hasOwnProperty('phoneVerified') &&
            guardianData.value.phoneVerified.length === 0 &&
            getAge() < 18)
        ? true
        : false || studentChange.value || guardianChange.value;
    });
    const phoneVerified = computed(() => {
      const status = props.userDoc.data.phoneVerified instanceof Date;
      return status;
    });
    const guardianphoneVerified = computed(() => {
      const status = guardianData.value.phoneVerified instanceof Date;
      return status;
    });
    const activityModifiedOn = () => {
      if (props.studentDoc.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
        props.studentDoc.data.adks[adkIndex].activityModifiedOn = new Date();
      }
    };
    const openAgreementDialog = async () => {
      const index = await indexAdk('agreement');
      if (
        props.studentDoc.data.adks[index].envelopeId !== undefined &&
        props.studentDoc.data.adks[index].envelopeId.length > 0 &&
        studentagreementStatus.value === false &&
        guardianagreementStatus.value === false
      ) {
        if (!isAdultParticipant.value) {
          ageDialog.value = true;
          editStatus.value = true;
          return;
        }
        let envelopeParams = {};
        if (isAdultParticipant.value) {
          envelopeParams = {
            envelopeId: props.studentDoc.data.adks[index].envelopeId,
            returnUrl: window.location.href,
            clientId: new ObjectId(studentData.value._id),
            name: `${studentData.value.firstName} ${studentData.value.lastName}`,
            email: studentData.value.email,
            isAdultParticipant: isAdultParticipant.value
          };
        } else {
          envelopeParams = {
            envelopeId: props.studentDoc.data.adks[index].envelopeId,
            returnUrl: window.location.href,
            clientId: new ObjectId(studentData.value._id),
            name: `${guardianData.value.firstName} ${guardianData.value.lastName}`,
            email: guardianData.value.email,
            isAdultParticipant: isAdultParticipant.value
          };
        }
        const data = await axios.post(`${props.docusignApiDomain}docusign/view`, envelopeParams, {
          headers: {
            'x-api-key': '27a45e64-e427-4d09-8382-3c4b76952b03'
          }
        });
        studentError.value = '';
        studentSuccess.value = '';
        guardianError.value = '';
        guardianSuccess.value = '';
        if (data.status !== undefined && data.status === 200) {
          window.open(data.data.viewUrl, '_self');
        }
      } else {
        const data = await axios.post(
          `${props.docusignApiDomain}docusign/envelope`,
          {
            name: `${studentData.value.firstName} ${studentData.value.lastName}`,
            email: studentData.value.email,
            returnUrl: window.location.href,
            clientId: new ObjectId(studentData.value._id),
            parentName: `${guardianData.value.firstName} ${guardianData.value.lastName}`,
            parentEmail: guardianData.value.email,
            employerRecord: props.studentDoc.data.offerDetails.employerRecord,
            isAdultParticipant: isAdultParticipant.value
          },
          {
            headers: {
              'x-api-key': '27a45e64-e427-4d09-8382-3c4b76952b03'
            }
          }
        );
        if (
          data.status !== undefined &&
          data.status === 200 &&
          data.data.envelopeId !== undefined &&
          data.data.envelopeId.length !== 0
        ) {
          props.studentDoc.data.adks[index].envelopeId = data.data.envelopeId;
          activityModifiedOn();
          await props.studentDoc.update();
          studentError.value = '';
          studentSuccess.value = '';
          guardianError.value = '';
          guardianSuccess.value = '';
          if (getAge() < 18) {
            ageDialog.value = true;
            fillForm();
          } else {
            window.open(data.data.viewUrl, '_self');
          }
        }
      }
    };
    const verifyStudent = async () => {
      await props.mongoUser.callFunction('twilioSend', formattedNumber.value).then(resp => {
        if (resp.hasOwnProperty('statusCode') && resp.statusCode === 200) {
          verificationUser.value = 'Personal';
          verificationCode.value = null;
          verifyDialog.value = true;
        } else {
          studentError.value = 'Invalid Phone number';
        }
      });
    };
    const isLoading = ref(false);
    const verifyStudentProfile = async () => {
      isLoading.value = true;
      const index = await indexAdk('agreement');
      await props.mongoUser
        .callFunction(
          'twilioVerify',
          formattedNumber.value,
          verificationCode.value,
          studentData.value._id.toString(),
          'student'
        )
        .then(async twiloresp => {
          if (twiloresp.hasOwnProperty('statusCode') && twiloresp.statusCode === 200) {
            await props.db
              .collection('User')
              .updateOne(
                { _id: new ObjectId(props.userDoc.data._id) },
                {
                  $set: {
                    firstName: studentData.value.firstName,
                    lastName: studentData.value.lastName,
                    phoneVerified: new Date()
                  }
                }
              )
              .then(async resp => {
                if (
                  resp.matchedCount !== undefined &&
                  resp.modifiedCount !== undefined &&
                  resp.matchedCount === 1 &&
                  resp.modifiedCount === 1
                ) {
                  await props.db
                    .collection('StudentPortfolio')
                    .updateOne(
                      { _id: new ObjectId(props.userDoc.data._id) },
                      {
                        $set: {
                          'home.streetAddress': studentData.value.studentAddress,
                          'home.city': studentData.value.city,
                          'home.state': studentData.value.state,
                          'home.zipcode': studentData.value.zipcode,
                          date: studentData.value.birth
                        }
                      }
                    )
                    .then(studentresp => {
                      if (
                        studentresp.matchedCount !== undefined &&
                        studentresp.modifiedCount !== undefined &&
                        studentresp.matchedCount === 1 &&
                        studentresp.modifiedCount === 1
                      ) {
                        verifyDialog.value = false;
                        verificationUser.value = '';
                        studentChange.value = false;
                        studentError.value = '';
                        studentSuccess.value = 'Successfully updated personal data!';
                        studentagreementStatus.value = false;
                        props.studentDoc.data.adks[index].envelopeId = '';
                        activityModifiedOn();
                        props.studentDoc.update();
                        props.userDoc.update();
                        fillForm();
                        isLoading.value = false;
                      } else {
                        isLoading.value = false;
                        studentError.value = 'Please enter valid details';
                      }
                    });
                  isLoading.value = false;
                } else {
                  isLoading.value = false;
                  studentError.value = 'Please enter valid details';
                }
              });
            isLoading.value = false;
          } else {
            studentError.value = 'Invalid Verification';
          }
        });
    };
    const goToMobile = () => {
      ctx.root.$router.push('/mobile');
    };
    const verifyGuardian = async () => {
      await props.mongoUser
        .callFunction('twilioSend', guardianData.value.phoneNumber)
        .then(resp => {
          if (resp.hasOwnProperty('status') && resp.status === 'success') {
            verificationCode.value = null;
            verificationUser.value = 'Guardian';
            verifyDialog.value = true;
          } else {
            error.value = 'Invalid Phone number';
          }
        });
    };
    const verifyDialogClose = () => {
      verifyDialog.value = false;
      verificationCode.value = null;
      studentError.value = '';
      guardianError.value = '';
    };
    const verifyGuardianProfile = async () => {
      const index = await indexAdk('agreement');
      await props.mongoUser
        .callFunction(
          'twilioVerify',
          guardianData.value.phoneNumber,
          verificationCode.value,
          guardianData.value._id.toString(),
          'guardian'
        )
        .then(async twiloresp => {
          if (twiloresp.hasOwnProperty('status') && twiloresp.status === 'success') {
            await props.db
              .collection('StudentPortfolio')
              .updateOne(
                { _id: new ObjectId(props.userDoc.data._id) },
                {
                  $set: {
                    'guardian.firstName': guardianData.value.firstName,
                    'guardian.lastName': guardianData.value.lastName,
                    'guardian.email': guardianData.value.email,
                    'guardian.phoneNumber': guardianData.value.phoneNumber,
                    'guardian.phoneVerified': new Date()
                  }
                },
                { upsert: true }
              )
              .then(studentresp => {
                if (
                  studentresp.matchedCount !== undefined &&
                  studentresp.modifiedCount !== undefined &&
                  studentresp.matchedCount === 1 &&
                  studentresp.modifiedCount === 1
                ) {
                  verifyDialog.value = false;
                  verificationUser.value = '';
                  guardianSuccess.value = 'Successfully updated guardian data!';
                  guardianError.value = '';
                  guardianChange.value = false;
                  guardianagreementStatus.value = false;
                  props.studentDoc.data.adks[index].envelopeId = '';
                  activityModifiedOn();
                  props.studentDoc.update();
                  props.userDoc.update();
                  fillForm();
                } else {
                  guardianError.value = 'Please enter correct details';
                }
              });
          } else {
            guardianError.value = 'Please enter correct verification code';
          }
        });
    };
    const changePhoneVerification = (type: string) => {
      if (type === 'student') {
        studentData.value.phoneVerified = '';
        isAdultParticipant.value = !(getAge() < 18);
        statusStudentChange('');
      } else if (type === 'guardian') {
        guardianData.value.phoneVerified = '';
        statusGuardianChange();
      }
    };
    function completeAdk() {
      if (props.studentDoc.data.adks[adkIndex].hasOwnProperty('activityEndedOn')) {
        props.studentDoc.data.adks[adkIndex].activityModifiedOn = new Date();
      } else {
        props.studentDoc.data.adks[adkIndex].activityEndedOn = new Date();
      }
      ctx.emit('calculate-timer');
      return props.studentDoc.update(() => ({
        isComplete: true,
        adkIndex
      }));
    }
    function getValidation(val) {
      if (val && val.countryCallingCode && val.formatted && val.valid) {
        formattedNumber.value = `+${val.countryCallingCode}${val.formatted}`;
      } else {
        formattedNumber.value = '';
      }
      isPhoneValid.value = val.valid;
    }
    const phoneValid = computed(() => {
      if (isPhoneValid.value && studentData.value.phoneNumber) {
        return true;
      }
      return false;
    });
    const isPhoneCheck = computed(() => {
      const substring = '+1';
      const substring1 = '+';
      if (
        studentData.value.phoneNumber.includes(substring) ||
        studentData.value.phoneNumber.includes(substring1)
      ) {
        return false;
      }
      return true;
    });
    return {
      studentData,
      formattedNumber,
      isLoading,
      phoneValid,
      isPhoneCheck,
      getValidation,
      completed,
      verifyDialog,
      verificationCode,
      guardianData,
      verificationUser,
      studentChange,
      guardianChange,
      changeFormStatus,
      studentError,
      guardianError,
      studentSuccess,
      enableEdit,
      guardianSuccess,
      isAdultParticipant,
      editStatus,
      ageDialog,
      goToMobile,
      statusGuardianChange,
      statusStudentChange,
      verifyDialogClose,
      guardianphoneVerified,
      verifyStudent,
      verifyGuardian,
      changePhoneVerification,
      openAgreementDialog,
      verifyGuardianProfile,
      verifyStudentProfile,
      phoneVerified,
      readonly,
      ...loading(
        completeAdk,
        'You have completed this activity',
        'There was an error please try again'
      )
    };
  }
});
</script>

<style lang="scss">
.dark-button {
  background-color: #000000 !important;
  color: #ffffff !important;
}
.module-default {
  &__complete-header {
    color: rgb(234, 103, 100) !important;
  }
  &__goto-discord {
    width: 100%;
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
  &__container-discord {
    // width: 100%;
    // padding: none;
    // margin: none;
    margin-top: 0px;
    padding: 0px;
    display: flex;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
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
