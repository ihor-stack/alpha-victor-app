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
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import AppMenu from "./components/shared/AppMenu.vue";
import CustomToast from "@/components/shared/CustomToast.vue";
import LoadingIndicator from "@/components/shared/LoadingIndicator.vue";
import { Theme } from "@/types";
import { Account as useAccountStore } from "@/stores/publicAccount";
import { App, URLOpenListenerEvent } from '@capacitor/app';

/* Services */
import toastService from "./services/toastService";
import loadingService from "./services/loadingService";
import Auth from "@/auth";

const route = useRoute();
const router = useRouter();
const authService = new Auth();

App.addListener('appUrlOpen', async (event: URLOpenListenerEvent) => {

  if (!event.url) return;

  const url = new URL(event.url);

  const slug = url.pathname;

  if (!slug) return;
  
  if (slug == "/email-link-login") {
    // TODO: Put this here because onIonViewDidEnter isn't firing when redirecting to EmailLinkLogin.

    const loginToken = url.searchParams.get("token");

    if (!loginToken || loginToken == null || !(loginToken as string)) {
      // Redirect to login.
      return router.replace({ name: "Login" });
    }

    const strLoginToken = loginToken as string;  

    const authRes = await authService.authenticate(true, strLoginToken);

    if (authRes) {
      return router.replace({ name: "Dashboard" });
    } else {
      return router.replace({ name: "Login" });
    }

  }

  else if (slug == "/reset-password") {
    // TODO: Put this here because onIonViewDidEnter isn't firing when redirecting to EmailLinkLogin.

    const resetToken = url.searchParams.get("token");

    if (!resetToken || resetToken == null || !(resetToken as string)) {
      // Redirect to login.
      return router.replace({ name: "Login" });
    }

    const strResetToken = resetToken as string;  

    return router.replace({name: 'ResetPassword', query: {token: strResetToken}});
  }  

  else if (slug == "/verify-account") {

    const verifyToken = url.searchParams.get("token");

    if (!verifyToken || verifyToken == null || !(verifyToken as string)) {
      // Redirect to login.
      return router.replace({ name: "Login" });
    }

    const strVerifyToken = verifyToken as string;  

    return router.replace({name: 'VerifyAccount', query: {token: strVerifyToken}});
  }  

  else if (slug.indexOf("/qr") > -1) {

    return router.replace({path: slug});
  }  
});

import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
const accountStore = useAccountStore();

const organisationStore = useOrganisationStore();
const { currentOrganisationId, theme } = storeToRefs(organisationStore);
const { userPermission } = storeToRefs(accountStore);

const path = computed(() => route.path);

const updateTheme = (theme: Theme) => {
  document.body.classList.toggle(
    "dark",
    path.value?.includes("/admin") ? true : theme.darkmodeEnabled
  );
  const root = document.querySelector(":root") as HTMLElement;
  if (root && theme.backgroundImage) {
    root.style.setProperty("--theme-image", `url('${theme.backgroundImage}')`);
  } else {
    root.style.setProperty("--theme-image", `url('/img/lines-no-logo.svg')`);
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
  checkPermission();
  if (!oldValue.includes("/admin") && newValue.includes("/admin")) {
    document.body.classList.toggle("dark", true);
  } else if (oldValue.includes("/admin") && !newValue.includes("/admin")) {
    updateThemeFromStorage();
  }
  if (oldValue === "/" && newValue === "/dashboard") {
    accountStore.getPermissions();
  }
});

watch(userPermission, () => {
  checkPermission();
});

const checkPermission = () => {
  if (
    !userPermission.value.isGlobalAdmin &&
    !userPermission.value.organisationGroups?.some(
      (group) => group.name === "OrganisationAdmin"
    ) &&
    path.value?.includes("/admin")
  ) {
    router.replace({ name: "Dashboard" });
  } else if (
    userPermission.value.isGuest &&
    path.value !== "/dashboard" &&
    !path.value.includes("/space/")
  ) {
    router.replace({ name: "Dashboard" });
  }
};

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
