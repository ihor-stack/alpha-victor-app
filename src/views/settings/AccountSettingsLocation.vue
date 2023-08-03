<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label text-wrap="true">
              <h2 class="font-size-md font-bold">{{ $t('pages.accountSettings.location.label') }}</h2>
              <p class="font-size-xs">{{ $t('pages.accountSettings.location.description') }}</p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false">
          <div class="setting">
            <div class="setting__label">
              <p class="label font-size-xs font-bold">{{ $t('pages.accountSettings.location.allowLocation') }}</p>
              <span class="sublabel font-mono font-size-xxs color-dark-gray">{{
                useDotify($t('pages.accountSettings.location.accurateLocation'))
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
