<template>
  <div class="balance__entire-body">
    <ValidationObserver v-slot="{ invalid }">
      <div class="balance__container d-flex flex-row px-0">
        <div class="balance__main d-flex flex-grow-1 justify-center align-center">
          <div class="balance__main-left text-center">
            <Profile :size="70" />
            <div class="balance__main-left-title">BALANCE</div>
            <div class="balance__main-left-header">
              {{ tokens.length >= 100 ? '100+' : tokens.length }} Tokens
            </div>
            <div>
              <v-icon class="balance__main-left-icon" color="grey" x-large>mdi-set-right</v-icon>
            </div>
            <div class="balance__main-left-chippers">
              <v-chip
                v-for="(owner, index) in modOriginalOwners"
                :key="index"
                dark
                :color="owner.color"
                class="balance__main-left-chips"
                >{{ sponsorName(owner) }}</v-chip
              >
            </div>
          </div>
          <div class="balance__main-right">
            <div class="d-flex justify-center">
              <v-btn
                class="balance__main-right-button white--text font-weight-bold"
                depressed
                color="red"
                x-large
                @click="sponsorState = !sponsorState"
              >
                <v-icon left>mdi-trophy</v-icon>Sponsor
              </v-btn>
            </div>
            <div class="d-flex justify-center">
              <v-btn
                class="balance__main-right-button white--text font-weight-bold"
                depressed
                color="blue"
                x-large
                @click="$emit('changeTab', 'payment')"
              >
                <v-icon left>mdi-cash-usd</v-icon>Buy Tokens
              </v-btn>
            </div>

            <div class="d-flex justify-center">
              <v-btn
                class="balance__main-right-button white--text font-weight-bold"
                depressed
                color="grey"
                outlined
                x-large
                @click="transferState = !transferState"
                ><v-icon left>mdi-bank-transfer</v-icon>Transfer</v-btn
              >
            </div>
          </div>
        </div>
      </div>

      <div v-show="sponsorState">
        <div class="balance__transfer-title d-flex justify-center">Sponsor Participants</div>
        <div class="d-flex justify-center pt-6">
          <v-row class="d-flex justify-center balance__center-stage">
            <div class="sponsor__details-avatar ma-2">
              <Profile :size="60" />
            </div>
            <div class="sponsor__inputWrapper">
              <v-select
                v-model="sponsorId"
                :items="originalOwners"
                :item-text="item => sponsorName(item)"
                item-value="_id"
                :error-messages="errors"
                height="60"
                outlined
                rounded
                label="Choose Sponsor"
                class="balance__details-name font-weight-bold"
                hint="Pick from available token sources"
                @input="updateSponsorQuantity"
              >
              </v-select>
            </div>
            <div class="sponsor__inputWrapper">
              <v-text-field
                v-model="sponsorQuantity"
                :error-messages="errors"
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

        <div class="sponsor__toggleSwitchWrapper d-flex justify-center flex-column">
          <div class="d-flex toggleSwitchContent">
            <v-switch
              v-model="autoMonitor"
              color="green"
              inset
              label="Automatic access to monitor student activities as sponsor"
            ></v-switch>
          </div>
          <div class="d-flex toggleSwitchContent">
            <v-switch
              v-model="oneTimeUse"
              color="green"
              inset
              label="One time use per student"
            ></v-switch>
          </div>
        </div>

        <div class="sponsor__sponsorShipBtn d-flex justify-center pt-6 mb-12">
          <v-dialog v-model="shareLinkDialog" persistent max-width="500px">
            <template #activator="{ on, attrs }">
              <v-btn
                class="ml-2 mr-2"
                color="red"
                x-large
                rounded
                :dark="isValid && isDecimal"
                :disabled="!isValid || !isDecimal"
                depressed
                v-bind="attrs"
                v-on="on"
                @click="createSponsorshipLink"
                >Generate Sponsorship Code</v-btn
              >
            </template>

            <v-card>
              <v-card-title class="d-flex flex-column">
                <div class="d-flex justify-center">
                  <v-icon color="red" large>mdi-trophy</v-icon>
                </div>

                <div class="headline font-weight-bold">Share sponsorship code</div>
              </v-card-title>

              <!-- <v-divider></v-divider> -->

              <div class="d-flex flex-column justify-center pa-5 sponsorship-field">
                <v-text-field
                  v-model="sponsorshipLink"
                  class="justify-center ma-2"
                  label="Copy & share code"
                  x-large
                  rounded
                  outlined
                  hide-details
                  readonly
                >
                  <v-tooltip slot="append" v-model="showCopiedLinkTooltip" top>
                    <template slot="activator">
                      <v-btn
                        icon
                        @click="
                          copy(sponsorshipLink);
                          showCopiedLinkTooltip = true;
                        "
                      >
                        <v-icon>mdi-content-copy</v-icon>
                      </v-btn>
                    </template>
                    <span>Sponsorship code copied!</span>
                  </v-tooltip>
                </v-text-field>

                <v-textarea
                  v-model="sponsorWelcomeMessage"
                  class="ma-9"
                  rounded
                  auto-grow
                  hide-details
                  outlined
                  label="Personalize your welcome message"
                  append-icon="mdi-content-copy"
                >
                  <v-tooltip slot="append" v-model="showCopiedMessageTooltip" top>
                    <template slot="activator">
                      <v-btn
                        icon
                        @click="
                          copy(sponsorWelcomeMessage);
                          showCopiedMessageTooltip = true;
                        "
                      >
                        <v-icon>mdi-content-copy</v-icon>
                      </v-btn>
                    </template>
                    <span>Sponsorship message copied!</span>
                  </v-tooltip>
                </v-textarea>

                <v-btn class="ma-2" x-large dark rounded depressed @click="shareLinkDialog = false"
                  >Go back</v-btn
                >
              </div>
            </v-card>
          </v-dialog>
        </div>

        <div class="balance__table-view">
          <SponsorLinksTable
            :items="sponsorLinksTableItems"
            :sponsors="originalOwners"
            @revoke="revokeToken"
          />
        </div>
      </div>

      <div v-show="transferState">
        <div class="balance__transfer-title black--text text-center">Transfer Tokens</div>
        <div
          class="balance__transfer d-flex"
          :class="$vuetify.breakpoint.md ? 'justify-space-between' : 'justify-center'"
        >
          <div class="balance__email">
            <validation-provider v-slot="{ errors }" rules="required">
              <v-text-field
                v-model="transferEmail"
                rounded
                x-large
                class="balance__email-font font-weight-bold"
                :error-messages="errors"
                outlined
                label="Enter recipient's email"
              ></v-text-field>
            </validation-provider>
          </div>

          <div class="balance__tickets">
            <validation-provider v-slot="{ errors }" rules="min:1|required">
              <v-text-field
                v-model="transferQuantity"
                :error-messages="errors"
                x-large
                outlined
                rounded
                label="Token Quantity"
                class="balance__token-amount font-weight-bold"
                hint="Choose amount"
                placeholder="0"
              ></v-text-field>
            </validation-provider>
          </div>

          <v-dialog v-model="dialog6" persistent max-width="450px">
            <template #activator="{ on, attrs }">
              <div class="balance__transfer-button">
                <v-btn
                  v-bind="attrs"
                  x-large
                  rounded
                  :disabled="invalid"
                  :dark="!invalid"
                  depressed
                  v-on="on"
                  @click="processTransfer"
                  >Transfer</v-btn
                >
              </div>
            </template>

            <v-card :loading="loading">
              <v-card-title class="d-flex flex-column">
                <div v-if="loading">
                  <div class="d-flex justify-center">
                    <v-icon class="mb-6 mt-6" color="gray" x-large>mdi-timer-sand</v-icon>
                  </div>
                  <div class="headline font-weight-bold">Processing...</div>
                </div>
                <div v-else-if="processTransferError">
                  <div class="d-flex justify-center">
                    <v-icon class="mb-6 mt-6" color="red" x-large>mdi-close</v-icon>
                  </div>

                  <div class="headline font-weight-bold d-flex justify-center">Uh oh!</div>

                  <!-- <v-card-text>
                    Don't worry, your tokens weren't moved. <br />Please refresh the page and try
                    again.
                  </v-card-text> -->

                  <div class="ma-4">
                    <div class="balance__word-wrap">
                      Looks like the user doesn't have an account yet. Try again after.
                    </div>
                  </div>

                  <!-- <v-card-text>
                    {{ processTransferError }}
                  </v-card-text> -->
                </div>
                <div v-else>
                  <div class="d-flex justify-center">
                    <v-icon class="mb-6 mt-6" color="green" x-large>mdi-check-all</v-icon>
                  </div>

                  <div class="headline font-weight-bold">Transfer succeeded!</div>
                </div>
              </v-card-title>

              <div class="d-flex flex-row justify-center pa-3">
                <v-btn class="mb-6" x-large rounded outlined depressed @click="$router.go(0)"
                  >Refresh</v-btn
                >
              </div>
            </v-card>
          </v-dialog>
        </div>
        <div class="d-flex justify-center mb-5 ml-6 mr-6">
          <div class="d-flex flex-row align-center justify-center">
            <div>
              <h5 class="d-flex module-default__make-italic">
                Want to monitor & sponsor multiple participants?
              </h5>
            </div>
            <div>
              <v-btn
                class="balance__main-right-button white--text font-weight-bold ml-3 mr-3"
                depressed
                color="red"
                x-small
                @click="sponsorState = !sponsorState"
              >
                <v-icon x-small left>mdi-trophy</v-icon>Use Sponsor
              </v-btn>
            </div>
          </div>
        </div>
        <div class="balance__table-view">
          <BalanceView ref="balanceTable" />
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, Ref } from '@vue/composition-api';
import { ObjectID } from 'bson';

import { Token, User } from '@/generated/graphql';
import { useUserGetters, useDbState, useDbGetters } from '@/store';
import Profile from '@/components/Profile.vue';
import SponsorLinksTable from '@/components/portfolio/SponsorLinksTable.vue';
import { MY_TOKEN_OWNER, USERS } from '@/services/graphql/queries';
import { TRANSFER_TOKENS } from '@/services/graphql/mutations';
import BalanceView from '../BalanceView.vue';

export default {
  name: 'Balance',
  components: { Profile, BalanceView, SponsorLinksTable },
  setup(
    _props,
    {
      root: {
        $apolloProvider: {
          defaultClient: { query, mutate }
        }
      }
    }
  ) {
    const colors = ['red', 'orange', 'blue', 'purple', 'pink', 'yellow'];

    const transferState = ref(false);
    const sponsorState = ref(false);
    // Token Management
    const tokens: Ref<Token[]> = ref([]);
    const originalOwners: Ref<Pick<User, '_id' | 'firstName' | 'lastName'>[]> = ref([]);

    // Create Sponsorship Link Management
    const { functions } = useDbGetters(['functions']);
    const { collection } = useDbGetters(['collection']);
    const autoMonitor = ref(true);
    const oneTimeUse = ref(true);
    const sponsorId = ref('');
    const sponsorQuantity = ref(0);
    const validateQty = ref(0);
    const sponsorLinksTableItems: Ref<any[]> = ref([]);
    const sponsorshipLink = ref('');
    const sponsorWelcomeMessage = ref('');
    const shareLinkDialog = ref(false);
    // Transfer Management
    const transferEmail = ref('');
    const transferQuantity = ref(0);
    const processTransferError = ref(null);
    const loading = ref(false);

    const id = useUserGetters(['getId']).getId;

    const isDecimal = computed(() => {
      const regex = /^([0-9]+)$/;
      const matches = regex.exec(sponsorQuantity.value.toString());
      return !!matches;
    });

    const isValid = computed(() => {
      if (
        sponsorQuantity.value > 0 &&
        sponsorId.value.length &&
        sponsorQuantity.value <= validateQty.value
      ) {
        return true;
      }
      return false;
    });

    const fetchTokens = () => {
      collection.value!('Tokens')
        .find({
          newOwner_id: new ObjectID(id.value!)
        })
        .then(async res => {
          tokens.value = res;
          const tokenOwners = res.map(token => ({ _id: token.owner_id }));
          if (tokenOwners.length)
            originalOwners.value = (
              await query({
                query: USERS,
                variables: { userQueryInputs: tokenOwners }
              })
            ).data.users;
        });
    };

    // UI Management
    const modOriginalOwners = computed(() =>
      originalOwners.value.map(owner => ({
        ...owner,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      }))
    );

    const updateSponsorQuantity = () => {
      collection.value!('Tokens')
        .find({
          owner_id: new ObjectID(sponsorId.value),
          newOwner_id: new ObjectID(id.value!)
        })
        .then(async res => {
          sponsorQuantity.value = res.length;
          validateQty.value = res.length;
        });
    };

    const formatSponsorLink = (code: string) => `https://www.pilotcity.com/sponsor/${code}`;

    const fetchSponsorLinks = () => {
      collection.value!('SponsorLinks')
        .find({
          createdBy: new ObjectID(id.value!)
        })
        .then(links => {
          sponsorLinksTableItems.value = links;
          fetchTokens();
        });
    };

    const sponsorName = item =>
      item.sponsorName ? item.sponsorName : `${item.firstName} ${item.lastName}`;

    const createSponsorshipLink = async () => {
      let sponsorTokens;
      await collection.value!('Tokens')
        .find({
          owner_id: new ObjectID(sponsorId.value),
          newOwner_id: new ObjectID(id.value!)
        })
        .then(res => {
          sponsorTokens = res;
        });
      const tokenIds = sponsorTokens.map(token => token._id).slice(0, sponsorQuantity.value);
      const sponsor = originalOwners.value.filter(owner => owner._id === sponsorId.value)[0];
      await functions.value
        .callFunction(
          'createSponsorLink',
          id.value,
          sponsorQuantity.value,
          autoMonitor.value,
          tokenIds
        )
        .then(res => {
          sponsorshipLink.value = formatSponsorLink(res?.data?.shareCode);
          fetchSponsorLinks();
        });
      sponsorWelcomeMessage.value = `Want to build employer projects to win internships? ${sponsorName(
        sponsor
      )} sponsors you to participate in the PilotCity flagship program. Browse employers using the following sponsorship link & code: ${
        sponsorshipLink.value
      }. Welcome aboard! We're rooting for you.`;
      shareLinkDialog.value = true;
      sponsorId.value = '';
      sponsorQuantity.value = 0;
    };

    const revokeToken = (code: string) => {
      functions.value.callFunction('revokeLink', id.value, code).then(() => {
        fetchSponsorLinks();
      });
    };

    const copy = str => {
      navigator.clipboard.writeText(str);
    };

    const processTransfer = async () => {
      loading.value = true;
      try {
        if (transferQuantity.value > tokens.value.length) {
          throw new Error('You tried to send more tokens than your account holds.');
        }
        if (transferQuantity.value > 100) {
          throw new Error('Please transfer your tokens in smaller batches (< 100 per batch).');
        }
        await mutate({
          mutation: TRANSFER_TOKENS,
          variables: {
            recipientEmail: transferEmail.value,
            senderId: id.value,
            tokenIds: tokens.value.map(token => token._id).slice(0, transferQuantity.value)
          }
        });
      } catch (e) {
        console.error(e);
        processTransferError.value = e.message;
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchSponsorLinks();
    });

    const errors = '';
    return {
      sponsorshipLink,
      isDecimal,
      isValid,
      sponsorWelcomeMessage,
      dialog6: false,
      shareLinkDialog,
      sponsorQuantity,
      estimatedNumber: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      transferState,
      sponsorState,
      tokens,
      originalOwners,
      autoMonitor,
      oneTimeUse,
      copy,
      sponsorName,
      createSponsorshipLink,
      sponsorLinksTableItems,
      updateSponsorQuantity,
      showCopiedLinkTooltip: ref(false),
      showCopiedMessageTooltip: ref(false),
      revokeToken,
      modOriginalOwners,
      transferEmail,
      processTransferError,
      loading,
      processTransfer,
      transferQuantity,
      user: useDbState(['user']).user,
      sponsorId,
      sponsorNameExamples: ['Arroyo High School', 'San Lorenzo Unified School District'],
      errors
    };
  }
};
</script>

<style lang="scss">
.sponsorship-field {
  &.v-text-field--full-width .v-input__prepend-outer,
  .v-text-field--full-width .v-input__prepend-inner,
  .v-text-field--full-width .v-input__append-inner,
  .v-text-field--full-width .v-input__append-outer,
  .v-text-field--enclosed .v-input__prepend-outer,
  .v-text-field--enclosed .v-input__prepend-inner,
  .v-text-field--enclosed .v-input__append-inner,
  .v-text-field--enclosed .v-input__append-outer {
    margin-top: 10px;
  }
}

.balance {
  &__word-wrap {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  &__estimated-number {
    width: 175px;
  }

  &__details-name {
    font-family: Raleway;
    font-size: 25px;
    width: 550px;
    @media (max-width: 767px) {
      width: 87%;
      margin: 0 auto !important;
    }
  }

  &__token-amount {
    font-family: Raleway;
    font-size: 25px;
    width: 150px;
    @media (max-width: 767px) {
      width: 87%;
      margin: 0 auto !important;
    }
  }

  &__toggleSwitchWrapper {
    width: 90%;
    margin: 0 auto;
  }

  &__container {
    margin-top: 50px;
  }

  &__main {
    width: 100%;
    flex-direction: row;
    @media (max-width: 767px) {
      flex-direction: column;
    }
  }

  &__main-left {
    border-right: 3px solid #dedede;
    width: 60%;
  }

  &__main-right {
    width: 40%;
  }

  &__main-left2 {
    border-right: 10px dotted #dedede;
    // border-left: 10px solid #3c9ccc;
    // border-right: 3px dotted #ea6763;
    width: 40%;
  }

  &__main-right2 {
    width: 60%;
  }

  &__main-right-button {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  &__main-left-title {
    letter-spacing: 2px;
    font-family: Raleway;
    font-weight: 900;
    color: #9e9e9e;
    margin-top: 25px;
  }

  &__main-left-title2 {
    letter-spacing: 2px;
    font-family: Raleway;
    font-weight: 900;
    color: #9e9e9e;
    margin-top: 20px;
  }

  &__main-left-header {
    font-family: Raleway;
    font-size: 55px;
    font-weight: 800;

    color: #000000;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  &__main-left-header2 {
    font-family: Raleway;
    font-size: 42px;
    font-weight: 800;

    color: #000000;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  &__main-left-chippers {
    margin-bottom: 25px;
  }

  &__main-left-chips {
    font-family: Raleway;
    font-weight: 700;

    margin: 10px;
  }

  &__main-left-icon {
    margin-bottom: 10px;
  }

  &__table-view {
    padding-left: 40px;
    padding-right: 40px;
    @media (max-width: 767px) {
      padding: 0;

      .v-data-footer {
        padding: 0;
        justify-content: center;

        .v-data-footer__select {
          margin-right: 5px;
        }
        .v-data-footer__pagination {
          margin: 0 12px 0 12px;
        }
        .v-data-footer__icons-before {
          button {
            height: 20px;
            width: 20px;
          }
        }
      }

      .v-data-table__mobile-row__header {
        white-space: nowrap;
        text-align: left;
      }
      .v-data-table__mobile-row__cell {
        > div {
          flex-wrap: unset;
          white-space: nowrap;
        }
      }
    }
  }

  &__transfer {
    margin-top: 30px;
    width: 100%;
    flex-direction: row;
    @media (max-width: 767px) {
      flex-direction: column;
      padding: 0 15px;
    }
  }

  &__transfer-title {
    margin-top: 55px;
    font-family: Raleway;
    font-size: 32px;
    font-weight: 800;
  }

  &__tickets {
    width: 15%;
    margin: 10px;
    @media (min-width: 768px) and (max-width: 991px) {
      width: 25%;
    }
    @media (max-width: 767px) {
      width: 100%;
      margin: 0;

      .v-input {
        width: 100%;
      }
    }
  }

  &__email {
    width: 30%;
    margin: 10px;
    @media (min-width: 768px) and (max-width: 991px) {
      width: 35%;
    }
    @media (max-width: 767px) {
      width: 100%;
      margin: 0;
    }
  }

  &__transfer-button {
    margin: 10px;
  }

  &__email-font {
    font-family: Raleway;
    font-size: 25px;
    width: 600px;
  }

  &__transfer-button {
    margin: 10px;
    @media (max-width: 767px) {
      button {
        width: 100%;
      }
    }
  }
}

.sponsor {
  &__inputWrapper {
    margin: 8px !important;
    @media (max-width: 767px) {
      margin: 0;
    }
  }

  &__toggleSwitchWrapper {
    @media (max-width: 767px) {
      width: 90%;
      margin: 0 auto;
    }
    .toggleSwitchContent {
      justify-content: center;
      @media (max-width: 767px) {
        justify-content: flex-start;
      }
    }
  }

  &__sponsorShipBtn {
    button {
      @media (max-width: 767px) {
        width: 95%;
        margin: 0 auto;
      }
    }
  }
}

.balance__main-right {
  div {
    width: 60% !important;
    margin: 0 auto !important;

    @media (max-width: 767px) {
      width: 80% !important;
    }

    button {
      width: 100% !important;
    }
  }
}
</style>
