import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import {
  UserResponse,
  UserGroupResponse,
  UserGroupRequest,
} from "@/types/index";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

export const adminUsers = defineStore("adminUsers", {
  state: () => {
    return {
      users: [] as UserResponse[],
      userGroups: [] as UserGroupResponse[],
    };
  },
  actions: {
    async getUsers() {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .get<UserResponse[]>("/User")
        .then((response) => {
          if (response.data) {
            this.users = response.data;
          }
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async getUserGroups() {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .get<UserGroupResponse[]>("/User/Groups")
        .then((response) => {
          if (response.data) {
            this.userGroups = response.data;
          }
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async updateUserRole(id: string, requestBody: UserGroupRequest) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .patch(`/User/${id}`, requestBody)
        .then(() => {
          this.getUsers();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async removeFromOrg(userId: string, organisationId: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .delete(
          `/User/RemoveFromOrg?userId=${userId}&organisationId=${organisationId}`
        )
        .then(() => {
          this.getUsers();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
  },
});
