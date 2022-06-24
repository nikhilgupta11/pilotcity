<template>
  <v-data-table
    :headers="header"
    :items="tableContents"
    sort-by="resource"
    :items-per-page="100"
    :hide-default-footer="true"
  >
    <template #item.complete="{ item }">
      <!-- <ValidationProvider v-slot="{ errors }" rules="required">
          <v-checkbox
            v-model="item.complete"
            v-ripple
            :error-messages="errors"
            :disabled="disabled"
            :readonly="userType === 'stakeholder'"
          >
          </v-checkbox>
          {{ errors }}
        </ValidationProvider> -->
      <ValidationProvider
        v-slot="{ errors }"
        type="checkbox"
        :rules="{ required: { allowFalse: false } }"
      >
        <v-row class="mx-auto">
          <v-checkbox
            v-model="item.complete"
            :error="!!errors.length"
            :disabled="disabled"
            @change="
              $emit(
                'validation-event',
                tableContents.some(item => !item.complete)
              )
            "
          />

          <span class="pt-4 error--text">{{ errors.length ? '*' : '' }}</span>
        </v-row>
      </ValidationProvider>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from '@vue/composition-api';
import { ValidationProvider } from 'vee-validate';
import { HEADER } from './const';
import MongoDoc from './types';

export default defineComponent({
  name: 'TableView',
  components: {
    ValidationProvider
  },
  props: {
    value: {
      required: false,
      type: Object as PropType<MongoDoc>,
      default: () => {}
    },
    studentDoc: {
      required: true,
      type: Object as () => MongoDoc
    },
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    }
  },

  setup(props) {
    // props
    const observer = ref(null);
    const adkData = computed(() => props.studentDoc.data.adks.find(adk => adk.name === 'offer'));
    const disabled = computed(
      () => !!(adkData.value?.completed || props.userType === 'stakeholder')
    );
    const offerDetails = computed(() => props.studentDoc.data.offerDetails);

    const tableContents = ref(
      [
        {
          terms: 'Position Title',
          questionaries: `I acknowledge my position title will be: ${offerDetails.value.position}`
        },

        {
          terms: 'Compensation',
          questionaries: `I acknowledge I will receive the following compensation, custom arrangement or gift: ${offerDetails.value.compensation} `
        },

        {
          terms: 'Minimum Hours',
          questionaries: `I acknowledge I will work minimum: ${offerDetails.value.minHours} hours`
        },
        {
          terms: 'Maximum Hours',
          questionaries: `I acknowledge I will work maximum: ${offerDetails.value.maxHours} hours`
        },

        {
          terms: 'Start Date',
          questionaries: `I acknowledge the start date will be: ${offerDetails.value.internshipStart}`
        },
        {
          terms: 'Deadline Date',
          questionaries: `I acknowledge the deadline for my work will be: ${offerDetails.value.internshipEnd}`
        },

        {
          terms: 'Internship Project',
          questionaries: `${offerDetails.value.internshipProject}`
        },

        {
          terms: 'Continuation Possibility',
          questionaries: `I acknowledge there will ${
            offerDetails.value.continuation ? '' : 'not'
          } be a continuation or re-hire possibility`
        },

        {
          terms: 'Drivers License / Car',
          questionaries: `I acknowledge a drivers license is ${
            offerDetails.value.licenseRequirement ? '' : 'not'
          } required `
        },

        {
          terms: 'Employer-of-Record',
          questionaries: `I acknowledge PilotCity will ${
            offerDetails.value.employerRecord ? '' : 'not'
          } be the employer-of-record`
        }
      ].map(value => ({ ...value, complete: !!adkData?.value?.offerStatus }))
    );
    // const { adkData } = getModAdk(props, ctx.emit, 'offer', {});

    const checkedAllTerms = computed(() => tableContents.value.every((obj: any) => obj.complete));

    return {
      header: ref(HEADER),
      tableContents,
      checkedAllTerms,
      disabled,
      observer,
      offerDetails
    };
  }
});
</script>

<style lang="scss">
.check-box {
  display: flex;
  margin-left: 100px;
}
</style>
