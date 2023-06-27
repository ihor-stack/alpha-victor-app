<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label>
              <h2 class="font-size-medium font-bold">
                {{
                  state.accountDeleted ? "Account Deleted" : "Confirm Deletion"
                }}
              </h2>
              <p class="settings-panel__comment font-size-xs">
                {{
                  state.accountDeleted
                    ? "Your account had been deleted from our system. We hope to see you again in the future."
                    : "Are you sure you want to delete your account?"
                }}
              </p>
              <p class="settings-panel__comment font-size-xs">
                {{
                  state.accountDeleted
                    ? "Best wishes from the Alpha Victor team."
                    : "Your account can’t be restored after it’s been deleted. Are you sure you want to continue? If so, please confirm your password. "
                }}
              </p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false"></ion-content>
        <ion-footer>
          <ion-button
            v-if="state.accountDeleted"
            expand="block"
            @click="confirm"
            >Got it, thanks</ion-button
          >
          <ion-button v-else expand="block" @click="confirm"
            >Confirm deletion</ion-button
          >
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
  modalController,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { reactive } from "vue";

interface State {
  password: string;
  accountDeleted: boolean;
}

const state: State = reactive({
  password: "",
  accountDeleted: false,
});

function confirm() {
  return modalController.dismiss();
}
</script>

<style scoped></style>
