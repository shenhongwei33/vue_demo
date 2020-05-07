// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router/index'
import axios from 'axios'
import store from './store/store.js';
import vueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import i18n from './locale'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(vueAxios,axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  i18n,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
