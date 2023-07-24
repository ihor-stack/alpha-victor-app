<template>
  <ion-page class="ion-bg" id="admin">
    <ion-grid class="ion-no-padding">
      <ion-row class="ion-no-padding">
        <ion-col class="fixed-sidebar ion-padding">
          <desktop-nav />
        </ion-col>
        <ion-col>
          <ion-content class="ion-padding">
            <ion-button
              class="ion-no-padding"
              fill="clear"
              color="dark"
              @click="handleBack"
            >
              <span class="font-mono font-size-xs">&lt;&lt; back</span>
            </ion-button>
            <div class="container">
              <router-view />
            </div>
          </ion-content>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { reactive, watch } from "vue";
import DesktopNav from "@/components/shared/DesktopNav.vue";
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
ion-grid {
  width: 100%;
}

ion-row {
  width: 100%;
  min-height: 100vh;
  display: flex;
}

ion-button {
  margin: 20px 0;
}

.fixed-sidebar {
  width: 30%;
  max-width: 270px;
}
</style>
