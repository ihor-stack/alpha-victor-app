<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ $t("pages.admin.users.title") }}
    </h1>
    <ion-grid>
      <ion-row class="header-row">
        <ion-col :size="isGlobalAdmin ? '4' : '3'">
          <div class="flex ion-align-items-center">
            <ion-icon :icon="search" size="small" />
            <ion-text class="ml-2">{{
              $t("pages.admin.users.account")
            }}</ion-text>
          </div>
        </ion-col>
        <ion-col :size="isGlobalAdmin ? '3' : '2'">
          <ion-text>{{ $t("pages.admin.users.status") }}</ion-text>
        </ion-col>
        <ion-col :size="isGlobalAdmin ? '5' : '4'">
          <ion-text>{{ $t("pages.admin.users.email") }}</ion-text>
        </ion-col>
        <ion-col size="3" v-if="!isGlobalAdmin">
          <ion-text>{{ $t("pages.admin.users.role") }}</ion-text>
        </ion-col>
      </ion-row>
      <ion-row v-for="row in usersData.users" :key="row.id">
        <ion-col
          :size="isGlobalAdmin ? '4' : '3'"
          class="ion-justify-content-between"
        >
          <div class="flex ion-justify-content-between ion-align-items-center">
            <ion-icon :icon="personOutline" size="small" />
            <div class="ml-2">
              <p>{{ row.name }}</p>
              <ion-text class="font-size-xxs color-mid-gray">
                {{ getOrganisationText(row.organisations) }}
              </ion-text>
            </div>
          </div>
          <ion-button
            fill="clear"
            color="dark"
            class="ion-no-padding"
            v-if="isGlobalAdmin"
            @click="onClickAction(row)"
          >
            <ion-icon :icon="ellipsisVertical" size="small" />
          </ion-button>
        </ion-col>
        <ion-col :size="isGlobalAdmin ? '3' : '2'">
          <ion-icon
            :icon="checkmarkCircle"
            size="small"
            color="success"
            v-if="row.userState === 1"
          />
          <ion-icon :icon="closeCircle" size="small" color="danger" v-else />
          <ion-text class="ml-2">
            {{
              row.userState === 1
                ? $t("pages.admin.users.active")
                : row.userState === 2
                ? $t("pages.admin.users.deleted")
                : $t("pages.admin.users.inactive")
            }}
          </ion-text>
        </ion-col>
        <ion-col :size="isGlobalAdmin ? '5' : '4'">
          <ion-text> {{ row.email }} </ion-text>
        </ion-col>
        <ion-col size="3" v-if="!isGlobalAdmin">
          <ion-select
            interface="action-sheet"
            class="modal-panel__select-organisation__select"
            :placeholder="$t('pages.admin.users.placeholder')"
            :value="row.userGroups[0]?.id"
            @ion-change="
              handleChangeRole(
                row.id,
                row.organisations[0].id || '',
                $event.detail.value
              )
            "
          >
            <ion-select-option
              v-for="role in userGroupOptions"
              :key="role.id"
              :value="role.id"
            >
              {{ role.name }}
            </ion-select-option>
          </ion-select>
        </ion-col>
      </ion-row>
    </ion-grid>
    <div class="pagination-wrapper">
      <ion-button
        fill="outline"
        size="small"
        :disabled="state.currentPage < 2"
        @click="handlePage('prev')"
      >
        <ion-icon :icon="chevronBackOutline" />
      </ion-button>
      <div>{{ state.currentPage }}</div>
      <ion-button
        fill="outline"
        :icon="chevronForwardOutline"
        size="small"
        :disabled="isLastPage"
        @click="handlePage('next')"
      >
        <ion-icon :icon="chevronForwardOutline" />
      </ion-button>
    </div>
    <UserManagementModal
      :name="state.currentUser.name"
      :isOpen="state.openEditModal"
      :assignedOrganisations="state.assignedOrganisations"
      :organisations="organisationList"
      :handleDismiss="
        () => {
          state.openEditModal = false;
        }
      "
      :handleClickSave="handleClickSave"
      :removeUserFromOrg="removeUserFromOrg"
      :handleClickAssignedOrg="onClickAssignedOrg"
    />
    <UserOrgPermissionModal
      v-if="state.openPermissionModal"
      :name="state.currentUser.name"
      :isOpen="state.openPermissionModal"
      :currentUserGroups="state.selectedOrg.groupIds"
      :userGroups="userGroups"
      :organisation="state.selectedOrg.organisation"
      :handleDismiss="handleClosePermissionModal"
      :handleClickSave="handleSavePermission"
    />
  </div>
</template>

<script setup lang="ts">
import {
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import {
  search,
  checkmarkCircle,
  closeCircle,
  ellipsisVertical,
  personOutline,
  chevronBackOutline,
  chevronForwardOutline,
} from "ionicons/icons";
import { onBeforeMount, computed, reactive } from "vue";
import { storeToRefs } from "pinia";

import { adminUsers as useUsersStore } from "@/stores/adminUsers";
import { Account as useAccountStore } from "@/stores/publicAccount";
import { Organisations as useOrganisationsStore } from "@/stores/publicOrganisations";
import UserManagementModal from "@/components/modals/UserManagementModal.vue";
import UserOrgPermissionModal from "@/components/modals/UserOrgPermissionModal.vue";
import {
  UserGroupResponse,
  SingleUserResponse,
  AdminOrganisation,
} from "@/types";
import toastService from "@/services/toastService";

const usersStore = useUsersStore();
const { usersData, userGroups } = storeToRefs(usersStore);
const accountStore = useAccountStore();
const { userPermission } = storeToRefs(accountStore);
const organisationStore = useOrganisationsStore();
const { organisationList } = storeToRefs(organisationStore);

const state = reactive({
  currentPage: 1,
  pageCount: 10,
  openEditModal: false,
  openPermissionModal: false,
  assignedOrganisations: [] as any[],
  currentUser: {} as any,
  selectedOrg: {} as {
    groupIds: string[];
    organisation: AdminOrganisation;
  },
});

const isLastPage = computed(
  () =>
    Math.ceil(usersData.value.totalCount / state.pageCount) <= state.currentPage
);
const userGroupOptions = computed(() => userGroups.value);
const isGlobalAdmin = computed(() => userPermission.value.isGlobalAdmin);
const userGroupId = computed(
  () =>
    userGroups.value.find((group: UserGroupResponse) => group.name === "User")
      ?.id
);
const getOrganisationText = (organisations: any) => {
  if (organisations?.length > 0) {
    let orgName = organisations[0].name || "";
    if (organisations.length > 1) {
      orgName = `${orgName} +${organisations.length - 1} more`;
    }
    return orgName;
  }
  return "";
};

const handleChangeRole = (userId: string, orgId: string, groupId: string) => {
  usersStore.assignRole(orgId, userId, groupId);
};

const onClickAction = (row: SingleUserResponse) => {
  state.currentUser = row;
  state.assignedOrganisations = row.organisations.map((org) => ({
    ...org,
    permissions: row.userGroups.filter(
      (group) => group.organisationId === org.id
    ),
  }));
  state.openEditModal = true;
};

const removeUserFromOrg = (event: any, orgId: string) => {
  event.stopPropagation();
  usersStore.removeFromOrg(state.currentUser.id, orgId);
  toastService.show(
    "Success",
    "User removed from organisation successfully",
    "success",
    "bottom"
  );
  state.openEditModal = false;
};

const handleClickSave = (orgId: string) => {
  if (userGroupId?.value) {
    handleChangeRole(state.currentUser.id, orgId, userGroupId.value);
  }
  toastService.show(
    "Success",
    "Users role updated successfully",
    "success",
    "bottom"
  );
  state.openEditModal = false;
};

const handleSavePermission = (groupIds: string[]) => {
  const requestBody = {
    userGroups: state.currentUser.organisations.map((org: any) => ({
      organisationId: org.id,
      groupIds:
        org.id === state.selectedOrg.organisation.organisationId
          ? groupIds
          : state.currentUser.userGroups
              .filter((group: any) => group.organisationId === org.id)
              .map((group: any) => group.id),
    })),
  };
  usersStore.updateUserRole(state.currentUser.id, requestBody);
  toastService.show(
    "Success",
    "Users permissions updated successfully",
    "success",
    "bottom"
  );
  state.openPermissionModal = false;
};

const handleClosePermissionModal = () => {
  setTimeout(() => {
    state.openPermissionModal = false;
  }, 100);
};

const onClickAssignedOrg = (assignedOrg: any) => {
  state.openEditModal = false;
  state.openPermissionModal = true;
  state.selectedOrg = {
    groupIds:
      assignedOrg.permissions?.map((permission: any) => permission.id) || [],
    organisation: organisationList.value.find(
      (org) => org.organisationId === assignedOrg.id
    ) as AdminOrganisation,
  };
};

const handlePage = (type: string) => {
  if (type === "prev") {
    state.currentPage--;
  }
  if (type === "next") {
    state.currentPage++;
  }
  usersStore.getUsers(state.currentPage, state.pageCount);
};

onBeforeMount(() => {
  usersStore.getUsers(state.currentPage, state.pageCount);
  usersStore.getUserGroups();
});
</script>

<style scoped>
.header-row {
  background: #1b1b1f;
  color: #fff;
  font-weight: bold;
}

.header-row ion-col {
  padding: 24px 12px;
}

ion-col {
  border: 1px solid #44464f;
  border-bottom-style: none;
  border-right-style: none;
  padding: 12px;
  display: flex;
  align-items: center;
}

ion-col:last-child {
  border-right: solid 1px #44464f;
}

ion-row:last-child ion-col {
  border-bottom: solid 1px #44464f;
}

.modal-panel__select-organisation__select {
  appearance: none;
  background: none;
  border: 0.75px solid #313131;
  border-radius: 8px;
  padding: 12px;
  font-size: 12px;
  line-height: 16px;
  width: 100%;
}

.pagination-wrapper {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 12px;
}

.pagination-wrapper ion-button {
  --border-color: #313131;
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 8px;
  --padding-bottom: 8px;
}
</style>
