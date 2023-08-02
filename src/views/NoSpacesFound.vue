<template>
  <ion-page id="dashboard" class="outer-container">
    <app-header :no-background="true">
      <template #start>
        <ion-button
          class="switch-organisation"
          shape="round"
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
      <ion-item
        lines="none"
      >
        <ion-label>
          <h1 class="color-white">{{ $t("pages.dashboard.noSpacesFound") }}</h1>
          <p>{{ $t("pages.dashboard.shortCodeTip") }}</p>
        </ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
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
