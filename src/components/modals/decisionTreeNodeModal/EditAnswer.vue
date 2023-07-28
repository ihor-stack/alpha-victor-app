<template>
  <common-modal
    :title="$t('components.modals.decisionTreeNodeModal.editAnswer.editAnswerTitle')"
    :description="$t('components.modals.decisionTreeNodeModal.editAnswer.editAnswerDescription')"
    :handleDismiss="() => handleDismiss()"
  >
    <div>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label>{{$t('components.modals.decisionTreeNodeModal.editAnswer.answerLabel')}}</ion-label>
          <ion-input
            :placeholder="$t('components.modals.decisionTreeNodeModal.editAnswer.answerInputPlaceholder')"
            v-model="state.text"
          ></ion-input>
        </ion-col>
      </ion-row>
      <ion-button
        class="ion-text-capitalize"
        expand="block"
        @click="handleClickConfirm(state)"
      >
        {{$t("components.modals.decisionTreeNodeModal.editAnswer.updateButton")}}</ion-button
      >
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
]);

const state = reactive({
  text: props.editTreeNode?.text,
});
</script>

<style scoped></style>
