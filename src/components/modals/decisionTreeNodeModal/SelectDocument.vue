<template>
  <common-modal
    :title="$t('components.modals.decisionTreeNodeModal.selectDocument.selectDocumentTitle')"
    :description="$t('components.modals.decisionTreeNodeModal.selectDocument.selectDocumentDescription')"
    :handleDismiss="() => handleDismiss()"
  >
    <div>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label>{{$t('components.modals.decisionTreeNodeModal.selectDocument.manufacturerLabel')}}</ion-label>
          <ion-select
            interface="action-sheet"
            :placeholder="$t('components.modals.decisionTreeNodeModal.selectDocument.manufacturerSelectPlaceholder')"
            v-model="state.manufacturerId"
          >
            <ion-select-option
              v-for="option in manufacturers"
              :key="option.manufacturerId"
              :value="option.manufacturerId"
            >
              {{ option.name }}
            </ion-select-option>
          </ion-select>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label>{{$t('components.modals.decisionTreeNodeModal.selectDocument.typeLabel')}}</ion-label>
          <ion-select
            interface="action-sheet"
            :placeholder="$t('components.modals.decisionTreeNodeModal.selectDocument.typeSelectPlaceholder')"
            v-model="state.assetTypeId"
          >
            <ion-select-option
              v-for="option in types"
              :key="option.assetId"
              :value="option.assetId"
            >
              {{ option.name }}
            </ion-select-option>
          </ion-select>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label>{{$t('components.modals.decisionTreeNodeModal.selectDocument.modelLabel')}}</ion-label>
          <ion-select
            interface="action-sheet"
            :placeholder="$t('components.modals.decisionTreeNodeModal.selectDocument.modeSelectPlaceholder')"
            v-model="state.equipmentId"
          >
            <ion-select-option
              v-for="option in models"
              :key="option.equipmentId"
              :value="option.equipmentId"
            >
              {{ option.equipmentName }}
            </ion-select-option>
          </ion-select>
        </ion-col>
      </ion-row>
      <CustomList
        :listData="state.documents"
        :selectedItem="state.selectedDocument"
        :handleSelectItem="(item) => (state.selectedDocument = item)"
      ></CustomList>
    </div>
    <ion-footer>
      <ion-button
        class="ion-text-capitalize ion-margin-top"
        expand="block"
        @click="handleClickConfirm({ document: state.selectedDocument })"
      >
      {{$t('components.modals.decisionTreeNodeModal.selectDocument.confirmSelectionButton')}}</ion-button
      >
      <ion-button
        class="ion-text-capitalize"
        fill="clear"
        expand="block"
        @click="handleClickBack"
      >
        {{ $t('components.modals.decisionTreeNodeModal.selectDocument.backToDestinationButton') }}
      </ion-button>
    </ion-footer>
  </common-modal>
</template>
<script setup>
import { reactive, computed, watch, onBeforeMount } from "vue";
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

import CustomList from "./CustomList.vue";
import CommonModal from "@/components/modals/CommonModal.vue";
import { adminAPI } from "@/axios";
import { Organisations as useOrganisationsStore } from "@/stores/adminOrganisations";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";

const organisationsStore = useOrganisationsStore();

const props = defineProps([
  "editTreeNode",
  "handleClickConfirm",
  "handleDismiss",
  "handleClickBack",
]);

const state = reactive({
  manufacturerId: props.editTreeNode?.document?.manufacturerId,
  assetTypeId: props.editTreeNode?.document?.assetTypeId,
  equipmentId: props.editTreeNode?.document?.equipmentId,
  documentId: props.editTreeNode?.document?.id,
  documents: [],
  selectedDocument: props.editTreeNode?.document,
});

const manufacturers = computed(() => {
  return organisationsStore.equipmentList?.manufacturers || [];
});

const types = computed(() => {
  return organisationsStore.equipmentList?.assetTypes || [];
});

const models = computed(() => {
  const equipmentList = organisationsStore.equipmentList?.equipments || [];
  return equipmentList.filter(
    (equipment) =>
      equipment.manufacturerId === state.manufacturerId &&
      equipment.assetTypeId === state.assetTypeId
  );
});

const getDocumentTypes = (equipmentId) => {
  if (!equipmentId) return;
  const loadId = loadingService.show("Loading...");
  adminAPI
    .get(`/Document/Equipment/${equipmentId}`)
    .then((response) => {
      state.documents = response.data;
    })
    .catch((error) => {
      state.documents = [];
      toastService.show("Error", error, "error", "top");
    })
    .finally(() => {
      loadingService.close(loadId);
    });
};

onBeforeMount(() => {
  getDocumentTypes(props.editTreeNode?.document?.equipmentId);
});

watch([() => state.equipmentId], (value) => {
  getDocumentTypes(value);
});
</script>

<style scoped></style>
