<template>
  <ion-button
    class="button-wide button-red button-outline"
    color="red"
    @click="modalOpen = true"
  >
    {{$t('components.modals.deleteFloorModal.deleteFloorButton')}}
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
              color="light"
              :icon="close"
              size="small"
              class="close-button"
              @click="modalOpen = false"
            />
            <div class="modal-panel__header">
              <h1
                class="modal-panel__title color-light-gray font-bold font-size-lg"
              >
                {{$t('components.modals.deleteFloorModal.deleteFloorHeader')}}
              </h1>
              <p class="modal-panel__comment color-light-gray font-size-sm">
                {{$t('components.modals.deleteFloorModal.deleteFloorParagraph')}}
              </p>
            </div>
          </ion-header>
          <ion-footer>
            <ion-row class="form-admin--group_field">
              <ion-col size-xs="6">
                <ion-button
                  class="button-wide button-red button-outline"
                  fill="outline"
                  color="--av-red"
                  @click="confirmDeleteFloor(props.floorId)"
                >
                  {{$t('components.modals.deleteFloorModal.deleteButton')}}
                </ion-button>
              </ion-col>

              <ion-col size-xs="6">
                <ion-button
                  class="button-wide button-outline"
                  fill="outline"
                  color="--av-light-gray"
                  @click="modalOpen = false"
                >
                {{$t('components.modals.deleteFloorModal.cancelButton')}}
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
import { ref, defineProps } from "vue";
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
import { Floors } from "@/stores/adminFloors";

interface Props {
  floorId: string;
}

const props = defineProps<Props>();

const Floor = Floors();
const modalOpen = ref(false);

const handleDismiss = () => {
  modalOpen.value = false;
};

const confirmDeleteFloor = (id) => {
  Floor.deleteFloor(id);
  modalOpen.value = false;
};
</script>

<style scoped>
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}

.delete-button {
  background-color: var(--av-red);
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 8px;
}
</style>
