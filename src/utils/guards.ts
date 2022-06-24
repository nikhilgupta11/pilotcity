import VueRouter from 'vue-router';
import { watch } from '@vue/composition-api';
import { useUserGetters } from '@/store';

const { getUser } = useUserGetters(['getUser']);
const redirectIfLoggedIn = ($router: VueRouter) =>
  watch(
    getUser,
    user => {
      if (user) {
        $router.push({ name: 'setup' });
      }
    },
    {
      immediate: true
    }
  );
// eslint-disable-next-line import/prefer-default-export
export { redirectIfLoggedIn };
