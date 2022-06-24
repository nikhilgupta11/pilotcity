<template>
  <div class="tableview__column mt-12">
    <v-btn
      :disabled="readonly"
      :dark="filter === 'Personal' ? true : false"
      :outlined="filter !== 'Personal' ? true : false"
      x-small
      depressed
      class="mr-1 mb-6 mt-6"
      v-bind:style="{
        width: $vuetify.breakpoint.xs ? 'auto !important' : ' ',
        right: $vuetify.breakpoint.xs ? '4px !important' : ' '
      }"
      @click="filter = 'Personal'"
      >Personal</v-btn
    >
    <v-btn
      :disabled="readonly"
      :dark="filter === 'Team' ? true : false"
      :outlined="filter !== 'Team' ? true : false"
      class="ml-1 mb-6 mt-6"
      v-bind:style="{ width: $vuetify.breakpoint.xs ? 'auto !important' : ' ' }"
      x-small
      depressed
      @click="filter = 'Team'"
      >Team</v-btn
    >
    <v-data-table
      :headers="header"
      :items="tableItems"
      :class="'make-data-table'"
      :items-per-page="100"
      :hide-default-footer="true"
      sort-by="resource"
    >
      <template #item.avatar="{ item }">
        <v-avatar size="30" color="grey lighten-2"><v-img :src="item.avatar" /></v-avatar>
      </template>
      <template #item.proof="{ item }">
        <ProofPreview :images="item.proof" />
      </template>
      <template #item.time="{ item }">
        <span>{{ formatDate(item.time) }}</span>
      </template>
      <template #item.delete="{ item }">
        <v-btn
          v-if="item.author.equals(userId)"
          :disabled="userType === 'stakeholder' || readonly"
          small
          icon
          depressed
          @click="$emit('removeMilestone', item.id)"
          ><v-icon class="delete-icon" color="red"> mdi-delete </v-icon></v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import { ref, PropType, computed, defineComponent, inject } from '@vue/composition-api';
import { ObjectId } from 'bson';
import ProofPreview from './ProofPreview.vue';
import TABLE_HEADER from './const';
import { TableItem } from './types';

export default defineComponent({
  name: 'TableView',

  components: {
    ProofPreview
  },
  props: {
    items: {
      required: true,
      type: Array as PropType<TableItem[]>
    },
    userId: {
      required: true,
      type: Object as PropType<ObjectId>
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
    const readonly = inject('readonly', false);
    const filter = ref('Personal');
    const tableItems = computed(() =>
      props.items
        .filter((item: TableItem) => {
          if (filter.value === 'Personal') return item.author.equals(props.userId);
          return true;
        })
        .map(item => {
          return { ...item, id: item.id.toString() };
        })
    );
    const formatDate = (date: Date) => {
      return moment(date).fromNow();
    };
    return { header: ref(TABLE_HEADER), formatDate, filter, tableItems, readonly };
  }
});
</script>

<style lang="scss">
.make-data-table {
  .v-data-table__mobile-row__header {
    text-align: left;
  }
  .delete-icon {
    font-size: 16px;
  }
}
.tableview {
  &__column {
    text-align: center;
    // display: flex;
    flex-direction: column;
    max-width: 100%;
    width: 100%;
  }

  &__total-log {
    font-family: Raleway;
    font-size: 30px;
    font-weight: 800;
  }
  &__total-log-title {
    font-family: Raleway;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: 900;
    color: #000000;
    text-transform: uppercase;
  }
}
</style>
