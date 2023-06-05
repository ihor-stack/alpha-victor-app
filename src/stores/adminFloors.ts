import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {SingleFloor, SpecificFloor, NewFloorDetails} from '@/types/index'
import { useCookies } from "vue3-cookies";
import loadingService from '@/services/loadingService';
import toastService from '@/services/toastService';

import { Locations } from './adminLocations';
 
const { cookies } = useCookies();
  
export const Floors = defineStore('Floors', {
  state: () => {
    return {
      floors: [] as SingleFloor[],
      newFloorDetails: {} as NewFloorDetails,
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
        toastService.show('Error', error, 'error', 'top');
      })
    },

    async saveFloor() {
      const newFloor = this.newFloorDetails;
      loadingService.show("Loading...");
      adminAPI
        .post('/Floor?locationId=' + cookies.get('locationId'), {
          longName: newFloor.longName,
          shortName: newFloor.shortName,
        }
      )
      .then(() => {
        loadingService.close();
        toastService.show(
          "Success",
          "New floor added",
          "success",
          "top"
        );
        const locationsStore = Locations();
        locationsStore.getNavigationTree();
      })
      .catch((error) => {
        toastService.show("Error", error, "error", "top");
      });
    },

    async updateFloor(id: string) {
      adminAPI.patch('/Floor/' + id,
        {
          longName: this.floor.name,
          shortName: this.floor.shortName
        })
        .then(() => {
          toastService.show('Success', 'Floor updated successfully', 'success', 'top');
          const locationsStore = Locations();
          locationsStore.getNavigationTree();
        }
        ).catch(error =>{
          toastService.show('Error', error, 'error', 'top');
        })
    },

    async getFloorDetails() {
      adminAPI.get<SpecificFloor>('/Floor/' + cookies.get('floorId'))
      .then(response => 
        {
          this.floor = response.data
        }
      ).catch(error =>{
          toastService.show('Error', error, 'error', 'top');
        })
    },
  },
  getters: {
    Floors: (state) => state.floors,
    Floor: (state) => state.floor
  },
});