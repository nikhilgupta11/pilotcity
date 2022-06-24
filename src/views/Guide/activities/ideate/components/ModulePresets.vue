/* eslint-disable prettier/prettier */
<template>
  <ValidationObserver v-slot="{}" slim>
    <v-container class="module-outcomes">
      <div class="module-outcomes__container">
        <!-- <v-divider class="presets__divider"></v-divider> -->
        <!-- <div class="presets__section-title">General</div> -->
        <!-- <div class="presets__nopresets">No tweaking necessary</div> -->
        <!-- <span class="presets__question-title">Set maximum number of characters (280 default)</span> -->

        <validation-provider v-slot="{ errors }" slim rules="numeric|required">
          <v-select
            v-model="programDoc.data.adks[index].maxCharacters"
            :items="maxCharacters"
            :error-messages="errors"
            outlined
            rounded
            x-large
            label="Maximum number of characters for each written answer"
          ></v-select>
          <div center class="module-setup__save-button">
            <v-btn
              :loading="loading"
              center
              class="mt-8 setup-adk-ideate"
              x-large
              rounded
              outlined
              depressed
              @click="process"
              >Save</v-btn
            >
          </div>
          <v-alert
            v-if="success || error"
            :color="success ? 'green' : 'red'"
            dense
            class="mt-3 white--text presets__alert"
            >{{ message }}</v-alert
          >
        </validation-provider>
        <!-- <div class="presets__nopresets">No tweaking necessary</div> -->
        <!-- <v-divider class="presets__divider"></v-divider>
        <div class="presets__section-title">Instructions</div>
        <Instruct v-model="setupInstructions" />
        <v-divider class="presets__divider"></v-divider>
        <div class="presets__section-title">Defaults</div>

        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-select
            v-model="adkData.defaultActivity.groupActivity"
            :error-messages="errors"
            :items="group"
            label="What activity group does this belong to?"
            outlined
            disabled
          ></v-select>
        </validation-provider>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-select
            v-model="adkData.defaultActivity.requiredActivity"
            :error-messages="errors"
            :items="required"
            label="Is this activity required for participants to complete?"
            outlined
            disabled
          ></v-select>
        </validation-provider> -->

        <!-- <v-select
        :items="lockOrder"
        label="Lock activity group and placement order?"
        outlined
      ></v-select> -->
        <!-- <validation-provider v-slot="{ errors }" slim rules="required">
          <v-select
            v-model="adkData.defaultActivity.deliverableActivity"
            :error-messages="errors"
            :items="deliverable"
            label="Is this a deliverable?"
            outlined
            disabled
          ></v-select>
        </validation-provider> -->
        <!-- <v-select
        :items="accessibility"
        label="Make this activity accessible to participants anytime?"
        outlined
      ></v-select> -->
        <!-- <validation-provider v-slot="{ errors }" slim rules="required">
          <v-select
            v-model="adkData.defaultActivity.endEarlyActivity"
            :error-messages="errors"
            :items="endEarly"
            label="Allow participants to end program early after completion of this activity?"
            outlined
            disabled
          ></v-select>
        </validation-provider> -->
        <!-- POST-ACTIVITY REFLECTION -->
        <!-- <v-text-field
        label="Post-Activity Reflection"
        placeholder="Now that you know the scope of the project, provide a summary of your interpretation."
        outlined
        hide-details
      ></v-text-field>
      <div class="presets__reflection">
        <v-btn class="presets__reflection-buttons" small depressed outlined>Save</v-btn>
        <v-btn class="presets__reflection-buttons" small depressed outlined>Preview</v-btn>
      </div> -->
        <!-- <v-divider class="presets__divider"></v-divider> -->
        <!-- If activity is required, show button below, make tooltip show up while disabled, right now tooltip doesn't show up -->
        <!-- <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red" disabled v-bind="attrs" v-on="on">Delete Activity</v-btn>
          </template>
          <span>Required activities cannot be deleted</span>
        </v-tooltip>
      </div> -->
        <!-- Delete break when the two delete buttons above and below have been integrated as one solution -->
        <!-- <br /> -->
        <!-- If activity is optional, show button below -->
        <!-- <div>
          <v-btn color="red" depressed disabled>Delete Activity</v-btn>
        </div> -->
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, toRefs, reactive, ref } from '@vue/composition-api';
import { loading, getModAdk, getModMongoDoc } from 'pcv4lib/src';
// import Instruct from './ModuleInstruct.vue';
import { group, required, deliverable, endEarly, maxCharacters } from './const';
import MongoDoc from './types';
// import gql from 'graphql-tag';

export default defineComponent({
  name: 'ModulePresets',
  components: {
    // Instruct
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    }
  },

  setup(props, ctx) {
    // const studentDocument = getModMongoDoc(props, ctx.emit, {}, 'studentDoc', 'inputStudentDoc');
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    const index = programDoc.value.data.adks.findIndex(obj => {
      if (obj) {
        return obj.name === 'ideate';
      }
      return false;
    });

    // // const presetsInstructions = ref({
    // //   description: '',
    // //   instructions: ['', '', '']
    // // });
    const initIdeatePresets = {
      maxCharacters: '280',
      defaultActivity: {
        groupActivity: 'Screening',
        requiredActivity: 'Yes',
        deliverableActivity: 'No',
        endEarlyActivity: 'Yes',
        required: false
      }
    };
    programDoc.value.data.adks[index] = {
      ...initIdeatePresets,
      ...programDoc.value.data.adks[index]
    };

    console.log(programDoc.value.data.adks[index]);
    const presets = reactive({
      group,
      required,
      deliverable,
      endEarly,
      maxCharacters
    });

    // function minuteCheck() {
    //   console.log(programDoc.data.adks[index].maxCharacters);
    // }

    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });

    // console.log(programDoc);
    // console.log(adkData.value.maxCharacters);

    function save() {
      console.log(programDoc.value.data.adks[index].maxCharacters);
      return new Promise((resolve, reject) => {
        programDoc.value.update();

        resolve(true);
      });
    }

    return {
      programDoc,
      ...loading(save, 'Success', 'Try again later'),
      ...toRefs(presets),
      setupInstructions,
      index,
      save
      // adkData
      // index
    };
  }
});
</script>

<style lang="scss">
.presets {
  &__alert {
    text-align: center;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }
  &__question-title {
    font-family: Raleway;
    font-size: 18px;
    font-weight: 700;
    line-height: 30px;
    // margin-top: 25px;
  }
  &__reflection-buttons {
    margin-right: 10px;
    margin-top: 10px;
  }

  &__reflection {
    // margin-left: auto;
  }

  &__divider {
    margin-top: 40px;
    margin-bottom: 40px;
  }

  &__section-title {
    color: #000000;
    font-size: 25px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 40px;
  }

  &__nopresets {
    border-radius: 5px;
    // border: 1px solid #dedede;
    height: 100px;
    text-align: center;
    background-color: #dedede;
    font-weight: 700;
    color: #ffffff;
    font-size: 18px;
    padding-top: 35px;
  }
}
.module-setup {
  &__save-button {
    display: flex;
    justify-content: center;
  }
}
</style>
