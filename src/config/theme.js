let colors = {
  primary: '#7367F0',
  success: '#28C76F',
  danger: '#EA5455',
  warning: '#FF9F43',
  dark: '#1E1E1E'
};

import Vue from 'vue';
import Vuesax from 'vuesax';
Vue.use(Vuesax, { theme: { colors } });

const themeConfig = {
  disableCustomizer: false,
  disableThemeTour: false,
  footerType: 'static', // static(default) / sticky / hidden
  hideScrollToTop: false,
  mainLayoutType: 'vertical', // vertical(default) / horizontal
  navbarColor: '#fff',
  navbarType: 'floating', // floating(default) / static / sticky / hidden
  routerTransition: 'zoom-fade', // none(default) / zoom-fade / slide-fade / fade-bottom / fade / zoom-out
  sidebarCollapsed: false,
  theme: 'light', // light(default), dark, semi-dark
  userInfoLocalStorageKey: 'userInfo'
};

export default themeConfig;
