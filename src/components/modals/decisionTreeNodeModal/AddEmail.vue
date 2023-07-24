<template>
  <common-modal
    title="Add email address"
    description="You can add a email address to be presented via the form field below. "
    :handleDismiss="() => handleDismiss()"
  >
    <div>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label>Email Address</ion-label>
          <ion-input
            placeholder="Enter a email address"
            v-model="state.email"
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
    </div>
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
  email: props.editTreeNode?.email,
});
</script>

<style scoped></style>
