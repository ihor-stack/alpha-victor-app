<template>
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
                    :value="newFloorDetails.longName"
                    @ion-input="
                      newFloorDetails.longName = String($event.target.value)
                    "
                  ></ion-input>
                </ion-col>

                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-input
                    class="font-size-sm"
                    :placeholder="$t('components.modals.newFloorModal.floorShortNameInputPlaceholder')"
                    :value="newFloorDetails.shortName"
                    @ion-input="
                      newFloorDetails.shortName = String($event.target.value)
                    "
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
import { useRoute } from "vue-router";
import { close } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { Floors } from "@/stores/adminFloors";
import toastService from "@/services/toastService";

const route = useRoute();
const organisationId = route.params.id as string;
const locationId = route.params.locationId as string;

const Floor = Floors();
const { newFloorDetails } = storeToRefs(Floor);

const modalOpen = ref(false);

const handleDismiss = () => {
  modalOpen.value = false;
};

const saveNewFloor = () => {
  let isValid = true;

  if (!newFloorDetails.value.shortName || newFloorDetails.value.shortName.length < 3) {
    toastService.show(
      "Error",
      "Floor shortname must have at least 3 characters",
      "error",
      "bottom"
    );
    isValid = false;
  }

  if (isValid) {
    Floor.saveFloor(organisationId, locationId);
    modalOpen.value = false;
  }
};
</script>

<style scoped>
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}
</style>
