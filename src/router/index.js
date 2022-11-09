import Vue from 'vue';
import Router from 'vue-router';
import MethodsBrowser from '@/components/MethodsBrowser';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MethodsBrowser',
      component: MethodsBrowser,
    },
  ],
});
