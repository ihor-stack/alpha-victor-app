<template>
  <common-modal
    title="Add phone number"
    description="You can add a phone number to be presented via the form field below. "
    :handleDismiss="() => handleDismiss()"
  >
    <ion-content :scroll-y="false">
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label>Phone Number</ion-label>
          <ion-input
            placeholder="Enter phone number"
            v-model="state.phone"
          ></ion-input>
        </ion-col>
      </ion-row>
      <ion-button
        class="ion-text-capitalize"
        expand="block"
        @click="handleClickConfirm(state)"
      >
        Confirm Selection</ion-button
      >
      <ion-button
        class="ion-text-capitalize"
        fill="clear"
        expand="block"
        @click="handleClickBack"
      >
        Back to destination
      </ion-button>
    </ion-content>
  </common-modal>
</template>
<script setup>
import { reactive } from "vue";
import {
  IonContent,
  IonButton,
  IonRow,
  IonCol,
  IonInput,
  IonLabel,
} from "@ionic/vue";
import CommonModal from "@/components/modals/CommonModal.vue";

const props = defineProps([
  "editTreeNode",
  "handleClickConfirm",
  "handleDismiss",
  "handleClickBack",
]);

const state = reactive({
  phone: props.editTreeNode?.phone,
});
</script>

<style scoped></style>
