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
  SpaceAnnouncement,
  NewDocument,
  NewPhoto,
  Panorama,
  NewPanorama,
  Hotspot,
} from "@/types/index";
import { useCookies } from "vue3-cookies";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";
import router from "@/router";

import { Locations } from "./adminLocations";

const { cookies } = useCookies();

export const Spaces = defineStore("Spaces", {
  state: () => {
    return {
      space: {} as DetailedSpace,
      currentSpace: "" as string,
      formattedSelect: [] as SelectItem[],
      roomTypeSelected: {} as SelectItem,
      decisionTreeSelected: {} as SelectItem,
      newSpaceDetails: {} as NewSpaceDetails,
      announcement: {} as SpaceAnnouncement,
      qrCode: "" as string,
      devices: [] as Device[],
      photo: {} as NewPhoto,
      beacons: [] as SpaceBeacon[],
      wifi: {} as SpaceWifi,
      securityTypeSelected: {} as SelectItem,
      currentPanorama: {} as Panorama,
    };
  },
  actions: {
    async getSpaceDetails(spaceId = cookies.get("spaceId")) {
      loadingService.show("Loading...");
      adminAPI
        .get<DetailedSpace>(`/Space/${spaceId}/Details`)
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

    async saveSpace(
      organisationId: string,
      locationId: string,
      floorId: string
    ) {
      const newSpace = this.newSpaceDetails;
      loadingService.show("Loading...");
      adminAPI
        .post(`/Space?floorId=${floorId}`, {
          spaceName: newSpace.spaceName,
          shortCode: newSpace.shortCode,
        })
        .then((res) => {
          loadingService.close();
          toastService.show("Success", "New space added", "success", "top");
          const locationsStore = Locations();
          locationsStore.getNavigationTree(organisationId);
          router.push({
            name: "OrganisationViewLocationsSpaces",
            params: {
              id: organisationId,
              locationId,
              floorId,
              spaceId: res.data.id,
            },
          });
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async updateSpace(spaceId: string) {
      loadingService.show("Loading...");
    
      adminAPI
        .patch(`/Space/${spaceId}`, {
          spaceName: this.space.spaceName,
          shortcode: this.space.shortcode,
          roomTypeId: this.roomTypeSelected.additionalInfo,
          capacity: this.space.capacity,
          typeformId: this.space.typeformId,
          decisionTreeId: this.decisionTreeSelected.additionalInfo,
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

    async getSpaceDetailsDevices(spaceId = cookies.get("spaceId")) {
      adminAPI
        .get<Device[]>(`/Space/${spaceId}/Device`)
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

    async getSpaceDetailsAnnouncement(spaceId: string) {
      adminAPI
        .get<SpaceAnnouncement>("/Space/" + spaceId + "/Announcement")
        .then((response) => {
          this.announcement = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async editSpacesAnnouncement(spaceId: string) {
      loadingService.show("Loading");
      adminAPI
        .patch(
          "/Space/" +
            spaceId +
            "/Announcement?Title=" +
            this.announcement.title +
            "&Text=" +
            this.announcement.text
        )
        .then(() => {
          loadingService.close();
          toastService.show(
            "Success",
            "Space announcement updated",
            "success",
            "top"
          );
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
            this.wifi.wifiPassword +
            "&WifiSecurityType=" +
            this.securityTypeSelected.id
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

    async deletePhoto(photoId: string) {
      const photoQuery = `?photoId=${photoId}`;
      loadingService.show("Loading...");
      return adminAPI
        .delete("/Photo" + photoQuery)
        .then(() => {
          toastService.show(
            "Success",
            "Photo deleted successfully",
            "success",
            "top"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => loadingService.close());
    },
    async addPhoto(photo: NewPhoto, queryParams: string) {
      loadingService.show("Loading...");
      const newPhoto = {
        base64Payload: photo.base64Payload,
        contentType: photo.contentType,
        fileName: photo.fileName,
        order: photo.order,
        featuredPhoto: photo.featuredPhoto,
      };

      return adminAPI
        .post(`/Photo?${queryParams}`, newPhoto)
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => loadingService.close());
    },

    async addSpacesDocument(newDocument: NewDocument, spaceId: string) {
      return adminAPI
        .post(`/Document/${spaceId}/Document`, newDocument)
        .then(() => this.getSpaceDetails(spaceId))
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async deleteSpacesDocument(documentId: string, spaceId: string) {
      adminAPI
        .delete(`/Document/${spaceId}/Document/${documentId}`)
        .then(() => this.getSpaceDetails(spaceId))
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async setInitialView(
      initialViewPitch: number,
      initialViewYaw: number,
      initialViewHfov: number
    ) {
      this.currentPanorama = {
        ...this.currentPanorama,
        initialViewPitch,
        initialViewYaw,
        initialViewHfov,
      };
    },
    async getPanorama(spaceId: string) {
      loadingService.show("Loading...");
      adminAPI
        .get<Panorama>(`/Panorama/${spaceId}`)
        .then((response) => {
          this.currentPanorama = response.data;
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.currentPanorama = {} as Panorama;
          } else {
            toastService.show("Error", error, "error", "top");
          }
        })
        .finally(() => {
          loadingService.close();
        });
    },
    async addPanorama(spaceId: string, panorama: NewPanorama) {
      loadingService.show("Loading...");
      adminAPI
        .post(`/Panorama/${spaceId}`, panorama)
        .then(() => this.getPanorama(spaceId))
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close();
        });
    },
    async updatePanorama(spaceId: string, panorama: NewPanorama) {
      adminAPI
        .put(`/Panorama/${spaceId}`, panorama)
        .then(() => this.getPanorama(spaceId))
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },
    async deletePanorama(spaceId: string) {
      loadingService.show("Loading...");
      return adminAPI
        .delete(`/Panorama/${spaceId}`)
        .then(() => (this.currentPanorama = {} as Panorama))
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },
    async addHotspot(
      spaceId: string,
      hotspot: { pitch: number; yaw: number; text: string; deviceId?: string }
    ) {
      loadingService.show("Loading...");
      return adminAPI
        .post(`/Panorama/${spaceId}/Hotspots`, hotspot)
        .then((res) => {
          this.currentPanorama.hotspots = [
            ...this.currentPanorama.hotspots,
            res.data,
          ];
          return res.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => loadingService.close());
    },
    async updateHotspot(
      spaceId: string,
      hotspotId: string,
      newHotspot: Hotspot
    ) {
      loadingService.show("Loading...");
      return adminAPI
        .put(`/Panorama/${spaceId}/Hotspots/${hotspotId}`, newHotspot)
        .then(() => {
          this.currentPanorama.hotspots = this.currentPanorama.hotspots.map(
            (hotspot) => {
              if (hotspot.hotspotId === hotspotId) {
                return {
                  ...hotspot,
                  text: newHotspot.text,
                  deviceId: newHotspot.deviceId,
                };
              } else {
                return hotspot;
              }
            }
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => loadingService.close());
    },
    async deleteHotspot(spaceId: string, hotspotId: string) {
      loadingService.show("Loading...");
      return adminAPI
        .delete(`/Panorama/${spaceId}/Hotspots/${hotspotId}`)
        .then(() => {
          this.currentPanorama.hotspots = this.currentPanorama.hotspots.filter(
            (hotspot) => hotspot.hotspotId !== hotspotId
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => loadingService.close());
    },
    async updateSpaceFeature(queryParams: string, spaceId: string) {
      loadingService.show("Loading...");
      adminAPI
        .patch(`/Space/SpaceFeature?${queryParams}`)
        .then(() => this.getSpaceDetails(spaceId))
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => loadingService.close());
    },
  },
});
