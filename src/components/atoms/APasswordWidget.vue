<template>
  <v-dialog v-model="isDialog" persistent width="500">
    <v-card class="text-center">
      <v-card-title class="d-flex justify-space-between widget-title">
        <span class="font-weight-bold"> Enter Password </span>
      </v-card-title>
      <v-divider></v-divider>
      <v-container class="d-flex justify-center flex-column pa-6">
        <v-text-field
          v-model="password"
          x-large
          rounded
          outlined
          label="Enter your Password"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
        >
        </v-text-field>
        <v-btn
          x-large
          depressed
          :disabled="!isValidPass"
          rounded
          outlined
          class="send-reset-pwd-btn"
          @click="$emit('set', password)"
        >
          Set Password
        </v-btn>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, ref } from '@vue/composition-api';

export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    toggleShow: {
      type: Function,
      default: () => {}
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },

  setup(props, ctx) {
    const show1 = ref(false);
    const password = ref('');

    const isDialog = computed({
      get: () => props.isOpen,
      set: newVal => {
        ctx.emit('open', newVal);
      }
    });

    const isValidPass = computed(() => {
      if (password.value.length >= 6) {
        return true;
      }
      return false;
    });

    return { password, show1, isDialog, isValidPass };
  }
};
</script>
