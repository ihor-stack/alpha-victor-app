<template>
  <ion-page id="dashboard" class="outer-container">
    <app-header v-if="isMobileView" :no-background="true">
      <template #start>
        <ion-menu-button fill="solid"> </ion-menu-button>
      </template>
    </app-header>
    
    <ion-content :scroll-y="false">
      <div class="dashboard-search-container">
        <dashboard-search />
      </div>

      <ion-item
        lines="none"
      >
        <ion-label text-wrap="true">
          <h1 class="color-white">{{ $t("pages.dashboard.noSpacesFound") }}</h1>
          <p>{{ $t("pages.dashboard.noSpacesMessage") }}</p>
        </ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import {
  IonPage,
  IonContent,
  IonMenuButton,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import DashboardSearch from "@/components/dashboard/DashboardSearch.vue";
import { Account as useAccountStore } from "@/stores/publicAccount";

const accountStore = useAccountStore();
const isGuestUser = computed(() => accountStore.userPermission.isGuest);

const isMobileView = ref(false);

const updateView = () => {
  isMobileView.value = window.matchMedia("(max-width: 1063px)").matches;
};

onMounted(() => {
  window.addEventListener("resize", updateView);
  updateView(); // call once on mounted to set the initial state
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateView);
});
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

@media only screen and (min-width: 1023px) {
  .dashboard-search-container {
    padding: 40px 20px 32px;
  }
}
ion-content {
  --background: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
ion-item {
  --background: transparent;
  text-align: center;
  margin-top: 100px;
}
</style>
