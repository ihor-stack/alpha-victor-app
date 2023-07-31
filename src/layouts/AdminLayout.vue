<template>
  <div class="ion-padding">
    <ion-button
      class="ion-no-padding"
      fill="clear"
      color="dark"
      @click="onClickBack"
    >
      <span class="font-mono font-size-xs">{{ $t("layout.back") }}</span>
    </ion-button>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { IonButton } from "@ionic/vue";
import { useRouter, useRoute } from "vue-router";
import confirmToLeaveService from "@/services/confirmToLeaveService";

const router = useRouter();
const route = useRoute();

const onClickBack = () => {
  if (confirmToLeaveService.confirm.value.isEditing) {
    confirmToLeaveService.show(() => handleBack());
  } else {
    handleBack();
  }
};

const handleBack = () => {
  const organisationSubRoutes = [
    "OrganisationViewDetails",
    "OrganisationViewTheme",
    "OrganisationViewSpaceMetadata",
    "OrganisationViewDocumentTypes",
    "OrganisationViewIntegrationsList",
    "OrganisationViewDecisionTrees",
  ];
  const currentRouteName = route.name as string;
  const orgId = route.params.id;
  if (organisationSubRoutes.includes(currentRouteName)) {
    router.push({
      name: "OrganisationView",
      params: { id: orgId },
    });
  } else if (currentRouteName === "OrganisationViewIntegrations") {
    router.push({
      name: "OrganisationViewIntegrationsList",
      params: { id: orgId },
    });
  } else if (currentRouteName === "EquipmentDetails") {
    router.push({
      name: "EquipmentView",
    });
  } else {
    router.push({ name: "OrganisationList" });
  }
};
</script>

<style scoped>
ion-button {
  margin-bottom: 20px;
}
</style>
