import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'

const allGlobalComponents = { SvgIcon, Category }

export default {
  install(app) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key])
    })

    for (const [key, component] of Object.entries(ElementPlusIconsVue))
      app.component(key, component)
  },
}
