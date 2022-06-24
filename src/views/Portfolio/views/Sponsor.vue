<template>
  <ValidationObserver v-slot="{}">
    <div class="sponsor__container d-flex flex-column">
      <v-alert v-if="invoiceState.state === 'error'" type="error">{{
        invoiceState.message
      }}</v-alert>
      <div class="d-flex justify-center">
        <v-dialog
          v-model="selectSponsor"
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
              <!-- {{ selectedDoc.programName }} -->
              Antioch Unified School District
            </v-btn>
          </template>
          <v-card class="d-flex flex-column">
            <div class="d-flex justify-end">
              <v-btn class="ma-2" x-large icon dark @click="selectSponsor = false">
                <v-icon x-large color="grey">mdi-close</v-icon>
              </v-btn>
            </div>
            <v-container class="mt-auto mb-auto d-flex justify-center flex-column">
              <div class="headline d-flex justify-center font-weight-bold mb-5">Select sponsor</div>
              <div
                class="d-flex justify-center align-center mobile-employer__programselect"
                @click="selectSponsor = false"
              >
                Antioch Unified School District
              </div>
            </v-container>
          </v-card>
        </v-dialog>
      </div>
      <div class="sponsor__details d-flex flex-row justify-center align-start mt-10 mb-6">
        <div class="sponsor__details-avatar">
          <Profile :size="130" />
        </div>

        <div class="sponsor__details-namecard d-flex flex-column align-center">
          <div>
            <validation-provider v-slot="{ errors }" rules="required">
              <v-text-field
                :error-messages="errors"
                height="60"
                outlined
                rounded
                value="Antioch Unified School District"
                label="Sponsor"
                class="sponsor__details-name font-weight-bold d-flex align-center"
                hint="Choose your public display name"
                :placeholder="`${user.firstName} ${user.lastName}`"
              ></v-text-field>
            </validation-provider>
          </div>
          <div class="d-flex justify-start mr-auto">
            <v-dialog v-model="sponsorRoles" fullscreen>
              <template #activator="{ on, attrs }">
                <v-btn
                  class="d-flex justify-start font-weight-bold"
                  v-bind="attrs"
                  rounded
                  color="red"
                  dark
                  depressed
                  v-on="on"
                  ><v-icon small left>mdi-plus</v-icon>Manage Stakeholders</v-btn
                >
              </template>

              <v-card>
                <div class="pl-12 pr-12">
                  <div class="d-flex justify-end pl-12 pr-12 pt-12">
                    <v-btn x-large icon grey @click="sponsorRoles = false">
                      <v-icon color="grey" x-large>mdi-close</v-icon>
                    </v-btn>
                  </div>
                  <div class="d-flex justify-start ml-6 mr-6 mb-6">
                    <v-icon color="red" x-large>mdi-account-group</v-icon>
                  </div>
                  <div class="d-flex justify-start ma-6"><h1>Manage Stakeholders</h1></div>
                  <div>
                    <v-simple-table>
                      <template #default>
                        <thead>
                          <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Role</th>
                            <th class="text-left">Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in desserts" :key="item.name">
                            <td>
                              <h2>{{ item.name }}</h2>
                            </td>
                            <td>
                              <h3>{{ item.role }}</h3>
                            </td>
                            <td>
                              <!-- <v-btn rounded depressed outlined></v-btn> -->

                              <!-- <v-select rounded outlined></v-select> -->

                              <v-btn rounded depressed outlined>Change Role</v-btn>
                            </td>
                            <!-- <td>{{ item.calories }}</td> -->
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </div>
                </div>
              </v-card>
            </v-dialog>
          </div>
        </div>

        <!-- <div class="sponsor__pay-card">
          <v-btn x-large rounded outlined text :disabled="!selectedProduct.length" @click="checkout"
            >Pay by Card</v-btn
          >
        </div>
        <div class="sponsor__pay-card">
          <v-btn
            x-large
            rounded
            outlined
            text
            :disabled="!selectedProduct.length"
            @click="sendInvoice"
            >Pay by Invoice</v-btn
          >
        </div> -->
      </div>

      <div class="sponsor__divider-thick mt-12"></div>

      <div class="mt-10 d-flex flex-row px-0">
        <div class="balance__main d-flex flex-row flex-grow-1 justify-center align-center">
          <div class="balance__main-left2 text-center pt-8 pb-8">
            <!-- <Profile :size="70" /> -->
            <div class="balance__main-left-title2">BALANCE</div>
            <div class="balance__main-left-header2">5 Tokens</div>
            <div>
              <v-icon class="mb-3" color="grey" x-large>mdi-set-right</v-icon>
            </div>
            <div>
              <v-chip dark small class="balance__main-left-chips">Antioch Unified</v-chip>
            </div>
          </div>

          <!-- MAKE INVITES DIALOG -->
          <div class="balance__main-right2 pl-8">
            <div class="d-flex justify-center">
              <v-dialog v-model="makeInvitesDialog" fullscreen>
                <template #activator="{ on, attrs }">
                  <v-btn
                    class="white--text font-weight-bold mt-2 mb-2"
                    depressed
                    color="green"
                    rounded
                    large
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>mdi-telegram</v-icon>Make Invites
                  </v-btn>
                </template>

                <v-card>
                  <div class="pl-12 pr-12">
                    <div class="d-flex justify-end pl-12 pr-12 pt-12">
                      <v-btn x-large icon grey @click="makeInvitesDialog = false">
                        <v-icon color="grey" x-large>mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <div class="d-flex justify-start ml-6 mr-6 mb-6">
                      <v-icon color="green" x-large>mdi-telegram</v-icon>
                    </div>
                    <div class="d-flex justify-start ma-6"><h1>Make Invites</h1></div>
                    <div class="d-flex flex-row align-start pl-12 pr-12">
                      <v-text-field
                        class="ma-2 d-flex"
                        outlined
                        rounded
                        label="First Name"
                      ></v-text-field>
                      <v-text-field class="ma-2" outlined rounded label="Last Name"></v-text-field>
                      <v-text-field class="ma-2" outlined rounded label="Email"></v-text-field>
                      <v-select
                        :items="inviteUsers"
                        label="User"
                        class="ma-2"
                        rounded
                        outlined
                      ></v-select>

                      <v-dialog v-model="selectInviteTemplate" fullscreen width="500">
                        <template #activator="{ on, attrs }">
                          <v-btn
                            class="ma-2"
                            :disabled="invalid"
                            :dark="!invalid"
                            depressed
                            rounded
                            :loading="loadInvite"
                            x-large
                            v-bind="attrs"
                            @click="process"
                            v-on="on"
                          >
                            <v-icon left>mdi-telegram</v-icon>Select Invite</v-btn
                          >
                        </template>
                        <v-card class="refer__dialog">
                          <!-- Choose video invite -->
                          <div class="d-flex flex-column">
                            <div class="d-flex ml-auto">
                              <v-btn
                                class="mt-10 ml-10 mr-10"
                                icon
                                @click="selectInviteTemplate = false"
                                ><v-icon x-large color="grey">mdi-close</v-icon></v-btn
                              >
                            </div>
                            <div>
                              <v-icon color="red" x-large>mdi-youtube</v-icon>
                            </div>
                            <div class="ma-8">
                              <h2>Choose video invite template</h2>
                            </div>
                            <div class="d-flex justify-center">
                              <v-simple-table>
                                <template #default>
                                  <thead>
                                    <tr>
                                      <th class="text-left">Date Created</th>
                                      <th class="text-left">Preview</th>
                                      <th class="text-left">Invite Name</th>

                                      <th class="text-left">Choose</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="item in videoInvites" :key="item.inviteName">
                                      <td class="pa-5 text-left">
                                        {{ item.inviteDateCreated }}
                                      </td>
                                      <td class="pa-5 text-left">
                                        <!-- {{ item.previewInvite }} -->

                                        <v-dialog v-model="invitePreview">
                                          <template #activator="{ on, attrs }">
                                            <v-btn
                                              rounded
                                              large
                                              depressed
                                              outlined
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              <v-icon left>mdi-youtube</v-icon>Preview</v-btn
                                            >
                                          </template>
                                          <v-card class="">
                                            <iframe
                                              src="https://www.videoask.com/fg0kdpocw"
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
                                        <h3>{{ item.inviteName }}</h3>
                                      </td>

                                      <td class="pa-5 text-left">
                                        <!-- {{ item.chooseInvite }} -->

                                        <v-btn
                                          rounded
                                          large
                                          depressed
                                          dark
                                          v-bind="attrs"
                                          class="font-weight-bold"
                                          v-on="on"
                                        >
                                          Select <v-icon right>mdi-cursor-default</v-icon></v-btn
                                        >
                                      </td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                            </div>

                            <div class="ma-12">
                              <v-dialog v-model="makeInviteIntro" width="fit-content">
                                <template #activator="{ on, attrs }">
                                  <v-btn v-bind="attrs" rounded x-large depressed outlined v-on="on"
                                    ><v-icon left>mdi-plus</v-icon>Make new video invite</v-btn
                                  >
                                </template>
                                <v-card class="">
                                  <div class="d-flex flex-row">
                                    <div class="d-flex flex-column pa-6 justify-center">
                                      <div class="ma-6 d-flex justify-center">
                                        <h3>Existing</h3>
                                      </div>
                                      <!-- 1 -->
                                      <div class="d-flex flex-column justify-center ma-3">
                                        <div class="d-flex justify-center">
                                          <iframe
                                            src="https://www.videoask.com/a0tnq4sre3tdhpic28dejc83mxxge3f7000f96uv"
                                            allow="autoplay *; encrypted-media *; fullscreen *;"
                                            width="105px"
                                            height="75px"
                                            style="border: none; border-radius: 5px"
                                          ></iframe>
                                        </div>
                                        <div class="d-flex justify-center ma-2">
                                          <v-btn depressed outlined>Choose</v-btn>
                                        </div>
                                      </div>

                                      <!-- 2 -->
                                      <div class="d-flex flex-column justify-center ma-3">
                                        <div class="d-flex justify-center">
                                          <iframe
                                            src="https://www.videoask.com/a0tnq4sre3tdhpic28dejc83mxxge3f7000f96uv"
                                            allow="autoplay *; encrypted-media *; fullscreen *;"
                                            width="105px"
                                            height="75px"
                                            style="border: none; border-radius: 5px"
                                          ></iframe>
                                        </div>
                                        <div class="d-flex justify-center ma-2">
                                          <v-btn depressed outlined>Choose </v-btn>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <iframe
                                        src="https://www.videoask.com/fi66vcex7"
                                        allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
                                        width="600px"
                                        height="600px"
                                        style="border: none; margin: 0px; padding: 0px"
                                      >
                                      </iframe>
                                    </div>
                                  </div>
                                  <!-- if video recording successful, show this renaming text field -->
                                  <div class="d-flex pa-12 justify-center flex-column">
                                    <div class="d-flex justify-center">
                                      <v-text-field
                                        label="Name your invite"
                                        rounded
                                        x-large
                                        style="width: 50%"
                                        outlined
                                        value="Antioch Unified School District Invite copy"
                                      ></v-text-field>
                                    </div>
                                    <div class="d-flex justify-center">
                                      <!-- once make invite clicked, close dialog and refresh invite screen with new video invite listed -->
                                      <v-btn x-large rounded dark depressed>Make Invite</v-btn>
                                    </div>
                                  </div>
                                </v-card>
                              </v-dialog>
                            </div>
                          </div>
                        </v-card>
                      </v-dialog>
                    </div>
                    <div class="pl-12 pr-12">
                      <v-btn
                        class="sponsor__add-invite-contact ma-2"
                        x-large
                        depressed
                        rounded
                        outlined
                        ><v-icon>mdi-plus</v-icon></v-btn
                      >
                    </div>
                    <div class="d-flex justify-start ml-6 mt-12">
                      <v-btn class="font-weight-bold" depressed dark
                        ><v-icon left>mdi-email-outline</v-icon>All Invites</v-btn
                      >
                    </div>

                    <div class="mt-6">
                      <AllInvites />
                    </div>
                  </div>
                </v-card>
              </v-dialog>
            </div>

            <div class="d-flex justify-center">
              <v-dialog v-model="manageCodeDialog" fullscreen>
                <template #activator="{ on, attrs }">
                  <v-btn
                    class="white--text font-weight-bold mt-2 mb-2"
                    depressed
                    color="pink"
                    large
                    v-bind="attrs"
                    rounded
                    v-on="on"
                  >
                    <v-icon left>mdi-ticket-percent</v-icon>Manage Codes
                  </v-btn>
                </template>

                <v-card>
                  <div class="pl-12 pr-12">
                    <div class="d-flex justify-end pl-12 pr-12 pt-12">
                      <v-btn x-large icon grey @click="manageCodeDialog = false">
                        <v-icon color="grey" x-large>mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <div class="d-flex justify-start ml-6 mr-6 mb-6">
                      <v-icon color="pink" x-large>mdi-ticket-percent</v-icon>
                    </div>
                    <div class="d-flex justify-start ma-6"><h1>Manage Sponsorship Codes</h1></div>
                    <div>
                      <div>
                        <!-- <div class="balance__transfer-title d-flex justify-center">
                          Sponsor Participants
                        </div> -->
                        <div class="d-flex justify-center">
                          <v-row class="d-flex justify-start pl-6">
                            <!-- <div class="sponsor__details-avatar ma-2">
                              <Profile :size="60" />
                            </div> -->
                            <div class="ma-2">
                              <v-select
                                height="60"
                                outlined
                                rounded
                                label="Choose Sponsor"
                                class="balance__details-name font-weight-bold"
                                hint="Pick from available token sources"
                              >
                              </v-select>
                            </div>
                            <div class="ma-2">
                              <v-text-field
                                type="number"
                                height="60"
                                outlined
                                rounded
                                min="1"
                                label="Token Quantity"
                                class="balance__token-amount font-weight-bold"
                                hint="Choose amount"
                                placeholder="0"
                              ></v-text-field>
                            </div>
                          </v-row>
                        </div>

                        <div class="d-flex justify-start flex-column pl-12">
                          <div class="d-flex justify-start">
                            <v-switch
                              color="green"
                              inset
                              label="Automatic access to monitor student activities as sponsor"
                            ></v-switch>
                          </div>
                          <div class="d-flex justify-start">
                            <v-switch
                              color="green"
                              inset
                              label="One time use per student"
                            ></v-switch>
                          </div>
                        </div>

                        <div class="d-flex justify-start pt-6 mb-12">
                          <v-dialog v-model="generateCodeDialog" persistent max-width="500px">
                            <template #activator="{ on, attrs }">
                              <v-btn
                                class="ml-2 mr-2 font-weight-bold"
                                color="pink"
                                dark
                                x-large
                                rounded
                                depressed
                                v-bind="attrs"
                                v-on="on"
                                >Generate Sponsorship Code</v-btn
                              >
                            </template>

                            <v-card>
                              <v-card-title class="d-flex flex-column">
                                <div class="d-flex justify-center">
                                  <v-icon color="pink" large>mdi-trophy</v-icon>
                                </div>

                                <div class="headline font-weight-bold">Share sponsorship code</div>
                              </v-card-title>

                              <!-- <v-divider></v-divider> -->

                              <div class="d-flex flex-column justify-center pa-5 sponsorship-field">
                                <v-text-field
                                  class="justify-center ma-2"
                                  label="Copy & share code"
                                  x-large
                                  rounded
                                  outlined
                                  hide-details
                                  readonly
                                >
                                  <v-tooltip slot="append" top>
                                    <template slot="activator">
                                      <v-btn icon>
                                        <v-icon>mdi-content-copy</v-icon>
                                      </v-btn>
                                    </template>
                                    <span>Sponsorship code copied!</span>
                                  </v-tooltip>
                                </v-text-field>

                                <v-textarea
                                  class="ma-9"
                                  rounded
                                  auto-grow
                                  hide-details
                                  outlined
                                  label="Personalize your welcome message"
                                  append-icon="mdi-content-copy"
                                >
                                  <v-tooltip slot="append" top>
                                    <template slot="activator">
                                      <v-btn icon>
                                        <v-icon>mdi-content-copy</v-icon>
                                      </v-btn>
                                    </template>
                                    <span>Sponsorship message copied!</span>
                                  </v-tooltip>
                                </v-textarea>

                                <v-btn
                                  class="ma-2"
                                  x-large
                                  dark
                                  rounded
                                  depressed
                                  @click="generateCodeDialog = false"
                                  >Go back</v-btn
                                >
                              </div>
                            </v-card>
                          </v-dialog>
                        </div>

                        <div class="d-flex justify-start ml-6 mt-12">
                          <v-btn class="font-weight-bold" depressed dark
                            ><v-icon left>mdi-ticket-percent</v-icon>All Codes</v-btn
                          >
                        </div>

                        <div class="ma-6">
                          <SponsorLinksTable
                            :items="sponsorLinksTableItems"
                            :sponsors="originalOwners"
                            @revoke="revokeToken"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-dialog>
            </div>

            <div class="d-flex justify-center">
              <v-dialog v-model="transferTokensDialog" fullscreen>
                <template #activator="{ on, attrs }">
                  <v-btn
                    class="white--text font-weight-bold mt-2 mb-2"
                    depressed
                    color="grey"
                    outlined
                    rounded
                    large
                    v-bind="attrs"
                    v-on="on"
                    ><v-icon left>mdi-bank-transfer</v-icon>Transfer Tokens</v-btn
                  >
                </template>

                <v-card>
                  <div class="pl-12 pr-12">
                    <div class="d-flex justify-end pl-12 pr-12 pt-12">
                      <v-btn x-large icon grey @click="transferTokensDialog = false">
                        <v-icon color="grey" x-large>mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <div class="d-flex justify-start ml-6 mr-6 mb-6">
                      <v-icon color="grey" x-large>mdi-bank-transfer</v-icon>
                    </div>
                    <div class="d-flex justify-start ma-6"><h1>Transfer Tokens</h1></div>
                    <div>
                      <div>
                        <!-- <div class="balance__transfer-title black--text text-center">
                          Transfer Tokens
                        </div> -->
                        <div class="d-flex flex-row justify-start pl-12">
                          <div>
                            <v-text-field
                              rounded
                              x-large
                              class="balance__email-font font-weight-bold ma-2"
                              outlined
                              label="Enter recipient's email"
                            ></v-text-field>
                          </div>

                          <div>
                            <v-text-field
                              x-large
                              outlined
                              type="number"
                              min="1"
                              rounded
                              label="Token Quantity"
                              class="balance__token-amount font-weight-bold ma-2"
                              hint="Choose amount"
                              placeholder="0"
                            ></v-text-field>
                          </div>

                          <v-dialog v-model="dialog6" persistent max-width="450px">
                            <template #activator="{ on, attrs }">
                              <div>
                                <v-btn
                                  class="ma-2 white--text font-weight-bold"
                                  color="grey darken-4"
                                  v-bind="attrs"
                                  x-large
                                  rounded
                                  depressed
                                  v-on="on"
                                  >Transfer</v-btn
                                >
                              </div>
                            </template>

                            <v-card>
                              <v-card-title class="d-flex flex-column">
                                <div>
                                  <div class="d-flex justify-center">
                                    <v-icon class="mb-6 mt-6" color="gray" x-large
                                      >mdi-timer-sand</v-icon
                                    >
                                  </div>
                                  <div class="headline font-weight-bold">Processing...</div>
                                </div>
                                <div>
                                  <div class="d-flex justify-center">
                                    <v-icon class="mb-6 mt-6" color="red" x-large>mdi-close</v-icon>
                                  </div>

                                  <div class="headline font-weight-bold">
                                    Uh-oh! The transfer failed.
                                  </div>

                                  <v-card-text>
                                    Don't worry, your tokens weren't moved. <br />Please refresh the
                                    page and try again.
                                  </v-card-text>

                                  <v-card-text>
                                    <!-- {{ processTransferError }} -->
                                  </v-card-text>
                                </div>
                                <div>
                                  <div class="d-flex justify-center">
                                    <v-icon class="mb-6 mt-6" color="green" x-large
                                      >mdi-check-all</v-icon
                                    >
                                  </div>

                                  <div class="headline font-weight-bold">Transfer succeeded!</div>
                                </div>
                              </v-card-title>

                              <div class="d-flex flex-row justify-center pa-3">
                                <v-btn
                                  class="ma-2"
                                  x-large
                                  rounded
                                  outlined
                                  depressed
                                  @click="$router.go(0)"
                                  >Refresh Page</v-btn
                                >
                              </div>
                            </v-card>
                          </v-dialog>
                        </div>
                        <div class="balance__table-view">
                          <BalanceView ref="balanceTable" />
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-dialog>
            </div>

            <div class="d-flex justify-center">
              <v-dialog v-model="buyTokensDialog" fullscreen>
                <template #activator="{ on, attrs }">
                  <v-btn
                    class="white--text font-weight-bold mt-2 mb-2"
                    depressed
                    color="blue"
                    rounded
                    large
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>mdi-cash-usd</v-icon>Buy Tokens
                  </v-btn>
                </template>

                <v-card>
                  <div class="pl-12 pr-12">
                    <div class="d-flex justify-end pl-12 pr-12 pt-12">
                      <v-btn x-large icon grey @click="buyTokensDialog = false">
                        <v-icon color="grey" x-large>mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <div class="d-flex justify-start ml-6 mr-6 mb-6">
                      <v-icon color="blue" x-large>mdi-cash-usd</v-icon>
                    </div>
                    <div class="d-flex justify-start ma-6"><h1>Buy Tokens</h1></div>
                    <div>
                      <div class="d-flex flex-column">
                        <div class="d-flex flex-row justify-start align-start pl-6">
                          <div class="sponsor__details-namecard d-flex flex-column">
                            <v-text-field
                              height="60"
                              outlined
                              rounded
                              label="Sponsor"
                              class="sponsor__details-name font-weight-bold"
                              hint="Choose your public display name"
                            ></v-text-field>
                          </div>

                          <div class="sponsor__pay-card">
                            <v-btn x-large rounded outlined text>Pay by Card</v-btn>
                          </div>
                          <div class="sponsor__pay-card">
                            <v-btn x-large rounded outlined text>Pay by Invoice</v-btn>
                          </div>
                        </div>

                        <div class="sponsor__program-menu">
                          <v-card elevation="0" dark class="mb-3">
                            <v-card-title class="landing__menu-title">
                              <div class="sponsor__option-title white--text font-weight-bold">
                                A
                              </div>
                              <div class="sponsor__option-unit font-weight-bold">
                                <v-chip color="white" outlined> B </v-chip>
                              </div>
                              <div class="sponsor__option-price white--text mr-auto">$X</div>
                              <v-text-field
                                class="sponsor__quantity-check"
                                min="0"
                                outlined
                                x-large
                                label="Quantity"
                                type="number"
                                hide-details
                              ></v-text-field>
                            </v-card-title>

                            <v-divider></v-divider>

                            <v-card-subtitle> C </v-card-subtitle>
                          </v-card>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-dialog>
            </div>

            <div class="d-flex justify-center">
              <v-dialog v-model="buildPackageDialog" fullscreen>
                <template #activator="{ on, attrs }">
                  <v-btn
                    class="white--text font-weight-bold mt-2 mb-2"
                    depressed
                    color="purple"
                    large
                    rounded
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>mdi-package-variant-closed</v-icon>Pricing
                  </v-btn>
                </template>
                <v-card class="ma-0 pa-0">
                  <div class="pl-12 pr-12">
                    <div class="d-flex justify-end pl-12 pr-12 pt-12">
                      <v-btn x-large icon grey @click="buildPackageDialog = false">
                        <v-icon color="grey" x-large>mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <div class="d-flex justify-center ml-6 mr-6 mb-6">
                      <v-icon color="purple" x-large>mdi-package-variant-closed</v-icon>
                    </div>
                    <div class="d-flex justify-center ma-6"><h1>Build token package</h1></div>

                    <div>
                      <!-- dsfsdfsdf -->
                      <div class="d-flex ml-auto mr-auto sponsor__build-token-package mt-12">
                        <v-text-field
                          outlined
                          x-large
                          class="d-flex sponsor__build-token-package-input align-center"
                        >
                          <v-icon slot="append-outer" x-large color="green"> mdi-plus </v-icon>
                          <v-icon slot="prepend" x-large color="red"> mdi-minus </v-icon>
                        </v-text-field>
                      </div>
                    </div>
                    <div
                      class="
                        sponsor__build-token-package-pricing-bar
                        ma-12
                        d-flex
                        flex-row
                        justify-end
                      "
                    >
                      <div class="d-flex ma-6 align-center"><h3>Total</h3></div>
                      <div class="d-flex ma-6 align-center"><h1>$10,938</h1></div>
                      <div class="d-flex ma-6 align-center">
                        <v-btn x-large rounded depressed dark class="font-weight-bold"
                          >Checkout</v-btn
                        >
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="sponsor__divider-thick mt-8"></div> -->

      <div class="pc-program-card ml-12 mr-12 mt-12 mb-5">
        <v-card tile class="pa-0 ma-0" flat height="225px">
          <div class="pc-program-card__content py-5 px-5">
            <div class="d-flex align-center">
              <v-avatar class="mr-2" color="blue" size="40"
                ><v-img
                  src="https://f.hubspotusercontent00.net/hubfs/2480959/P_Cutoff3-Oct-07-2020-10-55-09-87-AM.png"
                ></v-img
              ></v-avatar>
              <div class="pc-program-card__title-monitor font-weight-bold d-flex align-center">
                Flagship Program
              </div>
              <div class="ml-3 pt-0">
                <v-btn x-small rounded depressed disabled
                  >Build employer projects to win internships</v-btn
                >
              </div>
            </div>
            <div class="pc-program-card__actions">
              <div class="pc-program-card__outline">
                <div class="d-flex justify-end align-end mt-16">
                  <v-btn outlined x-large rounded class="font-weight-bold"
                    >Monitor 78 Participants</v-btn
                  >
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </div>

      <div class="sponsor__divider-thick mt-12"></div>

      <v-card flat>
        <div class="d-flex justify-center mt-12">
          <v-icon x-large color="yellow">mdi-trophy</v-icon>
        </div>
        <div class="headline d-flex justify-center font-weight-bold mt-5 mb-6">
          <h2 class="red--text">Sponsor Participants</h2>
        </div>
        <v-card-title>
          <v-text-field
            outlined
            rounded
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table item-key="id" show-select single-select></v-data-table>
      </v-card>

      <!-- <div class="sponsor__program-menu">
        <v-card
          v-for="option in purchaseOptions"
          :key="option.title"
          elevation="0"
          :color="option.color"
          dark
          class="mb-3"
        >
          <v-card-title class="landing__menu-title">
            <div class="sponsor__option-title white--text font-weight-bold">{{ option.title }}</div>
            <div class="sponsor__option-unit font-weight-bold">
              <v-chip color="white" outlined>{{ option.unitLabel }}</v-chip>
            </div>
            <div class="sponsor__option-price white--text mr-auto">${{ option.price / 100 }}</div>
            <v-text-field
              v-model="option.quantity"
              class="sponsor__quantity-check"
              min="0"
              outlined
              x-large
              label="Quantity"
              type="number"
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-subtitle>{{ option.desc }}</v-card-subtitle>
        </v-card>
      </div> -->
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import { computed, ref, Ref } from '@vue/composition-api';
import { defer } from 'rxjs';
import { retry } from 'rxjs/operators';

import { useDbActions, useStripeActions, useDbState } from '@/store';
import Profile from '@/components/Profile.vue';
import AllInvites from '@/components/portfolio/AllInvites.vue';
import SponsorLinksTable from '@/components/portfolio/SponsorLinksTable.vue';
import BalanceView from '../BalanceView.vue';

export default {
  name: 'Sponsor',

  components: {
    Profile,
    AllInvites,
    SponsorLinksTable,
    BalanceView
  },

  setup(_, ctx) {
    const { user } = useDbState(['user']);
    const sponsorName = ref('');
    const { getProductInfos } = useDbActions(['getProductInfos']);
    const PRICE_IDS =
      process.env.NODE_ENV === 'development'
        ? [
            'price_1HXAFALnkQGEgDQnGsjqbuuM', // student
            'price_1HXABLLnkQGEgDQnwzzt63Np', // family
            'price_1HXA9ZLnkQGEgDQn9uaE7Hm2', // group
            'price_1HXAD3LnkQGEgDQnqxQabHZO', // class
            'price_1HXACELnkQGEgDQnWpGByUE0' // teacher
          ]
        : [
            'price_1HXEkkLnkQGEgDQnedtEFh3p',
            'price_1HXEkcLnkQGEgDQnVKGG37Yj',
            'price_1KoekVLnkQGEgDQn4LEznMVj',
            'price_1KoemRLnkQGEgDQnohSIpDbo',
            'price_1HXEkfLnkQGEgDQntVYb3iFX'
          ];
    const ColorCode = {
      'Per Student': 'green',
      'Per Family': 'orange',
      'Per Group': 'purple',
      'Per Class': 'blue',
      'Per Teacher': 'pink'
    };
    const purchaseOptions: Ref<
      {
        title: string;
        desc: string | null;
        priceId: string;
        price: number | null;
        color: any;
        quantity: number;
        unitLabel: string | null;
      }[]
    > = ref([]);
    getProductInfos({ priceId: PRICE_IDS }).then(result => {
      purchaseOptions.value = result.body.map(res => ({
        title: res.product.name,
        desc: res.product.description,
        priceId: res.price.id,
        price: res.price.unit_amount,
        color: ColorCode[res.product.name],
        quantity: 0,
        unitLabel: res.product.unit_label
      }));
    });
    const selectedProduct = computed(() => purchaseOptions.value.filter(opt => opt.quantity > 0));
    const { createCheckoutSession, createInvoice } = useStripeActions([
      'createCheckoutSession',
      'createInvoice'
    ]);
    const invoiceState = ref({
      state: '',
      message: ''
    });
    const checkout = async () => {
      defer(() =>
        createCheckoutSession({
          lineItems: selectedProduct.value,
          cancelUrl: 'http://pilotcity.com/sponsor'
        })
      )
        .pipe(retry(3))
        .subscribe(result => {
          if (result.error) {
            invoiceState.value.state = 'error';
            invoiceState.value.message = result.error.message!;
          }
        });
    };

    // Create Sponsorship Link Management
    // const { functions } = useDbGetters(['functions']);
    // const { collection } = useDbGetters(['collection']);
    // const autoMonitor = ref(true);
    // const oneTimeUse = ref(true);
    // const sponsorId = ref('');
    // const sponsorQuantity = ref(0);
    // const sponsorLinksTableItems: Ref<any[]> = ref([]);
    // const sponsorshipLink = ref('');
    // const sponsorWelcomeMessage = ref('');
    // const shareLinkDialog = ref(false);
    // Handle Invoicing

    const sendInvoice = async () => {
      try {
        const invoice = await createInvoice({ lineItems: selectedProduct.value });
        // eslint-disable-next-line no-unreachable
        if (invoice?.openInvoice?.hosted_invoice_url)
          window.location.href = invoice?.openInvoice?.hosted_invoice_url;
        ctx.root.$router.push(invoice?.openInvoice?.hosted_invoice_url);
        invoiceState.value.state = 'success';
        invoiceState.value.state = 'success';
      } catch (err) {
        invoiceState.value.state = 'error';
        invoiceState.value.message = err;
      }
      // handle invoice logic
    };

    const sponsorRoles = ref(false);
    const makeInvitesDialog = ref(false);
    const selectInviteTemplate = ref(false);
    const invitePreview = ref(false);
    const makeInviteIntro = ref(false);
    const selectSponsor = ref(false);
    const generateCodeDialog = ref(false);
    const manageCodeDialog = ref(false);
    const transferTokensDialog = ref(false);
    const buyTokensDialog = ref(false);
    const buildPackageDialog = ref(false);
    return {
      sponsorName,
      purchaseOptions,
      checkout,
      selectedProduct,
      sendInvoice,
      invoiceState,
      user,
      sponsorRoles,
      makeInvitesDialog,
      selectSponsor,
      selectInviteTemplate,
      invitePreview,
      makeInviteIntro,
      generateCodeDialog,
      manageCodeDialog,
      transferTokensDialog,
      buyTokensDialog,
      buildPackageDialog,
      inviteUsers: ['Employer', 'Teacher', 'School', 'Parent', 'Student'],

      desserts: [
        {
          name: 'Amber Martin',
          calories: 159,
          role: 'Owner'
        },
        {
          name: 'Kendra Ebinger',
          calories: 159,
          role: 'Owner'
        },
        {
          name: 'Kevin Jones',
          calories: 159,
          role: 'Owner'
        },
        {
          name: 'Louie Rocha',
          calories: 159,
          role: 'Admin'
        },
        {
          name: 'Jason Ebner',
          calories: 159,
          role: 'Manager'
        },
        {
          name: 'David House',
          calories: 159,
          role: 'Manager'
        },
        {
          name: 'Vontre Mason',
          calories: 159,
          role: 'Manager'
        }
      ],
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
};
</script>

<style lang="scss" scoped>
.sponsor {
  &__container {
    margin-top: 50px;
    padding-left: 6%;
    padding-right: 6%;
  }

  &__pay-card {
    margin-left: 25px;
    margin-top: 5px;
  }

  &__option-title {
    font-family: Raleway;
    font-size: 30px;
    margin-right: 20px;
  }

  &__option-unit {
    font-family: Raleway;
    margin-right: 20px;
  }

  &__option-price {
    font-weight: 300;
    font-size: 30px;
  }

  &__details {
    margin-top: 7px;
    width: 100%;
  }

  &__details-namecard {
    margin-left: 25px;
  }

  &__details-name {
    font-family: Raleway;
    font-size: 32px;
    width: 50vw;
  }

  &__quantity-check {
    margin-left: auto;
    max-width: 100px;
    font-size: 25px;
  }

  &__program-menu {
    display: grid;
    grid-template-columns: repeat(1, 80%);
    grid-template-rows: repeat(5, 20%);
    grid-column-gap: 25px;
    grid-row-gap: 25px;
    margin-bottom: 150px;
    justify-content: center;
  }

  &__divider-thick {
    border-top: 10px dotted #dedede;
    // border-top: 3px dotted #ea6763;
  }

  &__add-invite-contact {
    width: 100%;
    text-align: center;
    border: 1px dashed #404142;
  }

  &__build-token-package {
    width: 250px;
  }

  &__build-token-package-input {
    // width: 150px;

    font-size: 100px;
    // max-height: 150px;
    // min-width: 150px;
    // min-height: 150px;
    // max-height: 100px;
    // min-height: 100px;
    // text-align: center;
    // justify-items: center;

    // &.v-text-field--outlined > .v-input__control > .v-input__slot {
    //   width: 200px;
    //   height: 150px;
    //   font-family: 'Raleway';
    //   font-size: 50px;
    //   font-weight: 700;
    // }
    // &.v-input input {
    //   max-height: none !important;
    //   text-align: center !important;
    // }
  }

  &__build-token-package-pricing-bar {
    position: fixed;
    bottom: 0;
    right: 0;
    border: 1px dashed #dedede;
    border-radius: 50px;
    // border-top-left-radius: 50px;
    // border-top-right-radius: 50px;
    // border-bottom-left-radius: 50px;
    // border-bottom-right-radius: 50px;
    width: 90vw;
    height: 100px;
  }
}
</style>
