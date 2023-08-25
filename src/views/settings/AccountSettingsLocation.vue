<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label text-wrap="true">
              <h2 class="font-size-md font-bold">
                {{ $t("pages.accountSettings.location.label") }}
              </h2>
              <p class="font-size-xs">
                {{ $t("pages.accountSettings.location.description") }}
              </p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false">
          <div class="setting">
            <div class="setting__label">
              <p class="label font-size-xs font-bold">
                {{ $t("pages.accountSettings.location.allowLocation") }}
              </p>
              <span class="sublabel font-mono font-size-xxs color-dark-gray">{{
                useDotify($t("pages.accountSettings.location.accurateLocation"))
              }}</span>
            </div>
            <ion-toggle
              v-if="state.isInitiated"
              v-model="state.allowLocation"
              @ionChange="retryPermission"
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
  IonLabel,
  IonItem,
} from "@ionic/vue";
import { reactive, onBeforeMount } from "vue";
import { isPlatform } from "@ionic/vue";

interface State {
  allowLocation: boolean;
  isInitiated: boolean;
}

const state: State = reactive({
  allowLocation: false,
  isInitiated: false,
});

const retryPermission = async () => {
  if (isPlatform("android")) {
    Diagnostic.switchToLocationSettings();
  }
  if (isPlatform("ios")) {
    Diagnostic.switchToSettings();
  }
};

const requestPermission = async () => {
  const status = await Diagnostic.requestLocationAuthorization();
  state.allowLocation =
    status === Diagnostic.permissionStatus.GRANTED ||
    status === Diagnostic.permissionStatus.GRANTED_WHEN_IN_USE;
};

onBeforeMount(async () => {
  const status = await Diagnostic.getLocationAuthorizationStatus();
  state.allowLocation =
    status === Diagnostic.permissionStatus.GRANTED ||
    status === Diagnostic.permissionStatus.GRANTED_WHEN_IN_USE;
  state.isInitiated = true;
  if (status === Diagnostic.permissionStatus.NOT_REQUESTED) {
    requestPermission();
  }
});
</script>

<style scoped></style>
