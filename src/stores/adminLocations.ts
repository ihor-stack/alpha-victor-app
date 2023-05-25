import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {Location, NavLocation, Navigation, SingleLocation} from '@/types/index'
import { useCookies } from "vue3-cookies";
import loadingService from '@/services/loadingService';
import toastService from '@/services/toastService';

const { cookies } = useCookies();
  
export const Locations = defineStore('Locations', {
  state: () => {
    return {
      locations: [] as NavLocation[],
      navigationTree: [{}] as Navigation[],
      location: {
        id: '',
        name: '',
        prefix: '',
        mainContactName: '',
        email: '',
        phone: '',
        sosNumber: '',
        wifiSsid: '',
        wifiPassword: '',
        addressLines: ['',''],
        city: '',
        postcode: '',
      } as SingleLocation
    }
  },
  actions: {
    async getLocations() {
      loadingService.show('Loading...');
      adminAPI.get<NavLocation[]>('/Location?organisationId=' + cookies.get('orgId'))
      .then(response => 
        {
          this.locations = response.data
          loadingService.close();
        }
      ).catch(error =>{
        toastService.show('Error', error, 'error', 'top');
      })
    },

    async saveLocation(edit: Location) {
      adminAPI.post('/Location/' + cookies.get('orgId'),
        {
          "name": "string",
          "prefix": "string",
          "mainContactName": "string",
          "email": "string",
          "phone": "string",
          "sosNumber": "string",
          "wifiSsid": "string",
          "wifiPassword": "string",
          "postcode": "string",
          "city": "string",
          "addressLines": [
            "string"
          ]
        }).then(() => 
          {
            this.getLocations()
          }
        ).catch(error =>{
          toastService.show('Error', error, 'error', 'top');
        })
    },

    async removeLocation(id: string) {
      adminAPI.delete('/Location/' + cookies.get('orgId') + '/' + id)
      .then(() => 
          {
            this.getLocations()
          }
        ).catch(error =>{
          toastService.show('Error', error, 'error', 'top');
        })
    },

    async getLocation() {
      loadingService.show('Loading...');
      adminAPI.get('/Location/Location/' + cookies.get('locationId'))
      .then((response) => 
        {
          this.location = response.data
          loadingService.close()
        }
      ).catch(error =>{
        toastService.show('Error', error, 'error', 'top')
      })
    },

    async updateLocation(id: string) {
      adminAPI.patch('/Location/' + id,
        this.location
      ).then(() => 
      {
        toastService.show('Success', 'Location updated successfully', 'success', 'top')
      }
      ).catch(error =>{
        toastService.show('Error', error, 'error', 'top');
      })
    },

    async getNavigationTree(){
      loadingService.show('Loading...');
      adminAPI.get<Navigation[]>('/Organisation/' + cookies.get('orgId') + '/NavigationTree')
      .then((response) => 
          {
            this.navigationTree = response.data
            loadingService.close();
          }
        ).catch(error =>{
          toastService.show('Error', error, 'error', 'top');
        })
    }
  },
  getters: {
    Locations: (state) => state.locations
  },
});