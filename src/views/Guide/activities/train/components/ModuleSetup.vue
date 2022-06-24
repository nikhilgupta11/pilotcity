<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <!-- <pre>{{ programDoc.data.adks[index].videoLinks }}</pre> -->
    <v-container class="module-edit">
      <div :ref="body" class="module-edit__body">
        <div class="module-edit__container">
          <!-- <div class="module-edit__video">Name</div>
          <div class="module-edit__link">Link</div>
          <div class="module-edit__required">Required</div> -->
        </div>
        <div class="d-flex justify-center mb-12 flex-column">
          <div class="">
            <h3 class="text-center">
              Record new training videos below. Please use unique video links for each row
            </h3>
          </div>
        </div>
        <div v-if="programDoc.data.adks[index]" style="width: 100%">
          <div
            v-for="(i, linkIndex) in programDoc.data.adks[index].videoLinks"
            :key="linkIndex"
            class="module-edit__inputs"
          >
            <div class="module-edit__inputs-video" style="margin-right: 0%; margin-left: 0">
              <validation-provider v-slot="{ errors }" slim rules="required">
                <v-text-field
                  v-model="i.name"
                  :disabled="i.is_processing"
                  :error-messages="errors"
                  rounded
                  label="Video Name"
                  outlined
                >
                  <template #append-outer>
                    <loader
                      v-show="isSearching && currentIndex === linkIndex"
                      style="position: absolute; right: 16px; margin-top: -3px"
                    />
                  </template>
                </v-text-field>
              </validation-provider>
            </div>
            <div v-if="!i.is_processing" class="module-edit__inputs-link">
              <validation-provider
                v-slot="{ errors }"
                :rules="{
                  required: true,
                  regex:
                    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
                }"
                slim
              >
                <v-text-field
                  v-model.trim="i.link"
                  :error-messages="errors"
                  :disabled="i.is_processing"
                  rounded
                  label="Video Link"
                  outlined
                  @input="fetchMetaInfo(i.link, linkIndex)"
                />
              </validation-provider>
            </div>
            <div v-else class="module-edit__inputs-link">
              <validation-provider
                v-slot="{ errors }"
                :rules="{
                  required: true,
                  regex:
                    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
                }"
                slim
              >
                <v-text-field
                  v-model="processingMsg"
                  :error-messages="errors"
                  :disabled="i.is_processing"
                  rounded
                  label="Video Link"
                  outlined
                />
              </validation-provider>
            </div>

            <div class="module-edit__inputs-required">
              <v-btn
                :disabled="programDoc.data.adks[index].videoLinks.length === 1"
                rounded
                x-large
                outlined
                @click="openDelLinkDialog(linkIndex)"
              >
                Delete
              </v-btn>
            </div>
          </div>
        </div>

        <div class="d-flex justify-center">
          <v-tooltip bottom>
            <template #activator="{ attrs }">
              <div class="d-flex justify-end refresh-wrapper mb-8" v-bind="attrs">
                <v-btn
                  class="refresh"
                  :loading="loading"
                  rounded
                  x-large
                  depressed
                  icon
                  @click="saveButton()"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </div>
            </template>
            <span>Refresh videos processing</span>
          </v-tooltip>
        </div>

        <div class="flex justify-center module-edit__add">
          <v-btn
            :ripple="false"
            x-large
            rounded
            class="module-edit__add-button white--text font-weight-bold mr-2"
            depressed
            color="green"
            @click="openVlogDialog"
          >
            <v-icon class="module-edit__add-icon font-weight-bold mr-1"> mdi-plus</v-icon>Record New
            Video
          </v-btn>
        </div>

        <div>
          <v-btn
            :loading="loading"
            :disabled="disabledButton || invalid"
            class="mt-12 setup-adk-train"
            x-large
            rounded
            outlined
            depressed
            @click="process()"
          >
            Save
          </v-btn>
        </div>
        <v-alert
          v-if="success || error"
          :color="success ? 'green' : 'red'"
          dense
          class="mt-3 white--text presets__alert"
        >
          {{ message }}
        </v-alert>
        <v-dialog
          v-model="VlogDialog"
          persistent
          :max-width="$vuetify.breakpoint.xs ? '100%' : '60vw'"
          content-class="record-video-badge-selection"
        >
          <v-card>
            <v-card-title class="d-flex flex-column justify-center">
              <div class="d-flex headline font-weight-bold mb-2 mt-2">Record Videos</div>
            </v-card-title>
            <div>
              <div class="d-flex justify-center">
                <a
                  href="https://bit.ly/pilotcityvlogs2021"
                  target="_blank"
                  style="text-decoration: none"
                  class="see-video-detail-btn"
                >
                  <v-btn rounded depressed dark small color="green" class="font-weight-bold mb-">
                    See video details, instructions & examples
                  </v-btn>
                </a>
              </div>
            </div>
            <v-divider></v-divider>
            <v-card-text class="mt-3">
              <v-container>
                <v-row>
                  <v-col
                    v-for="(item, index) in VlogOptions.sort()"
                    :key="index"
                    class="mt-3 d-flex video-select-badge"
                    cols="12"
                    md="4"
                  >
                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">
                          <v-btn
                            :loadind="loading"
                            rounded
                            small
                            outlined
                            depressed
                            @click="openVideoAskDialog(item)"
                          >
                            <v-icon left color="red">mdi-youtube</v-icon>
                            {{ item.name }}
                          </v-btn>
                        </div>
                      </template>
                      <span>{{ item.nameDesc }}</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <div class="d-flex justify-center mt-5">
              <a href="#" class="ma-2 grey--text font-weight-bold ml-1" @click="saveUploadUrl()">
                Use YouTube links instead
              </a>
            </div>
            <div class="d-flex justify-center">
              <v-btn
                class="font-weight-bold mb-8 mt-6"
                x-large
                depressed
                dark
                rounded
                @click="VlogDialog = false"
              >
                Close
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="VideoAskDialog"
          persistent
          content-class="record-video-badge-selection"
          :max-width="$vuetify.breakpoint.xs ? '100%' : '60vw'"
        >
          <v-card>
            <v-container class="ma-0 pa-0">
              <iframe
                v-if="VideoAskDialog && currentVlog"
                :src="
                  currentVlog.link +
                  `#contact_email=${encodeURI(userDoc.data.email)}&contact_name=${encodeURI(
                    userDoc.data.firstName
                  )}&program_id=${encodeURI(programDoc.data._id)}`
                "
                allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
                width="100%"
                height="500px"
                style="border: none; border-radius: 0px"
                class="ma-0 pa-0"
              >
              </iframe>
            </v-container>
            <v-container class="d-flex justify-center flex-column">
              <p class="mb-3 font-weight-bold mt-3">
                After recording your training video, please let the tool upload the same on our
                server. It would take from few seconds to several moments to upload the video. Once
                you see the thank you message, you can close the dialog box.
              </p>
              <div class="d-flex flex-row justify-center mt-3 mb-5">
                <v-btn
                  class="ma-2 white--text close font-weight-bold"
                  x-large
                  color="red"
                  rounded
                  depressed
                  :loading="loading"
                  @click="closeRecordVideoModal()"
                >
                  <loader v-if="isFetchingProgram" />
                  <v-icon v-else left>mdi-close</v-icon>
                  Exit
                </v-btn>
                <v-btn
                  class="ma-2 white--text font-weight-bold"
                  :disabled="isFetchingProgram"
                  x-large
                  dark
                  color="green"
                  rounded
                  depressed
                  :loading="loading"
                  @click="closeRecordModal()"
                >
                  <loader v-if="isFetchingProgram" />
                  <v-icon v-else left>mdi-check-all</v-icon>
                  Submit
                </v-btn>
              </div>
            </v-container>
          </v-card>
        </v-dialog>

        <!-- delete Link -->
        <v-dialog v-model="deleteLinkDialog" width="fit-content">
          <v-card>
            <v-card-title class="d-flex flex-column">
              <div class="overline font-weight-bold">
                Are you sure you want to delete this video?
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-container class="d-flex flex-column justify-center">
              <div class="d-flex flex-row justify-center mt-4 mb-6">
                <v-btn
                  class="ma-2"
                  x-large
                  outlined
                  rounded
                  depressed
                  @click="deleteLinkDialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  class="ma-2"
                  x-large
                  color="red"
                  dark
                  rounded
                  depressed
                  @click="removeIndex()"
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
      </div>
    </v-container>
  </ValidationObserver>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { loading, getModAdk, getModMongoDoc } from 'pcv4lib/src';
import axios from 'axios';
import _, { forEach } from 'lodash';
import MongoDoc from './types';
import loader from './loaderSvg.vue';

// TODO: move this to @pilocity/shared
const enum ProgramActivityStatus {
  NeedSetup = 'need_setup',
  CompleteSetup = 'complete_setup',
  Standard = 'standard'
}

export default defineComponent({
  name: 'ModuleSetup',
  components: {
    loader
  },
  props: {
    value: {
      required: true,
      type: Object as () => MongoDoc
    },
    studentDoc: {
      required: false,
      type: Object as () => MongoDoc,
      default: Function as () => unknown
    },
    userDoc: {
      required: true,
      type: Object
    },
    fetchProgram: {
      required: true,
      type: [Object, Function]
    }
  },

  setup(props, ctx) {
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });
    // Video Ask dialog handling
    const VlogDialog = ref(false);
    const VideoAskDialog = ref(false);
    const disabledButton = ref(true);
    const currentVlog = ref(null);
    const isDeleting = ref(false);
    const deleteLinkDialog = ref(false);
    const VlogOptions = [
      {
        name: 'Approach (Required)',
        link: 'https://www.videoask.com/f1brvchqm',
        nameDesc: 'Approach. How would you approach this problem? How would you start the project?'
      },

      {
        name: 'Brand (Required)',
        link: 'https://www.videoask.com/fovn030lr',
        nameDesc: 'Brand. Tell us more about your brand, culture and values as an organization. '
      },
      {
        name: 'Demo (Required)',
        link: 'https://www.videoask.com/fsu809j60',
        nameDesc: 'Demo. Could you demo your recommended product, service or process we will use?'
      },

      {
        name: 'Examples (Required)',
        link: 'https://www.videoask.com/fcv7txdhc',
        nameDesc:
          'Examples. Could you share an example? A related project, a use case or case study?'
      },
      {
        name: 'Goals (Required)',
        link: 'https://www.videoask.com/f3e4aafga',
        nameDesc:
          'Goals. What are short, medium and long-term goals for this project? How do I fit in?'
      },
      {
        name: 'Obstacles (Required)',
        link: 'https://www.videoask.com/fwzral58k',
        nameDesc: 'Obstacles. What do you anticipate the challenges, barriers & issues being? '
      },

      {
        name: 'Priority (Required)',
        link: 'https://www.videoask.com/fko6utfh4',
        nameDesc:
          'Priority. How would you recommend myself or my team prioritize our time on the project?'
      },
      {
        name: 'Talent (Required)',
        link: 'https://www.videoask.com/ftjz2q2ex',
        nameDesc:
          "Talent. Are there any particular skills or characteristics you're looking for in a candidate?"
      },
      {
        name: 'User (Required)',
        link: 'https://www.videoask.com/fudpl3wim',
        nameDesc:
          'Users. Who should we build our solutions for? Which users, testers or customers? Why?'
      },
      {
        name: 'Access',
        link: 'https://www.videoask.com/fo4k42l5i',
        nameDesc:
          'Access. In order to use your recommended tech or tools, how might I get access to it?'
      },

      {
        name: 'Caution',
        link: 'https://www.videoask.com/fkp9vhbdt',
        nameDesc:
          'Caution. Is there anything I should avoid, pay careful attention to or approach with caution?'
      },
      {
        name: 'Choice',
        link: 'https://www.videoask.com/frwyco660',
        nameDesc:
          'Choice. I heard there are choices for project types, could you list & describe their needs?'
      },
      {
        name: 'Coding',
        link: 'https://www.videoask.com/f82oatvpv',
        nameDesc:
          'Coding. What coding languages do I have to know? Is there documentation? Where can I find it?'
      },
      {
        name: 'Content',
        link: 'https://www.videoask.com/ftxtyeog2',
        nameDesc:
          'Content. What kind of content do you have available and ready-to-share? How do I access it?'
      },
      {
        name: 'Data',
        link: 'https://www.videoask.com/f60180qep',
        nameDesc:
          'Data. Where can I get my hands on the data I will use? What sources? Are they free or open?'
      },

      {
        name: 'Design',
        link: 'https://www.videoask.com/f4s0z3t4a',
        nameDesc:
          "Design. Is there a particular process you'd recommend for designing or prototyping?"
      },
      {
        name: 'Equity',
        link: 'https://www.videoask.com/fiwgoyof4',
        nameDesc:
          'Equity. Is there an equity mission to the project? What populations are we looking to serve?'
      },

      {
        name: 'Fundraise',
        link: 'https://www.videoask.com/feer3ciu2',
        nameDesc:
          'Fundraise. This project requires funding on my side. What fundraising recommendations might you have?'
      },

      {
        name: 'Innovation',
        link: 'https://www.videoask.com/flu9xixf0',
        nameDesc:
          "Innovation. What's unique to highlight? What is the differentiation or innovation?"
      },
      {
        name: 'Invest',
        link: 'https://www.videoask.com/ffjc5d1v0',
        nameDesc:
          'Invest. Would there be opportunities for future funding of solutions of interest to you?'
      },
      {
        name: 'Languages',
        link: 'https://www.videoask.com/fdog2gal2',
        nameDesc:
          'Languages. Are there any language needs for the project? If so, what are they in priority?'
      },
      {
        name: 'Mission',
        link: 'https://www.videoask.com/fl3lzmpll',
        nameDesc:
          'Mission. What priorities does your organization have in social, environmental & economic impact?'
      },

      {
        name: 'Patent',
        link: 'https://www.videoask.com/failpnk3g',
        nameDesc:
          'Patent. Could you dive deeper into the patented tech, process or research of your offering?'
      },
      {
        name: 'Places',
        link: 'https://www.videoask.com/f4fj37ucr',
        nameDesc: 'Places. Which residents, communities or places would you like us to focus on?'
      },

      {
        name: 'Sensitive',
        link: 'https://www.videoask.com/fg4q5mjds',
        nameDesc:
          'Sensitive. Are there any sensitive topics or language I should be aware of? How might I adapt?'
      },
      {
        name: 'Social',
        link: 'https://www.videoask.com/fb04sm8lv',
        nameDesc:
          'Social. What does your social media presence look like now? How can we be of help?'
      },

      {
        name: 'Tips',
        link: 'https://www.videoask.com/fwa4nq7ea',
        nameDesc:
          'Tips. Any additional tips, tricks & recommendations before I embark on my journey?'
      }
    ];
    const { adkData } = getModAdk(props, ctx.emit, 'train', {});
    const index = programDoc.value.data.adks.findIndex(obj => {
      if (obj) {
        return obj.name === 'train';
      }
      return false;
    });
    // Reactivity Handling
    const body = ref(0);
    const saveButton = async () => {
      await props.fetchProgram();
      if (adkData.value) {
        adkData.value.videoLinks.forEach(async element => {
          if (element.is_processing) {
            disabledButton.value = true;
          } else {
            disabledButton.value = false;
          }
        });
      }
    };
    function openVlogDialog() {
      VlogDialog.value = true;
      saveButton();
    }
    function populate(val) {
      const train1 = ref({
        name: val.nameDesc,
        link: '',
        videoask_question_url: val.link,
        required: false,
        is_processing: true
      });
      if (!programDoc.value.data.adks[index]?.videoLinks) {
        programDoc.value.data.adks[index] = {
          ...programDoc.value.data.adks[index],
          videoLinks: [],
          name: 'train'
        };
      }
      programDoc.value.data.adks[index].videoLinks.push(train1.value);
      body.value += 0;
      const program = getModMongoDoc(props, ctx.emit, {});
      program.value.update();
    }

    function populateYoutubeVideo() {
      const train1 = ref({
        name: '',
        link: '',
        videoask_question_url: '',
        required: false,
        is_processing: false
      });
      if (!programDoc.value.data.adks[index]?.videoLinks) {
        programDoc.value.data.adks[index] = {
          ...programDoc.value.data.adks[index],
          videoLinks: [],
          name: 'train'
        };
      }
      programDoc.value.data.adks[index].videoLinks.push(train1.value);
      body.value += 0;
      const program = getModMongoDoc(props, ctx.emit, {});
      program.value.update();
    }

    const currentLinkIndex = ref(null);
    function openDelLinkDialog(indx) {
      currentLinkIndex.value = indx;
      deleteLinkDialog.value = true;
    }

    function removeIndex() {
      isDeleting.value = true;
      programDoc.value.data.adks[index].videoLinks.splice(currentLinkIndex.value, 1);
      body.value += 1;
      const program = getModMongoDoc(props, ctx.emit, {});
      program.value.update();
      currentLinkIndex.value = null;
      deleteLinkDialog.value = false;
      isDeleting.value = false;
    }

    function openVideoAskDialog(item) {
      populate(item);
      currentVlog.value = item;
      VlogDialog.value = false;
      VideoAskDialog.value = true;
    }

    const initTrainSetup = {
      videoLinks: []
    };
    programDoc.value.data.adks[index] = {
      ...initTrainSetup,
      ...programDoc.value.data.adks[index]
    };

    // Fetch Metainfo
    const isSearching = ref(false);
    const currentIndex = ref(-1);
    const fetchMetaInfo = _.debounce(async (val, indx) => {
      currentIndex.value = indx;
      const API_ENDPOINT = process.env.VUE_APP_META_GRABBER_ENDPOINT;
      try {
        isSearching.value = true;
        const resp = await axios.get(API_ENDPOINT, {
          params: {
            url: val
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (resp.data.data) {
          programDoc.value.data.adks[index].videoLinks[indx].name = resp.data.data.title;
          const program = getModMongoDoc(props, ctx.emit, {});
          program.value.update();
        }
        isSearching.value = false;
      } catch (err) {
        console.log(err);
        isSearching.value = false;
      }
    }, 500);

    function saveUploadUrl() {
      populateYoutubeVideo();
      VlogDialog.value = false;
    }
    // Handle Save
    const isFetchingProgram = ref(false);
    const closeRecordModal = async () => {
      isFetchingProgram.value = false;
      VideoAskDialog.value = false;
    };

    const closeRecordVideoModal = () => {
      const removeItem = adkData.value.videoLinks.slice(-1)[0];
      const index = adkData.value.videoLinks.lastIndexOf(removeItem);
      adkData.value.videoLinks.splice(index, 1);
      body.value += 0;
      const program = getModMongoDoc(props, ctx.emit, {});
      program.value.update();
      isFetchingProgram.value = false;
      VideoAskDialog.value = false;
    };

    return {
      populate,
      openVlogDialog,
      populateYoutubeVideo,
      index,
      programDoc,
      fetchMetaInfo,
      VlogOptions,
      isSearching,
      openVideoAskDialog,
      saveUploadUrl,
      deleteLinkDialog,
      isDeleting,
      currentVlog,
      saveButton,
      VlogDialog,
      VideoAskDialog,
      disabledButton,
      closeRecordModal,
      closeRecordVideoModal,
      currentLinkIndex,
      openDelLinkDialog,
      currentIndex,
      body,
      removeIndex,
      adkData,
      processingMsg: 'Processing ....',
      isFetchingProgram,
      ...loading(
        () =>
          programDoc.value.update(() => ({
            props,
            isComplete: true,
            adkIndex: index,
            status: ProgramActivityStatus.CompleteSetup
          })),
        'Success',
        'Try again later'
      )
    };
  },

  beforeMount() {
    this.saveButton();
  }
});
</script>

<style lang="scss">
.module-setup {
  &__two-column {
    flex-direction: row;
    display: flex;
  }
  &__left-column {
    width: 100%;
  }
  &__right-column {
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
}

.v-dialog {
  &.record-video-badge-selection {
    @media (max-width: 767px) {
      height: 80%;
      margin: 24px 10px 0;
    }
  }
}

.refresh-wrapper {
  margin-left: auto;

  .refresh {
    padding: 0 !important;
    width: 30px !important;
    min-width: unset !important;
    height: 30px !important;
  }
}
.close {
  background-color: #dc3545 !important;
}

.module-edit {
  &__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    // padding-left: 5%;
    justify-content: center;
    align-items: center;
  }

  &__video {
    width: 100%;
  }
  &__link {
    // margin-right: 15%;
    width: 100%;
  }
  &__required {
    // padding-left: 20%;
    width: 100%;
  }
  &__inputs {
    width: 100%;
    margin-top: 1%;
    display: flex;
    flex-direction: row;
    @media (max-width: 767px) {
      flex-direction: column !important;
      margin-bottom: 50px;
    }
    &-video {
      display: flex;
      width: 100%;
      // margin-right: 9%;
    }
    &-link {
      display: flex;
      width: 100%;
      margin-left: 3%;
      @media (max-width: 767px) {
        margin-left: 0 !important;
      }
    }
    &-required {
      display: flex;
      margin-left: 3%;
      justify-content: center;
      @media (max-width: 767px) {
        margin-left: 0 !important;
        button {
          width: 100%;
        }
      }
    }
  }
  &__add {
    display: flex;
    width: 100%;
    // padding-right: 15%;
    &-button {
      width: 100%;
    }
  }
}

.see-video-detail-btn {
  @media (max-width: 767px) {
    text-align: center;
    margin-bottom: 10px;
    button {
      &.v-btn {
        white-space: normal;
        word-break: break-word;
        width: 90%;
        margin: 0 auto;
        height: fit-content !important;
        padding-top: 5px !important;
        padding-bottom: 5px !important;

        span {
          word-break: break-word;
          white-space: normal;
          width: 100%;
          display: inline-block;
        }
      }
    }
  }
}

.video-select-badge {
  div {
    @media (max-width: 767px) {
      width: 100%;
      button {
        width: 100%;
      }
    }
  }
}
</style>
