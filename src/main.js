import Vue from 'vue';
import App from './App.vue';

import Vuesax from 'vuesax';
import 'material-icons/iconfont/material-icons.css';
import 'vuesax/dist/vuesax.css';
Vue.use(Vuesax);

import axios from './axios.js';
Vue.prototype.$http = axios;

import './config/theme.js';

import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
