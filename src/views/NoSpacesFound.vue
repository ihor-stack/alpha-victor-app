<template>
  <ion-page id="dashboard" class="outer-container">
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
</script>

<style scoped>
.outer-container {
  display: flex;
  flex-direction: column;
}
ion-content {
  --background: none;
}
ion-item {
  --background: transparent;
  text-align: center;
}
</style>
