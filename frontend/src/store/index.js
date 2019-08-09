import Vuex from "vuex";
import Vue from "vue";
import UserStore from "./modules/UserStore";
//import VuexPersist from "vuex-persist";

// Load Vuex
Vue.use(Vuex);

// const vuexLocalStorage = new VuexPersist({
//   key: "vuex",
//   storage: window.localStorage
// });

// Create store
export default new Vuex.Store({
  modules: {
    UserStore
  }
  // plugins: [vuexLocalStorage.plugin]
});
