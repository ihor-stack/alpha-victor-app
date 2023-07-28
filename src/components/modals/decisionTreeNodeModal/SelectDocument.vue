<template>
  <common-modal
    title="Select document"
    description="You can select a document to be presented via the drop downs below."
    :handleDismiss="() => handleDismiss()"
  >
    <div>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <AdminSelect
            label="Manufacturer"
            v-model="selectedManufacturer"
            :options="manufacturerOptions"
            idPrefix="manufacturer-select"
            placeholder="Select manufacturer"
          />
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <AdminSelect
            label="Type"
            v-model="selectedType"
            :options="typeOptions"
            idPrefix="type-select"
            placeholder="Select type"
          />
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <AdminSelect
            label="Model"
            v-model="selectedModel"
            :options="modelOptions"
            idPrefix="model-select"
            placeholder="Select model"
          />
        </ion-col>
      </ion-row>
      <CustomList
        :listData="state.documents"
        :selectedItem="state.selectedDocument"
        :handleSelectItem="(item: any) => (state.selectedDocument = item)"
      ></CustomList>
    </div>
    <ion-footer>
      <ion-button
        class="ion-text-capitalize ion-margin-top"
        expand="block"
        @click="handleClickConfirm({ document: state.selectedDocument })"
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
    </ion-footer>
  </common-modal>
</template>
<script setup lang="ts">
import { reactive, computed, watch, onBeforeMount } from "vue";
import {
  IonButton,
  IonRow,
  IonCol,
  IonFooter,
} from "@ionic/vue";

import CustomList from "./CustomList.vue";
import CommonModal from "@/components/modals/CommonModal.vue";
import { adminAPI } from "@/axios";
import { Organisations as useOrganisationsStore } from "@/stores/adminOrganisations";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import AdminSelect from "@/components/admin/AdminSelect.vue";

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

const manufacturerOptions = computed(() => {
  return organisationsStore.equipmentList.manufacturers.map((manufacturer, index) => {
    return {
      id: index,
      title: manufacturer.name,
      manufacturerId: manufacturer.manufacturerId,
    }
  });
});

const selectedManufacturer = computed({
  get() {
    return manufacturerOptions.value.find(
      (manufacturer) => state.manufacturerId === manufacturer.manufacturerId
    );
  },
  set(newValue) {
    if (newValue) {
      state.manufacturerId = newValue.manufacturerId
    }
  },
})

const typeOptions = computed(() => {
  return organisationsStore.equipmentList.assetTypes.map((assetType, index) => {
    return {
      id: index,
      title: assetType.name,
      assetId: assetType.assetId,
    }
  });
});

const selectedType = computed({
  get() {
    return typeOptions.value.find(
      (assetType) => state.assetTypeId === assetType.assetId
    );
  },
  set(newValue) {
    if (newValue) {
      state.assetTypeId = newValue.assetId
    }
  },
})

const modelOptions = computed(() => {
  const equipmentList = organisationsStore.equipmentList?.equipments || []

  return equipmentList.filter(
    (equipment) =>
      equipment.manufacturerId === state.manufacturerId &&
      equipment.assetTypeId === state.assetTypeId
  ).map((equipment, index) => {
    return {
      id: index,
      title: equipment.equipmentName,
      equipmentId: equipment.equipmentId,
    }
  });
})

const selectedModel = computed({
  get() {
    return modelOptions.value.find(
      (equipment) => state.equipmentId === equipment.equipmentId
    );
  },
  set(newValue) {
    if (newValue) {
      state.equipmentId = newValue.equipmentId
    }
  },
})

const getDocumentTypes = (equipmentId: string) => {
  if (!equipmentId) return;
  const loadId = loadingService.show("Loading...");
  adminAPI
    .get(`/Document/Equipment/${equipmentId}`)
    .then((response) => {
      state.documents = response.data;
    })
    .catch((error) => {
      state.documents = [];
      toastService.show("Error", error, "error", "bottom");
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
