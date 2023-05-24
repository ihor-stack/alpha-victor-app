<template>
  <common-modal
    title="Select document"
    description="You can select a document to be presented via the drop downs below."
    :handleDismiss="() => handleDismiss()"
  >
    <ion-content>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label color="light">Manufacturer</ion-label>
          <ion-select
            interface="action-sheet"
            placeholder="Select manufacturer"
            v-model="state.manufacturer"
          >
            <ion-select-option
              v-for="option in manufacturers"
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
          <ion-label color="light">Type</ion-label>
          <ion-select
            interface="action-sheet"
            placeholder="Select type"
            v-model="state.type"
          >
            <ion-select-option
              v-for="option in types"
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
          <ion-label color="light">Model</ion-label>
          <ion-select
            interface="action-sheet"
            placeholder="Select model"
            v-model="state.model"
          >
            <ion-select-option
              v-for="option in models"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </ion-select-option>
          </ion-select>
        </ion-col>
      </ion-row>
    </ion-content>
    <ion-footer>
      <ion-button
        class="ion-text-capitalize ion-margin-top"
        expand="block"
        @click="handleClickConfirm(state)"
      >
        Confirm Selection</ion-button
      >
      <ion-button
        class="ion-text-capitalize"
        color="light"
        fill="clear"
        expand="block"
        @click="handleClickBack"
      >
        Back to destination
      </ion-button>
    </ion-footer>
  </common-modal>
</template>
<script setup>
import { reactive, computed } from "vue";
import {
  IonContent,
  IonButton,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonFooter,
} from "@ionic/vue";
import CommonModal from "@/components/modals/CommonModal.vue";

import { Organisations as useOrganisationsStore } from "@/stores/adminOrganisations";

const organisationsStore = useOrganisationsStore();

const props = defineProps([
  "editTreeNode",
  "handleClickConfirm",
  "handleDismiss",
  "handleClickBack",
]);

const state = reactive({
  manufacturer: "",
  type: "",
  model: "",
});

const manufacturers = computed(() => {
  // const articles = organisationsStore.currentOrganisationDetails;

  // return articles.filter(
  //   (a) =>
  //     a.title?.toLowerCase().indexOf(state.searchTerm.value.toLowerCase()) > -1
  // );
  const mockManufacturer = [
    {
      id: "1",
      title: "Teams Room",
    },
    {
      id: "2",
      title: "Alternative Teams Room",
    },
    {
      id: "3",
      title: "Alternative Teams Room",
    },
  ];
  return mockManufacturer;
});

const types = computed(() => {
  // const articles = organisationsStore.currentOrganisationDetails;

  // return articles.filter(
  //   (a) =>
  //     a.title?.toLowerCase().indexOf(state.searchTerm.value.toLowerCase()) > -1
  // );
  const mockTypes = [
    {
      id: "1",
      title: "Teams Room",
    },
    {
      id: "2",
      title: "Alternative Teams Room",
    },
    {
      id: "3",
      title: "Alternative Teams Room",
    },
  ];
  return mockTypes;
});

const models = computed(() => {
  // const articles = organisationsStore.currentOrganisationDetails;

  // return articles.filter(
  //   (a) =>
  //     a.title?.toLowerCase().indexOf(state.searchTerm.value.toLowerCase()) > -1
  // );
  const mockModels = [
    {
      id: "1",
      title: "Teams Room",
    },
    {
      id: "2",
      title: "Alternative Teams Room",
    },
    {
      id: "3",
      title: "Alternative Teams Room",
    },
  ];
  return mockModels;
});
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}
</style>
