<template>
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
              @click="handleDismiss"
            />
            <div class="modal-panel__header">
              <h1
                class="modal-panel__title color-light-gray font-bold font-size-lg"
              >
                {{$t('components.admin.spaces.panoramaModal.editHotspotHeader')}}
              </h1>
            </div>
          </ion-header>
          <div class="form-admin--group_field">
            <ion-row>
              <ion-col size="12" class="form-admin--group_field">
                <AdminSelect
                  label="Select device"
                  v-model="selectedDevice"
                  :options="deviceOptions"
                  :isSearchable="true"
                  idPrefix="device-select"
                  placeholder="Select"
                />
              </ion-col>
            </ion-row>
            <ion-row v-if="!state.deviceId">
              <ion-col class="position-relative">
                <hr class="form-admin--divider" />
                <div class="or-text">{{$t('components.admin.spaces.panoramaModal.orDiv')}}</div>
              </ion-col>
            </ion-row>
            <ion-row v-if="!state.deviceId">
              <ion-col size="12" class="form-admin--group_field">
                <ion-label>{{$t('components.admin.spaces.panoramaModal.addLabelLabel')}}</ion-label>
                <ion-input
                  :placeholder="$t('components.admin.spaces.panoramaModal.hotspotLabelPlaceholder')"
                  v-model="state.text"
                ></ion-input>
              </ion-col>
            </ion-row>
          </div>
          <ion-footer>
            <ion-row>
              <ion-col>
                <ion-button
                  class="font-size-sm"
                  expand="block"
                  :disabled="!state.deviceId && !state.text"
                  @click="save"
                >
                {{$t('components.admin.spaces.panoramaModal.saveChangeButton')}}
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button
                  class="font-size-sm button-red"
                  fill="clear"
                  expand="block"
                  @click="deleteHotspot"
                >
                {{$t('components.admin.spaces.panoramaModal.orDeleteHotspotButton')}}
                </ion-button>
              </ion-col>
            </ion-row>
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
  IonRow,
  IonCol,
  IonInput,
  IonModal,
  IonIcon,
  IonLabel,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import { Spaces } from "@/stores/adminSpaces";
import { Device, SelectItem } from "@/types";
const Space = Spaces();
import AdminSelect from "@/components/admin/AdminSelect.vue";

const props = defineProps([
  "spaceId",
  "devices",
  "modalOpen",
  "selectedHotspot",
  "handleDismiss",
  "deleteHotspotFromViewer",
  "drawHotspot",
]);
const state = reactive({
  deviceId: props.selectedHotspot.deviceId,
  text: props.selectedHotspot.text,
});

const deviceOptions = computed(() => {
  return props.devices.map((device: Device, index: number) => {
    return {
      id: index,
      title: device.name,
      additionalInfo: device.id
    }
  })
})

const selectedDevice = computed({
  get() {
    return deviceOptions.value.find(
      (device: SelectItem) => state.deviceId === device.additionalInfo
    );
  },
  set(newValue) {
    if (newValue) {
      state.deviceId = newValue.additionalInfo
    }
  },
})

const save = () => {
  let hotspotName = state.text

  const selectedDevice: Device = props.devices.find(
    (device: Device) => device.id === state.deviceId
  )

  if (selectedDevice) {
    hotspotName = selectedDevice.name
  }

  Space.updateHotspot(props.spaceId, props.selectedHotspot.hotspotId, {
    ...props.selectedHotspot,
    deviceId: state.deviceId,
    text: hotspotName,
  }).then(() => {
    props.deleteHotspotFromViewer(props.selectedHotspot.hotspotId);
    const updatedHotspot = {
      ...props.selectedHotspot,
      text: hotspotName,
      deviceId: state.deviceId,
    };
    props.drawHotspot(updatedHotspot);
    props.handleDismiss();
  });
};

const deleteHotspot = () => {
  Space.deleteHotspot(props.spaceId, props.selectedHotspot.hotspotId).then(
    () => {
      props.deleteHotspotFromViewer(props.selectedHotspot.hotspotId);
      props.handleDismiss();
    }
  );
};
</script>

<style scoped>
ion-chip {
  float: right;
}
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}
.modal-panel {
  height: 60%;
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

.modal-panel__description {
  margin-bottom: 12px;
}

.modal-panel__section {
  margin-bottom: 20px;
}

.or-text {
  padding: 12px;
  background: #181818;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
}
</style>
