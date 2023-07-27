<template>
  <h1 class="title-admin font-bold font-size-lg color-light-gray">
    {{ state.name }}
  </h1>
  <ion-grid class="form-admin">
    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <AdminSelect
          label="Manufacturer"
          v-model="manufacturerSelected"
          :options="manufacturerOptions"
          idPrefix="manufacturer-select"
        />
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label>{{ $t('pages.admin.equipment.details.model')}}</ion-label>
        <ion-input v-model="state.name" label="Model"></ion-input>
      </ion-col>
    </ion-row>
    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label>{{ $t('pages.admin.equipment.details.sn')}}</ion-label>
        <ion-input
          v-model="state.serialNumber"
          label="Serial number"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <AdminSelect
          label="Asset Type"
          v-model="assetTypeSelected"
          :options="assetTypeOptions"
          idPrefix="asset-type-select"
        />
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
          <ion-label>
            {{ document.name }}
          </ion-label>
          <ion-button
            class="button-red text-lowercase"
            slot="end"
            fill="clear"
            size="small"
            @click="removeSpacesDocument(document.id)"
          >
            {{ $t('pages.admin.equipment.details.remove')}}
          </ion-button>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size-xs="12" class="form-admin--group_field">
        <EquipmentDocumentModal />
      </ion-col>
      <ion-col size-xs="12">
        <ion-button
          class="button-wide"
          :disabled="
            !state.name ||
            !state.manufacturerId ||
            !state.serialNumber ||
            !state.assetTypeId
          "
          @click="save"
        >
          {{ $t('pages.admin.equipment.details.saveBtn')}}
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, watch } from "vue";
import {
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
  IonItem,
} from "@ionic/vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import EquipmentDocumentModal from "@/components/admin/equipment/EquipmentDocumentModal.vue";
import AdminSelect from "@/components/admin/AdminSelect.vue";
import { Equipment as useEquipment } from "@/stores/adminEquipment";

const EquipmentStore = useEquipment();
const route = useRoute();

const equipmentId = route.params.equipmentId as string;
const {
  equipmentList,
  currentEquipment,
  manufacturerSelected,
  assetTypeSelected,
} = storeToRefs(EquipmentStore);

const manufacturerOptions = computed(() => {
  return equipmentList.value.manufacturers.map((manufacturer, index) => ({
    id: index,
    title: manufacturer.name,
    additionalInfo: manufacturer.manufacturerId,
  }));
});

const assetTypeOptions = computed(() => {
  return equipmentList.value.assetTypes.map((assetType, index) => ({
    id: index,
    title: assetType.name,
    additionalInfo: assetType.assetId,
  }));
});

const state = reactive({
  name: currentEquipment.value?.name,
  serialNumber: currentEquipment.value?.serialNumber,
  manufacturerId: manufacturerSelected.value?.additionalInfo,
  assetTypeId: assetTypeSelected.value?.additionalInfo,
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

watch(manufacturerSelected, (newValue) => {
  state.manufacturerId = newValue.additionalInfo;
});

watch(assetTypeSelected, (newValue) => {
  state.assetTypeId = newValue.additionalInfo;
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
