import state from './moduleECommerceState.js';
import mutations from './moduleECommerceMutations.js';
import actions from './moduleECommerceActions.js';
import getters from './moduleECommerceGetters.js';

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
