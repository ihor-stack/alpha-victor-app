import { defineStore } from "pinia";
import {adminAPI} from '@/axios'
import {
  DetailedSpace, 
  SelectItem, 
  SingleFloor, 
  SpaceDevices, 
  SpecificFloor,
  SpaceBeacon,
  SpaceWifi,
  SpaceNewDocument,
  NewPhoto} from '@/types/index'
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
      devices: [] as SpaceDevices[],
      beacons: [] as SpaceBeacon[],
      wifi: {} as SpaceWifi,
    }
  },
  actions: {
    async getSpaces() {
      adminAPI.get<DetailedSpace>('/Space/' + cookies.get('spaceId') + '/Details')
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
    async deleteSpacesDevices(deviceIndex: number) {
      adminAPI.delete('/Space/' + 
      cookies.get('spaceId') + 
      '/Device/' + 
      this.devices[deviceIndex].id,
      ).then(() => {
        this.getSpacesDevices()
      }).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async saveSpacesDevices(newDevice: SpaceDevices) {
      adminAPI.post('/Space/' + 
      cookies.get('spaceId') + 
      '/Device/',
      newDevice
      ).then(() => 
        {
          this.getSpacesDevices()
        }
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async getSpacesBeacon(minor: string, major: string) {
      adminAPI.get<SpaceBeacon[]>('/Space/' + 
      cookies.get('spaceId') + 
      '/Beacon?Minor=' + minor + '&Major=' + major
      ).then(response => 
        {
          this.beacons = response.data
        }
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async getSpacesWifi() {
      adminAPI.get<SpaceWifi>('/Space/' + cookies.get('spaceId') + '/Wifi').then(response => 
        {
          this.wifi = response.data
        }
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async editSpacesWifi() {
      adminAPI.patch('/Space/' + 
      cookies.get('spaceId') + 
      '/Wifi?ShowWifiPassword=' + this.wifi.showWifiPassword +
      '&WifiName=' + this.wifi.wifiName + 
      '&WifiPassword=' + this.wifi.wifiPassword
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async saveSpacesPhoto() {
      const photoQuery = `?spaceId=${cookies.get('spaceId')}`
        adminAPI.post('/Photo' + 
        photoQuery
        ).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async deleteSpacesPhoto(photoId: string) {
      const photoQuery = `?photoId=${photoId}`
        adminAPI.delete('/Photo' + 
        photoQuery
        ).then(response => 
          this.getSpaces()
        ).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async addSpacesDocument(newDocument: SpaceNewDocument) {
        adminAPI.post('/Document/' + 
        cookies.get('spaceId') +
        '/Document',
        newDocument
        ).then(() => 
          this.getSpaces()
        ).catch(error =>{
          const alert = Alert()
          alert.open(error.message)
        })
    },
    async deleteSpacesDocument(documentId: string) {
      adminAPI.delete('/Document/' + 
      cookies.get('spaceId') +
      '/Document/' + documentId
      ).then(() => 
        this.getSpaces()
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
    async addSpacesPhoto(newPhoto: NewPhoto) {
      adminAPI.post('/Photo?spaceId=' + cookies.get('spaceId'),newPhoto
      ).then(() => 
        this.getSpaces()
      ).catch(error =>{
        const alert = Alert()
        alert.open(error.message)
      })
    },
  },
});
