<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label text-wrap="true">
              <h2 class="font-size-md font-bold">{{ $t('pages.accountSettings.password.label') }}</h2>
              <p class="font-size-xs">{{ $t('pages.accountSettings.password.description') }}</p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false">
          <password-input
            name="current-password"
            :placeholder="$t('pages.accountSettings.password.placeholders.current')"
            v-model="state.currentPassword"
          />
          <password-input
            name="new-password"
            :placeholder="$t('pages.accountSettings.password.placeholders.new')"
            v-model="state.newPassword"
          />
          <password-input
            name="confirm-new-password"
            :placeholder="$t('pages.accountSettings.password.placeholders.confirm')"
            v-model="state.confirmedPassword"
          />
        </ion-content>
        <ion-footer>
          <ion-button
            expand="block"
            :disabled="state.preventSubmit"
            @click="confirm"
            >{{ $t('pages.accountSettings.password.updatePasswordBtn') }}</ion-button
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
