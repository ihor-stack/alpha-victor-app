import { defineStore } from "pinia";
import { publicAPI } from "@/axios";
import { PublicAccount, UserPermission, IUserData } from "@/types/index";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import router from "@/router";

export const Account = defineStore("Account", {
  state: () => {
    return {
      accountDetails: {} as PublicAccount,
      userPermission: {} as UserPermission,
    };
  },
  actions: {
    async getAccount() {
      publicAPI
        .get<PublicAccount>("/Account/PersonalDetails")
        .then((response) => {
          this.accountDetails = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },
    async updateAccount() {
      return publicAPI
        .patch("/Account/PersonalDetails", this.accountDetails)
        .then(() => {
          toastService.show(
            "Success",
            "Profile details updated",
            "success",
            "top"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },
    async getPermissions() {
      publicAPI
        .get<UserPermission>("/Identity/GetUserPermissions")
        .then((response) => {
          this.userPermission = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
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
            "top"
          );
          router.replace({ name: "Home" });
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async sendEmailLoginLink(emailAddress: string) {
      const loadId = loadingService.show("Loading...");
      return publicAPI
        .post<any>("/Identity/SendEmailLoginLink", {emailAddress: emailAddress})
        .then((response) => {
          toastService.show(
            "Success",
            "A login link has been sent to your email address. Check your inbox to continue.",
            "success",
            "top"
          );
          router.replace({ name: "Home" });
          return response;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async sendPasswordResetLink(emailAddress: string) {
      const loadId = loadingService.show("Loading...");
      return publicAPI
        .post<any>("/Identity/SendPasswordResetLink", {emailAddress: emailAddress})
        .then((response) => {
          toastService.show(
            "Success",
            "A password reset link has been sent to your email address, if the address entered has an account.",
            "success",
            "top"
          );
          router.replace({ name: "Home" });
          return response;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async confirmPasswordReset(token: string, password: string) {
      const loadId = loadingService.show("Loading...");
      return publicAPI
        .post<any>("/Identity/ConfirmPasswordReset", {resetToken: token, newPassword: password })
        .then((response) => {
          toastService.show(
            "Success",
            "Your password has been successfully reset, please login to continue.",
            "success",
            "top"
          );
          router.replace({ name: "Home" });
          return response;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async confirmEmailVerification(token: string) {
      return publicAPI
        .post<any>("/Identity/VerifyAccount", {verificationToken: token })
        .then((response) => {
          return response;
        });
    },
  },
});
