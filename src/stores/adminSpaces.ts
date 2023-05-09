import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {
  DetailedSpace, 
  SelectItem, 
  SingleFloor, 
  SpaceDevices, 
  SpecificFloor} from '@/types/index'
import { useCookies } from "vue3-cookies";
import { Alert } from "./globalAlert";

const { cookies } = useCookies();
  
export const Spaces = defineStore('Spaces', {
  state: () => {
    return {
      space: {} as DetailedSpace,
      currentSpace: '' as string,
      formattedSelect: [] as SelectItem[],
      optionSelected: {} as SelectItem,
      qrCode: '' as string,
      devices: [] as SpaceDevices[]
    }
  },
  actions: {
    async getSpaces() {
      adminAPI.get<DetailedSpace>('/Space/Space/' + cookies.get('spaceId') + '/Details')
      .then(response => 
        {
          this.space = response.data
          this.currentSpace = response.data.spaceName
          const formnatedList: SelectItem[] = []
          response.data.roomTypes.forEach((element, index) => {
            formnatedList.push(
                {
                  id: index,
                  title: element.name,
                  aditionalInfo: element.spaceTypeId
                }
              )
            }
          )
          this.formattedSelect = formnatedList
        }
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    
    async saveSpace() {
      adminAPI.patch('/Space/' + cookies.get('spaceId'),
      {
        "spaceName": this.space.spaceName,
        "shortcode": this.space.shortcode,
        "roomTypeId": this.optionSelected.id,
        "capacity": this.space.capacity,
        "typeformId": this.space.typeformId,
        "decisionTreeId": null
      }).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async saveSpaceDocument() {
      adminAPI.post('/Space/' + cookies.get('spaceId') + '/Document',
      {
        "base64Payload": "string",
        "contentType": "string",
        "fileName": "string",
        "documentTypeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async deleteSpaceDocument(documentId: string) {
      adminAPI.delete('/Space/' + cookies.get('spaceId') + '/Document/' + documentId)
      .then(() =>{
        this.getSpaces()
      })
      .catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async getSeacrhBeacons(minor: string, major: string) {
      adminAPI
      .get('/Space/' + 
      cookies.get('spaceId') + 
      '/Beacon?Minor='+ 
      minor + 
      '&Major=' + 
      major)
      .catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async getSpaceQRCode() {
      adminAPI.get<string>('/Space/' + cookies.get('spaceId') + '/Qr')
      .then((response) => {
        this.qrCode = response.data
      })
      .catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async getSpacesDevices() {
      adminAPI.get<SpaceDevices[]>('/Space/' + cookies.get('spaceId') + '/Device')
      .then(response => 
        {
          this.devices = response.data
        }
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async editSpacesDevices(deviceIndex: number) {
      const deviceEdit = Object.assign({}, this.devices[deviceIndex]);
      delete deviceEdit.photos;
      adminAPI.patch('/Space/' + 
      cookies.get('spaceId') + 
      '/Device/' + 
      this.devices[deviceIndex].id,
      deviceEdit
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
  },
  getters: {
    Space: (state) => state.space
  },
});