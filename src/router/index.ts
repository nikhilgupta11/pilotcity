import Vue from 'vue';
import VueRouter from 'vue-router';
import { ObjectId } from 'bson';
import store, { useUserGetters, useDbGetters, useUserActions } from '../store';
import { MutationTypes } from '../store/modules/user/mutations';
import routes from './routes';

const { collection } = useDbGetters(['collection']);
const { fetchUser, forcedLogout } = useUserActions(['fetchUser', 'forcedLogout']);

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const { getUser, getObjectId } = useUserGetters(['getUser', 'getObjectId']);

router.beforeEach(async (to, from, next) => {
  if (!getUser.value && localStorage.getItem('apollo-token')) {
    await fetchUser(localStorage.getItem('apollo-token'));
  }
  if (getUser.value?.forceChangedPwd && localStorage.getItem('apollo-token')) {
    await forcedLogout();
  }
  if (to.matched.some(record => record.meta.requiresAuth || record.meta.requiresUser)) {
    if (!getUser.value) {
      next({
        name: 'login',
        params: {
          page: to.name!
        }
      });
    }
    next();

    if (getUser.value) {
      if (to.meta.requiresUser) {
        collection.value!('User')
          .findOne({
            _id: new ObjectId(getObjectId.value)
          })
          .then(user => {
            if (user && user.userTypes) {
              next();
            } else {
              next({ name: 'setup' });
            }
          })
          .catch(() => {
            next({ name: 'setup' });
          });
      } else next();
    } else next({ name: 'login', params: { page: to.path } });
  } else next();
});

export default router;
