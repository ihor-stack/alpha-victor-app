<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header>
          <div class="settings-panel__header">
            <h1 class="settings-panel__title color-light-gray font-bold font-size-normal">Language</h1>
            <p class="settings-panel__comment color-light-gray font-size-xs">You can switch between languages via the drop down below.</p>
          </div>
        </ion-header>
        <ion-content :scroll-y="false">
          <ion-select 
            interface="action-sheet" 
            placeholder="Select language" 
            class="custom-select"
            v-model="state.language"
          >
            <ion-select-option value="english">English</ion-select-option>
            <ion-select-option value="french">French</ion-select-option>
            <ion-select-option value="german">German</ion-select-option>
          </ion-select>
        </ion-content>
        <ion-footer>
          <ion-button expand="block" @click="confirm">Update language settings</ion-button>
        </ion-footer>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonHeader, 
  IonFooter, 
  IonContent, 
  IonSelect, 
  IonSelectOption, 
  IonButton, 
  modalController 
} from "@ionic/vue";
import { reactive } from "vue";

interface State {
  language: string
}

const state: State = reactive({
  language: "english"
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