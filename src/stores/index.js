import {defineStore} from "pinia";

export const useStore = defineStore('store',{
    state: () => {
      return {
        user: null,
        data: null,
      }
    },
    persist: {
      enabled: true , // 这个配置代表存储生效，而且是整个store都存储
    }
  })

