import navbarSearchAndPinList from '@/layouts/components/navbar/navbarSearchAndPinList';
import themeConfig from '@/config/theme';
import colors from '@/config/theme';

const userDefaults = {
  uid: 0,
  displayName: 'John Doe',
  about:
    'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
  photoURL: require('@/assets/images/portrait/small/avatar-s-11.png'),
  status: 'online',
  userRole: 'admin'
};

const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo')) || {};

const getUserInfo = () => {
  let userInfo = {};

  Object.keys(userDefaults).forEach(key => {
    userInfo[key] = userInfoLocalStorage[key]
      ? userInfoLocalStorage[key]
      : userDefaults[key];
  });

  Object.keys(userInfoLocalStorage).forEach(key => {
    if (userInfo[key] == undefined && userInfoLocalStorage[key] != null)
      userInfo[key] = userInfoLocalStorage[key];
  });

  return userInfo;
};

const state = {
  AppActiveUser: getUserInfo(),
  bodyOverlay: false,
  isVerticalNavMenuActive: true,
  mainLayoutType: themeConfig.mainLayoutType || 'vertical',
  navbarSearchAndPinList: navbarSearchAndPinList,
  reduceButton: themeConfig.sidebarCollapsed,
  verticalNavMenuWidth: 'default',
  verticalNavMenuItemsMin: false,
  scrollY: 0,
  starredPages: navbarSearchAndPinList.data.filter(
    page => page.highlightAction
  ),
  theme: themeConfig.theme || 'light',
  themePrimaryColor: colors.primary,

  windowWidth: null
};

export default state;
