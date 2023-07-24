<template>
  <ion-button
    class="button-wide button-outline"
    fill="outline"
    color="--av-light-gray"
    @click="modalOpen = true"
  >
    Add new floor +
  </ion-button>
  <ion-modal
    :is-open="modalOpen"
    @willDismiss="handleDismiss"
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
                Add new floor
              </h1>
              <p class="modal-panel__comment color-light-gray font-size-sm">
                You can create a new floor via the form below.
              </p>
            </div>
          </ion-header>
          <ion-content class="form-admin--group_field">
            <div class="modal-panel__section modal-panel__select-equipment">
              <ion-row class="form-admin--group">
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-input
                    class="font-size-sm"
                    placeholder="Floor Name"
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
                    placeholder="Floor Short Name"
                    :value="newFloorDetails.shortName"
                    @ion-input="
                      newFloorDetails.shortName = String($event.target.value)
                    "
                  ></ion-input>
                </ion-col>
              </ion-row>
            </div>
          </ion-content>
          <ion-footer>
            <ion-button
              class="button-wide"
              expand="block"
              @click="saveNewFloor()"
            >
              Add new floor +
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
  Floor.saveFloor(organisationId, locationId);
  modalOpen.value = false;
};
</script>

<style scoped>
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}
</style>
