<template>
  <div class="pa-0">
    <v-data-table
      :headers="header"
      :items="items"
      sort-by="resource"
      :items-per-page="100"
      :hide-default-footer="true"
      class="module-default__data-table"
    >
      <template #item.group="{ item }">
        <v-chip depressed dark small :color="getColor(item.group)" :ripple="false">{{
          item.group
        }}</v-chip>
      </template>

      <template #item.type="{ item }">
        <v-chip depressed outlined dark small :color="getColor(item.type)" :ripple="false">{{
          item.type
        }}</v-chip>
      </template>

      <template #item.status>
        <v-icon color="green" dark>mdi-lock-open-check</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, PropType } from '@vue/composition-api';
import { items, HEADER } from './const';
import { Timeline } from './types';

export default defineComponent({
  name: 'TableView',
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    PageValue: {
      required: true,
      type: Number
    },
    timeline: {
      required: true,
      type: Array as PropType<Timeline[]>
    },
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    }
  },

  setup(props, ctx) {
    const PageValueNumber = computed({
      get: () => props.PageValue,
      set: newPage => {
        ctx.emit('input:PageValueIndex', newPage);
      }
    });

    const pageindex = ref();

    function pageSelection(index: number) {
      PageValueNumber.value = index;
      console.log(index);
      console.log(PageValueNumber.value);
    }

    function getColor(group: any) {
      if (group === 'Onboard') {
        return 'green';
      }
      if (group === 'Research') {
        return 'red';
      }
      if (group === 'Design') {
        return 'blue';
      }
      if (group === 'Prototype') {
        return 'orange';
      }
      if (group === 'Activity') {
        return 'pink';
      }
      if (group === 'Deliverable') {
        return 'purple';
      }
      return 'Null';
    }

    return { header: ref(HEADER), items, pageSelection, pageindex, getColor };
  }
});
</script>
<style lang="scss">
.module-default {
  &__data-table {
    width: 100%;
  }
}
</style>
