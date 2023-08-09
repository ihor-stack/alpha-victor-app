<template>
  <div>
    <ion-button
      class="button-wide button-outline"
      fill="outline"
      color="--av-light-gray"
      @click="modalOpen = true"
    >
      {{$t('components.modals.newFloorModal.addNewFloorButton')}}
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
                  {{ $t('components.modals.newFloorModal.addNewFloorHeader') }}
                </h1>
                <p class="modal-panel__comment color-light-gray font-size-sm">
                  {{ $t('components.modals.newFloorModal.createNewFloorParagraph') }}
                </p>
              </div>
            </ion-header>
            <div class="form-admin--group">
              <div class="modal-panel__section modal-panel__select-equipment">
                <ion-row class="form-admin--group">
                  <ion-col
                    size-xs="12"
                    size-sm="6"
                    class="form-admin--group_field"
                  >
                    <ion-input
                      class="font-size-sm"
                      :placeholder="$t('components.modals.newFloorModal.floorNameInputPlaceholder')"
                      v-model="newFloorDetails.longName"
                    ></ion-input>
                  </ion-col>

                  <ion-col
                    size-xs="12"
                    size-sm="6"
                    class="form-admin--group_field"
                  >
                    <ion-input
                    class="font-size-sm"
                    @ionBlur="transformToUpper"
                    @keyup.enter="transformToUpper"
                    :placeholder="$t('components.modals.newFloorModal.floorShortNameInputPlaceholder')"
                    v-model="localShortName"
                    ></ion-input>
                  </ion-col>
                </ion-row>
              </div>
            </div>
            <ion-footer>
              <ion-button
                class="button-wide"
                expand="block"
                @click="saveNewFloor()"
              >
                {{ $t('components.modals.newFloorModal.addNewFloorButton') }}
              </ion-button>
            </ion-footer>
          </div>
        </div>
      </ion-page>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
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
import { useRoute } from "vue-router";
import { close } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { Floors } from "@/stores/adminFloors";
import toastService from "@/services/toastService";

const localShortName = ref(""); // Create a local state for shortname

const route = useRoute();
const organisationId = route.params.id as string;
const locationId = route.params.locationId as string;

const Floor = Floors();
const { newFloorDetails } = storeToRefs(Floor);

const modalOpen = ref(false);

const handleDismiss = () => {
  modalOpen.value = false;
};

const transformToUpper = () => {
  localShortName.value = localShortName.value.toUpperCase();
  newFloorDetails.value.shortName = localShortName.value; // update the global state
};

const saveNewFloor = () => {
  Floor.saveFloor(organisationId, locationId);
  
  // Reset local state
  localShortName.value = "";

  // Reset global state
  newFloorDetails.value.longName = "";
  newFloorDetails.value.shortName = "";

  modalOpen.value = false;
};

// Watch the global state for changes and update the local state
watch(() => newFloorDetails.value.shortName, (newVal) => {
  localShortName.value = newVal;
});
</script>

<style scoped>
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}
</style>
