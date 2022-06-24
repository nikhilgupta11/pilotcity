<template>
  <v-layout fill-height align-center justify-center d-flex class="reset-password__wrapper">
    <v-row no-gutters class="reset-password">
      <v-col sm="2" md="4" />
      <v-col sm="8" md="4">
        <ValidationObserver v-slot="{ invalid }">
          <div class="">
            <validation-provider v-slot="{ errors }" rules="required|min:6">
              <v-text-field
                v-model="password"
                rounded
                x-large
                type="password"
                :error-messages="errors"
                label="Enter new password"
                class=""
                single-line
                outlined
                background-color="white"
              ></v-text-field>
            </validation-provider>
          </div>

          <v-btn
            class="font-weight-bold"
            depressed
            dark
            x-large
            rounded
            width="100%"
            color="blue"
            :disabled="invalid"
            :loading="loading"
            @click="submit"
            >Reset Password</v-btn
          >
          <v-alert v-if="msg" :type="type">{{ msg }}</v-alert>
        </ValidationObserver>
      </v-col>
      <v-col sm="2" md="4" />
    </v-row>
  </v-layout>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from '@vue/composition-api';
import { useAuthActions } from '@/store';

interface IState {
  password: string;
  msg: string;
  type: string;
  loading: boolean;
}

export default defineComponent({
  props: {
    token: {
      type: String,
      default: ''
    },
    tokenId: {
      type: String,
      default: ''
    }
  },

  setup(props, vm) {
    const state: IState = reactive({
      password: '',
      msg: '',
      type: 'success',
      loading: false
    });
    const { changePassword } = useAuthActions(['changePassword']);
    const submit = async () => {
      state.loading = true;
      try {
        await changePassword({
          email: vm.root.$route.query.username,
          password: state.password
        });
        state.msg = 'Your password has been changed';
        state.type = 'success';
        vm.root.$router.push({ name: 'login' });
      } catch (err) {
        state.msg = err;
        state.type = 'error';
      }
      state.loading = false;
    };

    return { ...toRefs(state), submit };
  }
});
</script>

<style lang="scss" scoped>
.reset-password__wrapper {
  background: var(--v-primary-base);

  .reset-password {
    margin-top: -100px;
  }
}
</style>
