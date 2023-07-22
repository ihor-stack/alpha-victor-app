<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label>
              <h2 class="font-size-md font-bold">{{ $t('pages.accountSettings.notifications.label') }}</h2>
              <p class="font-size-xs">{{ $t('pages.accountSettings.notifications.description') }}</p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false">
          <div class="setting">
            <div class="setting__label">
              <p class="label font-size-xs font-bold">{{ $t('pages.accountSettings.notifications.allowNotifications') }}</p>
              <span class="sublabel font-mono font-size-xxs color-dark-gray">{{
                useDotify($t('pages.accountSettings.notifications.receiveNotifications'))
              }}</span>
            </div>
            <ion-toggle
              v-model="state.allowNotifications"
              @ionChange="requestPermission"
            />
          </div>
        </ion-content>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { Diagnostic } from "@awesome-cordova-plugins/diagnostic";
import { useDotify } from "@/composables/utilities";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToggle,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { reactive, onBeforeMount } from "vue";

interface State {
  allowNotifications: boolean;
}

const state: State = reactive({
  allowNotifications: false,
});

const requestPermission = async () => {
  const status = await Diagnostic.requestRemoteNotificationsAuthorization();
  if (status === Diagnostic.permissionStatus.GRANTED) {
    state.allowNotifications = true;
  } else {
    state.allowNotifications = false;
  }
};

onBeforeMount(async () => {
  const status = await Diagnostic.getRemoteNotificationsAuthorizationStatus();
  if (status === Diagnostic.permissionStatus.GRANTED) {
    state.allowNotifications = true;
  } else {
    state.allowNotifications = false;
  }
});
</script>

<style scoped></style>
