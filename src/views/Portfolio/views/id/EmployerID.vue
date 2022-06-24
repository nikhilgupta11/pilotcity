<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <Loading ref="loader" v-slot="{ loading }" class="my-id__content" :callback="processQuery">
      <div class="my-id__wrapper">
        <v-skeleton-loader
          :loading="loading"
          type="heading, list-item-two-line, list-item-two-line, list-item-three-line"
        >
          <div class="my-id__title mb-3">Employer ID</div>

          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="employerName"
              :error-messages="errors"
              label="Company / Organization"
              outlined
            ></v-text-field>
          </validation-provider>

          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="jobTitle"
              :error-messages="errors"
              label="Job Title"
              outlined
            ></v-text-field>
          </validation-provider>

          <validation-provider v-slot="{ errors }" rules="required">
            <v-textarea
              v-model="industry"
              :error-messages="errors"
              label="Describe your industry"
              outlined
              auto-grow
            ></v-textarea>
          </validation-provider>

          <validation-provider v-slot="{ errors }" rules="required">
            <v-textarea
              v-model="primaryProduct"
              :error-messages="errors"
              label="Describe your primary product or service"
              outlined
              auto-grow
            ></v-textarea>
          </validation-provider>

          <!-- Street Address -->
          <validation-provider v-slot="{ errors }" style="position: relative" rules="required">
            <a-autocomplete
              v-model="work.streetAddress"
              :error-message="errors"
              placeholder="Search Employer Address"
              type="street"
              style="margin-bottom: 25px"
              @val="setStreetValue"
            />
          </validation-provider>

          <!-- City -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="work.city"
              :error-messages="errors"
              label="City"
              disabled
              outlined
              style="display: none"
            ></v-text-field>
          </validation-provider>

          <!-- State -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-select
              v-model="work.state"
              :error-messages="errors"
              :items="stateOpts"
              label="State"
              disabled
              outlined
              style="display: none"
            ></v-select>
          </validation-provider>

          <!-- Zipcode  -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="work.zipcode"
              v-mask="'#####'"
              :error-messages="errors"
              label="Zipcode"
              outlined
              disabled
              maxlength="5"
              style="display: none"
            ></v-text-field>
          </validation-provider>
        </v-skeleton-loader>

        <Loading v-slot="{ loading: saving, process: save }" :callback="save">
          <v-btn
            :disabled="invalid"
            :loading="saving"
            :dark="!invalid"
            large
            block
            depressed
            @click="save"
          >
            Save
          </v-btn>
        </Loading>
      </div>
    </Loading>
  </ValidationObserver>
</template>

<script lang="ts">
import {
  Ref,
  reactive,
  toRefs,
  ref,
  onMounted,
  defineComponent,
  watch,
  computed
} from '@vue/composition-api';

import { useUserGetters, useDbActions } from '@/store';
import { ActionTypes } from '@/store/modules/db/actions';
import { GetterTypes } from '@/store/modules/auth/getters';
import { EmployerPortfolio } from '@/generated/graphql';
import Loading from '@/components/Loading.vue';
import { STATE } from '@/constants/portfolio';
import { ObjectId } from 'bson';
import { THIS_EMPLOYER } from '@/services/graphql/queries';
import axios from 'axios';
import _ from 'lodash';
import AAutocomplete from '@/components/atoms/AAutocomplete.vue';

export default defineComponent({
  name: 'EmployerID',

  components: {
    Loading,
    AAutocomplete
  },

  setup(
    _props,
    {
      emit,
      root: {
        $apolloProvider: {
          defaultClient: { query }
        }
      }
    }
  ) {
    const { getObjectId } = useUserGetters([GetterTypes.getObjectId]);
    const search = ref('');
    const streetSearch = ref('');
    const streetList = ref([{ id: 1, name: 'select' }]);
    const isSearchingStreet = ref(false);
    const selectedStreet = reactive({
      id: 1,
      name: ''
    });
    const formOpt = reactive({
      stateOpts: STATE
    });
    const employer = reactive({
      employerName: '',
      jobTitle: '',
      industry: '',
      primaryProduct: '',
      work: {
        streetAddress: '',
        city: '',
        state: '',
        zipcode: ''
      }
    });

    const loader: Ref<any> = ref(null);

    async function fetchPlaces(val) {
      try {
        isSearchingStreet.value = true;
        const resp = await axios.get(process.env.VUE_APP_GOOGLE_PLACES_DETAILS, {
          params: {
            place_id: val.place_id
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (resp.data.data.result && resp.data.data.result.address_components) {
          employer.work.state = resp.data.data.result.address_components.find(
            itm => itm.types[0] === 'administrative_area_level_1'
          ).short_name;
          employer.work.zipcode = resp.data.data.result.address_components.find(
            itm => itm.types[0] === 'postal_code'
          ).long_name;
          employer.work.city = resp.data.data.result.address_components.find(
            itm => itm.types[0] === 'locality'
          ).long_name;
        }
        isSearchingStreet.value = false;
      } catch (err) {
        console.log(err);
        isSearchingStreet.value = false;
      }
    }

    function setStreetValue(e) {
      if (e.target) {
        employer.work.streetAddress = e.target.value;
      } else if (e.name) {
        employer.work.streetAddress = e.name;
        fetchPlaces(e);
      }
    }

    onMounted(() => {
      loader.value!.process();
    });

    function processQuery() {
      return query<{ employerPortfolio: EmployerPortfolio }>({
        query: THIS_EMPLOYER,
        variables: { id: getObjectId.value }
      }).then(({ data: { employerPortfolio: res } }) => {
        if (res)
          Object.keys(employer).forEach(key => {
            if (res[key]) employer[key] = res[key];
          });
      });
    }

    const { update } = useDbActions([ActionTypes.update]);

    async function save() {
      await update({
        collection: 'EmployerPortfolio',
        payload: {
          _id: getObjectId.value,
          employerName: employer.employerName,
          jobTitle: employer.jobTitle,
          industry: employer.industry,
          primaryProduct: employer.primaryProduct,
          work: employer.work
        } as EmployerPortfolio,
        filter: { _id: getObjectId.value },
        options: { upsert: true }
      });
      emit('input', 'Employer');
    }

    return {
      ...toRefs(formOpt),
      ...toRefs(employer),
      save,
      processQuery,
      loader,
      streetList,
      isSearchingStreet,
      selectedStreet,
      fetchPlaces,
      setStreetValue,
      streetSearch
    };
  }
});
</script>
