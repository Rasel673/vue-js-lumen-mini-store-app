// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
window.axios=axios
axios.defaults.baseURL = 'http://localhost/blog/public';
Vue.config.productionTip = false

var eventBus=new Vue();
Vue.prototype.$eventBus=eventBus;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
