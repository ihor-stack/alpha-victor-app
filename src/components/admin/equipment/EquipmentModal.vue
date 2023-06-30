<template>
  <ion-button class="button-wide" @click="state.modalOpen = true">
    Add new equipment +
  </ion-button>
  <ion-modal
    :is-open="state.modalOpen"
    @willDismiss="handleDismiss"
    :initial-breakpoint="0.8"
    :breakpoints="[0, 0.8]"
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
                class="modal-panel__title color-light-gray font-bold font-size-normal"
              >
                Add new equipment
              </h1>
              <p class="modal-panel__comment color-light-gray font-size-sm">
                You can create a new equipment the form below.
              </p>
            </div>
          </ion-header>
          <ion-content :scroll-y="false">
            <ion-grid class="form-admin">
              <ion-row class="form-admin--group">
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label>Manufacturer</ion-label>
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

                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label>Asset type</ion-label>
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
          </ion-content>
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
ion-content::part(background) {
  background: #181818;
}
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
  width: 60%;
  margin-left: 20%;
  border-radius: 40px 40px 40px 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
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
  background-color: #181818;
}

.modal-panel-container {
  position: relative;
  height: 100%;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 45px 32px 32px;
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
