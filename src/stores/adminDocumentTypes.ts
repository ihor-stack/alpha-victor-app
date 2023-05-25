import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {AdminDocument} from '@/types/index'
import { useCookies } from "vue3-cookies";
import loadingService from '@/services/loadingService';
import toastService from '@/services/toastService';

const { cookies } = useCookies();
  
export const adminDocuments = defineStore('adminDocuments', {
  state: () => {
    return {
      documents: [] as AdminDocument[]
    }
  },
  actions: {
    async getDocuments() {
      adminAPI.get<AdminDocument[]>('/Organisation/' + cookies.get('orgId') + '/DocumentTypes')
      .then(response => 
        {
          this.documents = response.data
        }
      ).catch(error =>{
        toastService.show('Error', error, 'error', 'top');
      })
    },
    async saveNewDocument(documentName: string) {
      adminAPI.post<AdminDocument>('/Organisation/' + cookies.get('orgId') + '/DocumentType', {
        name: documentName
      }).then(() => {
        this.getDocuments()
      }).catch(error =>{
        toastService.show('Error', error, 'error', 'top');
      })
    },
    async editDocumentType(document: AdminDocument) {
      adminAPI.patch('/Organisation/' + cookies.get('orgId') + '/DocumentType/' + document.id,
        {
          "name": document.name,
        }).then(() => {
          this.getDocuments()
        }).catch(error =>{
          toastService.show('Error', error, 'error', 'top');
        })
    },
    async removeDocumentType(id: string) {
      adminAPI.delete('/Organisation/' + cookies.get('orgId') + '/DocumentType/' + id)
      .then(() => {
          this.getDocuments()
        }).catch(error =>{
          toastService.show('Error', error, 'error', 'top');
        })
    },
  },
  getters: {
    getDocList: (state) => state.documents
  }
});
