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
            @click="forcedPass"
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
import { reactive, toRefs, defineComponent, ref } from '@vue/composition-api';
import { useAuthActions, useDbGetters } from '@/store';
import axios from 'axios';

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

  setup(props, { root: { $router } }) {
    const state: IState = reactive({
      password: '',
      msg: '',
      type: 'success',
      loading: false
    });
    const { resetPassword } = useAuthActions(['resetPassword']);
    const { collection } = useDbGetters(['collection']);
    const isChanging = ref(false);
    const submit = async () => {
      state.loading = true;
      try {
        await resetPassword({
          token: props.token as string,
          tokenId: props.tokenId as string,
          password: state.password
        });
        state.msg = 'Your password has been changed';
        state.type = 'success';
        $router.push({ name: 'login' });
      } catch (err) {
        state.msg = err;
        state.type = 'error';
      }
      state.loading = false;
    };

    async function forcedPass() {
      isChanging.value = true;
      try {
        const data = {
          user_id: $router.query.user_id,
          password: state.password,
          confirm_password: state.password
        };
        console.log(data);
        const resp = await axios.post(`${process.env.VUE_APP_AUTH0}/force-password-change`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (resp.status === 200) {
          collection.value!('User').findOneAndUpdate(
            {
              userId: $router.query.user_id
            },
            { $set: { invitedUser: false } }
          );
          isChanging.value = false;
        }
      } catch (error) {
        console.log(error);
      }
    }

    return { ...toRefs(state), submit, forcedPass };
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
