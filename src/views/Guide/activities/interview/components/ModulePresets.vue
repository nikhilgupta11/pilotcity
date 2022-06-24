<template>
  <v-container class="module-outcomes">
    <div class="module-outcomes__container">
      <v-select
        v-model="selectedTimePreset"
        :items="timePresetOptions"
        label="Timed preset unlocking"
        outlined
      ></v-select>
      <div class="presets__reflection justify-center d-flex">
        <v-btn
          :loading="loading"
          class="presets__reflection-buttons mt-8"
          x-large
          rounded
          depressed
          outlined
          @click="handleSave"
          >Save</v-btn
        >
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from '@vue/composition-api';
import { loading } from 'pcv4lib/src';
import { timePreset } from './const';
import MongoDoc from './types';

export default defineComponent({
  name: 'ModulePresets',

  props: {
    programDoc: {
      required: true,
      type: Object as PropType<MongoDoc>
    }
  },

  setup(props: any, ctx: any) {
    const programDocCollection = computed({
      get: () => props.programDoc,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    let index = programDocCollection.value.data.adks.findIndex(function findautoapplyobj(obj) {
      return obj.name === 'interview';
    });

    if (index === -1) {
      const initInterviewObject = {
        name: 'interview'
      };
      programDocCollection.value.data.adks.push(initInterviewObject);

      index = programDocCollection.value.data.adks.findIndex(function findautoapplyobj(obj) {
        return obj.name === 'interview';
      });
    }

    const selectedTimePreset = ref(
      programDocCollection.value.data?.adks[index]?.timedPresetDays ?? 0
    );

    const timePresetOptions = computed(() =>
      timePreset.map(time => {
        return {
          text: time === 1 ? `${time} day` : `${time} days`,
          value: time
        };
      })
    );

    const handleSave = async () => {
      programDocCollection.value.data.adks[index].timedPresetDays = selectedTimePreset.value;
      await programDocCollection.value.update();
    };

    return {
      selectedTimePreset,
      timePresetOptions,
      handleSave,
      ...loading(handleSave, 'Success', 'Try again later')
    };
  }
});
</script>

<style lang="scss">
.v-btn:not(.v-btn--round).v-size--default {
  max-width: fit-content;
}
.presets {
  &__add-video {
    border-radius: 5px;
    border: 1px dashed #dedede;
    width: 92%;
    margin: auto;
    text-align: center;
    border-radius: 25px;
  }

  &__question-video {
    background-color: #dedede;
    height: 300px;
    margin: 16px 24px;
    border-radius: 25px;
  }

  &__reflection-buttons {
    margin-right: 10px;
    margin-top: 10px;
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
