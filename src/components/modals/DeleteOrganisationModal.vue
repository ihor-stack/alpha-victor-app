<template>
  <div>
    <ion-button
      class="delete-button font-size-sm"
      color="red"
      @click="modalOpen = true"
    >
      {{$t('components.modals.deleteOrganisationModal.deleteOrganisationButton')}}
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
                {{$t('components.modals.deleteOrganisationModal.deleteOrganisationHeader')}}
                </h1>
                <p class="modal-panel__comment color-light-gray font-size-sm">
                  {{$t('components.modals.deleteOrganisationModal.deleteOrganisationParagraph')}}
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
                    @click="confirmDeleteOrganisation()"
                  >
                    {{$t('components.modals.deleteFloorModal.deleteButton')}}
                  </ion-button>
                </ion-col>

                <ion-col size-xs="12" size-sm="6">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonFooter,
  IonButton,
  IonModal,
  IonIcon,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import { Organisations } from "@/stores/adminOrganisations";

const organisation = Organisations();
const modalOpen = ref(false);
const props = defineProps(["organisationId"]);

const handleDismiss = () => {
  modalOpen.value = false;
};

const confirmDeleteOrganisation = async () => {
  await organisation.deleteOrganisation(props.organisationId);
  await organisation.getOrganisations();
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
