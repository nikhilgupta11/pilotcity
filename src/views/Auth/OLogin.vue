<template>
  <AImage
    src="https://f.hubspotusercontent00.net/hubfs/2480959/PC_Hero_3-1.jpg"
    class="height-full bg-black"
    max-height="100vh"
    height="100%"
  >
    <Loading v-slot="{ loading, process }" :callback="login" linear-loader>
      <div class="d-flex justify-center">
        <div class="login__title info--text text-h4 font-weight-bold">
          <div class="d-flex justify-center text-align">
            <v-icon color="blue" x-large>mdi-telegram</v-icon>
          </div>
          <span>Welcome back</span>
        </div>
      </div>
      <MAuthInputs>
        <validation-observer v-slot="{ invalid }" ref="observer" slim class="login__emailalign">
          <validation-provider v-slot="{ errors }" ref="provider" rules="required|email">
            <ATextInput
              v-model="email"
              label="Email"
              placeholder="Email"
              class="login__input"
              :errors="errors"
              rounded
              single-line
              outlined
              full-width
              dark
            />
          </validation-provider>

          <validation-provider v-slot="{ errors }" slim rules="required">
            <ATextInput
              v-model="password"
              label="Password"
              placeholder="Password"
              class="login__input"
              :errors="errors"
              rounded
              single-line
              outlined
              full-width
              dark
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :keyup-enter="process"
              :toggleShow="toggleShowPassword"
            />
            <v-dialog v-model="dialog" width="400">
              <template #activator="{ on, attrs }">
                <div class="white--text text-right" v-bind="attrs" v-on="on">
                  <i>
                    <a class="login__forgotlink white--text"> Forgot Password</a>
                  </i>
                </div>
              </template>
              <v-card dark class="login__dialog text-center">
                <div class="d-flex flex-column">
                  <ATextInput v-model="resetEmail" rounded outlined label="Enter your email" />
                  <AButton
                    x-large
                    depressed
                    rounded
                    outlined
                    badgeText="Send Reset Password Email"
                    @clickOn="sendResetPasswordEmail"
                  />
                  <v-alert v-if="msg" class="login__alert" :type="type">{{ msg }}</v-alert>
                </div>
              </v-card>
            </v-dialog>
          </validation-provider>
          <AButton
            ref="loginBtn"
            class="mt-6"
            depressed
            color="blue"
            rounded
            width="100%"
            dark
            x-large
            :disabled="invalid"
            :loading="loading"
            badgeText="Login"
            @click="process"
          />
          <v-alert v-if="error" class="login__alert" type="error">{{ error }}</v-alert>
          <div class="login__newaccount text-center">
            <router-link v-if="isInvite" to="#" @click.native="$emit('signup', $event)">
              <a class="login__signuplink white--text text-center"> No account yet? Signup.</a>
            </router-link>
            <router-link v-else :to="{ name: 'signup', params: { page: $route.params.page } }">
              <a class="login__signuplink white--text text-center"> No account yet? Signup.</a>
            </router-link>
          </div>
          <div class="d-flex justify-center mt-6">
            <a href="https://www.pilotcity.com/"
              ><img src="@/assets/Pilotcity_logo.png" class="nav__logo2" />
            </a>
          </div>
        </validation-observer>
      </MAuthInputs>
    </Loading>
  </AImage>
</template>

<script lang="ts">
import { reactive, toRefs, SetupContext } from '@vue/composition-api';
import { ActionTypes } from '@/store/modules/auth/actions';
import { useAuthActions, useDbState } from '@/store';
import Loading from '@/components/Loading.vue';
import ATextInput from '@/components/atoms/ATextInput.vue';
import AButton from '@/components/atoms/AButton.vue';
import AImage from '@/components/atoms/AImage.vue';
import { onLogin } from '@/vue-apollo';
import axios from 'axios';
import MAuthInputs from './MAuthInputs.vue';

interface IUserForm {
  email: string;
  password: string;
  resetEmail: string;
  show1: boolean;
  dialog: boolean;
  error: string;
}

interface IUi {
  msg: string;
  type: string;
  loading: boolean;
}
export default {
  components: {
    Loading,
    MAuthInputs,
    ATextInput,
    AButton,
    AImage
  },

  props: {
    isInvite: {
      type: Boolean,
      default: false
    },
    inviteId: {
      type: String,
      default: ''
    }
  },

  setup(props: any, context: SetupContext) {
    const state: IUserForm = reactive({
      email: '',
      password: '',
      resetEmail: '',
      show1: false,
      dialog: false,
      error: ''
    });
    const ui: IUi = reactive({
      msg: '',
      type: 'success',
      loading: false
    });
    const {
      root: { $router, $route }
    } = context;

    function toggleShowPassword() {
      state.show1 = !state.show1;
    }

    const { loginUser } = useAuthActions([ActionTypes.loginUser]);
    const { sendResetPassword } = useAuthActions(['sendResetPassword']);

    const sendResetPasswordEmail = async (): Promise<void> => {
      ui.loading = true;
      try {
        await sendResetPassword({ email: state.resetEmail });
        ui.type = 'success';
        ui.msg = 'Reset password email has been sent';
      } catch (err) {
        ui.msg = 'Reset password email could not be sent';
        ui.type = 'error';
      }
      ui.loading = false;
    };

    async function triggerHubspot() {
      const API_ENDPOINT = process.env.VUE_APP_HUBSPOT_EVENT;

      const data = {
        event_type: 'sign_in',
        email: state.email
      };

      try {
        const resp = await axios.post(API_ENDPOINT, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    async function createHubspot() {
      const API_ENDPOINT = process.env.VUE_APP_HUBSPOT_EVENT_CREATE;

      const data = {
        id: props.inviteId,
        event_type: 'sign_in',
        username: state.email
      };

      try {
        const resp = await axios.post(API_ENDPOINT, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    const login = async (): Promise<void> => {
      try {
        const user = await loginUser({ email: state.email, password: state.password });
        if (context.root.$route.params && context.root.$route.params.slug) {
          triggerHubspot();
          createHubspot();
        }
        try {
          await onLogin(user!.accessToken);
        } catch (err) {
          console.log(err);
        }
        if (!props.isInvite) {
          if ($route.params.page) $router.push({ path: $route.params.page });
          else $router.push({ name: 'setup' });
        }
      } catch (err) {
        if (err.statusCode === 401)
          state.error = 'That email and password combination does not exist';
        else state.error = err;
      }
    };

    return {
      ...toRefs(state),
      ...toRefs(ui),
      login,
      triggerHubspot,
      toggleShowPassword,
      sendResetPasswordEmail
    };
  }
};
</script>

<style lang="scss">
.login {
  &__dialog {
    padding: 25px;
  }
}

.login {
  &__title {
    margin-top: 160px;
    margin-bottom: 30px;
    font-family: Raleway;
  }
}

.login {
  &__inputs {
    .v-text-field--outlined > .v-input__control > .v-input__slot {
      background: white;
      background-color: transparent;
    }
    .v-text-field .v-text-field__details {
      display: none;
    }
  }

  &__emailalign {
    width: 100%;
    max-width: 349.11px;
  }

  &__forgotlink {
    font-size: 13px;
  }

  &__newaccount {
    margin-top: 4%;

    a.login__signuplink {
      margin-top: 4.5%;
      font-size: 13px;
    }
  }
}

.login {
  &__alert {
    margin-top: 25px;
    font-size: 11.5px !important;
  }
}
</style>
