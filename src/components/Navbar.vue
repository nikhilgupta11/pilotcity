<template>
  <v-toolbar depressed flat color="primary" height="75">
    <a href="https://www.pilotcity.com/"
      ><img src="@/assets/Pilotcity_logo.png" class="nav__logo" />
    </a>

    <v-toolbar-title
      ><span class="text-h5 signup__header font-weight-black text-sm-h4"></span
    ></v-toolbar-title>

    <v-progress-linear
      v-if="loading"
      :active="loading"
      :indeterminate="loading"
      absolute
      bottom
      color="blue"
    ></v-progress-linear>

    <v-spacer></v-spacer>

    <div class="d-flex flex-row align-center">
      <div class="mobile-hamburger-menu" @click="openMenu">
        <v-icon>mdi-menu</v-icon>
      </div>
      <div v-show="menuList" class="menu-items">
        <v-btn
          v-if="!user"
          depressed
          large
          rounded
          color="white"
          outlined
          class="mr-4 ml-2"
          :to="{ name: 'login' }"
          :ripple="false"
        >
          <span class="font-weight-bold">Login</span>
        </v-btn>
        <v-btn
          v-if="!user"
          class="white--text mr-2 ml-2"
          depressed
          large
          rounded
          color="#828282"
          :ripple="false"
          :to="{ name: 'signup' }"
        >
          <span class="font-weight-bold">Signup</span>
        </v-btn>

        <v-btn
          v-if="user"
          class="mr-2 ml-2"
          large
          depressed
          rounded
          dark
          color="green"
          :ripple="false"
          @click="$router.push({ name: 'explore' })"
          ><v-icon left>mdi-sign-direction</v-icon>
          <span class="font-weight-bold">Explore Programs</span>
        </v-btn>

        <v-btn
          v-if="user && user.userTypes.includes('Employer')"
          class="mr-2 ml-2"
          large
          depressed
          rounded
          dark
          color="purple"
          :ripple="false"
          @click="$router.push({ name: 'createProgram' })"
          ><v-icon left>mdi-plus-outline</v-icon>
          <span class="font-weight-bold">Create Program</span>
        </v-btn>

        <v-btn
          v-if="user"
          class="ml-2"
          :class="$vuetify.breakpoint.xs ? 'mr-2' : 'mr-4'"
          large
          depressed
          rounded
          outlined
          color="white"
          :ripple="false"
          to="/portfolio"
        >
          <v-icon left>mdi-fingerprint</v-icon>
          <span class="font-weight-bold">My Portfolio</span>
        </v-btn>
      </div>
      <div class="menu-items-desktop">
        <v-btn
          v-if="!user"
          depressed
          large
          rounded
          color="white"
          outlined
          class="mr-4 ml-2"
          :to="{ name: 'login' }"
          :ripple="false"
        >
          <span class="font-weight-bold">Login</span>
        </v-btn>
        <v-btn
          v-if="!user"
          class="white--text mr-2 ml-2"
          depressed
          large
          rounded
          color="#828282"
          :ripple="false"
          :to="{ name: 'signup' }"
        >
          <span class="font-weight-bold">Signup</span>
        </v-btn>

        <v-btn
          v-if="user"
          class="mr-2 ml-2"
          large
          depressed
          rounded
          dark
          color="green"
          :ripple="false"
          @click="$router.push({ name: 'explore' })"
          ><v-icon left>mdi-sign-direction</v-icon>
          <span class="font-weight-bold">Explore Programs</span>
        </v-btn>

        <v-btn
          v-if="user && user.userTypes.includes('Employer')"
          class="mr-2 ml-2"
          large
          depressed
          rounded
          dark
          color="purple"
          :ripple="false"
          @click="$router.push({ name: 'createProgram' })"
          ><v-icon left>mdi-plus-outline</v-icon>
          <span class="font-weight-bold">Create Program</span>
        </v-btn>

        <v-btn
          v-if="user"
          class="mr-4 ml-2"
          large
          depressed
          rounded
          outlined
          color="white"
          :ripple="false"
          to="/portfolio"
        >
          <v-icon left>mdi-fingerprint</v-icon>
          <span class="font-weight-bold">My Portfolio</span>
        </v-btn>
      </div>
      <v-menu v-if="user" offset-y :ripple="false">
        <template #activator="{ on, attrs }">
          <v-btn v-if="user" icon large color="primary" dark depressed v-bind="attrs" v-on="on">
            <Profile :size="45" />
          </v-btn>
        </template>
        <v-btn class="navbar__logout" color="primary" dark depressed @click="logout">Logout</v-btn>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<script lang="ts">
import { onLogout } from '@/vue-apollo';

import { useAuthActions, useDbState } from '@/store';
import Profile from '@/components/Profile.vue';

export default {
  components: {
    Profile
  },

  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  setup(_props, ctx) {
    const { logout: logoutProcess } = useAuthActions(['logout']);
    const { user } = useDbState(['user']);

    const logout = async () => {
      await logoutProcess();
      await onLogout();
      // ctx.root.$router.push({ name: 'login' });
      window.location.href = '/login';
    };

    return {
      logout,
      user
    };
  },

  data() {
    return {
      menuList: false
    };
  },

  methods: {
    openMenu() {
      this.menuList = !this.menuList;
    }
  }
};
</script>

<style lang="scss">
header {
  z-index: 9;
}

.navbar__logout {
}

.mobile-hamburger-menu {
  display: none;

  @media (max-width: 991px) {
    display: block;

    i {
      font-size: 32px !important;
      color: #fff !important;
      margin-right: 10px;
    }
  }
}

.menu-items-desktop {
  display: flex;

  @media (max-width: 991px) {
    display: none;
  }
}

.menu-items {
  @media (max-width: 991px) {
    display: flex;
    flex-direction: column;
    background-color: #4f4f4f;
    border-radius: 0;
    position: absolute;
    top: 76px;
    z-index: 99999;
    padding: 20px 10px;
    left: 0;
    right: 0;

    button {
      margin-bottom: 15px;
    }
  }
}
.nav__logo {
  width: 40px;
  height: 50px;
  margin-left: 20px;
}

.nav__logo2 {
  width: 35px;
  height: 43.75px;
}
</style>
