<template>
  <validation-observer slim>
    <div class="confirmemail__background d-flex black justify-center">
      <div class="confirmemail__box accent d-flex flex-column align-center">
        <div
          :class="`${color}--text`"
          class="
            confirmemail__title
            text-h4
            font-weight-black
            d-flex
            flex-column
            blue--text
            text-center
          "
        >
          <div>{{ displayMessage }}</div>
        </div>
        <div v-if="color === 'red'" class="mt-8 d-flex flex-column justify-center">
          <validation-provider v-slot="{ errors }" slim rules="email">
            <v-text-field
              v-model="starterEmail"
              :error-messages="errors[0]"
              light
              outlined
              label="Email"
            ></v-text-field>
          </validation-provider>
          <div class="text-h6 font-weight-bold">Click to resend confirmation email</div>
          <v-btn class="mt-4" large depressed dark @click="resendEmailConfirmation">Resend</v-btn>
        </div>
      </div>
    </div>
  </validation-observer>
</template>

<script lang="ts">
import { ref, onMounted } from '@vue/composition-api';
import { useAuthActions, useToolActions, useAuthGetters, useDbGetters } from '@/store';

export default {
  name: 'ConfirmEmail',

  props: {
    token: {
      type: String,
      default: ''
    },
    tokenId: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
    }
  },

  setup(props, vm) {
    const color = ref('blue');
    const email = ref('');
    const confirmationError = ref(false);
    const { collection } = useDbGetters(['collection']);
    const displayMessage = ref('Hang on while we verify your email');
    const messagePopup = ref(false);
    const { setLinearLoader } = useToolActions(['setLinearLoader']);
    const { sendResetPassword } = useAuthActions(['sendResetPassword']);

    const resendConfirmation = async () => {
      const { resendEmailConfirmation } = useAuthActions(['resendEmailConfirmation']);
      await resendEmailConfirmation({ email: email.value });
    };

    const verifyUser = async () => {
      const { confirmUser } = useAuthActions(['confirmUser']);
      try {
        await confirmUser({
          token: props.token as string,
          tokenId: props.tokenId as string,
          username: decodeURIComponent(props.username as string)
        });
        await collection.value!('User')
          .findOne({ email: decodeURIComponent(props.username as string) })
          .then(async res => {
            color.value = 'green';
            displayMessage.value = 'Your email has been verified, you will be redirected shortly';
            if (res && res.invitedUser) {
              await sendResetPassword({ email: decodeURIComponent(props.username as string) }).then(
                () => {
                  messagePopup.value = true;
                }
              );
            } else if (localStorage.getItem('inviteSlug')) {
              vm.root.$router.push({
                path: `/invite/${localStorage.getItem('inviteSlug')}?isLogin=true`
              });
            } else {
              vm.root.$router.push({ name: 'login' });
            }
          });
      } catch {
        confirmationError.value = true;
        color.value = 'red';
        displayMessage.value = 'We could not verify your email at this time';
      }
    };

    onMounted(async () => {
      await setLinearLoader({ func: verifyUser });
      if (messagePopup.value) {
        color.value = 'green';
        displayMessage.value =
          'We have sent you instructions in your registered email address about setting up a password for the PilotCity account';
      }
    });

    return {
      confirmationError,
      displayMessage,
      color,
      email,
      messagePopup,
      resendConfirmation
    };
  }
};
</script>

<style lang="scss">
.confirmemail {
  &__background {
    height: 100%;
  }

  &__box {
    width: 40%;
    height: 40%;
    margin-top: 10%;
    margin-bottom: 20%;
    background: #c4c4c4;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    border-radius: 25px;
  }

  &__title {
    margin-top: 10%;
    width: 70%;
    text-align: center;
  }
}
</style>
