<template>
  <ion-page id="dashboard" class="outer-container">
    <app-header v-if="isMobileView" :no-background="true">
      <template #start>
        <ion-menu-button fill="solid"> </ion-menu-button>
      </template>
    </app-header>
    <ion-content :scroll-y="false">
      <div class="dashboard-search-container">
        <dashboard-search-public />
      </div>
    </ion-content>
    <ion-footer class="ion-no-border">
      <p>{{ $t('pages.home.anonymousMessage') }}</p>
      <ion-button expand="block" color="primary" @click="goToLogIn">{{ $t('pages.home.signinsignup')}}</ion-button>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from "vue";
import {
  IonPage,
  IonContent,
  IonButton,
  IonMenuButton,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import AppHeader from "@/components/shared/AppHeader.vue";
import DashboardSearchPublic from "@/components/dashboard/DashboardSearchPublic.vue";

import { auth as useAuthStore } from "@/stores/authStore";
import { Account as useAccountStore } from "@/stores/publicAccount";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
import Auth from "@/auth";

const router = useRouter();
const authStore = useAuthStore();
const authService = new Auth();
const { isAuthenticated } = storeToRefs(authStore);
const organisationStore = useOrganisationStore();
const accountStore = useAccountStore();

const isMobileView = ref(false);

const updateView = () => {
  isMobileView.value = window.matchMedia("(max-width: 1063px)").matches;
};

const goToLogIn = () => {
  router.push({ name: "LogIn" });
}

onMounted(async () => {

  if(isAuthenticated.value && !accountStore.userPermission.isGuest) {
    router.push({ name: "Dashboard" });
  }
  
})

onMounted(() => {
  window.addEventListener("resize", updateView);
  updateView(); // call once on mounted to set the initial state
})
</script>

<style scoped>
.outer-container {
  display: flex;
  flex-direction: column;
}
.dashboard-search-container {
  padding: 20px 20px 32px;
  background: 0;
}
.dashboard-sliders {
  flex: 1;
  margin-bottom: 32px;
}
.dashboard-slider-container:not(:last-of-type) {
  margin-bottom: 32px;
}
.switch-organisation {
  width: 50px;
  height: 50px;
  --background: var(--ion-color-primary);
  --border-radius: 50% !important;
}

body.dark .switch-organisation {
  --background: rgba(255, 255, 255, 0.1);
}

ion-content {
  --background: none;
}

ion-footer {
  padding: 20px 22px 40px;
}

ion-item {
  --background: transparent;
  text-align: center;
}

ion-footer {
  background: var(--av-darkest-gray);
}

ion-footer p {
  text-align: center;
  margin: 10px 0 15px;
  line-height: 1.4;
}
</style>
