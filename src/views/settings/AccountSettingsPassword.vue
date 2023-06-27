<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label>
              <h2 class="font-size-medium font-bold">Update password</h2>
              <p class="font-size-xs">
                Use the form below to update/change your password.
              </p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false">
          <password-input
            name="current-password"
            placeholder="Current Password"
            v-model="state.currentPassword"
          />
          <password-input
            name="new-password"
            placeholder="New Password"
            v-model="state.newPassword"
          />
          <password-input
            name="confirm-new-password"
            placeholder="Confirm New Password"
            v-model="state.confirmedPassword"
          />
        </ion-content>
        <ion-footer>
          <ion-button
            expand="block"
            :disabled="state.preventSubmit"
            @click="confirm"
            >Update password</ion-button
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
import { reactive, watch } from "vue";
import PasswordInput from "@/components/shared/PasswordInput.vue";

interface State {
  currentPassword: string;
  newPassword: string;
  confirmedPassword: string;
  preventSubmit: boolean;
}

const state: State = reactive({
  currentPassword: "magicbeans",
  newPassword: "",
  confirmedPassword: "",
  preventSubmit: true,
});

function confirm() {
  return modalController.dismiss();
}

function confirmPassword(value: string) {
  if (value === state.newPassword && state.newPassword.length > 0) {
    state.preventSubmit = false;
  }
}

watch(
  () => state.confirmedPassword,
  (value) => confirmPassword(value)
);
</script>

<style scoped></style>
