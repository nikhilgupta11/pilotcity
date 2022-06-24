<template>
  <div class="list-view__entire-body">
    <IndexTable v-slot="{ indexedItems, indexHandler }" :items="items">
      <v-data-table
        :headers="header"
        :items="indexedItems"
        sort-by="index"
        item-key="id"
        :show-select="false"
        :disable-pagination="true"
        :hide-default-footer="true"
        class="pagetable"
        @current-items="indexHandler"
      >
        <template #body="{ items }">
          <draggable :list="items" tag="tbody">
            <tr v-for="(user, index) in items" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ user.first }}</td>
              <td>{{ user.last }}</td>
              <td>{{ user.organization }}</td>
            </tr>
          </draggable>
        </template>
      </v-data-table>
    </IndexTable>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api';
import draggable from 'vuedraggable';
import IndexTable from '@/components/IndexTable.vue';
import { LIST_VIEW_HEADERS, LIST_VIEW_ITEMS } from '@/constants/manage-program';

export default {
  name: 'ListView',
  components: {
    IndexTable,
    draggable
  },

  setup() {
    return { header: ref(LIST_VIEW_HEADERS), items: ref(LIST_VIEW_ITEMS) };
  },
  computed: {
    dragOptions() {
      return {
        animation: 150,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag'
      };
    }
  }
};
</script>

<style lang="scss">
.list-view__entire-body {
  margin-right: 56px;
}
</style>
