import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import { Integration, Ubiqisense } from "@/types/index";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";
import confirmToLeaveService from "@/services/confirmToLeaveService";

export const Integrations = defineStore("Integrations", {
  state: () => {
    return {
      integrations: [] as Integration[],
      integration: {} as Integration,
      ubiqisenses: [] as Ubiqisense[],
    };
  },
  actions: {
    async getIntegrations(organisationId: string) {
      adminAPI
        .get<Integration[]>(`/Organisation/${organisationId}/Integration`)
        .then((response) => {
          this.integrations = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },
    async getSingleIntegration(organisationId: string, integrationId: string) {
      adminAPI
        .get<Integration>(
          `/Organisation/${organisationId}/Integration/${integrationId}`
        )
        .then((response) => {
          this.integration = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },
    async editIntegration(integrationId: string, edit: Integration) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .patch(
          `/Organisation/${edit.selectedOrgnisation}/Integration/${integrationId}`,
          edit
        )
        .then(() => {
          confirmToLeaveService.setEditing(false);
          toastService.show(
            "Success",
            "Integration updated",
            "success",
            "bottom"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async getUbiqisenses(organisationId: string) {
      adminAPI
        .get<Ubiqisense[]>(
          `/Integration/Ubiqisense/Organisations?organisationId=${organisationId}`
        )
        .then((response) => {
          this.ubiqisenses = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },
  },
  getters: {
    getIntegration: (state) => state.integrations,
  },
});
