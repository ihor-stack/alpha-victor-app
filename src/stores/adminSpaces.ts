import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import {
  DetailedSpace,
  SelectItem,
  SingleFloor,
  Device,
  NewSpaceDetails,
  SpecificFloor,
  SpaceBeacon,
  SpaceWifi,
  SpaceNewDocument,
  NewPhoto,
} from "@/types/index";
import { useCookies } from "vue3-cookies";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

import { Locations } from './adminLocations';

const { cookies } = useCookies();

export const Spaces = defineStore("Spaces", {
  state: () => {
    return {
      space: {} as DetailedSpace,
      currentSpace: "" as string,
      formattedSelect: [] as SelectItem[],
      roomTypeSelected: {} as SelectItem,
      newSpaceDetails: {} as NewSpaceDetails,
      qrCode: "" as string,
      devices: [] as Device[],
      photo: {} as NewPhoto,
      beacons: [] as SpaceBeacon[],
      wifi: {} as SpaceWifi,
    };
  },
  actions: {
    async getSpaceDetails() {
      loadingService.show("Loading...");
      adminAPI
        .get<DetailedSpace>("/Space/" + cookies.get("spaceId") + "/Details")
        .then((response) => {
          this.space = response.data;
          this.currentSpace = response.data.spaceName;
          const formattedList: SelectItem[] = [];
          
          response.data.roomTypes.forEach((element, index) => {
            formattedList.push({
              id: index,
              title: element.name,
              additionalInfo: element.spaceTypeId,
            });
          });
          const selectedRoomType = response.data.roomTypes.find(
            (roomType) => roomType.spaceTypeId === response.data.roomTypeId
          );
          if (selectedRoomType) {
            this.roomTypeSelected = {
              id: formattedList.findIndex(
                (option) =>
                  option.additionalInfo === selectedRoomType.spaceTypeId
              ),
              title: selectedRoomType.name,
              additionalInfo: selectedRoomType.spaceTypeId,
            };
          }
          this.formattedSelect = formattedList;
          loadingService.close();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async saveSpace() {
      const newSpace = this.newSpaceDetails;
      loadingService.show("Loading...");
      adminAPI
        .post('/Space?floorId=' + cookies.get('floorId'), {
          spaceName: newSpace.spaceName,
          shortCode: newSpace.shortCode,
        }
      )
      .then(() => {
        loadingService.close();
        toastService.show(
          "Success",
          "New space added",
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

    async updateSpace() {
      loadingService.show("Loading...");
      adminAPI
        .patch("/Space/" + cookies.get("spaceId"), {
          spaceName: this.space.spaceName,
          shortcode: this.space.shortcode,
          roomTypeId: "00000000-0000-0000-0000-000000000199",
          capacity: this.space.capacity,
          typeformId: this.space.typeformId,
          decisionTreeId: null,
        })
        .then(() => {
          loadingService.close();
          toastService.show(
            "Success",
            "Space details updated",
            "success",
            "top"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async saveSpaceDocument() {
      loadingService.show("Loading...");
      adminAPI
        .post("/Space/" + cookies.get("spaceId") + "/Document", {
          base64Payload: "string",
          contentType: "string",
          fileName: "string",
          documentTypeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        })
        .then(() => {
          loadingService.close();
          toastService.show(
            "Success",
            "Document uploaded successfully",
            "success",
            "top"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async deleteSpaceDocument(documentId: string) {
      adminAPI
        .delete("/Space/" + cookies.get("spaceId") + "/Document/" + documentId)
        .then(() => {
          this.getSpaceDetails();
          toastService.show(
            "Success",
            "Document removed successfully",
            "success",
            "top"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async getSearchBeacons(minor: string, major: string) {
      adminAPI
        .get(
          "/Space/" +
            cookies.get("spaceId") +
            "/Beacon?Minor=" +
            minor +
            "&Major=" +
            major
        )
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async getSpaceQRCode() {
      adminAPI
        .get<string>("/Space/" + cookies.get("spaceId") + "/Qr")
        .then((response) => {
          this.qrCode = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async getSpaceDetailsDevices() {
      adminAPI
        .get<Device[]>("/Space/" + cookies.get("spaceId") + "/Device")
        .then((response) => {
          this.devices = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async editSpacesDevices(deviceIndex: number) {
      loadingService.show("Loading...");
      const deviceEdit = Object.assign({}, this.devices[deviceIndex]);
      delete deviceEdit.photos;
      adminAPI
        .patch(
          "/Space/" +
            cookies.get("spaceId") +
            "/Device/" +
            this.devices[deviceIndex].id,
          deviceEdit
        )
        .then(() => {
          loadingService.close();
          toastService.show(
            "Success",
            "Space devices updated",
            "success",
            "top"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async deleteSpacesDevices(deviceIndex: number) {
      adminAPI
        .delete(
          "/Space/" +
            cookies.get("spaceId") +
            "/Device/" +
            this.devices[deviceIndex].id
        )
        .then(() => {
          this.getSpaceDetailsDevices();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async saveSpacesDevices(newDevice: Device[]) {
      loadingService.show("Loading...");
      adminAPI
        .post("/Space/" + cookies.get("spaceId") + "/Device/", newDevice)
        .then(() => {
          this.getSpaceDetailsDevices();
          loadingService.close();
          toastService.show(
            "Success",
            "Space devices updated",
            "success",
            "top"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async getSpaceDetailsBeacon(minor: string, major: string) {
      adminAPI
        .get<SpaceBeacon[]>(
          "/Space/" +
            cookies.get("spaceId") +
            "/Beacon?Minor=" +
            minor +
            "&Major=" +
            major
        )
        .then((response) => {
          this.beacons = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async getSpaceDetailsWifi() {
      adminAPI
        .get<SpaceWifi>("/Space/" + cookies.get("spaceId") + "/Wifi")
        .then((response) => {
          this.wifi = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async editSpacesWifi() {
      loadingService.show("Loading");
      adminAPI
        .patch(
          "/Space/" +
            cookies.get("spaceId") +
            "/Wifi?ShowWifiPassword=" +
            this.wifi.showWifiPassword +
            "&WifiName=" +
            this.wifi.wifiName +
            "&WifiPassword=" +
            this.wifi.wifiPassword
        )
        .then(() => {
          this.getSpaceDetailsDevices();
          loadingService.close();
          toastService.show(
            "Success",
            "Space wifi details updated",
            "success",
            "top"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async saveSpacesPhoto() {
      const photoQuery = `?spaceId=${cookies.get("spaceId")}`;
      adminAPI.post("/Photo" + photoQuery).catch((error) => {
        toastService.show("Error", error, "error", "top");
      });
    },

    async deleteSpacesPhoto(photoId: string) {
      const photoQuery = `?photoId=${photoId}`;
      adminAPI
        .delete("/Photo" + photoQuery)
        .then(() => {
          toastService.show(
            "Success",
            "Photo deleted successfully",
            "success",
            "top"
          );
          this.getSpaceDetails()
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async addSpacesDocument(newDocument: SpaceNewDocument) {
      adminAPI
        .post("/Document/" + cookies.get("spaceId") + "/Document", newDocument)
        .then(() => this.getSpaceDetails())
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async deleteSpacesDocument(documentId: string) {
      adminAPI
        .delete(
          "/Document/" + cookies.get("spaceId") + "/Document/" + documentId
        )
        .then(() => this.getSpaceDetails())
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async addSpacesPhoto() {
      const newPhoto = {
        base64Payload: this.photo.base64Payload,
        contentType: this.photo.contentType,
        fileName: this.photo.fileName,
        order: this.photo.order,
        featuredPhoto: this.photo.featuredPhoto,
      };

      adminAPI
        .post("/Photo?spaceId=" + cookies.get("spaceId"), newPhoto)
        .then(() => this.getSpaceDetails())
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },
  },
});
