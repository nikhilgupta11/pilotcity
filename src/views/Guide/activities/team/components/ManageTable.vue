<template>
  <div>
    <v-data-table
      :headers="tableHeaders"
      :items="teamMembers"
      :items-per-page="100"
      :hide-default-footer="true"
      sort-by="resource"
      :class="'team_table'"
    >
      <template #[`item.avatar`]="{ item }">
        <v-avatar size="32" color="grey lighten-2"><v-img :src="item.avatar" /></v-avatar>
      </template>
      <template #[`item.name`]="{ item }"> {{ item.firstName }} {{ item.lastName }} </template>
      <template #[`item.access`]="{ item }">
        {{ isOwner(item) ? 'Owner' : 'Member' }}
      </template>
      <template v-if="viewer.data._id.equals(teamDoc.data.owner)" #[`item.action`]="{ item }">
        <v-btn
          v-if="!isOwner(item)"
          :disabled="userType === 'stakeholder' || readonly"
          :ripple="false"
          x-small
          outlined
          depressed
          @click="(removeMemberDialog = true), (selectedMember = item)"
          ><v-icon x-small left> mdi-close-circle </v-icon>Remove</v-btn
        >

        <v-btn
          v-if="isOwner(item)"
          :disabled="userType === 'stakeholder' || readonly"
          :ripple="false"
          x-small
          outlined
          depressed
          @click="changeOwnerDialog = true"
          ><v-icon x-small left> mdi-swap-horizontal-bold </v-icon>Change Owner</v-btn
        >
      </template>
    </v-data-table>
    <v-dialog v-model="removeMemberDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="d-flex flex-column">
          <div class="overline font-weight-bold">Are you sure you want to remove team member?</div>
        </v-card-title>

        <v-divider></v-divider>

        <v-container class="d-flex flex-column justify-center">
          <div class="d-flex flex-row justify-center mt-4 mb-6">
            <v-btn
              :disabled="readonly"
              class="ma-2"
              outlined
              x-large
              rounded
              depressed
              @click="removeMemberDialog = false"
              >Cancel</v-btn
            >
            <v-btn class="ma-2" color="red" x-large dark rounded depressed @click="removeMember"
              >Remove</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="changeOwnerDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="d-flex flex-column">
          <div class="overline font-weight-bold">Who would you like to change ownership to?</div>
        </v-card-title>

        <v-divider></v-divider>

        <v-container class="d-flex flex-column justify-center">
          <div class="mt-4" :class="$vuetify.breakpoint.xs ? 'px-0' : 'px-12'">
            <v-select
              v-model="selectedMember"
              :items="teamMembersExceptOwner"
              :item-text="data => `${data.firstName} ${data.lastName}`"
              :item-value="data => data"
              hide-details
              outlined
              rounded
              x-large
              label="Assign Ownership"
            ></v-select>
          </div>
          <div
            class="d-flex justify-center mt-4 mb-6"
            :class="$vuetify.breakpoint.xs ? 'flex-column' : 'flex-row'"
          >
            <v-btn
              :class="$vuetify.breakpoint.xs ? 'ma-0  mb-2 mt-3' : 'ma-2'"
              outlined
              x-large
              rounded
              depressed
              :disabled="readonly"
              @click="changeOwnerDialog = false"
              >Cancel</v-btn
            >

            <v-btn
              :dark="selectedMember !== null"
              :disabled="!selectedMember || readonly"
              :class="$vuetify.breakpoint.xs ? 'ma-0' : 'ma-2'"
              color="green"
              x-large
              rounded
              depressed
              @click="changeOwner"
              ><v-icon left>mdi-swap-horizontal-bold</v-icon>Change Owner</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  PropType,
  reactive,
  toRefs,
  inject
} from '@vue/composition-api';
import { TeamDoc } from './types';

export default defineComponent({
  name: 'ManageTable',

  props: {
    teamDoc: {
      required: true,
      type: Object as PropType<TeamDoc>
    },
    viewer: {
      required: true,
      type: Object
    },
    userType: {
      required: true,
      type: String
    }
  },
  setup(props, ctx) {
    const readonly = inject('readonly', false);
    const state = reactive({
      selectedMember: null as null | Record<string, any>,
      removeMemberDialog: false,
      changeOwnerDialog: false
    });
    const isOwner = (item: Record<string, any>) => {
      return item._id.equals(props.teamDoc.data.owner);
    };
    const tableHeaders = computed(() => {
      const headers = [
        { text: '', align: 'start', value: 'avatar', width: '5%' },
        { text: 'Name', align: 'start', value: 'name', width: '50%' },
        { text: 'Access', align: 'start', value: 'access', sortable: false, width: '20%' },
        { text: 'Action', align: 'start', value: 'action', sortable: false, width: '25%' }
      ];
      if (props.viewer.data._id.equals(props.teamDoc.data.owner)) return headers;
      return headers.filter(column => column.value !== 'action');
    });
    const teamMembers = computed(() => {
      return props.teamDoc.data.members.slice().sort(member => {
        return isOwner(member) ? -1 : 1;
      });
    });
    const teamMembersExceptOwner = computed(() => {
      return props.teamDoc.data.members.filter(member => {
        return !isOwner(member);
      });
    });
    const removeMember = () => {
      ctx.emit('removeMember', state.selectedMember!._id);
      state.removeMemberDialog = false;
      state.selectedMember = null;
    };
    const changeOwner = () => {
      if (state.selectedMember) {
        ctx.emit('changeOwner', state.selectedMember._id);
        state.changeOwnerDialog = false;
        state.selectedMember = null;
      }
    };
    return {
      tableHeaders,
      teamMembers,
      teamMembersExceptOwner,
      isOwner,
      removeMember,
      changeOwner,
      readonly,
      ...toRefs(state)
    };
  }
});
</script>

<style lang="scss">
.team_table {
  &.v-data-table {
    table {
      .v-data-table__mobile-row {
        @media (max-width: 767px) {
          padding: 0;
        }
      }
    }
  }
}
</style>
