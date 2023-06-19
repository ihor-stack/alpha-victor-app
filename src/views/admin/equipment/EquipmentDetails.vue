<template>
  <h1 class="title-admin font-bold font-size-lg color-light-gray">
    {{ state.name }}
  </h1>
  <ion-grid class="form-admin">
    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Manufacturer</ion-label>
        <ion-select
          interface="action-sheet"
          placeholder="Select manufacturer"
          v-model="state.manufacturerId"
        >
          <ion-select-option
            v-for="option in equipmentList.manufacturers"
            :key="option.manufacturerId"
            :value="option.manufacturerId"
          >
            {{ option.name }}
          </ion-select-option>
        </ion-select>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Model</ion-label>
        <ion-input color="light" v-model="state.name" label="Model"></ion-input>
      </ion-col>
    </ion-row>
    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Serial number</ion-label>
        <ion-input
          color="light"
          v-model="state.serialNumber"
          label="Serial number"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Asset type</ion-label>
        <ion-select
          interface="action-sheet"
          placeholder="Select asset type"
          v-model="state.assetTypeId"
        >
          <ion-select-option
            v-for="option in equipmentList.assetTypes"
            :key="option.assetId"
            :value="option.assetId"
          >
            {{ option.name }}
          </ion-select-option>
        </ion-select>
      </ion-col>
    </ion-row>
    <ion-row class="form-admin--group_field component_container">
      <ion-col
        size-xs="12"
        size-md="6"
        class="form-admin--group_field"
        v-for="document in currentEquipment.documents"
        :key="document.id"
      >
        <ion-item
          button
          class="form-admin--group_field-item rev-margin"
          lines="none"
          v-if="document.id"
        >
          <ion-label color="light">
            {{ document.name }}
          </ion-label>
          <ion-button
            class="button-red text-lowercase"
            slot="end"
            fill="clear"
            size="small"
            @click="removeSpacesDocument(document.id)"
          >
            &gt;&gt; remove
          </ion-button>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row class="form-admin--group_field component_container">
      <ion-col size-xs="12" class="form-admin--group_field">
        <EquipmentDocumentModal />
      </ion-col>
      <ion-col size-xs="12">
        <ion-button
          class="font-size-xs text-lowercase save-button"
          :disabled="
            !state.name ||
            !state.manufacturerId ||
            !state.serialNumber ||
            !state.assetTypeId
          "
          @click="save"
        >
          Save Changes
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, watch } from "vue";
import {
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
  IonSelect,
  IonSelectOption,
  IonItem,
} from "@ionic/vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import EquipmentDocumentModal from "@/components/admin/equipment/EquipmentDocumentModal.vue";
import { Equipment as useEquipment } from "@/stores/adminEquipment";

const EquipmentStore = useEquipment();
const route = useRoute();

const equipmentId = route.params.equipmentId as string;
const { equipmentList, currentEquipment } = storeToRefs(EquipmentStore);
const state = reactive({
  name: currentEquipment.value?.name,
  serialNumber: currentEquipment.value?.serialNumber,
  manufacturerId: currentEquipment.value?.manufacturerId,
  assetTypeId: currentEquipment.value?.assetTypeId,
});

const removeSpacesDocument = (documentId: string) => {
  EquipmentStore.deleteEquipmentDocument(documentId, equipmentId);
};

const save = () => {
  EquipmentStore.updateEquipment(equipmentId, state);
};

watch(currentEquipment, (newValue) => {
  state.name = newValue.name;
  state.serialNumber = newValue.serialNumber;
  state.manufacturerId = newValue.manufacturerId;
  state.assetTypeId = newValue.assetTypeId;
});

onBeforeMount(() => {
  if (!equipmentList.value?.equipments?.length) {
    EquipmentStore.getEquipments().then(() => {
      EquipmentStore.getEquipmentDetails(equipmentId);
    });
  } else {
    EquipmentStore.getEquipmentDetails(equipmentId);
  }
});
</script>

<style scoped>
.save-button {
  margin-top: 5%;
  width: 246px;
}
.new-document-button {
  color: var(--av-light-gray);
}
ion-select {
  background: #181818;
}
</style>
