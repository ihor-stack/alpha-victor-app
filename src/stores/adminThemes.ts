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
      loadingService.show("Loading...");

      const themeToSave = {
        darkmodeEnabled: this.theme.darkmodeEnabled,
        primaryColour: this.theme.primaryColour,
        secondaryColour: this.theme.secondaryColour,
        logoBase64Payload: this.theme.logoBase64Payload,
        logoFileName: this.theme.logoFileName,
        logoContentType: this.theme.logoContentType,
        backgroundBase64Payload: this.theme.backgroundBase64Payload,
        backgroundFileName: this.theme.backgroundFileName,
        backgroundContentType: this.theme.backgroundContentType,
      };

      adminAPI.patch('/Organisation/' + cookies.get('orgId') + '/Theme', themeToSave)
      .then(() => 
        {
          toastService.show('Success', 'Theme information updated', 'success', 'top');
        }
      ).catch(error =>{
        toastService.show('Error', error, 'error', 'top');
      }).finally(() => {
        loadingService.close();
      });
    },

    removeLogo() {
      loadingService.show("Loading...");
      adminAPI.delete('/Organisation/' + cookies.get('orgId') + '/ClearLogo')
      .then(() => 
        {
          toastService.show('Success', 'Logo removed successfully', 'success', 'top')
          this.getThemes()
        }
      ).catch(error =>{
        toastService.show('Error', error, 'error', 'top')
      }).finally(() => {
        loadingService.close()
      });
    },

    removeBackgroundImage() {
      loadingService.show("Loading...");
      adminAPI.delete('/Organisation/' + cookies.get('orgId') + '/ClearBackground')
      .then(() => 
        {
          toastService.show('Success', 'Logo removed successfully', 'success', 'top')
          this.getThemes()
        }
      ).catch(error =>{
        toastService.show('Error', error, 'error', 'top')
      }).finally(() => {
        loadingService.close()
      });
    },
 },
 getters: {
  getTheme: (state) => state.theme,
},
});