<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <Loading ref="loader" v-slot="{ loading }" class="my-id__content" :callback="processQuery">
      <div class="my-id__wrapper">
        <v-skeleton-loader
          :loading="loading"
          type="heading, list-item-two-line, list-item-two-line, list-item-three-line"
        >
          <div class="my-id__title mb-3">Parent ID</div>
          <!-- Street Address -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="parent.streetAddress"
              :error-messages="errors"
              label="Street Address"
              outlined
            ></v-text-field>
          </validation-provider>

          <!-- City -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="parent.city"
              :error-messages="errors"
              label="City"
              outlined
            ></v-text-field>
          </validation-provider>

          <!-- State -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-select
              v-model="parent.state"
              :error-messages="errors"
              :items="stateOpts"
              label="State"
              outlined
            ></v-select>
          </validation-provider>

          <!-- Zipcode  -->
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="parent.zipcode"
              v-mask="'#####'"
              :error-messages="errors"
              label="Zipcode"
              outlined
              maxlength="5"
            ></v-text-field>
          </validation-provider>

          <!-- Request Stakeholder Access
          <div class="d-flex flex-row">
            <validation-provider v-slot="{ errors }" rules="required|email">
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="Request Stakeholder Access"
                placeholder="stakeholder@email.com"
                outlined
              ></v-text-field>
            </validation-provider>
            <v-btn class="mb-7 my-id__button--append" depressed outlined x-large>Refer</v-btn>
          </div> -->

          <!-- Refer Participant-->
          <div class="d-flex flex-row">
            <validation-provider v-slot="{ errors }" rules="required|email">
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="Invite Student Email"
                placeholder="participant@email.com"
                outlined
              ></v-text-field>
            </validation-provider>
            <Loading v-slot="{ loading: loadInvite, process }" :callback="sendInvite">
              <v-btn
                class="mb-7 my-id__button--append"
                depressed
                outlined
                x-large
                :loading="loadInvite"
                @click="process"
                >Invite</v-btn
              >
            </Loading>
          </div>
        </v-skeleton-loader>

        <Loading v-slot="{ loading: saving, process: save }" :callback="save">
          <v-btn
            :disabled="invalid"
            :loading="saving"
            :dark="!invalid"
            block
            large
            depressed
            @click="save"
          >
            Save
          </v-btn>
        </Loading>
      </div>
    </Loading>
  </ValidationObserver>
</template>
<script lang="ts">
import { reactive, toRefs, ref, Ref, onMounted, defineComponent } from '@vue/composition-api';

import { useUserGetters, useDbActions, useDbState } from '@/store';
import { ActionTypes } from '@/store/modules/db/actions';
import { GetterTypes } from '@/store/modules/auth/getters';
import { SendReferalInput, ParentPortfolio } from '@/generated/graphql';
import Loading from '@/components/Loading.vue';
import { ObjectId } from 'bson';
import { STATE } from '@/constants/portfolio';
import { THIS_PARENT } from '@/services/graphql/queries';
import { SEND_PARTICIPANTS_REFFERAL } from '@/services/graphql/mutations';

const { getObjectId } = useUserGetters([GetterTypes.getObjectId]);

export default defineComponent({
  name: 'ParentID',
  components: {
    Loading
  },
  setup(
    props,
    {
      emit,
      root: {
        $apolloProvider: {
          defaultClient: { query, mutate }
        }
      }
    }
  ) {
    const formOpt = reactive({ stateOpts: STATE });
    const details = reactive({
      parent: {
        streetAddress: '',
        city: '',
        state: '',
        zipcode: ''
      },
      email: ''
    });

    const loader: Ref<any> = ref(null);
    const emailSent = ref(false);

    onMounted(() => {
      loader.value!.process();
    });

    function processQuery() {
      return query<{ parentPortfolio: ParentPortfolio }>({
        query: THIS_PARENT,
        variables: { id: getObjectId.value }
      }).then(({ data: { parentPortfolio: res } }) => {
        if (res)
          Object.keys(details).forEach(key => {
            if (res[key]) details[key] = res[key];
          });
      });
    }

    const { user } = useDbState(['user']);
    function sendInvite() {
      return mutate({
        mutation: SEND_PARTICIPANTS_REFFERAL,
        variables: {
          email: details.email,
          id: getObjectId.value,
          name: `${user.value!.firstName} ${user.value!.lastName}`
        } as SendReferalInput
      }).then(() => {
        emailSent.value = true;
      });
    }

    const { update } = useDbActions([ActionTypes.update]);

    async function save() {
      await update({
        collection: 'ParentPortfolio',
        payload: {
          _id: getObjectId.value,
          parent: details.parent,
          email: details.email
        } as ParentPortfolio,
        filter: { _id: getObjectId.value },
        options: { upsert: true }
      });
      emit('input', 'Parent');
    }

    return {
      ...toRefs(details),
      ...toRefs(formOpt),
      save,
      processQuery,
      loader,
      sendInvite,
      emailSent
    };
  }
});
</script>
