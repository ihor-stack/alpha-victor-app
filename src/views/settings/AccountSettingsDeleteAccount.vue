<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header v-if="state.accountDeleted">
          <div class="settings-panel__header">
            <h1 class="settings-panel__title color-light-gray font-bold font-size-normal">Account Deleted</h1>
            <p class="settings-panel__comment color-light-gray font-size-xs">Your account had been deleted from our system. We hope to see you again in the future.</p>

            <p class="settings-panel__comment color-light-gray font-size-xs">Best wishes from the Alpha Victor team.</p>
          </div>
        </ion-header>
        <ion-header v-else>
          <div class="settings-panel__header">
            <h1 class="settings-panel__title color-light-gray font-bold font-size-normal">Confirm Deletion</h1>
            <p class="settings-panel__comment color-light-gray font-size-xs underline inline-block">Are you sure you want to delete your account?</p>
            <p class="settings-panel__comment color-light-gray font-size-xs">Your account can’t be restored after it’s been deleted. Are you sure you want to continue? If so, please confirm your password. </p>
          </div>
        </ion-header>
        <ion-content :scroll-y="false"></ion-content>
        <ion-footer>
          <ion-button v-if="state.accountDeleted" expand="block" @click="confirm">Got it, thanks</ion-button>
          <ion-button v-else expand="block" @click="confirm">Confirm deletion</ion-button>
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
  IonButton, 
  modalController 
} from "@ionic/vue";
import { reactive } from "vue";

interface State {
  password: string,
  accountDeleted: boolean
}

const state: State = reactive({
  password: "",
  accountDeleted: false
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