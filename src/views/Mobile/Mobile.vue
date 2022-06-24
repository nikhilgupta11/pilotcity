<template>
  <div class="profile__container pc-container pt-12">
    <Loading v-slot="{ loading }" :process-now="true" :callback="loadData">
      <v-skeleton-loader
        :loading="loading"
        type="heading, list-item-two-line, list-item-two-line, list-item-three-line"
      >
        <v-container class="pa-0 ma-0">
          <!-- Your Tokens: {{ tokensAvailable }} -->
          <div><Profile :size="100" /></div>
          <!-- <div class="d-flex flex-row align-center justify-center">
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
                @click="sponsor"
              >
                <v-icon left>mdi-trophy</v-icon>Sponsor
              </v-btn>
            </div>
          </div> -->

          <v-card flat>
            <div class="headline d-flex justify-center font-weight-bold mt-12 mb-6">
              Sponsor Participants1
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
import { defineComponent, reactive, ref, toRefs } from '@vue/composition-api';
import { ObjectId } from 'bson';
import { useUserGetters, useDbGetters } from '@/store';
import Loading from '@/components/Loading.vue';
import Profile from '@/components/Profile.vue';

export default defineComponent({
  name: 'ApproveSponsor',
  components: {
    Loading,
    Profile
  },
  setup() {
    const state = reactive<{
      sponsorRequests: Array<{
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
      tokensAvailable: number;
    }>({
      sponsorRequests: [],
      tokensAvailable: 0
    });

    const sponsorRequestHeaders = [
      { text: 'Program', value: 'programName', width: '20%' },
      { text: 'City', value: 'city', width: '15%' },
      { text: 'School', value: 'school', width: '15%' },
      { text: 'Culture', value: 'ethnicityCulture', width: '20%' },
      { text: 'Is unpaid ok?', value: 'rewards', width: '12%' },
      { text: 'Conditions', value: 'qualifications', width: '20%' }
    ];
    const searchText = ref('');
    const selectedRequests = ref([]);
    const testf = ref({});
    const sponsorLoading = ref(false);

    const { collection } = useDbGetters(['collection']);
    const { getUser, getObjectId } = useUserGetters(['getUser', 'getObjectId']);
    async function loadData() {
      async function resolveSponsorRequests() {
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
      }
      async function resolveTokens() {
        state.tokensAvailable =
          (await collection.value!('Tokens').count({
            newOwner_id: getObjectId.value
          })) || 0;
      }
      await Promise.all([resolveSponsorRequests(), resolveTokens()]);
    }

    async function sponsor() {
      sponsorLoading.value = true;
      const sponsorRequestId = selectedRequests.value[0].id;
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
    }

    return {
      ...toRefs(state),
      sponsorRequestHeaders,
      searchText,
      selectedRequests,
      sponsor,
      sponsorLoading,
      loadData
    };
  }
});
</script>
