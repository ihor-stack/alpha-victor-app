<template>
  <ion-button class="button-wide" @click="state.modalOpen = true">
    Add new equipment +
  </ion-button>
  <ion-modal
    :is-open="state.modalOpen"
    @willDismiss="handleDismiss"
    class="auto-height"
  >
    <ion-page>
      <div class="modal-panel">
        <div class="modal-panel-container">
          <ion-header>
            <ion-icon
              :icon="close"
              size="small"
              class="close-button"
              @click="state.modalOpen = false"
            />
            <div class="modal-panel__header">
              <h1
                class="modal-panel__title color-light-gray font-bold font-size-lg"
              >
                Add new equipment
              </h1>
              <p class="modal-panel__comment color-light-gray font-size-sm">
                You can create a new equipment the form below.
              </p>
            </div>
          </ion-header>
          <div>
            <ion-grid class="form-admin">
              <ion-row class="form-admin--group">
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <AdminSelect
                    label="Manufacturer"
                    v-model="selectedManufacturer"
                    :options="manufacturerOptions"
                    :isSearchable="true"
                    idPrefix="manufacturer-select"
                  />
                </ion-col>

                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <AdminSelect
                    label="Asset type"
                    v-model="selectedAssetType"
                    :options="assetTypeOptions"
                    :isSearchable="true"
                    idPrefix="asset-type-select"
                  />
                </ion-col>
              </ion-row>
              <ion-row class="form-admin--group">
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label>Model</ion-label>
                  <ion-input
                    v-model="state.name"
                    label="Model"
                    placeholder="Input Model"
                  ></ion-input>
                </ion-col>
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label>Serial number</ion-label>
                  <ion-input
                    v-model="state.serialNumber"
                    label="Model"
                    placeholder="Input Serial number"
                  ></ion-input>
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>
          <ion-footer>
            <ion-button
              class="font-size-sm text-lowercase"
              expand="block"
              :disabled="
                !state.name ||
                !state.manufacturerId ||
                !state.serialNumber ||
                !state.assetTypeId
              "
              @click="handleAddEquipment"
            >
              Add new equipment +
            </ion-button>
          </ion-footer>
        </div>
      </div>
    </ion-page>
  </ion-modal>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import {
  IonPage,
  IonHeader,
  IonFooter,
  IonButton,
  IonInput,
  IonModal,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { Equipment as useEquipment } from "@/stores/adminEquipment";
import AdminSelect from "@/components/admin/AdminSelect.vue";

const EquipmentStore = useEquipment();
const { equipmentList } = storeToRefs(EquipmentStore);

const state = reactive({
  name: "",
  manufacturerId: "",
  serialNumber: "",
  assetTypeId: "",
  modalOpen: false,
});

const manufacturerOptions = computed(() => {
  return equipmentList.value.manufacturers.map((manufacturer, index) => {
    return {
      id: index,
      title: manufacturer.name,
      additionalInfo: manufacturer.manufacturerId
    }
  })
})

const selectedManufacturer = computed({
  get() {
    return manufacturerOptions.value.find(
      (manufacturer) => state.manufacturerId === manufacturer.additionalInfo
    );
  },
  set(newValue) {
    if (newValue) {
      state.manufacturerId = newValue.additionalInfo
    }
  },
})

const assetTypeOptions = computed(() => {
  return equipmentList.value.assetTypes.map((manufacturer, index) => {
    return {
      id: index,
      title: manufacturer.name,
      additionalInfo: manufacturer.assetId
    }
  })
})

const selectedAssetType = computed({
  get() {
    return assetTypeOptions.value.find(
      (assetType) => state.assetTypeId === assetType.additionalInfo
    );
  },
  set(newValue) {
    if (newValue) {
      state.assetTypeId = newValue.additionalInfo
    }
  },
})

const handleDismiss = () => {
  state.modalOpen = false;
};

const handleAddEquipment = () => {
  EquipmentStore.addEquipment({
    name: state.name,
    manufacturerId: state.manufacturerId,
    serialNumber: state.serialNumber,
    assetTypeId: state.assetTypeId,
  }).then(() => {
    state.modalOpen = false;
    state.name = "";
    state.manufacturerId = "";
    state.serialNumber = "";
    state.assetTypeId = "";
  });
};
</script>

<style scoped>
.add-button {
  margin-bottom: 5%;
  width: 246px;
}
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}

.modal-panel {
  height: 70%;
  width: 100%;
  margin-left: 0;
  border-radius: 40px 40px 40px 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.modal-panel-container {
  position: relative;
  height: 100%;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 25px;
}

.modal-panel__header {
  margin-bottom: 20px;
}

.modal-panel__title {
  margin-bottom: 12px;
}

.modal-panel__section {
  margin-bottom: 20px;
}
</style>
