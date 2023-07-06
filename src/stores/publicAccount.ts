import { defineStore } from "pinia";
import { publicAPI } from "@/axios";
import { PublicAccount, Permission, IUserData } from "@/types/index";
import toastService from "@/services/toastService";

export const Account = defineStore("Account", {
  state: () => {
    return {
      accountDetails: {} as PublicAccount,
      permissions: [] as Permission[],
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
          console.log(error);
          toastService.show("Error", error, "error", "top");
        });
    },
    async getPermissions() {
      publicAPI
        .get<Permission[]>("/Identity/GetUserPermissions")
        .then((response) => {
          this.permissions = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },
    async registerUser(userData: IUserData) {
      return publicAPI
        .post<any>("/Identity/Register", userData)
        .then((response) => {
          return response;
        });
    },
  },
});
