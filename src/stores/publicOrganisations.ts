import { defineStore } from "pinia";
import { publicAPI } from "@/axios";
import { AdminOrganisation, OrgDetails, Location, Theme } from "@/types/index";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

export const defaultTheme = {
  darkmodeEnabled: true,
  logo: require("@/theme/img/logo/logo-without-name.svg"),
} as Theme;

export const Organisations = defineStore("PublicOrganisations", {
  state: () => {
    return {
      organisationList: [] as AdminOrganisation[],
      currentOrganisation: {} as OrgDetails,
      currentOrganisationId: "" as string,
      searchNavigationTree: [] as Location[],
      theme: defaultTheme,
    };
  },
  actions: {
    setOrganisationId(newId: string) {
      this.currentOrganisationId = newId;
      localStorage.setItem("currentOrganisationId", newId);
      this.getOrgDetails(newId);
    },
    async getOrganisations() {
      const loadId = loadingService.show("Loading...");
      return publicAPI
        .get<AdminOrganisation[]>("/Organisation/")
        .then((response) => {
          this.organisationList = response.data;
          if (!this.currentOrganisationId && response.data.length > 0) {
            this.setOrganisationId(response.data[0].organisationId);
          }
          return response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async getOrgDetails(id: string) {
      const loadId = loadingService.show("Loading...");
      publicAPI
        .get<OrgDetails>(
          `/Organisation/${id || this.currentOrganisationId}/Details`
        )
        .then((response) => {
          this.currentOrganisation = response.data;
          this.currentOrganisationId = response.data.id;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async getSearchNavigationTree(id: string) {
      const loadId = loadingService.show("Loading...");
      if (id) {
        publicAPI
          .get<Location[]>(`/Organisation/${id}/SearchNavigationTree`)
          .then((response) => {
            this.searchNavigationTree = response.data;
          })
          .catch((error) => {
            toastService.show("Error", error, "error", "bottom");
          })
          .finally(() => {
            loadingService.close(loadId);
          });
      }
    },
    async getOrgTheme(id: string) {
      const loadId = loadingService.show("Loading...");
      return publicAPI
        .get<Theme>(`/Organisation/${id || this.currentOrganisationId}/Theme`)
        .then((response) => {
          this.theme = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async setOrgTheme(theme = defaultTheme) {
      this.theme = theme;
    },
    clearOrg() {
      this.currentOrganisation = {} as OrgDetails;
      this.currentOrganisationId = "";
      localStorage.removeItem("currentOrganisationId");
      this.organisationList = [];
      this.searchNavigationTree = [];
    },
  },
  getters: {
    getList: (state) => state.organisationList,
    getId: (state) => state.currentOrganisationId,
    currentOrganisationDetails: (state) => state.currentOrganisation,
  },
});
