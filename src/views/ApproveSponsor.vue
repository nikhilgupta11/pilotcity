<template>
  <div class="profile__container pc-container pt-12">
    <Loading v-slot="{ loading }" :process-now="true" :callback="loadData">
      <v-skeleton-loader
        :loading="loading"
        type="heading, list-item-two-line, list-item-two-line, list-item-three-line"
      >
        <v-container class="pa-0 ma-0">
          <div><Profile :size="100" /></div>
          <div class="d-flex flex-row align-center justify-center">
            <v-btn
              class="explore-card__button font-weight-bold ml-1 mr-1 mt-6 mb-6"
              rounded
              x-large
              disabled
              depressed
              :ripple="false"
              ><v-icon left> mdi-set-none </v-icon> Balance: {{ tokensAvailable }} Tokens</v-btn
            >
            <div class="d-flex justify-center">
              <v-btn
                class="balance__main-right-button white--text font-weight-bold"
                depressed
                color="red"
                rounded
                x-large
                :loading="sponsorLoading"
                @click="sponsorBtnClick"
              >
                <v-icon left>mdi-trophy</v-icon>Sponsor
              </v-btn>
            </div>
          </div>

          <v-card flat>
            <div class="headline d-flex justify-center font-weight-bold mt-12 mb-6">
              Sponsor Participants
            </div>
            <v-card-title>
              <v-text-field
                v-model="searchText"
                outlined
                rounded
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              v-model="selectedRequests"
              :headers="sponsorRequestHeaders"
              :items="sponsorRequests"
              :search="searchText"
              item-key="id"
              show-select
              single-select
            ></v-data-table>
          </v-card>
        </v-container>
      </v-skeleton-loader>
    </Loading>
  </div>
</template>

<script lang="ts">
import { ObjectId } from 'bson';
import { defineComponent, reactive, ref, toRefs } from '@vue/composition-api';

import { useDbGetters, useAuthGetters } from '@/store';
import Loading from '@/components/Loading.vue';
import Profile from '@/components/Profile.vue';

type ISponsorRequests = Array<{
  _id: ObjectId;
  id: string;
  program_id: ObjectId;
  programName: string;
  city: string;
  school: string;
  qualifications: Array<string>;
  ethnicityCulture: Array<string>;
  rewards: string;
}>;

const sponsorRequestHeaders = [
  { text: 'Program', value: 'programName', width: '20%' },
  { text: 'City', value: 'city', width: '15%' },
  { text: 'School', value: 'school', width: '15%' },
  { text: 'Culture', value: 'ethnicityCulture', width: '20%' },
  { text: 'Is unpaid ok?', value: 'rewards', width: '12%' },
  { text: 'Conditions', value: 'qualifications', width: '20%' }
];

export default defineComponent({
  name: 'ApproveSponsor',

  components: {
    Loading,
    Profile
  },

  setup() {
    const state = reactive<{
      sponsorRequests: ISponsorRequests;
      tokensAvailable: number;
    }>({
      sponsorRequests: [],
      tokensAvailable: 0
    });
    const searchText = ref('');
    const selectedRequests = ref([]);
    const sponsorLoading = ref(false);

    const { collection } = useDbGetters(['collection']);
    const { getUser, getObjectId } = useAuthGetters(['getUser', 'getObjectId']);

    const loadData = async () => {
      const resolveSponsorRequests = async () => {
        const sponsorRequestDocs = await collection.value!('SponsorRequest').find(
          {
            status: 'pending'
          },
          {
            projection: {
              _id: 1,
              program_id: 1,
              city: 1,
              school: 1,
              qualifications: 1,
              ethnicityCulture: 1,
              rewards: 1
            }
          }
        );
        const programIds = sponsorRequestDocs.map(sponsorRequest => sponsorRequest.program_id);
        const programDocs = await collection.value!('Program').find(
          {
            _id: { $in: programIds }
          },
          {
            projection: {
              _id: 1,
              programName: 1
            }
          }
        );
        state.sponsorRequests = sponsorRequestDocs.map(sponsorRequest => {
          const { programName } = programDocs.find(program =>
            program._id.equals(sponsorRequest.program_id)
          );
          return {
            ...sponsorRequest,
            id: sponsorRequest._id.toHexString(),
            programName
          };
        });
      };

      const resolveTokens = async () => {
        state.tokensAvailable =
          (await collection.value!('Tokens').count({
            newOwner_id: getObjectId.value
          })) || 0;
      };

      await Promise.all([resolveSponsorRequests(), resolveTokens()]);
    };

    const sponsorBtnClick = async () => {
      if (selectedRequests.value.length === 0) {
        // eslint-disable-next-line no-alert
        alert('Please select a participant to sponsor'); // TODO: change this to a toast
        return;
      }
      sponsorLoading.value = true;
      const sponsorRequestId = selectedRequests.value[0].id;

      try {
        const result = await getUser.value?.callFunction('approveSponsor', {
          sponsorRequestId
        });
        if (result.statusCode === 200) {
          sponsorLoading.value = false;
          window.location.reload();
        } else {
          sponsorLoading.value = false;
          throw Error(result.error || 'sponsor error');
        }
      } catch {
        // eslint-disable-next-line no-alert
        sponsorLoading.value = false;
        alert('Error approving sponsor'); // TODO: change this to a toast
      }
    };

    return {
      ...toRefs(state),
      sponsorRequestHeaders,
      searchText,
      selectedRequests,
      sponsorBtnClick,
      sponsorLoading,
      loadData
    };
  }
});
</script>
