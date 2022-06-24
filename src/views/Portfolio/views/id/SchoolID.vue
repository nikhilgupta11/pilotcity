<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <Loading ref="loader" v-slot="{ loading }" class="my-id__content" :callback="processQuery">
      <div class="my-id__wrapper">
        <v-skeleton-loader
          :loading="loading"
          type="heading, list-item-two-line, list-item-two-line, list-item-three-line"
        >
          <div class="my-id__title mb-3">School ID</div>

          <!-- Staff Type-->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-select
              v-model="staffType"
              :items="schoolrole"
              :error-messages="errors"
              multiple
              label="Staff Type"
              outlined
            ></v-select>
          </validation-provider>

          <!-- School District -->

          <v-text-field
            v-model="position"
            label="Position Title"
            placeholder="If Not Listed Above"
            outlined
          ></v-text-field>

          <!-- School District -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="schoolDistrict"
              :error-messages="errors"
              label="School or School District"
              outlined
            ></v-text-field>
          </validation-provider>

          <!-- Street Address -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="district.streetAddress"
              :error-messages="errors"
              label="School or School District Address"
              outlined
            ></v-text-field>
          </validation-provider>

          <!-- City -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="district.city"
              :error-messages="errors"
              label="City"
              outlined
            ></v-text-field>
          </validation-provider>

          <!-- State -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-select
              v-model="district.state"
              :error-messages="errors"
              :items="stateOpts"
              label="State"
              outlined
            ></v-select>
          </validation-provider>

          <!-- Zipcode  -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="district.zipcode"
              v-mask="'#####'"
              :error-messages="errors"
              label="Zipcode"
              outlined
              maxlength="5"
            ></v-text-field>
          </validation-provider>

          <!-- Request Stakeholder Access -->
          <!-- <div class="d-flex flex-row">
            <validation-provider v-slot="{ errors }" rules="required|email">
              <v-text-field
                v-model="stakeholderAccess"
                :error-messages="errors"
                label="Request Stakeholder Access"
                placeholder="stakeholder@email.com"
                outlined
              ></v-text-field>
            </validation-provider>
            <v-btn class="mb-7 my-id__button--append" depressed outlined x-large>Request</v-btn>
          </div> -->

          <!-- Refer Stakeholder -->
          <!-- <div class="d-flex flex-row">
            <validation-provider v-slot="{ errors }" rules="required|email">
              <v-text-field
                v-model="stakeholder"
                :error-messages="errors"
                label="Request Stakeholder"
                placeholder="skakeholder@email.com"
                outlined
              ></v-text-field>
            </validation-provider>
            <v-btn class="mb-7 my-id__button--append" depressed outlined x-large>Refer</v-btn>
          </div> -->
        </v-skeleton-loader>

        <Loading v-slot="{ loading: saving, process: save }" :callback="save">
          <v-btn
            :disabled="invalid"
            :loading="saving"
            :dark="!invalid"
            block
            large
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
import { reactive, toRefs, ref, Ref, onMounted, defineComponent } from '@vue/composition-api';
import { useUserGetters, useDbActions } from '@/store';
import { ActionTypes } from '@/store/modules/db/actions';
import { GetterTypes } from '@/store/modules/auth/getters';
import { SchoolPortfolio } from '@/generated/graphql';
import { ObjectId } from 'bson';
import Loading from '@/components/Loading.vue';
import { SCHOOL_ROLE, STATE } from '@/constants/portfolio';
import { THIS_SCHOOL } from '@/services/graphql/queries';

export default defineComponent({
  name: 'SchoolID',
  components: {
    Loading
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
    const schoolStaffType = reactive({ schoolrole: SCHOOL_ROLE, stateOpts: STATE });
    const details = reactive({
      staffType: [],
      position: '',
      schoolDistrict: '',
      district: {
        streetAddress: '',
        city: '',
        state: '',
        zipcode: ''
      }
    });
    const { getObjectId } = useUserGetters([GetterTypes.getObjectId]);
    const loader: Ref<any> = ref(null);

    onMounted(() => {
      loader.value!.process();
    });

    function processQuery() {
      return query({
        query: THIS_SCHOOL,
        variables: { id: getObjectId.value }
      }).then(({ data: { schoolPortfolio: res } }) => {
        if (res)
          Object.keys(details).forEach(key => {
            if (res[key]) details[key] = res[key];
          });
      });
    }

    const { update } = useDbActions([ActionTypes.update]);

    async function save() {
      await update({
        collection: 'SchoolPortfolio',
        payload: {
          _id: getObjectId.value,
          staffType: details.staffType,
          position: details.position,
          schoolDistrict: details.schoolDistrict,
          district: details.district
        } as SchoolPortfolio,
        filter: { _id: getObjectId.value },
        options: { upsert: true }
      });
      emit('input', 'School');
    }

    return { save, ...toRefs(schoolStaffType), ...toRefs(details), processQuery, loader };
  }
});
</script>
