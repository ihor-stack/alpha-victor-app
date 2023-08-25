<template>
  <ion-page id="dashboard" class="outer-container">
    <app-header :no-background="true"> 
      <template #start>
        <ion-button
          class="switch-organisation"
          shape="round"
          v-if="!isGuestUser"
          @click="state.modalOpen = true"
        >
          <img
            src="@/theme/icons/switch-location.svg"
            :alt="$t('pages.dashboard.alt')"
          />
        </ion-button>
      </template>
      <template #end>
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
import { computed } from "vue";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import DashboardSearch from "@/components/dashboard/DashboardSearch.vue";
import { Account as useAccountStore } from "@/stores/publicAccount";

const accountStore = useAccountStore();
const isGuestUser = computed(() => accountStore.userPermission.isGuest);
</script>

<style scoped>
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
