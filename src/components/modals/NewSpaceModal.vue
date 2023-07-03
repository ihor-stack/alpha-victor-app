<template>
  <ion-button
    class="button-wide button-outline"
    fill="outline"
    color="--av-light-gray"
    @click="modalOpen = true"
  >
    Add new space +
  </ion-button>
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
                Add new space
              </h1>
              <p class="modal-panel__comment color-light-gray font-size-sm">
                You can create a new space via the form below.
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
                   
                    placeholder="Space Name"
                    :value="newSpaceDetails.spaceName"
                    @ion-input="
                      newSpaceDetails.spaceName = String($event.target.value)
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
                   
                    placeholder="Space Shortcode"
                    :value="newSpaceDetails.shortCode"
                    @ion-input="
                      newSpaceDetails.shortCode = String($event.target.value)
                    "
                  ></ion-input>
                </ion-col>
              </ion-row>
            </div>
          </ion-content>
          <ion-footer>
            <ion-button
              class="font-size-sm text-lowercase"
              expand="block"
              @click="saveNewSpace()"
            >
              Add new space +
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
import { Spaces } from "@/stores/adminSpaces";

const route = useRoute();

const organisationId = route.params.id as string;
const locationId = route.params.locationId as string;
const floorId = route.params.floorId as string;

const Space = Spaces();
const { newSpaceDetails } = storeToRefs(Space);

const modalOpen = ref(false);

const handleDismiss = () => {
  modalOpen.value = false;
};

const saveNewSpace = () => {
  Space.saveSpace(organisationId, locationId, floorId);
  modalOpen.value = false;
};
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}
</style>
