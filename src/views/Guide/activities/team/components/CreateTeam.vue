<template>
  <div>
    <div class="headline font-weight-black mb-6 mt-6">Create</div>
    <div
      class="d-flex justify-start mt-5 mb-5"
      :class="$vuetify.breakpoint.xs ? 'flex-column' : 'flex-row'"
    >
      <div>
        <v-text-field
          v-model="name"
          :disabled="userType === 'stakeholder'"
          rounded
          class="module-default__text-field"
          label="Create new team"
          placeholder="Enter new team name"
          outlined
        ></v-text-field>
      </div>
      <div>
        <v-dialog v-model="createTeamDialog" persistent max-width="450px">
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              :disabled="name.length === 0 || userType === 'stakeholder' || readonly"
              :ripple="false"
              rounded
              class="module-default__log-btn perform-adk-team-create"
              depressed
              x-large
              outlined
              v-on="on"
              >Create Team</v-btn
            >
          </template>

          <v-card>
            <v-card-title class="d-flex flex-column">
              <div class="overline font-weight-bold">Create password for new team members</div>
            </v-card-title>

            <v-divider></v-divider>

            <v-container class="d-flex justify-center">
              <div class="d-flex flex-column justify-center">
                <v-text-field
                  v-model="password"
                  :readonly="userType === 'stakeholder'"
                  class="justify-center ma-2"
                  x-large
                  rounded
                  label="Enter password"
                  outlined
                  hide-details
                ></v-text-field>
                <v-btn
                  :dark="password.length > 0"
                  :disabled="password.length === 0 || userType === 'stakeholder' || readonly"
                  class="ma-2 perform-adk-team-set-password"
                  x-large
                  rounded
                  depressed
                  @click="createTeam"
                  >Set Password</v-btn
                >

                <!-- <div class="d-flex headline justify-center mt-6 mb-6">Or</div>

                        <v-btn class="ma-2" x-large dark rounded depressed>Request to Join</v-btn> -->

                <div class="d-flex justify-center mt-3 mb-3">
                  <v-btn icon @click="createTeamDialog = false"><v-icon>mdi-close</v-icon></v-btn>
                </div>
              </div>
            </v-container>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'CreateTeam',

  props: {
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    }
  },
  setup(_props, ctx) {
    const readonly = inject('readonly', false);
    const state = reactive({
      name: '',
      password: '',
      createTeamDialog: false
    });
    const createTeam = () => {
      ctx.emit('createTeam', state.name, state.password);
      state.createTeamDialog = false;
      state.name = '';
    };
    return { ...toRefs(state), createTeam, readonly };
  }
});
</script>
