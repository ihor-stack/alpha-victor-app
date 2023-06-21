import { defineStore } from "pinia";
import { publicAPI } from '@/axios'
import { PublicAccount } from '@/types/index'
import { useCookies } from "vue3-cookies";

import loadingService from '@/services/loadingService';
import toastService from '@/services/toastService';

const { cookies } = useCookies();
  
export const Account = defineStore('Account', {
  state: () => {
    return {
      accountDetails: {} as PublicAccount,
    }
  },
  actions: {
   async getAccount() {
      publicAPI.get<PublicAccount>('/Account/PersonalDetails')
      .then(response => 
        {
          this.accountDetails = response.data
        }
      ).catch(error =>{
        toastService.show('Error', error, 'error', 'top');
      })
    },
 },
});