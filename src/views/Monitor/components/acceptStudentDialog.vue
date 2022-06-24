<template>
  <div slim>
    <!-- div instead of ValidationObserver for now -->
    <!-- going to need to make all these fields required -->
    <!-- BREAK -->
    <div class="question-title">What position title will you offer?</div>

    <validationProvider v-slot="{ errors }" rules="required">
      <v-radio-group
        v-model="newOffer.position"
        :error-messages="errors"
        :disabled="Boolean(customValueState.position)"
        @change="customStateSetter('position', $event === 'custom')"
      >
        <v-radio v-if="defaultOffer.intern" label="Intern" value="Intern"></v-radio>
        <v-radio v-if="defaultOffer.fellow" label="Fellow" value="Fellow"></v-radio>

        <v-radio
          v-if="defaultOffer.eir"
          label="Entrepreneur-in-Residence"
          value="Entrepreneur-in-Residence"
        ></v-radio>
        <v-radio v-if="defaultOffer.apprentice" label="Apprentice" value="Apprentice"> </v-radio>
        <v-radio
          v-if="defaultOffer.preApprentice"
          label="Pre-Apprentice"
          value="Pre-Apprentice"
        ></v-radio>
        <v-radio
          v-if="defaultOffer.preInternship"
          label="Pre-Internship"
          value="Pre-Internship"
        ></v-radio>
        <v-radio label="Enter a custom position title" value="custom"></v-radio>
      </v-radio-group>
    </validationProvider>
    <!-- TODO: validate this to be a string (optional) -->
    <ValidationProvider v-if="customState.position" v-slot="{ errors }" rules="required">
      <v-text-field
        v-model="newOffer.customPosition"
        :error-messages="errors"
        outlined
        rounded
        label="Enter a custom position title"
        prepend-inner-icon="mdi-subtitles-outline"
        @input="customValueSetter('position', $event !== '')"
      ></v-text-field>
    </ValidationProvider>

    <!-- BREAK -->
    <div class="question-title mt-10">What compensation will you offer?</div>

    <ValidationProvider v-slot="{ errors }" rules="required">
      <v-radio-group
        v-model="newOffer.compensation"
        :error-messages="errors"
        :disabled="customValueState.compensation"
        @change="customStateSetter('compensation', $event === 'custom')"
      >
        <v-radio
          v-if="defaultOffer.compensation1"
          label="$250 Stipend (+20% w/ PilotCity employer-of-record)"
          value="$250 Stipend"
        ></v-radio>
        <v-radio
          v-if="defaultOffer.compensation2"
          label="$350 Stipend (+20% w/ PilotCity employer-of-record)"
          value="$350 Stipend"
        ></v-radio>
        <v-radio
          v-if="defaultOffer.compensation3"
          label="$500 Stipend (+20% w/ PilotCity employer-of-record)"
          value="$500 Stipend"
        ></v-radio>
        <v-radio
          v-if="defaultOffer.compensation4"
          label="$595 Stipend (+20% w/ PilotCity employer-of-record, Recommended)"
          value="$595 Stipend"
        ></v-radio>
        <v-radio
          v-if="defaultOffer.compensation5"
          label="W2 Employee (Minimum wage or more)"
          value="W2 Employee (Minimum wage or more)"
        ></v-radio>
        <v-radio
          v-if="defaultOffer.compensation6"
          label="Unpaid ($0)"
          value="Unpaid ($0)"
        ></v-radio>
        <v-radio
          label="Offer custom compensation ($), arrangement or gift"
          value="custom"
        ></v-radio>
      </v-radio-group>
    </ValidationProvider>

    <!-- TODO: validate this to be a string (optional) -->
    <ValidationProvider v-if="customState.compensation" v-slot="{ errors }" rules="required">
      <v-text-field
        v-model="newOffer.customCompensation"
        :error-messages="errors"
        outlined
        rounded
        label="Enter custom amount ($) with unit (ie: $750 Stipend, $16 per hour, etc), arrangement or gift"
        prepend-inner-icon="mdi-currency-usd"
        append-icon="mdi-gift"
        @input="customValueSetter('compensation', $event !== '')"
      ></v-text-field>
    </ValidationProvider>

    <!-- BREAK -->
    <div class="question-title mt-10">What will be their internship project?</div>

    <ValidationProvider v-slot="{ errors }" rules="required">
      <v-radio-group
        v-model="newOffer.internshipProject"
        :error-messages="errors"
        :disabled="customValueState.internshipProject"
        @change="customStateSetter('internshipProject', $event === 'custom')"
      >
        <v-radio
          v-if="defaultOffer.internshipProject1"
          label="Your task will be to further prototype and pilot your pre-internship project and/or complete assigned tasks & projects"
          value="Your task will be to further prototype and pilot your pre-internship project and/or complete assigned tasks & projects"
        ></v-radio>
        <v-radio
          v-if="defaultOffer.internshipProject2"
          label="Your task will be to further prototype and pilot your pre-internship project"
          value="Your task will be to further prototype and pilot your pre-internship project"
        ></v-radio>
        <v-radio
          v-if="defaultOffer.internshipProject3"
          label="Your task will be to further prototype, pilot and/or productize your pre-internship project"
          value="Your task will be to further prototype, pilot and/or productize your pre-internship project"
        ></v-radio>
        <!-- <v-radio label="Enter custom project scope" value="custom"></v-radio> -->
      </v-radio-group>
    </ValidationProvider>
    <!-- <ValidationProvider v-if="customState.internshipProject" v-slot="{ errors }" rules="required">
      <v-text-field
        v-model="newOffer.customInternshipProject"
        :error-messages="errors"
        outlined
        rounded
        label="Enter a short description of the custom project scope"
        placeholder="Piloting pre-internship project and ..."
        prepend-inner-icon="mdi-pencil-ruler"
        @input="customValueSetter('internshipProject', $event !== '')"
      ></v-text-field>
    </ValidationProvider> -->

    <h2 class="d-flex justify-center mt-12 mb-8 font-weight-bold">Additional details</h2>
    <div class="acceptstudentdialog pa-12">
      <!-- BREAK -->
      <div class="question-title mt-10">Who will be the employer-of-record?</div>

      <!-- TODO: validate this to be a boolean (required) -->
      <ValidationProvider v-slot="{ errors }" rules="required">
        <v-radio-group v-model="newOffer.employerRecord" :error-messages="errors">
          <v-radio label="My organization will run payroll" :value="false"></v-radio>
          <v-radio label="PilotCity (20% admin fee from total budget)" :value="true"></v-radio>
        </v-radio-group>
      </ValidationProvider>

      <!-- BREAK -->
      <div class="question-title mt-10">Is there possibility of continuation or re-hire?</div>

      <!-- TODO: validate this to be a boolean (required) -->
      <ValidationProvider v-slot="{ errors }" rules="required">
        <v-radio-group v-model="newOffer.continuation" :error-messages="errors">
          <v-radio label="Yes (Recommended)" :value="true"></v-radio>
          <v-radio label="No" :value="false"></v-radio>
        </v-radio-group>
      </ValidationProvider>

      <!-- BREAK -->
      <div class="question-title mt-10">
        Is a driver's license, car or transport to workplace required?
      </div>

      <!-- TODO: validate this to be a boolean (required) -->
      <ValidationProvider v-slot="{ errors }" rules="required">
        <v-radio-group v-model="newOffer.licenseRequirement" :error-messages="errors">
          <v-radio label="No (Recommended for digital internship)" :value="false"></v-radio>
          <v-radio label="Yes" :value="true"></v-radio>
        </v-radio-group>
      </ValidationProvider>

      <!-- BREAK -->
      <div class="question-title mt-10">When is the internship start & deadline date?</div>

      <v-row class="d-flex">
        <v-col class="mt-3">
          <v-dialog
            ref="dialog"
            v-model="modal1"
            :return-value.sync="date1"
            persistent
            width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="newOffer.internshipStart"
                disabled
                rounded
                outlined
                label="Start Date"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="newOffer.internshipStart" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal1 = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="modal1 = false"> OK </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>

        <!-- TODO: validate this to be a date (required) -->
        <v-col class="mt-3">
          <v-dialog
            ref="dialog"
            v-model="modal2"
            :return-value.sync="date2"
            persistent
            width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="newOffer.internshipEnd"
                outlined
                rounded
                label="Deadline Date"
                append-icon="mdi-calendar"
                readonly
                disabled
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="newOffer.internshipEnd" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal2 = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="modal2 = false"> OK </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>

      <div class="question-title mt-10">What are the minimum & maximum total work hours?</div>
      <v-row class="d-flex mt-3">
        <!-- TODO: validate this to be a number (required) -->
        <v-col>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-select
              v-model="newOffer.minHours"
              :error-messages="errors"
              :items="minHours"
              label="Minimum hours"
              outlined
              disabled
              rounded
            ></v-select>
          </ValidationProvider>
        </v-col>
        <!-- TODO: validate this to be a number (required) -->
        <v-col>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-select
              v-model="newOffer.maxHours"
              :error-messages="errors"
              :items="maxHours"
              label="Maximum hours"
              outlined
              disabled
              rounded
            ></v-select>
          </ValidationProvider>
        </v-col>
      </v-row>

      <!-- BREAK -->
      <div class="question-title mt-10">
        When is the last date for the student to accept their offer?
      </div>

      <!-- TODO: validate this to be a date (required) -->
      <v-col class="mt-6 pa-0">
        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent>
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="newOffer.acceptanceDeadline"
              outlined
              rounded
              class=""
              disabled
              label="Acceptance deadline"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="newOffer.acceptanceDeadline" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.update(date)"> OK </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, ref, set } from '@vue/composition-api';
import { minHours, maxHours } from './const';

export default defineComponent({
  name: 'AcceptStudentDialog',
  props: {
    value: {
      type: Object,
      required: true
    },
    defaultOffer: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const newOffer = computed<Record<string, any>>({
      get: () => props.value,
      set: newValue => ctx.emit('input-value', newValue)
    });
    newOffer.value.licenseRequirement = Boolean(props.defaultOffer.licenseRequirement);
    newOffer.value.internshipStart = props.defaultOffer.internshipStart;
    newOffer.value.internshipEnd = props.defaultOffer.internshipEnd;
    newOffer.value.minHours = Number(props.defaultOffer.minHours);
    newOffer.value.maxHours = Number(props.defaultOffer.maxHours);
    newOffer.value.employerRecord = Boolean(props.defaultOffer.employerRecord);
    newOffer.value.acceptanceDeadline = props.defaultOffer.acceptanceDeadline;
    newOffer.value.continuation = Boolean(props.defaultOffer.continuation);

    const customState = reactive({
      internshipProject: false,
      position: false,
      compensation: false
    });

    const customValueState = reactive({
      internshipProject: false,
      position: false,
      compensation: false
    });

    const consts = reactive({
      minHours,
      maxHours
    });

    const date = ref('');
    const modal = ref('');
    const date1 = ref('');
    const modal1 = ref('');
    const date2 = ref('');
    const modal2 = ref('');

    function customStateSetter(key: string, value: boolean) {
      set(customState, key, value);
    }

    function customValueSetter(key: string, value: boolean) {
      set(customValueState, key, value);
    }

    return {
      newOffer,
      ...toRefs(consts),
      customState,
      customStateSetter,
      customValueState,
      customValueSetter,
      date,
      modal,
      date1,
      modal1,
      date2,
      modal2
    };
  }
});
</script>

<style scoped>
.acceptstudentdialog {
  border-radius: 25px;
  border: 1px dashed #dedede;
}
.question-title {
  font-weight: bold;
}
</style>
