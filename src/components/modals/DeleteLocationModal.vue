<template>
  <div>
    <ion-button
      class="button-wide button-red button-outline"
      color="red"
      @click="modalOpen = true"
    >
      Delete location
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
                  Delete location
                </h1>
                <p class="modal-panel__comment color-light-gray font-size-sm">
                  Are you sure you wish to delete this location, this action cannot be undone
                </p>
              </div>
            </ion-header>
            <ion-footer>
              <ion-row class="form-admin--group_field">
                <ion-col size-xs="12" size-sm="6">
                  <ion-button
                    class="button-wide button-red button-outline"
                    fill="outline"
                    color="--av-red"
                    @click="confirmDeleteLocation()"
                  >
                    Yes, delete
                  </ion-button>
                </ion-col>

                <ion-col size-xs="12" size-sm="6">
                  <ion-button
                    class="button-wide button-outline"
                    fill="outline"
                    color="--av-light-gray"
                    @click="modalOpen = false"
                  >
                    No, cancel
                  </ion-button>
                </ion-col>
              </ion-row>
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
import { Locations } from "@/stores/adminLocations";

const location = Locations();
const modalOpen = ref(false);
const props = defineProps(["locationId","organisationId"]);

const handleDismiss = () => {
  modalOpen.value = false;
};

const confirmDeleteLocation = () => {
  location.removeLocation(props.organisationId, props.locationId);
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
