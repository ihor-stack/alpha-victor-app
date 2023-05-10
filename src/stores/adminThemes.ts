import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {AdminTheme} from '@/types/index'
import { useCookies } from "vue3-cookies";
import { Alert } from "./globalAlert";

const { cookies } = useCookies();
  
export const Theme = defineStore('Themes', {
  state: () => {
    return {
      theme: {} as AdminTheme,
    }
  },
  actions: {
   async getThemes() {
      adminAPI.get<AdminTheme>('/Organisation/' + cookies.get('orgId') + '/Theme').then(response => 
        {
          this.theme = response.data
        }
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async saveThemes() {
      adminAPI.patch('/Organisation/' + cookies.get('orgId') + '/Theme', this.theme)
      .then(response => 
        {
          console.log(response)
        }
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
 },
 getters: {
  getTheme: (state) => state.theme,
},
});