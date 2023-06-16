import { defineStore } from "pinia";
import { publicAPI } from "@/axios";
import { AdminOrganisation, OrgDetails, Location } from "@/types/index";

import { useCookies } from "vue3-cookies";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

const { cookies } = useCookies();

export const Organisations = defineStore("Organisations", {
  state: () => {
    return {
      organisationList: [] as AdminOrganisation[],
      currentOrganisation: {} as OrgDetails,
      currentOrganisationId: "" as string,
      searchNavigationTree: [] as Location[],
    };
  },
  actions: {
    setId(newId: string) {
      this.currentOrganisationId = newId;
      cookies.set("publicOrgId", newId);
      return true;
    },
    async getOrganisations() {
      loadingService.show("Loading...");
      publicAPI
        .get<AdminOrganisation[]>("/Organisation/")
        .then((response) => {
          this.organisationList = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },
    async getOrgDetails(id: string) {
      loadingService.show("Loading...");
      publicAPI
        .get<OrgDetails>(
          `/Organisation/${
            id || this.currentOrganisationId || cookies.get("publicOrgId")
          }/Details`
        )
        .then((response) => {
          this.currentOrganisation = response.data;
          this.currentOrganisationId = response.data.id;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },
    async getSearchNavigationTree() {
      loadingService.show("Loading...");
      const id = this.currentOrganisationId || cookies.get("publicOrgId");
      if (id) {
        publicAPI
          .get<Location[]>(`/Organisation/${id}/SearchNavigationTree`)
          .then((response) => {
            this.searchNavigationTree = response.data;
          })
          .catch((error) => {
            toastService.show("Error", error, "error", "top");
          })
          .finally(() => {
            loadingService.close();
          });
      }
    },
  },
  getters: {
    getList: (state) => state.organisationList,
    getId: (state) => state.currentOrganisationId || cookies.get("publicOrgId"),
    currentOrganisationDetails: (state) => state.currentOrganisation,
  },
});
