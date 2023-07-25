import { defineStore } from "pinia";
import { publicAPI } from "@/axios";
import {
  DetailedSpace,
  Space,
  Device,
  Panorama,
  SpaceQRCodeResponse,
} from "@/types/index";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";

const organisationStore = useOrganisationStore();

export const Spaces = defineStore("PublicSpaces", {
  state: () => {
    return {
      currentSpace: {} as DetailedSpace,
      currentId: "" as string | undefined,
      favouriteSpaces: [] as Space[],
      recentlyViewedSpaces: [] as Space[],
      nearbySpaces: [] as Space[],
      devices: [] as Device[],
      currentPanorama: {} as Panorama,
    };
  },
  actions: {
    setcurrentId(newId: string) {
      this.currentId = newId;
      return true;
    },
    async getSpaceDetails(id: string) {
      const loadId = loadingService.show("Loading...");
      publicAPI
        .get<DetailedSpace>(`/Space/${id || this.currentId}/Details`)
        .then((response) => {
          this.currentSpace = response.data;
          this.currentId = response.data.id;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getFavouriteSpaces() {
      const loadId = loadingService.show("Loading...");
      publicAPI
        .get<Space[]>("/Dashboard/Favourite")
        .then((response) => {
          this.favouriteSpaces = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async setFavouriteSpace(spaceId: string, isFavourite: boolean) {
      const loadId = loadingService.show("Loading...");
      publicAPI
        .post<Space>(`/Space/${spaceId}/Favourite?isFavourite=${isFavourite}`)
        .then(() => {
          this.getFavouriteSpaces();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async setRecentlyViewedSpace(spaceId: string) {
      const loadId = loadingService.show("Loading...");
      publicAPI
        .post<Space>(`/Space/${spaceId}/RecentlyViewed`)
        .then(() => {
          this.getRecentlyViewedSpaces();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getRecentlyViewedSpaces() {
      const organisationId = organisationStore.currentOrganisationId;
      if (!organisationId) return;
      const loadId = loadingService.show("Loading...");
      publicAPI
        .get<Space[]>(`/Dashboard/RecentlyViewed/${organisationId}`)
        .then((response) => {
          this.recentlyViewedSpaces = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getNearbySpace(uuid: string, major: number, minor: number) {
      const loadId = loadingService.show("Loading...");
      publicAPI
        .get<Space>(`/Dashboard/ByBeacon/${uuid}/${major}/${minor}`)
        .then((response) => {
          if (response.data) {
            this.nearbySpaces.push(response.data);
          }
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getSpaceDevices(spaceId: string) {
      const loadId = loadingService.show("Loading...");
      publicAPI
        .get<Device[]>(`/Space/${spaceId || this.currentId}/Devices`)
        .then((response) => {
          this.devices = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getSpaceByQr(
      orgPrefix: string,
      locPrefix: string,
      floorShortName: string,
      spaceShortCode: string
    ) {
      const loadId = loadingService.show("Loading...");
      return publicAPI
        .get<SpaceQRCodeResponse>(
          `/Space/SpaceByQR/${orgPrefix}/${locPrefix}/${floorShortName}/${spaceShortCode}`
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
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
      const loadId = loadingService.show("Loading...");
      publicAPI
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
          loadingService.close(loadId);
        });
    },
  },
  getters: {
    currentSpaceId: (state) => state.currentId,
  },
});
