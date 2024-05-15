import { defineStore } from 'pinia'

export const useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,
      refresh: false,
    }
  },
})
