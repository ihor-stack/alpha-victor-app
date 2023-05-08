import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {Integration} from '@/types/index'
import { useCookies } from "vue3-cookies";
import { Alert } from "./globalAlert";

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
        const alert = Alert()
        alert.open(error.message)
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
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async editIntegration(edit: Integration) {
      console.log(edit)
      adminAPI.patch('/Organisation/' + cookies.get('orgId') + '/Integration/' + cookies.get('integrationId'), edit)
      .catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
  },
  getters: {
    getIntegration: (state) => state.integrations
  },
});