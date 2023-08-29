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

  const spaceShortCode = route.params.spaceShortcode;

  if (!spaceShortCode) {
    // Redirect to login.
    return router.replace({ name: "Home" });
  }

  const spaceResp = await spacesStore.getSpaceByQr(spaceShortCode  as string);

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
