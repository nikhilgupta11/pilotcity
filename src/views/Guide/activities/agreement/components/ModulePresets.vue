<template>
  <v-container class="module-outcomes">
    <div class="module-outcomes__container">
      <v-row>
        <v-col cols="12" md="12">
          <v-file-input
            truncate-length="15"
            large
            outlined
            rounded
            prepend-icon=""
            :rules="[v => !!v || 'Employer agreement file is mandatory']"
            accept="application/pdf,application/vnd.ms-excel"
            label="Employer agreement file"
            placeholder="Select file"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea
            large
            outlined
            rounded
            :rules="[v => !!v || 'Instructions for signing agreement is mandatory']"
            label="Instructions for signing agreement"
            placeholder="Instructions"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="text-center">
          <v-btn
            rounded
            class="ma-2 pl-auto pr-auto font-weight-bold white--text"
            x-large
            depressed
            color="#ea6764"
            >Save</v-btn
          >
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from '@vue/composition-api';

export default {
  name: 'ModulePresets',
  setup() {
    return {};
  }
};
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
