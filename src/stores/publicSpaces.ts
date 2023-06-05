import { defineStore } from "pinia";
import { publicAPI, adminAPI } from "@/axios";
import {
  DetailedSpace,
  Space,
  Device,
  SelectItem,
  SingleFloor,
  SpecificFloor,
  SpaceBeacon,
  SpaceWifi,
  SpaceNewDocument,
  NewPhoto,
} from "@/types/index";
import { useCookies } from "vue3-cookies";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

const { cookies } = useCookies();

export const Spaces = defineStore("Spaces", {
  state: () => {
    return {
      currentSpace: {} as DetailedSpace,
      currentSpaceId: "" as string | undefined,
      favouriteSpaces: [] as Space[],
      recentlyViewedSpaces: [] as Space[],
      devices: [] as Device[],
    };
  },
  actions: {
    setCurrentSpaceId(newId: string) {
      this.currentSpaceId = newId;
      cookies.set("spaceId", newId);
      return true;
    },
    async getSpaceDetails(id: string) {
      loadingService.show("Loading...");
      publicAPI
        .get<DetailedSpace>(
          `/Space/${
            id || this.currentSpaceId || cookies.get("spaceId")
          }/Details`
        )
        .then((response) => {
          this.currentSpace = response.data;
          this.currentSpaceId = response.data.id;
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

    async getSpaceDevices(spaceId: string) {
      loadingService.show("Loading...");
      publicAPI
        .get<Device[]>(
          `/Space/${
            spaceId || this.currentSpaceId || cookies.get("spaceId")
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
  },
});
