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
    async editIntegration(edit: Integration) {
      adminAPI.patch('/Organisation/' + cookies.get('orgId') + '/Integration/' + edit.id,
        {
          "clientId": "string",
          "clientSecret": "string",
          "selectedOrgnisation": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }).then(() => 
          {
            this.getIntegrations()
          }
        ).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
  },
  getters: {
    getIntegration: (state) => state.integrations
  },
});