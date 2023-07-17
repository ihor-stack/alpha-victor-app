<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="outer-container onboarding">
        <div class="gradient-container">
          <div class="inner-container">
            <div class="content-container">
              <ion-spinner></ion-spinner>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonSpinner, IonPage } from "@ionic/vue";
import { useRouter, useRoute  } from "vue-router";
import Auth from "@/auth";
import { onBeforeMount } from "vue";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";

const router = useRouter();
const route = useRoute();
const authService = new Auth();
const spacesStore = useSpacesStore();

onBeforeMount(async () => {

  const orgPrefix = route.params.orgPrefix;
  const locPrefix = route.params.locPrefix;
  const floorShortName = route.params.floorShortName;
  const spaceShortCode = route.params.spaceShortCode;

  if (!orgPrefix || !locPrefix || !floorShortName || !spaceShortCode) {
    // Redirect to login.
    return router.replace({ name: "Login" });
  }

  const spaceResp = await spacesStore.getSpaceByQr(orgPrefix as string, locPrefix  as string, floorShortName  as string, spaceShortCode  as string);

  if (!spaceResp) return;

  // Store the Guest token.
  authService.storeGuestAccessToken(spaceResp.guestAccessToken);

  router.push(`/space/${spaceResp.spaceId}`);

})

</script>

<style scoped>
.content-container {
  flex: 0 0 72%;
  display: flex;
  flex-direction: column;
}

</style>
