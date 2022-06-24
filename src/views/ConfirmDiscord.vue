<template>
  <div class="d-flex justify-center align-center mt-12">
    <div class="d-flex justify-center align-center flex-column mt-12">
      <div class="d-flex justify-center align-center mt-12">
        <v-icon color="grey lighten-1" x-large>mdi-discord</v-icon>
      </div>
      <div :class="`${color}--text`" class="headline d-flex justify-center align-center mt-6">
        <div>{{ displayMessage }}</div>
      </div>
      <div
        v-if="color === 'red'"
        class="font-weight-black overline mt-4 mb-4 d-flex flex-column justify-center"
      >
        <p color="grey lighten-1">Close tab and try again</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, Ref, computed } from '@vue/composition-api';
import axios from 'axios';
import { ObjectId } from 'bson';
import { useUserGetters, useDbActions, useToolActions, useDbGetters } from '@/store';

export default {
  name: 'ConfirmDiscord',

  props: {
    code: {
      type: String,
      required: true
    }
  },

  setup(props, vm) {
    const { getObjectId } = useUserGetters(['getObjectId']);
    const { collection } = useDbGetters(['collection']);
    const color = ref('grey');
    const email = ref('');
    const displayMessage = ref('..... Earth to Discord');
    const confirmationError = ref(false);

    const studentDoc: Ref<{
      data: Record<string, any>; // Gives access to Document
      update: (shouldMarkAsComplete?) => Promise<any>; // Gives access to update Method
      changeStream: any; // Gives access to mongodb Collection Changestream
    }> = ref({
      data: {},
      update: async () => null,
      changeStream: undefined
    });

    const programId = computed(() => {
      return localStorage.getItem('programId');
    });

    const params = new URLSearchParams();
    params.append('client_id', process.env.VUE_APP_DISCORD_CLIENT_ID as string);
    params.append('client_secret', process.env.VUE_APP_DISCORD_CLIENT_SECRET as string);
    params.append('grant_type', 'authorization_code');
    params.append('code', props.code as string);
    params.append('redirect_uri', process.env.VUE_APP_DISCORD_REDIRECT as string);
    params.append('scope', 'identify email guilds.join gdm.join');

    const verifyToken = async doc => {
      const API_ENDPOINT = 'https://discord.com/api/oauth2/token';
      try {
        const resp = await axios.post(API_ENDPOINT, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        const index = doc.adks.findIndex(obj => obj.name === 'community');
        studentDoc.value.data.adks[index].discordInfo = {
          discordAccessToken: resp.data.access_token,
          discordRefreshToken: resp.data.refresh_token
        };
        studentDoc.value.update().then(() => {
          setTimeout(function () {
            window.location.href = `/guide/${programId.value}/2`;
          }, 1000);
        });
        localStorage.removeItem('programId');
      } catch (err) {
        console.log(err);
        confirmationError.value = true;
        setTimeout(function () {
          window.location.href = `/guide/${programId.value}/2`;
        }, 1000);
        localStorage.removeItem('programId');
      }
    };

    const getStudentDoc = () =>
      collection.value!('Student')
        .findOne({
          program_id: new ObjectId(programId.value),
          participant_id: getObjectId.value
        })
        .then(doc => {
          if (doc) {
            studentDoc.value = {
              _id: doc._id,
              data: doc,
              update: async (
                shouldMarkAsComplete: () => {
                  isComplete: boolean;
                  adkIndex: number;
                }
              ) => {
                if (shouldMarkAsComplete) {
                  const { isComplete, adkIndex } = shouldMarkAsComplete();
                  // if user has completed the module & field hasn't been set
                  const adk = studentDoc.value?.data.adks?.[adkIndex];
                  if (isComplete && !adk.completed) {
                    adk.completed = new Date();
                  }
                }

                return collection.value!('Student').findOneAndUpdate(
                  {
                    _id: doc._id
                  },
                  {
                    ...studentDoc.value?.data,
                    lastSaved: new Date()
                  }
                );
              }
            } as any;
          }
          verifyToken(doc);
        });

    const { setLinearLoader } = useToolActions(['setLinearLoader']);
    const closeWindow = () => window.close();

    onMounted(async () => {
      await setLinearLoader({ func: getStudentDoc });
      if (confirmationError.value) {
        color.value = 'red';
        displayMessage.value = 'Uh oh... We got discombobulated';
      } else {
        color.value = 'green';
        displayMessage.value = 'Your account has been linked, close this tab.';
      }
    });

    return {
      confirmationError,
      displayMessage,
      studentDoc,
      color,
      email,
      closeWindow,
      getStudentDoc,
      programId
    };
  }
};
</script>

<style lang="scss">
.confirdiscordl {
  &__title {
    margin-top: 15%;
  }
}
</style>
