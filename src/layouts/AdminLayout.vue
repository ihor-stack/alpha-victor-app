<template>
  <div>
    <app-header
      :no-background="true"
      v-if="isBackButtonVisible || isMobileView"
    >
      <template #start>
        <ion-button
          fill="clear"
          @click="onClickBack"
          class="back"
          v-if="isBackButtonVisible"
        >
          <span class="font-mono font-size-xs">{{
            $t("pages.favourites.back")
          }}</span>
        </ion-button>
      </template>
      <template #end>
        <ion-menu-button fill="solid"> </ion-menu-button>
      </template>
    </app-header>
    <div class="ion-padding">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { IonButton, IonMenuButton } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import { useRouter, useRoute } from "vue-router";
import confirmToLeaveService from "@/services/confirmToLeaveService";

const isBackButtonVisible = computed(
  () => route.path !== "/admin/organisations"
);

const router = useRouter();
const route = useRoute();

const isMobileView = ref(false);

const updateView = () => {
  isMobileView.value = window.matchMedia("(max-width: 1063px)").matches;
};

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

onMounted(() => {
  window.addEventListener("resize", updateView);
  updateView(); // call once on mounted to set the initial state
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateView);
});
</script>

<style scoped>
ion-button {
  margin-bottom: 20px;
}

@media only screen and (min-width: 1023px) {
  .back {
    display: block;
  }
  ion-menu-button {
    display: none;
  }
}
</style>
