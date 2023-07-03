import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import { AdminTheme } from "@/types/index";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

export const Theme = defineStore("Themes", {
  state: () => {
    return {
      theme: {} as AdminTheme,
    };
  },
  actions: {
    async getThemes(organisationId: string) {
      adminAPI
        .get<AdminTheme>(`/Organisation/${organisationId}/Theme`)
        .then((response) => {
          this.theme = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    saveThemes(organisationId: string) {
      loadingService.show("Loading...");

      const themeToSave = {
        darkmodeEnabled: this.theme.darkmodeEnabled,
        primaryColour: this.theme.primaryColour,
        secondaryColour: this.theme.secondaryColour,
        logoBase64Payload: this.theme.logoBase64Payload,
        logoFileName: this.theme.logoFileName,
        logoContentType: this.theme.logoContentType,
        backgroundBase64Payload: this.theme.backgroundBase64Payload,
        backgroundFileName: this.theme.backgroundFileName,
        backgroundContentType: this.theme.backgroundContentType,
      };

      adminAPI
        .patch(`/Organisation/${organisationId}/Theme`, themeToSave)
        .then(() => {
          toastService.show(
            "Success",
            "Theme information updated",
            "success",
            "top"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    removeLogo(organisationId: string) {
      loadingService.show("Loading...");
      adminAPI
        .delete(`/Organisation/${organisationId}/ClearLogo`)
        .then(() => {
          toastService.show(
            "Success",
            "Logo removed successfully",
            "success",
            "top"
          );
          this.getThemes(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    removeBackgroundImage(organisationId: string) {
      loadingService.show("Loading...");
      adminAPI
        .delete(`/Organisation/${organisationId}/ClearBackground`)
        .then(() => {
          toastService.show(
            "Success",
            "Logo removed successfully",
            "success",
            "top"
          );
          this.getThemes(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },
  },
  getters: {
    getTheme: (state) => state.theme,
  },
});
