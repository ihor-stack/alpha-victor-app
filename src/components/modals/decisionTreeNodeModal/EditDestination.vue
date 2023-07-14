<template>
  <common-modal
    title="Edit destination"
    description="You can adjust the destination and outcomes via the form below."
    :handleDismiss="() => handleDismiss()"
  >
    <ion-content :scroll-y="false">
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label>Destination Type</ion-label>
          <ion-select
            interface="action-sheet"
            placeholder="Select type"
            v-model="state.type"
          >
            <ion-select-option
              v-for="option in treeNodeTypes"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </ion-select-option>
          </ion-select>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label>Outcome label</ion-label>
          <ion-input
            placeholder="Enter new outcome"
            v-model="state.outcomeLabel"
          ></ion-input>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label>{{ selectedOutcome }} title</ion-label>
          <ion-input placeholder="Enter new question" v-model="state.text"></ion-input>
        </ion-col>
      </ion-row>
      <ion-button
        class="ion-text-capitalize"
        expand="block"
        @click="() => handleClickNext(state)"
      >
        Next</ion-button
      >
    </ion-content>
  </common-modal>
</template>
<script setup>
import { reactive, computed } from "vue";
import {
  IonContent,
  IonButton,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import CommonModal from "@/components/modals/CommonModal.vue";

const treeNodeTypes = [
  {
    value: 0,
    label: "Article",
  },
  {
    value: 1,
    label: "Video",
  },
  {
    value: 2,
    label: "Question",
  },
  {
    value: 4,
    label: "Email",
  },
  {
    value: 5,
    label: "Phone",
  },
  {
    value: 6,
    label: "Document",
  },
];

const selectedOutcome = computed(() => {
  const selectedNodeType = treeNodeTypes.find(
    (treeNodeType) => treeNodeType.value === state.type
  );

  return selectedNodeType?.label || '';
});

const props = defineProps(["editTreeNode", "type", "handleClickNext", "handleDismiss"]);

const state = reactive({
  text: props.editTreeNode.text,
  outcomeLabel: props.editTreeNode.parent?.text || "Answer",
  type: props.type,
});
</script>

<style scoped></style>
