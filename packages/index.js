// 导入组件
import ProPagination from './ProPagination'
import ProSearch from './ProSearch'
import ProTable from './ProTable'

// 使用到其它组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 组件列表
const components = [ProPagination, ProSearch, ProTable]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = function (Vue) {
  if (install.installed) return
  Vue.use(ElementUI, { size: 'mini' })
  components.map((component) => Vue.component(component.name, component))
}

// 这里export default是提供给全局引入使用
export default {
  install,
  ProPagination,
  ProSearch,
  ProTable
}

// 这里export是提供给按需引入使用
export { ProPagination, ProSearch, ProTable }
