import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from 'firebase'
// Importing firebase features
require('@/plugins/firebase.js');
// Import main styles file including tailwind
import '@/assets/styles/main.css'
import VueNotification from '@mathieustan/vue-notification';
// Font awesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Trend from "vuetrend"

Vue.use(Trend)

library.add(faPencilAlt, faUserPlus, faSignOutAlt, faEdit, faChartLine)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(VueNotification);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        store.commit("SET_LOG_IN", true);
        store.dispatch('getUserData', firebaseUser.uid)
      }else {
        store.commit("SET_LOG_IN", false);
      }
    })
  }
}).$mount('#app')
