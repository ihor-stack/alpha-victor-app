<template>
  <common-modal
    title="Edit answer"
    description="You can edit the answer via the form below."
    :handleDismiss="() => handleDismiss()"
  >
    <ion-content :scroll-y="false">
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label color="light">Answer</ion-label>
          <ion-input
            color="light"
            placeholder="Enter Answer"
            v-model="state.text"
          ></ion-input>
        </ion-col>
      </ion-row>
      <ion-button
        class="ion-text-capitalize"
        expand="block"
        @click="handleClickConfirm(state)"
      >
        Update</ion-button
      >
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
]);

const state = reactive({
  text: props.editTreeNode?.text,
});
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}
</style>
