import { defineStore } from "pinia";
import { publicAPI } from "@/axios";
import { PublicAccount } from "@/types/index";
import toastService from "@/services/toastService";

export const Account = defineStore("Account", {
  state: () => {
    return {
      accountDetails: {} as PublicAccount,
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
  },
});
