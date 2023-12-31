<template>
  <div>
    <ion-button class="button-wide" @click="modalOpen = true">
      {{ $t('components.modals.newOrganisationModal.createNewOrganisationButton') }}
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
                  {{ $t('components.modals.newOrganisationModal.addNewOrganisationHeader') }}
                </h1>
                <p class="modal-panel__comment color-light-gray font-size-sm">
                  {{ $t('components.modals.newOrganisationModal.createNewOrganisationParagraph') }}
                </p>
              </div>
            </ion-header>
            <div class="form-admin--group_field">
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
                    :value="newOrganisationName"
                    @ion-input="handleUpdateOrganisationName($event)"
                  ></ion-input>
                  </ion-col>
                </ion-row>
              </div>
            </div>
            <ion-footer>
              <ion-button
                class="font-size-sm text-lowercase"
                expand="block"
                @click="saveNewOrganisation()"
              >
                {{ $t('components.modals.newOrganisationModal.addNewOrganisationButton') }}
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
const newOrganisationName = ref(""); // we will store the input value here

const handleDismiss = () => {
  modalOpen.value = false;
};

const handleUpdateOrganisationName = (event: Event) => {
  const target = event.target as HTMLInputElement;
  newOrganisationName.value = target.value;
};

const saveNewOrganisation = () => {
  if (newOrganisationName.value && newOrganisationName.value.length > 2) {
    const prefix = `${newOrganisationName.value[0]}${newOrganisationName.value[1]}${newOrganisationName.value.slice(-1)}`.toUpperCase();
    newOrganisationDetails.value.prefix = prefix;
    newOrganisationDetails.value.name = newOrganisationName.value;
    organisation.saveOrganisation();
    modalOpen.value = false;
  }
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
