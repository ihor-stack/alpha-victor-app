import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {Location, NavLocation, Navigation, SingleLocation} from '@/types/index'
import { useCookies } from "vue3-cookies";
import { Alert } from "./globalAlert";

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
      adminAPI.get<NavLocation[]>('/Location?organisationId=' + cookies.get('orgId'))
      .then(response => 
        {
          this.locations = response.data
        }
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
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
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async removeLocation(id: string) {
      adminAPI.delete('/Location/' + cookies.get('orgId') + '/' + id)
      .then(() => 
          {
            this.getLocations()
          }
        ).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async getLocation() {
      adminAPI.get('/Location/Location/' + cookies.get('locationId'))
      .then((response) => 
          {
            this.location = response.data
          }
        ).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async updateLocation(id: string) {
      adminAPI.patch('/Location/' + id,
        this.location
      )
      .catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async getNavigationTree(){
      adminAPI.get<Navigation[]>('/Organisation/' + cookies.get('orgId') + '/NavigationTree')
      .then((response) => 
          {
            this.navigationTree = response.data
          }
        ).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    }
  },
  getters: {
    Locations: (state) => state.locations
  },
});