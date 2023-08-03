<template>
  <common-modal
    :title="$t('components.modals.decisionTreeNodeModal.addEmail.addEmailAddressTitle')"
    :description="$t('components.modals.decisionTreeNodeModal.addEmail.addEmailAddressDescription')"
    :handleDismiss="() => handleDismiss()"
  >
    <div>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label text-wrap="true">{{ $t('components.modals.decisionTreeNodeModal.addEmail.emailAddressLabel') }}</ion-label>
          <ion-input
            :placeholder="$t('components.modals.decisionTreeNodeModal.addEmail.emailAddressInputPlaceholder')"
            v-model="state.email"
          ></ion-input>
        </ion-col>
      </ion-row>
      <ion-button
        class="ion-text-capitalize"
        expand="block"
        @click="handleClickConfirm(state)"
      >
        {{ $t('components.modals.decisionTreeNodeModal.addEmail.confirmSelectionButton') }}</ion-button
      >
      <ion-button
        class="ion-text-capitalize"
        fill="clear"
        expand="block"
        @click="handleClickBack"
      >
        {{ $t('components.modals.decisionTreeNodeModal.addEmail.backToDestinationButton') }}
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
