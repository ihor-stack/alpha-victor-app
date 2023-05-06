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
    async getFloors() {
      adminAPI.get<NavFloor[]>('/Floor?locationId=' + cookies.get('locationId'))
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
      adminAPI.post('/Floor/' + id,
        {
          "longName": "string",
          "shortName": "string"
        }).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async removeLocation(id: string) {
      adminAPI.delete('/Floor/' + id)
      .catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async getSingleLocation<NavFloor>(id: string) {
      adminAPI.get('/Floor/' + id)
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
      adminAPI.patch('/Floor/' + id, 
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