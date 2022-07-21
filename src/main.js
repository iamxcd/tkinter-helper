import Vue from 'vue'
import App from './App.vue'
import components from './components/tk_widget/auto-reg.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'



Vue.use(ElementUI, {
  "size": "mini",
  zIndex: 0
});

Vue.config.productionTip = false
Vue.use(components)

window._ = require('lodash');

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')