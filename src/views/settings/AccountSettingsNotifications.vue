<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label text-wrap="true">
              <h2 class="font-size-md font-bold">
                {{ $t("pages.accountSettings.notifications.label") }}
              </h2>
              <p class="font-size-xs">
                {{ $t("pages.accountSettings.notifications.description") }}
              </p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false">
          <div class="setting">
            <div class="setting__label">
              <p class="label font-size-xs font-bold">
                {{
                  $t("pages.accountSettings.notifications.allowNotifications")
                }}
              </p>
              <span class="sublabel font-mono font-size-xxs color-dark-gray">{{
                useDotify(
                  $t("pages.accountSettings.notifications.receiveNotifications")
                )
              }}</span>
            </div>
            <ion-toggle
              v-if="state.isInitiated"
              v-model="state.allowNotifications"
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
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { reactive, onMounted } from "vue";
import { isPlatform } from "@ionic/vue";

interface State {
  allowNotifications: boolean;
  isInitiated: boolean;
}

const state: State = reactive({
  allowNotifications: false,
  isInitiated: false,
});

const retryPermission = async () => {
  if (isPlatform("android")) {
    Diagnostic.switchToNotificationSettings();
  }
  if (isPlatform("ios")) {
    Diagnostic.switchToSettings();
  }
};

const requestPermission = async () => {
  const status = await Diagnostic.requestRemoteNotificationsAuthorization();
  console.log("notification request=======>", status);
  state.allowNotifications =
    status === Diagnostic.permissionStatus.GRANTED ||
    status === Diagnostic.permissionStatus.GRANTED_WHEN_IN_USE;
};

onMounted(async () => {
  const status = await Diagnostic.getRemoteNotificationsAuthorizationStatus();
  state.allowNotifications =
    status === Diagnostic.permissionStatus.GRANTED ||
    status === Diagnostic.permissionStatus.GRANTED_WHEN_IN_USE;
  state.isInitiated = true;
  console.log(
    "notification status=======>",
    status,
    Diagnostic.permissionStatus.NOT_REQUESTED
  );
  if (status === Diagnostic.permissionStatus.NOT_REQUESTED) {
    console.log(
      "notification is not rquested=======>",
      status,
      Diagnostic.permissionStatus.NOT_REQUESTED
    );
    requestPermission();
  }
});
</script>

<style scoped></style>
