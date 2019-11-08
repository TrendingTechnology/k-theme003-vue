import state from './moduleEmailState.js';
import mutations from './moduleEmailMutations.js';
import actions from './moduleEmailActions.js';
import getters from './moduleEmailGetters.js';

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
