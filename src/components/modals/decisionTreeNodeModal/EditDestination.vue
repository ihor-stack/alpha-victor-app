<template>
  <common-modal
    :title="$t('components.modals.decisionTreeNodeModal.editDestination.editDestinationTitle')"
    :description="$t('components.modals.decisionTreeNodeModal.editDestination.adjustDestinationDescription')"
    :handleDismiss="() => handleDismiss()"
  >
    <div>
      <ion-row v-if="!isRoot">
        <ion-col size="12" class="form-admin--group_field">
          <AdminSelect
            label="Destination Type"
            v-model="selectedDestinationType"
            :options="destinationTypeOptions"
            idPrefix="organisation-type-select"
            placeholder="Select type"
          />
        </ion-col>
      </ion-row>
      <ion-row v-if="!isRoot">
        <ion-col size="12" class="form-admin--group_field">
          <ion-label text-wrap="true">{{$t('components.modals.decisionTreeNodeModal.editDestination.outcomeLabel')}}</ion-label>
          <ion-input
            :placeholder="$t('components.modals.decisionTreeNodeModal.editDestination.outcomePlaceholder')"
            v-model="state.outcomeLabel"
          ></ion-input>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label text-wrap="true">{{ selectedOutcome }} title</ion-label>
          <ion-input v-model="state.text"></ion-input>
        </ion-col>
      </ion-row>
      <ion-button
        class="ion-text-capitalize"
        expand="block"
        @click="() => handleClickNext(state)"
      >
        {{$t('components.modals.decisionTreeNodeModal.editDestination.nextButton')}}</ion-button
      >
    </div>
  </common-modal>
</template>
<script setup lang="ts">
import { reactive, computed } from "vue";
import { IonButton, IonRow, IonCol, IonLabel, IonInput } from "@ionic/vue";
import CommonModal from "@/components/modals/CommonModal.vue";
import AdminSelect from "@/components/admin/AdminSelect.vue";

const destinationTypeOptions = [
  {
    id: 0,
    title: "Article",
  },
  {
    id: 1,
    title: "Video",
  },
  {
    id: 2,
    title: "Question",
  },
  {
    id: 4,
    title: "Email",
  },
  {
    id: 5,
    title: "Phone",
  },
  {
    id: 6,
    title: "Document",
  },
];

const selectedDestinationType = computed({
  get() {
    return destinationTypeOptions.find(
      (destinationType: any) => state.type === destinationType.id
    );
  },
  set(newValue) {
    if (newValue) {
      state.type = newValue.id;
    }
  },
});

const selectedOutcome = computed(
  () => selectedDestinationType.value?.title || ""
);

const props = defineProps([
  "editTreeNode",
  "type",
  "handleClickNext",
  "handleDismiss",
  "isRoot",
]);

const state = reactive({
  text: props.editTreeNode.text,
  outcomeLabel: props.editTreeNode.parent?.text || "Answer",
  type: props.type,
});
</script>

<style scoped></style>
