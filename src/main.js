import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import tooltipDirective from '@/directives/tooltip.directive'
import router from './router'
import store from './store'
import Loader from '@/components/app/Loader'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import 'materialize-css/dist/js/materialize.min.js'
import './registerServiceWorker'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date',dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)
Vue.directive('tooltip', tooltipDirective)


firebase.initializeApp({
  apiKey: "AIzaSyAmyYdv5cc1ZUUta1ydp4sHLI9BYc5_OJ4",
  authDomain: "ncrisisl.firebaseapp.com",
  databaseURL: "https://ncrisisl.firebaseio.com",
  projectId: "ncrisisl",
  storageBucket: "ncrisisl.appspot.com",
  messagingSenderId: "661600256027",
  appId: "1:661600256027:web:b5e905e65291204bc338be",
  measurementId: "G-4MB05L8Y3V"
});


let app

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      store,
      
      render: h => h(App)
    }).$mount('#app')
  }
  
})


