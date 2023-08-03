<template>
  <ion-button class="button-wide" @click="state.modalOpen = true">
    {{$t('components.admin.equipment.assetTypeModal.button')}}
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
                {{ $t("components.admin.equipment.assetTypeModal.header") }}
              </h1>
              <p class="modal-panel__comment color-light-gray font-size-sm">
                {{ $t("components.admin.equipment.assetTypeModal.paragraph") }}
              </p>
            </div>
          </ion-header>
          <div :scroll-y="false" class="form-admin--group_field">
            <div class="modal-panel__section modal-panel__select-equipment">
              <ion-input v-model="state.name" :placeholder="$t('components.admin.equipment.assetTypeModal.cameraPlaceholder')" />
            </div>
            <AdminSelect
              label="Choose an icon"
              v-model="selectedIcon"
              :options="iconList"
              :isSearchable="true"
            />
          </div>
          <ion-footer>
            <ion-button
              class="font-size-sm text-lowercase"
              expand="block"
              :disabled="!state.name"
              @click="handleAddAssetType"
            >
            {{ $t("components.admin.equipment.assetTypeModal.button") }}
            </ion-button>
          </ion-footer>
        </div>
      </div>
    </ion-page>
  </ion-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonFooter,
  IonButton,
  IonInput,
  IonModal,
  IonIcon,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import { Equipment as useEquipment } from "@/stores/adminEquipment";
import AdminSelect from "@/components/admin/AdminSelect.vue";

const EquipmentStore = useEquipment();

const state = reactive({
  name: "",
  modalOpen: false,
});

const iconList = [
  { value: "icon_360", title: "360" },
  { value: "icon_blinds", title: "Blinds" },
  { value: "icon_bluetooth", title: "Bluetooth" },
  { value: "icon_book", title: "Book" },
  { value: "icon_controlpanel", title: "Control Panel" },
  { value: "icon_divisiblespace", title: "Divisible Space" },
  { value: "icon_email", title: "Email" },
  { value: "icon_fooddrink", title: "Food & Drink" },
  { value: "icon_hdmi", title: "HDMI" },
  { value: "icon_interactivewhiteboard", title: "Interactive Whiteboard" },
  { value: "icon_lighting", title: "Lighting" },
  { value: "icon_microphone", title: "Microphone" },
  { value: "icon_minipc", title: "Mini PC" },
  { value: "icon_naturallight", title: "Natural Light" },
  { value: "icon_phone", title: "Phone" },
  { value: "icon_camera", title: "Camera" },
  { value: "icon_bolt", title: "Bolt" },
  { value: "icon_projector", title: "Projector" },
  { value: "icon_qrcode", title: "QR Code" },
  { value: "icon_speakers", title: "Speakers" },
  { value: "icon_temperature", title: "Temperature" },
  { value: "icon_tv", title: "TV" },
  { value: "icon_lock", title: "Lock" },
  { value: "icon_usbc", title: "USB-C" },
  { value: "icon_videocamera", title: "Video Camera" },
  { value: "icon_whiteboard", title: "Whiteboard" },
  { value: "icon_wifi", title: "WiFi" }
];

const handleDismiss = () => {
  state.modalOpen = false;
};

const selectedIcon = ref<SelectItem | null>(null);

const handleAddAssetType = () => {
  EquipmentStore.addAssetType(state.name, selectedIcon.value?.value || '').then(() => {
    state.modalOpen = false;
    state.name = "";
    selectedIcon.value = null;
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
  border-radius: 40px 40px 40px 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
