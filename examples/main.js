import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import ProUi from '../packages'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ProUi)
Vue.use(ElementUI, { size: 'mini' })

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
