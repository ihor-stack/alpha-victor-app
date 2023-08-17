import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import router from "@/router";
import { SingleFloor, SpecificFloor, NewFloorDetails } from "@/types/index";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";
import { Locations } from "./adminLocations";
import confirmToLeaveService from "@/services/confirmToLeaveService";

export const Floors = defineStore("Floors", {
  state: () => {
    return {
      floors: [] as SingleFloor[],
      newFloorDetails: {} as NewFloorDetails,
      floor: {} as SpecificFloor,
    };
  },
  actions: {
    async getFloors(locationId: string) {
      adminAPI
        .get<SingleFloor[]>(`/Floor?locationId=${locationId}`)
        .then((response) => {
          this.floors = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async saveFloor(organisationId: string, locationId: string) {
      const newFloor = this.newFloorDetails;
      const loadId = loadingService.show("Loading...");
      adminAPI
        .post(`/Floor?locationId=${locationId}`, {
          longName: newFloor.longName,
          shortName: newFloor.shortName,
        })
        .then(() => {
          toastService.show("Success", "New floor added", "success", "bottom");
          const locationsStore = Locations();
          this.getFloors(locationId);
          locationsStore.getNavigationTree(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async updateFloor(organisationId: string, id: string) {
      adminAPI
        .patch("/Floor/" + id, {
          longName: this.floor.name,
          shortName: this.floor.shortName,
        })
        .then(() => {
          toastService.show(
            "Success",
            "Floor updated successfully",
            "success",
            "bottom"
          );
          const locationsStore = Locations();
          confirmToLeaveService.setEditing(false);
          locationsStore.getNavigationTree(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async deleteFloor(id: string, orgId: string, locationId: string) {
      return adminAPI
        .delete("/floor/?floorId=" + id)
        .then(() => {
          confirmToLeaveService.setEditing(false);
          toastService.show(
            "Success",
            "Floor deleted successfully",
            "success",
            "bottom"
          );
          router.push({
            name: "OrganisationViewLocations",
            params: { id: orgId, locationId: locationId },
          });
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async getFloorDetails(id: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .get<SpecificFloor>(`/Floor/${id}`)
        .then((response) => {
          this.floor = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async updateFloorOrder(
      floors: { id: string; order: number }[],
      locationId: string
    ) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .patch("/Floor/Order", floors)
        .then(() => {
          toastService.show(
            "Success",
            "Floor order updated successfully",
            "success",
            "bottom"
          );
          confirmToLeaveService.setEditing(false);
          this.getFloors(locationId);
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
    Floors: (state) => state.floors,
    Floor: (state) => state.floor,
  },
});
