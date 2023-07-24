<template>
  <div class="ion-padding">
    <ion-button
      class="ion-no-padding"
      fill="clear"
      color="dark"
      @click="handleBack"
    >
      <span class="font-mono font-size-xs">&lt;&lt; back</span>
    </ion-button>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

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