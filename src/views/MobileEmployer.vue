<template>
  <v-container class="mobile-employer__app d-flex justify-center flex-column">
    <ValidationObserver v-slot="{ invalid }">
      <Loading v-slot="{ loading }" :process-now="true" :callback="loadData">
        <v-skeleton-loader
          :loading="loading"
          type="heading, list-item-two-line, list-item-two-line, list-item-three-line"
        >
          <v-container v-if="user && programDocs.length" class="mobile-employer__dashboard pa-5">
            <div class="d-flex justify-center">
              <v-dialog
                v-model="programDialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    depressed
                    outlined
                    rounded
                    x-small
                    class="mobile-employer__employer mb-4"
                    v-on="on"
                    ><v-icon left>mdi-chevron-down</v-icon>
                    {{ selectedDoc.programName }}
                  </v-btn>
                </template>
                <v-card class="d-flex flex-column">
                  <div class="d-flex justify-end">
                    <v-btn class="ma-2" x-large icon dark @click="programDialog = false">
                      <v-icon x-large color="grey">mdi-close</v-icon>
                    </v-btn>
                  </div>
                  <v-container class="mt-auto mb-auto d-flex justify-center flex-column">
                    <div class="headline d-flex justify-center font-weight-bold mb-5">
                      Choose employer
                    </div>
                    <div
                      v-for="doc in programDocs"
                      :key="doc._id.toHexString()"
                      class="d-flex justify-center align-center mobile-employer__programselect"
                      @click="
                        selectedDoc = doc;
                        fetchParticipantData();
                        programDialog = false;
                      "
                    >
                      {{ doc.programName }}
                    </div>
                  </v-container>
                </v-card>
              </v-dialog>
            </div>
            <div><Profile :size="80" /></div>
            <v-card class="mobile-employer__padding-bottom d-flex flex-column justify-center" flat>
              <v-card-title
                class="mobile-employer__big-title mb-8 mt-8 font-weight-bold d-flex justify-center"
              >
                Monitor Internship</v-card-title
              >
              <div class="d-flex justify-center mb-10 flex-row">
                <v-tooltip bottom color="black">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      href="https://bit.ly/pilotcity_employer_ticket_submission"
                      target="_blank"
                      rounded
                      class="ma-2"
                      depressed
                      outlined
                      v-on="on"
                      ><v-icon left>mdi-ticket-confirmation-outline</v-icon>Request support</v-btn
                    >
                  </template>
                  <span
                    >Submit any issues, problems, feedback, ideas, or compliments to our team</span
                  >
                </v-tooltip>

                <!-- <v-tooltip bottom color="black">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      href="https://bit.ly/pilotcity_employer_ticket_submission"
                      target="_blank"
                      rounded
                      depressed
                      outlined
                      v-on="on"
                      >Get help now</v-btn
                    >
                  </template>
                  <span
                    >Submit any issues, problems, feedback, ideas, or compliments to our team</span
                  >
                </v-tooltip> -->

                <v-dialog v-model="getHelpNow" width="400px">
                  <template #activator="{ on, attrs }">
                    <v-btn v-bind="attrs" rounded class="ma-2" depressed outlined v-on="on"
                      ><v-icon left>mdi-face-agent</v-icon>Get help now</v-btn
                    >
                  </template>
                  <v-card class="mobile__deliverable-card2">
                    <v-container
                      class="mt-auto mb-auto d-flex justify-center flex-column pa-0 ma-0"
                    >
                      <div class="d-flex justify-center ma-6 flex-column">
                        <div class="d-flex justify-center ma-4">
                          <v-avatar size="75">
                            <img
                              src="https://d3v0px0pttie1i.cloudfront.net/uploads/user/avatar/391015/737078c6.jpg"
                              alt="Jeff"
                            />
                          </v-avatar>
                        </div>
                        <!-- <div class="headline font-weight-bold d-flex justify-center mobile__title">
                          Jeff Louie
                        </div> -->
                        <div class="d-flex justify-center ma-2">
                          <h1>Jeff Louie</h1>
                        </div>
                        <!-- <v-divider></v-divider> -->

                        <div class="d-flex justify-center ma-2">
                          <h3>Program Director</h3>
                        </div>
                        <div class="d-flex justify-center ma-2">
                          <h3>jefflouie@pilotcity.com</h3>
                        </div>
                        <div class="d-flex justify-center ma-2"><h3>(650) 539-9024</h3></div>
                      </div>
                      <div class="d-flex justify-center">
                        <v-btn
                          target="_blank"
                          rounded
                          depressed
                          dark
                          large
                          color="blue"
                          href="https://calendly.com/jeffreylouie"
                        >
                          <!-- <v-icon left>mdi-broadcast</v-icon> -->
                          Scheduling App</v-btn
                        >
                      </div>

                      <!-- <div class="d-flex justify-center flex-column ma-6">
                        <h5 class="mobile__title">
                          When is it? As early as Thursday throughout August!
                        </h5>
                      </div> -->
                    </v-container>

                    <div class="d-flex justify-center">
                      <v-btn
                        class="mb-8 mt-10"
                        rounded
                        color="grey"
                        depressed
                        outlined
                        @click="getHelpNow = false"
                      >
                        Close
                      </v-btn>
                    </div>
                  </v-card>
                </v-dialog>
              </div>

              <v-dialog
                v-if="internshipStatusDialog"
                v-model="internshipStatusDialog"
                width="500px"
                persistent
              >
                <v-card>
                  <v-card-title class="d-flex flex-column justify-center">
                    <span class="headline mt-1 mb-1">Confirm completion of internship for</span>
                    <span class="headline font-weight-bold mt-1 mb-1">
                      {{ selectedStudent.userDocs.firstName }}
                      {{ selectedStudent.userDocs.lastName }}
                    </span>
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-container class="d-flex justify-center flex-column">
                    <v-row class="d-flex justify-center mt-3 mb-5">
                      <v-btn
                        class="ma-2"
                        rounded
                        dark
                        x-large
                        color="red"
                        depressed
                        @click="closeInternshipStatusDialog()"
                      >
                        {{ 'Not yet' }}
                      </v-btn>

                      <v-btn
                        class="ma-2 white--text"
                        rounded
                        depressed
                        x-large
                        color="green"
                        @click="finishInternship()"
                        ><v-icon left>mdi-party-popper</v-icon> {{ 'Signoff' }}</v-btn
                      >
                    </v-row>
                    <!-- <div class="mb-6 mt-3 justify-center d-flex">
                      <v-tooltip max-width open-on-hover top>
                        <template #activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on">mdi-information</v-icon>
                          <div class="d-flex align-center ml-2">
                            <h5 class="grey--text darken-1">
                              <i>Why is the Signoff button disabled?</i>
                            </h5>
                          </div>
                        </template>

                        <span
                          ><h5>
                            The signoff will enable after final presentations or when announced
                          </h5></span
                        >
                      </v-tooltip>
                    </div> -->
                  </v-container>
                </v-card>

                <!-- <v-card class="mobile__deliverable-card2">
                  <v-container class="mt-auto mb-auto d-flex justify-center flex-column pa-0 ma-0">
                    <div class="d-flex justify-center ma-6 flex-column">
                      <div class="d-flex justify-center ma-2">
                        <h2 class="d-flex justify-center mobile__title">
                          {{
                            'Are you sure you want to officially sign off completion of the following intern? ' +
                            selectedStudent.userDocs.firstName +
                            ' ' +
                            selectedStudent.userDocs.lastName +
                            ' '
                          }}
                        </h2>
                      </div>
                    </div>
                    <div class="d-flex justify-center">
                      <v-btn rounded depressed dark large color="blue" @click="finishInternship()">
                        {{ 'Confirm' }}</v-btn
                      >
                    </div>
                  </v-container>

                  <div class="d-flex justify-center">
                    <v-btn
                      class="mb-8 mt-6"
                      rounded
                      color="grey"
                      depressed
                      outlined
                      @click="closeInternshipStatusDialog()"
                    >
                      {{ 'Close' }}
                    </v-btn>
                  </div>
                </v-card> -->
              </v-dialog>

              <div class="headline font-weight-bold d-flex justify-center mt-12 mb-6">
                Signoff
                <v-tooltip max-width open-on-hover bottom>
                  <template #activator="{ on, attrs }">
                    <v-icon class="ml-2" v-bind="attrs" v-on="on">mdi-information</v-icon>
                  </template>
                  <span>Click on an intern to signoff on completion of their internship</span>
                </v-tooltip>
              </div>
              <div class="d-flex justify-center mb-12 pl-12 pr-12">
                <h5 class="grey--text">
                  Signoff on internship completion by clicking checkbox & confirming
                </h5>
              </div>

              <div
                v-for="participantsvalue in participants"
                :key="participantsvalue._id.toHexString()"
                class="d-flex flex-row align-center"
              >
                <v-checkbox
                  v-model="disabledStudents"
                  :disabled="checkDisabledStatus(participantsvalue.adks)"
                  :label="
                    participantsvalue.userDocs.firstName + ' ' + participantsvalue.userDocs.lastName
                  "
                  :value="participantsvalue.participant_id.toHexString()"
                  @change="onChange(participantsvalue)"
                ></v-checkbox
                ><v-chip
                  class="ml-3 font-weight-bold"
                  small
                  dark
                  :color="
                    participantsvalue.clockAdjust >= selectedDoc.adks.offer.offer[0].minHours
                      ? 'green'
                      : participantsvalue.clockAdjust <
                        selectedDoc.adks.offer.offer[0].minHours * 0.25
                      ? 'red'
                      : participantsvalue.clockAdjust <
                        selectedDoc.adks.offer.offer[0].minHours * 0.5
                      ? 'orange'
                      : 'yellow'
                  "
                  >{{
                    participantsvalue.clockAdjust +
                    ' of ' +
                    selectedDoc.adks.offer.offer[0].minHours +
                    ' Min Hours Met'
                  }}
                </v-chip>
              </div>

              <div class="headline font-weight-bold d-flex justify-center mt-12 mb-12">
                Announce
              </div>

              <div class="d-flex flex-row">
                <v-text-field
                  v-model="messageContent"
                  rounded
                  outlined
                  label="Post announcement to all interns on Discord"
                ></v-text-field
                ><v-btn
                  class="ml-2"
                  depressed
                  dark
                  x-large
                  rounded
                  color="purple"
                  :loading="postMessage.loading.value"
                  @click="postMessage.process()"
                  >Post</v-btn
                >
              </div>

              <v-alert
                v-if="postMessage.success.value || postMessage.error.value"
                dense
                class="mt-3 white--text presets__alert"
                :color="postMessage.success.value ? 'green' : 'red'"
                >{{ postMessage.message.value }}</v-alert
              >

              <div class="headline font-weight-bold d-flex justify-center mt-12 mb-12">
                Timesheets
              </div>
              <div class="d-flex justify-center flex-row">
                <v-btn
                  color="green"
                  class="mt-3 mr-3 white--text"
                  rounded
                  x-large
                  depressed
                  :disabled="adkLocalState.mobile.clockIn ? false : ''"
                  :href="adkLocalState.mobile.clockIn"
                  target="_blank"
                >
                  See clock-ins
                </v-btn>

                <v-text-field
                  v-model="adkLocalState.mobile.clockIn"
                  label="Clock-ins"
                  hint="https://www.videoask.com/tag-specific-id"
                  class="mt-3 mb-3"
                  rounded
                  outlined
                ></v-text-field>
              </div>

              <div class="d-flex justify-center flex-row">
                <v-btn
                  color="red"
                  class="mt-3 mr-3 white--text"
                  rounded
                  x-large
                  depressed
                  :disabled="adkLocalState.mobile.clockOut ? false : ''"
                  :href="adkLocalState.mobile.clockOut"
                  target="_blank"
                >
                  See clock-outs
                </v-btn>

                <v-text-field
                  v-model="adkLocalState.mobile.clockOut"
                  label="Clock-outs"
                  hint="https://www.videoask.com/tag-specific-id"
                  class="mt-3 mb-3"
                  rounded
                  outlined
                ></v-text-field>
              </div>

              <div class="headline font-weight-bold d-flex justify-center mt-12 mb-12">
                Deliverables
              </div>

              <div class="d-flex justify-center flex-row">
                <v-btn
                  color="purple"
                  class="mt-3 mr-3 white--text"
                  rounded
                  x-large
                  depressed
                  :disabled="adkLocalState.mobile.deliverable ? false : ''"
                  :href="adkLocalState.mobile.deliverable"
                  target="_blank"
                >
                  See deliverables
                </v-btn>

                <v-text-field
                  v-model="adkLocalState.mobile.deliverable"
                  label="Deliverables"
                  hint="https://www.airtable.com/employer-specific-deliverables-link"
                  class="mt-3 mb-3"
                  rounded
                  outlined
                ></v-text-field>
              </div>

              <!-- PREVIEW DELIVERABLES -->

              <!-- PREVIEW DELIVERABLES -->
              <div class="headline font-weight-bold d-flex justify-center mt-12 mb-3">
                Objective
              </div>
              <validation-provider v-slot="{ errors }" slim rules="required">
                <v-text-field
                  v-model="adkLocalState.objective.primaryObjective"
                  class="mt-12"
                  outlined
                  rounded
                  :error-messages="errors"
                  label="Employer Objective"
                ></v-text-field>
              </validation-provider>
              <v-row v-for="(keyResult, i) in adkLocalState.objective.keyResults" :key="i">
                <v-col cols="11">
                  <validation-provider v-slot="{ errors }" slim rules="required">
                    <v-text-field
                      v-model="adkLocalState.objective.keyResults[i]"
                      outlined
                      hide-details
                      rounded
                      :label="`Key Result #${i + 1}`"
                      :error-messages="errors"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="1">
                  <v-btn
                    class="mt-2"
                    icon
                    dark
                    @click="adkLocalState.objective.keyResults.splice(i, 1)"
                  >
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn
                v-if="adkLocalState.objective.keyResults.length < 10"
                class="mb-3 mt-6"
                rounded
                x-large
                outlined
                depressed
                :disabled="
                  adkLocalState.objective.keyResults[
                    adkLocalState.objective.keyResults.length - 1
                  ] === ''
                "
                @click="adkLocalState.objective.keyResults.push('')"
                ><v-icon x-large>mdi-plus</v-icon></v-btn
              >

              <div class="headline font-weight-bold d-flex justify-center mt-12 mb-12">
                Directory
              </div>

              <!-- contact methods -->
              <div class="overline font-weight-black d-flex mb-3">
                What are your preferred contact methods?
              </div>
              <validation-provider v-slot="{ errors }" slim rules="required">
                <v-checkbox
                  v-for="contactMethod in Object.values(ContactMethod)"
                  :key="contactMethod"
                  v-model="myDirectoryPreferences.contactMethods"
                  class="text-h6"
                  dense
                  :label="contactMethod"
                  :value="contactMethod"
                  :error-messages="errors"
                ></v-checkbox>
              </validation-provider>

              <!-- for the scheduling link  -->
              <v-text-field
                v-model="myDirectoryPreferences.schedulingLink"
                rounded
                class="mt-6 mb-3"
                label="What is the link to your scheduling app?"
                outlined
                hide-details
              ></v-text-field>

              <!-- contact preference -->
              <div class="overline font-weight-black d-flex mt-10 mb-3">
                What is your as needed contact preferences?
              </div>
              <validation-provider v-slot="{ errors }" slim rules="required">
                <v-checkbox
                  v-for="contactPreference in Object.values(ContactPreference)"
                  :key="contactPreference"
                  v-model="myDirectoryPreferences.contactPreferences"
                  class="text-h6"
                  dense
                  :label="contactPreference"
                  :value="contactPreference"
                  :error-messages="errors"
                ></v-checkbox>
              </validation-provider>
              <!-- hide preference -->
              <div class="overline font-weight-black d-flex mt-10 mb-3">
                Are there any contact info you’d like to hide?
              </div>
              <v-checkbox
                v-model="myDirectoryPreferences.hideEmail"
                class="text-h6"
                dense
                label="Hide Email"
              ></v-checkbox>
              <v-checkbox
                v-model="myDirectoryPreferences.hidePhone"
                class="text-h6"
                dense
                label="Hide Phone"
              ></v-checkbox>

              <div class="headline font-weight-bold d-flex justify-center mt-12 mb-12">
                Weekly Meeting
              </div>

              <validation-provider v-slot="{ errors }" slim rules="required">
                <v-select
                  v-model="adkLocalState.mobile.weeklyMeetingDay"
                  class="mt-3 mb-3"
                  rounded
                  outlined
                  :error-messages="errors"
                  :items="Object.values(MeetingDay)"
                  label="Select recurring weekly meeting day between Jul 5 - Aug 27"
                ></v-select>
              </validation-provider>
              <validation-provider v-slot="{ errors }" slim rules="required">
                <v-select
                  v-model="adkLocalState.mobile.weeklyMeetingTime"
                  class="mt-3 mb-3"
                  rounded
                  :error-messages="errors"
                  :items="Object.values(MeetingTime)"
                  outlined
                  label="Select recurring weekly meeting start & end time"
                ></v-select>
              </validation-provider>
              <validation-provider v-slot="{ errors }" slim rules="required">
                <v-select
                  v-model="adkLocalState.mobile.weeklyMeetingCadence"
                  class="mt-3 mb-3"
                  rounded
                  outlined
                  :error-messages="errors"
                  :items="Object.values(MeetingCadence)"
                  label=" Repeat recurring meeting every"
                ></v-select>
              </validation-provider>
              <validation-provider v-slot="{ errors }" slim rules="required">
                <v-text-field
                  v-model="adkLocalState.mobile.weeklyConferenceLink"
                  :error-messages="errors"
                  label="Recurring weekly conference meeting link"
                  hint="https://zoom.us/j/91663376992 or https://meet.google.com/abc-efgh-khw"
                  class="mt-3 mb-3"
                  rounded
                  outlined
                ></v-text-field>
              </validation-provider>

              <div class="headline font-weight-bold d-flex justify-center mt-12 mb-12">
                Agreement
              </div>
              <v-text-field
                v-model="adkLocalState.objective.agreementLink"
                class="mt-3 mb-3"
                outlined
                rounded
                label="Do you have a custom agreement document you'd like students to sign? If so, please enter a link to the document below (Example: drive.google.com/dDfju3xD)"
              ></v-text-field>

              <v-text-field
                v-model="adkLocalState.objective.agreementInstructions"
                class="mt-3 mb-3"
                outlined
                rounded
                label="If you have a custom agreement or document, please write instructions for students to fill, sign and send the agreement back to you"
              ></v-text-field>

              <div class="headline font-weight-bold d-flex justify-center mt-12 mb-12">
                Coworking
              </div>
              <v-text-field
                v-model="adkLocalState.mobile.discordEmployerChannel"
                class="mt-3 mb-3"
                outlined
                rounded
                label="Employer Discord Channel"
              ></v-text-field>
              <div class="headline font-weight-bold d-flex justify-center mt-12 mb-12">
                Final Presentation Date
              </div>
              <v-text-field
                v-model="adkLocalState.mobile.finalPresentation"
                class="mt-3 mb-3"
                outlined
                rounded
                label="Final Presentation Date"
              ></v-text-field>
            </v-card>
          </v-container>

          <v-container class="mobile-employer__toolbox d-flex justify-center flex-column">
            <v-divider></v-divider>
            <v-btn
              class="mt-8"
              rounded
              x-large
              depressed
              dark
              :loading="saveAllLoading"
              :disabled="invalid"
              @click="saveAllAdks"
              >Save</v-btn
            >
          </v-container>
        </v-skeleton-loader>
      </Loading>
    </ValidationObserver>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';

import { ObjectId } from 'bson';
import axios from 'axios';
import { loading } from 'pcv4lib/src';
import { useUserGetters, useDbGetters } from '@/store';
import Loading from '@/components/Loading.vue';
import Profile from '@/components/Profile.vue';
import { IProgramDoc, defaultAdkState } from './MobileEmployer/types/program';
import { AdkName, IProgramAdk } from './MobileEmployer/types/adk';
import { MeetingDay, MeetingTime, MeetingCadence } from './MobileEmployer/types/mobile';
import {
  ContactMethod,
  ContactPreference,
  DirectorySettings
} from './MobileEmployer/types/directory';

export default defineComponent({
  name: 'MobileEmployer',

  components: {
    Loading,
    Profile
  },

  setup(props, ctx) {
    const { collection } = useDbGetters(['collection']);
    const { getObjectId } = useUserGetters(['getUser', 'getObjectId']);
    const programDocs = ref<Array<IProgramDoc>>([]);
    const messageContent = ref('');
    const user = ref<
      | {
          _id: ObjectId;
          firstName: string;
          lastName: string;
          profile: {
            medium: string;
          };
        }
      | undefined
    >();
    const adkLocalState = ref<typeof defaultAdkState>({ ...defaultAdkState });
    const participants = ref([]);
    const internshipStatusDialog = ref(false);
    const disabledStudents = ref([]);
    const selectedStudent = ref({});

    const myDirectoryPreferences = computed<DirectorySettings | undefined>({
      get: () => {
        if (!user.value) return undefined;
        return adkLocalState.value.directory.directoryPreferences.find(preferences =>
          preferences.userId.equals(user.value!._id)
        );
      },
      set: newVal => {
        if (!user.value || !newVal) return;
        const myDirectoryIndex = adkLocalState.value.directory.directoryPreferences.findIndex(
          preferences => preferences.userId.equals(user.value!._id)
        );
        if (myDirectoryIndex === -1)
          adkLocalState.value.directory.directoryPreferences.push(newVal);
        else adkLocalState.value.directory.directoryPreferences[myDirectoryIndex] = newVal;
      }
    });

    const _selectedDoc = ref<IProgramDoc>();
    /**
     * Computed, current `studentDoc`.
     * The setter inserts default values into the local state
     * and updates `adkLocalState` to match the specific doc.
     */
    const selectedDoc = computed({
      get: () => _selectedDoc.value,
      set: newVal => {
        _selectedDoc.value = newVal;
        if (newVal) {
          // loop through the different adk objects (keys of AdkState) and set default values if needed.
          Object.keys(adkLocalState.value).forEach(adk => {
            adkLocalState.value[adk] = newVal.adks[adk]
              ? { ...newVal.adks[adk] }
              : { ...defaultAdkState[adk] };
          });
          // set default value for myDirectoryPreferences. kinda jank but fine for now.
          if (!myDirectoryPreferences.value)
            myDirectoryPreferences.value = {
              userId: user.value!._id,
              contactMethods: [],
              contactPreferences: [],
              hideEmail: false,
              hidePhone: false
            };
        }
      }
    });

    const programDialog = ref(false);

    const checkDisabledStatus = adksArray => {
      const adkMobile = adksArray.filter(o => o.name === 'mobile');
      return adkMobile[0] !== undefined && adkMobile[0].internshipCompletion !== undefined
        ? adkMobile[0].internshipCompletion
        : false;
    };

    const fetchParticipantData = async () => {
      const query = [
        {
          $match: {
            participant_id: { $in: selectedDoc?.value?.participants },
            program_id: selectedDoc?.value?._id,
            $and: [{ 'adks.name': 'offer' }, { 'adks.offerStatus': true }]
          }
        },
        {
          $lookup: {
            from: 'User',
            foreignField: '_id',
            localField: 'participant_id',
            as: 'userDocs'
          }
        },
        {
          $unwind: {
            path: '$userDocs',
            includeArrayIndex: 'index'
          }
        }
      ];

      participants.value = await collection.value!('Student').aggregate(query);
      participants.value.forEach((participantsdata, index) => {
        const mobileAdk = participantsdata.adks.filter(o => o.name === 'mobile');
        participants.value[index].clockAdjust =
          mobileAdk[0]?.clockAdjustedHours === undefined ? '' : mobileAdk[0]?.clockAdjustedHours;
        if (
          mobileAdk[0] !== undefined &&
          mobileAdk[0].internshipCompletion !== undefined &&
          mobileAdk[0].internshipCompletion
        ) {
          disabledStudents.value.push(participantsdata.participant_id.toHexString());
        }
      });
      participants.value.sort((a, b) => {
        if (a.clockAdjust > b.clockAdjust) return -1;
        return a.clockAdjust < b.clockAdjust ? 1 : 0;
      });
    };

    const loadData = async () => {
      user.value = await collection.value!('User').findOne(
        {
          _id: getObjectId.value
        },
        {
          projection: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            profile: {
              medium: 1
            }
          }
        }
      );

      programDocs.value = (
        await collection.value!('Program').find(
          {
            organizers: getObjectId.value,
            adks: {
              $exists: true
            }
          },
          {
            projection: {
              programName: 1,
              organizers: 1,
              adks: 1,
              participants: 1
            }
          }
        )
      ).map((program): IProgramDoc => {
        return {
          ...program,
          adks: {
            participants: program.participants,
            offer: program.adks.find((adk: { name: AdkName }) => adk.name === 'offer'),
            mobile: program.adks.find((adk: { name: AdkName }) => adk.name === 'mobile'),
            directory: program.adks.find((adk: { name: AdkName }) => adk.name === 'directory'),
            objective: program.adks.find((adk: { name: AdkName }) => adk.name === 'objective')
          }
        };
      });

      [selectedDoc.value] = programDocs.value;

      await fetchParticipantData();

      if (!selectedDoc.value) ctx.root.$router.push({ name: 'landing' });
    };

    /**
     * Get a specific adk object stored in the db.
     */
    function getAdk<Adk extends IProgramAdk>(adk: Adk['name']) {
      return selectedDoc.value?.adks[adk];
    }

    /**
     * Save specific adk object to the db.
     */
    async function saveAdk<Adk extends IProgramAdk>(adk: Adk['name']) {
      const adkObj = adkLocalState.value[adk];
      if (!adkObj) throw new Error(`cannot save ${adk}, the value is ${adkObj}`);
      if (!selectedDoc.value?.adks[adk]) {
        try {
          await collection.value!('Program').updateOne(
            {
              _id: selectedDoc.value?._id
            },
            {
              $push: {
                adks: adkObj
              }
            }
          );
          selectedDoc.value!.adks[adk] = adkObj;
        } catch (e) {
          console.log(`Error while pushing new ${adk} adk with value ${adkObj} to programDoc`);
          throw e;
        }
      } else {
        try {
          await collection.value!('Program').updateOne(
            {
              _id: selectedDoc.value?._id,
              adks: { $elemMatch: { name: adk } }
            },
            {
              $set: {
                'adks.$': adkObj
              }
            }
          );
          selectedDoc.value.adks[adk] = adkObj;
        } catch (e) {
          console.log(`Error while setting ${adk} adk to ${adkObj}`);
          throw e;
        }
      }
    }

    const saveAllLoading = ref(false);
    async function saveAllAdks() {
      saveAllLoading.value = true;
      // have to use any here, typescript complains that string doesn't cast to AdkName
      const requests = Object.keys(adkLocalState.value).map((adk: any) => saveAdk(adk));
      await Promise.all(requests);
      saveAllLoading.value = false;
    }

    async function postMessageOnDiscord() {
      let result;
      const content = `${messageContent.value}\n\n - ${user.value.firstName} ${user.value.lastName}`;
      await axios
        .post(`${process.env.VUE_APP_API_ENDPOINT}newdiscord/sendmessage`, {
          programName: selectedDoc.value?.programName,
          message: content
        })
        .then(res => {
          result = res.data;
        })
        .catch(err => {
          console.log('post message error: ', err);
          result = err;
        });
      return result;
    }

    // for the links
    const test1 = ref('');
    const test2 = ref('');
    const test3 = ref('');

    function onChange(participantData) {
      selectedStudent.value = participantData;
      internshipStatusDialog.value = true;
    }

    const finishInternship = async () => {
      await collection.value!('Student').updateOne(
        {
          participant_id: selectedStudent.value?.participant_id,
          program_id: selectedStudent.value?.program_id,
          adks: { $elemMatch: { name: 'mobile' } }
        },
        {
          $set: {
            'adks.$.internshipCompletion': true
          }
        }
      );
      await fetchParticipantData();
      selectedStudent.value = {};
      internshipStatusDialog.value = false;
    };

    const closeInternshipStatusDialog = () => {
      disabledStudents.value.splice(
        disabledStudents.value.indexOf(selectedStudent.value._id.toHexString()),
        1
      );
      selectedStudent.value = {};
      internshipStatusDialog.value = false;
    };

    return {
      loadData,
      user,
      programDialog,
      participants,
      programDocs,
      selectedDoc,
      adkLocalState,
      MeetingDay,
      MeetingTime,
      MeetingCadence,
      myDirectoryPreferences,
      ContactMethod,
      ContactPreference,
      internshipStatusDialog,
      disabledStudents,
      selectedStudent,
      fetchParticipantData,
      finishInternship,
      closeInternshipStatusDialog,
      onChange,
      getAdk,
      saveAllAdks,
      checkDisabledStatus,
      saveAllLoading,
      test1,
      test2,
      test3,
      getHelpNow: false,
      messageContent,
      postMessage: loading(postMessageOnDiscord, null, null)
    };
  }
});
</script>

<style lang="scss">
.mobile-employer {
  &__app {
    width: 50vw;
    height: 100vh;
  }

  &__dashboard {
    height: 100vh;
    width: 50vw;
    overflow-y: scroll;
  }
  &__toolbox {
    background-color: #ffffff;
    height: fit-content;
    width: 50vw;
    position: fixed;
    bottom: 0;
  }

  &__cowork {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background-color: #ae90b0;
    &:hover {
      background-color: #886197;
      cursor: pointer;
    }
    &:active {
      background-color: #5e386d;
      cursor: pointer;
    }
  }

  &__clockin {
    border-radius: 50%;
    width: 75px;
    height: 75px;
    background-color: #fec34b;
    &:hover {
      background-color: #dba12d;
      cursor: pointer;
    }
    &:active {
      background-color: #b87f0d;
      cursor: pointer;
    }
  }

  &__calendar {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background-color: #3c9ccc;
    &:hover {
      background-color: #2482b1;
      cursor: pointer;
    }
    &:active {
      background-color: #0a5f8a;
      cursor: pointer;
    }
  }

  &__deliverables {
    width: 100%;
    padding-left: 15px;
  }

  &__deliverables2 {
    width: 75%;
  }

  &__title {
    text-align: center;
  }
  &__employer {
    text-align: center;
  }

  &__closedirectory {
    width: 100%;
  }
  &__programselect {
    border: 1px solid #404142;
    border-radius: 30px;
    word-wrap: break-word;
    width: 100%;
    padding: 10px 20px 10px 20px;
    margin: 10px 0px 10px 0px;
    min-height: 44px;
    text-align: center;
    font-family: 'Montserrat';
    text-transform: uppercase;
    letter-spacing: 0.0892857143em;
    font-size: 14px;
    font-weight: 500;
    &:hover {
      background-color: #dedede;
      cursor: pointer;
    }
    &:active {
      background-color: #bdbdbd;
      cursor: pointer;
    }
  }

  &__padding-bottom {
    padding-bottom: 125px;
  }

  &__big-title {
    font-size: 2rem;
  }
}
</style>
