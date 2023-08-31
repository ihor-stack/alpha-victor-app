<template>
  <ion-app>
    <app-menu />
    <ion-grid class="ion-no-padding">
      <ion-row class="ion-no-padding">
        <ion-col class="fixed-sidebar ion-padding">
          <desktop-nav />
        </ion-col>
        <ion-col>
          <ion-content id="content" class="ion-no-padding">
            <router-view v-if="initComplete" />
          </ion-content>
        </ion-col>
      </ion-row>
    </ion-grid>
    <LoadingIndicator
      v-if="loadingService.loading.value.isLoading || !initComplete"
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
    <ConfirmToLeaveModal
      :open="confirmToLeaveService.confirm.value.isOpen"
      :handleConfirm="confirmToLeaveService.confirm.value.handleConfirm"
      :handleDismiss="confirmToLeaveService.close"
    />
  </ion-app>
  <ScannerOverlay />
</template>

<script setup lang="ts">
import { onBeforeMount, watch, computed, ref, provide } from "vue";
import { IonApp } from "@ionic/vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import mixpanel from "mixpanel-browser";
import AppMenu from "./components/shared/AppMenu.vue";
import CustomToast from "@/components/shared/CustomToast.vue";
import LoadingIndicator from "@/components/shared/LoadingIndicator.vue";
import ScannerOverlay from "@/components/shared/ScannerOverlay.vue";
import { Theme } from "@/types";
import { Account as useAccountStore } from "@/stores/publicAccount";
import { auth as useAuthStore } from "@/stores/authStore";
import { App, URLOpenListenerEvent } from "@capacitor/app";
import DesktopNav from "@/components/shared/DesktopNav.vue";
import ConfirmToLeaveModal from "./components/modals/ConfirmToLeaveModal.vue";

/* Services */
import toastService from "./services/toastService";
import loadingService from "./services/loadingService";
import confirmToLeaveService from "./services/confirmToLeaveService";
import Auth from "@/auth";


const route = useRoute();
const router = useRouter();
const authService = new Auth();

const isScanning = ref(false);
provide("isScanning", isScanning);

const initComplete = ref(false);

import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
const accountStore = useAccountStore();
const authStore = useAuthStore();

const organisationStore = useOrganisationStore();
const { currentOrganisationId, theme } = storeToRefs(organisationStore);
const { userPermission } = storeToRefs(accountStore);
const { isAuthenticated } = storeToRefs(authStore);

const path = computed(() => route.path);

App.addListener("appUrlOpen", async (event: URLOpenListenerEvent) => {
  if (!event.url) return;

  const url = new URL(event.url);

  const slug = url.pathname;

  if (!slug) return;

  if (slug == "/email-link-login") {
    // TODO: Put this here because onIonViewDidEnter isn't firing when redirecting to EmailLinkLogin.

    const loginToken = url.searchParams.get("token");

    if (!loginToken || loginToken == null || !(loginToken as string)) {
      // Redirect to login.
      return router.replace({ name: "Home" });
    }

    const strLoginToken = loginToken as string;

    const authRes = await authService.authenticate(true, strLoginToken);

    if (authRes) {

      authStore.setAuthStatus(true);
      const accountRes = await accountStore.getAccount();
    
      if (accountRes?.email) {
        mixpanel.track("User Authenicated", { email: accountRes.email });
      }

      await accountStore.getPermissions();
      const orgsRes = await organisationStore.getOrganisations();
      if (orgsRes && orgsRes.length > 0) {
        await organisationStore.getOrgTheme(orgsRes[0].organisationId);
      }   

      return router.replace({ name: "Dashboard" });
      
    } else {
      authStore.setAuthStatus(false);
      return router.replace({ name: "Home" });
    }
  } else if (slug == "/reset-password") {
    // TODO: Put this here because onIonViewDidEnter isn't firing when redirecting to EmailLinkLogin.

    const resetToken = url.searchParams.get("token");

    if (!resetToken || resetToken == null || !(resetToken as string)) {
      // Redirect to login.
      return router.replace({ name: "Home" });
    }

    const strResetToken = resetToken as string;

    return router.replace({
      name: "ResetPassword",
      query: { token: strResetToken },
    });
  } else if (slug == "/verify-account") {
    const verifyToken = url.searchParams.get("token");

    if (!verifyToken || verifyToken == null || !(verifyToken as string)) {
      // Redirect to login.
      return router.replace({ name: "Home" });
    }

    const strVerifyToken = verifyToken as string;

    return router.replace({
      name: "VerifyAccount",
      query: { token: strVerifyToken },
    });
  } else if (slug.indexOf("/qr") > -1) {
    router.replace(slug);
  }
});

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
  if (root && theme.primaryColour) {
    root.style.setProperty("--ion-color-secondary", theme.primaryColour);
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
});

watch(userPermission, () => {
  checkPermission();
});

// TOOD: Put this into Rotue metadata.
const guestAllowedRoutes = [
  "/",
  "/about",
  "/terms-and-conditions",
  "/space/",
  "/legal-notices",
];

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
    guestAllowedRoutes.find((ar) => path.value.startsWith(ar)) === undefined
  ) {
    router.replace({ name: "Home" });
  }
};

onBeforeMount(async () => {
  updateThemeFromStorage();

  const currentOrgId = localStorage.getItem("currentOrganisationId");
  const SECURE_STORE_AUTH_TYPE = localStorage.getItem("SECURE_STORE_AUTH_TYPE");

  let hasFreshLogin = await authService.isTokenFresh();
  if (!hasFreshLogin) {
    hasFreshLogin = await authService.refresh();
  }

  if (
    hasFreshLogin &&
    (SECURE_STORE_AUTH_TYPE === "EmailLinkLogin" ||
      SECURE_STORE_AUTH_TYPE === "UsernamePassword")
  ) {
    if (currentOrgId) organisationStore.getOrgTheme(currentOrgId);
    await accountStore.getPermissions();
    await organisationStore.getOrganisations();
    authStore.setAuthStatus(true);

    if (currentOrgId) {
      organisationStore.setOrganisationId(currentOrgId);
    }
  } else {
    authStore.setAuthStatus(false);
    organisationStore.setOrgTheme();
  }

  initComplete.value = true;
});
</script>

<style scoped>
.ion-page-hidden {
  display: none !important;
}
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
  max-width: 300px;
}

#content {
  min-height: 100%;
}

@media only screen and (max-width: 1023px) {
  .fixed-sidebar {
    display: none;
  }
}
</style>
