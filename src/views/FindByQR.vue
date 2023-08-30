<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="outer-container onboarding">
        <div class="gradient-container">
          <div class="inner-container">
            <div class="content-container"></div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { useRouter, useRoute } from "vue-router";
import Auth from "@/auth";
import { onBeforeMount } from "vue";
import { auth as useAuthStore } from "@/stores/authStore";
import { Account as useAccountStore } from "@/stores/publicAccount";
import { globalAPI } from "@/axios";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";

const router = useRouter();
const route = useRoute();
const authService = new Auth();

onBeforeMount(async () => {
  const spaceShortCode = route.params.spaceShortcode;
  const authStore = useAuthStore();
  const accountStore = useAccountStore();

  if (!spaceShortCode) {
    // Redirect to login.
    return router.replace({ name: "Home" });
  }

  const loadId = loadingService.show("Loading...");

  globalAPI
    .get(`Space/SpaceByQR/${spaceShortCode as string}`)
    .then((response) => {
      if (response?.data?.spaceId) {
        authService.storeGuestAccessToken(
          response?.data?.guestAccessToken,
          authStore.isAuthenticated
        );
        accountStore.getPermissions().then(() => {
          router.push(`/space/${response.data.spaceId}`);
        });
      }
    })
    .catch(() => {
      toastService.show(
        "Error",
        "The QR code is not valid.",
        "error",
        "bottom"
      );
      loadingService.close(loadId);
    });
});
</script>

<style scoped>
.content-container {
  flex: 0 0 72%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content-container ion-spinner {
  margin: auto;
}

/* Desktop styling */
@media only screen and (min-width: 1023px) {
  .content-container {
    width: 500px;
    margin: auto;
  }
}
</style>
