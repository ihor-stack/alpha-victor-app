import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {
  AdminMetaData,
  spaceFeature,
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
    async saveSpaceType(edit: spaceType) {
      adminAPI.post('/Organisation/' + cookies.get('orgId') + '/SpaceType/' + edit.spaceTypeId,
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
    async editSpaceType(edit: spaceType) {
      adminAPI.patch('/Organisation/' + cookies.get('orgId') + '/SpaceType/' + edit.spaceTypeId,
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
    async saveSpaceFeature(edit: spaceFeature) {
      adminAPI.post('/Organisation/' + cookies.get('orgId') + '/SpaceFeature/' + edit.spaceFeatureId,
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
    async editSpaceFeature(edit: spaceFeature) {
      adminAPI.patch('/Organisation/' + cookies.get('orgId') + '/SpaceFeature/' + edit.spaceFeatureId,
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
    async removeSpaceFeature(edit: spaceFeature) {
      adminAPI.delete('/Organisation/' + cookies.get('orgId') + '/SpaceFeature/' + edit.spaceFeatureId)
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