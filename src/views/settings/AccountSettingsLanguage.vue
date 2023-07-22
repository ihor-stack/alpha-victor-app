<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label>
              <h2 class="font-size-md font-bold">{{ $t('pages.accountSettings.language.label') }}</h2>
              <p class="font-size-xs">{{ $t('pages.accountSettings.language.description') }}</p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false">
          <ion-select
            interface="action-sheet"
            :placeholder="$t('pages.accountSettings.language.placeholder')"
            class="custom-select"
            v-model="state.language"
          >
            <ion-select-option value="english">{{ $t('pages.accountSettings.language.english') }}</ion-select-option>
            <ion-select-option value="french">{{ $t('pages.accountSettings.language.french') }}</ion-select-option>
            <ion-select-option value="german">{{ $t('pages.accountSettings.language.german') }}</ion-select-option>
          </ion-select>
        </ion-content>
        <ion-footer>
          <ion-button expand="block" @click="confirm"
            >{{ $t('pages.accountSettings.language.updateLanguageBtn') }}</ion-button
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
  IonSelect,
  IonSelectOption,
  IonButton,
  modalController,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { reactive } from "vue";

interface State {
  language: string;
}

const state: State = reactive({
  language: "english",
});

function confirm() {
  return modalController.dismiss();
}
</script>

<style scoped></style>
