<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header>
          <div class="settings-panel__header">
            <h1 class="settings-panel__title color-light-gray font-bold font-size-normal">Location</h1>
            <p class="settings-panel__comment color-light-gray font-size-xs">We use your location to check spaces near you. Update your location settings below.</p>
          </div>
        </ion-header>
        <ion-content :scroll-y="false">
          <div class="setting">
            <div class="setting__label">
              <p class="label font-size-xs font-bold color-light-gray">Allow location</p>
              <span class="sublabel font-mono font-size-xxs color-dark-gray">{{ useDotify("Accurate Location")
              }}</span>
            </div>
            <ion-toggle v-model="state.allowLocation" />
          </div>
        </ion-content>
        <ion-footer>
          <ion-button expand="block" @click="confirm">Update Location settings</ion-button>
        </ion-footer>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { useDotify } from "@/composables/utilities";
import { 
  IonPage, 
  IonHeader, 
  IonFooter, 
  IonContent, 
  IonToggle, 
  IonButton, 
  modalController 
} from "@ionic/vue";
import { reactive } from "vue";

interface State {
  allowLocation: boolean
}

const state: State = reactive({
  allowLocation: false
});

function confirm() {
  return modalController.dismiss();
}
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}
</style>