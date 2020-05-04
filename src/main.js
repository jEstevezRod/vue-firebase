import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
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
  render: h => h(App)
}).$mount('#app')
