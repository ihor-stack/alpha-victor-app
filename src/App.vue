<template>
  <ion-app>
    <app-menu />
    <router-view id="content" />
    <LoadingIndicator
      v-if="loadingService.loading.value.isLoading"
      :message="loadingService.loading.value.message"
      :isLoading="loadingService.loading.value.isLoading"
      :duration="loadingService.loading.value.duration"
    />
    <CustomToast
      v-if="toastService.toast.value.isOpen"
      :status="toastService.toast.value.status"
      :message="toastService.toast.value.message"
      :position="toastService.toast.value.position"
      :header="toastService.toast.value.header"
      :duration="toastService.toast.value.duration"
      :isOpen="toastService.toast.value.isOpen"
    />
  </ion-app>
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from "vue";
import { IonApp } from "@ionic/vue";
import { storeToRefs } from "pinia";
import AppMenu from "./components/shared/AppMenu.vue";
import CustomToast from "@/components/shared/CustomToast.vue";
import LoadingIndicator from "@/components/shared/LoadingIndicator.vue";
import { Theme } from "@/types";

/* Services */
import toastService from "./services/toastService";
import loadingService from "./services/loadingService";

import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";

const organisationStore = useOrganisationStore();
const { currentOrganisationId, theme } = storeToRefs(organisationStore);

const updateTheme = (theme: Theme) => {
  document.body.classList.toggle("dark", theme.darkmodeEnabled);
  const root = document.querySelector(":root") as HTMLElement;
  if (root && theme.backgroundImage) {
    root.style.setProperty("--theme-image", `url('${theme.backgroundImage}')`);
  }
  if (root && theme.primaryColour) {
    root.style.setProperty("--ion-color-primary", theme.primaryColour);
  }
  if (root && theme.secondaryColour) {
    root.style.setProperty(
      "--ion-color-secondary",
      `url('${theme.secondaryColour}')`
    );
  }
};

watch(currentOrganisationId, (newValue) => {
  organisationStore.getOrgTheme(newValue);
});

watch(theme, (newValue) => {
  localStorage.setItem("theme", JSON.stringify(newValue));
  updateTheme(newValue);
});

onBeforeMount(() => {
  const themeString = localStorage.getItem("theme");
  if (themeString) {
    try {
      const theme: Theme = JSON.parse(themeString);
      organisationStore.setOrgTheme(theme);
      updateTheme(theme);
    } catch (err) {
      console.log(err);
    }
  }
  organisationStore.getOrganisations();
});
</script>

<style>
.ion-page-hidden {
  display: none !important;
}
</style>
