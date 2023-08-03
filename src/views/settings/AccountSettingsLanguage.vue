<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label>
              <h2 class="font-size-md font-bold">
                {{ $t("pages.accountSettings.language.label") }}
              </h2>
              <p class="font-size-xs">
                {{ $t("pages.accountSettings.language.description") }}
              </p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false">
          <LanguageSelect
            v-model="state.language"
            :defaultValue="accountDetails.activeLanguage"
          />
        </ion-content>
        <ion-footer>
          <ion-button expand="block" @click="confirm">{{
            $t("pages.accountSettings.language.updateLanguageBtn")
          }}</ion-button>
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
import { Account } from "@/stores/publicAccount";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

import LanguageSelect from "@/components/shared/LanguageSelect.vue";

const locales = ["en", "cy", "fr", "es", "de", "pl"];
const { locale } = useI18n();
const publicAccount = Account();
const { accountDetails } = storeToRefs(publicAccount);

interface State {
  language: number;
}

const state: State = reactive({
  language: accountDetails.value.activeLanguage,
});

function confirm() {
  accountDetails.value.activeLanguage = state.language;
  publicAccount.updateAccount().then(() => {
    locale.value = locales[state.language];
    localStorage.setItem("last-locale", locales[state.language]);
    modalController.dismiss();
  });
}
</script>

<style scoped></style>
