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
import { IonContent, IonSpinner, IonPage, onIonViewDidEnter } from "@ionic/vue";
import { useRouter, useRoute  } from "vue-router";
import Auth from "@/auth";
import { onBeforeMount } from "vue";

const router = useRouter();
const route = useRoute();
const authService = new Auth();

onBeforeMount(async () => {

  const loginToken = route.query.token;

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
})

</script>

<style scoped>
.content-container {
  flex: 0 0 72%;
  display: flex;
  flex-direction: column;
}

</style>
