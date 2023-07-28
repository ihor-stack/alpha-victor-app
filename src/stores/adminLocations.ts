import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import {
  NavLocation,
  NewLocDetails,
  Navigation,
  SingleLocation,
} from "@/types/index";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";
import router from "@/router";
import confirmToLeaveService from "@/services/confirmToLeaveService";

export const Locations = defineStore("Locations", {
  state: () => {
    return {
      locations: [] as NavLocation[],
      navigationTree: [{}] as Navigation[],
      newLocationDetails: {} as NewLocDetails,
      location: {
        id: "",
        name: "",
        prefix: "",
        mainContactName: "",
        email: "",
        phone: "",
        sosNumber: "",
        sosVip: "",
        wifiSsid: "",
        wifiPassword: "",
        addressLine0: "",
        addressLine1: "",
        city: "",
        postcode: "",
      } as SingleLocation,
    };
  },
  actions: {
    async getLocations(organisationId: string) {
      adminAPI
        .get<NavLocation[]>(`/Location?organisationId=${organisationId}`)
        .then((response) => {
          this.locations = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async saveLocation(organisationId: string) {
      const newLocation = this.newLocationDetails;
      const loadId = loadingService.show("Loading...");
      adminAPI
        .post(`/Location?organisationId=${organisationId}`, {
          name: newLocation.name,
          prefix: newLocation.prefix,
        })
        .then((response) => {
          loadingService.close(loadId);
          toastService.show(
            "Success",
            "New location added",
            "success",
            "bottom"
          );
          this.getNavigationTree(organisationId);
          router.push(
            `/admin/organisation/${organisationId}/location/${response.data.id}`
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async removeLocation(organisationId: string, locationId: string) {
      adminAPI
        .delete(`/Location/${locationId}`)
        .then(() => {
          this.getLocations(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async getLocation(locationId: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .get(`/Location/Location/${locationId}`)
        .then((response) => {
          this.location = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async updateLocation(organisationId: string, id: string) {
      adminAPI
        .patch("/Location/" + id, this.location)
        .then(() => {
          toastService.show(
            "Success",
            "Location updated successfully",
            "success",
            "bottom"
          );
          confirmToLeaveService.setEditing(true);
          this.getNavigationTree(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async getNavigationTree(organisationId: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .get<Navigation[]>(`/Organisation/${organisationId}/NavigationTree`)
        .then((response) => {
          if (response.data) {
            response.data.forEach((navigation) => {
              if (Array.isArray(navigation.locations)) {
                navigation.locations.sort((a, b) =>
                  a.locationName.localeCompare(b.locationName)
                );
              }
            });
            this.navigationTree = response.data;
          }
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
  },
  getters: {
    Locations: (state) => state.locations,
  },
});
