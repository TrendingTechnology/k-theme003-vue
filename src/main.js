import Vue from 'vue';
import App from './App.vue';

import Vuesax from 'vuesax';
import 'material-icons/iconfont/material-icons.css';
import 'vuesax/dist/vuesax.css';
Vue.use(Vuesax);

import axios from './service/http/axios';
Vue.prototype.$http = axios;

import './service/http/requests';

import './config/theme.js';

import router from './router';
import store from './store';
import i18n from './i18n';
import acl from './acl';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  acl,
  render: h => h(App)
}).$mount('#app');
