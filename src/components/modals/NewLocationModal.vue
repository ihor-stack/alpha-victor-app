<template>
  <div>
    <span class="text-button font-mono font-size-xs" @click="modalOpen = true"
      >{{$t('components.modals.newLocationModal.addNewLocationSpan')}}</span
    >
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
                  {{$t('components.modals.newLocationModal.addNewLocationHeader')}}
                </h1>
                <p class="modal-panel__comment color-light-gray font-size-sm">
                  {{$t('components.modals.newLocationModal.addNewLocationParagraph')}}
                </p>
              </div>
            </ion-header>
            <div class="form-admin--group_field">
              <div class="modal-panel__section modal-panel__select-equipment">
                <ion-row class="form-admin--group">
                  <ion-col
                    size-xs="12"
                    size-sm="6"
                    class="form-admin--group_field"
                  >
                    <ion-label text-wrap="true">{{ $t('components.modals.newLocationModal.locationNameLabel') }}</ion-label>
                    <ion-input
                      class="font-size-sm"
                      :placeholder="$t('components.modals.newLocationModal.headquartersInputPlaceholder')"
                      :value="newLocationDetails.name"
                      v-model="newLocationDetails.name"
                    ></ion-input>
                  </ion-col>
 
                  <ion-col
                    size-xs="12"
                    size-sm="6"
                    class="form-admin--group_field"
                  >
                    <ion-label text-wrap="true">{{ $t('components.modals.newLocationModal.locationPrefixLabel') }}</ion-label>
                    <ion-input
                      class="font-size-sm"
                      :placeholder="$t('components.modals.newLocationModal.newLocationInputPlaceholder')"
                      :value="organisationDetails.prefix"
                      @ion-input="
                        newLocationDetails.prefix = String($event.target.value)
                      "
                    ></ion-input>
                  </ion-col>
                </ion-row>
              </div>
            </div>
            <ion-footer>
              <ion-button
                class="font-size-sm"
                expand="block"
                @click="saveNewLocation()"
              >
                {{$t('components.modals.newLocationModal.addNewLocationSpan')}}
              </ion-button>
            </ion-footer>
          </div>
        </div>
      </ion-page>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
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
import { Organisations } from "@/stores/adminOrganisations";
import { useRoute } from "vue-router";
import toastService from "@/services/toastService";

const route = useRoute();

const organisationId = route.params.id as string;

const Location = Locations();
const organisation = Organisations();
const { organisationDetails } = storeToRefs(organisation);
const { newLocationDetails } = storeToRefs(Location);

const modalOpen = ref(false);

const handleDismiss = () => {
  modalOpen.value = false;
};

const saveNewLocation = () => {
  let isValid = true;

  if (!newLocationDetails.value.prefix || newLocationDetails.value.prefix.length < 3) {
    toastService.show(
      "Error",
      "Location prefix must have at least 3 characters",
      "error",
      "bottom"
    );
    isValid = false;
  }

  if (isValid) {
    Location.saveLocation(organisationId);
    modalOpen.value = false;
  }
};

onBeforeMount(() => {
  organisation.getOrgDetails(organisationId);
});
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
