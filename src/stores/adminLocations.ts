import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import {
  Location,
  NavLocation,
  NewLocDetails,
  Navigation,
  SingleLocation,
} from "@/types/index";
import { useCookies } from "vue3-cookies";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";
import router from '@/router';

const { cookies } = useCookies();

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
        wifiSsid: "",
        wifiPassword: "",
        addressLines: ["", ""],
        city: "",
        postcode: "",
      } as SingleLocation,
    };
  },
  actions: {
    async getLocations() {
      adminAPI
        .get<NavLocation[]>("/Location?organisationId=" + cookies.get("orgId"))
        .then((response) => {
          this.locations = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    // async saveLocation(edit: Location) {
    //   adminAPI
    //     .post("/Location/" + cookies.get("orgId"), {
    //       name: "string",
    //       prefix: "string",
    //       mainContactName: "string",
    //       email: "string",
    //       phone: "string",
    //       sosNumber: "string",
    //       wifiSsid: "string",
    //       wifiPassword: "string",
    //       postcode: "string",
    //       city: "string",
    //       addressLines: ["string"],
    //     })
    //     .then(() => {
    //       this.getLocations();
    //     })
    //     .catch((error) => {
    //       toastService.show("Error", error, "error", "top");
    //     });
    // },

    async saveLocation() {
      const newLocation = this.newLocationDetails;
      loadingService.show("Loading...");
      adminAPI
        .post("/Location?organisationId=" + cookies.get("orgId"), {
          name: newLocation.name,
          prefix: newLocation.prefix,
        }
      )
      .then((response) => {
        loadingService.close();
        cookies.set('locationId', response.data.id);
        toastService.show(
          "Success",
          "New location added",
          "success",
          "top"
        );
        this.getNavigationTree();
        router.push('/admin/organisation/' + cookies.get("orgId") + '/location/' + response.data.id);
      })
      .catch((error) => {
        toastService.show("Error", error, "error", "top");
      });
    },

    async removeLocation(id: string) {
      adminAPI
        .delete("/Location/" + cookies.get("orgId") + "/" + id)
        .then(() => {
          this.getLocations();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async getLocation() {
      loadingService.show("Loading...");
      adminAPI
        .get("/Location/Location/" + cookies.get("locationId"))
        .then((response) => {
          this.location = response.data;
          loadingService.close();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async updateLocation(id: string) {
      adminAPI
        .patch("/Location/" + id, this.location)
        .then(() => {
          toastService.show(
            "Success",
            "Location updated successfully",
            "success",
            "top"
          );
          this.getNavigationTree()
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async getNavigationTree() {
      loadingService.show("Loading...");
      adminAPI
        .get<Navigation[]>(
          "/Organisation/" + cookies.get("orgId") + "/NavigationTree"
        )
        .then((response) => {
          if (response.data) {
            response.data.forEach(navigation => {
              if (Array.isArray(navigation.locations)) {
                navigation.locations.sort((a, b) => a.locationName.localeCompare(b.locationName));
              }
            });
            this.navigationTree = response.data;
          }
          loadingService.close();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },
  },
  getters: {
    Locations: (state) => state.locations,
  },
});