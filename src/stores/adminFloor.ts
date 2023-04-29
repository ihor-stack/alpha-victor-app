import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {NavFloor} from '@/types/index'
import { useCookies } from "vue3-cookies";
import { Alert } from "./globalAlert";

const { cookies } = useCookies();
  
export const Floors = defineStore('Floors', {
  state: () => {
    return {
      floors: [] as NavFloor[],
      floor: {} as NavFloor
    }
  },
  actions: {
    async getFloors(id: string) {
      adminAPI.get<NavFloor[]>('/Location/' + id)
      .then(response => 
        {
          this.floors = response.data
        }
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async saveFloor(id: string) {
      adminAPI.post('/Location/' + id,
        {
          "longName": "string",
          "shortName": "string"
        }).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async removeLocation(id: string) {
      adminAPI.delete('/Location/' + id)
      .catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async getSingleLocation<NavFloor>(id: string) {
      adminAPI.get('/Location/Location/' + id)
      .then(response => 
        {
          this.floor = response.data
        }
      ).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async updateSingleLocation(id: string) {
      adminAPI.patch('/Location/' + id, 
      {
        "name": "string",
        "prefix": "string",
        "mainContactName": "string",
        "email": "string",
        "phone": "string",
        "sosNumber": "string",
        "wifiSsid": "string",
        "wifiPassword": "string",
        "addressLines": [
          "string"
        ],
        "city": "string",
        "postcode": "string"
      })
      .catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
  },
  getters: {
    Floors: (state) => state.floors,
    Floor: (state) => state.floor
  },
});