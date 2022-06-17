import Vue from 'vue'
import App from './App.vue'
import components from './components/auto-reg.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.use(components)

new Vue({
  render: h => h(App)
}).$mount('#app')