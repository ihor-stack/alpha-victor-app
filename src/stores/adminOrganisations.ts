import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import { AdminOrganisation, OrgDetails} from '@/types/index'
import { useCookies } from "vue3-cookies";
import { Alert } from "./globalAlert";

const { cookies } = useCookies();
  
export const Organisations = defineStore('Organisations', {
  state: () => {
    return {
      organisationList: [] as AdminOrganisation[],
      organisationDetails: {} as OrgDetails,
      currentOrg: '' as string
    }
  },
  actions: {
    
    setId(newId: string) {
      this.currentOrg = newId
      return true
    },
    async getOrganisations() {
      adminAPI.get<AdminOrganisation[]>('/Organisation' ).then(response => 
        {
          this.organisationList = response.data
          
        }
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async getOrgDetails() {
      adminAPI.get<OrgDetails>('/Organisation/'+ cookies.get('orgId') +'/Details' )
      .then(response => 
        {
          this.organisationDetails = response.data
          
        }
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async removeOrganisation() {
      adminAPI.delete('/Organisation/' + cookies.get('orgId'))
      .catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
  },
  getters: {
    getList: (state) => state.organisationList,
    getId: (state) => state.currentOrg,
  },
});
