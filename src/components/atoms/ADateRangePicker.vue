<template>
  <div>
    <v-menu
      ref="menu"
      :value="false"
      transition="scale-transition"
      :close-on-content-click="false"
      offset-y
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          v-model="dateRange"
          rounded
          label="Select Range"
          outlined
          readonly
          v-bind="attrs"
          v-on="on"
          @input="menu = false"
        ></v-text-field>
      </template>
      <v-date-picker ref="picker" v-model="dates" range></v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { computed, ref, watchEffect } from '@vue/composition-api';

export default {
  setup(props, ctx) {
    const dates = ref([]);
    const menu = ref(false);

    const dateRange = computed(() => {
      return dates.value.join(' ~ ');
    });

    watchEffect(() => {
      if (dates.value.length === 2) {
        ctx.emit('input', dates.value);
      }
    });

    return { dates, dateRange, menu };
  }
};
</script>
