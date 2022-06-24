<template>
  <ValidationObserver v-slot="{}" slim>
    <v-container class="module-edit">
      <div class="module-edit__container">
        <div class="presets__nopresets">No tweaking necessary</div>
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, PropType, computed } from '@vue/composition-api';
// import Instruct from './ModuleInstruct.vue';
import { group, required, deliverable, endEarly } from './const';
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
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    const index = programDoc.value.data.adks.findIndex(function findautoapplyobj(obj) {
      return obj.name === 'autoapply';
    });

    const presets = reactive({
      group,
      required,
      deliverable,
      endEarly
    });
    const initAutoapplyPresets = {
      defaultActivity: {
        groupActivity: 'Screening',
        requiredActivity: 'Yes',
        deliverableActivity: 'No',
        endEarlyActivity: 'Yes',
        required: false
      }
    };

    programDoc.value.data.adks[index] = {
      ...initAutoapplyPresets,
      ...programDoc.value.data.adks[index]
    };

    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    return {
      ...toRefs(presets),
      setupInstructions,
      programDoc,
      index
    };
  }
});
</script>

<style lang="scss">
.module-setup {
  &__buildscope {
    text-align: right;
    margin-bottom: 10px;
  }
}

.presets {
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
</style>
