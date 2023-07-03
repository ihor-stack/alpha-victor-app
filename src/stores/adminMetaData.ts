import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import { AdminMetaData, spaceFeature, spaceType } from "@/types/index";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

export const MetaData = defineStore("MetaData", {
  state: () => {
    return {
      metaData: {} as AdminMetaData,
    };
  },
  actions: {
    setSpaceType(index: number, data: spaceType) {
      this.metaData.spaceTypes[index] = data;
    },

    async getMetaData(organisationId: string) {
      loadingService.show("Loading...");
      adminAPI
        .get<AdminMetaData>(`/Organisation/${organisationId}/Metadata`)
        .then((response) => {
          if (response.data) {
            if (Array.isArray(response.data.spaceTypes)) {
              response.data.spaceTypes.sort((a, b) =>
                a.name.localeCompare(b.name)
              );
            }
            if (Array.isArray(response.data.spaceFeatures)) {
              response.data.spaceFeatures.sort((a, b) =>
                a.name.localeCompare(b.name)
              );
            }
            this.metaData = response.data;
          }
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async saveSpaceType(organisationId: string, name: string) {
      adminAPI
        .post(`/Organisation/${organisationId}/SpaceType/`, {
          name: name,
          icon: "string",
        })
        .then(() => {
          toastService.show(
            "Success",
            "New space type added successfully",
            "success",
            "top"
          );
          this.getMetaData(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async editSpaceType(organisationId: string, edit: spaceType) {
      adminAPI
        .patch(
          `/Organisation/${organisationId}/SpaceType/${edit.spaceTypeId}`,
          {
            name: edit.name,
            icon: "string",
          }
        )
        .then(() => {
          this.metaData = {} as AdminMetaData;
          this.getMetaData(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async removeSpaceType(organisationId: string, edit: spaceType) {
      adminAPI
        .delete(`/Organisation/${organisationId}/SpaceType/${edit.spaceTypeId}`)
        .then(() => {
          this.metaData = {} as AdminMetaData;
          this.getMetaData(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async saveSpaceFeature(organisationId: string, name: string) {
      adminAPI
        .post(`/Organisation/${organisationId}/SpaceFeature/`, {
          name: name,
          icon: "string",
        })
        .then(() => {
          toastService.show(
            "Success",
            "New space feature added successfully",
            "success",
            "top"
          );
          this.metaData = {} as AdminMetaData;
          this.getMetaData(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async editSpaceFeature(organisationId: string, edit: spaceFeature) {
      return adminAPI
        .patch(
          `/Organisation/${organisationId}/SpaceFeature/${edit.spaceFeatureId}`,
          {
            name: edit.name,
            icon: "string",
          }
        )
        .then(() => {
          this.metaData = {} as AdminMetaData;
          this.getMetaData(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },
    async removeSpaceFeature(organisationId: string, edit: spaceFeature) {
      adminAPI
        .delete(
          `/Organisation/${organisationId}/SpaceFeature/${edit.spaceFeatureId}`
        )
        .then(() => {
          this.metaData = {} as AdminMetaData;
          this.getMetaData(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },
  },
  getters: {
    getMeta: (state) => state.metaData,
  },
});
