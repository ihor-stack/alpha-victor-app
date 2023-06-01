import { defineStore } from "pinia";
import { publicAPI } from "@/axios";
import {
  DetailedSpace,
  SelectItem,
  SingleFloor,
  SpaceDevices,
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
      space: {} as DetailedSpace,
      currentSpaceId: "" as string,
      favouriteSpaces: [] as DetailedSpace[],
      recentlyViewedSpaces: [] as DetailedSpace[],
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
          this.space = response.data;
          this.currentSpaceId = response.data.id;
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
        .get<DetailedSpace[]>("/Dashboard/Favourite")
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

    async getRecentlyViewedSpaces() {
      loadingService.show("Loading...");
      publicAPI
        .get<DetailedSpace[]>("/Dashboard/RecentlyViewed")
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
  },
});
