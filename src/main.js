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

Vue.use(VueNotification);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log('LOGGED_IN')
        store.commit("SET_LOG_IN", true);
        store.commit("SET_USER_DATA", firebaseUser);
      }else {
        console.log('LOGGED_OUT')
      }
    })
  }
}).$mount('#app')
