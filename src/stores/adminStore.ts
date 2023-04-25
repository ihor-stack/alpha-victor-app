import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {AdminOrganisation} from '@/types/index'

interface Document {
  id: number;
  title: string;
  dateUploaded: string;
}

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

export const Organisation = defineStore('Organisation', {
  state: () => {
    return {
      // testing with hard coded info
      id: 123
  }
  },
  actions: {
    setId(newId: number) {
      this.id = newId
    },
  },
  getters: {
    getId: (state) => state.id,
  },
});

export const Organisations = defineStore('Organisations', {
  state: () => {
    return {
      organisationList: [] as AdminOrganisation[]
    }
  },
  actions: {
    async getOrganisations() {
      adminAPI.get<AdminOrganisation[]>('/Organisation').then(response => 
        {
          this.organisationList = response.data
        }
      ).catch(error =>{
        console.log(error)
      })
    },
  },
  getters: {
    getList: (state) => state.organisationList,
  },
});
