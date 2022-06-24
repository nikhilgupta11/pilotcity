<template>
  <div>
    <div class="d-flex flex-row iframe-content" style="height: 100vh">
      <iframe
        :src="embeddedUrl"
        allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
        style="height: 100%; width: 100%"
        height="100%"
        width="100%"
      >
      </iframe>
      <AButton
        class="close white--text font-weight-bold"
        fab
        elevation="3"
        color="#cccccc99"
        @click="closebtn"
      >
        <v-icon left>mdi-close</v-icon>
      </AButton>
      <AButton
        v-if="!user"
        class="ma-2 white--text onboard font-weight-bold"
        color="blue"
        x-large
        dark
        rounded
        depressed
        @click="invitationModal = true"
      >
        Get Started
      </AButton>
    </div>
    <v-dialog
      v-model="invitationModal"
      :width="$vuetify.breakpoint.xs ? '100%' : '70vw'"
      persistent
    >
      <v-card style="position: relative">
        <AButton class="ma-5 modal-close" icon @click="invitationModal = false">
          <v-icon x-large color="grey">mdi-close</v-icon>
        </AButton>
        <div v-if="user" class="d-flex flex-row">
          <SetupPortfolio :user-type-list="user.userTypes" @closeModal="close" />
        </div>
        <div v-else class="d-flex flex-row" style="height: 100vh">
          <OLogin v-if="isLogin" :is-invite="true" :invite-id="inviteId" @signup="changeView" />
          <OSignup v-else :is-invite="true" :invite-id="inviteId" @login="changeView" />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import axios from 'axios';
import { useDbState } from '@/store';
import OSignup from '@/views/Auth/OSignup.vue';
import OLogin from '@/views/Auth/OLogin.vue';
import AButton from '@/components/atoms/AButton.vue';
import SetupPortfolio from '@/views/Portfolio/SetupPortfolio.vue';

export default {
  components: {
    OSignup,
    OLogin,
    SetupPortfolio,
    AButton
  },
  setup(props, ctx) {
    const invitationModal = ref(false);
    const isFetching = ref(false);
    const embeddedUrl = ref('');
    const isLogin = ref(false);
    const isPreview = ref(false);
    const inviteId = ref('');
    const { user } = useDbState(['user']);

    if (ctx.root.$route.query.isLogin) {
      isLogin.value = true;
    }

    if (ctx.root.$route.query.isPreview) {
      isPreview.value = true;
    }

    function changeView(val) {
      isLogin.value = !isLogin.value;
    }

    function close() {
      invitationModal.value = false;
    }

    async function triggerHubspot() {
      const API_ENDPOINT = process.env.VUE_APP_HUBSPOT_EVENT;

      const data = {
        event_type: 'visited',
        email: user.value?.email
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
        id: inviteId.value,
        event_type: 'sign_up',
        username: user.value?.email
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

    async function fetchInvite() {
      isFetching.value = true;
      const API_ENDPOINT = process.env.VUE_APP_VIDASK_SERVICE;
      try {
        const resp = await axios.get(
          `${API_ENDPOINT}/verify-slug?slug=${ctx.root.$route.params.slug}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        inviteId.value = resp.data.data.id;
        if (resp.data.data.slug_exists) {
          if (!isPreview.value) invitationModal.value = true;
          embeddedUrl.value = resp.data.data.videoask_link;
        } else {
          console.log('404');
          ctx.root.$router.push({ name: '404' });
        }
        isFetching.value = false;
        if (user.value?.email) {
          triggerHubspot();
        }
        if (resp.data.data.id && user.value?.email) {
          createHubspot();
        }
      } catch (err) {
        ctx.root.$router.push({ name: '404' });
        console.log(err);
        isFetching.value = false;
      }
    }

    fetchInvite();

    function closebtn() {
      if (user.value) {
        ctx.root.$router.push({ name: 'portfolio' });
      } else {
        ctx.root.$router.push({ name: 'landing' });
      }
    }

    return {
      invitationModal,
      inviteId,
      closebtn,
      fetchInvite,
      embeddedUrl,
      user,
      isLogin,
      changeView,
      close,
      isPreview
    };
  }
};
</script>

<style lang="scss" scoped>
.iframe-content {
  position: relative;
}
.close {
  position: absolute;
  top: 20px;
  right: 28px;
}
.modal-close {
  position: absolute;
  right: 0;
  z-index: 1;
}
.onboard {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.v-application--is-ltr .v-btn__content .v-icon--left {
  margin: 0;
}
.v-btn__content {
  justify-content: center !important;
}
</style>
