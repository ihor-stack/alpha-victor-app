import { defineStore } from "pinia";
import { publicAPI, adminAPI } from "@/axios";
import { DetailedSpace, Space, Device, Panorama } from "@/types/index";
import { useCookies } from "vue3-cookies";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

const { cookies } = useCookies();

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
      cookies.set("spaceId", newId);
      return true;
    },
    async getSpaceDetails(id: string) {
      loadingService.show("Loading...");
      publicAPI
        .get<DetailedSpace>(
          `/Space/${id || this.currentId || cookies.get("spaceId")}/Details`
        )
        .then((response) => {
          this.currentSpace = response.data;
          this.currentId = response.data.id;
          cookies.set("spaceId", response.data.id || "");
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    async getFavouriteSpaces() {
      loadingService.show("Loading...");
      publicAPI
        .get<Space[]>("/Dashboard/Favourite")
        .then((response) => {
          this.favouriteSpaces = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    async setFavouriteSpace(spaceId: string, isFavourite: boolean) {
      loadingService.show("Loading...");
      publicAPI
        .post<Space>(`/Space/${spaceId}/Favourite?isFavourite=${isFavourite}`)
        .then(() => {
          this.getFavouriteSpaces();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    async setRecentlyViewedSpace(spaceId: string) {
      loadingService.show("Loading...");
      publicAPI
        .post<Space>(`/Space/${spaceId}/RecentlyViewed`)
        .then(() => {
          this.getRecentlyViewedSpaces();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    async getRecentlyViewedSpaces() {
      loadingService.show("Loading...");
      publicAPI
        .get<Space[]>("/Dashboard/RecentlyViewed")
        .then((response) => {
          this.recentlyViewedSpaces = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    async getNearbySpace(uuid: string, major: number, minor: number) {
      loadingService.show("Loading...");
      publicAPI
        .get<Space>(`/Dashboard/ByBeacon/${uuid}/${major}/${minor}`)
        .then((response) => {
          this.nearbySpaces.push(response.data);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    async getSpaceDevices(spaceId: string) {
      loadingService.show("Loading...");
      publicAPI
        .get<Device[]>(
          `/Space/${
            spaceId || this.currentId || cookies.get("spaceId")
          }/Devices`
        )
        .then((response) => {
          this.devices = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
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
          loadingService.close();
        });
    },
  },
  getters: {
    currentSpaceId: (state) => state.currentId || cookies.get("spaceId"),
  },
});
