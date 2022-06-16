import Vue from 'vue'
import App from './App.vue'
import components from './components/auto-reg.js'

Vue.config.productionTip = false
Vue.use(components)

new Vue({
  render: h => h(App)
}).$mount('#app')
