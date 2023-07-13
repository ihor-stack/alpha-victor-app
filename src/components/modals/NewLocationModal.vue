<template>
  <div>
    <span class="text-button font-mono font-size-xs" @click="modalOpen = true"
      >Add new location +</span
    >
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
                :icon="close"
                size="small"
                class="close-button"
                @click="modalOpen = false"
              />
              <div class="modal-panel__header">
                <h1
                  class="modal-panel__title color-light-gray font-bold font-size-normal"
                >
                  Add new location
                </h1>
                <p class="modal-panel__comment color-light-gray font-size-sm">
                  You can create a new location via the form below.
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
                    <ion-label>Location name</ion-label>
                    <ion-input
                      class="font-size-sm"
                      placeholder="e.g. Headquarters"
                      :value="newLocationDetails.name"
                      @input="onNameChange"
                    ></ion-input>
                  </ion-col>
 
                  <ion-col
                    size-xs="12"
                    size-sm="6"
                    class="form-admin--group_field"
                  >
                    <ion-label>Location prefix</ion-label>
                    <ion-input
                      class="font-size-sm"
                      placeholder="e.g. HQ"
                      :value="newLocationDetails.prefix"
                      @ion-input="
                        newLocationDetails.prefix = String($event.target.value)
                      "
                    ></ion-input>
                  </ion-col>
                </ion-row>
              </div>
            </ion-content>
            <ion-footer>
              <ion-button
                class="font-size-sm"
                expand="block"
                @click="saveNewLocation()"
              >
                Add new location +
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
import { storeToRefs } from "pinia";
import { Locations } from "@/stores/adminLocations";
import { useRoute } from "vue-router";
const route = useRoute();

const organisationId = route.params.id as string;

const Location = Locations();
const { newLocationDetails } = storeToRefs(Location);

const modalOpen = ref(false);

const onNameChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const name = input.value;
  newLocationDetails.value.name = name;

  if (name.length > 2) {
    newLocationDetails.value.prefix = (name.slice(0, 2) + name.slice(-2, -1)).toUpperCase();
  }
};

const handleDismiss = () => {
  modalOpen.value = false;
};

const saveNewLocation = () => {
  Location.saveLocation(organisationId);
  modalOpen.value = false;
};
</script>

<style scoped>
.text-button {
  margin-top: 20px;
  display: block;
}
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}
</style>
