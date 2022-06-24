<template>
  <Loading ref="loader" :callback="processQuery">
    <div class="refer__container">
      <profile :size="75"></profile>
      <div class="refer__title-main">Invite friends to join the program</div>

      <ValidationObserver v-slot="{ invalid }" slim>
        <div
          class="refer__body1 d-flex"
          :class="$vuetify.breakpoint.xs ? 'flex-column mb-4' : 'flex-row'"
        >
          <v-skeleton-loader type="heading, list-item, list-item, list-item">
            <validation-provider v-slot="{ errors }" rules="required|email">
              <v-text-field
                v-model="email"
                :error-messages="errors"
                class="refer__body-email"
                label="Email"
                placeholder="friend@email.com"
                outlined
                height="50px"
                rounded
              >
              </v-text-field>
            </validation-provider>
          </v-skeleton-loader>
          <Loading v-slot="{ process }" :callback="processTransfer">
            <v-dialog v-model="dialog" width="500">
              <template #activator="{ on, attrs }">
                <v-btn
                  :disabled="invalid"
                  :dark="!invalid"
                  class="refer__body-email-button"
                  depressed
                  rounded
                  x-large
                  v-bind="attrs"
                  :v-on="on"
                  @click="process"
                >
                  <v-icon left>mdi-telegram</v-icon>
                  Send
                </v-btn>
              </template>
              <v-card class="refer__dialog">
                <v-icon color="green" x-large>mdi-rocket-outline</v-icon>
                <v-card-title class="refer__dialog-title">Your invite has been sent.</v-card-title>
                <AButton
                  class="refer__dialog-button"
                  rounded
                  outlined
                  large
                  color="primary lighten-3"
                  @click="dialog = false"
                >
                  Send more
                </AButton>
              </v-card>
            </v-dialog>
          </Loading>
        </div>
      </ValidationObserver>

      <v-dialog
        v-model="myListDialog"
        max-width="60vw"
        persistent
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <!-- <template #activator="{ on, attrs }">
          <v-btn
            class="refer__body-email-button"
            depressed
            rounded
            dark
            x-large
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>mdi-telegram</v-icon>Generate Global Invite</v-btn
          >
        </template> -->
        <v-card class="refer__dialog">
          <!-- Choose video invite -->
          <div class="d-flex flex-column">
            <div class="d-flex ml-auto">
              <AButton class="ml-10" icon @click="myListDialog = false"
                ><v-icon x-large color="grey">mdi-close</v-icon></AButton
              >
            </div>
            <div class="mt-6 mb-6">
              <h2>List of Invites</h2>
            </div>
            <div class="invite-table">
              <v-simple-table>
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-left">Date Created</th>
                      <th class="text-left">Invite Title</th>
                      <th class="text-left">Invite Slug</th>
                      <th class="text-left">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody v-if="!isFetchingLinks">
                    <tr v-if="!inviteLinkList.length">
                      <td colspan="4">
                        <label>No data avilable</label>
                      </td>
                    </tr>
                    <tr v-else v-for="item in inviteLinkList" :key="item.inviteName">
                      <td class="pa-5 text-left">
                        {{ item.created_at }}
                      </td>
                      <td class="pa-5 text-left">
                        {{ item.title }}
                      </td>
                      <td class="pa-5 text-left">
                        <h3>{{ item.slug }}</h3>
                      </td>
                      <td class="pa-5">
                        <v-menu offset-y>
                          <template #activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon small color="grey">mdi-dots-vertical</v-icon>
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item>
                              <v-list-item-title class="menu-item">Analytics</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title
                                v-if="item.is_published"
                                class="menu-item"
                                @click="publishInvite('unpublish', item)"
                              >
                                Unpublish
                              </v-list-item-title>
                              <v-list-item-title
                                v-else
                                class="menu-item"
                                @click="publishInvite('publish', item)"
                              >
                                Publish
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="previewLink(item)">
                              <v-list-item-title class="menu-item">Preview</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="openInviteEditDialog(item)">
                              <v-list-item-title class="menu-item">Edit</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="copyLink(item)">
                              <v-list-item-title class="menu-item">Copy Link</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="deleteLink(item)">
                              <v-list-item-title class="menu-item">Delete</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="4">
                        <v-progress-circular
                          size="20"
                          indeterminate
                          color="black"
                        ></v-progress-circular>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
            <div class="my-6">
              <v-dialog
                v-model="templateDialog"
                persistent
                max-width="60vw"
                :fullscreen="$vuetify.breakpoint.xsOnly"
              >
                <template #activator="{ attrs }">
                  <AButton v-bind="attrs" rounded x-large depressed outlined @click="openTemplate">
                    <v-icon left>mdi-plus</v-icon>Make new video invite
                  </AButton>
                </template>
                <v-card class="refer__dialog">
                  <div class="d-flex row-reverse">
                    <AButton class="ml-10" icon @click="templateDialog = false"
                      ><v-icon x-large color="grey">mdi-close</v-icon></AButton
                    >
                  </div>
                  <div>
                    <v-icon color="red" x-large>mdi-youtube</v-icon>
                  </div>
                  <div class="ma-8">
                    <h2>Choose video template invite</h2>
                  </div>
                  <div class="invite-table">
                    <v-simple-table>
                      <template #default>
                        <thead>
                          <tr>
                            <th class="text-left">Template type</th>
                            <th class="text-left">Preview</th>
                            <th class="text-left">Choose</th>
                          </tr>
                        </thead>
                        <tbody v-if="isFetchingTempltes && templateList.length < 1">
                          <tr>
                            <td colspan="3">
                              <v-progress-circular
                                size="30"
                                indeterminate
                                color="black"
                              ></v-progress-circular>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr v-if="!templateList.length">
                            <td class="pa-5" colspan="4">
                              <label>No data avilable</label>
                            </td>
                          </tr>
                          <tr v-else v-for="(item, index) in templateList" :key="index">
                            <td class="pa-5 text-left">
                              {{ item.type }}
                            </td>
                            <td class="pa-5 text-left">
                              <v-dialog
                                v-model="previewDialog"
                                persistent
                                max-width="60vw"
                                :fullscreen="$vuetify.breakpoint.xsOnly"
                              >
                                <template #activator="{ attrs }">
                                  <AButton
                                    rounded
                                    large
                                    depressed
                                    outlined
                                    v-bind="attrs"
                                    @click="previewTemplate(item)"
                                  >
                                    <v-icon left>mdi-youtube</v-icon>
                                    Preview
                                  </AButton>
                                </template>
                                <v-card class="refer__dialog">
                                  <div class="d-flex row-reverse">
                                    <AButton class="mb-5" icon @click="previewDialog = false">
                                      <v-icon x-large color="grey">mdi-close</v-icon>
                                    </AButton>
                                  </div>
                                  <iframe
                                    v-if="previewDialog && previewUrl"
                                    :src="previewUrl"
                                    allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
                                    width="100%"
                                    height="600px"
                                    style="border: none"
                                  >
                                  </iframe>
                                </v-card>
                              </v-dialog>
                            </td>
                            <td class="pa-5 text-left">
                              <AButton
                                rounded
                                large
                                depressed
                                dark
                                @click="openGenerateDialog(item)"
                              >
                                <v-icon left>mdi-cursor-default</v-icon>
                                Choose
                              </AButton>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </div>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </v-card>
      </v-dialog>

      <!-- Generate Invite -->
      <v-dialog
        v-model="generateInviteDialog"
        width="60vw"
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card>
          <v-card-title>
            <div class="overline font-weight-bold">Generate Invite</div>
          </v-card-title>

          <v-divider></v-divider>
          <ValidationObserver ref="Observer" v-slot="{ invalid }" slim>
            <v-container class="d-flex flex-row items-center justify-center">
              <div>
                <validation-provider v-slot="{ errors }" slim rules="required">
                  <v-text-field
                    v-model="inviteData.slug"
                    class="ma-3"
                    label="Invite slug"
                    :error-messages="errors"
                    hide-details
                    rounded
                    outlined
                    @blur="verifySlug"
                  >
                    <template slot="append-outer">
                      <v-progress-circular v-if="isVerifying" size="20" indeterminate />
                    </template>
                  </v-text-field>
                  <div class="d-flex flex-column">
                    <label v-if="validationMsg" class="ml-5 invalid">{{ validationMsg }}</label>
                    <label v-if="invalidSlug" class="ml-5 invalid">
                      Enter valid slug (eg. almuni or alumni-welcome)
                    </label>
                  </div>
                </validation-provider>
              </div>
              <div>
                <validation-provider v-slot="{ errors }" slim rules="required">
                  <v-text-field
                    v-model="inviteData.title"
                    class="ma-3"
                    label="Invite title"
                    :error-messages="errors"
                    hide-details
                    rounded
                    outlined
                  ></v-text-field>
                </validation-provider>
              </div>
            </v-container>
            <v-divider></v-divider>
            <div class="d-flex justify-end">
              <AButton
                class="ma-3"
                color="balck"
                :disabled="invalid || !isVerified || invalidSlug"
                :dark="!invalid && isVerified && !invalidSlug"
                x-large
                rounded
                depressed
                @click="generateInvite"
              >
                <v-progress-circular
                  v-if="isGenerating"
                  class="mr-2"
                  size="25"
                  indeterminate
                  color="white"
                ></v-progress-circular>
                Next
              </AButton>
            </div>
          </ValidationObserver>
        </v-card>
      </v-dialog>

      <!-- Invite Table content -->
      <v-dialog v-model="InviteTableDialog" width="60vw" :fullscreen="$vuetify.breakpoint.xsOnly">
        <v-card>
          <div class="d-flex" style="justify-content: space-between">
            <v-card-title>
              <div class="overline font-weight-bold">Invite Templates</div>
            </v-card-title>
            <AButton class="ml-10 mr-5 mt-5" icon @click="InviteTableDialog = false">
              <v-icon x-large color="grey">mdi-close</v-icon>
            </AButton>
          </div>

          <v-divider></v-divider>
          <div v-if="isFetching && !invites.length" class="d-flex justify-center py-6">
            <v-progress-circular size="40" indeterminate color="primary"></v-progress-circular>
          </div>
          <draggable
            v-else
            class="invite-list-wrapper"
            :options="{ handle: '.drag' }"
            tag="ul"
            :list="invites"
            @change="change"
          >
            <MTableContent
              v-for="(invite, index) in invites"
              :key="index"
              :index="index"
              :item="invite"
              :length="invites.length"
              type="invite"
              @view="viewQuestion"
              @delete="openDeleteModal"
              @edit="editInviteStep"
              @reRecord="reRecordQ"
            />
          </draggable>

          <div class="d-flex flex-row justify-center pa-5">
            <AButton
              :ripple="false"
              rounded
              x-large
              class="white--text font-weight-bold"
              depressed
              color="blue"
              @click="addQuestionDialog = true"
            >
              <v-icon class="module-edit__add-icon font-weight-bold" left> mdi-plus </v-icon>
              Add Invite Step
            </AButton>
            <AButton
              class="ml-3"
              color="blue"
              x-large
              dark
              rounded
              depressed
              @click="resetInviteDialog = true"
            >
              Reset Invite Template
            </AButton>
          </div>

          <div class="invitetable-button d-flex flex-row justify-end">
            <AButton
              v-if="isPublished"
              class="ma-2"
              x-large
              dark
              rounded
              depressed
              @click="InviteTableDialog = false"
            >
              Close
            </AButton>
            <AButton
              v-else
              class="ma-2"
              x-large
              dark
              rounded
              depressed
              @click="InviteTableDialog = false"
            >
              Save as Draft
            </AButton>
            <AButton
              v-if="isPublished"
              class="ma-2"
              color="green"
              x-large
              dark
              rounded
              depressed
              @click="publishInvite('unpublish')"
            >
              <v-progress-circular
                v-if="isPublishing"
                class="mr-2"
                size="20"
                indeterminate
                color="white"
              ></v-progress-circular>
              Unpublish
            </AButton>
            <AButton
              v-else
              class="ma-2"
              color="green"
              x-large
              dark
              rounded
              depressed
              @click="publishInvite('publish')"
            >
              <v-progress-circular
                v-if="isPublishing"
                class="mr-2"
                size="20"
                indeterminate
                color="white"
              ></v-progress-circular>
              Publish
            </AButton>
          </div>
        </v-card>
      </v-dialog>

      <!-- View Question -->
      <v-dialog
        v-model="viewQuestionDialog"
        width="fit-content"
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card>
          <div class="d-flex flex-row">
            <div>
              <video v-if="currentMediaUrl && viewQuestionDialog" width="760" height="450" controls>
                <source :src="currentMediaUrl" type="video/mp4" />
              </video>
            </div>
          </div>
        </v-card>
      </v-dialog>

      <!-- delete Q -->
      <v-dialog v-model="deleteInviteDialog" width="fit-content">
        <v-card>
          <v-card-title class="d-flex flex-column">
            <div class="overline font-weight-bold">Delete this invite question forever?</div>
          </v-card-title>

          <v-divider></v-divider>

          <v-container class="d-flex flex-column justify-center">
            <div class="d-flex flex-row justify-center mt-4 mb-6">
              <AButton
                class="ma-2"
                outlined
                x-large
                rounded
                depressed
                @click="deleteInviteDialog = false"
              >
                Cancel
              </AButton>
              <AButton
                class="ma-2"
                color="red"
                x-large
                dark
                rounded
                depressed
                @click="deleteInvite()"
              >
                <v-progress-circular
                  v-if="isDeleting"
                  class="mr-2"
                  size="20"
                  indeterminate
                  color="white"
                ></v-progress-circular>
                Delete
              </AButton>
            </div>
          </v-container>
        </v-card>
      </v-dialog>

      <!-- update invite step -->
      <v-dialog v-model="editInviteDialog" width="60vw" :fullscreen="$vuetify.breakpoint.xsOnly">
        <v-card>
          <v-card-title class="d-flex flex-column">
            <div class="overline font-weight-bold">Rename this interview question</div>
          </v-card-title>

          <v-divider></v-divider>
          <v-container class="d-flex flex-row justify-center">
            <div>
              <v-text-field
                v-model="renameInviteStep"
                class="ma-3"
                hide-details
                rounded
                outlined
              ></v-text-field>
            </div>

            <AButton
              class="ma-3"
              color="green"
              x-large
              dark
              rounded
              depressed
              @click="updateInviteName"
            >
              <v-progress-circular
                v-if="updatingQuestion"
                class="mr-2"
                size="25"
                indeterminate
                color="white"
              ></v-progress-circular>
              Rename
            </AButton>
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

      <!-- rerecord Q -->
      <v-dialog v-model="reRecordDialog" persistent width="800">
        <v-card>
          <div class="d-flex flex-column">
            <div>
              <AVideoRec ref="reRecord" @media="getMedia" />
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

      <!-- add question -->
      <v-dialog
        v-model="addQuestionDialog"
        persistent
        width="60vw"
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <ValidationObserver ref="validQue" v-slot="{ invalid }" slim>
          <v-card>
            <div class="d-flex flex-column pa-0">
              <div>
                <AVideoRec ref="addQuestion" @media="getMedia" />
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
                    <AButton
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
                    </AButton>
                  </div>

                  <div>
                    <AButton
                      class="ma-2 white--text font-weight-bold"
                      x-large
                      rounded
                      color="red"
                      depressed
                      @click="addQuestionDialog = false"
                    >
                      <v-icon left>mdi-close</v-icon>Exit
                    </AButton>
                  </div>
                </div>
              </div>
            </v-container>
          </v-card>
        </ValidationObserver>
      </v-dialog>

      <!-- reset invite  -->
      <v-dialog v-model="resetInviteDialog" width="60vw" :fullscreen="$vuetify.breakpoint.xsOnly">
        <v-card>
          <v-card-title class="d-flex flex-column">
            <div class="overline font-weight-bold">Reset invite template to default questions?</div>
          </v-card-title>

          <v-divider></v-divider>

          <v-container class="d-flex flex-column justify-center">
            <div class="d-flex flex-row justify-center mt-4 mb-6">
              <AButton
                class="ma-2"
                outlined
                x-large
                rounded
                depressed
                @click="resetInviteDialog = false"
              >
                Cancel
              </AButton>
              <AButton class="ma-2" color="red" x-large dark rounded depressed @click="resetInvite">
                <v-progress-circular
                  v-if="isDeleting"
                  class="mr-2 setup-adk-interview-reset"
                  size="20"
                  indeterminate
                  color="white"
                ></v-progress-circular>
                Reset Invite
              </AButton>
            </div>
          </v-container>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="publishedNoti" timeout="5000">
        Your invite template has been generated
        <template v-slot:action="{ attrs }">
          <AButton color="blue" text v-bind="attrs" @click="publishedNoti = false"> Close </AButton>
        </template>
      </v-snackbar>

      <div class="refer__manage1">
        <AButton small class="refer__manage1-buttons" depressed dark color="grey3"
          ><v-icon left>mdi-email-outline</v-icon>All Invites</AButton
        >
      </div>

      <div class="refer__all_invite">
        <AllInvites />
      </div>
    </div>
  </Loading>
</template>

<script lang="ts">
import {
  ref,
  Ref,
  defineComponent,
  onMounted,
  reactive,
  watchEffect,
  computed
} from '@vue/composition-api';
import { useUserGetters, useDbState } from '@/store';
import { SendReferalInput, Transaction } from '@/generated/graphql';
import { GetterTypes } from '@/store/modules/auth/getters';
import Profile from '@/components/Profile.vue';
import Loading from '@/components/Loading.vue';
import axios from 'axios';
import { THIS_INVITE } from '@/services/graphql/queries';
import { SEND_INVITE } from '@/services/graphql/mutations';
import AllInvites from '@/components/portfolio/AllInvites.vue';
import AButton from '@/components/atoms/AButton.vue';
import AVideoRec from '@/components/atoms/AVideoRecord.vue';
import MTableContent from '@/components/molecules/MTableContent.vue';
import draggable from 'vuedraggable';

const {
  getObjectId: { value: getObjectId }
} = useUserGetters([GetterTypes.getObjectId]);

export default defineComponent({
  name: 'Referral',
  components: {
    AllInvites,
    Profile,
    Loading,
    AButton,
    MTableContent,
    draggable,
    AVideoRec
  },
  setup(
    _props,
    {
      root: {
        $apolloProvider: {
          defaultClient: { query, mutate }
        },
        $router
      }
    }
  ) {
    const { user } = useDbState(['user']);
    const myListDialog = ref(false);
    const templateDialog = ref(false);
    const previewDialog = ref(false);
    const InviteTableDialog = ref(false);
    const viewQuestionDialog = ref(false);
    const editInviteDialog = ref(false);
    const addQuestionDialog = ref(false);
    const resetInviteDialog = ref(false);
    const dialog = ref(false);
    const generateInviteDialog = ref(false);
    const deleteInviteDialog = ref(false);
    const changeOrderDialog = ref(false);
    const dialog3 = ref(false);
    const publishedNoti = ref(false);
    const reRecordDialog = ref(false);
    const reRecord = ref<InstanceType<typeof AVideoRec>>();
    const addQuestion = ref<InstanceType<typeof AVideoRec>>();
    const loader: Ref<typeof Loading | null> = ref(null);
    const referral: Ref<{ email: string; timestamp: Date }[]> = ref([]);
    const email = ref('');
    const inviteLink = ref('');
    const Observer = ref('');
    const validQue = ref('');
    const currentMediaUrl = ref('');
    const invites = ref([]);

    const inviteLinkList = ref([]);
    const templateList = ref([]);
    const isFetchingLinks = ref(false);
    const isFetchingTempltes = ref(false);
    const isGenerating = ref(false);
    const isVerifying = ref(false);
    const isVerified = ref(false);
    const isFetching = ref(false);
    const isPublishing = ref(false);
    const isChanging = ref(false);
    const previewUrl = ref('');
    const templateType = ref('');
    const currentQuestionId = ref('');
    const currentFormId = ref('');
    const renameInviteStep = ref('');
    const base64 = ref('');
    const newQuestion = ref('');
    const validationMsg = ref('');
    const inviteData = reactive({
      slug: '',
      title: ''
    });
    let moveEvent = reactive({
      newIndex: '',
      oldIndex: '',
      element: ''
    });

    const invalidSlug = computed(() => {
      if (inviteData.slug.length) {
        const regex = /^[a-z](-?[a-z])*$/;
        const matches = regex.exec(inviteData.slug);
        return !matches;
      }
      return '';
    });

    function previewLink(val) {
      const link = $router.resolve({
        name: 'invitation',
        params: { slug: val.slug },
        query: { isPreview: true }
      });
      console.log(link.href);
      window.open(link.href, '_blank');
    }

    function copyLink(val) {
      const url = `https://develop.pilotcity.com/invite/${val.slug}`;
      navigator.clipboard.writeText(url);
    }

    function openTemplate() {
      templateDialog.value = true;
      myListDialog.value = false;
    }

    async function verifySlug() {
      isVerified.value = false;
      isVerifying.value = true;
      const API_ENDPOINT = process.env.VUE_APP_VIDASK_SERVICE;
      try {
        const resp = await axios.get(`${API_ENDPOINT}/verify-slug?slug=${inviteData.slug}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        isVerifying.value = false;
        if (resp.data.data.slug_exists) {
          isVerified.value = false;
          validationMsg.value = 'Please enter unique slug';
        } else {
          isVerified.value = true;
          validationMsg.value = '';
        }
      } catch (err) {
        console.log(err);
        isVerifying.value = false;
      }
    }

    function previewTemplate(val) {
      previewDialog.value = true;
      previewUrl.value = val.share_url;
    }

    function openGenerateDialog(val) {
      templateDialog.value = false;
      generateInviteDialog.value = true;
      templateType.value = val.type;
    }

    async function fetchTemplates() {
      isFetchingTempltes.value = true;
      const API_ENDPOINT = process.env.VUE_APP_FETCH_INVITE;
      try {
        const resp = await axios.get(`${API_ENDPOINT}?user_id=${getObjectId?.toString()}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        templateList.value = resp.data.data;
        isFetchingTempltes.value = false;
      } catch (err) {
        console.log(err);
        isFetchingTempltes.value = false;
      }
    }

    async function fetchInviteLinks() {
      isFetchingLinks.value = true;
      const API_ENDPOINT = process.env.VUE_APP_FETCH_INVITE_LINKS;
      try {
        const resp = await axios.get(`${API_ENDPOINT}?email=${user.value?.email}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        inviteLinkList.value = resp.data.data;
        isFetchingLinks.value = false;
      } catch (err) {
        console.log(err);
        isFetchingLinks.value = false;
      }
    }

    async function deleteLink(val) {
      const API_ENDPOINT = process.env.VUE_APP_VIDASK_SERVICE;
      try {
        const resp = await axios.delete(`${API_ENDPOINT}/invite/delete`, {
          params: {
            slug: val.slug
          }
        });
        if (resp) {
          fetchInviteLinks();
        }
      } catch (err) {
        console.log(err);
      }
    }

    const formId = ref('');
    async function fetchTableData(val) {
      isFetching.value = true;
      const API_ENDPOINT = process.env.VUE_APP_GET_INVITE_DATA;
      try {
        const resp = await axios.get(`${API_ENDPOINT}?form_id=${val.form_id || val}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (resp.data.data) {
          invites.value = resp.data.data.questions;
          formId.value = resp.data.data.form_id;
          console.log(formId.value);
          isFetching.value = false;
        }
      } catch (err) {
        console.log(err);
        isFetching.value = false;
      }
    }

    const isPublished = ref(false);
    function openInviteEditDialog(val) {
      myListDialog.value = false;
      InviteTableDialog.value = true;
      isPublished.value = val.is_published;
      inviteData.slug = val.slug;
      fetchTableData(val);
    }

    async function generateInvite() {
      isGenerating.value = true;
      const API_ENDPOINT = process.env.VUE_APP_GEN_INVITE;

      const data = {
        ...inviteData,
        email: user.value?.email,
        template_type: templateType.value.toLowerCase()
      };

      try {
        const resp = await axios.post(API_ENDPOINT, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        isGenerating.value = false;
        console.log(resp);
        inviteData.title = '';
        Observer.value.reset();
        generateInviteDialog.value = false;
        if (resp.data.data) {
          InviteTableDialog.value = true;
          fetchTableData(resp.data.data);
        }
      } catch (err) {
        isGenerating.value = false;
        console.log(err);
      }
    }

    const isDeleting = ref(false);
    async function deleteInvite() {
      const API_ENDPOINT = process.env.VUE_APP_GET_DEL_INVITE;
      try {
        isDeleting.value = true;
        const resp = await axios.delete(API_ENDPOINT, {
          params: {
            question_id: currentQuestionId.value
          }
        });
        if (resp) {
          fetchTableData(currentFormId.value).then(res => {
            currentQuestionId.value = '';
            currentFormId.value = '';
            isDeleting.value = false;
            deleteInviteDialog.value = false;
          });
        }
      } catch (err) {
        console.log(err);
        isDeleting.value = false;
      }
    }

    const updatingQuestion = ref(false);
    async function updateInviteName() {
      const API_ENDPOINT = process.env.VUE_APP_GET_RENAME_INVITE;
      try {
        updatingQuestion.value = true;
        const data = {
          title: renameInviteStep.value
        };
        const res = await axios.patch(API_ENDPOINT, data, {
          params: {
            question_id: currentQuestionId.value
          }
        });
        if (res) {
          fetchTableData(currentFormId.value).then(res => {
            currentQuestionId.value = '';
            currentFormId.value = '';
            renameInviteStep.value = '';
            isDeleting.value = false;
            editInviteDialog.value = false;
            updatingQuestion.value = false;
          });
        }
      } catch (err) {
        console.log(err);
        updatingQuestion.value = false;
        editInviteDialog.value = false;
      }
    }

    watchEffect(() => {
      if (myListDialog.value === true) {
        fetchInviteLinks();
      }
      if (templateDialog.value === true) {
        fetchTemplates();
      }
      if (InviteTableDialog.value === false) {
        invites.value = [];
      }
    });

    function viewQuestion(val) {
      viewQuestionDialog.value = true;
      currentMediaUrl.value = val;
    }

    function openDeleteModal(val) {
      deleteInviteDialog.value = true;
      currentQuestionId.value = val.question_id;
      currentFormId.value = val;
    }

    function editInviteStep(val) {
      editInviteDialog.value = true;
      renameInviteStep.value = val.title;
      currentQuestionId.value = val.question_id;
      currentFormId.value = val;
    }

    function change(event) {
      changeOrderDialog.value = true;
      moveEvent = { ...event.moved };
    }
    function revert() {
      if (moveEvent) {
        invites.value[moveEvent.newIndex] = invites.value[moveEvent.oldIndex];
        invites.value[moveEvent.oldIndex] = moveEvent.element;
        changeOrderDialog.value = false;
        moveEvent = reactive({
          newIndex: '',
          oldIndex: '',
          element: ''
        });
      }
    }
    async function changeOrder() {
      const API_ENDPOINT = process.env.VUE_APP_VIDASK_SERVICE;
      try {
        isChanging.value = true;
        const res = await axios.put(
          `${API_ENDPOINT}/invite/change-order`,
          {
            question_array: invites.value
          },
          {
            params: {
              form_id: invites.value[0].form_id
            },
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(res.data.data);
        invites.value = res.data.data.questions;
        changeOrderDialog.value = false;
        isChanging.value = false;
      } catch (err) {
        console.log(err);
      }
    }

    async function publishInvite(val, item) {
      isPublishing.value = true;
      const API_ENDPOINT = process.env.VUE_APP_VIDASK_SERVICE;
      const data = {
        slug: inviteData.slug || item.slug
      };
      if (val === 'publish') {
        data.is_published = true;
      } else {
        data.is_published = false;
      }

      try {
        const resp = await axios.post(`${API_ENDPOINT}/invite/manage-publish-status`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(resp.data);
        if (resp.data.data) {
          isPublishing.value = false;
          inviteData.slug = '';
          InviteTableDialog.value = false;
          myListDialog.value = false;
          publishedNoti.value = true;
        }
      } catch (err) {
        console.log(err);
        isPublishing.value = false;
      }
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
      currentFormId.value = val;
    }

    function closeReRecordDialog() {
      reRecord.value?.removePlayer();
      currentQuestionId.value = '';
      reRecordDialog.value = false;
      currentFormId.value = '';
    }

    const submittingQuestion = ref(false);
    async function reRecordQuestion() {
      const API_ENDPOINT = process.env.VUE_APP_VIDASK_SERVICE;
      const data = {
        media_url: base64.value
      };
      try {
        submittingQuestion.value = true;
        const resp = await axios.patch(`${API_ENDPOINT}/invite/re-record-step`, data, {
          params: {
            question_id: currentQuestionId.value
          }
        });
        fetchTableData(currentFormId.value).then(() => {
          reRecord.value?.removePlayer();
          submittingQuestion.value = false;
          reRecordDialog.value = false;
          base64.value = '';
          currentQuestionId.value = '';
          currentFormId.value = '';
        });
      } catch (err) {
        console.log(err);
        submittingQuestion.value = false;
      }
    }

    async function resetInvite() {
      const API_ENDPOINT = process.env.VUE_APP_VIDASK_SERVICE;
      try {
        isDeleting.value = true;
        const resp = await axios.patch(`${API_ENDPOINT}/invite/reset?form_id=${formId.value}`);

        if (resp.data.data) {
          fetchTableData(resp.data.data.form_id).then(res => {
            isDeleting.value = false;
            resetInviteDialog.value = false;
          });
        }
      } catch (err) {
        console.log(err);
        isDeleting.value = false;
      }
    }

    async function addNewQuestion() {
      const API_ENDPOINT = process.env.VUE_APP_VIDASK_SERVICE;

      const data = {
        media_url: base64.value,
        title: newQuestion.value
      };

      try {
        submittingQuestion.value = true;
        const resp = await axios.post(`${API_ENDPOINT}/invite/add-step`, data, {
          params: {
            form_id: formId.value
          }
        });
        fetchTableData(formId.value).then(res => {
          addQuestion.value?.removePlayer();
          submittingQuestion.value = false;
          addQuestionDialog.value = false;
          base64.value = '';
          newQuestion.value = '';
          validQue.value.reset();
        });
      } catch (err) {
        console.log(err);
        submittingQuestion.value = false;
      }
    }

    function processQuery() {
      return query<{ transaction: Transaction }>({
        query: THIS_INVITE,
        variables: { id: getObjectId }
      }).then(({ data: { transaction } }) => {
        if (transaction && transaction.referral)
          referral.value = transaction.referral.map(item => ({
            email: item!.sentTo!,
            timestamp: item!.timestamp!
          }));
      });
    }

    const processTransfer = async () => {
      await mutate({
        mutation: SEND_INVITE,
        variables: {
          input: {
            id: getObjectId,
            email: email.value,
            name: useDbState(['user']).user.value!.firstName
          } as SendReferalInput
        }
      });
    };

    onMounted(async () => {
      await loader.value?.data?.process();
    });

    return {
      referral,
      previewLink,
      isPublished,
      openInviteEditDialog,
      invalidSlug,
      validationMsg,
      publishedNoti,
      resetInvite,
      validQue,
      addNewQuestion,
      copyLink,
      deleteLink,
      newQuestion,
      isBase64,
      getMedia,
      addQuestion,
      resetInviteDialog,
      addQuestionDialog,
      reRecordQ,
      moveEvent,
      reRecordDialog,
      closeReRecordDialog,
      submittingQuestion,
      reRecordQuestion,
      reRecord,
      change,
      changeOrder,
      revert,
      isChanging,
      updateInviteName,
      changeOrderDialog,
      publishInvite,
      isPublishing,
      updatingQuestion,
      deleteInvite,
      renameInviteStep,
      editInviteStep,
      editInviteDialog,
      isDeleting,
      viewQuestionDialog,
      deleteInviteDialog,
      openDeleteModal,
      currentMediaUrl,
      viewQuestion,
      Observer,
      invites,
      dialog,
      InviteTableDialog,
      inviteData,
      generateInvite,
      generateInviteDialog,
      isGenerating,
      isVerifying,
      isVerified,
      verifySlug,
      previewUrl,
      openGenerateDialog,
      previewTemplate,
      inviteLinkList,
      templateList,
      templateDialog,
      isFetchingLinks,
      isFetchingTempltes,
      fetchInviteLinks,
      processTransfer,
      fetchTemplates,
      openTemplate,
      processQuery,
      inviteLink,
      email,
      loader,
      myListDialog,
      previewDialog,
      dialog3,
      fetchTableData,
      isFetching,

      videoInvites: [
        {
          inviteName: 'Antioch Unified School District Invite',
          previewInvite: 159,
          chooseInvite: 149,
          inviteDateCreated: 'August 21st, 2021'
        },
        {
          inviteName: 'AUSD Invite for Kindercare',
          previewInvite: 159,
          chooseInvite: 149,
          inviteDateCreated: '5 days ago'
        },
        {
          inviteName: 'Antioch Unified prototype video invite (archive)',
          previewInvite: 159,
          chooseInvite: 149,
          inviteDateCreated: '1 days ago'
        }
      ]
    };
  }
});
</script>

<style lang="scss">
.refer {
  &__container {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__title-main {
    font-family: Raleway;
    font-size: 32px;
    font-weight: 800;
    margin-top: 15px;

    @media (max-width: 767px) {
      padding: 0 15px;
    }
  }

  &__title-main-citizens {
    margin-top: 15px;
    margin-bottom: 30px;
  }

  &__title-secondary {
    font-family: Raleway;
    font-size: 25px;
    font-weight: 800;
  }

  &__title-tertiary {
    font-family: Raleway;
    font-size: 25px;
    font-weight: 800;
    color: #dedede;
  }

  &__body1 {
    margin-top: 50px;
    // margin-bottom: 12px;
    flex-direction: row;
    display: flex;
    @media (max-width: 767px) {
      flex-direction: column;
      width: 100%;
      padding: 0 15px;
    }
  }

  &__body2 {
    margin-top: 30px;
    margin-bottom: 25px;
    flex-direction: row;
    display: flex;
  }

  &__body-email {
    font-size: 20px;
    margin: 20px;
    width: 100%;
  }

  &__body-email-button {
    margin-left: 20px;
    margin-right: 20px;
    @media (max-width: 767px) {
      margin: 0;
      width: 100%;
    }
  }

  &__manage1 {
    margin-top: 50px;
    margin-bottom: 25px;
  }

  &__manage1-buttons {
    margin-left: 10px;
    margin-right: 10px;
  }

  &__divider {
    width: 100%;
    margin-bottom: 50px;
  }

  &__all_invite {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
  &__dialog {
    text-align: center;
    padding: 25px;
  }

  &__dialog-title {
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  &__dialog-button {
    margin: 20px;
  }
}
.row-reverse {
  flex-direction: row-reverse;
}
.menu-item {
  cursor: pointer;
}

.invite-list-wrapper {
  list-style: none;
  margin-left: 0;
  padding: 30px !important;

  @media (max-width: 767px) {
    white-space: nowrap;
    overflow-y: auto;
  }
}

.invitetable-button {
  position: sticky;
  bottom: 0;
  z-index: 99;
  width: 100%;
  top: 0;
  background-color: #fff;
  margin-bottom: 0 !important;
  border-top: 1px solid #ccc;
  margin-top: 0 !important;
  padding-right: 10px;
}

.invalid {
  font-size: 14px;
  color: #ff5252;
}

.invite-table {
  width: 60%;
  margin: auto;
}
</style>
