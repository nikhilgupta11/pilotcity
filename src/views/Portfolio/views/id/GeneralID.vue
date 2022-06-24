<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <Loading ref="loader" v-slot="{ loading }" class="my-id__content" :callback="processQuery">
      <div class="my-id__wrapper">
        <v-skeleton-loader
          :loading="loading"
          type="heading, list-item-two-line, list-item-two-line, list-item-three-line"
        >
          <div class="my-id__title mb-3">General</div>

          <validation-provider v-slot="{ errors }" slim rules="required">
            <v-text-field
              v-model="firstName"
              :error-messages="errors"
              label="First Name"
              outlined
            ></v-text-field>
          </validation-provider>

          <validation-provider v-slot="{ errors }" slim rules="required">
            <v-text-field
              v-model="lastName"
              :error-messages="errors"
              label="Last Name"
              outlined
            ></v-text-field>
          </validation-provider>

          <validation-provider v-slot="{ errors }" slim rules="required|email">
            <v-text-field
              v-model="email"
              :error-messages="errors"
              label="Email"
              outlined
              :disabled="isEmailAvailable"
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

          <validation-provider slim>
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
        </v-skeleton-loader>

        <Loading v-slot="{ loading: saving, process: save }" :callback="save">
          <v-btn
            :disabled="invalid || !isValid || !validEmail || !phoneValid || !isPhoneCheck"
            :loading="saving || isSetting"
            :dark="!invalid && isValid && validEmail && phoneValid && isPhoneCheck"
            large
            depressed
            @click="save"
            >Save</v-btn
          >
        </Loading>
      </div>
      <v-alert v-if="msg" class="mt-3" type="error" style="font-size: 16px">{{ msg }}</v-alert>
    </Loading>
  </ValidationObserver>
</template>
<script lang="ts">
import {
  Ref,
  reactive,
  ref,
  toRefs,
  onMounted,
  defineComponent,
  computed
} from '@vue/composition-api';
import { useUserGetters, useDbActions, useRealmAppState, useDbGetters } from '@/store';
import axios from 'axios';
import Loading from '@/components/Loading.vue';
import { GetterTypes } from '@/store/modules/auth/getters';
import { ActionTypes } from '@/store/modules/db/actions';
import { User } from '@/generated/graphql';
import { CITIZEN_TYPES } from '@/constants/portfolio';
import ATeleInput from '@/components/atoms/ATeleInput.vue';
import { THIS_GENERAL_USER } from '@/services/graphql/queries';

export default defineComponent({
  name: 'GeneralID',
  components: {
    Loading,
    ATeleInput
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  setup(
    _props,
    {
      emit,
      root: {
        $apolloProvider: {
          defaultClient: { query }
        }
      }
    }
  ) {
    const { getObjectId } = useUserGetters([GetterTypes.getObjectId]);
    // Page Setup
    const AVAILABLE_IDS = ref(CITIZEN_TYPES);
    const show = ref(false);
    const showPassword = ref(false);
    const user = reactive({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      formattedNumber: '',
      email: '',
      userTypes: [],
      confirm_email: ''
    });
    const isEmailAvailable = ref(false);
    const showConfirmEmail = ref(false);
    const isPhoneAvailable = ref(false);
    const loader: Ref<any> = ref(null);
    const isOpenDialog = ref(false);
    const isPhoneValid = ref(false);
    const isSetting = ref(false);
    const passwordValue = ref('');
    const isChecked = ref(false);
    const msg = ref('');

    const isValid = computed(() => {
      if (passwordValue.value.length >= 6 && isPhoneAvailable.value) {
        return true;
      }
      if (isEmailAvailable.value) {
        return true;
      }
      return false;
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

    function setPasswordValue(val) {
      passwordValue.value = val;
      isOpenDialog.value = false;
      isChecked.value = true;
    }

    function getValidation(val) {
      if (val && val.countryCallingCode && val.formatted && val.valid) {
        user.formattedNumber = `+${val.countryCallingCode}${val.formatted}`;
      } else {
        user.formattedNumber = '';
      }
      isPhoneValid.value = val.valid;
    }

    const phoneValid = computed(() => {
      if (isPhoneValid.value && user.phoneNumber) {
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

    function processQuery() {
      return query<{ user: User }>({
        query: THIS_GENERAL_USER,
        variables: { id: getObjectId.value }
      }).then(({ data: { user: userRes } }) => {
        // Set Query result when loaded
        if (userRes.email) {
          isEmailAvailable.value = true;
        }
        if (userRes.phoneNumber) {
          isPhoneAvailable.value = true;
        }
        Object.keys(user).forEach(key => {
          if (userRes && userRes[key]) user[key] = userRes[key];
          if (userRes && userRes.phoneNumber) user.phoneNumber = userRes.phoneNumber.substring(2);
        });
      });
    }

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
        }
        isSetting.value = false;
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
        console.log(res.data);
        if (res.data) {
          emit('input', user.userTypes);
        }
        isSetting.value = false;
      } catch (error) {
        console.log(error);
        msg.value = error?.response?.data?.error?.description;
        isSetting.value = false;
      }
    }

    // Upload Functionality
    const { collection } = useDbGetters(['collection']);
    const { update } = useDbActions([ActionTypes.update]);
    const { app } = useRealmAppState(['app']);
    async function save() {
      msg.value = '';
      let validateRecord = null;
      if (isPhoneAvailable.value && !isEmailAvailable.value) {
        validateRecord = await collection.value!('User').findOne({
          email: user.email
        });
      } else if (isEmailAvailable.value && user.phoneNumber && !isPhoneAvailable.value) {
        validateRecord = await collection.value!('User').findOne({
          phoneNumber: user.formattedNumber
        });
      }
      console.log(validateRecord);
      if (!validateRecord) {
        await update({
          collection: 'User',
          payload: {
            _id: getObjectId.value,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.formattedNumber,
            userTypes: user.userTypes,
            email: user.email.toLowerCase()
          } as User,
          filter: { _id: getObjectId.value },
          options: { upsert: true }
        }).then(res => {
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
      } else {
        msg.value = 'Email or Phone already exists';
      }
    }
    onMounted(() => {
      loader.value!.process();
    });

    return {
      AVAILABLE_IDS,
      ...toRefs(user),
      save,
      processQuery,
      loader,
      isEmailAvailable,
      isPhoneAvailable,
      isOpenDialog,
      isSetting,
      setPassword,
      setPasswordValue,
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
      showPassword,
      isPhoneCheck
    };
  }
});
</script>

<style scoped>
.error-alert {
  color: red;
  font-size: 11px;
  margin-bottom: 20px;
  margin-top: -25px;
}
</style>
