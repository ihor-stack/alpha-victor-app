import { defineStore } from "pinia";
import mixpanel from "mixpanel-browser";
import { publicAPI } from "@/axios";
import { PublicAccount, UserPermission, IUserData } from "@/types/index";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import router from "@/router";
import axios from "axios";
import Auth from "@/auth";
import { auth as useAuthStore } from "@/stores/authStore";
import {
  defaultTheme,
  Organisations as useOrganisationStore,
} from "@/stores/publicOrganisations";

export const Account = defineStore("Account", {
  state: () => {
    return {
      accountDetails: {} as PublicAccount,
      userPermission: {} as UserPermission,
    };
  },
  actions: {
    async getAccount() {
      return publicAPI
        .get<PublicAccount>("/Account/PersonalDetails")
        .then((response) => {
          this.accountDetails = response.data;
          return response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },
    async updateAccount() {
      return publicAPI
        .patch("/Account/PersonalDetails", this.accountDetails)
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },
    async getPermissions() {
      try {
        const response = await publicAPI.get<UserPermission>(
          "/Identity/GetUserPermissions"
        );
        this.userPermission = response.data;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.log(e);
          toastService.show("Error", "", "error", "bottom");
        }
      }
    },
    async registerUser(userData: IUserData) {
      const loadId = loadingService.show("Loading...");
      return publicAPI
        .post<any>("/Identity/Register", userData)
        .then(() => {
          toastService.show(
            "Success",
            "Your account has been created. Check your email to confirm your account.",
            "success",
            "bottom"
          );
          mixpanel.track("User Registered", { email: userData.email });
          router.replace({ name: "Home" });
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async sendEmailLoginLink(emailAddress: string) {
      const loadId = loadingService.show("Loading...");
      return publicAPI
        .post<any>("/Identity/SendEmailLoginLink", {
          emailAddress: emailAddress,
        })
        .then((response) => {
          toastService.show(
            "Success",
            "A login link has been sent to your email address. Check your inbox to continue.",
            "success",
            "bottom"
          );
          router.replace({ name: "Home" });
          return response;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async sendPasswordResetLink(emailAddress: string) {
      const loadId = loadingService.show("Loading...");
      return publicAPI
        .post<any>("/Identity/SendPasswordResetLink", {
          emailAddress: emailAddress,
        })
        .then((response) => {
          toastService.show(
            "Success",
            "A password reset link has been sent to your email address, if the address entered has an account.",
            "success",
            "bottom"
          );
          router.replace({ name: "Home" });
          return response;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async confirmPasswordReset(token: string, password: string) {
      const loadId = loadingService.show("Loading...");
      return publicAPI
        .post<any>("/Identity/ConfirmPasswordReset", {
          resetToken: token,
          newPassword: password,
        })
        .then((response) => {
          toastService.show(
            "Success",
            "Your password has been successfully reset, please login to continue.",
            "success",
            "bottom"
          );
          router.replace({ name: "Home" });
          return response;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async confirmEmailVerification(token: string) {
      return publicAPI
        .post<any>("/Identity/VerifyAccount", { verificationToken: token })
        .then((response) => {
          return response;
        });
    },
    clearAccountDetails() {
      this.accountDetails = {} as PublicAccount;
    },
    logoutPermission() {
      this.userPermission = {
        isGlobalAdmin: false,
        isGuest: false,
        isOrganisationAdmin: false,
        organisationGroups: [],
      };
    },
    async deleteAccount() {
      const loadId = loadingService.show("Loading...");
      publicAPI
        .delete<PublicAccount>("/Account/DeleteAccount")
        .then(() => {
          this.logout();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async logout() {
      const authService = new Auth();
      const authStore = useAuthStore();
      const organisationStore = useOrganisationStore();
      const authRes = await authService.logout();
      if (authRes) {
        mixpanel.track("User Logged Out", {
          email: this.accountDetails.email,
        });
        authStore.setAuthStatus(false);
        this.logoutPermission();
        this.clearAccountDetails();
        organisationStore.clearOrg();
        await organisationStore.setOrgTheme(defaultTheme);

        const root = document.querySelector(":root") as HTMLElement;
        root.style.setProperty(
          "--theme-image",
          `url('/img/lines-no-logo.svg')`
        );
        root.style.setProperty("--ion-color-primary", "#041aff");
        return router.replace({ name: "Home" });
      }
    },
  },
});
