import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import { AdminTheme } from "@/types/index";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";
import confirmToLeaveService from "@/services/confirmToLeaveService";

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
          confirmToLeaveService.setEditing(false);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    saveThemes(organisationId: string) {
      const loadId = loadingService.show("Loading...");

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
            "bottom"
          );
          confirmToLeaveService.setEditing(false);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    removeLogo(organisationId: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .delete(`/Organisation/${organisationId}/ClearLogo`)
        .then(() => {
          toastService.show(
            "Success",
            "Logo removed successfully",
            "success",
            "bottom"
          );
          this.getThemes(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    removeBackgroundImage(organisationId: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .delete(`/Organisation/${organisationId}/ClearBackground`)
        .then(() => {
          toastService.show(
            "Success",
            "Logo removed successfully",
            "success",
            "bottom"
          );
          this.getThemes(organisationId);
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
    getTheme: (state) => state.theme,
  },
});
