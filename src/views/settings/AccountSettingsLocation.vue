<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label>
              <h2 class="font-size-medium font-bold">Location</h2>
              <p class="font-size-xs">
                We use your location to check spaces near you. Update your
                location settings below.
              </p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content>
          <div class="setting">
            <div class="setting__label">
              <p class="label font-size-xs font-bold">Allow location</p>
              <span class="sublabel font-mono font-size-xxs color-dark-gray">{{
                useDotify("Accurate Location")
              }}</span>
            </div>
            <ion-toggle
              v-model="state.allowLocation"
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
  IonLabel,
  IonItem,
} from "@ionic/vue";
import { reactive, onBeforeMount } from "vue";

interface State {
  allowLocation: boolean;
}

const state: State = reactive({
  allowLocation: false,
});

const requestPermission = async () => {
  const status = await Diagnostic.requestLocationAuthorization();
  if (status === Diagnostic.permissionStatus.GRANTED) {
    state.allowLocation = true;
  } else {
    state.allowLocation = false;
  }
};

onBeforeMount(() => {
  Diagnostic.registerLocationStateChangeHandler((status: string) => {
    if (status === Diagnostic.permissionStatus.GRANTED) {
      state.allowLocation = true;
    } else {
      state.allowLocation = false;
    }
  });
});
</script>

<style scoped></style>
