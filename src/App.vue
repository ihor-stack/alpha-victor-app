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
import { onBeforeMount, watch, computed } from "vue";
import { IonApp } from "@ionic/vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import AppMenu from "./components/shared/AppMenu.vue";
import CustomToast from "@/components/shared/CustomToast.vue";
import LoadingIndicator from "@/components/shared/LoadingIndicator.vue";
import { Theme } from "@/types";
import { Account as useAccountStore } from "@/stores/publicAccount";

/* Services */
import toastService from "./services/toastService";
import loadingService from "./services/loadingService";
import Auth from "@/auth";

const route = useRoute();

import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
const accountStore = useAccountStore();

const organisationStore = useOrganisationStore();
const { currentOrganisationId, theme } = storeToRefs(organisationStore);
const authService = new Auth();

const path = computed(() => route.path);

const updateTheme = (theme: Theme) => {
  document.body.classList.toggle(
    "dark",
    path.value?.includes("/admin") ? true : theme.darkmodeEnabled
  );
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

const updateThemeFromStorage = () => {
  const themeString = localStorage.getItem("theme");
  if (themeString && themeString !== "undefined") {
    try {
      const theme: Theme = JSON.parse(themeString);
      organisationStore.setOrgTheme(theme);
      updateTheme(theme);
    } catch (err) {
      console.log(err, themeString);
    }
  } else {
    updateTheme(theme.value);
  }
};

watch(currentOrganisationId, (newValue) => {
  organisationStore.getOrgTheme(newValue);
});

watch(theme, (newValue) => {
  localStorage.setItem("theme", JSON.stringify(newValue));
  updateTheme(newValue);
});

watch(path, (newValue, oldValue) => {
  if (!oldValue.includes("/admin") && newValue.includes("/admin")) {
    document.body.classList.toggle("dark", true);
  } else if (oldValue.includes("/admin") && !newValue.includes("/admin")) {
    updateThemeFromStorage();
  }
});

onBeforeMount(async () => {
  updateThemeFromStorage();
  const accessToken = await authService.fetchCurrentAccessToken();
  if (accessToken) {
    accountStore.getPermissions();
    organisationStore.getOrganisations();
  } else {
    organisationStore.setOrgTheme();
  }
});
</script>

<style>
.ion-page-hidden {
  display: none !important;
}
</style>
