import Vue from 'vue'
import App from './App.vue'
import components from './components/tk_widget/auto-reg.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import config from "./config.js"
import axios from "axios"
import api from "./utils/request"

Vue.use(ElementUI, {
  "size": "mini",
  zIndex: 0
});

Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$http = axios
Vue.prototype.$api = api
Vue.use(components)

window._ = require('lodash');

// 挂载到全局
window._VUE = new Vue({
  store,
  render: h => h(App)
}).$mount('#app')