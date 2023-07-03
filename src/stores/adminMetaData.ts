import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import { AdminMetaData, spaceFeature, spaceType } from "@/types/index";
import { useCookies } from "vue3-cookies";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

const { cookies } = useCookies();

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

    async getMetaData() {
      loadingService.show("Loading...");
      adminAPI
        .get<AdminMetaData>(
          "/Organisation/" + cookies.get("orgId") + "/Metadata"
        )
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

    async saveSpaceType(name: string) {
      adminAPI
        .post("/Organisation/" + cookies.get("orgId") + "/SpaceType/", {
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
          this.getMetaData();
        })
        .catch((error) => {
          toastService.show("Error", error.response.data, "error", "top");
        });
    },

    async editSpaceType(edit: spaceType) {
      adminAPI
        .patch(
          "/Organisation/" +
            cookies.get("orgId") +
            "/SpaceType/" +
            edit.spaceTypeId,
          {
            name: edit.name,
            icon: "string",
          }
        )
        .then(() => {
          this.metaData = {} as AdminMetaData;
          this.getMetaData();
        })
        .catch((error) => {
          toastService.show("Error", error.response.data, "error", "top");
        });
    },

    async removeSpaceType(edit: spaceType) {
      adminAPI
        .delete(
          "/Organisation/" +
            cookies.get("orgId") +
            "/SpaceType/" +
            edit.spaceTypeId
        )
        .then(() => {
          this.metaData = {} as AdminMetaData;
          this.getMetaData();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async saveSpaceFeature(name: string) {
      adminAPI
        .post("/Organisation/" + cookies.get("orgId") + "/SpaceFeature/", {
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
          this.getMetaData();
        })
        .catch((error) => {
          toastService.show("Error", error.response.data, "error", "top");
        });
    },

    async editSpaceFeature(
      edit: spaceFeature,
      organisationId = cookies.get("orgId")
    ) {
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
          this.getMetaData();
        })
        .catch((error) => {
          toastService.show("Error", error.response.data, "error", "top");
        });
    },
    async removeSpaceFeature(edit: spaceFeature) {
      adminAPI
        .delete(
          "/Organisation/" +
            cookies.get("orgId") +
            "/SpaceFeature/" +
            edit.spaceFeatureId
        )
        .then(() => {
          this.metaData = {} as AdminMetaData;
          this.getMetaData();
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
