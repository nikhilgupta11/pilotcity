<template>
  <v-img
    src="https://f.hubspotusercontent00.net/hubfs/2480959/PC_Hero_3-1.jpg"
    class="height-full bg-black"
    height="100%"
  >
    <Loading :callback="login" linear-loader>
      <div class="d-flex justify-center">
        <div class="login__title info--text text-h4 font-weight-bold">
          <div class="d-flex justify-center text-align">
            <v-icon color="blue" x-large>mdi-telegram</v-icon>
          </div>
          <router-link to="/" class="arw" style="margin-left: -30px">
            <v-icon small class="font-weight-bold text-h4 mr-2 arw">mdi-arrow-left-thick</v-icon>
          </router-link>
          <span style="margin-left: 10px">Welcome back</span>
        </div>
      </div>
      <div v-if="isOtpSent" class="d-flex flex-column align-center">
        <v-form class="signup__firstname">
          <div>
            <AOtpInput v-model="otp" />
          </div>
          <div class="d-flex justify-center mt-6 flex-column align-center">
            <a href="https://www.pilotcity.com/"
              ><img src="@/assets/Pilotcity_logo.png" max-height="50px" class="nav__logo2" />
            </a>
            <v-btn
              class="mt-6"
              width="100%"
              type="submit"
              rounded
              depressed
              dark
              :disabled="!isValidOtp"
              color="blue"
              x-large
              :loading="verifying"
              @click.prevent="verifyOtp"
            >
              Login
            </v-btn>
            <v-alert v-if="otpMsg" style="font-size: 16px" class="signup__alert mt-3" :type="type">
              {{ otpMsg }}
            </v-alert>
          </div>
        </v-form>
      </div>
      <div v-else class="login__inputs d-flex flex-column align-center">
        <v-alert
          v-if="verificationMsg"
          style="font-size: 16px"
          class="signup__alert mb-3 login__emailalign"
          type="success"
        >
          {{ verificationMsg }}
        </v-alert>
        <v-form v-if="isEmail" class="login__emailalign">
          <validation-observer v-slot="{ invalid }" ref="observer" slim>
            <validation-provider
              v-if="isEmail"
              v-slot="{ errors }"
              ref="provider"
              rules="required|email"
            >
              <v-text-field
                ref="emailInput"
                v-model="email"
                rounded
                x-large
                class="login__input mb-4"
                single-line
                outlined
                full-width
                label="Email"
                placeholder="Email"
                color="white"
                dark
                :error-messages="errors"
              ></v-text-field>
            </validation-provider>

            <validation-provider v-if="isEmail" v-slot="{ errors }" slim rules="required">
              <v-text-field
                ref="passwordInput"
                v-model="password"
                rounded
                x-large
                placeholder="Password"
                class="login__input"
                label="Password"
                toggle
                single-line
                outlined
                full-width
                dark
                :error-messagees="errors"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
              >
              </v-text-field>
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
                    <v-text-field
                      v-model="resetEmail"
                      x-large
                      rounded
                      outlined
                      label="Enter your email"
                    >
                    </v-text-field>
                    <v-btn
                      x-large
                      depressed
                      rounded
                      outlined
                      class="send-reset-pwd-btn"
                      @click="sendResetPasswordEmail"
                    >
                      Send Reset Password Email
                      <v-progress-circular
                        v-if="isSending"
                        class="ml-2 setup-adk-interview-generate"
                        size="20"
                        indeterminate
                        color="white"
                      ></v-progress-circular>
                    </v-btn>
                    <v-alert v-if="msg" class="login__alert" :type="type">{{ msg }}</v-alert>
                  </div>
                </v-card>
              </v-dialog>
            </validation-provider>
            <v-btn
              ref="loginBtn"
              class="mt-6"
              type="submit"
              depressed
              color="blue"
              rounded
              width="100%"
              dark
              x-large
              :ripple="false"
              :disabled="invalid || signingIn || checking"
              :loading="signingIn || checking"
              @click.prevent="checkUserStatus"
              >Login</v-btn
            >
            <v-alert v-if="msg" style="font-size: 16px" class="signup__alert mt-4" :type="type">
              {{ msg }}
            </v-alert>
          </validation-observer>
        </v-form>
        <v-form v-else-if="isEmailOtp" class="login__emailalign">
          <validation-observer ref="observer" v-slot="{ invalid }" slim>
            <validation-provider v-slot="{ errors }" ref="provider" rules="required|email">
              <v-text-field
                ref="emailInput"
                v-model="email"
                rounded
                x-large
                class="login__input mb-4"
                single-line
                outlined
                full-width
                label="Email"
                placeholder="Email"
                color="white"
                dark
                :error-messages="errors"
              ></v-text-field>
            </validation-provider>
            <v-btn
              ref="loginBtn"
              type="submit"
              class="mt-6"
              depressed
              color="blue"
              dark
              rounded
              width="100%"
              :disabled="invalid"
              :loading="signingIn"
              x-large
              :ripple="false"
              @click.prevent="signIn"
            >
              Continue
            </v-btn>
            <v-alert v-if="msg" class="login__alert" :type="type">{{ msg }}</v-alert>
          </validation-observer>
        </v-form>
        <v-form v-if="isPhone">
          <validation-observer v-slot="{ invalid }" class="login__emailalign">
            <validation-provider slim rules="required">
              <ATeleInput
                v-model="phoneState.phone_number"
                class="mb-4"
                :is-rounded="true"
                @get="getValidation"
              />
            </validation-provider>
            <v-btn
              width="100%"
              type="submit"
              rounded
              dark
              depressed
              color="blue"
              x-large
              :disabled="invalid || !isPhoneValid"
              :loading="signingIn"
              @click.prevent="signIn"
            >
              Continue
            </v-btn>
            <v-alert v-if="msg" style="font-size: 16px" class="signup__alert mt-4" :type="type">
              {{ msg }}
            </v-alert>
            <v-alert
              v-if="$route.query.forcedLogout"
              style="font-size: 16px"
              class="signup__alert mt-4 login__emailalign"
              type="error"
            >
              Due to security reasons, you've been logged out from PilotCity. Please login again
              with your current password in order to continue.
            </v-alert>
          </validation-observer>
        </v-form>
        <div class="d-flex justify-center mt-4 flex-column align-center">
          <div class="login__newaccount text-center mb-6">
            <router-link :to="{ name: 'signup', params: { page: $route.params.page } }">
              <a class="login__signuplink white--text text-center"> No account yet? Signup.</a>
            </router-link>
          </div>
          <a href="https://www.pilotcity.com/"
            ><img src="@/assets/Pilotcity_logo.png" max-height="50px" class="nav__logo2" />
          </a>
          <div class="or mt-3">OR</div>
          <v-btn
            v-if="isEmail || isEmailOtp"
            class="mt-6"
            width="100%"
            rounded
            dark
            depressed
            color="blue"
            x-large
            @click="
              isEmail = false;
              isEmailOtp = false;
              isPhone = true;
            "
          >
            Continue with phone
          </v-btn>
          <v-btn
            v-else
            width="100%"
            class="mt-6"
            rounded
            dark
            depressed
            color="blue"
            x-large
            @click="
              isEmail = true;
              isPhone = false;
            "
          >
            Login with Email
          </v-btn>
          <v-btn
            v-if="isEmail"
            class="mt-6"
            width="100%"
            rounded
            dark
            depressed
            color="blue"
            x-large
            @click="
              isEmail = false;
              isEmailOtp = true;
            "
          >
            Login with Email otp
          </v-btn>
        </div>
      </div>
    </Loading>
  </v-img>
</template>

<script lang="ts">
import { reactive, toRefs, SetupContext, ref, computed, watchEffect } from '@vue/composition-api';
import { ActionTypes } from '@/store/modules/user/actions';
import { ObjectId } from 'bson';
import { useDbGetters, useUserActions, useUserGetters } from '@/store';
import Loading from '@/components/Loading.vue';
import AOtpInput from '@/components/atoms/AOtpInput.vue';
import { onLogin } from '@/vue-apollo';
import ATeleInput from '@/components/atoms/ATeleInput.vue';
import axios from 'axios';

interface IUserForm {
  email: string;
  password: string;
  resetEmail: string;
  show1: boolean;
  dialog: boolean;
  error: string;
  forcedPassDialog: boolean;
}

interface IUi {
  msg: string;
  type: string;
  loading: boolean;
}
export default {
  components: {
    Loading,
    AOtpInput,
    ATeleInput
  },

  setup(props: any, context: SetupContext) {
    const { collection } = useDbGetters(['collection']);
    const isEmail = ref(false);
    const isOtpSent = ref(false);
    const isPhone = ref(true);
    const verifying = ref(false);
    const signingIn = ref(false);
    const otp = ref('');
    const token = ref('');
    const isEmailOtp = ref(false);
    const isChanging = ref(false);
    const otpMsg = ref('');
    const isPhoneValid = ref(false);
    const state: IUserForm = reactive({
      email: '',
      password: '',
      resetEmail: '',
      show1: false,
      dialog: false,
      forcedPassDialog: false,
      error: '',
      type: 'email_signin'
    });
    const phoneState = reactive({
      phone_number: '',
      formatted_number: '',
      type: 'phone_number_signin'
    });
    const ui: IUi = reactive({
      msg: '',
      type: 'success',
      loading: false
    });
    const userId = ref('');
    const userObjId = ref('');
    const verificationMsg = ref('');
    const {
      root: { $router, $route }
    } = context;

    const isSending = ref(false);

    function getValidation(val) {
      if (val && val.countryCallingCode && val.formatted) {
        phoneState.formatted_number = `+${val.countryCallingCode}${val.formatted}`;
        isPhoneValid.value = val.valid;
      } else {
        phoneState.formatted_number = '';
      }
    }

    watchEffect(() => {
      if ($route.query && $route.query.message && $route.query.success) {
        verificationMsg.value = $route.query.message;
        isEmail.value = true;
        isPhone.value = false;
      }
    });

    const { loginUser } = useUserActions([ActionTypes.loginUser]);
    const { getObjectId } = useUserGetters(['getObjectId']);
    // const { sendResetPassword } = useAuthActions(['sendResetPassword']);

    const isValidOtp = computed(() => {
      if (otp.value.length === 6) {
        return true;
      }
      return false;
    });

    const sendResetPasswordEmail = async (): Promise<void> => {
      ui.loading = true;
      isSending.value = true;
      try {
        const data = { email: state.resetEmail.toLowerCase() };
        await axios.post(`${process.env.VUE_APP_AUTH0}/change-password`, data).then(() => {
          ui.type = 'success';
          ui.msg = 'Reset password email has been sent';
          isSending.value = false;
          state.dialog = false;
        });
      } catch (err) {
        ui.msg = 'Reset password email could not be sent';
        ui.type = 'error';
        isSending.value = false;
      }
      ui.loading = false;
    };

    const login = async (val): Promise<void> => {
      try {
        const user = await loginUser(val);
        try {
          await onLogin(token.value);
        } catch (err) {
          console.log(err);
        }
        if ($route.params.page) $router.push({ path: $route.params.page });
        else if ($route.query.redirect === 'guide') {
          const { collection } = useDbGetters(['collection']);
          const { getObjectId } = useUserGetters(['getObjectId']);
          await collection.value!('Program')
            .insertOne({
              organizers: [getObjectId.value],
              participants: [],
              dateCreated: new Date(),
              licensed: false
            })
            .then(result => {
              $router.push({
                name: 'guide',
                params: { programId: result.insertedId, page: '0' }
              });
            });
        } // $router.push({ path: $route.query.redirect });
        else $router.push({ name: 'setup' });
      } catch (err) {
        if (err.statusCode === 401)
          state.error = 'That email and password combination does not exist';
        else state.error = err;
      }
    };

    async function verifyToken(val) {
      token.value = val;
      try {
        const data = {
          token: val
        };

        const resp = await axios.post(`${process.env.VUE_APP_AUTH0}/verify-jwt`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        collection.value!('User')
          .findOne({
            userId: resp.data.sub
          })
          .then(user => {
            login(user);
            verifying.value = false;
          });
      } catch (error) {
        console.log(error);
        otpMsg.value = 'Something went wrong';
        ui.type = 'error';
        signingIn.value = false;
        verifying.value = false;
      }
    }

    async function signIn() {
      signingIn.value = true;
      try {
        const API_ENDPOINT = process.env.VUE_APP_AUTH0;

        const stateEmail = {
          email: state.email,
          password: state.password,
          type: 'email_signin'
        };

        const stateEmailOtp = {
          email: state.email,
          type: 'email_otp_signin'
        };

        const stateSms = {
          phone_number: phoneState.formatted_number,
          type: 'phone_number_signin'
        };

        let data = {};

        if (isEmail.value) {
          data = stateEmail;
        } else if (isEmailOtp.value) {
          data = stateEmailOtp;
        } else {
          data = stateSms;
        }
        const resp = await axios.post(`${API_ENDPOINT}/sign-in`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (resp.status === 200 && isPhone.value) {
          ui.type = 'success';
          ui.msg = resp.data.message;
          isOtpSent.value = true;
          signingIn.value = false;
        } else if (resp.status === 200 && isEmailOtp.value) {
          ui.type = 'success';
          ui.msg = resp.data.message;
          isOtpSent.value = true;
          signingIn.value = false;
        } else {
          ui.type = 'success';
          ui.msg = resp.data.message;
          localStorage.setItem('apollo-refresh-token', resp.data.data.refresh_token);
          verifyToken(resp.data.data.access_token);
        }
      } catch (error) {
        ui.msg = error?.response?.data?.error?.description;
        ui.type = 'error';
        signingIn.value = false;
      }
    }

    async function verifyOtp() {
      try {
        verifying.value = true;

        const mobState = {
          type: 'phone_number_verify',
          phone_number: phoneState.formatted_number,
          code: otp.value
        };
        const emailState = {
          type: 'email_otp_verify',
          email: state.email,
          code: otp.value
        };

        const data = isEmailOtp.value ? emailState : mobState;

        const resp = await axios.post(`${process.env.VUE_APP_AUTH0}/verify-otp`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (resp.status === 200) {
          ui.type = 'success';
          otpMsg.value = resp.data.message;
          localStorage.setItem('apollo-refresh-token', resp.data.data.refresh_token);
          verifyToken(resp.data.data.access_token);
        }
      } catch (error) {
        otpMsg.value = 'Could not verify OTP';
        ui.type = 'error';
        verifying.value = false;
      }
    }

    async function forcedPass() {
      isChanging.value = true;
      try {
        const data = {
          user_id: userId.value,
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
              _id: userObjId.value
            },
            { $set: { forceChangedPwd: false } }
          );
          isChanging.value = false;
          state.forcedPassDialog = false;
        }
      } catch (error) {
        console.log(error);
      }
    }

    const checking = ref(false);
    function checkUserStatus() {
      checking.value = true;
      signingIn.value = true;
      collection.value!('User')
        .findOne({
          email: state.email
        })
        .then(user => {
          if (user?.forceChangedPwd) {
            console.log(user.userId);
            userId.value = user.userId;
            console.log(userId.value);
            userObjId.value = user._id;
            forcedPass().then(() => {
              signIn();
            });
          } else {
            signIn();
          }
        });
      checking.value = false;
    }

    async function resetPassEmail() {
      isSending.value = true;
      try {
        const data = {
          email: context.root.$route.hash.substring(2)
        };
        const resp = await axios.post(`${process.env.VUE_APP_AUTH0}/change-password`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        isSending.value = false;
      } catch (error) {
        console.log(error);
      }
    }

    const verifyUser = async () => {
      try {
        await collection.value!('User')
          .findOne({ email: context.root.$route.hash.substring(2) })
          .then(async res => {
            if (res && res.invitedUser) {
              verificationMsg.value =
                'We have sent you instructions in your registered email address about setting up a password for the PilotCity account';
              await resetPassEmail();
            }
          });
      } catch {
        verificationMsg.value = 'We could not verify your email at this time';
      }
    };

    if (context.root.$route.hash) {
      verifyUser();
    }

    return {
      ...toRefs(state),
      ...toRefs(ui),
      login,
      verifyUser,
      userObjId,
      checkUserStatus,
      resetPassEmail,
      forcedPass,
      isEmailOtp,
      otpMsg,
      isSending,
      isEmail,
      isPhone,
      verifying,
      ref,
      isOtpSent,
      otp,
      sendResetPasswordEmail,
      phoneState,
      signIn,
      token,
      verifyToken,
      collection,
      signingIn,
      verifyOtp,
      checking,
      isChanging,
      isValidOtp,
      verificationMsg,
      getValidation,
      isPhoneValid
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

.send-reset-pwd-btn {
  position: relative;
  margin-bottom: 25px;
  span {
    white-space: normal;
    width: 100%;

    .v-progress-circular {
      position: absolute;
      bottom: -40px;
    }
  }
}

.login {
  &__inputs {
    margin-bottom: 60px;
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
      font-size: 16px;
    }
  }
}

.login {
  &__alert {
    margin-top: 25px;
    font-size: 16px !important;
  }
}

.or {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.or:after,
.or:before {
  content: '';
  display: block;
  background: white;
  width: 100px;
  height: 1px;
  margin: 0 10px;
}

.arw {
  text-decoration: none;
  color: gray !important;
}
</style>
