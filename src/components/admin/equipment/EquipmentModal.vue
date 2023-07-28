<template>
  <ion-button class="button-wide" @click="state.modalOpen = true">
    {{ $t("components.admin.equipment.equipmentModal.addEquipmentButton") }}
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
              {{ $t("components.admin.equipment.equipmentModal.addEquipmentHeader") }}
              </h1>
              <p class="modal-panel__comment color-light-gray font-size-sm">
                {{ $t("components.admin.equipment.equipmentModal.createEquipmentParagraph") }}
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
                  <ion-label>{{ $t("components.admin.equipment.equipmentModal.manufacturerLabel") }}</ion-label>
                  <ion-select
                    interface="action-sheet"
                    :placeholder="$t('components.admin.equipment.equipmentModal.selectManufacturerPlaceholder')"
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

                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label>{{ $t('components.admin.equipment.equipmentModal.assetTypeLabel') }}</ion-label>
                  <ion-select
                    interface="action-sheet"
                    :placeholder="$t('components.admin.equipment.equipmentModal.selectAssetTypePlaceholder')"
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
              <ion-row class="form-admin--group">
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label>{{$t('components.admin.equipment.equipmentModal.modelLabel')}}</ion-label>
                  <ion-input
                    v-model="state.name"
                    :label="$t('components.admin.equipment.equipmentModal.inputModelLabel')"
                    :placeholder="$t('components.admin.equipment.equipmentModal.inputModelPlaceholder')"
                  ></ion-input>
                </ion-col>
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label>{{ $t('components.admin.equipment.equipmentModal.serialNumberLabel') }}</ion-label>
                  <ion-input
                    v-model="state.serialNumber"
                    :label="$t('components.admin.equipment.equipmentModal.inputModelLabel')"
                    :placeholder="$t('components.admin.equipment.equipmentModal.inputSerialNumberPlaceholder')"
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
            {{ $t("components.admin.equipment.equipmentModal.addEquipmentButton") }}
            </ion-button>
          </ion-footer>
        </div>
      </div>
    </ion-page>
  </ion-modal>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import {
  IonPage,
  IonContent,
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
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { Equipment as useEquipment } from "@/stores/adminEquipment";

const EquipmentStore = useEquipment();
const { equipmentList } = storeToRefs(EquipmentStore);

const state = reactive({
  name: "",
  manufacturerId: "",
  serialNumber: "",
  assetTypeId: "",
  modalOpen: false,
});
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
