<template>
  <div>
    <ion-button class="button-wide" @click="modalOpen = true">
      Create new organisation +
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
                  Add new organisation
                </h1>
                <p class="modal-panel__comment color-light-gray font-size-sm">
                  You can create a new organisation via the form below.
                </p>
              </div>
            </ion-header>
            <ion-content class="form-admin--group_field">
              <div class="modal-panel__section modal-panel__select-equipment">
                <ion-row class="form-admin--group">
                  <ion-col
                    size-xs="12"
                    size-sm="12"
                    class="form-admin--group_field"
                  >
                    <ion-input
                      class="font-size-sm"
                      placeholder="Organisation Name"
                      :value="newOrganisationDetails.name"
                      @ion-input="
                        newOrganisationDetails.name = String(
                          $event.target.value
                        )
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
                @click="saveNewOrganisation()"
              >
                Add new organisation +
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
import { Organisations } from "@/stores/adminOrganisations";

const organisation = Organisations();
const { newOrganisationDetails } = storeToRefs(organisation);

const modalOpen = ref(false);

const handleDismiss = () => {
  modalOpen.value = false;
};

const saveNewOrganisation = () => {
  organisation.saveOrganisation();
  modalOpen.value = false;
};
</script>

<style scoped>
.button-wide {
  margin-top: 30px;
}

.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}
</style>
