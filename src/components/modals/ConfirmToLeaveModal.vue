<template>
  <ion-modal :is-open="open" @willDismiss="handleDismiss" class="auto-height">
    <ion-page>
      <div class="modal-panel">
        <div class="modal-panel-container">
          <ion-header>
            <ion-icon
              :icon="close"
              size="small"
              class="close-button"
              @click="handleDismiss"
            />
            <div class="modal-panel__header">
              <h1
                class="modal-panel__title color-light-gray font-bold font-size-lg"
              >
                Unsaved changes
              </h1>
              <p class="modal-panel__comment color-light-gray font-size-sm">
                Are you sure you wish to leave this page without saving your
                changes?
              </p>
            </div>
          </ion-header>
          <ion-footer>
            <ion-row class="form-admin--group_field">
              <ion-col size-xs="6">
                <ion-button
                  class="button-wide button-red button-outline"
                  fill="outline"
                  color="--av-red"
                  @click="handleClickConfirm"
                >
                  Yes, leave
                </ion-button>
              </ion-col>

              <ion-col size-xs="6">
                <ion-button
                  class="button-wide button-outline"
                  fill="outline"
                  color="--av-light-gray"
                  @click="handleDismiss"
                >
                  No, let me save
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-footer>
        </div>
      </div>
    </ion-page>
  </ion-modal>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonFooter,
  IonButton,
  IonModal,
  IonIcon,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import confirmToLeaveService from "@/services/confirmToLeaveService";

const props = defineProps(["open", "handleDismiss", "handleConfirm"]);

const handleClickConfirm = () => {
  props.handleConfirm();
  props.handleDismiss();
  confirmToLeaveService.setEditing(false);
};
</script>

<style scoped>
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}
</style>
