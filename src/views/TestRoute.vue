<template>
  <div>
    <h1>{{ token }}</h1>
    <div>
      <a class="button is-primary" :href="redirectUrl1">redirect me</a>
      <button @click="firstapi()">apii</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, watch, computed } from '@vue/composition-api';
// import { watch } from 'vue';

export default {
  name: 'TestRoute',
  setup(props, vm) {
    // const firstApiUrl = computed(() => {
    //   return vm.root.$route;
    // });
    const firstApiUrl = ref(vm.root.$route);
    console.log(firstApiUrl);
    // const firstApiUrl = ref('');
    // const firstApiData = ref('vm.root.$route;');
    const redirectUrl = ref('');
    // const urlCode = ref(vm.root.$route.query.code);
    const urlCode = computed(() => {
      return vm.root.$route.query.code;
    });
    const token = ref('');

    const redirectUrl1 = ref('');
    const firstapi = async () => {
      const url11 = await axios
        .get(
          'https://google-service-dev.api.pilotcity.com/google-auth-url?redirect_uri=http://localhost:8080/testroute',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('apollo-token')}`
            }
          }
        )
        .then(res => {
          redirectUrl.value = res.data.data;
          return res.data.data;
        });
      // .catch(err => console.log(err.response));
      redirectUrl1.value = url11;
      console.log(url11);
    };
    console.log(redirectUrl1);
    watch(firstApiUrl => {
      if (firstApiUrl.value.fullpath.indexOf('testroute') === 1) {
        this.firstapi();
      }
    });

    const secondapi = () => {
      axios
        .get(
          `https://google-service-dev.api.pilotcity.com/google-auth-token?code=${urlCode}&redirect_uri=http://localhost:8080/testroute`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('apollo-token')}`
            }
          }
        )
        .then(res => {
          token.value = res.data.data.access_token;
          console.log(res.data.data.access_token);
        })
        .catch(err => console.log(err.response));
    };

    watch(urlCode, async (newvalue, oldvalue) => {
      if (newvalue.value.fullpath.indexOf('4') === 1) {
        this.secondapi();
      }
    });
    return {
      firstApiUrl,
      redirectUrl,
      urlCode,
      token,

      firstapi,
      secondapi,
      redirectUrl1
    };
  }
};
</script>
