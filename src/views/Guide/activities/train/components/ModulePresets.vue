<template>
  <ValidationObserver v-slot="{}" slim>
    <v-container class="module-outcomes">
      <div class="module-outcomes__container">
        <div class="presets__nopresets">No tweaking necessary</div>
        <!--<v-select
          v-model="programDoc.data.adks[index].is_deadline"
          :items="deadlineData"
          item-value="value"
          item-text="text"
          outlined
          rounded
          label="Deadline"
        ></v-select>

        <v-select
          v-model="typeTime"
          :items="type"
          item-value="value"
          item-text="text"
          outlined
          rounded
          label="Type"
        ></v-select>        

        <v-select
          v-if="typeTime == 'days'"
          v-model="programDoc.data.adks[index].daysLimit"
          :items="daysItems"
          outlined
          rounded
          label="Number of days taken"
        ></v-select>

        <v-select
          v-if="typeTime == 'hours'"
          v-model="programDoc.data.adks[index].hoursLimit"
          :items="hoursItems"
          outlined
          rounded
          label="Hours"
        ></v-select>

        <v-select
          v-if="typeTime == 'minutes'"
          v-model="programDoc.data.adks[index].minutesLimit"
          :items="hoursItems"
          outlined
          rounded
          label="Minutes"
        ></v-select>        

        <div class="text-center">
          <v-btn
            class="mt-8"
            :loading="loading"
            x-large
            rounded
            outlined
            depressed
            @click="save()"
          >
            Save
          </v-btn>
        </div>
        <v-alert
          v-if="errormsg || successmsg"
          :color="successmsg ? 'green' : 'red'"
          dense
          class="mt-3 white--text presets__alert"
          >{{ errormsg.length > 0 ? errormsg : successmsg }}</v-alert
        > -->
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, computed } from '@vue/composition-api';
// import Instruct from './ModuleInstruct.vue';
import {
  group,
  required,
  lockOrder,
  deliverable,
  notifications,
  accessibility,
  endEarly
} from './const';
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
      type: Object as () => MongoDoc
    }
  },
  setup(props, ctx) {
    const errormsg = ref('');
    const successmsg = ref('');
    // const typeTime = ref('');

    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    const index = programDoc.value.data.adks.findIndex(obj => obj.name === 'train');

    const initTrainPresets = {
      defaultActivity: {
        groupActivity: 'Project',
        requiredActivity: 'Yes',
        deliverableActivity: 'No',
        endEarlyActivity: 'No',
        required: false
      }
    };

    programDoc.value.data.adks[index] = {
      ...initTrainPresets,
      ...programDoc.value.data.adks[index]
    };

    /* if(!programDoc.value.data.adks[index].hasOwnProperty('is_deadline')){
      programDoc.value.data.adks[index].daysLimit = false;
    }    
    
    if(!programDoc.value.data.adks[index].hasOwnProperty('daysLimit')){
      programDoc.value.data.adks[index].daysLimit = null;
    }

    if(!programDoc.value.data.adks[index].hasOwnProperty('hoursLimit')){
      programDoc.value.data.adks[index].hoursLimit = null;
    }

    if(!programDoc.value.data.adks[index].hasOwnProperty('minutesLimit')){
      programDoc.value.data.adks[index].minutesLimit = null;
    }

    if(!programDoc.value.data.adks[index].hasOwnProperty('type_time')){
      programDoc.value.data.adks[index].type_time = null;
    }
    else if (programDoc.value.data.adks[index].hasOwnProperty('type_time')) {
      typeTime.value = programDoc.value.data.adks[index].type_time;
    } */

    const loading = ref(false);
    async function save() {
      loading.value = true;
      try {
        /* if(typeTime.value == 'days'){
          programDoc.value.data.adks[index].hoursLimit = null;
          programDoc.value.data.adks[index].minutesLimit = null;

        }
        else if(typeTime.value == 'hours') {
          programDoc.value.data.adks[index].minutesLimit = null;
          programDoc.value.data.adks[index].daysLimit = null;
        }
        else if(typeTime.value == 'minutes') {
          programDoc.value.data.adks[index].daysLimit = null;
          programDoc.value.data.adks[index].hoursLimit = null;

        }

        programDoc.value.data.adks[index].type_time = typeTime.value; */
        await programDoc.value.update();
        successmsg.value = 'Saved';
      } catch (err) {
        errormsg.value = 'Could not save';
      }
      loading.value = false;
    }
    const presets = reactive({
      group,
      required,
      lockOrder,
      deliverable,
      notifications,
      accessibility,
      endEarly
    });

    // const daysItems = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    // const hoursItems = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    // const minutesItems = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60];
    /* const deadlineData = [
      {value: true, text: 'Yes'},
      {value: false, text: 'No'}
    ];
    const type = [
      { value: 'days', text:'Days'},
      { value: 'hours', text:'Hours'},
      { value: 'minutes', text:'Minutes'},
    ]; */
    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    return {
      ...toRefs(presets),
      setupInstructions,
      loading,
      save,
      errormsg,
      successmsg,
      index,
      /* type,
      hoursItems,
      deadlineData, 
      minutesItems,
      daysItems, */
      programDoc
    };
  }
});
</script>

<style lang="scss">
.presets {
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
</style>
