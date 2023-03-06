import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'

import { deepClone } from './utils/index.js'

import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$deepClone = deepClone

Vue.use(ElementUI, { size: 'mini' })

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
