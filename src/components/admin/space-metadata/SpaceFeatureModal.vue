<template>
  <div>
    <ion-button class="button-wide" @click="modalOpen = true">
      {{ $t("components.admin.spaceMetadata.spaceFeatureModal.addNewSpaceFeatureButton") }}
    </ion-button>

    <ion-modal
      :is-open="modalOpen"
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
                @click="modalOpen = false"
              />
              <div class="modal-panel__header">
                <h1
                  class="modal-panel__title color-light-gray font-bold font-size-lg"
                >
                {{ $t("components.admin.spaceMetadata.spaceFeatureModal.addNewSpaceFeatureHeader") }}
                </h1>
                <p class="modal-panel__comment color-light-gray font-size-sm">
                  {{ $t('components.admin.spaceMetadata.spaceFeatureModal.createNewSpaceFeatureParagraph') }}
                </p>
              </div>
            </ion-header>
            <div class="form-admin--group_field">
              <div class="modal-panel__section modal-panel__select-equipment">
                <ion-input
                  :placeholder="$t('components.admin.spaceMetadata.spaceFeatureModal.wifiPlaceholder')"
                  :value="newFeature"
                  @input="newFeature = $event.target.value"
                />
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
                @click="saveNewFeature()"
              >
              {{ $t('components.admin.spaceMetadata.spaceFeatureModal.addNewSpaceFeatureButton') }}
              </ion-button>
            </ion-footer>
          </div>
        </div>
      </ion-page>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
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
import { MetaData } from "@/stores/adminMetaData";
import AdminSelect from "@/components/admin/AdminSelect.vue";

const metaDataStore = MetaData();
const modalOpen = ref(false);
const newFeature = ref("");
const props = defineProps(["organisationId"]);

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

const selectedIcon = ref<SelectItem | null>(null);

const handleDismiss = () => {
  modalOpen.value = false;
};

const saveNewFeature = () => {
  metaDataStore.saveSpaceFeature(props.organisationId, newFeature.value, selectedIcon.value?.value || '');
  newFeature.value = "";
  modalOpen.value = false;
  selectedIcon.value = null;
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
