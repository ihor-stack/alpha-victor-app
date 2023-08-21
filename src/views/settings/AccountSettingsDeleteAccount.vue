<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label text-wrap="true">
              <h2 class="font-size-md font-bold">
                {{
                  state.accountDeleted
                    ? $t("pages.accountSettings.deleteAccount.label.deleted")
                    : $t("pages.accountSettings.deleteAccount.label.confirm")
                }}
              </h2>
              <p class="settings-panel__comment font-size-xs">
                {{
                  state.accountDeleted
                    ? $t("pages.accountSettings.deleteAccount.question.deleted")
                    : $t("pages.accountSettings.deleteAccount.question.confirm")
                }}
              </p>
              <p class="settings-panel__comment font-size-xs">
                {{
                  state.accountDeleted
                    ? $t(
                        "pages.accountSettings.deleteAccount.description.deleted"
                      )
                    : $t(
                        "pages.accountSettings.deleteAccount.description.confirm"
                      )
                }}
              </p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false"></ion-content>
        <ion-footer>
          <ion-button
            v-if="state.accountDeleted"
            expand="block"
            @click="confirm"
            >{{
              $t(
                "pages.accountSettings.deleteAccount.confirmDeletionBtn.deleted"
              )
            }}</ion-button
          >
          <ion-button v-else expand="block" @click="confirm">{{
            $t("pages.accountSettings.deleteAccount.confirmDeletionBtn.confirm")
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
import { Account as useAccountStore } from "@/stores/publicAccount";

const accountStore = useAccountStore();

interface State {
  password: string;
  accountDeleted: boolean;
}

const state: State = reactive({
  password: "",
  accountDeleted: false,
});

function confirm() {
  accountStore.deleteAccount();
}
</script>

<style scoped></style>
