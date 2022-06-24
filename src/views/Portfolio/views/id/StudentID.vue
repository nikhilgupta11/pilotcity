<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <Loading ref="loader" v-slot="{ loading }" class="my-id__content" :callback="processQuery">
      <div class="my-id__wrapper">
        <v-skeleton-loader
          :loading="loading"
          type="heading, list-item-two-line, list-item-two-line, list-item-three-line"
        >
          <div class="my-id__title mb-3">Student ID</div>

          <!-- Grade Level -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-select
              v-model="grade"
              :error-messages="errors"
              type="heading, list-item-two-line, list-item-two-line, list-item-three-line"
              :items="gradeLevel"
              label="Grade Level"
              outlined
            ></v-select>
          </validation-provider>

          <!-- Google Maps Integration to find school name / district so data coming in across the board is consistent -->
          <validation-provider v-slot="{ errors }" rules="required">
            <a-autocomplete
              v-model="school.name"
              :error-message="errors"
              placeholder="Search School name"
              type="school"
              style="margin-bottom: 25px"
              @val="setSchoolValue"
            />
          </validation-provider>

          <!-- School District -->
          <validation-provider v-slot="{ errors }" style="position: relative" rules="required">
            <a-autocomplete
              v-model="school.district"
              :error-message="errors"
              placeholder="Search School district"
              type="school_district"
              style="margin-bottom: 25px"
              @val="setDistrictValue"
            />
          </validation-provider>

          <!-- Birthdate -->

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
                  v-model="date"
                  :error-messages="errors"
                  label="Birthdate"
                  outlined
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </validation-provider>
            </template>
            <v-date-picker
              ref="picker"
              v-model="date"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>

          <!-- Supergender -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-select
              v-model="gender"
              :items="superGender"
              :error-messages="errors"
              label="Supergender"
              outlined
            ></v-select>
          </validation-provider>

          <!-- Ethnicity & Culture -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-select
              v-model="ethnicity"
              :items="ethnicityCulture"
              :error-messages="errors"
              multiple
              label="Ethnicity & Culture"
              outlined
            ></v-select>
          </validation-provider>

          <!-- Guardian Email -->

          <div class="d-flex flex-row my-id--position">
            <validation-provider v-slot="{ errors }" class="mr-2" rules="required|email">
              <v-text-field
                v-model="guardian.email"
                :error-messages="errors"
                label="Guardian Email"
                outlined
              >
              </v-text-field>
            </validation-provider>
            <Loading v-slot="{ loading: loadInvite, process }" :callback="sendInvite">
              <v-btn
                class="my-id__button--append"
                depressed
                outlined
                x-large
                :loading="loadInvite"
                @click="process"
                >Invite</v-btn
              >
            </Loading>
          </div>

          <!-- First Name -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="guardian.firstName"
              :error-messages="errors"
              label="Guardian First Name"
              outlined
            ></v-text-field>
          </validation-provider>

          <!-- Last Name -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="guardian.lastName"
              :error-messages="errors"
              label="Guardian Last Name"
              outlined
            ></v-text-field>
          </validation-provider>

          <!-- Relationship to Guardian -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-select
              v-model="guardian.relationship"
              :items="guardianRelationship"
              :error-messages="errors"
              label="Relationship to Guardian"
              outlined
            ></v-select>
          </validation-provider>

          <!-- Home Language -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-select
              v-model="home.language"
              :error-messages="errors"
              :items="homeLanguageOpts"
              multiple
              label="Home Language"
              outlined
            ></v-select>
          </validation-provider>

          <!-- Street Address -->
          <validation-provider v-slot="{ errors }" style="position: relative" rules="required">
            <a-autocomplete
              v-model="home.streetAddress"
              :error-message="errors"
              placeholder="Search Home Address"
              type="street"
              style="margin-bottom: 25px"
              @val="setStreetValue"
            />
          </validation-provider>

          <!-- City -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="home.city"
              :error-messages="errors"
              label="City"
              outlined
              disabled
              style="display: none"
            ></v-text-field>
          </validation-provider>

          <!-- State -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="home.state"
              :error-messages="errors"
              label="State"
              outlined
              disabled
              style="display: none"
            ></v-text-field>
          </validation-provider>

          <!-- Zipcode  -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="home.zipcode"
              v-mask="'#####'"
              :error-messages="errors"
              label="Zipcode"
              outlined
              maxlength="5"
              disabled
              style="display: none"
            ></v-text-field>
          </validation-provider>
        </v-skeleton-loader>

        <Loading v-slot="{ loading: saving, process: save }" :callback="save">
          <v-btn
            :disabled="invalid && emailSent"
            :loading="saving"
            :dark="!invalid"
            block
            large
            depressed
            @click="save"
            >Save</v-btn
          >
          <!-- <v-btn
            :disabled="invalid && emailSent"
            :loading="saving"
            :dark="!invalid"
            block
            large
            depressed
            @click="save && $router.push({ name: 'explore' })"
            >Save & Explore Programs</v-btn
          > -->
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

import { useUserGetters, useDbActions, useDbState } from '@/store';
import { ActionTypes } from '@/store/modules/db/actions';
import { GetterTypes } from '@/store/modules/auth/getters';
import { SendReferalInput, StudentPortfolio } from '@/generated/graphql';
import Loading from '@/components/Loading.vue';
import {
  GRADE_LEVEL,
  SUPER_GENDER,
  ETHNICITY,
  GUARDIAN,
  HOME_LANG,
  STATE
} from '@/constants/portfolio';
import { THIS_STUDENT } from '@/services/graphql/queries';
import { SEND_GUARDIAN_REFFERAL } from '@/services/graphql/mutations';
import { ObjectId } from 'bson';
import axios from 'axios';
import _ from 'lodash';
import AAutocomplete from '@/components/atoms/AAutocomplete.vue';

export default defineComponent({
  name: 'StudentID',
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
          defaultClient: { query, mutate }
        }
      }
    }
  ) {
    const { getObjectId } = useUserGetters([GetterTypes.getObjectId]);

    const search = ref('');
    const isSearchingSchool = ref(false);
    const isSearchingSchoolDistrict = ref(false);
    const isSearchingStreet = ref(false);
    const isEdit = ref(false);
    const formOpt = reactive({
      gradeLevel: GRADE_LEVEL,
      superGender: SUPER_GENDER,
      ethnicityCulture: ETHNICITY,
      guardianRelationship: GUARDIAN,
      homeLanguageOpts: HOME_LANG,
      stateOpts: STATE
    });
    // Interactions
    const menu = ref(false);

    // to be labeled
    const responses = reactive({
      school: {
        name: '',
        district: ''
      },
      guardian: {
        email: '',
        relationship: '',
        firstName: '',
        lastName: ''
      },
      home: {
        streetAddress: '',
        language: [],
        city: '',
        state: '',
        zipcode: ''
      },
      date: '',
      ethnicity: [],
      gender: '',
      grade: '',
      invited: false
    });

    function setSchoolValue(e) {
      if (e.target) {
        responses.school.name = e.target.value;
      } else if (e.name) {
        responses.school.name = `${e.name}, ${e.formatted_address}`;
      }
    }

    function setDistrictValue(e) {
      if (e.target) {
        responses.school.district = e.target.value;
      } else if (e.name) {
        responses.school.district = e.name;
      }
    }

    const loader: Ref<any> = ref(null);
    const emailSent = ref(false);

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
          responses.home.state = resp.data.data.result.address_components.find(
            itm => itm.types[0] === 'administrative_area_level_1'
          ).short_name;
          responses.home.zipcode = resp.data.data.result.address_components.find(
            itm => itm.types[0] === 'postal_code'
          ).long_name;
          responses.home.city = resp.data.data.result.address_components.find(
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
        responses.home.streetAddress = e.target.value;
      } else if (e.name) {
        responses.home.streetAddress = e.formatted_address;
        fetchPlaces(e);
      }
    }

    function processQuery() {
      return query<{ studentPortfolio: StudentPortfolio }>({
        query: THIS_STUDENT,
        variables: { id: getObjectId.value }
      }).then(({ data: { studentPortfolio: res } }) => {
        if (res)
          Object.keys(responses).forEach(key => {
            if (res[key]) responses[key] = res[key];
          });
      });
    }
    const { user } = useDbState(['user']);
    function sendInvite() {
      return mutate({
        mutation: SEND_GUARDIAN_REFFERAL,
        variables: {
          email: responses.guardian.email,
          id: getObjectId.value,
          name: `${user.value!.firstName} ${user.value!.lastName}`
        } as SendReferalInput
      }).then(() => {
        emailSent.value = true;
      });
    }
    const { update } = useDbActions([ActionTypes.update]);
    async function save() {
      await update({
        collection: 'StudentPortfolio',
        payload: {
          _id: getObjectId.value,
          school: responses.school,
          guardian: responses.guardian,
          home: responses.home,
          date: responses.date,
          ethnicity: responses.ethnicity,
          gender: responses.gender,
          grade: responses.grade,
          invited: responses.invited
        } as StudentPortfolio,
        filter: { _id: getObjectId.value },
        options: { upsert: true }
      });
      emit('input', 'Student');
    }
    onMounted(() => {
      loader.value!.process();
    });

    return {
      ...toRefs(formOpt),
      ...toRefs(responses),
      menu,
      setSchoolValue,
      setDistrictValue,
      setStreetValue,
      emit,
      save,
      processQuery,
      loader,
      sendInvite,
      emailSent,
      search,
      isSearchingSchool,
      isSearchingSchoolDistrict,
      isSearchingStreet,
      fetchPlaces,
      isEdit
    };
  }
});
</script>
<style lang="scss">
.my-id__wrapper {
  .v-input__append-outer {
    margin-left: 0 !important;
  }
}

.my-id--position {
  > span {
    width: 100%;
    .v-input {
      margin-right: 12px;
    }
  }
  button {
    &.my-id__button--append {
      margin-left: 9px !important;
      min-height: 56px !important;
      height: 56px !important;
    }
  }
}
</style>
