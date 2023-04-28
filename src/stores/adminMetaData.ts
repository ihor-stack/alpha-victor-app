import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {
  AdminDocument,
  AdminOrganisation,
  AdminTheme,
  AdminMetaData,
  spaceType} from '@/types/index'
import { useCookies } from "vue3-cookies";
import { Alert } from "./globalAlert";

const { cookies } = useCookies();
  
export const MetaData = defineStore('MetaData', {
  state: () => {
    return {
      metaData: {} as AdminMetaData,
    }
  },
  actions: {
    async getMetaData() {
      adminAPI.get<AdminMetaData>('/Organisation/' + cookies.get('orgId') + '/Metadata')
      .then(response => 
        {
          this.metaData = response.data
        }
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async editSpaceType(edit: spaceType) {
      adminAPI.put('/Organisation/' + cookies.get('orgId') + '/SpaceType/' + edit.spaceTypeId,
        {
          "name": edit.name,
          "icon": "string"
        }).then(() => 
          {
            this.metaData = {} as AdminMetaData
            this.getMetaData()
          }
        ).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async removeSpaceType(edit: spaceType) {
      adminAPI.delete('/Organisation/' + cookies.get('orgId') + '/SpaceType/' + edit.spaceTypeId)
      .then(() => 
          {
            this.metaData = {} as AdminMetaData
            this.getMetaData()
          }
        ).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
  },
  getters: {
    getMeta: (state) => state.metaData
  },
});


export const adminDocuments = defineStore('adminDocuments', {
  state: () => {
    return {
      documents: [
      { id: 1, title: 'User Manual', dateUploaded: '' },
      { id: 2, title: 'Quick Start Guide', dateUploaded: '' },
      { id: 3, title: 'Schematics', dateUploaded: '' },
    ] as AdminDocument[]
  }
  },
  actions: {
    async set(){
      adminAPI.get('/Organisation').then(response => 
        {console.log(response)}
      )
    },
    async add(newDocument: AdminDocument) {
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
    async reset(index: number, edit: AdminDocument) {
      this.documents[index] = edit
    }
  },
  getters: {
    documentsArray: (state) => state.documents,
  },
});