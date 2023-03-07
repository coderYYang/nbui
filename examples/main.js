import Vue from 'vue'
import App from './App.vue'
import ProUi from '../packages'

Vue.use(ProUi)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
