<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header>
          <div class="settings-panel__header">
            <h1
              class="settings-panel__title color-light-gray font-bold font-size-normal"
            >
              Location
            </h1>
            <p class="settings-panel__comment color-light-gray font-size-xs">
              We use your location to check spaces near you. Update your
              location settings below.
            </p>
          </div>
        </ion-header>
        <ion-content :scroll-y="false">
          <div class="setting">
            <div class="setting__label">
              <p class="label font-size-xs font-bold color-light-gray">
                Allow location
              </p>
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
import { IonPage, IonHeader, IonContent, IonToggle } from "@ionic/vue";
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

<style scoped>
ion-content::part(background) {
  background: #181818;
}
</style>
