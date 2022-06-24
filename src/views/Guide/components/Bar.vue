<template>
  <div class="guide-bar">
    <div v-if="operationMode !== OperationMode.Monitor" class="guide-bar__expand">
      <div @click="openGuideBar">
        <v-tooltip right color="black">
          <template #activator="{ on, attrs }"
            ><v-icon v-bind="attrs" color="#404142" class="guide-bar__sidebar-icon" v-on="on">{{
              expand ? 'mdi-chevron-double-left' : 'mdi-chevron-double-right'
            }}</v-icon>
          </template>
          <span>Collapse</span>
        </v-tooltip>
      </div>

      <v-divider class="grey lighten-1"></v-divider>

      <div v-if="operationMode === OperationMode.Participant" @click="activeStep = unlockedStep">
        <v-tooltip right color="black">
          <template #activator="{ on, attrs }"
            ><v-icon v-bind="attrs" color="green" class="guide-bar__sidebar-icon" v-on="on"
              >mdi-transit-connection-variant</v-icon
            >
          </template>
          <span>Program Guide</span>
        </v-tooltip>
      </div>

      <div v-if="operationMode === OperationMode.Setup" @click="activeStep = unlockedStep">
        <v-tooltip right color="black">
          <template #activator="{ on, attrs }"
            ><v-icon v-bind="attrs" color="orange" class="guide-bar__sidebar-icon" v-on="on"
              >mdi-progress-wrench</v-icon
            >
          </template>
          <span>Setup Program</span>
        </v-tooltip>
      </div>

      <div v-if="operationMode === OperationMode.Setup && isPublished">
        <v-tooltip right color="black">
          <template #activator="{ on, attrs }"
            ><v-icon
              v-bind="attrs"
              color="#404142"
              class="guide-bar__sidebar-icon"
              v-on="on"
              @click="
                $router.push({
                  name: 'Monitor',
                  query: { program: programDoc.data._id.toString() }
                })
              "
              >mdi-monitor-dashboard</v-icon
            >
          </template>
          <span>Monitor Program</span>
        </v-tooltip>
      </div>

      <v-divider class="grey lighten-1"></v-divider>

      <router-link :to="{ name: 'portfolio' }">
        <v-tooltip right color="black">
          <template #activator="{ on, attrs }"
            ><v-icon v-bind="attrs" color="#404142" class="guide-bar__sidebar-icon" v-on="on"
              >mdi-fingerprint</v-icon
            >
          </template>
          <span>My Portfolio</span>
        </v-tooltip>
      </router-link>
    </div>
    <v-expand-x-transition>
      <v-card
        v-show="expand"
        v-if="operationMode !== OperationMode.Monitor"
        class="program-card"
        :class="expand ? 'openGuidebar' : 'closedGuidebar'"
      >
        <div class="guide-bar__container">
          <div class="d-flex justify-start mr-auto">
            <v-btn rounded disabled x-small outlined depressed>PilotCity Flagship</v-btn>
          </div>
          <div class="d-flex justify-start guide-bar__title mr-auto">{{ title }}</div>

          <!-- <a
            v-if="operationMode === OperationMode.Setup"
            href="/employer"
            target="_blank"
            style="text-decoration: none"
          >
            <v-btn color="grey darken-4" small outlined class="font-weight-bold" rounded depressed
              ><v-icon left>mdi-open-in-new</v-icon>Setup Guide</v-btn
            >
          </a> -->
          <!-- ORGANIZER SETUP MODE -->
          <v-stepper vertical class="guide-bar__stepper">
            <!-- Project activities -->
            <v-stepper-step
              class="category guide-bar__timeline-category"
              color="black"
              :complete-icon="'mdi-lightbulb-on'"
              :edit-icon="'$radioOff'"
              :complete="true"
              :editable="false"
              :step="0"
              @click="toggleCategory('pre')"
              >Project</v-stepper-step
            >
            <v-stepper-content
              v-show="showPreInternshipSteps"
              class="category-stepper-content"
              :step="0"
            />
            <transition-group name="steps-list-transition" tag="div">
              <template v-for="(item, index) in projectItems">
                <v-tooltip :key="`${item.step}-${index}-tooltip`" right>
                  <template #activator="{ on, attrs }">
                    <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on"> Button </v-btn> -->
                    <div class="v-stepper-step-container" v-bind="attrs" v-on="on">
                      <v-stepper-step
                        v-show="showPreInternshipSteps"
                        :key="`${item.step}-${index}-step`"
                        :color="getIconColor(index, item)"
                        :step="index + 1"
                        :edit-icon="'$radioOff'"
                        :complete-icon="getCompletedIcon()"
                        :complete="isStepCompleted(item)"
                        :editable="index === nextUnlockedAdkIndex"
                        @click="
                          changeStep(index, 'pre');
                          mobileExpand();
                        "
                      >
                        <div class="guide-bar__timeline-item">
                          {{ item.step }}
                          <div v-if="operationMode === OperationMode.Setup">
                            <v-btn
                              v-if="needsetup.includes(item.step)"
                              class="guide-bar__timeline-item-setup white--text font-weight-bold"
                              color="orange"
                              small
                              depressed
                              :disabled="!item.unlocked"
                              >Setup</v-btn
                            >
                          </div>
                          <div v-if="adksWithPreviewMode.includes(item.step) && previewEnabled">
                            <v-btn
                              class="guide-bar__timeline-item-setup font-weight-bold"
                              active-class="active-class"
                              dark
                              small
                              depressed
                              >Preview<v-icon x-small right>mdi-eye</v-icon></v-btn
                            >
                          </div>
                        </div>
                      </v-stepper-step>
                    </div>
                  </template>
                  <span v-if="!!item.tooltip">{{ item.tooltip }}</span>
                </v-tooltip>

                <v-stepper-content
                  v-show="showPreInternshipSteps"
                  :key="`${index}-content`"
                  :step="index + 1"
                />
              </template>
            </transition-group>
            <!-- End of project activities -->

            <!-- Internship activities -->
            <template v-if="studentStatus === StudentStatus.studentAcceptedOffer">
              <v-stepper-step
                class="category guide-bar__timeline-category"
                color="black"
                :complete-icon="'mdi-rocket-launch'"
                :edit-icon="'$radioOff'"
                :complete="true"
                :editable="false"
                :step="0"
                @click="toggleCategory('post')"
                >Internship
              </v-stepper-step>
              <v-stepper-content
                v-show="showInternshipSteps"
                class="category-stepper-content"
                :step="0"
              />
              <transition-group name="steps-list-transition" tag="div">
                <template v-for="(item, index) in internshipItems">
                  <v-tooltip :key="`${item.step}-${index}-tooltip`" bottom>
                    <template #activator="{ on, attrs }">
                      <div class="v-stepper-step-container" v-bind="attrs" v-on="on">
                        <v-stepper-step
                          v-show="showInternshipSteps"
                          :key="`${item.step}-${index + projectItems.length}-step`"
                          :color="
                            index + projectItems.length === nextUnlockedAdkIndex
                              ? 'yellow'
                              : 'hsla(200, 59%, 52%, 1)'
                          "
                          :step="index + projectItems.length + 1"
                          :edit-icon="'$radioOff'"
                          :complete-icon="'$complete'"
                          :complete="
                            !!item.unlocked || index + projectItems.length === nextUnlockedAdkIndex
                          "
                          :editable="index + projectItems.length === nextUnlockedAdkIndex"
                          @click="changeStep(index + projectItems.length, 'post')"
                        >
                          <div class="guide-bar__timeline-item">
                            {{ item.step }}
                            <div v-if="operationMode === OperationMode.Setup">
                              <v-btn
                                v-if="needsetup.includes(item.step)"
                                class="guide-bar__timeline-item-setup"
                                color="orange"
                                outlined
                                x-small
                                depressed
                                >Setup</v-btn
                              >
                            </div>
                          </div>
                        </v-stepper-step>
                      </div>
                    </template>
                    <span v-if="!!item.tooltip">{{ item.tooltip }}</span>
                  </v-tooltip>

                  <v-stepper-content
                    v-show="showInternshipSteps"
                    :key="`${index}-content`"
                    :step="index + 1"
                  />
                </template>
              </transition-group>
            </template>
          </v-stepper>

          <!-- End of internship activities -->

          <!-- manage access button -->
          <div
            v-if="operationMode === OperationMode.Setup && isEmployer"
            class="guide-bar__action-manage-access"
          >
            <v-dialog v-model="dialogManageAccess" persistent max-width="675px">
              <template #activator="{ attrs }">
                <v-btn
                  v-bind="attrs"
                  :disabled="!isProgram"
                  x-large
                  class="guide-bar__actions-manage-access-btn"
                  rounded
                  outlined
                  depressed
                  @click="openManageAccess"
                  >Manage Access</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <div class="headline font-weight-bold">Manage Access</div>

                  <div class="ml-auto">
                    <v-btn icon @click="closeModal"><v-icon>mdi-close</v-icon></v-btn>
                  </div>
                </v-card-title>

                <v-card-text> Allow Employer to manage your program </v-card-text>
                <validation-observer ref="validation" v-slot="{ invalid }" slim>
                  <v-row class="align-center ml-1">
                    <v-col cols="3">
                      <v-select
                        v-model="inviteType"
                        :items="manageInput"
                        outlined
                        hide-details
                        rounded
                      />
                    </v-col>
                    <validation-provider
                      v-if="inviteType === 'Email'"
                      v-slot="{ errors }"
                      class="mr-2"
                      rules="required|email"
                    >
                      <v-container class="d-flex flex-row">
                        <v-text-field
                          v-model="newOrganizerEmail"
                          hide-details
                          rounded
                          outlined
                          label="Enter email"
                          :error-messages="errors"
                        ></v-text-field>
                      </v-container>
                    </validation-provider>
                    <validation-provider v-else class="ml-2 mr-4" slim rules="required">
                      <ATeleInput
                        v-model="phoneNumber"
                        is-rounded
                        input-text="black"
                        @get="getValidation"
                      />
                    </validation-provider>
                    <v-btn
                      rounded
                      x-large
                      :disabled="invalid || !phoneValid || !isPhoneCheck"
                      :height="'54px'"
                      depressed
                      outlined
                      @click="addOrganizer"
                    >
                      Invite
                      <v-progress-circular
                        v-if="isSending"
                        class="ml-4"
                        size="20"
                        indeterminate
                      ></v-progress-circular>
                    </v-btn>
                  </v-row>
                  <div v-if="errorMsg" class="mt-2 ml-8" style="color: red">
                    {{ errorMsg }}
                  </div>
                </validation-observer>
                <v-container class="d-flex justify-center ma-auto">
                  <v-alert v-model="addStakeholderError" dismissible type="error"
                    >An Employer with that email has already been added!</v-alert
                  >
                </v-container>
                <v-divider></v-divider>
                <v-card-text class="mt-8 mb-3">
                  <div v-if="isSending" class="d-flex align-center justify-center">
                    <v-progress-circular class="ml-4" indeterminate></v-progress-circular>
                  </div>
                  <div v-else-if="!isSending">
                    <div v-if="!list.length" class="text-center overline font-weight-black">
                      No Employer yet
                    </div>
                    <v-row v-for="(stakeholder, index) in list" v-else :key="index" class="mb-2">
                      <v-col cols="1" class="d-flex align-center">
                        <v-avatar size="32" color="grey lighten-2">
                          <v-img :src="stakeholder.profile && stakeholder.profile.small"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col
                        v-if="stakeholder.firstName || stakeholder.email"
                        class="d-flex align-center"
                        cols="7"
                      >
                        {{
                          stakeholder.firstName
                            ? `${stakeholder.firstName} ${stakeholder.lastName}`
                            : stakeholder.email
                        }}
                      </v-col>
                      <v-col v-else class="d-flex align-center" cols="7">
                        {{ stakeholder.phoneNumber }}
                      </v-col>
                      <v-col
                        v-if="stakeholder.email !== userDoc.data.email"
                        class="d-flex align-center"
                        cols="4"
                      >
                        <v-select
                          :value="'Employer'"
                          :items="manageAccess"
                          outlined
                          hide-details
                          rounded
                          @input="changeOrgPerm($event, stakeholder._id, index)"
                        />
                        <v-progress-circular
                          v-if="isDeleting && deleteIndex === index"
                          class="ml-2"
                          indeterminate
                        ></v-progress-circular>
                      </v-col>
                    </v-row>
                  </div>
                  <div v-if="orgMsg" class="mt-4 ml-2" style="color: green; font-size: 16px">
                    {{ orgMsg }}
                  </div>
                </v-card-text>
                <v-divider></v-divider>
              </v-card>
            </v-dialog>
          </div>
          <!-- manage access button -->

          <!-- READY TO PUBLISH PROGRAM BUTTON -->

          <v-dialog
            v-if="operationMode === OperationMode.Setup"
            v-model="dialog"
            persistent
            max-width="350px"
          >
            <template #activator="{ on, attrs }">
              <div class="d-flex justify-center publishedBtn">
                <div v-if="isPublished">
                  <v-btn
                    x-large
                    rounded
                    min-width="225px"
                    v-bind="attrs"
                    outlined
                    depressed
                    v-on="on"
                    >UnPublish Program</v-btn
                  >
                </div>
                <div v-else>
                  <v-btn
                    large
                    min-width="225px"
                    v-bind="attrs"
                    color="grey darken-4"
                    class="font-weight-bold white--text"
                    depressed
                    rounded
                    :disabled="!canPublishProgram"
                    v-on="on"
                    >Publish Program</v-btn
                  >
                </div>
              </div>
            </template>
            <v-card>
              <v-card-title>
                <div class="overline font-weight-bold">
                  {{ isPublished ? 'unpublish' : 'publish' }} your program?
                </div>

                <div class="ml-auto">
                  <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
                </div>
              </v-card-title>

              <v-divider></v-divider>

              <v-container>
                <div class="d-flex justify-center flex-row">
                  <v-btn class="ma-2" x-large rounded depressed outlined @click="dialog = false"
                    >Not yet</v-btn
                  >

                  <v-dialog v-model="dialog2" persistent max-width="400px">
                    <template #activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        class="ma-2"
                        x-large
                        color="green"
                        rounded
                        depressed
                        dark
                        v-on="on"
                        @click="changePublishStatus"
                        >{{ isPublished ? 'Unpublish' : 'Publish' }}</v-btn
                      >
                    </template>
                    <v-card>
                      <v-card-title>
                        <div class="overline font-weight-bold">
                          {{
                            isPublished
                              ? 'Your program is published!'
                              : 'Your program is unpublished'
                          }}
                        </div>

                        <div class="ml-auto">
                          <v-btn
                            icon
                            @click="
                              () => {
                                dialog2 = false;
                                dialog = false;
                              }
                            "
                            ><v-icon>mdi-close</v-icon></v-btn
                          >
                        </div>
                      </v-card-title>

                      <v-divider></v-divider>

                      <v-container>
                        <div class="d-flex justify-center flex-column">
                          <v-btn
                            v-if="isPublished"
                            class="ma-2"
                            x-large
                            color="blue"
                            rounded
                            dark
                            depressed
                            @click="
                              $router.push({
                                name: 'Monitor',
                                query: { program: programDoc.data._id.toString() }
                              })
                            "
                          >
                            <span>Monitor Program</span>
                          </v-btn>
                          <v-btn
                            v-if="!isPublished"
                            class="ma-2"
                            x-large
                            rounded
                            dark
                            depressed
                            @click="$router.push({ name: 'portfolio' })"
                          >
                            <span>Goto Portfolio</span>
                          </v-btn>
                          <v-btn
                            v-if="isPublished"
                            class="ma-2"
                            x-large
                            rounded
                            outlined
                            color="green"
                            depressed
                            @click="$router.push({ name: 'explore' })"
                          >
                            <span>Explore Programs</span>
                          </v-btn>
                          <v-btn
                            class="ma-2"
                            x-large
                            color="orange"
                            rounded
                            outlined
                            depressed
                            @click="
                              () => {
                                dialog2 = false;
                                dialog = false;
                              }
                            "
                            >Back to Setup</v-btn
                          >
                          <!-- <v-btn
                            class="ma-2"
                            x-large
                            rounded
                            dark
                            depressed
                            @click="$router.push({ name: 'portfolio' })"
                          >
                            <span>Goto My Portfolio</span>
                          </v-btn> -->
                        </div>
                      </v-container>
                    </v-card>
                  </v-dialog>
                </div>
              </v-container>
            </v-card>
          </v-dialog>
          <!-- ORGANIZER SETUP MODE -->

          <div
            v-if="studentDoc && operationMode === OperationMode.Participant && actions.length"
            class="guide-bar__actions"
          >
            <div class="guide-bar__actions-list">
              <v-icon
                v-for="action in actions"
                :key="action.icon"
                dark
                @click="activeStep = timeline.findIndex(obj => obj.step === action.name) + 2"
              >
                {{ 'mdi-' + action.icon }}
              </v-icon>
            </div>
          </div>
          <div v-if="!studentDoc" class="guide-bar__actions-share2"></div>
          <div
            v-if="studentDoc && operationMode === OperationMode.Participant && !previewEnabled"
            class="guide-bar__actions-share"
          >
            <v-dialog v-model="dialog" persistent max-width="675px">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  class="guide-bar__actions-share-btn2"
                  small
                  outlined
                  depressed
                  v-on="on"
                  >Share</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <div class="headline font-weight-bold mb-2">Share Access</div>

                  <div class="ml-auto">
                    <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
                  </div>
                </v-card-title>

                <v-card-subtitle>Allow stakeholders to monitor your program</v-card-subtitle>
                <validation-observer v-slot="{ invalid }" slim>
                  <validation-provider v-slot="{ errors }" rules="required|email">
                    <v-container class="d-flex flex-row mb-6">
                      <v-col cols="7">
                        <v-text-field
                          v-model="newStakeholderEmail"
                          hide-details
                          rounded
                          outlined
                          class=""
                          label="Enter email address"
                          :error-messages="errors"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-btn
                          rounded
                          class=""
                          x-large
                          :disabled="invalid"
                          depressed
                          outlined
                          @click="addNewStakeholder"
                          >Add Stakeholder</v-btn
                        >
                      </v-col>
                    </v-container>
                  </validation-provider>
                </validation-observer>
                <v-container class="d-flex justify-center ma-auto">
                  <v-alert v-model="addStakeholderError" dismissible type="error"
                    >A stakeholder with that email has already been added!</v-alert
                  >
                </v-container>
                <v-divider></v-divider>

                <v-card-text class="mt-8 mb-3">
                  <div v-if="!stakeholders.length" class="text-center overline font-weight-black">
                    No stakeholders yet
                  </div>
                  <v-row v-for="stakeholder in stakeholders" :key="stakeholder.email"
                    ><v-col cols="1" class="d-flex align-center"
                      ><v-avatar size="32" color="grey lighten-2">
                        <v-img
                          :src="stakeholder.profile && stakeholder.profile.small"
                        ></v-img></v-avatar></v-col
                    ><v-col class="d-flex align-center" cols="7"
                      >{{
                        stakeholder.firstName
                          ? `${stakeholder.firstName} ${stakeholder.lastName}`
                          : stakeholder.email
                      }}
                    </v-col>
                    <v-col class="d-flex align-center" cols="4">
                      <v-select
                        v-if="stakeholder.monitorType && stakeholder.monitorType !== 'Monitor'"
                        :value="stakeholder.monitorType"
                        :items="['Sponsor', 'Organizer']"
                        outlined
                        hide-details
                        rounded
                        disabled
                      />
                      <v-select
                        v-else
                        :value="'Monitor'"
                        :items="shareAccess"
                        outlined
                        hide-details
                        rounded
                        @input="changeStakeholderPerm($event, stakeholder.email)"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-container class="d-flex justify-end">
                    <v-btn rounded text @click="dialog = false"> Close </v-btn>
                  </v-container>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-card>
    </v-expand-x-transition>
  </div>
</template>

<script lang="ts">
import { ObjectId } from 'bson';
import { ref, defineComponent, computed, Ref, reactive } from '@vue/composition-api';
import axios from 'axios';
import { useUserGetters, useDbGetters } from '@/store';
import { StudentStatus } from '@/views/Monitor/studentStatus';
import type { OperationModeType } from '@/@types/operationMode.d';
import { OperationMode } from '@/constants/operationMode';
import ATeleInput from '@/components/atoms/ATeleInput.vue';
import { ITimeLineItem, ProgramActivityStatus } from '../Guide.vue';

export default defineComponent({
  name: 'GuideBar',
  components: {
    ATeleInput
  },
  props: {
    timeline: {
      required: true,
      type: Array as () => ITimeLineItem[]
    },
    value: {
      required: true,
      type: Number
    },
    title: {
      default: 'Employer Name',
      type: String
    },
    fetchProgram: {
      type: Function,
      default: () => {}
    },
    operationMode: {
      required: true,
      type: Number as () => OperationModeType
    },
    studentDoc: {
      required: false,
      type: Object,
      default: () => {}
    },
    userDoc: {
      required: false,
      type: Object,
      default: () => {}
    },
    programDoc: {
      required: false,
      type: Object,
      default: () => {}
    },
    stakeholderIds: {
      required: true,
      type: Array
    },
    needsetup: {
      required: true,
      type: Array
    },
    studentStatus: {
      required: false,
      default: null
    },
    previewEnabled: {
      required: false,
      type: Boolean,
      default: false
    },
    adksWithPreviewMode: {
      required: false,
      type: Array,
      default() {
        return [];
      }
    },
    canPublishProgram: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  setup(
    props: {
      value?: any;
      timeline: ITimeLineItem[];
      programDoc?: any;
      stakeholderIds?: any;
      studentDoc?: any;
      adksWithPreviewMode?: string[];
      operationMode: OperationModeType;
      needsetup: string[];
    },
    ctx
  ) {
    const vertical = ref(true);
    const isPublished = ref(false);
    const expand = window.innerWidth >= 991;
    const closeBar = window.innerWidth <= 991;
    const { collection } = useDbGetters(['collection']);
    const { getObjectId } = useUserGetters(['getObjectId']);
    const showPreInternshipSteps = ref(true);
    const showInternshipSteps = ref(true);
    const newOrganizerEmail = ref('');
    const validation = ref('');
    const inviteType = ref('Email');
    const phoneNumber = ref('');
    const formattedNumber = ref('');
    const isPhoneValid = ref(false);
    const dialogManageAccess = ref(false);
    const orgMsg = ref('');

    function closeModal() {
      dialogManageAccess.value = false;
      phoneNumber.value = '';
      formattedNumber.value = '';
      newOrganizerEmail.value = '';
      orgMsg.value = '';
      validation.value.reset();
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
      if (isPhoneValid.value && phoneNumber.value) {
        return true;
      }
      if (inviteType.value === 'Email') {
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

      if (inviteType.value === 'Email') {
        return true;
      }

      return true;
    });

    const isProgram = computed(() => {
      if (props.title) {
        return true;
      }
      return false;
    });

    const isEmployer = computed(() => {
      if (props.userDoc.data.userTypes.filter(obj => obj === 'Employer')) {
        return true;
      }
      return false;
    });

    const projectItems = computed(() => {
      const { timeline } = props;
      return timeline.filter(item => item.category === 'project');
    });

    const internshipItems = computed(() => {
      const { timeline } = props;
      return timeline.filter(item => item.category === 'internship');
    });

    collection.value!('Program')
      .findOne(
        {
          _id: new ObjectId(ctx.root.$route.params.programId)
        },
        {
          projection: {
            _id: 0,
            published: 1
          }
        }
      )
      .then(res => {
        isPublished.value = res.published;
      })
      .catch(e => {
        // most likely this key doesn't exist in the db
        // TODO: send error report
        console.log(e);
      });

    const activeStep = computed({
      get: () => props.value,
      set: newPage => {
        ctx.emit('input', newPage);
      }
    });
    const list = ref([]);
    const isSending = ref(false);
    const isFetching = ref(false);
    const errorMsg = ref('');
    const organizerList = () => {
      list.value = [];
      props.programDoc.data.organizers.forEach(ele => {
        collection.value!('User')
          .findOne({ _id: new ObjectId(ele.toString()) })
          .then(res => {
            list.value.push(res);
            isSending.value = false;
          });
      });
    };
    organizerList();
    async function addOrganizer() {
      errorMsg.value = '';
      orgMsg.value = '';
      const API_ENDPOINT = process.env.VUE_APP_ADD_ORGANIZER;
      isSending.value = true;
      const data = {
        program_id: ctx.root.$route.params.programId,
        invitee: inviteType.value === 'Email' ? newOrganizerEmail.value : formattedNumber.value,
        user_type: 'Employer'
      };
      try {
        const res = await axios
          .post(API_ENDPOINT, data, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(async res => {
            await props.fetchProgram();
            await organizerList();
            if (res.status === 200) {
              orgMsg.value = 'User added succesfully';
            }
          });
        newOrganizerEmail.value = '';
        phoneNumber.value = '';
        formattedNumber.value = '';
        validation.value.reset();
      } catch (err) {
        console.log(err.response);
        if (err.response.data) {
          errorMsg.value = err?.response?.data?.error?.description;
        }
        isSending.value = false;
      }
    }

    function openManageAccess() {
      errorMsg.value = '';
      dialogManageAccess.value = true;
    }

    const actions = computed(() => {
      const icons = [
        {
          name: 'community',
          icon: 'discord',
          fn: 'my-community'
        },
        {
          name: 'team',
          icon: 'account-supervisor-circle',
          fn: 'my-team'
        },

        {
          name: 'tinker',
          icon: 'timetable',
          fn: 'my-tinker'
        },

        {
          name: 'forum',
          icon: 'comment-text-multiple-outline',
          fn: 'my-forum'
        },

        {
          name: 'make',
          icon: 'feather',
          fn: 'my-make'
        }
      ];
      return icons.filter(action => {
        const timelineObj = props.timeline.find(obj => obj.step === action.name);
        return timelineObj && timelineObj.unlocked;
      });
    });

    const unlockedStep = computed(() => {
      let whichStep = 0;
      for (let i = props.timeline.length - 1; i > 0; i -= 1) {
        if (props.timeline[i].unlocked) {
          whichStep = i;
          break;
        }
      }
      return whichStep;
    });

    const changePublishStatus = () => {
      collection.value!('Program')
        .findOneAndUpdate(
          {
            _id: new ObjectId(ctx.root.$route.params.programId)
          },
          { $set: { published: !isPublished.value } }
        )
        .then(() => {
          isPublished.value = !isPublished.value;
        });
    };

    // Share Dialog Logic

    const stakeholders: Ref<Record<string, any>[]> = ref([]);
    const newStakeholderEmail = ref('');
    (async () => {
      // fetch sponsors. if a stakeholder is here, they must have autoMonitor access
      const sponsors = await collection.value!('Monitor').find({
        'monkey.userID': getObjectId.value
      });
      const sponsorIds = sponsors.map(sponsor => sponsor.owner);
      // fetch stakeholders based on either their email or id
      const { stakeholderIds } = props;
      stakeholderIds.push(...sponsorIds);
      stakeholders.value = await collection.value!('User').find({
        $or: [{ _id: { $in: stakeholderIds } }, { email: { $in: stakeholderIds } }]
      });
      const stakeholderEmails = stakeholders.value.map(stakeholder => stakeholder.email);
      // add monitorType field to stakeholders
      stakeholders.value = stakeholders.value.map(stakeholder => {
        let monitorType = 'Monitor';
        if (sponsorIds.some(id => id.equals(stakeholder._id))) monitorType = 'Sponsor';
        else if (props.programDoc.data.organizers.some(id => id.equals(stakeholder._id)))
          monitorType = 'Organizer';
        return {
          ...stakeholder,
          monitorType
        };
      });
      // add emails not yet associated with a user back to stakeholders array
      stakeholderIds.forEach(email => {
        if (typeof email === 'string' && !stakeholderEmails.includes(email))
          stakeholders.value.push({ email });
      });
    })();
    const addStakeholderError = ref(false);
    const addNewStakeholder = async () => {
      if (newStakeholderEmail.value.length) {
        // check if email is already added
        if (
          stakeholders.value.some(stakeholder => stakeholder.email === newStakeholderEmail.value)
        ) {
          addStakeholderError.value = true;
          return;
        }
        addStakeholderError.value = false;
        const user = await collection.value!('User').findOne({ email: newStakeholderEmail.value });
        const { studentDoc } = props;
        if (!studentDoc.data.stakeholders) {
          studentDoc.data.stakeholders = [];
        }
        if (user) {
          // push user id if user exists
          studentDoc.data.stakeholders.push(user._id);
          stakeholders.value.push(user);
        } else {
          // push email if user doesn't exist
          studentDoc.data.stakeholders.push(newStakeholderEmail.value);
          stakeholders.value.push({ email: newStakeholderEmail.value });
        }
        studentDoc.update();
        newStakeholderEmail.value = '';
      }
    };
    const isDeleting = ref(false);
    const deleteIndex = ref(-1);
    const changeOrgPerm = async (action: string, id: string, indx: number) => {
      console.log(id);
      if (action === 'Remove') {
        deleteIndex.value = indx;
        const API_ENDPOINT = process.env.VUE_APP_DELETE_ORG;
        try {
          isDeleting.value = true;
          const resp = await axios.delete(API_ENDPOINT, {
            params: {
              user_id: id.toString(),
              program_id: ctx.root.$route.params.programId
            }
          });
          if (resp) {
            list.value.splice(
              list.value.findIndex(i => {
                return i._id.toString() === id.toString();
              }),
              1
            );
            isDeleting.value = false;
            orgMsg.value = resp.data.message;
          }
        } catch (err) {
          console.log(err);
          isDeleting.value = false;
        }
      }
    };

    const changeStakeholderPerm = (action: string, email: string) => {
      if (action === 'Remove') {
        const { studentDoc } = props;
        const idToRemove =
          stakeholders.value.find(stakeholder => stakeholder.email === email)?._id ?? email;
        // remove stakeholder from student doc
        console.log(props);
        studentDoc.data.stakeholders = studentDoc.data.stakeholders.filter(id => {
          if (typeof id === 'string') return id !== idToRemove;
          return !id.equals(idToRemove);
        });
        studentDoc.update();
        // remove stakeholder from stakeholder array
        stakeholders.value = stakeholders.value.filter(stakeholder => stakeholder.email !== email);
      }
    };

    const nextUnlockedAdk = computed(() => {
      let nextUnlockedAdk: ITimeLineItem | undefined;

      // Find the first incomplete adk in the list
      const firstUnlockedAdk = props.timeline.find(adk => !adk.unlocked);

      if (firstUnlockedAdk) {
        nextUnlockedAdk = firstUnlockedAdk;
      }
      return nextUnlockedAdk;
    });

    const nextUnlockedAdkIndex = computed(() => {
      const result = props.timeline.findIndex(adk => adk.step === nextUnlockedAdk.value?.step);

      if (result > -1) return result;

      return 0;
    });
    const changeStep = (step: number, type: 'pre' | 'post') => {
      let newStep: ITimeLineItem | null = null;
      if (type === 'pre') {
        newStep = projectItems.value?.[step];
      } else if (type === 'post') {
        const internshipItemsStepIndex = step - projectItems.value.length;
        newStep = internshipItems.value?.[internshipItemsStepIndex];
      }

      const { operationMode } = props;
      if (operationMode === OperationMode.Setup && newStep?.unlocked) {
        activeStep.value = step;
      } else if (
        operationMode !== OperationMode.Setup &&
        (newStep?.unlocked ||
          step === nextUnlockedAdkIndex?.value ||
          (props.adksWithPreviewMode?.includes(newStep?.step ?? '') && props.previewEnabled))
      ) {
        activeStep.value = step;
      }
    };

    const toggleCategory = (type: 'pre' | 'post') => {
      if (type === 'pre') {
        showPreInternshipSteps.value = !showPreInternshipSteps.value;
      } else {
        showInternshipSteps.value = !showInternshipSteps.value;
      }
    };

    const isStepCompleted = (adkObject: ITimeLineItem) => {
      const { operationMode, needsetup } = props;
      const stepRequiresSetup = needsetup.includes(adkObject.step);

      if (operationMode === OperationMode.Setup && stepRequiresSetup) {
        return adkObject.status === ProgramActivityStatus.CompleteSetup;
      }
      if (operationMode === OperationMode.Setup && !stepRequiresSetup) {
        return false;
      }

      return !!adkObject.unlocked;
    };

    const getIconColor = (adkIndex: number, adkObject: ITimeLineItem) => {
      const green = '#6fba7f';
      const yellow = '#fdd35a';
      const gray = '#00000061';

      if (isStepCompleted(adkObject)) {
        return green;
      }

      if (activeStep.value === adkIndex) {
        return yellow;
      }

      return gray;
    };

    const getCompletedIcon = () => {
      return '$complete';
    };

    return {
      stakeholders,
      orgMsg,
      closeModal,
      phoneNumber,
      formattedNumber,
      phoneValid,
      isPhoneCheck,
      inviteType,
      isSending,
      isProgram,
      isEmployer,
      newStakeholderEmail,
      addNewStakeholder,
      isDeleting,
      addStakeholderError,
      changeOrgPerm,
      deleteIndex,
      changeStakeholderPerm,
      expand,
      closeBar,
      activeStep,
      list,
      actions,
      vertical,
      dialog: ref(false),
      dialogManageAccess,
      dialog2: ref(false),
      unlockedStep,
      isPublished,
      changePublishStatus,
      nextUnlockedAdkIndex,
      isFetching,
      changeStep,
      errorMsg,
      shareAccess: ['Monitor', 'Remove'],
      manageAccess: ['Employer', 'Remove'],
      manageInput: ['Email', 'Phone'],
      toggleCategory,
      showPreInternshipSteps,
      validation,
      showInternshipSteps,
      projectItems,
      internshipItems,
      StudentStatus,
      OperationMode,
      getIconColor,
      getCompletedIcon,
      isStepCompleted,
      organizerList,
      addOrganizer,
      openManageAccess,
      newOrganizerEmail,
      getValidation
    };
  },
  data() {
    return {
      organizers: []
    };
  },
  methods: {
    openGuideBar() {
      this.expand = !this.expand;
    },

    mobileExpand() {
      if (window.innerWidth <= 991) {
        this.closeBar = !this.closeBar;
        if (!this.closeBar) {
          this.expand = false;
        }
        if (!this.expand) {
          this.closeBar = true;
        }
      }
    }
  }
});
</script>

<style scoped lang="scss">
$step-width: 27px;
$category-width: 45px;

.v-application a {
  color: transparent;
}

.v-application--is-ltr .guide-bar .v-stepper--vertical .v-stepper__content {
  margin: -16px -12px -24px 12px;
}
.theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error)
  .v-stepper__step__step {
  align-items: center;
  border-radius: 50%;
  display: inline-flex;
  font-size: 0.75rem;
  justify-content: center;
  height: 16px;
  min-width: 16px;
  width: 16px;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error)
  .v-stepper__step__step {
  background: #ffffff !important;
  border: 1px solid #dedede;
  margin-left: 5px;
}

.v-application .green {
  background-color: #6eba7f !important;
  border: 1px solid #dedede !important;
  min-width: 16px;
}

.mdi-check::before {
  font-weight: 800;
}

.guide-bar {
  display: flex;
  height: 100vh;
  @media (max-width: 991px) {
    height: 65px;
  }

  &__invited-email {
    width: 100%;
  }
  &__actions-list {
    width: 100%;
  }

  &__actions-share {
    width: 100%;
  }

  &__action-manage-access {
    width: 100%;
    margin: 10px 0;
  }

  &__actions-manage-access-btn {
    width: 100% !important;
  }

  .publishedBtn {
    width: 100%;
    > div {
      display: inline-block;
      width: 100%;
      button {
        // height: fit-content;
        // font-size: 12px;
        width: 100%;
        padding: 7px;
      }
    }
  }

  &__actions-share2 {
    width: 225px;
  }

  &__actions-share-btn {
    width: 100%;
    padding-left: auto;
    padding-right: auto;
  }

  &__actions-share-btn2 {
    width: 226px;
    padding-left: auto;
    padding-right: auto;
  }

  &__cta1 {
    margin-right: auto;
    margin-top: 15px;
  }

  &__cta2 {
    margin-bottom: 25px;
    margin-right: auto;
    margin-top: 15px;
  }

  &__timeline-category {
    text-transform: uppercase;
    font-size: 12.5px;
    // color: #939598;
    letter-spacing: 1.75px;
    font-weight: 900;
    // flex-direction: row;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // align-content: center;
  }

  &__timeline-item {
    text-transform: uppercase;
    font-size: 9.75px;
    color: #939598;
    letter-spacing: 1.5px;
    font-weight: 800;
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  &__timeline-item-setup {
    margin-left: 10px;
    margin-right: 10px;
  }
  .v-card.v-sheet {
    display: block;
    -webkit-transition: display 0.35s ease-out;
    transition: display 0.5s ease-in-out;
    height: 100%;
    border-radius: 0;
    box-shadow: none !important;
    @media (max-width: 991px) {
      width: 100%;
      max-width: 100%;
      position: fixed;
      top: 59px;
      z-index: 999;
      background-color: #fff;
      height: calc(100vh - 59px);
    }
  }
  .v-stepper.guide-bar__stepper {
    overflow-y: auto;
    box-shadow: none;
    padding-left: 10px;
    padding-right: auto;
    background-color: transparent !important;

    .v-stepper-step-container:first-child {
      .v-stepper__step {
        padding-top: 0px;
      }
    }

    .v-stepper__step {
      padding: 24px 0 16px 0;
      background-color: transparent !important;

      :hover {
        cursor: pointer;
      }
    }

    :not(.category) {
      ::v-deep .v-stepper__step__step {
        height: $step-width;
        min-width: $step-width;
        width: $step-width;
        margin-left: -1px;
        margin-right: 20px;
      }
      .v-stepper__step:hover {
        ::v-deep .v-stepper__step__step {
          transform: scale(1.1);
        }
        ::v-deep .v-stepper__label {
          transform: scale(1.1);
        }
      }
    }

    .category {
      ::v-deep .v-stepper__step__step {
        height: $category-width;
        min-width: $category-width;
        width: $category-width;
        margin-left: -10px;

        i {
          font-size: 1.25rem;
        }
      }
    }

    .category-stepper-content {
      ::v-deep .v-stepper__wrapper {
        height: 14px !important;
      }
    }
  }
  &__container {
    padding-left: 22px;
    padding-top: 22px;
    padding-bottom: 22px;
    padding-right: 22px;
    display: flex;
    flex-direction: column;
    height: fit-content;
    background-color: transparent;
  }
}

.guide-bar {
  &__container {
    height: 100vh;
    @media (max-width: 991px) {
      height: 100%;
    }
  }
  &__highlight {
    height: 9px;
    width: 90%;
    border-radius: 0 0 5px 5px;
    background-color: #3c9dcd;
  }
  &__title {
    max-width: 100%;
    padding-right: 5%;
    display: flex;
    font-family: Raleway;
    font-weight: 800;
    margin-top: 12px;
    margin-bottom: 12px;
    color: #000000;
    font-size: 20px;
    text-align: left !important;
  }

  &__expand {
    height: fit-content;
    height: 100vh;
    padding: 12px;
    flex-direction: column;
    display: flex;
    background: #eeeeee;
    @media (max-width: 991px) {
      height: 60px;
      flex-direction: row;
      width: 100%;
      position: fixed;
      justify-content: space-between;
      z-index: 999;
      hr {
        display: none;
      }
    }
  }

  &__expand-icon {
    margin-top: 10px;
    cursor: pointer;
  }

  &__sidebar-icon {
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    @media (max-width: 991px) {
      font-size: 35px;
      margin: 0;
    }
  }
  &__actions {
    width: 100%;

    display: flex;
    justify-content: center;
    background-color: #6eba7f;
    margin: 10px 0px 10px 0px;
    border-radius: 10px;
    padding: 15px 0 15px 0;
    &-list {
      width: 100%;
      max-width: 80%;
      display: flex;
      justify-content: space-around;
      min-width: 200px;
    }
  }
}

.steps-list-transition-enter-active,
.steps-list-transition-leave-active {
  transition: all 0.25s;
}
.steps-list-transition-enter,
.steps-list-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
