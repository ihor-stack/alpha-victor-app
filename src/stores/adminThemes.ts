import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {AdminTheme} from '@/types/index'
import { useCookies } from "vue3-cookies";
import loadingService from '@/services/loadingService';
import toastService from '@/services/toastService';

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
        toastService.show('Error', error, 'error', 'top');
      })
    },
    async saveThemes() {
      adminAPI.patch('/Organisation/' + cookies.get('orgId') + '/Theme', this.theme)
      .then(() => 
        {
          toastService.show('Success', 'Theme information updated', 'success', 'top');
        }
      ).catch(error =>{
        toastService.show('Error', error, 'error', 'top');
      })
    },
 },
 getters: {
  getTheme: (state) => state.theme,
},
});