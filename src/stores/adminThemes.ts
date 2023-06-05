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

    saveThemes() {
      const themeToSave = {
        darkmodeEnabled: this.theme.darkmodeEnabled,
        primaryColour: this.theme.primaryColour,
        secondaryColour: this.theme.secondaryColour,
        logo: this.theme.logoBase64Payload,
        logoFileName: this.theme.logoFileName,
        logoContentType: this.theme.logoContentType,
        backgroundImage: this.theme.backgroundImage,
      };

      adminAPI.patch('/Organisation/' + cookies.get('orgId') + '/Theme', themeToSave)
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