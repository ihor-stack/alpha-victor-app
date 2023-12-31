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
      usersData: { totalCount: 0, users: [] } as UserResponse,
      userGroups: [] as UserGroupResponse[],
    };
  },
  actions: {
    async getUsers(page = 1, pageSize = 10) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .get<UserResponse>(`/User?page=${page}&pageSize=${pageSize}`)
        .then((response) => {
          if (response.data) {
            this.usersData = response.data;
          }
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
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
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async updateUserRole(
      id: string,
      requestBody: UserGroupRequest,
      shouldRefresh = true
    ) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .patch(`/User/${id}`, requestBody)
        .then(() => {
          if (shouldRefresh) {
            this.getUsers();
          }
          toastService.show(
            "Success",
            "Users permissions updated successfully",
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
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async assignRole(organisationId: string, userId: string, groupId: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .patch(
          `/User/AssignRole?organisationId=${organisationId}&userId=${userId}&groupId=${groupId}`
        )
        .then(() => {
          toastService.show(
            "Success",
            "Users role updated successfully",
            "success",
            "bottom"
          );
          this.getUsers();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
  },
});
