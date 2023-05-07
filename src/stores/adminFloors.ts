import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {SingleFloor, SpecificFloor} from '@/types/index'
import { useCookies } from "vue3-cookies";
import { Alert } from "./globalAlert";

const { cookies } = useCookies();
  
export const Floors = defineStore('Floors', {
  state: () => {
    return {
      floors: [] as SingleFloor[],
      floor: {} as SpecificFloor
    }
  },
  actions: {
    async getFloors() {
      adminAPI.get<SingleFloor[]>('/Floor?locationId=' + cookies.get('locationId'))
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
      adminAPI.patch('/Floor/' + id,
        {
          longName: this.floor.name,
          shortName: this.floor.shortName
        }).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async getFloorDetails() {
      adminAPI.get<SpecificFloor>('/Floor/' + cookies.get('floorId'))
      .then(response => 
        {
          this.floor = response.data
        }
      ).catch(error =>{
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