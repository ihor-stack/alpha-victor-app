import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import {
  DetailedSpace,
  SelectItem,
  Device,
  NewSpaceDetails,
  SpaceBeacon,
  SpaceWifi,
  SpaceAnnouncement,
  NewDocument,
  NewPhoto,
  Panorama,
  NewPanorama,
  Hotspot,
  SpaceBeaconAvailableResponse,
  UpdatePanoramaRequest,
  Photo,
  Ubiqisense,
} from "@/types/index";

import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";
import router from "@/router";

import { Locations } from "./adminLocations";
import { Organisations } from "./adminOrganisations";
import confirmToLeaveService from "@/services/confirmToLeaveService";

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
      beacon: {} as SpaceBeacon,
      wifi: {} as SpaceWifi,
      securityTypeSelected: {} as SelectItem,
      currentPanorama: {} as Panorama,
      integration: {} as Ubiqisense,
      integrations: [] as Ubiqisense[],
    };
  },
  actions: {
    setSpace(space: DetailedSpace) {
      this.space = space;
      this.currentSpace = space.spaceName;
    },
    async getSpaceDetails(spaceId: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .get<DetailedSpace>(`/Space/${spaceId}/Details`)
        .then((response) => {
          this.setSpace(response.data);
          confirmToLeaveService.setEditing(false);
          const { organisationDetails } = Organisations();

          if (response.data.decisionTreeId) {
            const index = organisationDetails.decisionTrees.findIndex(
              (decisionTree) => decisionTree.id === response.data.decisionTreeId
            );
            const foundDecisionTree = organisationDetails.decisionTrees[index];

            if (foundDecisionTree) {
              this.decisionTreeSelected = {
                id: index,
                title: foundDecisionTree.name,
                additionalInfo: foundDecisionTree.id,
              };
            }
          }

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
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async saveSpace(
      organisationId: string,
      locationId: string,
      floorId: string
    ) {
      const newSpace = this.newSpaceDetails;
      const loadId = loadingService.show("Loading...");
      adminAPI
        .post(`/Space?floorId=${floorId}`, {
          spaceName: newSpace.spaceName,
          shortCode: newSpace.shortCode,
        })
        .then((res) => {
          toastService.show("Success", "New space added", "success", "bottom");
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
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async updateSpace(spaceId: string) {
      const loadId = loadingService.show("Loading...");

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
          confirmToLeaveService.setEditing(false);
          toastService.show(
            "Success",
            "Space details updated",
            "success",
            "bottom"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async deleteSpace(
      spaceId: string,
      orgId: string,
      locationId: string,
      floorId: string
    ) {
      const loadId = loadingService.show("Loading...");

      return adminAPI
        .delete(`/Space/${spaceId}`)
        .then(() => {
          confirmToLeaveService.setEditing(false);
          toastService.show("Success", "Space deleted", "success", "bottom");

          router.push({
            name: "OrganisationViewLocationsFloors",
            params: { id: orgId, locationId: locationId, floorId: floorId },
          });
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getSpaceDetailsDevices(spaceId: string) {
      adminAPI
        .get<Device[]>(`/Space/${spaceId}/Device`)
        .then((response) => {
          confirmToLeaveService.setEditing(false);
          this.devices = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async editSpacesDevices(deviceIndex: number, spaceId: string) {
      const loadId = loadingService.show("Loading...");
      const deviceEdit = Object.assign({}, this.devices[deviceIndex]);
      delete deviceEdit.photos;
      adminAPI
        .patch(
          `/Space/${spaceId}/Device/${this.devices[deviceIndex].id}`,
          deviceEdit
        )
        .then(() => {
          confirmToLeaveService.setEditing(false);
          toastService.show(
            "Success",
            "Space devices updated",
            "success",
            "bottom"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async deleteSpacesDevices(deviceIndex: number, spaceId: string) {
      adminAPI
        .delete(`/Space/${spaceId}/Device/${this.devices[deviceIndex].id}`)
        .then(() => {
          this.getSpaceDetailsDevices(spaceId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async saveSpacesDevices(spaceId: string, newDevice: Device) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .post(`/Space/${spaceId}/Device/`, newDevice)
        .then(() => {
          this.getSpaceDetailsDevices(spaceId);
          toastService.show(
            "Success",
            "Space devices updated",
            "success",
            "bottom"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getSpaceDetailsAnnouncement(spaceId: string) {
      adminAPI
        .get<SpaceAnnouncement>(`/Space/${spaceId}/Announcement`)
        .then((response) => {
          this.announcement = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async editSpacesAnnouncement(spaceId: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .patch(
          `/Space/${spaceId}/Announcement?Title=${
            this.announcement.title
          }&Text=${this.announcement.text}&From=${
            this.announcement.from || new Date().toISOString()
          }&To=${this.announcement.to || new Date().toISOString()}`
        )
        .then(() => {
          confirmToLeaveService.setEditing(false);
          toastService.show(
            "Success",
            "Space announcement updated",
            "success",
            "bottom"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getSpaceDetailsWifi(spaceId: string) {
      adminAPI
        .get<SpaceWifi>("/Space/" + spaceId + "/Wifi")
        .then((response) => {
          this.wifi = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async editSpacesWifi(spaceId: string) {
      const loadId = loadingService.show("Loading...");

      const wifiPass = this.wifi.wifiPassword
        ? `&WifiPassword=${this.wifi.wifiPassword}`
        : "";

      adminAPI
        .patch(
          "/Space/" +
            spaceId +
            "/Wifi?ShowWifiPassword=" +
            this.wifi.showWifiPassword +
            "&WifiName=" +
            this.wifi.wifiName +
            wifiPass +
            "&WifiSecurityType=" +
            this.securityTypeSelected.id
        )
        .then(() => {
          this.getSpaceDetailsDevices(spaceId);
          toastService.show(
            "Success",
            "Space wifi details updated",
            "success",
            "bottom"
          );
          confirmToLeaveService.setEditing(false);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getSpaceDetailsBeacon(spaceId: string) {
      adminAPI
        .get<SpaceBeacon>("/Space/" + spaceId + "/Beacon")
        .then((response) => {
          this.beacon = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async getSpaceDetailsBeaconAvailable(
      spaceId: string,
      minor: number,
      major: number
    ) {
      try {
        const resp = await adminAPI.get<SpaceBeaconAvailableResponse>(
          "/Space/" + spaceId + "/BeaconAvailable/" + minor + "/" + major
        );

        return resp.data;
      } catch {
        toastService.show(
          "Error",
          "Could not check beacon available status",
          "error",
          "bottom"
        );
      }
    },

    async editSpaceDetailsBeacon(
      spaceId: string,
      minor: number,
      major: number
    ) {
      const loadId = loadingService.show("Loading...");

      adminAPI
        .patch(
          "/Space/" + spaceId + "/Beacon?Minor=" + minor + "&Major=" + major
        )
        .then(() => {
          this.getSpaceDetailsBeacon(spaceId);
          toastService.show(
            "Success",
            "Space beacon details updated",
            "success",
            "bottom"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async unlinkSpaceBeacon(spaceId: string) {
      adminAPI
        .delete(`/Space/${spaceId}/Beacon`)
        .then(() => this.getSpaceDetailsBeacon(spaceId))
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async deletePhoto(photoId: string) {
      const photoQuery = `?photoId=${photoId}`;
      const loadId = loadingService.show("Loading...");
      return adminAPI
        .delete("/Photo" + photoQuery)
        .then(() => {
          toastService.show(
            "Success",
            "Photo deleted successfully",
            "success",
            "bottom"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => loadingService.close(loadId));
    },
    async addPhoto(photo: NewPhoto, queryParams: string) {
      const loadId = loadingService.show("Loading...");
      const newPhoto = {
        base64Payload: photo.base64Payload,
        contentType: photo.contentType,
        fileName: photo.fileName,
        order: photo.order,
        featuredPhoto: photo.featuredPhoto,
        caption: photo.caption || "",
      };

      return adminAPI
        .post(`/Photo?${queryParams}`, newPhoto)
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => loadingService.close(loadId));
    },
    async reorderPhotos(photos: Photo[]) {
      const orderedPhotos = photos.map((photo, index) => ({
        id: photo.id,
        order: index,
      }));
      const loadId = loadingService.show("Loading...");
      return adminAPI
        .patch(`/Photo/Order`, orderedPhotos)
        .then(() => "success")
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => loadingService.close(loadId));
    },
    async updatePhoto(
      photoId: string,
      body: { name?: string; caption?: string; featured?: boolean }
    ) {
      const loadId = loadingService.show("Loading...");

      return adminAPI
        .patch(`/Photo/${photoId}`, body)
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => loadingService.close(loadId));
    },

    async addSpacesDocument(newDocument: NewDocument, spaceId: string) {
      return adminAPI
        .post(`/Document/${spaceId}/Document`, newDocument)
        .then(() => this.getSpaceDetails(spaceId))
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async deleteSpacesDocument(documentId: string, spaceId: string) {
      adminAPI
        .delete(`/Document/${spaceId}/Document/${documentId}`)
        .then(() => this.getSpaceDetails(spaceId))
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async setInitialView(
      initialViewPitch: number,
      initialViewYaw: number,
      initialViewHfov: number
    ) {
      const newPanorama = {
        initialViewPitch,
        initialViewYaw,
        initialViewHfov,
      };
      this.updatePanorama(this.currentPanorama.spaceId, newPanorama);
    },
    async getPanorama(spaceId: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .get<Panorama>(`/Panorama/${spaceId}`)
        .then((response) => {
          this.currentPanorama = response.data;
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.currentPanorama = {} as Panorama;
          } else {
            toastService.show("Error", error, "error", "bottom");
          }
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async addPanorama(spaceId: string, panorama: NewPanorama) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .post(`/Panorama/${spaceId}`, panorama)
        .then(() => this.getPanorama(spaceId))
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async updatePanorama(spaceId: string, panorama: UpdatePanoramaRequest) {
      adminAPI
        .put(`/Panorama/${spaceId}`, panorama)
        .then(() => this.getPanorama(spaceId))
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },
    async deletePanorama(spaceId: string) {
      const loadId = loadingService.show("Loading...");
      return adminAPI
        .delete(`/Panorama/${spaceId}`)
        .then(() => (this.currentPanorama = {} as Panorama))
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async addHotspot(
      spaceId: string,
      hotspot: { pitch: number; yaw: number; text: string; deviceId?: string }
    ) {
      const loadId = loadingService.show("Loading...");
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
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => loadingService.close(loadId));
    },
    async updateHotspot(
      spaceId: string,
      hotspotId: string,
      newHotspot: Hotspot
    ) {
      const loadId = loadingService.show("Loading...");
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
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => loadingService.close(loadId));
    },
    async deleteHotspot(spaceId: string, hotspotId: string) {
      const loadId = loadingService.show("Loading...");
      return adminAPI
        .delete(`/Panorama/${spaceId}/Hotspots/${hotspotId}`)
        .then(() => {
          this.currentPanorama.hotspots = this.currentPanorama.hotspots.filter(
            (hotspot) => hotspot.hotspotId !== hotspotId
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => loadingService.close(loadId));
    },
    async updateSpaceFeature(queryParams: string, spaceId: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .patch(`/Space/SpaceFeature?${queryParams}`)
        .then(() => this.getSpaceDetails(spaceId))
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => loadingService.close(loadId));
    },
    async getIntegrations(spaceId: string) {
      adminAPI
        .get<Ubiqisense[]>(`/Integration/${spaceId}/Integrations/`)
        .then((response) => {
          this.integrations = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },
    async getIntegration(spaceId: string, spaceIntegrationId: string) {
      const loadId = loadingService.show("Loading...");
      return adminAPI
        .get<Ubiqisense>(
          `/Integration/${spaceId}/Integrations/${spaceIntegrationId}`
        )
        .then((response) => {
          this.integration = response.data;
          return response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => loadingService.close(loadId));
    },
    async addIntegration(spaceId: string, integrationId: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .post<Ubiqisense>(
          `/Integration/${spaceId}/Space?integrationId=${integrationId}`
        )
        .then((response) => {
          this.integration = response.data;
          toastService.show(
            "Success",
            "Integration linked successfully",
            "success",
            "bottom"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => loadingService.close(loadId));
    },
    async updateIntegration(
      spaceId: string,
      spaceIntegrationId: string,
      requestBody: { ubiqisenseLocationId: string }
    ) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .patch<Ubiqisense>(
          `/Integration/${spaceId}/Space/${spaceIntegrationId}`,
          requestBody
        )
        .then((response) => {
          this.integration = response.data;
          this.getIntegrations(spaceId);
          toastService.show(
            "Success",
            "Integration updated successfully",
            "success",
            "bottom"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => loadingService.close(loadId));
    },
    async deleteIntegration(spaceId: string, spaceIntegrationId: string) {
      const loadId = loadingService.show("Loading...");
      return adminAPI
        .delete(`/Integration/${spaceId}/Space/${spaceIntegrationId}`)
        .then(() => {
          this.getIntegrations(spaceId);
          return "success";
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => loadingService.close(loadId));
    },
  },
});
