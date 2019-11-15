import state from "./moduleDataListState.js";
import mutations from "./moduleDataListMutations.js";
import actions from "./moduleDataListActions.js";
import getters from "./moduleDataListGetters.js";

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
