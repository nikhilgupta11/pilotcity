<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <div class="my-settings__title">General</div>
    <div class="d-flex justify-center flex-column align-center">
      <div ref="loader" class="my-id__wrapper" style="width: 100%">
        <validation-provider v-slot="{ errors }" rules="required">
          <v-text-field v-model="firstName" :error-messages="errors" outlined label="First Name">
          </v-text-field>
        </validation-provider>

        <validation-provider v-slot="{ errors }" rules="required">
          <v-text-field v-model="lastName" :error-messages="errors" label="Last Name" outlined>
          </v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" slim rules="required|email">
          <v-text-field
            v-model="email"
            :error-messages="errors"
            :disabled="isEmailAvailable"
            label="Email"
            outlined
            @input="
              showConfirmEmail = true;
              showPassword = true;
            "
          ></v-text-field>
        </validation-provider>

        <validation-provider v-if="!isEmailAvailable && showConfirmEmail" slim>
          <v-text-field v-model="confirm_email" label="Confirm Email" outlined></v-text-field>
          <p v-if="email && confirm_email && !validEmail" class="error-alert">
            Email must be identical
          </p>
        </validation-provider>

        <validation-provider
          v-if="isPhoneAvailable && !isEmailAvailable && showPassword"
          v-slot="{ errors }"
          slim
          rules="required"
        >
          <v-text-field
            v-model="passwordValue"
            placeholder="Password"
            label="Password"
            toggle
            outlined
            :error-messagees="errors"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
          />
        </validation-provider>

        <validation-provider slim rules="required">
          <ATeleInput
            class="mb-6"
            v-model="phoneNumber"
            @get="getValidation"
            :disabled="isPhoneAvailable"
            inputText="black"
          />
        </validation-provider>

        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-select
            v-model="userTypes"
            :error-messages="errors"
            :items="AVAILABLE_IDS"
            chips
            label="Citizen Type"
            multiple
            outlined
          ></v-select>
        </validation-provider>
        <Loading v-slot="{ loading: saving, process }" :callback="save">
          <v-btn
            :disabled="invalid || !isValid || !validEmail || !phoneValid || !isPhoneCheck"
            :loading="saving || isSetting"
            outlined
            depressed
            x-large
            @click="process"
          >
            Save
          </v-btn>
        </Loading>
        <v-alert v-if="msg" class="mt-3" type="error" style="font-size: 16px">{{ msg }}</v-alert>
      </div>
    </div>
  </ValidationObserver>
</template>
<script lang="ts">
import {
  Ref,
  reactive,
  ref,
  toRefs,
  defineComponent,
  watchEffect,
  computed
} from '@vue/composition-api';
import { useUserGetters, useDbActions, useDbState, useUserActions } from '@/store';
import axios from 'axios';
import { GetterTypes } from '@/store/modules/auth/getters';
import Loading from '@/components/Loading.vue';
import ATeleInput from '@/components/atoms/ATeleInput.vue';
import { User } from '@/generated/graphql';
import { CITIZEN_TYPES } from '@/constants/portfolio';

const { getObjectId } = useUserGetters([
  GetterTypes.getUser,
  GetterTypes.getObjectId,
  GetterTypes.getId
]);

interface TypeItem {
  text: string;
  value: string;
}

export default defineComponent({
  name: 'SettingsName',
  components: {
    Loading,
    ATeleInput
  },
  props: {
    value: {
      type: Array as () => TypeItem[],
      default: () => []
    }
  },
  setup(_props, { emit }) {
    const AVAILABLE_IDS = ref(CITIZEN_TYPES);
    const showConfirmEmail = ref(false);
    const isEmailAvailable = ref(false);
    const isPhoneAvailable = ref(false);
    const loader: Ref<any> = ref(null);
    const isSetting = ref(false);
    const isPhoneValid = ref(false);
    const passwordValue = ref('');
    const isChecked = ref(false);
    const msg = ref('');
    const showPassword = ref(false);
    const show = ref(false);

    const { user: userState } = useDbState(['user']);
    const { fetchUser } = useUserActions(['fetchUser']);

    // Invoke Query
    const user = reactive({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      formattedNumber: '',
      email: '',
      userTypes: [],
      confirm_email: ''
    });
    Object.keys(user).forEach(key => {
      if (key) {
        user[key] = userState.value![key];
      }
      if (userState.value && userState.value.phoneNumber)
        user.phoneNumber = userState.value.phoneNumber.substring(2);
    });
    watchEffect(() => {
      if (userState.value.email) {
        isEmailAvailable.value = true;
      }
      if (userState.value.phoneNumber) {
        isPhoneAvailable.value = true;
      }
    });

    const validEmail = computed(() => {
      if (user.email === user.confirm_email && isPhoneAvailable.value) {
        return true;
      }
      if (isEmailAvailable.value) {
        return true;
      }
      return false;
    });

    const isValid = computed(() => {
      if (passwordValue.value.length >= 6 && isPhoneAvailable.value) {
        return true;
      }
      if (isEmailAvailable.value) {
        return true;
      }
      return false;
    });

    const phoneValid = computed(() => {
      if (isPhoneValid.value && user.phoneNumber) {
        return true;
      }
      if (!isPhoneValid.value && !user.phoneNumber) {
        return true;
      }
      return false;
    });

    const isPhoneCheck = computed(() => {
      const substring = '+1';
      const substring1 = '+';

      if (user.phoneNumber.includes(substring) || user.phoneNumber.includes(substring1)) {
        return false;
      }

      return true;
    });

    async function setPassword() {
      try {
        isSetting.value = true;
        const data = {
          type: 'link_email',
          email: user.email,
          password: passwordValue.value
        };
        const res = await axios.post(`${process.env.VUE_APP_AUTH0}/add-identity`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apollo-token')}`
          }
        });
        console.log(res.data);
        if (res.data) {
          emit('input', user.userTypes);
          isEmailAvailable.value = true;
        }
        isSetting.value = false;
        msg.value = '';
      } catch (error) {
        console.log(error);
        msg.value = error?.response?.data?.error?.description;
        isSetting.value = false;
      }
    }

    async function setMobile() {
      try {
        isSetting.value = true;
        const data = {
          type: 'link_phone',
          phone_number: user.formattedNumber
        };
        const res = await axios.post(`${process.env.VUE_APP_AUTH0}/add-identity`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apollo-token')}`
          }
        });
        if (res.data) {
          emit('input', user.userTypes);
          isPhoneAvailable.value = true;
        }
        isSetting.value = false;
        msg.value = '';
      } catch (error) {
        console.log(error);
        msg.value = error?.response?.data?.error?.description;
        isSetting.value = false;
      }
    }

    function getValidation(val) {
      if (val && val.countryCallingCode && val.formatted && val.valid) {
        user.formattedNumber = `+${val.countryCallingCode}${val.formatted}`;
      } else {
        user.formattedNumber = '';
      }
      isPhoneValid.value = val.valid;
    }
    // Upload Functionality
    const { update } = useDbActions(['update']);
    async function save() {
      await update({
        collection: 'User',
        payload: {
          _id: getObjectId.value,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.formattedNumber,
          userTypes: user.userTypes,
          email: user.email
        } as User,
        filter: { _id: getObjectId.value },
        options: { upsert: true }
      }).then(res => {
        fetchUser(localStorage.getItem('apollo-token'));
        if (res) {
          if (isPhoneAvailable.value && !isEmailAvailable.value) {
            setPassword();
          } else if (isEmailAvailable.value && user.phoneNumber && !isPhoneAvailable.value) {
            setMobile();
          } else {
            emit('input', user.userTypes);
          }
        }
      });
    }

    return {
      save,
      AVAILABLE_IDS,
      isPhoneCheck,
      ...toRefs(user),
      loader,
      isEmailAvailable,
      isPhoneAvailable,
      isSetting,
      setPassword,
      passwordValue,
      setMobile,
      isValid,
      isChecked,
      msg,
      getValidation,
      validEmail,
      showConfirmEmail,
      isPhoneValid,
      phoneValid,
      show,
      showPassword
    };
  }
});
</script>

<style lang="scss">
.my-settings {
  &__container {
    margin-top: 75px;
    display: flex;
    flex-direction: row;
    padding-left: 12%;
    padding-right: 12%;
  }
  &__wrapper {
    &-right {
      flex-grow: 1;
      display: flex;
      justify-content: left;
      padding-left: 50px;
    }
  }

  &__content {
    width: 70%;
  }
  &__title {
    font-family: Raleway;
    font-size: 30px;
    color: #000000;
    font-weight: 800;
    padding-bottom: 50px;
  }

  &__subtitle {
    font-family: Raleway;
    font-size: 22px;
    color: #000000;
    font-weight: 700;
    margin-bottom: 25px;
  }

  &__divider {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  &__save {
    margin-top: 30px;
  }
}
</style>
