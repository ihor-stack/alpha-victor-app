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

  const orgPrefix = route.query.o;
  const locPrefix = route.query.l;
  const floorShortName = route.query.f;
  const spaceShortCode = route.query.s;

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

/* Desktop styling */
@media only screen and (min-width: 1023px) {
  .content-container {
    width: 500px;
    margin: auto;
  }
}
</style>
