<template>
  <v-img
    src="https://f.hubspotusercontent00.net/hubfs/2480959/PC_Hero_3-1.jpg"
    class="primary"
    height="100%"
  >
    <div class="d-flex justify-center">
      <div class="signup__title green--text text-h4 font-weight-bold">
        <div class="d-flex justify-center text-align">
          <v-icon color="green" x-large>mdi-heart-flash</v-icon>
        </div>
        <router-link to="/" class="arw" style="margin-left: -30px">
          <v-icon small class="font-weight-bold text-h4 mr-2 arw">mdi-arrow-left-thick</v-icon>
        </router-link>
        <span style="margin-left: 10px">Join the family</span>
      </div>
    </div>

    <div v-if="isOtpSent" class="d-flex flex-column align-center">
      <div class="d-flex align-center justify-center">
        <v-text-field
          v-model="captchaInput"
          rounded
          placeholder="Captcha"
          x-large
          color="white"
          label="Captcha"
          class="captcha-input mt-4 mr-6 ma-0"
          single-line
          outlined
          full-width
          dark
        ></v-text-field>
        <v-img :src="captchaImg" height="54px" />
        <v-btn
          rounded
          small
          depressed
          icon
          :loading="fetching"
          color="#ffffff80"
          class="ml-2"
          @click="reCaptcha"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </div>
      <v-form class="signup__firstname otp-field mt-5">
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
            dark
            depressed
            color="green"
            :disabled="!isValidOtp"
            x-large
            :loading="verifying"
            @click.prevent="verifyOtp"
          >
            Verify Otp
          </v-btn>
          <v-alert v-if="otpMsg" class="signup__alert" :type="type">
            {{ otpMsg }}
          </v-alert>
        </div>
      </v-form>
    </div>
    <div v-else class="d-flex flex-column align-center">
      <v-form v-if="isEmail" class="signup__firstname">
        <validation-observer v-slot="{ invalid }">
          <validation-provider v-if="isEmail" v-slot="{ errors }" rules="required|email">
            <v-text-field
              v-model="email"
              rounded
              placeholder="Email"
              x-large
              :error-messages="errors"
              color="white"
              label="Email"
              class="signup__input"
              single-line
              outlined
              full-width
              dark
            ></v-text-field>
          </validation-provider>
          <validation-provider v-if="isEmail" v-slot="{ errors }" rules="required|min:6">
            <v-text-field
              v-model="password"
              x-large
              rounded
              placeholder="Password"
              :error-messages="errors"
              color="white"
              label="Password"
              class="signup__input"
              single-line
              outlined
              full-width
              dark
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
            ></v-text-field>
          </validation-provider>

          <v-checkbox
            v-model="terms"
            class="signup__conditions"
            color="white"
            single-line
            outlined
            full-width
            dark
          >
            <template #label>
              <div class="signup__conditions-text white--text">
                I agree to the following
                <a
                  class="login__forgotlink white--text"
                  href="https://www.iubenda.com/terms-and-conditions/32542296"
                  >Terms & Conditions</a
                >
                and
                <a class="white--text" href="https://www.iubenda.com/privacy-policy/32542296"
                  >Privacy Policy.</a
                >
              </div>
            </template>
          </v-checkbox>

          <v-btn
            width="100%"
            type="submit"
            rounded
            dark
            depressed
            color="green"
            x-large
            :disabled="invalid || !terms"
            :loading="loading"
            @click.prevent="submit"
          >
            Signup
          </v-btn>
          <v-alert v-if="msg" class="signup__alert" :type="type">
            {{ msg }}
          </v-alert>
          <div class="signup__newaccount text-center">
            <router-link
              :to="{
                name: 'login',
                params: { page: $route.params.page },
                query: { redirect: redirectPath }
              }"
            >
              <a class="signup__signuplink white--text text-center">
                Have an account already? Login.</a
              >
            </router-link>
          </div>
        </validation-observer>
      </v-form>
      <v-form v-else class="signup__firstname">
        <validation-observer v-slot="{ invalid }">
          <validation-provider slim rules="required">
            <ATeleInput
              v-model="phone_number"
              class="mb-4"
              :is-rounded="true"
              @get="getValidation"
            />
          </validation-provider>
          <v-checkbox
            v-model="terms"
            class="signup__conditions"
            color="white"
            single-line
            outlined
            full-width
            dark
          >
            <template #label>
              <div class="signup__conditions-text white--text">
                I agree to the following
                <a
                  class="login__forgotlink white--text"
                  href="https://www.iubenda.com/terms-and-conditions/32542296"
                  >Terms & Conditions</a
                >
                and
                <a class="white--text" href="https://www.iubenda.com/privacy-policy/32542296"
                  >Privacy Policy.</a
                >
              </div>
            </template>
          </v-checkbox>

          <v-btn
            width="100%"
            type="submit"
            rounded
            dark
            depressed
            color="green"
            x-large
            :disabled="invalid || !terms || !isPhoneValid || !isPhoneCheck"
            :loading="loading"
            @click.prevent="submit"
          >
            Continue
          </v-btn>
          <v-alert v-if="msg" class="signup__alert" :type="type">
            {{ msg }}
          </v-alert>
          <div class="signup__newaccount text-center">
            <router-link
              :to="{
                name: 'login',
                params: { page: $route.params.page },
                query: { redirect: redirectPath }
              }"
            >
              <a class="signup__signuplink white--text text-center">
                Have an account already? Login.</a
              >
            </router-link>
          </div>
        </validation-observer>
      </v-form>
      <div class="d-flex justify-center mt-6 flex-column align-center" style="margin-bottom: 60px">
        <a href="https://www.pilotcity.com/"
          ><img src="@/assets/Pilotcity_logo.png" max-height="50px" class="nav__logo2" />
        </a>
        <div class="or mt-3">OR</div>
        <v-btn
          v-if="isEmail"
          class="mt-6"
          width="100%"
          rounded
          dark
          depressed
          color="green"
          x-large
          @click="
            isEmail = false;
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
          color="green"
          x-large
          @click="
            isEmail = true;
            isPhone = false;
          "
        >
          Signup with Email
        </v-btn>
      </div>
    </div>
  </v-img>
</template>

<script lang="ts">
import { reactive, toRefs, ref, SetupContext, Ref, computed } from '@vue/composition-api';
import { ActionTypes } from '@/store/modules/user/actions';
import { useAuthActions, useDbGetters, useUserGetters, useUserActions } from '@/store';
import axios from 'axios';
import { onLogin } from '@/vue-apollo';
import AOtpInput from '@/components/atoms/AOtpInput.vue';
import ATeleInput from '@/components/atoms/ATeleInput.vue';

interface IUserEmailForm {
  email: string;
  password: string;
  type: string;
  terms: boolean;
}

interface IUserPhoneForm {
  phone_number: string;
  type: string;
  terms: boolean;
}

interface IUi {
  msg: string;
  type: string;
  loading: boolean;
}

export default {
  name: 'Signup',
  components: {
    AOtpInput,
    ATeleInput
  },

  setup(props: any, context: SetupContext) {
    const { signup } = useAuthActions(['signup']);
    const { collection } = useDbGetters(['collection']);
    const { loginUser } = useUserActions([ActionTypes.loginUser]);
    const otpMsg = ref('');
    const dialog: Ref<boolean> = ref(false);
    const show1: Ref<boolean> = ref(false);
    const isOtpSent = ref(false);
    const isEmail = ref(false);
    const isPhone = ref(true);
    const verifying = ref(false);
    const signingIn = ref(false);
    const isPhoneValid = ref(false);
    const otp = ref('');
    const token = ref('');
    const captchaInput = ref('');
    const captchaImg = ref('');
    const stateEmail = reactive({
      email: '',
      password: '',
      type: 'email_signup',
      terms: false,
      error: ''
    });
    const statePhone = reactive({
      type: 'phone_number_signup',
      phone_number: '',
      formatted_number: '',
      terms: false
    });
    const {
      root: { $route, $router }
    } = context;
    const redirectPath = $route.query?.redirect;

    const param: string = (context.root.$route.query.email as string) || '';
    stateEmail.email = param;

    const ui: IUi = reactive({
      msg: '',
      type: 'success',
      loading: false
    });

    function getValidation(val) {
      if (val && val.countryCallingCode && val.formatted) {
        statePhone.formatted_number = `+${val.countryCallingCode}${val.formatted}`;
        isPhoneValid.value = val.valid;
      } else {
        statePhone.formatted_number = '';
      }
    }

    const isPhoneCheck = computed(() => {
      const substring = '+1';
      const substring1 = '+';

      if (
        statePhone.phone_number.includes(substring) ||
        statePhone.phone_number.includes(substring1)
      ) {
        return false;
      }

      return true;
    });

    const isValidOtp = computed(() => {
      if (otp.value.length === 6 && captchaInput.value.length === 4) {
        return true;
      }
      return false;
    });

    const login = async (val): Promise<void> => {
      try {
        const user = await loginUser(val);
        signingIn.value = false;
        try {
          await onLogin(token.value);
        } catch (err) {
          console.log(err);
          signingIn.value = false;
        }
        verifying.value = false;
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
          stateEmail.error = 'That email and password combination does not exists';
        else stateEmail.error = err;
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
          });
      } catch (error) {
        console.log(error);
        otpMsg.value = 'Something went wrong';
        ui.type = 'error';
        signingIn.value = false;
        verifying.value = false;
      }
    }

    async function verifyOtp() {
      try {
        verifying.value = true;
        const data = {
          type: 'phone_number_verify',
          phone_number: statePhone.formatted_number,
          captcha_code: captchaInput.value,
          code: otp.value
        };
        const resp = await axios.post(`${process.env.VUE_APP_AUTH0}/verify-otp`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (resp.status === 200) {
          ui.type = 'success';
          otpMsg.value = resp.data.message;
          verifyToken(resp.data.data.access_token);
        }
      } catch (error) {
        otpMsg.value = error?.response?.data?.error?.description
          ? error?.response?.data?.error?.description
          : 'Could not verify OTP';
        ui.type = 'error';
        verifying.value = false;
      }
    }

    const submit = async (): Promise<void> => {
      ui.loading = true;

      try {
        const API_ENDPOINT = process.env.VUE_APP_AUTH0;

        const emailPayload = {
          ...stateEmail,
          email: stateEmail.email.toLowerCase()
        };

        const phnPayload = {
          ...statePhone,
          phone_number: statePhone.formatted_number
        };

        const data = isEmail.value ? emailPayload : phnPayload;

        const resp = await axios.post(`${API_ENDPOINT}/sign-up`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (resp.status === 200 && isPhone.value) {
          ui.type = 'success';
          ui.msg = resp.data.message;
          captchaImg.value = resp.data.data.captcha;
          isOtpSent.value = true;
        } else {
          ui.type = 'success';
          ui.msg = resp.data.message;
        }
      } catch (error) {
        ui.msg = error?.response?.data?.error?.description
          ? error?.response?.data?.error?.description
          : 'Could not signup';
        ui.type = 'error';
      }
      ui.loading = false;
    };
    const fetching = ref(false);
    async function reCaptcha() {
      try {
        fetching.value = true;
        const API_ENDPOINT = process.env.VUE_APP_AUTH0;
        const data = {
          phone_number: statePhone.formatted_number
        };

        const resp = await axios.post(`${API_ENDPOINT}/resend-captcha`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log(resp.data);
        if (resp.data) {
          captchaImg.value = resp.data.captcha;
          fetching.value = false;
        }
      } catch (error) {
        fetching.value = false;
        console.log(error);
      }
    }

    return {
      ...toRefs(stateEmail),
      ...toRefs(statePhone),
      ...toRefs(ui),
      submit,
      reCaptcha,
      isEmail,
      dialog,
      show1,
      redirectPath,
      fetching,
      isOtpSent,
      isPhone,
      otp,
      verifyOtp,
      verifying,
      otpMsg,
      isValidOtp,
      isPhoneValid,
      getValidation,
      isPhoneCheck,
      captchaImg,
      captchaInput
    };
  }
};
</script>

<style lang="scss">
.signup {
  &__title {
    margin-top: 160px;
    margin-bottom: 30px;

    span {
      font-family: Raleway;
    }
  }

  &__newaccount {
    margin: 12px 0;
  }

  &__signuplink {
    font-size: 16px;
  }

  &__firstname {
    width: 100%;
    max-width: 349.11px;

    &.theme--light.v-btn {
      color: #ffffff;
    }
  }

  &__conditions {
    &.v-checkbox {
      color: #ffffff;
    }

    &.v-input--selection-controls {
      margin-top: 0px;
    }
  }

  &__conditions-text {
    font-size: 16px;
  }

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

.otp-field {
  max-width: 410px !important;
}

.captcha-input {
  .v-input__slot {
    margin: 0 !important;
    max-width: 200px;
  }
}
</style>
