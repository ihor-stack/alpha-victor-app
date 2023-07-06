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
    setId(newId: string) {
      this.currentOrganisationId = newId;
      return true;
    },
    async getOrganisations() {
      loadingService.show("Loading...");
      publicAPI
        .get<AdminOrganisation[]>("/Organisation/")
        .then((response) => {
          this.organisationList = response.data;
          if (response.data.length > 0) {
            this.currentOrganisationId = response.data[0].organisationId;
          }
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
          `/Organisation/${id || this.currentOrganisationId}/Details`
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
    async getSearchNavigationTree(id: string) {
      loadingService.show("Loading...");
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
    async getOrgTheme(id: string) {
      loadingService.show("Loading...");
      publicAPI
        .get<Theme>(`/Organisation/${id || this.currentOrganisationId}/Theme`)
        .then((response) => {
          this.theme = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },
    async setOrgTheme(theme = defaultTheme) {
      this.theme = theme;
    },
  },
  getters: {
    getList: (state) => state.organisationList,
    getId: (state) => state.currentOrganisationId,
    currentOrganisationDetails: (state) => state.currentOrganisation,
  },
});
