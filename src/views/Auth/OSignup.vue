<template>
  <AImage
    src="https://f.hubspotusercontent00.net/hubfs/2480959/PC_Hero_3-1.jpg"
    class="primary"
    height="100%"
    max-height="100vh"
  >
    <div class="d-flex justify-center">
      <div class="signup__title green--text text-h4 font-weight-bold">
        <div class="d-flex justify-center text-align">
          <v-icon color="green" x-large>mdi-heart-flash</v-icon>
        </div>
        <span>Join the family</span>
      </div>
    </div>

    <MAuthInputs>
      <validation-observer v-slot="{ invalid }" class="signup__firstname">
        <validation-provider v-slot="{ errors }" rules="required|email">
          <ATextInput
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
          ></ATextInput>
        </validation-provider>
        <validation-provider v-slot="{ errors }" rules="required|min:6">
          <ATextInput
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
            :toggleShow="toggleShowPassword"
          ></ATextInput>
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

        <AButton
          width="100%"
          rounded
          dark
          depressed
          color="green"
          x-large
          :disabled="invalid || !terms"
          :loading="loading"
          @click="submit"
          badgeText="SignUp"
        />
        <v-alert v-if="msg" class="signup__alert" :type="type">{{ msg }}</v-alert>
        <div class="signup__newaccount text-center">
          <router-link v-if="isInvite" to="#" @click.native="$emit('login', $event)">
            <a class="signup__signuplink white--text text-center">
              Have an account already? Login.</a
            >
          </router-link>
          <router-link v-else :to="{ name: 'login', params: { page: $route.params.page } }">
            <a class="signup__signuplink white--text text-center">
              Have an account already? Login.</a
            >
          </router-link>
        </div>
        <div class="d-flex justify-center mt-6">
          <a href="https://www.pilotcity.com/"
            ><img src="@/assets/Pilotcity_logo.png" max-height="50px" class="nav__logo2" />
          </a>
        </div>
      </validation-observer>
    </MAuthInputs>
  </AImage>
</template>

<script lang="ts">
import { reactive, toRefs, ref, SetupContext, Ref } from '@vue/composition-api';
import { useAuthActions } from '@/store';
import ATextInput from '@/components/atoms/ATextInput.vue';
import AButton from '@/components/atoms/AButton.vue';
import AImage from '@/components/atoms/AImage.vue';
import axios from 'axios';
import MAuthInputs from './MAuthInputs.vue';

interface IUserForm {
  email: string;
  password: string;
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
    const { signup } = useAuthActions(['signup']);
    const dialog: Ref<boolean> = ref(false);
    const show1: Ref<boolean> = ref(false);
    const state: IUserForm = reactive({
      email: '',
      password: '',
      terms: false
    });

    const param: string = (context.root.$route.query.email as string) || '';
    state.email = param;

    function toggleShowPassword() {
      show1.value = !show1.value;
    }

    const ui: IUi = reactive({
      msg: '',
      type: 'success',
      loading: false
    });

    async function triggerHubspot() {
      const API_ENDPOINT = process.env.VUE_APP_HUBSPOT_EVENT;

      const data = {
        event_type: 'sign_up',
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
        event_type: 'sign_up',
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

    const submit = async (): Promise<void> => {
      ui.loading = true;
      if (context.root.$route.params && context.root.$route.params.slug) {
        localStorage.setItem('inviteSlug', context.root.$route.params.slug);
        triggerHubspot();
        createHubspot();
      }
      try {
        await signup({ email: state.email, password: state.password });
        ui.type = 'success';
        ui.msg = 'An email confirmation has been sent to your address';
      } catch (err) {
        ui.msg = (err as Error).message.includes('409')
          ? 'Email already in use'
          : 'Could not signup';
        ui.type = 'error';
      }
      ui.loading = false;
    };

    return {
      ...toRefs(state),
      triggerHubspot,
      ...toRefs(ui),
      submit,
      dialog,
      toggleShowPassword,
      show1
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
    font-size: 13px;
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
    font-size: 11px;
  }

  &__alert {
    margin-top: 25px;
    font-size: 11.5px !important;
  }
}
</style>
