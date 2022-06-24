<template>
  <div>
    <v-dialog
      v-model="showDialog"
      :max-width="$vuetify.breakpoint.xs ? '100%' : '60%'"
      transition="dialog-bottom-transition"
    >
      <template #activator="{ on, attrs }">
        <v-btn :disabled="readonly" v-bind="attrs" x-small outlined v-on="on"
          ><v-icon small left>mdi-magnify</v-icon>View</v-btn
        >
      </template>

      <v-card>
        <v-card-title>
          <div class="d-flex justify-end align-end flex-column">
            <v-btn :disabled="readonly" icon large color="primary" @click="showDialog = false">
              <v-icon large>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-carousel :show-arrows="images.length > 1" hide-delimiter-background>
          <v-carousel-item v-for="image in images" :key="image.name">
            <v-img :src="image.url" contain max-height="500" />
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { ref, PropType, inject } from '@vue/composition-api';
import { Image } from './types';

export default {
  name: 'ProofPreview',

  props: {
    images: {
      type: Array as PropType<Image[]>,
      required: true
    }
  },
  setup() {
    const readonly = inject('readonly', false);
    const showDialog = ref(false);
    return {
      showDialog,
      readonly
    };
  }
};
</script>
