<template>
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
    <ion-row v-for="row in usersList" :key="row.id">
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
        <div class="userRole" @click="onClickRole(row)">
          {{ row.userGroups[0]?.name }}
          <ion-icon :icon="chevronDown" size="small" />
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
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
  />
  <UserOrgPermissionModal
    v-if="state.openPermissionModal"
    :name="state.currentUser.name"
    :isOpen="state.openPermissionModal"
    :currentUserGroup="state.currentUser.userGroups?.[0]?.id"
    :userGroups="userGroupOptions"
    :organisationName="getOrganisationText(state.currentUser.organisations)"
    :handleDismiss="
      () => {
        state.openPermissionModal = false;
      }
    "
    :handleClickSave="handleSavePermission"
  />
</template>

<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonIcon } from "@ionic/vue";
import {
  search,
  checkmarkCircle,
  closeCircle,
  ellipsisVertical,
  personOutline,
  chevronDown,
} from "ionicons/icons";
import { onBeforeMount, computed, reactive } from "vue";
import { storeToRefs } from "pinia";

import { adminUsers as useUsersStore } from "@/stores/adminUsers";
import { Account as useAccountStore } from "@/stores/publicAccount";
import { Organisations as useOrganisationsStore } from "@/stores/publicOrganisations";
import UserManagementModal from "@/components/modals/UserManagementModal.vue";
import UserOrgPermissionModal from "@/components/modals/UserOrgPermissionModal.vue";
import { UserGroupResponse, UserResponse } from "@/types";

const usersStore = useUsersStore();
const { users, userGroups } = storeToRefs(usersStore);
const accountStore = useAccountStore();
const { userPermission } = storeToRefs(accountStore);
const organisationStore = useOrganisationsStore();
const { organisationList } = storeToRefs(organisationStore);

const state = reactive({
  openEditModal: false,
  openPermissionModal: false,
  assignedOrganisations: [] as any[],
  currentUser: {} as UserResponse,
});
const usersList = computed(() =>
  users.value.filter((user) => user.userGroups.length)
);
const userGroupOptions = computed(() => userGroups.value.slice(0, 2));
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

const handleChangeRole = (
  id: string,
  orgId: string | undefined,
  role: string
) => {
  const requestBody = {
    userGroups: [
      {
        groupIds: [role],
        organisationId: orgId,
      },
    ],
  };
  usersStore.updateUserRole(id, requestBody);
};

const onClickAction = (row: UserResponse) => {
  state.currentUser = row;
  state.assignedOrganisations = row.organisations.map((org) => ({
    ...org,
    permission: row.userGroups.find((group) => group.organisationId === org.id)
      ?.name,
  }));
  state.openEditModal = true;
};

const removeUserFromOrg = (orgId: string) => {
  usersStore.removeFromOrg(state.currentUser.id, orgId);
  state.openEditModal = false;
};

const handleClickSave = (orgId: string) => {
  if (userGroupId?.value) {
    handleChangeRole(state.currentUser.id, orgId, userGroupId.value);
  }
  state.openEditModal = false;
};

const handleSavePermission = (groupId: string) => {
  const currentOrganisationId = state.currentUser.organisations[0].id;
  handleChangeRole(state.currentUser.id, currentOrganisationId, groupId);
  state.openPermissionModal = false;
};

const onClickRole = (row: UserResponse) => {
  state.currentUser = row;
  state.openPermissionModal = true;
};

onBeforeMount(() => {
  usersStore.getUsers();
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

.userRole {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #313131;
  background: #181818;
  padding: 8px 10px;
  line-height: 24px;
  font-size: 14px;
  cursor: pointer;
}
</style>
