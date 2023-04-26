import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {AdminOrganisation,
  AdminTheme} from '@/types/index'
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
  
interface Document {
  id: number;
  title: string;
  dateUploaded: string;
}
export const Alert = defineStore('Alert', {
  state: () => {
    return {
      active: false,
      message: ''
    }
  },
  actions: {
    open(message: string) {
      this.active = true
      this.message = message
    },
    close() {
      this.active = false
    },
  },
  getters: {
    getActive: (state) => state.active,
    getMessage: (state) => state.message,
  },
});
export const Organisations = defineStore('Organisations', {
  state: () => {
    return {
      organisationList: [] as AdminOrganisation[],
      currentOrg: '' as string,
      // to add later
      details: null,
      metaData: null,
      theme: {} as AdminTheme,
      integration: null
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
    async getThemes() {
      adminAPI.get<AdminTheme>('/Organisation/' + cookies.get('orgId') + '/Theme').then(response => 
        {
          this.theme = response.data
        }
      ).catch(error =>{
        console.log(error)
        const alert = Alert()
        alert.open(error.message)
      })
    },
  },
  getters: {
    getList: (state) => state.organisationList,
    getId: (state) => state.currentOrg,
    getTheme: (state) => state.theme
  },
});


export const adminDocuments = defineStore('adminDocuments', {
  state: () => {
    return {
      documents: [
      { id: 1, title: 'User Manual', dateUploaded: '' },
      { id: 2, title: 'Quick Start Guide', dateUploaded: '' },
      { id: 3, title: 'Schematics', dateUploaded: '' },
    ] as Document[]
  }
  },
  actions: {
    async set(){
      adminAPI.get('/Organisation').then(response => 
        {console.log(response)}
      )
    },
    async add(newDocument: Document) {
      this.documents.push(newDocument)
    },
    async remove(id: number) {
      this.documents = this.documents.filter(function( item ) {
        return item.id !== id;
      });
    },
    async edit(index: number, edit: string) {
      this.documents[index].title = edit
      this.documents[index].dateUploaded = new Date().toDateString()
    },
    async reset(index: number, edit: Document) {
      this.documents[index] = edit
    }
  },
  getters: {
    documentsArray: (state) => state.documents,
  },
});