<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label>
              <h2 class="font-size-md font-bold">{{ $t('pages.accountSettings.bluetooth.label') }}</h2>
              <p class="font-size-xs">{{ $t('pages.accountSettings.bluetooth.description') }}</p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false">
          <div class="setting">
            <div class="setting__label">
              <p class="label font-size-xs font-bold">{{ $t('pages.accountSettings.bluetooth.allowBluetooth') }}</p>
              <span class="sublabel font-mono font-size-xxs color-dark-gray">{{
                useDotify($t('pages.accountSettings.bluetooth.pingBeacons'))
              }}</span>
            </div>
            <ion-toggle
              v-model="state.allowBluetooth"
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
  allowBluetooth: boolean;
}

const state: State = reactive({
  allowBluetooth: false,
});

const requestPermission = async () => {
  const status = await Diagnostic.requestBluetoothAuthorization();
  if (status === Diagnostic.permissionStatus.GRANTED) {
    state.allowBluetooth = true;
  } else {
    state.allowBluetooth = false;
  }
};

onBeforeMount(() => {
  Diagnostic.registerBluetoothStateChangeHandler((status: string) => {
    if (status === Diagnostic.permissionStatus.GRANTED) {
      state.allowBluetooth = true;
    } else {
      state.allowBluetooth = false;
    }
  });
});
</script>

<style scoped></style>
