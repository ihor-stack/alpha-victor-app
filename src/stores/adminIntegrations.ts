import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {Integration} from '@/types/index'
import { useCookies } from "vue3-cookies";
import loadingService from '@/services/loadingService';
import toastService from '@/services/toastService';

const { cookies } = useCookies();
  
export const Integrations = defineStore('Integrations', {
  state: () => {
    return {
      integrations: [] as Integration[],
      integration: {} as Integration
    }
  },
  actions: {
    async getIntegrations() {
      adminAPI.get<Integration[]>('/Organisation/' + cookies.get('orgId') + '/Integration')
      .then(response => 
        {
          this.integrations = response.data
        }
      ).catch(error =>{
        toastService.show('Error', error, 'error', 'top');
      })
    },
    async getSingleIntegration() {
      adminAPI.get<Integration>
      ('/Organisation/' + cookies.get('orgId') + '/Integration/' + cookies.get('integrationId'))
      .then(response => 
        {
          this.integration = response.data
        }
      ).catch(error =>{
        toastService.show('Error', error, 'error', 'top');
      })
    },
    async editIntegration(orgId: string, edit: Integration) {
      adminAPI.patch('/Organisation/' + orgId + '/Integration/' + cookies.get('integrationId'), edit)
      .then(() => {
        loadingService.close();
        toastService.show(
          "Success",
          "Integration updated",
          "success",
          "top"
        );
      })
      .catch(error =>{
          toastService.show('Error', error, 'error', 'top');
        })
    },
  },
  getters: {
    getIntegration: (state) => state.integrations
  },
});