<template>
  <v-container class="module-edit pa-0">
    <iframe
      v-if="programDoc.data && programDoc.data.videoAskShareId"
      :src="`https://www.videoask.com/${programDoc.data.videoAskShareId}`"
      allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
      width="100%"
      height="600px"
      style="border: none; border-radius: 0px"
      class="module-edit__videoask-interview"
    >
    </iframe>
    <div v-else class="module-edit__videoask-container pa-0">
      <div v-if="!isFormId" class="d-flex justify-center mt-12">
        <v-btn
          rounded
          x-large
          depressed
          class="font-weight-bold white--text"
          color="blue"
          @click="generateInterview"
        >
          <v-progress-circular
            v-if="isGenerating && !isFormId"
            class="mr-2 setup-adk-interview-generate"
            size="25"
            indeterminate
            color="white"
          ></v-progress-circular>
          Generate Interview
        </v-btn>
      </div>

      <!-- INTERVIEW TEMPLATE SECTION -->
      <div v-else class="d-flex flex-column align-center mt-12 text-center">
        <div class="mb-6">
          <h3>Add, redo or delete interview questions</h3>
        </div>

        <!-- EXAMPLE INTERVIEW QUESTION -->
        <v-progress-circular
          v-if="!interviewQuestions.length"
          size="30"
          indeterminate
          color="primary"
        ></v-progress-circular>
        <draggable
          v-else
          :options="{ handle: '.drag' }"
          tag="ul"
          class="interview-list-wrapper"
          :list="interviewQuestions"
          @change="change"
        >
          <li
            v-for="(question, index) in interviewQuestions"
            :key="index"
            class="flex flex-row align-center justify-start pt-auto pb-auto"
            :class="[
              index === 0 ? 'pointer-none' : '',
              index === interviewQuestions.length - 1 ? 'pointer-none' : '',
              index === interviewQuestions.length - 2 ? 'pointer-none' : '',
              $vuetify.breakpoint.xs ? 'ml-2' : 'ml-12'
            ]"
          >
            <div class="d-flex align-end mr-2">
              <v-img
                class="drag"
                width="20px"
                height="20px"
                src="/img/icons/drag.svg"
                style="cursor: pointer"
              ></v-img>
            </div>

            <div class="ma-2 pointer-view">
              <v-btn rounded depressed outlined @click="viewQuestion(question.media_url)">
                View
              </v-btn>
            </div>

            <div class="ma-1">
              <v-btn small icon @click="reRecordQ(question)">
                <v-icon small>mdi-restart</v-icon>
              </v-btn>
            </div>

            <div class="ma-1">
              <v-btn small icon @click="editQuestion(question)">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </div>
            <div
              v-if="question"
              class="ma-2"
              v-bind:style="{ minWidth: $vuetify.breakpoint.xs ? '200px' : ' ' }"
            >
              <h4 style="text-align: left">{{ question.title }}</h4>
            </div>

            <div class="ma-1">
              <v-btn small icon @click="openDeleteModal(question)">
                <v-icon small color="red">mdi-trash-can-outline</v-icon>
              </v-btn>
            </div>
          </li>
        </draggable>

        <!-- View Question -->
        <v-dialog v-model="viewQuestionDialog" width="fit-content">
          <v-card>
            <div class="d-flex flex-row">
              <div>
                <video
                  v-if="currentMediaUrl && viewQuestionDialog"
                  class="viewQuestionDialog"
                  :width="$vuetify.breakpoint.xs ? '100%' : '760'"
                  :height="$vuetify.breakpoint.xs ? '270' : '450'"
                  controls
                >
                  <source :src="currentMediaUrl" type="video/mp4" />
                </video>
                <!-- <iframe
                  v-if="currentMediaUrl && viewQuestionDialog"
                  :src="currentMediaUrl"
                  allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
                  width="500px"
                  height="500px"
                  style="border: none; margin: 0px; padding: 0px"
                  type="video/mp4"
                >
                </iframe> -->
              </div>
            </div>
          </v-card>
        </v-dialog>

        <!-- rerecord Q -->
        <v-dialog v-model="reRecordDialog" persistent width="800">
          <v-card>
            <div class="d-flex flex-column">
              <div>
                <vid ref="reRecord" @media="getMedia" />
              </div>
            </div>
            <v-container class="d-flex justify-center flex-column">
              <div class="d-flex flex-row justify-center mt-3 mb-3">
                <v-btn
                  class="ma-2 white--text"
                  x-large
                  rounded
                  color="red"
                  depressed
                  @click="closeReRecordDialog"
                >
                  Close
                </v-btn>
                <v-btn
                  class="ma-2 white--text"
                  :disabled="!isBase64"
                  x-large
                  color="black"
                  rounded
                  depressed
                  @click="reRecordQuestion()"
                >
                  <v-progress-circular
                    v-if="submittingQuestion"
                    class="mr-2"
                    size="20"
                    indeterminate
                    color="white"
                  ></v-progress-circular>
                  <v-icon v-else left>mdi-check-all</v-icon>
                  Submit
                </v-btn>
              </div>
            </v-container>
          </v-card>
        </v-dialog>

        <!-- update Q -->
        <v-dialog v-model="editInterviewQuestion" :width="$vuetify.breakpoint.xs ? '100%' : '30vw'">
          <v-card>
            <v-card-title class="d-flex flex-column">
              <div class="overline font-weight-bold">Rename this interview question</div>
            </v-card-title>

            <v-divider></v-divider>
            <v-container
              class="d-flex justify-center"
              :class="$vuetify.breakpoint.xs ? 'flex-column' : 'flex-row'"
            >
              <div>
                <v-text-field
                  v-model="renameQuestion"
                  class="ma-3"
                  hide-details
                  rounded
                  outlined
                ></v-text-field>
              </div>

              <v-btn
                class="ma-3"
                color="green"
                x-large
                dark
                rounded
                depressed
                @click="updateQuestion"
              >
                <v-progress-circular
                  v-if="updatingQuestion"
                  class="mr-2"
                  size="25"
                  indeterminate
                  color="white"
                ></v-progress-circular>
                Rename
              </v-btn>
            </v-container>
          </v-card>
        </v-dialog>

        <!-- Add Q -->
        <div class="module-edit__add pa-6 d-flex justify-center">
          <v-dialog v-model="addQuestionDialog" persistent width="700">
            <template #activator="{ attrs }">
              <v-btn
                v-bind="attrs"
                :ripple="false"
                rounded
                x-large
                class="white--text font-weight-bold"
                depressed
                color="blue"
                @click="openAddQModal"
              >
                <v-icon class="module-edit__add-icon font-weight-bold" left> mdi-plus </v-icon>
                Add Interview Question
              </v-btn>
            </template>
            <ValidationObserver ref="observer" v-slot="{ invalid }" slim>
              <v-card>
                <div class="d-flex flex-column pa-0">
                  <div>
                    <vid ref="addQuestion" @media="getMedia" />
                  </div>
                </div>
                <v-container class="d-flex justify-center flex-column">
                  <div
                    class="d-flex justify-center align-center module-setup__name-interview"
                    :class="$vuetify.breakpoint.xs ? 'flex-column' : 'flex-row'"
                  >
                    <div class="module-setup__name-interview">
                      <validation-provider v-slot="{ errors }" slim rules="required">
                        <v-text-field
                          v-model="newQuestion"
                          hide-details
                          :error-messages="errors"
                          class="ma-3"
                          label="Name your interview question"
                          rounded
                          outlined
                        ></v-text-field>
                      </validation-provider>
                    </div>
                    <div class="d-flex" :class="$vuetify.breakpoint.xs ? 'flex-row' : ''">
                      <div>
                        <v-btn
                          class="ma-2 white--text font-weight-bold"
                          :disabled="invalid || !isBase64"
                          x-large
                          color="green"
                          rounded
                          depressed
                          @click="addNewQuestion()"
                        >
                          <v-progress-circular
                            v-if="submittingQuestion"
                            class="mr-2"
                            size="20"
                            indeterminate
                            color="white"
                          ></v-progress-circular>
                          <v-icon v-else left>mdi-check-all</v-icon>
                          Submit
                        </v-btn>
                      </div>

                      <div>
                        <v-btn
                          class="ma-2 white--text font-weight-bold"
                          x-large
                          rounded
                          color="red"
                          depressed
                          @click="closeAddQDialog"
                        >
                          <v-icon left>mdi-close</v-icon>Exit
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </v-container>
              </v-card>
            </ValidationObserver>
          </v-dialog>
        </div>

        <!-- delete Q -->
        <v-dialog v-model="deleteInterviewQuestion" width="fit-content">
          <v-card>
            <v-card-title class="d-flex flex-column">
              <div class="overline font-weight-bold">Delete this interview question forever?</div>
            </v-card-title>

            <v-divider></v-divider>

            <v-container class="d-flex flex-column justify-center">
              <div class="d-flex flex-row justify-center mt-4 mb-6">
                <v-btn
                  class="ma-2"
                  outlined
                  x-large
                  rounded
                  depressed
                  @click="deleteInterviewQuestion = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  class="ma-2"
                  color="red"
                  x-large
                  dark
                  rounded
                  depressed
                  @click="deleteQuestion()"
                >
                  <v-progress-circular
                    v-if="isDeleting"
                    class="mr-2"
                    size="20"
                    indeterminate
                    color="white"
                  ></v-progress-circular>
                  Delete
                </v-btn>
              </div>
            </v-container>
          </v-card>
        </v-dialog>

        <!-- Confirm order change -->
        <v-dialog v-model="changeOrderDialog" width="fit-content">
          <v-card>
            <v-card-title class="d-flex flex-column">
              <div class="overline font-weight-bold">you really want to change order ?</div>
            </v-card-title>

            <v-divider></v-divider>

            <v-container class="d-flex flex-column justify-center">
              <div class="d-flex flex-row justify-center mt-4 mb-6">
                <v-btn class="ma-2" outlined x-large rounded depressed @click="revert">
                  Cancel
                </v-btn>
                <v-btn class="ma-2" color="red" x-large dark rounded depressed @click="changeOrder">
                  <v-progress-circular
                    v-if="isChanging"
                    class="mr-2"
                    size="20"
                    indeterminate
                    color="white"
                  ></v-progress-circular>
                  Confirm
                </v-btn>
              </div>
            </v-container>
          </v-card>
        </v-dialog>

        <!-- Reset Interview -->
        <div class="">
          <v-dialog v-model="resetInterviewDialog" width="fit-content">
            <template #activator="{ on, attrs }">
              <v-btn
                class="setup-adk-interview-default"
                depressed
                color="transparent"
                small
                v-bind="attrs"
                rounded
                v-on="on"
              >
                Reset default
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="d-flex flex-column">
                <div class="overline font-weight-bold">Reset interview to default questions?</div>
              </v-card-title>

              <v-divider></v-divider>

              <v-container class="d-flex flex-column justify-center">
                <div
                  class="d-flex justify-center mt-4 mb-6"
                  :class="$vuetify.breakpoint.xs ? 'flex-column' : 'flex-row'"
                >
                  <v-btn
                    class="ma-2"
                    outlined
                    x-large
                    rounded
                    depressed
                    @click="resetInterviewDialog = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    class="ma-2"
                    color="red"
                    x-large
                    dark
                    rounded
                    depressed
                    @click="resetInterview"
                  >
                    <v-progress-circular
                      v-if="isDeleting"
                      class="mr-2 setup-adk-interview-reset"
                      size="20"
                      indeterminate
                      color="white"
                    ></v-progress-circular>
                    Reset Interview
                  </v-btn>
                </div>
              </v-container>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { reactive, toRefs, ref, computed } from '@vue/composition-api';
// import gql from 'graphql-tag';
import draggable from 'vuedraggable';
import axios from 'axios';
// import videojs from 'video.js';
import MongoDoc from './types';
import vid from './videorec.vue';

export default {
  name: 'ModuleSetup',
  components: {
    draggable,
    vid
  },

  props: {
    userDoc: {
      required: true,
      type: Object as () => MongoDoc
    },
    programDoc: {
      required: true,
      type: Object as () => MongoDoc
    },
    fetchProgram: {
      required: true,
      type: [Object, Function]
    }
  },

  setup(props: any, ctx) {
    const setup = reactive({});

    const programDocument = computed({
      get: () => props.programDoc,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    const index = programDocument.value.data.adks.findIndex(obj => {
      if (obj) {
        return obj.name === 'interview';
      }
      return false;
    });

    // Questions Array
    const interviewQuestions = ref([]);

    const isFormId = computed(() => {
      if (programDocument.value && programDocument.value.data.adks[index].form_id) {
        return true;
      }
      return false;
    });

    // Dialog Handling
    const viewQuestionDialog = ref(false);
    const addQuestionDialog = ref(false);
    const reRecordDialog = ref(false);
    const reRecord = ref<InstanceType<typeof vid>>();
    const addQuestion = ref<InstanceType<typeof vid>>();
    const editInterviewQuestion = ref(false);
    const deleteInterviewQuestion = ref(false);
    const resetInterviewDialog = ref(false);
    const isDeleting = ref(false);
    const renameQuestion = ref('');
    const newQuestion = ref('');
    const currentQuestionId = ref('');
    const updatingQuestion = ref(false);
    const currentMediaUrl = ref('');
    const base64 = ref('');
    const submittingQuestion = ref(false);
    const isGenerating = ref(false);
    const changeOrderDialog = ref(false);
    const isChanging = ref(false);
    const observer = ref('');
    let moveEvent = reactive({
      newIndex: '',
      oldIndex: '',
      element: ''
    });

    function openAddQModal() {
      addQuestion.value?.initPlayer();
      addQuestionDialog.value = true;
    }

    function getMedia(val) {
      base64.value = val;
    }

    const isBase64 = computed(() => {
      if (base64.value) {
        return true;
      }
      return false;
    });

    function reRecordQ(val) {
      reRecord.value?.initPlayer();
      reRecordDialog.value = true;
      currentQuestionId.value = val.question_id;
    }

    function viewQuestion(val) {
      viewQuestionDialog.value = true;
      currentMediaUrl.value = val;
    }

    function change(event) {
      changeOrderDialog.value = true;
      moveEvent = { ...event.moved };
    }

    function revert() {
      if (moveEvent) {
        interviewQuestions.value[moveEvent.newIndex] = interviewQuestions.value[moveEvent.oldIndex];
        interviewQuestions.value[moveEvent.oldIndex] = moveEvent.element;
        changeOrderDialog.value = false;
        moveEvent = reactive({
          newIndex: '',
          oldIndex: '',
          element: ''
        });
      }
    }

    async function changeOrder() {
      const API_ENDPOINT = process.env.VUE_APP_ADK_INTERVIEW_REORDER;

      try {
        isChanging.value = true;
        const res = await axios.put(
          API_ENDPOINT,
          {
            question_array: interviewQuestions.value
          },
          {
            params: {
              form_id: programDocument.value.data.adks[index].form_id
            },
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        interviewQuestions.value = res.data.data.questions;
        changeOrderDialog.value = false;
        isChanging.value = false;
      } catch (err) {
        console.log(err);
      }
    }

    async function fetchFormData(val) {
      const API_ENDPOINT = process.env.VUE_APP_ADK_INTERVIEW_FORMDATA;

      try {
        const res = await axios.get(API_ENDPOINT, {
          params: {
            form_id: val
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (res) {
          interviewQuestions.value = res.data.data.questions;
          isGenerating.value = false;
        }
      } catch (err) {
        console.log(err);
      }
    }

    async function updateQuestion() {
      const API_ENDPOINT = process.env.VUE_APP_ADK_INTERVIEW_RENAME;
      try {
        updatingQuestion.value = true;
        const data = {
          title: renameQuestion.value
        };
        const res = await axios.patch(API_ENDPOINT, data, {
          params: {
            question_id: currentQuestionId.value
          }
        });
        fetchFormData(programDocument.value.data.adks[index].form_id).then(res => {
          currentQuestionId.value = '';
          updatingQuestion.value = false;
          editInterviewQuestion.value = false;
        });
      } catch (err) {
        console.log(err);
        updatingQuestion.value = false;
        editInterviewQuestion.value = false;
      }
    }

    function editQuestion(val) {
      editInterviewQuestion.value = true;
      renameQuestion.value = val.title;
      currentQuestionId.value = val.question_id;
    }

    function openDeleteModal(val) {
      deleteInterviewQuestion.value = true;
      currentQuestionId.value = val.question_id;
    }

    if (
      programDocument.value &&
      programDocument.value.data.adks[index] &&
      programDocument.value.data.adks[index].form_id
    ) {
      fetchFormData(programDocument.value.data.adks[index].form_id);
    }
    const isQueAvailable = ref(false);
    async function generateInterview() {
      const API_ENDPOINT = process.env.VUE_APP_ADK_INTERVIEW_GENERATE;

      const data = {
        email_id: props.userDoc.data.email,
        program_id: ctx.root.$route.params.programId,
        program_name: props.programDoc.data.programName
      };
      try {
        isGenerating.value = true;
        const resp = await axios.post(API_ENDPOINT, data);

        if (resp.data) {
          const interviewForm = {
            form_id: resp.data.data.form_id,
            form_url: resp.data.data.share_url
          };
          programDocument.value.data.adks[index].form_id = interviewForm.form_id;
          programDocument.value.data.adks[index].form_url = interviewForm.form_url;
          programDocument.value.update(() => ({
            props,
            isComplete: true,
            adkIndex: index,
            status: 'complete_setup'
          }));
          fetchFormData(interviewForm.form_id);
        }
      } catch (err) {
        console.log(err);
        isGenerating.value = false;
      }
    }

    async function addNewQuestion() {
      const API_ENDPOINT = process.env.VUE_APP_ADK_INTERVIEW_ADD_QUESTION;

      const data = {
        media_url: base64.value,
        title: newQuestion.value
      };

      try {
        submittingQuestion.value = true;
        const resp = await axios.post(API_ENDPOINT, data, {
          params: {
            form_id: programDocument.value.data.adks[index].form_id
          }
        });
        fetchFormData(programDocument.value.data.adks[index].form_id).then(res => {
          addQuestion.value?.removePlayer();
          submittingQuestion.value = false;
          addQuestionDialog.value = false;
          base64.value = '';
          newQuestion.value = '';
          observer.value.reset();
        });
      } catch (err) {
        console.log(err);
        submittingQuestion.value = false;
      }
    }
    function closeAddQDialog() {
      addQuestion.value?.removePlayer();
      addQuestionDialog.value = false;
      newQuestion.value = '';
      observer.value.reset();
    }

    async function deleteQuestion() {
      const API_ENDPOINT = process.env.VUE_APP_ADK_INTERVIEW_DEL_QUESTION;

      try {
        isDeleting.value = true;
        const resp = await axios.delete(API_ENDPOINT, {
          params: {
            question_id: currentQuestionId.value
          }
        });

        if (resp) {
          fetchFormData(programDocument.value.data.adks[index].form_id).then(res => {
            currentQuestionId.value = '';
            isDeleting.value = false;
            deleteInterviewQuestion.value = false;
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    async function reRecordQuestion() {
      const API_ENDPOINT = process.env.VUE_APP_ADK_INTERVIEW_RE_QUESTION;

      const data = {
        media_url: base64.value
      };

      try {
        submittingQuestion.value = true;
        const resp = await axios.patch(API_ENDPOINT, data, {
          params: {
            question_id: currentQuestionId.value
          }
        });
        fetchFormData(programDocument.value.data.adks[index].form_id).then(() => {
          reRecord.value?.removePlayer();
          submittingQuestion.value = false;
          reRecordDialog.value = false;
          base64.value = '';
          currentQuestionId.value = '';
        });
      } catch (err) {
        console.log(err);
        submittingQuestion.value = false;
      }
    }

    function closeReRecordDialog() {
      reRecord.value?.removePlayer();
      currentQuestionId.value = '';
      reRecordDialog.value = false;
    }

    async function resetInterview() {
      const API_ENDPOINT = process.env.VUE_APP_ADK_INTERVIEW_RESET;

      try {
        isDeleting.value = true;
        const resp = await axios.patch(
          `${API_ENDPOINT}?form_id=${programDocument.value.data.adks[index].form_id}`
        );
        fetchFormData(programDocument.value.data.adks[index].form_id).then(() => {
          isDeleting.value = false;
          resetInterviewDialog.value = false;
        });
      } catch (err) {
        console.log(err);
        isDeleting.value = false;
      }
    }

    return {
      viewQuestionDialog,
      resetInterview,
      addQuestion,
      reRecordDialog,
      changeOrderDialog,
      moveEvent,
      revert,
      closeAddQDialog,
      observer,
      closeReRecordDialog,
      change,
      reRecord,
      isChanging,
      getMedia,
      openAddQModal,
      addQuestionDialog,
      resetInterviewDialog,
      editInterviewQuestion,
      currentMediaUrl,
      interviewQuestions,
      deleteInterviewQuestion,
      editQuestion,
      renameQuestion,
      generateInterview,
      reRecordQuestion,
      isDeleting,
      programDocument,
      reRecordQ,
      isGenerating,
      isQueAvailable,
      fetchFormData,
      openDeleteModal,
      isFormId,
      deleteQuestion,
      newQuestion,
      index,
      changeOrder,
      updatingQuestion,
      currentQuestionId,
      viewQuestion,
      updateQuestion,
      addNewQuestion,
      submittingQuestion,
      isBase64,
      ...toRefs(setup)
    };
  }
};
</script>

<style lang="scss">
.module-setup {
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

  &__name-interview {
    width: 100%;
  }
}
.module-edit__videoask-container {
  width: 100%;
}
.module-edit____videoask-interview {
  width: 100%;
}
.flex {
  display: flex;
}
.pointer-none {
  pointer-events: none;
  opacity: 0.4;
  display: none !important;
}
.pointer-view {
  pointer-events: all;
}

.interview-list-wrapper {
  width: 100%;
  overflow-y: auto;
  padding: 0;
}

.viewQuestionDialog {
  object-fit: cover;
}
</style>
