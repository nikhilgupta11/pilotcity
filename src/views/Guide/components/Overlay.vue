<template>
  <div class="overlay">
    <!-- <div class="guide__setupbutton">
      <v-btn class="font-weight-bold" small depressed dark color="orange">No Setup Required</v-btn>
    </div> -->
    <div class="content mt-5">
      <v-tooltip top color="black">
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            class="last ml-6 mr-auto"
            large
            icon
            v-on="on"
            @click="$emit('goto:last')"
            ><v-icon large color="white">mdi-chevron-double-left</v-icon></v-btn
          >
        </template>
        <span>Goto last activity</span>
      </v-tooltip>
      <div class="overlay-wrapper">
        <v-btn
          depressed
          class="last-setup white--text font-weight-bold"
          color="green"
          large
          @click="$emit('goto:last-setup')"
          ><v-icon left>mdi-check-circle</v-icon>Last Setup</v-btn
        >
        <v-btn outlined depressed dark x-large class="exit ml-3 mr-3" @click="$emit('close')"
          >Exit to Activity</v-btn
        >

        <v-btn
          class="next-setup white--text font-weight-bold"
          color="orange"
          large
          @click="$emit('goto:next-setup')"
          ><v-icon left>mdi-progress-wrench</v-icon>Next Setup</v-btn
        >
      </div>

      <v-tooltip top color="black">
        <template #activator="{ on, attrs }">
          <v-btn
            depressed
            v-bind="attrs"
            class="next mr-6 ml-auto"
            large
            icon
            v-on="on"
            @click="$emit('goto:next')"
            ><v-icon large color="white">mdi-chevron-double-right</v-icon></v-btn
          >
        </template>
        <span>Goto next activity</span>
      </v-tooltip>
    </div>
    <!-- <div class="header">
      <v-btn class="exit">View Activity</v-btn>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Overlay',

  setup(props, ctx) {}
});
</script>

<style scoped lang="scss">
.overlay {
  position: absolute;
  inset: 0;
  z-index: 1055;
  display: block;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  background-color: #000000e3;

  .header {
    display: flex;
    justify-content: center;
    margin-top: 60px;
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 0;
    margin: auto;
    .overlay-wrapper {
      @media (max-width: 767px) {
        display: flex;
        flex-direction: column;
        button {
          margin: 0 !important;
          margin-bottom: 20px !important;
        }
      }
    }
  }
}
</style>
