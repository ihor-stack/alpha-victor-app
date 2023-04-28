import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import { AdminOrganisation} from '@/types/index'
import { useCookies } from "vue3-cookies";
import { Alert } from "./globalAlert";

const { cookies } = useCookies();
  
export const Organisations = defineStore('Organisations', {
  state: () => {
    return {
      organisationList: [] as AdminOrganisation[],
      currentOrg: '' as string
    }
  },
  actions: {
    async getOrganisations() {
      adminAPI.get<AdminOrganisation[]>('/Organisation').then(response => 
        {
          this.organisationList = response.data
          
        }
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    setId(newId: string) {
      this.currentOrg = newId
      return true
    },
  },
  getters: {
    getList: (state) => state.organisationList,
    getId: (state) => state.currentOrg,
  },
});
