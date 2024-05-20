import type { App, Component } from 'vue' // Import the necessary types

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'

interface GlobalComponents {
  [key: string]: Component
}

const allGlobalComponents: GlobalComponents = { SvgIcon, Category }

export default {
  install(app: App) { // Provide explicit type for the app parameter
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key])
    })

    for (const [key, component] of Object.entries(ElementPlusIconsVue))
      app.component(key, component as Component) // Provide explicit type for the component
  },
}
