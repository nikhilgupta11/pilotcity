<template>
  <div>
    <div class="my-programs d-flex flex-column justify-start flex-nowrap align-center">
      <v-container class="my-programs">
        <!-- EMPLOYER PROGRAM CARD START -->
        <div class="d-flex justify-center">
          <div class="my-programs__wrappers mt-12 mb-5">
            <h2 class="font-weight-black">My Programs</h2>
            <v-card
              v-for="(program, index) in organizerPrograms"
              :key="'organizer' + index"
              flat
              tile
              class="my-5"
            >
              <v-row class="pc-program-card my-0 ma-0">
                <v-col class="py-0 pa-0 program-card-column" sm="auto">
                  <v-img
                    :src="`https://lh3.googleusercontent.com/d/${images[index]}=w510-h300-p`"
                    class="pc-program-card__image"
                    :max-width="$vuetify.breakpoint.sm ? '100%' : '360'"
                  ></v-img>
                </v-col>
                <v-col class="pc-program-card__content pt-5">
                  <div class="d-flex justify-start align-start">
                    <h5 class="pc-program-card__title text-h5 font-weight-bold">
                      {{ program.programName || 'Setup up your program now' }}
                    </h5>
                  </div>

                  <div
                    class="d-flex justify-end align-center"
                    :class="{
                      'mt-0': $vuetify.breakpoint.smAndDown,
                      'mt-10': $vuetify.breakpoint.mdAndUp
                    }"
                  >
                    <v-btn
                      v-if="program.published"
                      rounded
                      class="pc-program-card__btn font-weight-bold mt-11 mr-4"
                      icon
                      @click="openCloneModal(program)"
                    >
                      <v-icon color="grey lighten-1">mdi-content-copy</v-icon>
                    </v-btn>
                    <v-btn
                      outlined
                      rounded
                      x-large
                      class="pc-program-card__btn font-weight-bold mt-11"
                      @click="handleClickOnProgram(program.published, program._id)"
                      >{{ program.published ? 'Monitor Program' : 'Finish Setup' }}</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-card>

            <!-- Clone program modal -->
            <v-dialog v-model="cloneModal" persistent width="fit-content">
              <v-card>
                <v-card-title class="d-flex justify-space-between">
                  <span class="font-weight-bold"
                    ><span>Clone: </span>{{ currentProgram.programName }}</span
                  >
                  <v-btn class="ma-2" x-large icon dark @click="cloneModal = false">
                    <v-icon x-large color="grey">mdi-close</v-icon>
                  </v-btn>
                </v-card-title>

                <!-- <v-divider></v-divider> -->

                <ValidationObserver ref="observer" v-slot="{ invalid }" slim>
                  <v-container class="d-flex justify-center flex-column">
                    <div
                      class="d-flex justify-center module-setup__name-interview"
                      :class="$vuetify.breakpoint.xs ? 'flex-column' : 'flex-row'"
                    >
                      <div
                        class="module-setup__name-interview"
                        style="position: relative; padding-bottom: 25px"
                      >
                        <validation-provider v-slot="{ errors }" slim rules="required">
                          <v-text-field
                            v-model="programName"
                            hide-details
                            :error-messages="errors"
                            :disabled="isCloningProgram"
                            class="ma-3"
                            label="New program name"
                            rounded
                            outlined
                            style="width: 40vw"
                            @keyup="verifyProgramName"
                          >
                            <template slot="append">
                              <v-progress-circular v-if="isVerifying" size="20" indeterminate />
                            </template>
                          </v-text-field>
                          <div class="d-flex flex-column ml-8">
                            <label v-if="validationMsg" class="invalid">
                              {{ validationMsg }}
                            </label>
                          </div>
                        </validation-provider>
                      </div>
                      <div class="d-flex" :class="$vuetify.breakpoint.xs ? 'flex-row' : ''">
                        <v-btn
                          class="ma-3 white--text font-weight-bold"
                          :disabled="invalid || !isVerified"
                          :dark="!invalid && isVerified"
                          x-large
                          color="green"
                          rounded
                          depressed
                          @click="cloneProgram"
                        >
                          <v-progress-circular
                            v-if="isCloningProgram"
                            class="mr-2"
                            size="20"
                            indeterminate
                            color="white"
                          ></v-progress-circular>
                          <v-icon v-else left>mdi-content-copy</v-icon>
                          Clone
                        </v-btn>
                      </div>
                    </div>
                  </v-container>
                </ValidationObserver>
              </v-card>
            </v-dialog>

            <v-card
              v-for="(program, index) in studentPrograms"
              :key="'student' + index"
              flat
              tile
              class="my-5"
            >
              <v-row class="pc-program-card my-0 ma-0">
                <v-col class="py-0 pa-0 program-card-column" sm="auto">
                  <v-img
                    :src="`https://lh3.googleusercontent.com/d/${
                      images[index + organizerPrograms.length]
                    }=w510-h300-p`"
                    :max-width="$vuetify.breakpoint.sm ? '100%' : '360'"
                  ></v-img>
                </v-col>
                <v-col class="pc-program-card__content pt-5">
                  <h5 class="pc-program-card__title headline font-weight-bold">
                    {{ program.programName }}
                  </h5>
                  <v-progress-linear
                    v-if="program.adks"
                    color="green"
                    class="mt-6 mb-6 white--text overline"
                    striped
                    rounded
                    height="14"
                    :value="calculateProgramCompletion(program.adks, program.teamAdks)"
                  >
                    <template #default="{ value }">
                      <strong class="completion-text3 font-weight-black"
                        >{{ Math.ceil(value) }}%</strong
                      >
                    </template>
                  </v-progress-linear>
                  <v-progress-linear
                    v-if="program.awaitingSponsorship"
                    color="grey"
                    class="mt-6 mb-6 green--text overline"
                    striped
                    rounded
                    height="14"
                    :value="0"
                  >
                    <template>
                      <strong class="completion-text3 font-weight-black grey--text">0%</strong>
                    </template>
                  </v-progress-linear>
                  <div class="d-flex justify-end">
                    <v-btn
                      outlined
                      rounded
                      x-large
                      class="pc-program-card__btn mt-6 font-weight-bold"
                      :disabled="program.awaitingSponsorship"
                      @click="
                        $router.push({
                          name: 'guide',
                          params: { programId: program._id, page: '0' }
                        })
                      "
                    >
                      <v-icon v-if="program.awaitingSponsorship" left>mdi-trophy</v-icon>
                      {{
                        program.awaitingSponsorship ? 'Awaiting Sponsorship' : 'Continue Program'
                      }}
                    </v-btn>
                    <v-btn
                      v-if="program.awaitingSponsorship"
                      depressed
                      rounded
                      x-large
                      :loading="program.cancelSponsorRequestLoading"
                      color="error"
                      class="mt-6 ml-2"
                      @click="cancelSponsorRequest(index)"
                    >
                      <v-icon left>mdi-cancel</v-icon>
                      Cancel
                    </v-btn>
                    <!-- <a href="#" class="pc-program-card__button w-button">Checkout</a> -->
                  </div>
                </v-col>
              </v-row>
            </v-card>
            <!-- STUDENT PROGRAM CARD END -->

            <!-- STAKEHOLDER PROGRAM CARD START -->
            <div v-if="students.length" class="pc-program-card mt-5 mb-5">
              <v-card tile class="pa-0 ma-0" flat height="225px">
                <div class="pc-program-card__content py-5 px-5">
                  <div class="pc-program-card__contentData d-flex">
                    <div class="d-flex">
                      <v-avatar class="mr-2" color="blue" size="40"
                        ><v-img
                          src="https://f.hubspotusercontent00.net/hubfs/2480959/P_Cutoff3-Oct-07-2020-10-55-09-87-AM.png"
                        ></v-img
                      ></v-avatar>
                      <div
                        class="pc-program-card__title-monitor font-weight-bold d-flex align-center"
                      >
                        Flagship Program
                      </div>
                    </div>
                    <div class="pc-program-card__badge pt-0">
                      <v-btn x-small rounded depressed disabled
                        >Build employer projects to win internships</v-btn
                      >
                    </div>
                  </div>
                  <div class="pc-program-card__actions">
                    <div class="pc-program-card__outline">
                      <div class="d-flex justify-end align-end mt-16">
                        <v-btn
                          outlined
                          x-large
                          rounded
                          class="font-weight-bold"
                          @click="$router.push({ name: 'Monitor' })"
                          >Monitor {{ students.length }} Participants</v-btn
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </v-card>
            </div>
            <v-hover v-slot="{ hover }">
              <div class="my-programs__card1-border">
                <v-card
                  flat
                  tile
                  class="my-programs__card1 white text-center gray--text text-h5 font-weight-black"
                  :elevation="hover ? 6 : 0"
                >
                  <v-card class="my-programs__card2 d-flex justify-center align-center">
                    <v-tooltip top color="green">
                      <template #activator="{ on, attrs }">
                        <v-btn
                          x-large
                          icon
                          color="gray"
                          v-bind="attrs"
                          v-on="on"
                          @click="$router.push({ name: 'explore' })"
                        >
                          <v-icon dark x-large>mdi-sign-direction</v-icon>
                        </v-btn>
                      </template>
                      <span class="font-weight-black overline">
                        <v-icon dark left>mdi-sign-direction</v-icon>
                        Explore Programs
                      </span>
                    </v-tooltip>
                  </v-card>
                </v-card>
              </div>
            </v-hover>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, Ref, ref, set } from '@vue/composition-api';
import { ObjectId } from 'bson';
import axios from 'axios';
import _ from 'lodash';
import { useUserGetters, useDbGetters, useDbState } from '@/store';
import imageIds from '@/generated/pilotcity_images';
import calculateProgramCompletion from '@/utils/calculateProgramCompletion';

export default defineComponent({
  setup(props, context) {
    const { collection } = useDbGetters(['collection']);
    const { getObjectId } = useUserGetters(['getObjectId']);
    const dialog = ref(false);
    const { user } = useDbState(['user']);
    const cloneModal = ref(false);
    const programName = ref('');
    const currentProgram = ref('');
    const observer = ref('');
    const isVerified = ref(false);
    const role = computed(() => {
      const types = user.value?.userTypes;
      if (types?.includes('School') || types?.includes('Parent') || types?.includes('Teacher'))
        return 'Monitor';
      if (types?.includes('Employer')) return 'Manage';
      return 'none';
    });
    const students: Ref<Record<string, any>[]> = ref([]);
    const organizerPrograms: Ref<Record<string, any>> = ref([]);
    const studentPrograms: Record<string, any> = reactive([]);
    const images: Ref<Array<string>> = ref([]);
    (async () => {
      // collect students being auto-monitored by user
      const autoMonitors = await collection.value!('Monitor').find({
        owner: getObjectId.value
      });
      const autoMonitoredStudents: ObjectId[] = [];
      autoMonitors.forEach(obj => {
        autoMonitoredStudents.push(...obj.monkey.map(student => student.userID));
      });
      const studentQuery = {
        stakeholders: { $exists: true, $ne: null },
        program_id: { $exists: true, $ne: null } as Record<string, any> | ObjectId,
        $or: [
          { stakeholders: getObjectId.value },
          { stakeholders: user.value?.email },
          { participant_id: { $in: autoMonitoredStudents } }
        ]
      };
      // collect students being monitored by user
      students.value = await collection.value!('Student').find(studentQuery);
      // collect programs user is managing
      organizerPrograms.value = await collection.value!('Program').find({
        organizers: getObjectId.value,
        lastSaved: { $exists: true }
      });
      // collect student docs for programs user is participating in
      const studentDocs = await collection.value!('Student').find({
        participant_id: getObjectId.value
      });
      // collect teams the student is a part of
      const teamDocs = await collection.value!('ProgramTeam').find({
        'members._id': getObjectId.value
      });
      // collect sponsor request that are pending for the user
      const sponsorRequests = await collection.value!('SponsorRequest').find({
        participant_id: getObjectId.value,
        status: 'pending'
      });
      // get programIds for all programs
      const programIds = studentDocs.map(doc => doc.program_id);
      programIds.push(...sponsorRequests.map(doc => doc.program_id));
      const programDocs = await collection.value!('Program').find({
        _id: { $in: programIds }
      });
      // collect both studentDocs and sponsorRequests into studentPrograms
      studentPrograms.push(
        ...studentDocs.map(studentDoc => {
          const program = programDocs.find(doc => doc._id.equals(studentDoc.program_id));
          const teamDoc = teamDocs.find(
            doc =>
              doc.members.some(member => member._id.equals(studentDoc.participant_id)) &&
              doc.program_id.equals(studentDoc.program_id)
          );
          return {
            programName: program.programName,
            _id: program._id,
            adks: studentDoc.adks,
            teamAdks: teamDoc ? teamDoc.adks : []
          };
        })
      );
      studentPrograms.push(
        ...sponsorRequests.map(request => {
          const program = programDocs.find(doc => doc._id.equals(request.program_id));
          return {
            programName: program.programName,
            _id: program._id,
            awaitingSponsorship: request.status === 'pending',
            sponsorRequestId: request._id
          };
        })
      );

      // Get the needed amount of random PilotCity images
      let n = studentPrograms.length + organizerPrograms.value.length;
      images.value = new Array(n);
      let len = imageIds.length;
      const taken = new Array(n);
      while (n--) {
        const x = Math.floor(Math.random() * len);
        images.value[n] = imageIds[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
    })();

    // Function to cancel sponsor requests
    async function cancelSponsorRequest(programIndex) {
      // Set loading property to document
      set(studentPrograms, programIndex, {
        ...studentPrograms[programIndex],
        cancelSponsorRequestLoading: true
      });
      await collection.value!('SponsorRequest').updateOne(
        {
          _id: studentPrograms[programIndex].sponsorRequestId,
          participant_id: getObjectId.value
        },
        {
          $set: {
            status: 'canceled'
          }
        }
      );
      // Remove document from displayed array of programs
      studentPrograms.splice(programIndex, 1);
    }

    const handleClickOnProgram = (isProgramPublished, programId) => {
      if (isProgramPublished) {
        context.root.$router.push({ path: `/monitor?program=${programId.toString()}` });
      } else {
        context.root.$router.push({ path: `/guide/${programId}/0` });
      }
    };

    // clone functionality
    function openCloneModal(val) {
      currentProgram.value = val;
      cloneModal.value = true;
    }

    const isCloningProgram = ref(false);
    const isVerifying = ref(false);
    async function cloneProgram() {
      const API_ENDPOINT = process.env.VUE_APP_CLONE_PROGRAM;

      const data = {
        owner_id: user.value?._id.toString(),
        program_id: currentProgram.value._id.toString(),
        program_name: programName.value
      };
      try {
        isCloningProgram.value = true;
        const resp = await axios.post(`${API_ENDPOINT}/clone-program`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (resp.data) {
          isCloningProgram.value = false;
          observer.value.reset();
          cloneModal.value = false;
          context.root.$router.push({ path: `/guide/${resp.data.data._id.toString()}/0` });
        }
      } catch (err) {
        console.log(err);
        isCloningProgram.value = false;
      }
    }

    const validationMsg = ref('');
    const verifyProgramName = _.debounce(async () => {
      const API_ENDPOINT = process.env.VUE_APP_CLONE_PROGRAM;

      try {
        isVerifying.value = true;
        const resp = await axios.get(
          `${API_ENDPOINT}/verify-program-name?program_name=${programName.value}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (resp.data.is_unique) {
          isVerified.value = true;
          isVerifying.value = false;
          validationMsg.value = '';
        } else {
          isVerified.value = false;
          isVerifying.value = false;
          validationMsg.value = 'Enter unique program name';
        }
      } catch (err) {
        console.log(err);
        isVerifying.value = false;
      }
    }, 500);

    return {
      role,
      cloneModal,
      verifyProgramName,
      validationMsg,
      isVerified,
      isVerifying,
      observer,
      cloneProgram,
      isCloningProgram,
      currentProgram,
      openCloneModal,
      programName,
      organizerPrograms,
      studentPrograms,
      cancelSponsorRequest,
      images,
      calculateProgramCompletion,
      dialog,
      students,
      handleClickOnProgram
    };
  }
});
</script>

<style lang="scss">
.pc-program-card {
  border: 1px solid #dedede;
  &__content {
    @media (max-width: 991px) {
      padding: 20px !important;
    }
  }
  &:hover {
    border: 1px solid #404142;
  }
  // button {
  //   height: fit-content !important;
  // }
  &__btn {
    @media (max-width: 767px) {
      width: 100% !important;
    }
  }
  &__contentData {
    align-items: center;
    @media (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &__badge {
    margin-left: 12px;
    @media (max-width: 767px) {
      margin-left: 0px;
      margin-top: 10px !important;
    }
  }
}
.program-card-column {
  @media (max-width: 1199px) {
    width: 100%;
  }
}
.completion-text3 {
  font-family: 'Roboto';
  font-size: 13px;
}

.my-programs {
  // max-width: 93.5%;
  // display: block;

  &__wrappers {
    width: 80%;
    @media (min-width: 768px) and (max-width: 1199px) {
      width: 90%;
    }
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  &__programs-title {
    width: 100%;
    font-size: 25px;
    line-height: 35px;
    margin-bottom: 33px;
    font-family: Raleway;
  }
  &__wrapper {
    width: 100%;
    max-width: 80%;
    margin-top: 50px;
  }
  &__wrapper-col {
    display: -ms-grid;
    display: grid;
    justify-content: space-between;
    justify-items: start;
    align-items: center;
    grid-auto-columns: 1fr;
    grid-column-gap: 40px;
    grid-row-gap: 40px;
    grid-template-areas: 'Area Area-2' 'Area-3 Area-4';
    -ms-grid-columns: 1fr 0vw 1fr;
    grid-template-columns: 1fr 1fr;
    -ms-grid-rows: auto 16px auto;
    grid-template-rows: auto auto;
  }
  &__card1 {
    width: 100%;
    height: 200px;

    transition: opacity 0.1s ease-in-out;
  }

  &__card1-border {
    border: 1px dashed #c7c8ca;
  }
  &__card2 {
    height: 100%;
    cursor: pointer;
  }

  &__card2-border {
    border: 1px dashed #c7c8ca;
  }
}

@media screen and (min-width: 1920px) {
  .my-programs__wrapper-col {
    -ms-grid-columns: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media screen and (max-width: 991px) {
  .my-programs__tab {
    margin-right: 0px;
    margin-left: 0px;
  }
  .my-programs__wrapper-col {
    grid-template-areas: 'Area' 'Area-3';
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
  }
}
@media screen and (max-width: 767px) {
  .my-programs__container {
    margin-top: 213px;
  }
}
.invalid {
  font-size: 14px;
  color: #ff5252;
}
.validation-msg {
  position: absolute;
  bottom: 30px;
  left: 30px;
}
</style>
