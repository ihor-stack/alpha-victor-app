<template>
  <ion-modal
    :is-open="modalOpen"
    @willDismiss="handleDismiss"
    :initial-breakpoint="0.8"
    :breakpoints="[0, 0.8]"
  >
    <ion-page>
      <div class="modal-panel">
        <div class="modal-panel-container">
          <ion-header>
            <ion-icon
              color="light"
              :icon="close"
              size="small"
              class="close-button"
              @click="handleDismiss"
            />
            <div class="modal-panel__header">
              <h1
                class="modal-panel__title color-light-gray font-bold font-size-lg"
              >
                Edit hotspot
              </h1>
            </div>
            <div class="modal-panel__description">
              Here you can edit the hotspot information using the form below.
            </div>
          </ion-header>
          <ion-content :scroll-y="false" class="form-admin--group_field">
            <ion-row>
              <ion-col size="12" class="form-admin--group_field">
                <ion-label color="light">Select device</ion-label>
                <ion-select
                  interface="action-sheet"
                  placeholder="Select"
                  v-model="state.deviceId"
                >
                  <ion-select-option
                    v-for="option in devices"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.name }}
                  </ion-select-option>
                </ion-select>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="position-relative">
                <hr class="form-admin--divider" />
                <div class="or-text">or</div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="12" class="form-admin--group_field">
                <ion-label color="light">Add label</ion-label>
                <ion-input
                  color="light"
                  placeholder="Hotspot label"
                  v-model="state.text"
                ></ion-input>
              </ion-col>
            </ion-row>
          </ion-content>
          <ion-footer>
            <ion-row>
              <ion-col>
                <ion-button
                  class="font-size-sm"
                  expand="block"
                  :disabled="!state.deviceId && !state.text"
                  @click="save"
                >
                  Save change
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button
                  class="font-size-sm button-red"
                  fill="clear"
                  expand="block"
                  @click="deleteHotspot"
                >
                  or delete hotspot
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
import { reactive } from "vue";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonFooter,
  IonButton,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonModal,
  IonIcon,
  IonLabel,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import { Spaces } from "@/stores/adminSpaces";
const Space = Spaces();

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

const save = () => {
  Space.updateHotspot(props.spaceId, props.selectedHotspot.hotspotId, {
    ...props.selectedHotspot,
    deviceId: state.deviceId,
    text: state.text,
  }).then(() => {
    props.deleteHotspotFromViewer(props.selectedHotspot.hotspotId);
    const updatedHotspot = {
      ...props.selectedHotspot,
      text: state.text,
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
ion-content::part(background) {
  background: #181818;
}
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
  background-color: #181818;
}

.modal-panel-container {
  position: relative;
  height: 100%;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 45px 22px 32px;
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
