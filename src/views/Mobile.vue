<template>
  <v-container class="mobile__app pa-0">
    <ValidationObserver v-slot="{ invalid }">
      <Loading v-slot="{ loading }" :process-now="true" :callback="loadData">
        <v-skeleton-loader
          :loading="loading"
          type="heading, list-item-two-line, list-item-two-line, list-item-three-line"
        >
          <v-container v-if="user && myDocs.length" class="mobile__dashboard pa-5">
            <!-- EXIT INTERVIEW -->

            <v-dialog v-model="announcement5" persistent fullscreen tile>
              <template #activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on"></div>
              </template>
              <v-card class="mobile__deliverable-card2 mobile__videoask-fullscreen">
                <ValidationObserver v-slot="{ invalid }">
                  <v-container
                    class="
                      mt-auto
                      mb-auto
                      d-flex
                      justify-center
                      flex-column
                      pa-0
                      mobile__videoask-fullscreen
                    "
                  >
                    <div class="d-flex justify-center mt-8 mr-8 ml-8 flex-column">
                      <v-icon x-large color="blue" class="mb-3">mdi-thought-bubble</v-icon>
                      <div
                        class="headline font-weight-bold d-flex justify-center mobile__title pb-3"
                      >
                        Record Exit Interview & Internship Reflection
                      </div>
                      <div class="overline font-weight-black d-flex justify-center pb-6 grey--text">
                        Complete on desktop & 1-hour
                      </div>
                    </div>
                    <div class="d-flex justify-center pa-0 flex-column">
                      <iframe
                        src="https://www.videoask.com/fkddq2zk5"
                        allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
                        height="600px"
                        style="border: none; border-radius: 0px; width: 100vw"
                      >
                      </iframe>

                      <div class="d-flex justify-center mt-6 mb-6">
                        <validation-provider v-slot="{ errors }" slim rules="required">
                          <v-radio-group
                            v-model="adkLocalState.exitInterviewComplete"
                            hide-details
                            :error-messages="errors"
                          >
                            <v-radio label="I finished exit interview" value="Yes"></v-radio>

                            <v-radio
                              label="Report issue or request help"
                              value="Incomplete"
                            ></v-radio>
                          </v-radio-group>
                          <div v-if="adkLocalState.exitInterviewComplete === 'Incomplete'">
                            <validation-provider v-slot="{ errors }" slim rules="required">
                              <v-text-field
                                v-model="adkLocalState.exitInterviewIncomplete"
                                class="mt-4"
                                label="Describe your issue"
                                rounded
                                hide-details
                                outlined
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </div>
                        </validation-provider>
                      </div>
                    </div>
                  </v-container>

                  <div class="d-flex justify-center">
                    <v-btn
                      class="pl-auto pr-auto mb-12"
                      x-large
                      outlined
                      depressed
                      rounded
                      :disabled="invalid"
                      @click="savingExitInterview()"
                      >Submit
                    </v-btn>
                  </div>
                </ValidationObserver>
              </v-card>
            </v-dialog>

            <!-- EXIT INTERVIEW -->

            <!-- FINAL PRESENTATION -->

            <!-- <v-dialog
              v-if="!getAdkValue('finalPresentationConfirmation')"
              v-model="announcement4"
              persistent
              width="350px"
            >
              <template #activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on"></div>
              </template>
              <v-card class="mobile__deliverable-card2">
                <ValidationObserver v-slot="{ invalid }">
                  <v-container class="mt-auto mb-auto d-flex justify-center flex-column pa-0 ma-0">
                    <div class="d-flex justify-center mt-8 mr-8 ml-8 flex-column">
                      <v-icon x-large color="green" class="mb-3">mdi-party-popper</v-icon>
                      <div class="headline font-weight-bold d-flex justify-center mobile__title">
                        Confirm your participation in the final presentation for
                        {{ selectedDoc.program.programName }} Interns
                      </div>
                    </div>
                    <div class="d-flex justify-center pa-4 flex-column">
                      <div class="d-flex flex-row justify-center mb-5 mt-5">
                        <v-icon class="mr-2" color="">mdi-party-popper</v-icon>
                        <div class="d-flex align-center justify-center">
                          <a
                            style="none"
                            href="https://www.bit.ly/pilotcityflipped2021"
                            target="_blank"
                            ><h5 class="">
                              <i>See event page</i>
                            </h5></a
                          >
                        </div>
                      </div>
                      <div class="d-flex justify-center">
                        <v-chip color="green" class="pl-6 pr-6 font-weight-bold" large dark
                          ><v-icon left>mdi-calendar</v-icon
                          >{{ selectedDoc.program.adks.mobile.finalPresentationDate }}</v-chip
                        >
                      </div>
                      <div class="d-flex flex-row justify-center mt-5 mobile__title">
                        <h5 class="grey--text darken-1">
                          <i>
                            An email calendar invite has been sent for your final presentation
                          </i>
                        </h5>
                      </div>

                      <div class="d-flex justify-center mt-6 mb-6">
                        <validation-provider v-slot="{ errors }" slim rules="required">
                          <v-radio-group
                            v-model="adkLocalState.finalPresentationConfirmation"
                            hide-details
                            :error-messages="errors"
                          >
                            <v-radio label="Yes, I confirm participation" value="Yes"></v-radio>

                            <v-radio label="Request absence approval" value="No"></v-radio>
                          </v-radio-group>
                          <div v-if="adkLocalState.finalPresentationConfirmation === 'No'">
                            <validation-provider v-slot="{ errors }" slim rules="required">
                              <v-text-field
                                v-model="adkLocalState.finalPresentationAbsence"
                                class="mt-4"
                                label="Why can't you make it?"
                                rounded
                                hide-details
                                outlined
                                :error-messages="errors"
                              ></v-text-field>
                            </validation-provider>
                          </div>
                        </validation-provider>
                      </div>
                    </div>
                  </v-container>

                  <div class="d-flex justify-center">
                    <v-btn
                      class="pl-auto pr-auto mb-12"
                      x-large
                      outlined
                      depressed
                      rounded
                      :disabled="invalid"
                      @click="savingFinalPresentation()"
                      >Submit
                    </v-btn>
                  </div>
                </ValidationObserver>
              </v-card>
            </v-dialog> -->

            <!-- FINAL PRESENTATION -->

            <!-- 7-POINT INTERNSHIP COMPLETION -->
            <!-- <v-dialog
              v-if="!getAdkValue('sevenPointInternshipCompletion')"
              v-model="announcement3"
              persistent
              width="350px"
            >
              <template #activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on"></div>
              </template>
              <v-card class="mobile__deliverable-card2">
                <ValidationObserver v-slot="{ invalid }">
                  <v-container class="mt-auto mb-auto d-flex justify-center flex-column pa-0 ma-0">
                    <div class="d-flex justify-center ma-8 flex-column">
                      <v-icon x-large color="blue" class="mb-3">mdi-airplane-landing</v-icon>
                      <div class="headline font-weight-bold d-flex justify-center mobile__title">
                        Have you reviewed the 7-Point Internship Completion plan?
                      </div>
                    </div>
                    <div class="d-flex justify-center pa-4 flex-column">
                      <div class="d-flex justify-center">
                        <v-btn
                          class="font-weight-bold"
                          x-large
                          depressed
                          color="blue"
                          dark
                          rounded
                          href="https://bit.ly/3sOBC7K"
                          target="_blank"
                          ><v-icon left>mdi-text-box-outline</v-icon>Read now</v-btn
                        >
                      </div>

                      <div class="d-flex justify-center mt-6">
                        <validation-provider v-slot="{ errors }" rules="required">
                          <v-checkbox
                            v-model="adkLocalState.sevenPointInternshipCompletion"
                            :error-messages="errors"
                            label="I've read & agree with the plan"
                          ></v-checkbox>
                        </validation-provider>
                      </div>
                    </div>
                  </v-container>

                  <div class="d-flex justify-center">
                    <v-btn
                      class="pl-auto pr-auto mb-12"
                      x-large
                      outlined
                      depressed
                      rounded
                      :disabled="invalid"
                      @click="savingInternshipCompletion()"
                      >Confirm
                    </v-btn>
                  </div>
                </ValidationObserver>
              </v-card>
            </v-dialog> -->

            <!-- 7-POINT INTERNSHIP COMPLETION -->
            <!-- POPUP END -->
            <!-- <v-dialog v-model="announcement1" width="350px">
              <template #activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on"></div>
              </template>
              <v-card class="mobile__deliverable-card2">
                <v-container class="mt-auto mb-auto d-flex justify-center flex-column pa-0 ma-0">
                  <div class="d-flex justify-center ma-6 flex-column">
                    <v-icon x-large color="blue" class="mb-3">mdi-new-box</v-icon>
                    <div class="headline font-weight-bold d-flex justify-center mobile__title">
                      Upcoming pinups & new workshops!
                    </div>
                  </div>

                  <v-divider></v-divider>
                  <div class="d-flex justify-center ma-6 flex-column">
                    <h4 class="mobile__title mt-1 mb-1">
                      Get feedback from professionals & experts in tech, education & economic
                      development. And check out new workshops on prototyping software & the art of
                      public speaking!
                    </h4>
                  </div>
                  <div class="d-flex justify-center">
                    <v-btn
                      target="_blank"
                      rounded
                      depressed
                      dark
                      class="font-weight-bold"
                      color="blue"
                      @click="dialogState.workshops = true"
                      ><v-icon left>mdi-broadcast</v-icon>Go to Library</v-btn
                    >
                  </div>

                  <div class="d-flex justify-center flex-column ma-6">
                    <h5 class="mobile__title">Signup or watch now</h5>
                  </div>
                </v-container>

                <div class="d-flex justify-center">
                  <v-btn
                    class="mb-8"
                    rounded
                    depressed
                    outlined
                    large
                    @click="announcement1 = false"
                  >
                    Excellent...
                  </v-btn>
                </div>
              </v-card>
            </v-dialog> -->

            <!-- POPUP END -->

            <!-- POPUP DATA COLLECTION END -->
            <!-- <v-dialog v-model="announcement2" persistent width="350px">
              <template #activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on"></div>
              </template>
              <v-card class="mobile__deliverable-card2">
                <v-container class="mt-auto mb-auto d-flex justify-center flex-column pa-0 ma-0">
                  <div class="d-flex justify-center ma-6 flex-column">
                    <v-icon x-large color="blue" class="mb-3">mdi-calendar</v-icon>
                    <div class="headline font-weight-bold d-flex justify-center mobile__title">
                      When does school start for you?
                    </div>
                  </div>
                  <v-menu
                    ref="menu"
                    :value="false"
                    transition="scale-transition"
                    :close-on-content-click="false"
                    offset-y
                    min-width="290px"
                  >
                    <template #activator="{ on, attrs }">
                      <validation-provider v-slot="{ errors }" rules="required">
                        <v-text-field
                          v-model="adkLocalState.schoolStartDate2021"
                          :error-messages="errors"
                          label="School Start Date"
                          outlined
                          rounded
                          readonly
                          v-bind="attrs"
                          class="ma-3"
                          v-on="on"
                        ></v-text-field>
                      </validation-provider>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="adkLocalState.schoolStartDate2021"
                      @input="menuSchoolStart = false"
                    ></v-date-picker>
                  </v-menu>
                </v-container>

                <div class="d-flex justify-center">
                  <v-btn
                    class="pl-auto pr-auto mb-12"
                    x-large
                    outlined
                    depressed
                    rounded
                    :disabled="invalid"
                    @click="saveAdkValue('schoolStartDate2021'), (announcement2 = false)"
                    >Save
                  </v-btn>
                </div>
              </v-card>
            </v-dialog> -->

            <!-- POPUP END -->

            <!-- HELP US HELP YOU COMPLETE YOUR INTERNSHIP -->
            <!-- <v-dialog
              v-if="
                !(
                  getAdkValue('ratingInternshipOverall') &&
                  getAdkValue('ratingEmployerWeeklyMeeting') &&
                  getAdkValue('ratingEmployerDirection') &&
                  getAdkValue('ratingEmployerWorkingRelationship') &&
                  getAdkValue('ratingCoworkingMood') &&
                  getAdkValue('ratingProjectProgress') &&
                  getAdkValue('ratingAttendingSocials') &&
                  getAdkValue('ratingNewFriends') &&
                  getAdkValue('ratingWeeklyMeetingChange') &&
                  getAdkValue('ratingCoworkingChange') &&
                  getAdkValue('ratingAcknowledgeSignoff') &&
                  getAdkValue('ratingAcknowledgeMinHours') &&
                  getAdkValue('ratingAcknowledgeDeliverablesCompletion')
                )
              "
              v-model="announcement2"
              tile
              fullscreen
              persistent
            >
              <template #activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on"></div>
              </template>
              <v-card class="mobile__deliverable-card2">
                <ValidationObserver v-slot="{ invalid }">
                  <v-container class="mt-auto mb-auto d-flex justify-center flex-column">
                    <div class="d-flex justify-center mt-9 mb-9 flex-column">
                      <v-icon x-large color="yellow" class="mb-3">mdi-poll</v-icon>
                      <div
                        class="
                          headline
                          font-weight-bold
                          d-flex
                          justify-center
                          mobile__title
                          pl-10
                          pr-10
                        "
                      >
                        Help us help you complete your internship
                      </div>
                      <div class="d-flex justify-center mt-5">
                        <v-chip
                          small
                          class="font-weight-bold white--text pl-3 pr-3"
                          color="grey darken-3"
                          dark
                          rounded
                          ><v-icon left color="white" small>mdi-alarm</v-icon>Fill by Friday 11:59pm
                          PST</v-chip
                        >
                      </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="pl-10 pr-10 pt-3">
                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        Rate your internship experience thus far
                      </h4>
                      <validation-provider v-slot="{ errors }" slim rules="required">
                        <v-rating
                          v-model="adkLocalState.ratingInternshipOverall"
                          empty-icon="mdi-star-outline"
                          full-icon="mdi-star"
                          half-icon="mdi-star-half-full"
                          :error-messages="errors"
                          class="d-flex justify-center"
                          color="yellow"
                        ></v-rating>
                      </validation-provider>

                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        Rate the helpfulness of your employer weekly meetings
                      </h4>
                      <validation-provider v-slot="{ errors }" slim rules="required">
                        <v-rating
                          v-model="adkLocalState.ratingEmployerWeeklyMeeting"
                          empty-icon="mdi-star-outline"
                          full-icon="mdi-star"
                          half-icon="mdi-star-half-full"
                          class="d-flex justify-center"
                          :error-messages="errors"
                          color="yellow"
                        ></v-rating>
                      </validation-provider>

                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        Rate the clarity of your employer's direction
                      </h4>
                      <validation-provider v-slot="{ errors }" slim rules="required">
                        <v-rating
                          v-model="adkLocalState.ratingEmployerDirection"
                          empty-icon="mdi-star-outline"
                          full-icon="mdi-star"
                          half-icon="mdi-star-half-full"
                          class="d-flex justify-center"
                          :error-messages="errors"
                          color="yellow"
                        ></v-rating>
                      </validation-provider>

                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        Rate the health of your working relationship with your employer
                      </h4>
                      <validation-provider v-slot="{ errors }" slim rules="required">
                        <v-rating
                          v-model="adkLocalState.ratingEmployerWorkingRelationship"
                          empty-icon="mdi-star-outline"
                          full-icon="mdi-star"
                          half-icon="mdi-star-half-full"
                          class="d-flex justify-center"
                          :error-messages="errors"
                          color="yellow"
                        ></v-rating>
                      </validation-provider>

                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        Rate the usefulness of your daily coworking
                      </h4>
                      <validation-provider v-slot="{ errors }" slim rules="required">
                        <v-rating
                          v-model="adkLocalState.ratingCoworkingMood"
                          empty-icon="mdi-star-outline"
                          full-icon="mdi-star"
                          half-icon="mdi-star-half-full"
                          color="yellow"
                          class="d-flex justify-center"
                          :error-messages="errors"
                        ></v-rating>
                      </validation-provider>

                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        Rate your happiness of your project's progress
                      </h4>
                      <validation-provider v-slot="{ errors }" slim rules="required">
                        <v-rating
                          v-model="adkLocalState.ratingProjectProgress"
                          empty-icon="mdi-heart-outline"
                          full-icon="mdi-heart"
                          half-icon="mdi-heart-half-full"
                          color="red lighten-3"
                          class="d-flex justify-center"
                          :error-messages="errors"
                        ></v-rating>
                      </validation-provider>

                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        Rate your interest in attending intern activities & socials
                      </h4>
                      <validation-provider v-slot="{ errors }" slim rules="required">
                        <v-rating
                          v-model="adkLocalState.ratingAttendingSocials"
                          empty-icon="mdi-heart-outline"
                          full-icon="mdi-heart"
                          half-icon="mdi-heart-half-full"
                          color="red lighten-3"
                          class="d-flex justify-center"
                          :error-messages="errors"
                        ></v-rating>
                      </validation-provider>

                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        Are you partially or fully vaccinated?
                      </h4>
                      <validation-provider v-slot="{ errors }" slim>
                        <div class="d-flex justify-center">
                          <v-switch
                            v-model="adkLocalState.ratingVax"
                            label="Yes"
                            color="green"
                            :error-messages="errors"
                          ></v-switch>
                        </div>
                      </validation-provider>

                      <div v-if="adkLocalState.ratingVax">
                        <h4
                          class="
                            mobile__survey-question
                            d-flex
                            justify-center
                            font-weight-bold
                            mt-6
                            mb-2
                          "
                        >
                          Rate your interest in joining in-person activities with interns
                        </h4>
                        <validation-provider v-slot="{ errors }" slim rules="required">
                          <v-rating
                            v-model="adkLocalState.ratingInPersonSocials"
                            empty-icon="mdi-heart-outline"
                            full-icon="mdi-heart"
                            half-icon="mdi-heart-half-full"
                            color="red lighten-3"
                            class="d-flex justify-center"
                            :error-messages="errors"
                          ></v-rating>
                        </validation-provider>
                      </div>

                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        Have you watched our workshops in the library?
                      </h4>
                      <validation-provider v-slot="{ errors }" slim>
                        <div class="d-flex justify-center">
                          <v-switch
                            v-model="adkLocalState.ratingWorkshop"
                            label="Yes"
                            color="green"
                            :error-messages="errors"
                          ></v-switch>
                        </div>
                      </validation-provider>
                      <div v-if="adkLocalState.ratingWorkshop">
                        <h4
                          class="
                            mobile__survey-question
                            d-flex
                            justify-center
                            font-weight-bold
                            mt-6
                            mb-2
                          "
                        >
                          Rate the helpfulness of the workshops you've watched
                        </h4>
                        <validation-provider v-slot="{ errors }" slim rules="required">
                          <v-rating
                            v-model="adkLocalState.ratingWorkshopHelpfulness"
                            empty-icon="mdi-star-outline"
                            full-icon="mdi-star"
                            half-icon="mdi-star-half-full"
                            color="yellow"
                            class="d-flex justify-center"
                            :error-messages="errors"
                          ></v-rating>
                        </validation-provider>
                      </div>

                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        Were you able to connect or vibe with your intern peers or friends
                        throughout the internship?
                      </h4>

                      <div class="d-flex justify-center flex-column mt-3">
                        <validation-provider v-slot="{ errors }" slim rules="required">
                          <v-select
                            v-model="adkLocalState.ratingNewFriends"
                            rounded
                            outlined
                            label="How many interns?"
                            :items="newFriends"
                            :error-messages="errors"
                          ></v-select>
                        </validation-provider>
                      </div>

                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        Have you agreed upon a new day & time for weekly meetings with your employer
                        & peers?
                      </h4>

                      <div class="d-flex justify-center flex-column mb-6">
                        <validation-provider v-slot="{ errors }" slim rules="required">
                          <v-radio-group
                            v-model="adkLocalState.ratingWeeklyMeetingChange"
                            hide-details
                            :error-messages="errors"
                          >
                            <v-radio label="Yes" value="Yes"></v-radio>

                            <v-radio label="No" value="No"></v-radio>
                            <v-radio label="I don't know" value="I don't know"></v-radio>
                          </v-radio-group>
                        </validation-provider>
                      </div>

                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        Have you agreed upon a new day & time for coworking with your intern peers?
                      </h4>

                      <div class="d-flex justify-center flex-column mb-6">
                        <validation-provider v-slot="{ errors }" slim rules="required">
                          <v-radio-group
                            v-model="adkLocalState.ratingCoworkingChange"
                            hide-details
                            :error-messages="errors"
                          >
                            <v-radio label="Yes" value="Yes"></v-radio>

                            <v-radio label="No" value="No"></v-radio>

                            <v-radio label="I don't know" value="I don't know"></v-radio>
                          </v-radio-group>
                        </validation-provider>
                      </div>

                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        Acknowledge all the following items for completion of internship
                      </h4>

                      <div class="d-flex justify-center flex-column mt-3">
                        <validation-provider v-slot="{ errors }" slim rules="required">
                          <v-checkbox
                            v-model="adkLocalState.ratingAcknowledgeDeliverablesCompletion"
                            label="Completion of deliverables (required)"
                            hide-details
                            required
                            :error-messages="errors"
                          ></v-checkbox>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" slim rules="required">
                          <v-checkbox
                            v-model="adkLocalState.ratingAcknowledgeSignoff"
                            label="Signoff from employer (required)"
                            hide-details
                            required
                            :error-messages="errors"
                          ></v-checkbox>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" slim rules="required">
                          <v-checkbox
                            v-model="adkLocalState.ratingAcknowledgeMinHours"
                            label="Minimum hours met (required)"
                            hide-details
                            required
                            :error-messages="errors"
                          ></v-checkbox>
                        </validation-provider>
                      </div>
                      <div class="d-flex justify-center mt-10 flex-column">
                        <div class="d-flex justify-center">
                          <v-chip
                            small
                            dark
                            color="yellow"
                            class="black--text font-weight-bold pr-3 pl-3"
                            ><v-icon small left color="black">mdi-alert</v-icon>Recommended
                            Extension</v-chip
                          >
                        </div>

                        <h4
                          class="
                            mobile__survey-question
                            d-flex
                            justify-center
                            font-weight-bold
                            mt-3
                            mb-2
                          "
                        >
                          Have to extend internship? Request new Deadline Date below to complete
                          hours, deliverables & employer signoff.
                        </h4>
                      </div>
                      <div class="d-flex justify-center flex-column">
                        <v-menu
                          ref="menu"
                          :value="false"
                          transition="scale-transition"
                          :close-on-content-click="false"
                          offset-y
                        >
                          <template #activator="{ on, attrs }">
                            <validation-provider v-slot="{ errors }">
                              <v-text-field
                                v-model="adkLocalState.ratingNewDeadlineDate"
                                :error-messages="errors"
                                label="Enter new deadline date"
                                outlined
                                rounded
                                readonly
                                v-bind="attrs"
                                class="ma-3"
                                hide-details
                                v-on="on"
                              ></v-text-field>
                            </validation-provider>
                          </template>
                          <v-date-picker
                            ref="picker"
                            v-model="adkLocalState.ratingNewDeadlineDate"
                            min="2021-09-01"
                            max="2021-12-31"
                            @input="menuNewDeadlineDate = false"
                          ></v-date-picker>
                        </v-menu>
                        <v-chip
                          color="yellow"
                          small
                          dark
                          class="font-weight-bold d-flex justify-center ml-3 mr-3 mb-2 black--text"
                          >Your Current Deadline:
                          {{
                            selectedDoc &&
                            selectedDoc.offerDetails &&
                            selectedDoc.offerDetails.internshipEnd
                          }}</v-chip
                        >

                        <v-chip
                          small
                          class="font-weight-bold d-flex justify-center ml-3 mr-3 mb-6"
                          outlined
                          >Hours Completed: {{ adkLocalState.clockAdjustedHours }} of
                          {{
                            selectedDoc &&
                            selectedDoc.offerDetails &&
                            selectedDoc.offerDetails.minHours
                          }}
                          Min</v-chip
                        >
                      </div>

                      <h4
                        class="
                          mobile__survey-question
                          d-flex
                          justify-center
                          font-weight-bold
                          mt-6
                          mb-2
                        "
                      >
                        What one improvement would you suggest to dramatically enhance your
                        internship experience?
                      </h4>
                      <validation-provider v-slot="{ errors }" slim>
                        <div class="d-flex justify-center">
                          <v-textarea
                            v-model="adkLocalState.ratingOneImprovement"
                            outlined
                            rounded
                            placeholder="Enter one improvement here..."
                            hide-details
                            class="ma-3"
                            :error-messages="errors"
                          ></v-textarea>
                        </div>
                      </validation-provider>
                    </div>

                    <div class="d-flex justify-center">
                      <v-btn
                        class="pl-auto pr-auto mb-9 mt-9"
                        x-large
                        outlined
                        depressed
                        rounded
                        :disabled="invalid"
                        @click="savingRatings()"
                        >Submit
                      </v-btn>
                    </div>
                  </v-container>
                </ValidationObserver>
              </v-card>
            </v-dialog> -->

            <!-- HELP US HELP YOU COMPLETE YOUR INTERNSHIP -->

            <!-- DOWNTOWN TAKEOVER START -->
            <!-- <v-dialog v-model="takeover" tile fullscreen>
              <template #activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on"></div>
              </template>
              <v-card tile color="blue darken-4" class="mobile__deliverable-card2">
                <div class="mobile__downtown-takeover-bar d-flex justify-center">
                  <div class="d-flex white--text overline font-weight-black">
                    <v-icon class="mr-2" small color="white">mdi-discord</v-icon>Going on now at
                    6pm!
                  </div>
                </div>

                <v-container class="mt-auto mb-auto d-flex justify-center flex-column pa-0 ma-0">
                  <div class="d-flex justify-center mt-10 mb-4">
                    <v-icon color="yellow" x-large>mdi-storefront</v-icon>
                  </div>

                  <div class="d-flex justify-center pb-3 pt-4">
                    <h6 class="font-weight-black white--text">
                      A &nbsp;&nbsp; P I L O T C I T Y &nbsp;&nbsp;S O C I A L
                    </h6>
                  </div>

                  <div class="d-flex justify-center mb-9">
                    <h1 class="font-weight-bold yellow--text mobile__title">
                      Make emojis <br />with interns!
                    </h1>
                  </div>

                  <div class="d-flex justify-center pb-12 pl-10 pr-10 flex-column">
                    <h4 class="font-weight-bold white--text mobile__title">
                      Hang out or spectate at our 1st internship social going on now at 6pm in the
                      "Emoji Workshop" voice channel in the "Downtown" channel category. Enjoy your
                      Friday, make emojis & hang with interns!
                    </h4>
                  </div>

                  <div class="d-flex justify-center flex-column pl-8 pr-8 pb-3">
                    <v-btn
                      class="font-weight-bold mt-3"
                      hide-details
                      color="blue"
                      rounded
                      depressed
                      dark
                      x-large
                      href="https://discord.gg/J3C45hJj"
                      target="_blank"
                    >
                      <v-icon color="white" left>mdi-discord</v-icon>Go to voice channel
                    </v-btn>
                  </div>
                </v-container>

                <div class="d-flex justify-center align-end">
                  <v-btn
                    class="mb-12 mt-12"
                    rounded
                    depressed
                    dark
                    x-large
                    icon
                    @click="takeover = false"
                  >
                    <v-icon x-large>mdi-close</v-icon>
                  </v-btn>
                </div>
              </v-card>
            </v-dialog> -->

            <!-- DOWNTOWN TAKEOVER END -->

            <div class="d-flex justify-center flex-column">
              <div class="d-flex justify-center">
                <v-dialog
                  v-model="dialogState.program"
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
                      class="mobile__employer mb-4"
                      v-on="on"
                      ><v-icon left>mdi-chevron-down</v-icon>
                      {{ selectedDoc.program.programName }}
                    </v-btn>
                  </template>
                  <v-card class="mobile__deliverable-card d-flex flex-column">
                    <div class="d-flex justify-end">
                      <v-btn class="ma-2" x-large icon dark @click="dialogState.program = false">
                        <v-icon x-large color="grey">mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <v-container class="mt-auto mb-auto d-flex justify-center flex-column">
                      <div class="headline d-flex justify-center font-weight-bold mb-5">
                        Choose employer
                      </div>
                      <div
                        v-for="doc in myDocs"
                        :key="doc._id.toHexString()"
                        class="d-flex justify-center align-center mobile__programselect"
                        @click="
                          selectedDoc = doc;
                          dialogState.program = false;
                        "
                      >
                        {{ doc.program.programName }}
                      </div>
                    </v-container>
                  </v-card>
                </v-dialog>
              </div>
            </div>
            <div class="d-flex justify-center"><Profile :size="80" /></div>
            <v-card class="mobile__padding-bottom" flat>
              <h1 class="d-flex justify-center font-weight-bold mt-4">
                {{ user.firstName }} {{ user.lastName }}
              </h1>

              <div class="d-flex justify-center">
                <v-chip outlined class="mt-2 mb-8 pa-4"
                  ><h2>
                    {{
                      selectedDoc && selectedDoc.offerDetails && selectedDoc.offerDetails.position
                    }}
                  </h2></v-chip
                >
              </div>

              <div class="d-flex justify-center align-center mb-5">
                <v-dialog
                  v-model="dialogState.workshops"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <!-- <template #activator="{ on, attrs }">

                    <v-btn
                      class="d-flex justify-center align-center ma-1"
                      icon
                      v-bind="attrs"
                      depressed
                      rounded
                      v-on="on"
                      ><v-icon color="red" large>mdi-broadcast</v-icon></v-btn
                    >
                  </template> -->

                  <template #activator="{ on, attrs }">
                    <v-badge
                      class="font-weight-bold"
                      bordered
                      color="red"
                      offset-x="20"
                      offset-y="20"
                      overlap
                      content="1"
                    >
                      <v-btn
                        v-bind="attrs"
                        class="ma-2 mobile__library-button font-weight-bold"
                        depressed
                        outlined
                        rounded
                        small
                        v-on="on"
                        ><v-icon small left>mdi-broadcast</v-icon>Library</v-btn
                      >
                    </v-badge>
                  </template>

                  <!-- <template #activator>
                    <v-tooltip value="libraryTooltip" top>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          class="d-flex justify-center align-center ma-1"
                          icon
                          v-bind="attrs"
                          depressed
                          rounded
                          v-on="on"
                          @click="dialogState.workshops = true"
                          ><v-icon color="red" large>mdi-broadcast</v-icon></v-btn
                        >
                      </template>
                      <span color="red" dark
                        >Watch library of workshops<v-btn icon @click="libraryTooltip = false"
                          ><v-icon dark>mdi-close</v-icon></v-btn
                        ></span
                      >
                    </v-tooltip>
                  </template> -->

                  <v-card class="mobile__deliverable-card d-flex flex-column">
                    <div class="pa-2 d-flex justify-center">
                      <v-btn
                        class="mobile__closedirectory"
                        depressed
                        outlined
                        @click="dialogState.workshops = false"
                        >Close Library</v-btn
                      >
                    </div>
                    <v-container class="ma-0 pa-0 mb-auto">
                      <v-expansion-panels
                        v-model="libraryUpcoming"
                        accordion
                        multiple
                        tile
                        dark
                        class="ma-0 pa-0 mobile__fullwindow"
                        flat
                      >
                        <v-expansion-panel class="mobile__fullwindow">
                          <v-expansion-panel-header class="mobile__fullwidth">
                            <h3>
                              <!-- <v-icon large class="mr-3" color="red">mdi-broadcast</v-icon> -->
                              Upcoming
                            </h3>
                            <template #actions>
                              <v-icon large color="red">mdi-broadcast</v-icon>
                              <!-- <v-icon large> mdi-chevron-down</v-icon> -->
                            </template>
                          </v-expansion-panel-header>

                          <v-expansion-panel-content class="mb-5">
                            <div class="d-flex flex-row align-start mt-2 mb-2 ml-3">
                              <h5>No upcoming items</h5>
                            </div>

                            <!-- <v-btn x-small outlined dark class="mt-5">Pinups</v-btn>
                                                        <div class="d-flex flex-row align-start mt-2 mb-2 ml-3">
                              <h5>
                                No upcoming pinups, workshops or podcasts
                                </span>
                              </h5>
                            </div> -->

                            <!-- <div class="d-flex flex-row align-start mt-2 mb-2 ml-3">
                              <h5>
                                Katie Bowman<span class="font-weight-regular">
                                  , City of San Leandro
                                </span>
                              </h5>
                            </div> -->

                            <!-- <v-btn x-small outlined dark class="mt-5">Workshops</v-btn>

                            <div class="d-flex flex-row align-start mt-2 mb-2 ml-3">
                              <h5>Marketing tactics & strategy</h5>
                            </div> -->

                            <!-- <div class="d-flex flex-row align-start mt-2 mb-2 ml-3">
                              <h5>The art of talking & getting people to listen</h5>
                            </div>

                            <div class="d-flex flex-row align-start mt-2 mb-2 ml-3">
                              <h5>Web design basics</h5>
                            </div>

                            <div class="d-flex flex-row align-start mt-2 mb-2 ml-3">
                              <h5>Community engagement</h5>
                            </div> -->

                            <!-- <v-btn x-small outlined dark class="mt-4">Jul 21</v-btn>
                            <div class="d-flex flex-row align-start mt-2 mb-2">
                              <h4>Deep dive in selling your proposal</h4>
                            </div>

                            <v-btn x-small outlined dark class="mt-4">Jul 22</v-btn>
                            <div class="d-flex flex-row align-start mt-2 mb-2">
                              <h4>Building what you care about</h4>
                            </div> -->
                            <!-- <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="white" class="mr-3">mdi-microphone</v-icon>
                              <h4>
                                Podcast with Stephanie Betancourt: Alumni, two-time success manager
                                & team member
                              </h4>
                            </div> -->
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>

                      <v-expansion-panels
                        v-model="libraryCurrent"
                        accordion
                        multiple
                        tile
                        class="ma-0 pa-0"
                        flat
                      >
                        <!-- <v-expansion-panel>
                        <v-expansion-panel-header class="mobile__fullwidth">
                          <h3 color="red">Upcoming</h3>
                          <template #actions>
                            <v-icon large color="red">mdi-broadcast</v-icon>
                          </template>
                        </v-expansion-panel-header>

                        <v-expansion-panel-content class="mt-5 mb-5">
                          None
                        </v-expansion-panel-content>
                      </v-expansion-panel> -->

                        <v-expansion-panel>
                          <v-expansion-panel-header class="mobile__fullwidth">
                            <h2><v-icon color="red" class="mr-3">mdi-youtube</v-icon>Workshops</h2>
                            <template #actions>
                              <v-icon large> mdi-chevron-down</v-icon>
                            </template>
                          </v-expansion-panel-header>

                          <v-expansion-panel-content class="mt-5 mb-5">
                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <!-- <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon> -->
                              <v-icon color="red" class="mr-3">mdi-new-box</v-icon>
                              <a
                                href="https://youtu.be/WxwmN3a3Jys"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>Community Engagement</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <!-- <v-icon color="red" class="mr-3">mdi-new-box</v-icon> -->
                              <a
                                href="https://youtu.be/ttuxSLFFLOo"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>The Art of Public Speaking</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <a
                                href="https://youtu.be/JSisRDSBDN4"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>Prototyping in Software</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <a
                                href="https://youtu.be/7fK24I4NvWY"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>How to market & engage audiences</h4>
                              </a>
                            </div>
                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <!-- <v-icon color="red" class="mr-3">mdi-new-box</v-icon> -->
                              <a
                                href="https://youtu.be/lJcMNCFm-3s"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>How to create appealing graphics</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <!-- <v-icon color="red" class="mr-3">mdi-new-box</v-icon> -->
                              <a
                                href="https://youtu.be/vwOArMjxawE"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>How to clone yourself in video</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <!-- <v-icon color="red" class="mr-3">mdi-new-box</v-icon> -->
                              <a
                                href="https://youtu.be/S2pmBy-_jtY"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>LinkedIn & Resume Workshop</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <!-- <v-icon color="red" class="mr-3">mdi-new-box</v-icon> -->
                              <a
                                href="https://youtu.be/zV7LMVCIkS4"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>How to create a Discord Emoji</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <!-- <v-icon color="red" class="mr-3">mdi-new-box</v-icon> -->
                              <a
                                href="https://youtu.be/h-JqAqIh3Lo"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>How to engage your client</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <!-- <v-icon color="red" class="mr-3">mdi-new-box</v-icon> -->
                              <a
                                href="https://youtu.be/207LS7_g8MA"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>Prototyping hardware</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <a
                                href="https://youtu.be/HAVgNBtmYtg"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>How to Manage Your Time</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <a
                                href="https://youtu.be/HGYzefPZoK0"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>How to Make a Killer Video</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <a
                                href="https://youtu.be/vo0PeSja220"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>Selling your idea & using a CRM</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <a
                                href="https://youtu.be/JrOMXKqfHtw"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>Who are my users, testers & customers?</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <a
                                href="https://youtu.be/73H1sBqSD3w"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>Build a killer proposal</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <a
                                href="https://youtu.be/EADhIz4AWho"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>How to use Discord as a team</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <a
                                href="https://youtu.be/YfzzON6uNTk"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>How to talk to your employer</h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-youtube</v-icon>
                              <a
                                href="https://youtu.be/GiWul2CAjio"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>How to use Notion.com</h4>
                              </a>
                            </div>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <!-- PINUP PROTOTYPE -->

                        <v-expansion-panel class="ma-0 pa-0">
                          <v-expansion-panel-header class="mobile__fullwidth">
                            <h2>
                              <v-icon color="green" class="mr-3">mdi-pin</v-icon>Pinups
                              <!-- <v-icon color="green" large class="ml-3">mdi-new-box</v-icon> -->
                            </h2>
                            <template #actions>
                              <v-icon large> mdi-chevron-down</v-icon>
                            </template>
                          </v-expansion-panel-header>

                          <v-expansion-panel-content class="mobile__airtable-embed-fullscreen">
                            <div class="pa-2 d-flex justify-center">
                              <v-btn
                                class="mobile__signupforpinup white--text font-weight-bold"
                                href="https://airtable.com/shrqnpGXCtgKfV0Td"
                                target="_blank"
                                depressed
                                dark
                                color="green"
                                ><v-icon left>mdi-feather</v-icon>Signup for pinup</v-btn
                              >
                            </div>
                            <iframe
                              class="airtable-embed"
                              src="https://airtable.com/embed/shrw0v0iAcRzrl5Zi?backgroundColor=blue&viewControls=on"
                              frameborder="0"
                              onmousewheel=""
                              width="100%"
                              height="533"
                              style="background: transparent; border: 0px"
                            ></iframe>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <!-- PINUP PROTOTYPE -->

                        <v-expansion-panel>
                          <v-expansion-panel-header class="mobile__fullwidth">
                            <h2>
                              <v-icon color="blue" class="mr-3">mdi-microphone</v-icon>Podcasts
                              <!-- <v-icon color="blue" large class="ml-3">mdi-new-box</v-icon> -->
                            </h2>
                            <template #actions>
                              <v-icon large> mdi-chevron-down</v-icon>
                            </template>
                          </v-expansion-panel-header>

                          <v-expansion-panel-content class="mt-5 mb-5">
                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-microphone</v-icon>
                              <a
                                href="https://youtu.be/L4q4zOU0CUc"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>
                                  Stephanie Alexa Betancourt | PilotCity Success Manager Edition |
                                  Pilots Log #13
                                </h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-microphone</v-icon>
                              <a
                                href="https://youtu.be/e1M76KYdwqo"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>
                                  Shanyu Chauhan & Shannon Leigh | PilotCity Interns 2020 | Pilots
                                  Log #12
                                </h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-microphone</v-icon>
                              <a
                                href="https://youtu.be/9eydyk0HRqA"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>
                                  Yafet & City of East Palo Alto | PilotCity Interns 2020 | Pilots
                                  Log #11
                                </h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-microphone</v-icon>
                              <a
                                href="https://youtu.be/U7ic7VoLx-U"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>
                                  Seamless Schools is Tokyo Drift | PilotCity Interns 2019 | Pilots
                                  Log #9
                                </h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-microphone</v-icon>
                              <a
                                href="https://youtu.be/2oSV_wF7e90"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>
                                  Jason Ebner & Antioch High School | PilotCity Teacher Edition 2021
                                  | Pilots Log #8
                                </h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-microphone</v-icon>
                              <a
                                href="https://youtu.be/XN5Nt0EMEmw"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>
                                  Noah Maclean & Typeform | PilotCity Interns 2020 | Pilots Log #7
                                </h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-microphone</v-icon>
                              <a
                                href="https://youtu.be/MFgpcv2FXmU"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>
                                  Huy Bui & Marin Clean Energy | PilotCity Interns 2020 | Pilots Log
                                  #6
                                </h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-microphone</v-icon>
                              <a
                                href="https://youtu.be/kx24LIYF9_o"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>
                                  Tri Mai, Bryan Bejarano & Shannon Leigh | PilotCity Interns 2020 |
                                  Pilots Log #5
                                </h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-microphone</v-icon>
                              <a
                                href="https://youtu.be/czZUXZt5-BI"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>
                                  Chiara Blake & Lawrence Berkeley National Lab | PilotCity Interns
                                  2020 | Pilots Log #4
                                </h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-microphone</v-icon>
                              <a
                                href="https://youtu.be/5jiunMHEVqQ"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>
                                  Mira & Kaiser Permanente Innovation Center | PilotCity Interns
                                  2020 | Pilots Log #3
                                </h4>
                              </a>
                            </div>

                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-microphone</v-icon>
                              <a
                                href="https://youtu.be/6gxW7VL7mHg"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>
                                  Pill Buddies & Kaiser Permanente Innovation Center | PilotCity
                                  Interns 2020 | Pilots Log #2
                                </h4>
                              </a>
                            </div>
                            <div class="d-flex flex-row align-start mt-3 mb-3">
                              <v-icon color="grey lighten-1" class="mr-3">mdi-microphone</v-icon>
                              <a
                                href="https://youtu.be/8Ed64s5Vmhk"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <h4>
                                  Nutrient Nuts & Kaiser Permanente Innovation Center | PilotCity
                                  Interns 2020 | Pilots Log #1
                                </h4>
                              </a>
                            </div>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <!-- <v-expansion-panel>
                          <v-expansion-panel-header class="mobile__fullwidth">
                            <h2>Articles</h2>
                            <template #actions>
                              <v-icon large> mdi-chevron-down</v-icon>
                            </template>
                          </v-expansion-panel-header>

                          <v-expansion-panel-content class="mt-5 mb-5"
                            >None</v-expansion-panel-content
                          >
                        </v-expansion-panel> -->
                      </v-expansion-panels>
                      <div class="mobile__fullwidth"></div> </v-container
                  ></v-card>
                </v-dialog>

                <v-dialog
                  v-model="dialogState.objective"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      class="d-flex justify-center align-center mb-2"
                      icon
                      v-bind="attrs"
                      depressed
                      rounded
                      x-large
                      v-on="on"
                      ><v-icon color="green" x-large>mdi-sign-direction</v-icon></v-btn
                    >
                  </template>
                  <v-card class="mobile__deliverable-card d-flex flex-column">
                    <div class="pa-2 d-flex justify-center">
                      <v-btn
                        class="mobile__closedirectory"
                        depressed
                        outlined
                        @click="dialogState.objective = false"
                        >Close Objective</v-btn
                      >
                    </div>
                    <v-container class="pa-8 mt-auto mb-auto">
                      <div>
                        <v-btn class="mb-6" x-small disabled depressed outlined rounded
                          >Employer Objective</v-btn
                        >
                      </div>
                      <div class="headline font-weight-bold">
                        {{ primaryObjectiveValue }}
                      </div>
                      <div>
                        <v-btn class="mb-1 mt-6" x-small disabled depressed outlined rounded
                          >Key Results</v-btn
                        >
                      </div>
                      <div v-if="!adkLocalState.acknowledge">
                        <v-checkbox
                          v-for="n in keyResultsValues"
                          :key="n"
                          v-model="testBox1"
                          class="text-h6"
                          dense
                          :label="n"
                          :value="n"
                        ></v-checkbox>
                      </div>
                      <div v-else>
                        <v-checkbox
                          v-for="n in keyResultsValues"
                          :key="n"
                          input-value="true"
                          disabled
                          class="text-h6"
                          dense
                          :label="n"
                          value
                        ></v-checkbox>
                      </div>
                      <div class="d-flex justify-center">
                        <v-btn
                          :disabled="
                            !(lengthCheckbox === keyResultLength) || adkLocalState.acknowledge
                          "
                          large
                          class="mt-12"
                          rounded
                          depressd
                          outlined
                          @click="diableAcknowledgebutton()"
                          >I Acknowledge</v-btn
                        >
                      </div>
                    </v-container></v-card
                  >
                </v-dialog>

                <!-- <v-dialog
                  v-model="dialogState.settings"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn v-bind="attrs" class="ma-2" depressed x-small icon v-on="on"
                      ><v-icon>mdi-cog</v-icon></v-btn
                    >
                  </template>
                  <v-card class="mobile__deliverable-card d-flex flex-column">
                    <div class="pa-2 d-flex justify-center">
                      <v-btn
                        class="mobile__closedirectory"
                        depressed
                        outlined
                        @click="dialogState.settings = false"
                        >Close Settings</v-btn
                      >
                    </div>
                    <v-container
                      class="mt-auto mb-auto d-flex flex-column justify-center align-center"
                    >
                      <div class="headline font-weight-bold mb-5">Calendar</div>

                      <v-row class="d-flex justify-center align-center">
                        <div class="overline font-weight-black d-flex align-center">Gmail</div>
                        <div>
                          <v-switch
                            v-model="adkLocalState.calendarPreference"
                            inset
                            class="ml-3"
                            @click="saveAdkValue('calendarPreference')"
                          ></v-switch>
                        </div>
                        <div class="overline font-weight-black d-flex align-center">Outlook</div>
                      </v-row>
                    </v-container></v-card
                  >
                </v-dialog> -->

                <v-dialog
                  v-model="dialogState.directory"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      class="ma-2 font-weight-bold"
                      depressed
                      outlined
                      small
                      rounded
                      no-border
                      v-on="on"
                      @click="loadDirectory"
                      ><v-icon left small>mdi-contacts</v-icon>Directory</v-btn
                    >
                  </template>
                  <v-card :loading="!directoryLoaded" class="d-flex flex-column">
                    <v-container class="pa-0">
                      <div class="pa-2 d-flex justify-center">
                        <v-btn
                          class="mobile__closedirectory"
                          depressed
                          outlined
                          @click="dialogState.directory = false"
                          >Close Directory</v-btn
                        >
                      </div>
                      <!-- <iframe
                      class="airtable-embed"
                      src="https://airtable.com/embed/shrXiXnZs3TCjC9a9?backgroundColor=orange&layout=card&viewControls=on"
                      frameborder="0"
                      onmousewheel=""
                      width="100%"
                      height="750px"
                      style="background: transparent; border: 0px solid #ccc"
                    ></iframe>  -->
                      <!-- buttons for the filtering -->
                      <div class="d-flex justify-center pt-6">
                        <v-btn
                          class="ma-1"
                          small
                          depressed
                          rounded
                          :outlined="directoryView !== DirectoryView.all"
                          :dark="directoryView === DirectoryView.all"
                          @click="directoryView = DirectoryView.all"
                          >All</v-btn
                        >
                        <v-btn
                          class="ma-1"
                          :outlined="directoryView !== DirectoryView.employers"
                          :dark="directoryView === DirectoryView.employers"
                          small
                          color="purple"
                          depressed
                          rounded
                          @click="directoryView = DirectoryView.employers"
                          >Employer</v-btn
                        >
                        <v-btn
                          class="ma-1"
                          :outlined="directoryView !== DirectoryView.interns"
                          :dark="directoryView === DirectoryView.interns"
                          small
                          color="green"
                          depressed
                          rounded
                          @click="directoryView = DirectoryView.interns"
                          >Interns</v-btn
                        >
                      </div>

                      <v-data-table
                        v-if="directoryLoaded"
                        disable-sort
                        :headers="header"
                        :items="items"
                        hide-default-footer
                      >
                        <template #item.preference="{ item }">
                          <v-dialog
                            v-if="item.directory"
                            v-model="item.showDirectory"
                            max-width="500"
                          >
                            <template #activator="{ on, attrs }">
                              <v-btn
                                v-bind="attrs"
                                rounded
                                depressed
                                icon
                                large
                                color="purple"
                                v-on="on"
                                @click="item.showDirectory = true"
                                ><v-icon x-large>mdi-card-account-details</v-icon></v-btn
                              >
                            </template>
                            <v-card>
                              <v-card-title class="headline font-weight-bold"
                                >Contact Preferences</v-card-title
                              >
                              <v-divider></v-divider>
                              <div class="pl-8 pr-8 pb-8">
                                <!-- scheduling app -->

                                <div v-if="item.directory.schedulingLink" class="mt-6 mb-4">
                                  <div class="overline font-weight-black">Schedule with me</div>
                                  <v-btn
                                    class="ma-1 font-weight-bold"
                                    small
                                    dark
                                    color="red"
                                    depressed
                                    rounded
                                    :href="item.directory.schedulingLink"
                                    target="_blank"
                                    >SCHEDULE</v-btn
                                  >
                                </div>

                                <!-- contact preferences -->
                                <div class="mt-6 mb-4">
                                  <div class="overline font-weight-black">Preferred method</div>

                                  <v-chip
                                    v-for="n in item.directory.contactMethods"
                                    :key="n"
                                    class="ma-1 font-weight-bold"
                                    text-color="white"
                                    color="blue"
                                  >
                                    {{ n }}
                                  </v-chip>
                                </div>

                                <!-- Time preference -->
                                <div class="mt-6 mb-4">
                                  <div class="overline font-weight-black">Preferred time</div>
                                  <v-chip
                                    v-for="n in item.directory.contactPreferences"
                                    :key="n"
                                    class="ma-1 font-weight-bold"
                                    color="green"
                                    text-color="white"
                                  >
                                    {{ n }}
                                  </v-chip>
                                </div>
                              </div>
                            </v-card>
                          </v-dialog>
                        </template>
                      </v-data-table>
                    </v-container></v-card
                  >
                </v-dialog>
              </div>

              <div class="d-flex justify-center flex-column">
                <v-row class="mobile__deliverables d-flex justify-center align-center">
                  <v-dialog
                    v-model="dialogState.proposal"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn v-bind="attrs" outlined depressed x-large icon v-on="on"
                        ><v-icon v-if="!getAdkValue('proposal')">mdi-link-variant</v-icon>

                        <v-icon v-if="getAdkValue('proposal')" color="green">mdi-check-bold</v-icon>
                      </v-btn>
                    </template>
                    <v-card class="mobile__deliverable-card d-flex flex-column">
                      <div class="d-flex justify-end">
                        <v-btn
                          class="ma-2"
                          x-large
                          icon
                          dark
                          @click="closeLinkItemDialog('proposal')"
                        >
                          <v-icon x-large color="grey">mdi-close</v-icon>
                        </v-btn>
                      </div>
                      <v-container class="mt-auto mb-auto">
                        <v-icon class="d-flex justify-center" x-large color="green"
                          >mdi-text-box-outline</v-icon
                        >
                        <h1 class="d-flex mobile__title justify-center pa-3 font-weight-bold mb-3">
                          Build project proposal on Notion.com and enter link
                        </h1>
                        <div class="d-flex justify-center">
                          <v-dialog v-model="tutorialDialogProposal" width="516">
                            <template #activator>
                              <v-tooltip right>
                                <template #activator="{ on, attrs }">
                                  <v-btn
                                    v-bind="attrs"
                                    style="text-decoration: none"
                                    depressed
                                    outlined
                                    x-small
                                    rounded
                                    class="mb-6"
                                    color="grey darken-2"
                                    v-on="on"
                                    @click="tutorialDialogProposal = true"
                                    ><v-icon small left>mdi-youtube</v-icon>Get Started</v-btn
                                  >
                                </template>
                                <span>Watch video overview</span>
                              </v-tooltip>
                            </template>
                            <v-card dark class="login__dialog">
                              <div>
                                <iframe
                                  width="100%"
                                  height="400"
                                  src="https://www.youtube.com/embed/tu1uhDv-e7U"
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </v-card>
                          </v-dialog>
                        </div>
                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-1-circle</v-icon>
                          Create proposal from template
                          <v-btn
                            target="_blank"
                            href="https://www.notion.so/pilotcity/Proposal-Enter-your-team-name-7db2363af48a44b989cb33139cf0fb15"
                            icon
                            small
                            ><v-icon small>mdi-open-in-new</v-icon></v-btn
                          >
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-2-circle</v-icon>

                          Populate your pre-internship project info
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-3-circle</v-icon>

                          See example on how to populate info
                          <v-btn
                            target="_blank"
                            href="https://pilotcity.notion.site/Proposal-Downtown-Analytics-4684a96d930b4c8d9f30ddfbbe4d52f6"
                            icon
                            small
                            ><v-icon small>mdi-open-in-new</v-icon></v-btn
                          >
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-4-circle</v-icon>

                          Build, manage & update your proposal
                        </h5>
                        <div class="d-flex justify-center">
                          <v-btn
                            href="https://discord.gg/dkGMKdtMEu"
                            target="_blank"
                            style="text-decoration: none"
                            depressed
                            outlined
                            x-small
                            rounded
                            color="grey darken-2"
                            ><v-icon small left>mdi-face-agent</v-icon>Get help</v-btn
                          >
                        </div>

                        <div class="mt-9 mb-3">
                          <validation-provider v-slot="{ errors }" slim rules="required">
                            <v-text-field
                              v-model="adkLocalState.proposal"
                              placeholder="https://www.notion.so/yourlinkhere"
                              rounded
                              outlined
                              label="Enter Notion.com proposal link"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </div>
                        <div class="d-flex justify-center">
                          <v-btn
                            class="pl-auto pr-auto mb-12"
                            x-large
                            outlined
                            depressed
                            rounded
                            :disabled="invalid"
                            @click="saveAdkValue(['proposal'])"
                            >Save
                          </v-btn>
                        </div>
                      </v-container></v-card
                    >
                  </v-dialog>

                  <v-btn
                    class="mobile__deliverables2 ma-3 font-weight-bold"
                    color="#6EBA7F"
                    x-large
                    depressed
                    rounded
                    :disabled="!getAdkValue('proposal')"
                  >
                    <a
                      target="_blank"
                      style="text-decoration: none"
                      class="white--text"
                      :href="getAdkValue('proposal')"
                      >Edit Proposal</a
                    ><v-icon color="white" right>mdi-text-box-outline</v-icon>
                  </v-btn></v-row
                ><v-row class="mobile__deliverables d-flex justify-center align-center">
                  <v-dialog
                    v-model="dialogState.promote"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        outlined
                        depressed
                        x-large
                        icon
                        :disabled="!getAdkValue('proposal')"
                        v-on="on"
                        ><v-icon v-if="!getAdkValue('promote')">mdi-link-variant</v-icon>

                        <v-icon v-if="getAdkValue('promote')" color="orange">mdi-check-bold</v-icon>
                      </v-btn>
                    </template>
                    <v-card class="mobile__deliverable-card d-flex flex-column">
                      <div class="d-flex justify-end">
                        <v-btn
                          class="ma-2"
                          x-large
                          icon
                          dark
                          @click="closeLinkItemDialog('promote')"
                        >
                          <v-icon x-large color="grey">mdi-close</v-icon>
                        </v-btn>
                      </div>

                      <v-container class="mt-auto mb-auto">
                        <v-icon class="d-flex justify-center" x-large color="orange"
                          >mdi-contacts</v-icon
                        >
                        <h1 class="d-flex mobile__title justify-center pa-3 font-weight-bold mb-3">
                          Research, engage & manage pipeline of users, testers and customers
                        </h1>

                        <div class="d-flex justify-center">
                          <v-dialog v-model="tutorialDialogPromote" width="516">
                            <template #activator>
                              <v-tooltip right>
                                <template #activator="{ on, attrs }">
                                  <v-btn
                                    v-bind="attrs"
                                    style="text-decoration: none"
                                    depressed
                                    outlined
                                    x-small
                                    rounded
                                    class="mb-6"
                                    color="grey darken-2"
                                    v-on="on"
                                    @click="tutorialDialogPromote = true"
                                    ><v-icon small left>mdi-youtube</v-icon>Get Started</v-btn
                                  >
                                </template>
                                <span>Watch video overview</span>
                              </v-tooltip>
                            </template>
                            <v-card dark class="login__dialog">
                              <div>
                                <iframe
                                  width="100%"
                                  height="400"
                                  src="https://www.youtube.com/embed/ZG4S95rP0ec"
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </v-card>
                          </v-dialog>
                        </div>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-1-circle</v-icon>
                          Create CRM contact book from template
                          <v-btn
                            target="_blank"
                            href="https://www.notion.so/pilotcity/CRM-Enter-team-name-here-e03f8fc496774a08a75c0a505311dd35"
                            icon
                            small
                            ><v-icon small>mdi-open-in-new</v-icon></v-btn
                          >
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-2-circle</v-icon>

                          Enter Notion.com CRM link below
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-3-circle</v-icon>

                          Research, add & engage contacts
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-4-circle</v-icon>

                          Manage and follow-up with prospects
                        </h5>

                        <div class="d-flex justify-center">
                          <v-btn
                            href="https://discord.gg/NtjWMuVbzQ"
                            target="_blank"
                            style="text-decoration: none"
                            depressed
                            outlined
                            x-small
                            rounded
                            color="grey darken-2"
                            ><v-icon small left>mdi-face-agent</v-icon>Get help</v-btn
                          >
                        </div>

                        <div class="mt-9 mb-3">
                          <validation-provider v-slot="{ errors }" slim rules="required">
                            <v-text-field
                              v-model="adkLocalState.promote"
                              placeholder="https://www.notion.so/yourlinkhere"
                              rounded
                              outlined
                              label="Enter Notion.com CRM link"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </div>
                        <div class="d-flex justify-center">
                          <v-btn
                            class="pl-auto pr-auto mb-12"
                            x-large
                            outlined
                            depressed
                            rounded
                            :disabled="invalid"
                            @click="saveAdkValue(['promote'])"
                            >Save</v-btn
                          >
                        </div>
                      </v-container>
                    </v-card>
                  </v-dialog>

                  <v-btn
                    color="#f79961"
                    class="mobile__deliverables2 ma-3 font-weight-bold"
                    x-large
                    depressed
                    rounded
                    :disabled="!getAdkValue('promote')"
                  >
                    <a
                      target="_blank"
                      class="white--text"
                      style="text-decoration: none"
                      :href="getAdkValue('promote')"
                      >Engage Pipeline</a
                    ><v-icon color="white" right>mdi-contacts</v-icon>
                  </v-btn></v-row
                ><v-row class="mobile__deliverables d-flex justify-center align-center">
                  <v-dialog
                    v-model="dialogState.produce"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        outlined
                        depressed
                        x-large
                        icon
                        :disabled="!getAdkValue('promote')"
                        v-on="on"
                        ><v-icon v-if="!getAdkValue('produce')">mdi-link-variant</v-icon>

                        <v-icon v-if="getAdkValue('produce')" color="purple"
                          >mdi-check-bold
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-card class="mobile__deliverable-card d-flex flex-column">
                      <div class="d-flex justify-end">
                        <v-btn
                          class="ma-2"
                          x-large
                          icon
                          dark
                          @click="closeLinkItemDialog('produce')"
                        >
                          <v-icon x-large color="grey">mdi-close</v-icon>
                        </v-btn>
                      </div>

                      <v-container class="mt-auto mb-auto">
                        <v-icon class="d-flex justify-center" x-large color="purple"
                          >mdi-instagram</v-icon
                        >
                        <h1 class="d-flex mobile__title justify-center pa-3 font-weight-bold mb-3">
                          Post project progress on new Instagram.com account
                        </h1>

                        <div class="d-flex justify-center">
                          <v-dialog v-model="tutorialDialogProduce" width="516">
                            <template #activator>
                              <v-tooltip right>
                                <template #activator="{ on, attrs }">
                                  <v-btn
                                    v-bind="attrs"
                                    style="text-decoration: none"
                                    depressed
                                    outlined
                                    x-small
                                    rounded
                                    class="mb-6"
                                    color="grey darken-2"
                                    v-on="on"
                                    @click="tutorialDialogProduce = true"
                                    ><v-icon small left>mdi-youtube</v-icon>Get Started</v-btn
                                  >
                                </template>
                                <span>Watch video overview</span>
                              </v-tooltip>
                            </template>
                            <v-card dark class="login__dialog">
                              <div>
                                <iframe
                                  width="100%"
                                  height="400"
                                  src="https://www.youtube.com/embed/ZLTGBhcAvlY"
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </v-card>
                          </v-dialog>
                        </div>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-1-circle</v-icon>
                          Create Instagram.com project account
                          <v-btn target="_blank" href="https://www.instagram.com/" icon small
                            ><v-icon small>mdi-open-in-new</v-icon></v-btn
                          >
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-2-circle</v-icon>

                          Make account visible to public preferably
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-3-circle</v-icon>

                          Enter Instagram.com link & handle below
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-4-circle</v-icon>

                          Post progress on a daily basis
                        </h5>

                        <div class="d-flex justify-center">
                          <v-btn
                            href="https://discord.gg/W9GZSWcJ5Z"
                            target="_blank"
                            style="text-decoration: none"
                            depressed
                            outlined
                            x-small
                            rounded
                            color="grey darken-2"
                            ><v-icon small left>mdi-face-agent</v-icon>Get help</v-btn
                          >
                        </div>

                        <div class="mt-9 mb-3">
                          <validation-provider
                            v-slot="{ errors }"
                            slim
                            :rules="{
                              regex:
                                /^(?:(?:http|https):\/\/)?(?:www.)?instagram.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/
                            }"
                          >
                            <v-text-field
                              v-model="adkLocalState.produce"
                              placeholder="https://www.instagram.com/yourhandle"
                              rounded
                              outlined
                              label="Enter Instagram.com project link"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </div>
                        <div class="d-flex justify-center">
                          <v-btn
                            class="pl-auto pr-auto mb-12"
                            x-large
                            outlined
                            depressed
                            rounded
                            :disabled="invalid"
                            @click="saveAdkValue(['produce'])"
                            >Save</v-btn
                          >
                        </div>
                      </v-container>
                    </v-card>
                  </v-dialog>

                  <v-btn
                    color="#ae90b0"
                    class="mobile__deliverables2 ma-3 font-weight-bold"
                    x-large
                    depressed
                    rounded
                    :disabled="!getAdkValue('produce')"
                  >
                    <a
                      target="_blank"
                      class="white--text"
                      style="text-decoration: none"
                      :href="getAdkValue('produce')"
                      >Post progress</a
                    ><v-icon color="white" right>mdi-instagram</v-icon>
                  </v-btn></v-row
                ><v-row class="mobile__deliverables d-flex justify-center align-center">
                  <v-dialog
                    v-model="dialogState.pilot"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        outlined
                        depressed
                        x-large
                        icon
                        :disabled="!getAdkValue('produce')"
                        v-on="on"
                        ><v-icon v-if="!getAdkValue('pilot')">mdi-link-variant</v-icon>

                        <v-icon v-if="getAdkValue('pilot')" color="red">mdi-check-bold</v-icon>
                      </v-btn>
                    </template>
                    <v-card class="mobile__deliverable-card d-flex flex-column">
                      <div class="d-flex justify-end">
                        <v-btn class="ma-2" x-large icon dark @click="closeLinkItemDialog('pilot')">
                          <v-icon x-large color="grey">mdi-close</v-icon>
                        </v-btn>
                      </div>

                      <v-container class="mt-auto mb-auto">
                        <v-icon class="d-flex justify-center" x-large color="red"
                          >mdi-youtube</v-icon
                        >
                        <h1 class="d-flex mobile__title justify-center pa-3 font-weight-bold mb-3">
                          Livestream or record your pilot project in action on YouTube.com
                        </h1>

                        <div class="d-flex justify-center">
                          <v-dialog v-model="tutorialDialogPilot" width="516">
                            <template #activator>
                              <v-tooltip right>
                                <template #activator="{ on, attrs }">
                                  <v-btn
                                    v-bind="attrs"
                                    style="text-decoration: none"
                                    depressed
                                    outlined
                                    x-small
                                    rounded
                                    class="mb-6"
                                    color="grey darken-2"
                                    v-on="on"
                                    @click="tutorialDialogPilot = true"
                                    ><v-icon small left>mdi-youtube</v-icon>Get Started</v-btn
                                  >
                                </template>
                                <span>Watch video overview</span>
                              </v-tooltip>
                            </template>
                            <v-card dark class="login__dialog">
                              <div>
                                <iframe
                                  width="100%"
                                  height="400"
                                  src="https://www.youtube.com/embed/0KQjfQ5RGCw"
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </v-card>
                          </v-dialog>
                        </div>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-1-circle</v-icon>
                          Create YouTube playlist for your pilots
                          <v-btn target="_blank" href="https://youtu.be/lnyZv9Vslts" icon small
                            ><v-icon small>mdi-open-in-new</v-icon></v-btn
                          >
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-2-circle</v-icon>
                          Enter public YouTube playlist link below
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-3-circle</v-icon>
                          Prepare for pilot with stakeholders
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-4-circle</v-icon>
                          Livestream or record your pilot in action
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-5-circle</v-icon>
                          Add video to playlist for public viewing
                        </h5>

                        <div class="d-flex justify-center">
                          <v-btn
                            href="https://discord.gg/bGdmx65gFQ"
                            target="_blank"
                            style="text-decoration: none"
                            depressed
                            outlined
                            x-small
                            rounded
                            color="grey darken-2"
                            ><v-icon small left>mdi-face-agent</v-icon>Get help</v-btn
                          >
                        </div>

                        <div class="mt-9 mb-3">
                          <validation-provider
                            v-slot="{ errors }"
                            slim
                            :rules="{
                              regex:
                                /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
                            }"
                          >
                            <v-text-field
                              v-model="adkLocalState.pilot"
                              placeholder="https://www.youtube.com/playlistname/"
                              rounded
                              outlined
                              label="Enter public YouTube.com playlist link"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </div>
                        <div class="d-flex justify-center">
                          <v-btn
                            class="pl-auto pr-auto mb-12"
                            x-large
                            outlined
                            depressed
                            rounded
                            :disabled="invalid"
                            @click="saveAdkValue(['pilot'])"
                            >Save</v-btn
                          >
                        </div>
                      </v-container>
                    </v-card>
                  </v-dialog>

                  <v-btn
                    color="#ea6763"
                    class="mobile__deliverables2 ma-3 font-weight-bold"
                    x-large
                    depressed
                    rounded
                    :disabled="!getAdkValue('pilot')"
                  >
                    <a
                      target="_blank"
                      class="white--text"
                      style="text-decoration: none"
                      :href="getAdkValue('pilot')"
                      >Record pilot</a
                    ><v-icon color="white" right>mdi-youtube</v-icon>
                  </v-btn></v-row
                ><v-row class="mobile__deliverables d-flex justify-center align-center">
                  <v-dialog
                    v-model="dialogState.process"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        outlined
                        depressed
                        x-large
                        icon
                        :disabled="!getAdkValue('pilot')"
                        v-on="on"
                        ><v-icon v-if="!getAdkValue('process')">mdi-link-variant</v-icon>

                        <v-icon v-if="getAdkValue('process')" color="blue">mdi-check-bold</v-icon>
                      </v-btn>
                    </template>
                    <v-card class="mobile__deliverable-card d-flex flex-column">
                      <div class="d-flex justify-end">
                        <v-btn
                          class="ma-2"
                          x-large
                          icon
                          dark
                          @click="closeLinkItemDialog('process')"
                        >
                          <v-icon x-large color="grey">mdi-close</v-icon>
                        </v-btn>
                      </div>

                      <v-container class="mt-auto mb-auto">
                        <v-icon class="d-flex justify-center" x-large color="blue"
                          >mdi-microphone</v-icon
                        >
                        <h1 class="d-flex mobile__title justify-center pa-3 font-weight-bold mb-3">
                          Host debrief podcast with stakeholders after pilot
                        </h1>

                        <div class="d-flex justify-center">
                          <v-dialog v-model="tutorialDialogProcess" width="516">
                            <template #activator>
                              <v-tooltip right>
                                <template #activator="{ on, attrs }">
                                  <v-btn
                                    v-bind="attrs"
                                    style="text-decoration: none"
                                    depressed
                                    outlined
                                    x-small
                                    rounded
                                    class="mb-6"
                                    color="grey darken-2"
                                    v-on="on"
                                    @click="tutorialDialogProcess = true"
                                    ><v-icon small left>mdi-youtube</v-icon>Get Started</v-btn
                                  >
                                </template>
                                <span>Watch video overview</span>
                              </v-tooltip>
                            </template>
                            <v-card dark class="login__dialog">
                              <div>
                                <iframe
                                  width="100%"
                                  height="400"
                                  src="https://www.youtube.com/embed/ZKqfaGLFn0k"
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </v-card>
                          </v-dialog>
                        </div>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-1-circle</v-icon>
                          Coordinate post-pilot debrief podcast with stakeholders on Zoom.com
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-2-circle</v-icon>
                          Prepare topics & debrief questions to ask yourselves
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-3-circle</v-icon>
                          Conduct, record & upload podcast on new YouTube playlist
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-4-circle</v-icon>
                          Repeat debrief podcast for every pilot
                        </h5>

                        <div class="d-flex justify-center">
                          <v-btn
                            href="https://discord.gg/YARnK2jNWD"
                            target="_blank"
                            style="text-decoration: none"
                            depressed
                            outlined
                            x-small
                            rounded
                            color="grey darken-2"
                            ><v-icon small left>mdi-face-agent</v-icon>Get help</v-btn
                          >
                        </div>

                        <div class="mt-9 mb-3">
                          <validation-provider
                            v-slot="{ errors }"
                            slim
                            :rules="{
                              regex:
                                /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
                            }"
                          >
                            <v-text-field
                              v-model="adkLocalState.process"
                              placeholder="https://www.youtube.com/yourplaylist"
                              rounded
                              label="Enter YouTube.com podcast playlist"
                              outlined
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </div>
                        <div class="d-flex justify-center">
                          <v-btn
                            class="pl-auto pr-auto mb-12"
                            x-large
                            outlined
                            depressed
                            rounded
                            :disabled="invalid"
                            @click="saveAdkValue(['process'])"
                            >Save</v-btn
                          >
                        </div>
                      </v-container>
                    </v-card>
                  </v-dialog>

                  <v-btn
                    color="#3c9ccc"
                    class="mobile__deliverables2 ma-3 font-weight-bold"
                    x-large
                    depressed
                    rounded
                    :disabled="!getAdkValue('process')"
                  >
                    <a
                      target="_blank"
                      class="white--text"
                      style="text-decoration: none"
                      :href="getAdkValue('process')"
                      >Host Podcast</a
                    ><v-icon color="white" right>mdi-microphone</v-icon>
                  </v-btn> </v-row
                ><v-row class="mobile__deliverables d-flex justify-center align-center">
                  <v-dialog
                    v-model="dialogState.package"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        outlined
                        depressed
                        x-large
                        icon
                        :disabled="!getAdkValue('process')"
                        v-on="on"
                        ><v-icon v-if="!getAdkValue('package')">mdi-link-variant</v-icon>

                        <v-icon v-if="getAdkValue('package')" color="pink">mdi-check-bold</v-icon>
                      </v-btn>
                    </template>
                    <v-card class="mobile__deliverable-card d-flex flex-column">
                      <div class="d-flex justify-end">
                        <v-btn
                          class="ma-2"
                          x-large
                          icon
                          dark
                          @click="closeLinkItemDialog('package')"
                        >
                          <v-icon x-large color="grey">mdi-close</v-icon>
                        </v-btn>
                      </div>

                      <v-container class="mt-auto mb-auto">
                        <v-icon class="d-flex justify-center" x-large color="pink"
                          >mdi-view-dashboard</v-icon
                        >
                        <h1 class="d-flex mobile__title justify-center pa-3 font-weight-bold mb-3">
                          Design & make website portfolio for final project
                        </h1>

                        <div class="d-flex justify-center">
                          <v-dialog v-model="tutorialDialogPackage" width="516">
                            <template #activator>
                              <v-tooltip right>
                                <template #activator="{ on, attrs }">
                                  <v-btn
                                    v-bind="attrs"
                                    style="text-decoration: none"
                                    depressed
                                    outlined
                                    x-small
                                    rounded
                                    class="mb-6"
                                    color="grey darken-2"
                                    v-on="on"
                                    @click="tutorialDialogPackage = true"
                                    ><v-icon small left>mdi-youtube</v-icon>Get Started</v-btn
                                  >
                                </template>
                                <span>Watch video overview</span>
                              </v-tooltip>
                            </template>
                            <v-card dark class="login__dialog">
                              <div>
                                <iframe
                                  width="100%"
                                  height="400"
                                  src="https://www.youtube.com/embed/1P1vzLklZBU"
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </v-card>
                          </v-dialog>
                        </div>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-1-circle</v-icon>
                          Choose a platform to build your website such as Wix, Weebly or Squarespace
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-2-circle</v-icon>
                          Collect & view project contents together
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-3-circle</v-icon>
                          Configure, design & prototype website
                        </h5>

                        <h5 class="justify-center d-flex mb-6 align-center">
                          <v-icon class="ml-2 mr-2">mdi-numeric-4-circle</v-icon>
                          Update, tinker & finalize website
                        </h5>

                        <div class="d-flex justify-center">
                          <v-btn
                            href="https://discord.gg/jJz94DrU2w"
                            target="_blank"
                            style="text-decoration: none"
                            depressed
                            outlined
                            x-small
                            rounded
                            color="grey darken-2"
                            ><v-icon small left>mdi-face-agent</v-icon>Get help</v-btn
                          >
                        </div>

                        <div class="mt-9 mb-3">
                          <validation-provider v-slot="{ errors }" slim rules="required">
                            <v-text-field
                              v-model="adkLocalState.package"
                              placeholder="https://www.myprojectname.com/"
                              rounded
                              outlined
                              label="Enter website portfolio link"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </div>
                        <div class="d-flex justify-center">
                          <v-btn
                            class="pl-auto pr-auto mb-12"
                            x-large
                            outlined
                            depressed
                            rounded
                            :disabled="invalid"
                            @click="saveAdkValue(['package'])"
                            >Save</v-btn
                          >
                        </div>
                      </v-container>
                    </v-card>
                  </v-dialog>

                  <v-btn
                    color="#E49AB3"
                    class="mobile__deliverables2 ma-3 font-weight-bold"
                    x-large
                    depressed
                    rounded
                    :disabled="!getAdkValue('package')"
                  >
                    <a
                      class="white--text"
                      target="_blank"
                      style="text-decoration: none"
                      :href="getAdkValue('package')"
                      >Make Portfolio</a
                    ><v-icon color="white" right>mdi-view-dashboard</v-icon>
                  </v-btn></v-row
                >
              </div>
            </v-card>
          </v-container>

          <v-container class="mobile__toolbox ma-0 pa-0">
            <v-divider></v-divider>

            <div class="d-flex justify-center flex-row align-center pa-2">
              <v-dialog
                v-model="dialogState.cowork"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                class="mb-auto"
              >
                <template #activator="{ on, attrs }">
                  <a v-bind="attrs" v-on="on">
                    <div class="ma-2 mobile__cowork justify-center d-flex">
                      <v-icon color="white">mdi-discord</v-icon>
                    </div></a
                  >
                </template>
                <v-card
                  class="d-flex justify-center align-center flex-column pt-3"
                  tile
                  color="grey darken-3"
                >
                  <v-icon x-large color="purple">mdi-discord</v-icon>
                  <h1
                    class="
                      d-flex
                      justify-center
                      mobile__title
                      pl-6
                      pr-6
                      pb-6
                      pt-3
                      font-weight-bold
                      white--text
                    "
                  >
                    Talk to team, cowork with interns, build culture
                  </h1>
                  <v-chip
                    v-if="getAdkValue('dailyCoworkingCount')"
                    class="mb-6 font-weight-bold"
                    outlined
                    color="white"
                    dark
                    >Coworked
                    {{ getAdkValue('dailyCoworkingCount') }}
                    Times for
                    {{ getAdkValue('dailyCoworkingTotalDuration') }}
                    Hours

                    <v-tooltip max-width open-on-hover bottom>
                      <template #activator="{ on, attrs }">
                        <v-icon small class="ml-2" v-bind="attrs" v-on="on">mdi-information</v-icon>
                      </template>
                      <span>Coworkings since July 30th, 2021</span>
                    </v-tooltip>
                  </v-chip>

                  <v-chip v-else small class="font-weight-bold mb-6" outlined color="white" dark
                    >Coworked 0 Times for 0 Hours
                  </v-chip>

                  <!-- <v-chip small class="font-weight-bold mb-6" outlined color="white" dark
                    >Coworked {{ getAdkValue('dailyCoworkingCount') }} Times</v-chip
                  > -->

                  <div class="ma-2 mobile__cowork-xl align-center justify-center d-flex">
                    <a target="_blank" style="text-decoration: none" :href="discordLinkEmployer">
                      <span class="mobile__xl-text">Go</span>
                    </a>
                  </div>

                  <div class="d-flex justify-end">
                    <v-btn class="ma-2" x-large icon dark @click="dialogState.cowork = false">
                      <v-icon x-large color="white">mdi-close</v-icon>
                    </v-btn>
                  </div>
                </v-card>
              </v-dialog>

              <v-dialog
                v-model="dialogState.timesheetMaster"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                class="mb-auto"
              >
                <template #activator="{ on, attrs }">
                  <div
                    v-if="lastTimeSheetAction == DailyAction.clockin"
                    v-bind="attrs"
                    class="ma-2 mobile__clockin justify-center d-flex"
                    v-on="on"
                  >
                    <v-icon x-large color="white">mdi-close-octagon</v-icon>
                  </div>

                  <div
                    v-else
                    v-bind="attrs"
                    class="ma-2 mobile__clockedin justify-center d-flex"
                    v-on="on"
                  >
                    <v-icon x-large color="white">mdi-clock-time-four-outline</v-icon>
                  </div>

                  <!-- <v-progress-circular
                    v-if="lastTimeSheetAction == DailyAction.clockin"
                    color="red"
                    size="85"
                    class="ma-2"
                    width="5"
                    indeterminate
                    v-bind="attrs"
                    v-on="on"
                  >
                    <div
                      v-bind="attrs"
                      class="ma-2 mobile__clockin justify-center d-flex"
                      v-on="on"
                    >
                      <v-icon x-large color="white">mdi-close-octagon</v-icon>
                    </div>
                  </v-progress-circular> -->
                </template>
                <v-card
                  class="d-flex justify-center align-center flex-column pt-3"
                  tile
                  color="grey darken-3"
                >
                  <v-btn
                    dark
                    color="grey darken-4"
                    tile
                    class="mobile__close-timesheet-master ma-0 pa-0"
                    depressed
                    @click="dialogState.timesheetMaster = false"
                    >Close Timesheet</v-btn
                  >

                  <!-- <v-icon v-if="lastTimeSheetAction == DailyAction.clockin" x-large color="red"
                    >mdi-close-octagon</v-icon
                  >
                  <v-icon v-else x-large color="green">mdi-clock-time-four-outline</v-icon> -->
                  <h1
                    v-if="lastTimeSheetAction == DailyAction.clockin"
                    class="
                      d-flex
                      justify-center
                      mobile__title
                      pl-6
                      pr-6
                      pb-6
                      pt-3
                      font-weight-bold
                      white--text
                    "
                  >
                    Clock-out
                  </h1>

                  <h1
                    v-else
                    class="
                      d-flex
                      justify-center
                      mobile__title
                      pl-6
                      pr-6
                      pb-6
                      pt-3
                      font-weight-bold
                      white--text
                    "
                  >
                    Clock-in
                  </h1>

                  <v-dialog
                    v-model="dialogState.timesheet"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                  >
                    <template #activator="{ on, attrs }">
                      <div
                        v-if="lastTimeSheetAction == DailyAction.clockin"
                        v-bind="attrs"
                        class="ma-2 mobile__clockin-xl justify-center d-flex align-center"
                        v-on="on"
                      >
                        <v-icon class="mobile__timesheet-icon-xl" color="white"
                          >mdi-close-octagon</v-icon
                        >
                        <!-- <span class="mobile__xl-text-smaller">Clock <br />out</span> -->
                      </div>

                      <div
                        v-else
                        v-bind="attrs"
                        class="ma-2 mobile__clockedin-xl justify-center d-flex align-center"
                        v-on="on"
                      >
                        <v-icon class="mobile__timesheet-icon-xl" color="white"
                          >mdi-clock-time-four-outline</v-icon
                        >
                        <!-- <span class="mobile__xl-text-smaller">Clock <br />in</span> -->
                      </div>
                    </template>
                    <v-card tile class="mobile__deliverable-card d-flex flex-column">
                      <div class="mobile__close-timesheet d-flex justify-center">
                        <v-btn
                          dark
                          color="grey darken-4"
                          tile
                          class="mobile__closetimesheet ma-0 pa-0"
                          depressed
                          @click="$router.go(0)"
                          >Close Timesheet</v-btn
                        >
                      </div>
                      <div class="mobile__videoask-embed">
                        <video-ask
                          :mode="
                            lastTimeSheetAction === DailyAction.clockin
                              ? DailyAction.clockout
                              : DailyAction.clockin
                          "
                          :name="`${user && user.firstName} ${user && user.lastName}`"
                          :email="user && user.email"
                          :phone="user && user.phoneNumber"
                          :event="
                            selectedDoc && selectedDoc.program && selectedDoc.program.programName
                          "
                          :program-id="
                            selectedDoc &&
                            selectedDoc.program_id &&
                            selectedDoc.program_id.toHexString()
                          "
                          :participant-id="user && user._id && user._id.toHexString()"
                        />
                      </div>
                    </v-card>
                  </v-dialog>

                  <!-- <div class="d-flex justify-end">
                    <v-btn
                      class="ma-2"
                      x-large
                      icon
                      dark
                      @click="dialogState.timesheetMaster = false"
                    >
                      <v-icon x-large color="white">mdi-close</v-icon>
                    </v-btn>
                  </div> -->

                  <v-progress-linear
                    class="mobile__timesheet-progress-bar"
                    color="green"
                    dark
                    height="30"
                    :value="clockedHoursProgress"
                  >
                    <span class="font-weight-black overline"
                      >{{ getAdkValue('clockAdjustedHours') }} /
                      {{
                        selectedDoc && selectedDoc.offerDetails && selectedDoc.offerDetails.maxHours
                      }}
                      Hours Max</span
                    >
                  </v-progress-linear>
                  <div class="d-flex flex-row">
                    <v-chip
                      dark
                      large
                      class="pl-6 headline pr-6 font-weight-bold mb-10 mt-10"
                      color="green"
                      >{{ getAdkValue('clockAdjustedHours') }} Hours

                      <v-tooltip max-width open-on-hover bottom>
                        <template #activator="{ on, attrs }">
                          <v-icon class="ml-3" v-bind="attrs" v-on="on">mdi-information</v-icon>
                        </template>
                        <span>Hours since July 13th, 2021</span>
                      </v-tooltip>
                    </v-chip>
                  </div>

                  <!-- WORKED PRIOR TO JULY 13 -->

                  <v-dialog v-model="hoursPriorLaunch" width="350px">
                    <template #activator="{ on, attrs }">
                      <div v-bind="attrs" class="d-flex flex-row" v-on="on">
                        <v-icon class="mr-2" color="white">mdi-history</v-icon>
                        <div class="d-flex align-center justify-center">
                          <h5 class="white--text">
                            <i>Submit hours prior to mobile launch</i>
                          </h5>
                        </div>
                      </div>
                    </template>
                    <v-card class="mobile__deliverable-card2">
                      <v-container
                        class="mt-auto mb-auto d-flex justify-center flex-column pa-0 ma-0"
                      >
                        <div class="d-flex justify-center ma-6 flex-column">
                          <v-icon x-large color="green" class="mb-3"
                            >mdi-clock-time-four-outline</v-icon
                          >
                          <div
                            class="headline font-weight-bold d-flex justify-center mobile__title"
                          >
                            Submit work hours for approval prior to July 13th, 2021 or mobile web
                            app launch
                          </div>
                        </div>
                        <v-text-field
                          v-model="adkLocalState.hoursPriorLaunch"
                          label="Enter Hours"
                          class="mt-6 ml-6 mr-6"
                          rounded
                          type="number"
                          outlined
                          disabled
                        ></v-text-field>
                        <div class="mobile__title">
                          <h5 class="ml-6 mr-6 mb-6">
                            <i
                              >The deadline to submit hours has passed. Please text (510) 330-2810
                              if you'd like to request changes or submit hours past the deadline</i
                            >
                          </h5>
                        </div>
                      </v-container>

                      <div class="d-flex justify-center">
                        <v-btn
                          class="pl-auto pr-auto mb-12"
                          x-large
                          outlined
                          depressed
                          rounded
                          :disabled="invalid"
                          @click="saveAdkValue(['hoursPriorLaunch']), (hoursPriorLaunch = false)"
                          >Submit
                        </v-btn>
                      </div>
                    </v-card>
                  </v-dialog>

                  <!-- WORKED PRIOR TO JULY 13 -->
                </v-card>
              </v-dialog>

              <!-- <div class="ma-2 mobile__calendar justify-center d-flex" @click="redirectPage()">
                <v-icon color="white">mdi-calendar-month</v-icon>
              </div> -->

              <v-dialog
                v-model="dialogState.calendar"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                class="mb-auto"
              >
                <template #activator="{ on, attrs }">
                  <a v-bind="attrs" v-on="on">
                    <div class="ma-2 mobile__calendar justify-center d-flex">
                      <v-icon color="white">mdi-calendar-month</v-icon>
                    </div></a
                  >
                </template>
                <v-card
                  class="d-flex justify-center align-center flex-column pt-3"
                  color="grey darken-3"
                  tile
                >
                  <v-icon x-large color="blue">mdi-calendar-month</v-icon>
                  <h1
                    class="
                      d-flex
                      justify-center
                      mobile__title
                      pl-6
                      pr-6
                      pb-2
                      pt-3
                      font-weight-bold
                      white--text
                    "
                  >
                    Attend weekly employer meetings, coworking, activities
                  </h1>

                  <div class="d-flex justify-center align-center">
                    <div class="overline font-weight-black d-flex align-center white--text">
                      Gmail
                    </div>
                    <div>
                      <v-switch
                        v-model="adkLocalState.calendarPreference"
                        dense
                        inset
                        dark
                        class="ml-3"
                        @click="saveAdkValue(['calendarPreference'])"
                      ></v-switch>
                    </div>
                    <div class="overline font-weight-black d-flex align-center white--text">
                      Outlook
                    </div>
                  </div>

                  <div
                    v-if="getAdkValue('calendarPreference')"
                    class="ma-2 mobile__calendar-xl align-center justify-center d-flex"
                  >
                    <a
                      class="white--text mobile__xl-text"
                      style="text-decoration: none"
                      href="https://outlook.live.com/calendar"
                    >
                      Go
                    </a>
                  </div>

                  <div v-else class="ma-2 mobile__calendar-xl align-center justify-center d-flex">
                    <a
                      class="white--text mobile__xl-text"
                      style="text-decoration: none"
                      href="https://calendar.google.com/"
                    >
                      Go
                    </a>
                  </div>

                  <div class="d-flex justify-end">
                    <v-btn class="ma-2" x-large icon dark @click="dialogState.calendar = false">
                      <v-icon x-large color="white">mdi-close</v-icon>
                    </v-btn>
                  </div>
                </v-card>
              </v-dialog>
            </div>
            <!-- BOOKMARK -->

            <!-- <div class="mobile__clockedin-bar d-flex justify-center"> -->
            <!-- <v-progress-linear color="red" dark height="20" :value="clockedHoursProgress"
              ><span class="font-weight-black overline"
                >{{ getAdkValue('clockAdjustedHours') }} /
                {{ maximumClockedHours }}
                Hours</span
              ></v-progress-linear
            > -->
            <!-- </div> -->

            <div
              v-if="lastTimeSheetAction == DailyAction.clockin"
              class="mobile__clockedin-bar d-flex justify-center"
            >
              <div class="d-flex white--text overline font-weight-black">
                <v-icon class="mr-2" small color="white">mdi-clock-time-four-outline</v-icon>Clocked
                in
              </div>
            </div>
          </v-container>
        </v-skeleton-loader>
      </Loading>
    </ValidationObserver>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, toRefs } from '@vue/composition-api';
import { ObjectId } from 'bson';
import { from as ixfrom } from 'ix/asynciterable';
import { useUserGetters, useDbGetters, useRealmAppState } from '@/store';
import Loading from '@/components/Loading.vue';
import Profile from '@/components/Profile.vue';
import { headerValue } from '@/constants/directory';
import { DailyAction } from '@/constants/daily-action';
import VideoAsk from '@/components/VideoAsk.vue';
import { AdkState } from './MobileEmployer/types/program';
import { AdkName } from './MobileEmployer/types/adk';
import { Question, VideoaskEvent } from './Mobile/types/videoask';

/**
 * The adk link item names.
 */
type AdkLinkItem = 'proposal' | 'promote' | 'produce' | 'pilot' | 'process' | 'package';

/**
 * The dialog states for all link items + additional things.
 */
type DialogStateKey =
  | AdkLinkItem
  | 'program'
  | 'directory'
  | 'objective'
  | 'settings'
  | 'cowork'
  | 'calendar'
  | 'workshops'
  | 'timesheetMaster'
  | 'timesheet';
type DialogState = {
  [item in DialogStateKey]: boolean;
};

/**
 * Link items in the adk object.
 */
type AdkLinkItemState = {
  [item in AdkLinkItem]?: string;
};

/**
 * Final interface of the adk object.
 *
 * Contains additional data such as settings.
 *
 * Modify this interface when adding new properties.
 */
interface IAdkInfo extends AdkLinkItemState {
  calendarPreference?: string;
  acknowledge?: boolean;
  objectiveKeyResults?: Array<string>;
  clockAdjustedHours?: number;
  // rating feedback form
  ratingInternshipOverall?: number;
  ratingEmployerWeeklyMeeting?: number;
  ratingEmployerDirection?: number;
  ratingEmployerWorkingRelationship?: number;
  ratingCoworkingMood?: number;
  ratingProjectProgress?: number;
  ratingAttendingSocials?: number;
  ratingVax?: boolean;
  ratingInPersonSocials?: number;
  ratingWorkshop?: boolean;
  ratingWorkshopHelpfulness?: number;
  ratingNewFriends?: number;
  ratingWeeklyMeetingChange?: string;
  ratingCoworkingChange?: string;
  ratingAcknowledgeSignoff?: boolean;
  ratingAcknowledgeMinHours?: boolean;
  ratingAcknowledgeDeliverablesCompletion?: boolean;
  ratingNewDeadlineDate?: string;
  ratingOneImprovement?: string;
  sevenPointInternshipCompletion?: boolean;
  finalPresentationConfirmation?: boolean;
  finalPresentationAbsence?: string;
  exitInterviewComplete?: boolean;
  exitInterviewIncomplete?: boolean;
}

/**
 * The adk object as stored in the db in `studentDoc.adks`.
 */
interface IAdk extends IAdkInfo {
  name: 'mobile';
}

/**
 * Final `studentDoc` interface with `programDoc` added.
 */
interface IDoc {
  _id: ObjectId;
  program_id: ObjectId;
  offerDetails: any;
  program: {
    programName: string;
    organizers: Array<ObjectId>;
    adks: AdkState;
  };
  adk?: IAdk;
}

interface ITimesheetDoc {
  _id: ObjectId;
  contact: {
    name: string;
    email: string;
    status: string;
    answers: [];
  };
  form: {
    questions: [];
  };
}

export default defineComponent({
  name: 'Mobile',

  components: {
    Loading,
    Profile,
    VideoAsk
  },

  setup(props, ctx) {
    // getting the db
    const { app } = useRealmAppState(['app']);
    const db = app.value.currentUser?.mongoClient('mongodb-atlas').db('Primary');
    const { collection } = useDbGetters(['collection']);
    const { getUser, getObjectId } = useUserGetters(['getUser', 'getObjectId']);
    const myDocs = ref<Array<IDoc>>([]);
    const user = ref<
      | {
          _id: ObjectId;
          firstName: string;
          lastName: string;
          email: string;
          profile: {
            medium: string;
          };
        }
      | undefined
    >();
    const adkLocalState = ref<IAdkInfo>({});
    const _selectedDoc = ref<IDoc | undefined>();
    const announcement5 = ref(false);
    const timeSheetDoc = ref<VideoaskEvent | undefined>();
    /**
     * Computed, current `studentDoc`. The setter updates `adkLocalState` to match the specific doc.
     */
    const selectedDoc = computed({
      get: () => _selectedDoc.value,
      set: newVal => {
        _selectedDoc.value = newVal;
        adkLocalState.value = { ...newVal?.adk };
      }
    });

    // for the objective results
    // const keyResultsValues = ref([]);

    const dialogState = reactive<DialogState>({
      calendar: false,
      cowork: false,
      proposal: false,
      promote: false,
      produce: false,
      pilot: false,
      process: false,
      package: false,
      program: false,
      directory: false,
      objective: false,
      settings: false,
      timesheet: false,
      timesheetMaster: false,
      workshops: false
    });

    // for the v-data table
    const users = ref<any[]>([]);
    // for students
    const studentData = ref<any[]>([]);
    // for organizers
    const organizerData = ref<any[]>([]);

    // for the program Doc Id
    // const programId = ref<ObjectId>();

    const loadData = async () => {
      const studentDocs = await collection.value!('Student').find(
        {
          participant_id: getObjectId.value,
          // https://docs.mongodb.com/manual/reference/operator/query/elemMatch/
          // Must have "offerStatus" true to view
          adks: {
            $elemMatch: {
              name: 'offer',
              offerStatus: true
            }
          }
        },
        {
          projection: {
            _id: 1,
            participant_id: 1,
            program_id: 1,
            offerDetails: 1,
            adks: {
              $elemMatch: {
                name: 'mobile'
              }
            }
          }
        }
      );

      user.value = await collection.value!('User').findOne(
        {
          _id: getObjectId.value
        },
        {
          projection: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            phoneNumber: 1,
            profile: {
              medium: 1
            }
          }
        }
      );

      const programDocs = await collection.value!('Program').find(
        {
          _id: { $in: studentDocs.map(student => student.program_id) }
        },
        {
          projection: {
            programName: 1,
            organizers: 1,
            adks: 1
          }
        }
      );

      myDocs.value = studentDocs.map((student): IDoc => {
        const program = programDocs.find(program => student.program_id.equals(program._id));
        return {
          _id: student._id,
          program_id: student.program_id,
          offerDetails: student.offerDetails,
          program: {
            programName: program.programName,
            organizers: program.organizers,
            adks: {
              mobile: program.adks.find((adk: { name: AdkName }) => adk.name === 'mobile'),
              directory: program.adks.find((adk: { name: AdkName }) => adk.name === 'directory'),
              objective: program.adks.find((adk: { name: AdkName }) => adk.name === 'objective')
            }
          },
          adk: student.adks?.[0]
        };
      });

      [selectedDoc.value] = myDocs.value;

      if (!selectedDoc.value) ctx.root.$router.push({ name: 'landing' });

      // Setup event listeners for VideoAsk
      // TODO: extract this to a separate composable hook
      console.log(
        `Setting up timesheet change stream for user ${user.value?._id.toHexString()}, program ${selectedDoc.value?.program_id.toHexString()}`
      );
      const timesheetChangeStream = collection.value!('Timesheet').watch({
        filter: {
          'contact.variables.participant_id': { $eq: user.value?._id.toHexString() },
          'contact.variables.program_id': { $eq: selectedDoc.value?.program_id.toHexString() }
        }
      });
      // TODO: give this a proper type
      ixfrom<any>(timesheetChangeStream).forEach(change => {
        const questions = change?.fullDocument?.form?.questions ?? [];
        console.log('timesheetChangeStream triggered');
        // eslint-disable-next-line no-use-before-define
        setLastTimeSheetAction(questions);
      });

      const timeSheetDocs = await collection.value!('Timesheet').find(
        {
          'contact.variables.participant_id': { $eq: user.value?._id.toHexString() },
          'contact.variables.program_id': { $eq: selectedDoc.value?.program_id.toHexString() }
        },
        {
          sort: {
            'contact.created_at': -1 // TODO: add index for this
          },
          limit: 1
        }
      );
      const [lastTimeSheet] = timeSheetDocs;
      timeSheetDoc.value = lastTimeSheet;
      // eslint-disable-next-line no-use-before-define
      setLastTimeSheetAction(timeSheetDoc?.value?.form?.questions ?? []);
      announcement5.value = selectedDoc?.value?.adk?.exitInterviewComplete !== 'Yes';
    };

    const announcement4 = ref(true);

    function getAdkValue(key: keyof IAdkInfo) {
      return selectedDoc.value?.adk?.[key];
    }

    const discordLinkEmployer = computed(() => {
      return selectedDoc.value?.program.adks.mobile?.discordEmployerChannel;
    });

    const keyResultsValues = computed(() => {
      return selectedDoc.value?.program.adks.objective?.keyResults;
    });

    // for the employer objective
    const primaryObjectiveValue = computed(() => {
      return selectedDoc.value?.program.adks.objective?.primaryObjective;
    });

    // Final Presentation Date
    const finalPresentationDate = computed(() => {
      return selectedDoc.value?.program.adks.mobile?.finalPresentation;
    });

    /**
     * Get value from the adk object stored in the db.
     */
    /**
     * Reset local state for a link item to db value or empty when dialog closes.
     */
    function closeLinkItemDialog(key: AdkLinkItem) {
      dialogState[key] = false;
      adkLocalState.value[key] = getAdkValue(key) ?? '';
    }
    /**
     * Save value under the adk object to the db
     */
    async function saveAdkValue(keys: (keyof IAdkInfo)[]) {
      if (!selectedDoc.value?.adk) {
        const adkObj: IAdk = {
          name: 'mobile'
        };

        keys.forEach(key => {
          adkObj[key] = adkLocalState.value[key];
        });

        try {
          await collection.value!('Student').updateOne(
            {
              _id: selectedDoc.value?._id
            },
            {
              $push: {
                adks: adkObj
              }
            }
          );
          selectedDoc.value!.adk = adkObj;
        } catch (e) {
          console.log('Error while pushing new adk to studentDoc');
          throw e;
        }
      } else {
        const setObj = {};

        keys.forEach(key => {
          setObj[`adks.$.${key}`] = adkLocalState.value[key];
        });

        try {
          await collection.value!('Student').updateOne(
            {
              _id: selectedDoc.value?._id,
              adks: { $elemMatch: { name: 'mobile' } }
            },
            {
              $set: setObj
            }
          );
          keys.forEach(key => {
            selectedDoc.value.adk[key] = setObj[`adks.$.${key}`];
          });
        } catch (e) {
          console.log('Error while settings ADK values');
          throw e;
        }
      }
      keys.forEach(key => {
        dialogState[key] = false;
      });
    }

    const directoryLoaded = ref(false);

    async function loadDirectory() {
      const students = await db!.collection('Student').find(
        {
          program_id: selectedDoc.value?.program_id,
          offerDetails: { $exists: true }
        },
        {
          projection: {
            _id: 1,
            program_id: 1,
            participant_id: 1,
            offerDetails: 1,
            applicationStatus: 1
          }
        }
      );

      const organizers = await db!.collection('EmployerPortfolio').find(
        {
          _id: {
            $in: selectedDoc.value?.program.organizers
          }
        },
        {
          projection: {
            _id: 1,
            employerName: 1,
            jobTitle: 1
          }
        }
      );

      const studentIds: Array<ObjectId> = students.map(
        (student: { participant_id: ObjectId }) => student.participant_id
      );
      const organizerIds: Array<ObjectId> = organizers.map(
        (organizer: { _id: ObjectId }) => organizer._id
      );
      const userIds = studentIds.concat(organizerIds);
      const usersData = await db!.collection('User').find(
        {
          _id: {
            $in: userIds
          }
        },
        {
          projection: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
            email: 1
          }
        }
      );
      const studentsData = students.map((student: { participant_id: ObjectId }) => {
        return {
          user: usersData.find((user: { _id: ObjectId }) =>
            user._id.equals(student.participant_id)
          ),
          ...student
        };
      });
      const organizersData = organizers.map((organizer: { _id: ObjectId }) => {
        return {
          user: usersData.find((user: { _id: ObjectId }) => user._id.equals(organizer._id)),
          directory: selectedDoc.value?.program.adks.directory?.directoryPreferences.find(
            preference => preference.userId.equals(organizer._id)
          ),
          ...organizer
        };
      });
      // setting the studnet Doc value to student data
      studentData.value = studentsData;
      // setting the organizers Doc value to student data
      organizerData.value = organizersData;
      users.value = organizersData.concat(studentsData as any[]);

      directoryLoaded.value = true;
    }

    enum DirectoryView {
      all,
      employers,
      interns
    }

    const state = reactive({
      directoryView: DirectoryView.all,
      selectedDirectoryPreferences: undefined,
      openDialog: false,
      showInstructions: true,
      lastTimeSheetAction: ''
    });

    const setLastTimeSheetAction = (questions: Question[]) => {
      const clockin = questions.find(
        question =>
          question?.metadata?.text?.toLowerCase() === 'clock-in' &&
          question?.transcode_status === 'completed'
      );
      const clockout = questions.find(
        question =>
          question?.metadata?.text?.toLowerCase() === 'clock-out' &&
          question?.transcode_status === 'completed'
      );

      if (!!clockin && !clockout) {
        state.lastTimeSheetAction = DailyAction.clockin;
      } else if (!!clockout && !clockin) {
        state.lastTimeSheetAction = DailyAction.clockout;
      } else {
        state.lastTimeSheetAction = DailyAction.clockout;
      }

      console.log('setLastTimeSheetAction', state.lastTimeSheetAction);
    };

    const organizers = computed(() => {
      return organizerData.value?.map(organizer => {
        // ooverride email and phone with hidden value unless directory preferences are set otherwise
        const email =
          organizer.directory?.hideEmail === false ? organizer.user.email : '**********';
        const phoneNumber =
          organizer.directory?.hidePhone === false ? organizer.user.phoneNumber : '**********';
        return {
          ...organizer.user,
          email,
          phoneNumber,
          name: `${organizer.user.firstName} ${organizer.user.lastName}`,
          role: organizer.jobTitle,
          directory: organizer.directory
        };
      });
    });

    const students = computed(() => {
      return studentData.value
        ?.filter(student => student.applicationStatus === 'accepted')
        ?.map(student => {
          // comment this line if you want students phone number to show up
          const phoneNumber = '**********';
          return {
            ...student.user,
            // comment this line if you want students phone number to show up
            phoneNumber,
            name: `${student.user.firstName} ${student.user.lastName}`,
            role: student?.offerDetails?.position
          };
        });
    });

    const filterDatavalues = computed(() => {
      switch (state.directoryView) {
        case DirectoryView.all:
          return [...organizers.value, ...students.value];
        case DirectoryView.employers:
          return organizers.value;
        case DirectoryView.interns:
          return students.value;
        default:
          throw new Error(`Invalid directoryView value: ${state.directoryView}`);
      }
    });

    // calendar
    const calendarValue = ref(false);
    // for redirecting
    const redirectPage = () => {
      // _blank specifies the link to open in a new tab
      if (String(adkLocalState.value.calendarPreference) === 'false') {
        // eslint-disable-next-line no-restricted-globals
        window.open('https://calendar.google.com/');
        // window.open('https://calendar.google.com/', '_blank');
      } else {
        window.open('https://outlook.live.com/calendar');
        // window.open('https://outlook.live.com/calendar', '_blank');
      }
    };

    // for objective
    const testBox1 = ref([]);

    const lengthCheckbox = computed(() => {
      return testBox1.value.length;
    });

    const keyResultLength = computed(() => {
      return keyResultsValues.value?.length;
    });

    const acknowledge = computed(() => {
      return ref(getAdkValue('acknowledge'));
    });

    const diableAcknowledgebutton = () => {
      dialogState.objective = false;
      adkLocalState.value.acknowledge = true;
      adkLocalState.value.objectiveKeyResults = keyResultsValues.value;
      saveAdkValue(['acknowledge', 'objectiveKeyResults']);
    };
    // end of objective

    const clockedHoursProgress = computed(() => {
      const clockAdjustedHours = getAdkValue('clockAdjustedHours') as number;

      const { minHours } = selectedDoc?.value?.offerDetails ?? 1;
      const { maxHours } = selectedDoc?.value?.offerDetails ?? 1;

      if (Number.isNaN(minHours) || Number.isNaN(clockAdjustedHours)) {
        return 0;
      }

      // UNCOMMENT IF CALCULATION DIVIDED BY MIN HOURS TOO
      // if (clockAdjustedHours <= minHours) {
      //   return (clockAdjustedHours / minHours) * 100;
      // }

      return (clockAdjustedHours / maxHours) * 100;
    });

    const maximumClockedHours = computed(() => {
      const clockAdjustedHours = getAdkValue('clockAdjustedHours') as number;
      const { minHours } = selectedDoc?.value?.offerDetails ?? 1;
      const { maxHours } = selectedDoc?.value?.offerDetails ?? 1;
      // UNCOMMENT IF CALCULATATION DIVIDED BY MIN HOURS TOO
      // if (clockAdjustedHours <= minHours) {
      //   return minHours;
      // }
      return maxHours;
    });

    // for the rating values
    const announcement2 = ref(true);

    const savingRatings = async () => {
      try {
        await saveAdkValue([
          'ratingInternshipOverall',
          'ratingEmployerWeeklyMeeting',
          'ratingEmployerDirection',
          'ratingEmployerWorkingRelationship',
          'ratingCoworkingMood',
          'ratingProjectProgress',
          'ratingAttendingSocials',
          'ratingVax',
          'ratingInPersonSocials',
          'ratingWorkshop',
          'ratingWorkshopHelpfulness',
          'ratingNewFriends',
          'ratingWeeklyMeetingChange',
          'ratingCoworkingChange',
          'ratingAcknowledgeSignoff',
          'ratingAcknowledgeMinHours',
          'ratingAcknowledgeDeliverablesCompletion',
          'ratingNewDeadlineDate',
          'ratingOneImprovement'
        ]);
        console.log('Save questions succesfully');
        announcement2.value = false;
      } catch (error) {
        console.log('Failed to save questions.');
        console.log(error);
      }
    };
    // for the 7-Point Internship Completion
    const announcement3 = ref(true);
    const savingInternshipCompletion = async () => {
      try {
        await saveAdkValue(['sevenPointInternshipCompletion']);
        console.log('Save questions succesfully');
        announcement3.value = false;
      } catch (error) {
        console.log('Failed to save questions.');
        console.log(error);
      }
    };
    // for the Final Presentation Confirmation

    const savingFinalPresentation = async () => {
      try {
        await saveAdkValue(['finalPresentationConfirmation', 'finalPresentationAbsence']);
        console.log('Save questions succesfully');
        announcement4.value = false;
      } catch (error) {
        console.log('Failed to save questions.');
        console.log(error);
      }
    };

    // for Exit Interview
    // const announcement5 = ref(true);
    const savingExitInterview = async () => {
      try {
        const response = await saveAdkValue(['exitInterviewComplete', 'exitInterviewIncomplete']);
        console.log('Save questions succesfully');
        announcement5.value = false;
      } catch (error) {
        console.log('Failed to save questions.');
        console.log(error);
      }
    };

    // Interactions
    const menuNewDeadlineDate = ref(false);
    return {
      loadData,
      dialogState,
      user,
      myDocs,
      selectedDoc,
      adkLocalState,
      getAdkValue,
      saveAdkValue,
      closeLinkItemDialog,
      header: headerValue,
      items: filterDatavalues,
      directoryLoaded,
      loadDirectory,
      DirectoryView,
      ...toRefs(state),
      calendarValue,
      redirectPage,
      DailyAction,
      discordLinkEmployer,
      // returns for for objective
      testBox1,
      keyResultsValues,
      keyResultLength,
      lengthCheckbox,
      acknowledge,
      primaryObjectiveValue,
      finalPresentationDate,
      diableAcknowledgebutton,
      timeSheetDoc,
      clockedHoursProgress,
      maximumClockedHours,
      savingRatings,
      savingInternshipCompletion,
      savingFinalPresentation,
      savingExitInterview,
      menuNewDeadlineDate,
      newFriends: [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30'
      ],

      // end of objective
      tutorialDialogProposal: false,
      tutorialDialogPromote: false,
      tutorialDialogProduce: false,
      tutorialDialogPilot: false,
      tutorialDialogProcess: false,
      tutorialDialogPackage: false,
      announcement1: true,
      takeover: true,
      announcement2,
      announcement3,
      announcement4,
      announcement5,
      hoursPriorLaunch: false,
      libraryUpcoming: [0],
      libraryCurrent: [0],
      libraryTooltip: true
    };
  }
});
</script>

<style lang="scss">
.mobile {
  &__app {
    width: 100vw;
    height: 100vh;
  }

  &__dashboard {
    height: 100vh;
    overflow-y: scroll;
  }
  &__toolbox {
    background-color: #ffffff;
    // background-color: #404142;
    height: fit-content;
    width: 100vw;
    position: fixed;
    bottom: 0;
    // border-radius: 25px;
  }

  &__cowork {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background-color: #ae90b0;
    border: 5px solid #bea3c0;
    &:hover {
      background-color: #886197;
      cursor: pointer;
    }
    &:active {
      background-color: #5e386d;
      cursor: pointer;
    }
  }

  &__cowork-xl {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background-color: #ae90b0;
    // z-index: 20;
    border: 6px solid #c3a8c5;
    &:hover {
      background-color: #886197;
      cursor: pointer;
    }
    &:active {
      background-color: #5e386d;
      cursor: pointer;
    }
  }

  &__calendar-xl {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background-color: #3c9ccc;
    // z-index: 20;
    border: 6px solid #46a8da;
    &:hover {
      background-color: #4daedf;
      cursor: pointer;
    }
    &:active {
      background-color: #2587b8;
      cursor: pointer;
    }
  }

  &__xl-text {
    font-size: 3.25rem;
    color: #ffffff;
    font-weight: 700;
  }

  &__xl-text-smaller {
    font-size: 1.5rem;
    color: #ffffff;
    font-weight: 700;
  }

  &__cowork-background {
    background-color: #404142 !important;
    opacity: 95%;
    width: 100vw;
    height: 100vh;
    margin: 0px;
    padding: 0px;
    position: fixed;
  }

  &__clockin {
    border-radius: 50%;
    width: 85px;
    height: 85px;
    background-color: #ea6763;
    border: 5px solid #f98d89;
    &:hover {
      background-color: #fc8581;
      cursor: pointer;
    }
    &:active {
      background-color: #db4c47;
      cursor: pointer;
    }
  }

  &__clockin-xl {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background-color: #ea6763;
    border: 5px solid #f98d89;
    &:hover {
      background-color: #fc8581;
      cursor: pointer;
    }
    &:active {
      background-color: #db4c47;
      cursor: pointer;
    }
  }

  &__clockedin {
    border-radius: 50%;
    width: 85px;
    height: 85px;
    background-color: #6eba7f;
    border: 5px solid #80ca90;
    &:hover {
      background-color: #58a769;
      cursor: pointer;
    }
    &:active {
      background-color: #4c9c5d;
      cursor: pointer;
    }
  }

  &__clockedin-xl {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background-color: #6eba7f;
    border: 5px solid #80ca90;
    &:hover {
      background-color: #58a769;
      cursor: pointer;
    }
    &:active {
      background-color: #4c9c5d;
      cursor: pointer;
    }
  }

  &__calendar {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background-color: #3c9ccc;
    border: 5px solid #4bacdc;
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
    // z-index: 50;
  }

  &__signupforpinup {
    width: 100%;
    // z-index: 50;
  }

  &__closetimesheet {
    width: 100%;
    // position: fixed;
    top: 0;
    // z-index: 50;
    position: relative;
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
    padding-bottom: 300px;
  }

  &__divider {
    width: 100vw;
  }

  &__fullwidth {
    border-top: 1px solid #dedede;
    width: 100vw;
  }

  &__fullwindow {
    width: 100vw;
    // width: 100%;
    min-width: 100vw;
    // padding: auto;
  }

  &__deliverable-card {
    position: absolute;
    overflow-x: hidden;
    // width: 100%;
  }

  &__deliverable-card2 {
    overflow-x: hidden;
    // width: 100%;
  }

  &__videoask-embed {
    // overflow-y: scroll;
    top: 0;
    // position: absolute;
    height: fit-content;
    width: 100vw;
    background-color: #000000;
  }
  &__videoask-iframe {
    height: 85vh;
    // top: 0;
    background-color: #000000;
    width: 100%;
  }

  &__close-timesheet {
    background-color: #f98d89;
  }

  &__close-timesheet-green {
    background-color: #81ca91;
  }

  &__clockedin-bar {
    background-color: #6eba7f;
  }

  &__downtown-takeover-bar {
    background-color: #f98d89;
  }
  &__library-button {
    width: 130.8px;
  }

  &__airtable-embed-fullscreen {
    .v-expansion-panel-content__wrap {
      padding: 0px;
    }
  }
  &__timesheet-progress-bar {
    position: fixed;
    bottom: 0;
  }

  &__close-timesheet-master {
    position: fixed;
    top: 0;
    width: 100%;
  }

  &__timesheet-icon-xl {
    font-size: 75px !important;
  }

  &__survey-question {
    text-align: center;
  }

  &__videoask-fullscreen {
    max-width: 100vw;
  }
}
</style>
