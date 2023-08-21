<template>
  <div>
    <ion-button
      class="button-wide button-outline"
      fill="outline"
      color="--av-light-gray"
      @click="modalOpen = true"
    > 
    {{$t('components.modals.newSpaceModal.addNewSpaceButton')}}
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
                {{$t('components.modals.newSpaceModal.addNewSpaceHeader')}}
                </h1>
                <p class="modal-panel__comment color-light-gray font-size-sm">
                  {{$t('components.modals.newSpaceModal.createNewSpaceParagraph')}}
                </p>
              </div>
            </ion-header>
            <div class="modal-panel__section modal-panel__select-equipment">
              <ion-row class="form-admin--group">
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label text-wrap="true">{{ $t('components.modals.newSpaceModal.spaceNameLabel') }}</ion-label>
                  <ion-input
                    class="font-size-sm"
                    :placeholder="$t('components.modals.newSpaceModal.spaceNamePlaceholder')"
                    v-model="newSpaceDetails.spaceName"
                  ></ion-input>
                </ion-col>

                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label text-wrap="true">{{ $t("components.modals.newSpaceModal.spaceShortcodeLabel") }}</ion-label>
                  <ion-input
                    class="font-size-sm"
                    @ionBlur="transformToUpper"
                    @keyup.enter="transformToUpper"
                    :placeholder="$t('components.modals.newSpaceModal.spaceShortcodePlaceholder')"
                    v-model="localShortCode"
                  ></ion-input>
                </ion-col>
              </ion-row>
            </div>
            <ion-footer>
              <ion-button
                class="font-size-sm text-lowercase"
                expand="block"
                @click="saveNewSpace()"
              >
                {{ $t('components.modals.newSpaceModal.addNewSpaceButton') }}
              </ion-button>
            </ion-footer>
          </div>
        </div>
      </ion-page>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import {
  IonPage,
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
import { Locations } from "@/stores/adminLocations";
import { Spaces } from "@/stores/adminSpaces";

const localShortCode = ref(""); // Create a local state for shortname

const route = useRoute();

const organisationId = route.params.id as string;
const locationId = route.params.locationId as string;
const floorId = route.params.floorId as string;

const Location = Locations();
const { location } = storeToRefs(Location);

const Space = Spaces();
const { newSpaceDetails } = storeToRefs(Space);

const modalOpen = ref(false);

const transformToUpper = () => {
  localShortCode.value = localShortCode.value.toUpperCase();
  newSpaceDetails.value.shortCode = localShortCode.value; // update the global state
};

const generateShortcode = () => {
  const randomNum = Math.floor(Math.random() * 900) + 100;
  newSpaceDetails.value.shortCode = `${location.value.prefix}${randomNum}`;
};

const handleDismiss = () => {
  modalOpen.value = false;
};

const saveNewSpace = () => {
  Space.saveSpace(organisationId, locationId, floorId);
  
  // Reset local state
  localShortCode.value = "";

  // Reset global state
  newSpaceDetails.value.spaceName = "";
  newSpaceDetails.value.shortCode = "";

  modalOpen.value = false;
};

watch(modalOpen, (newValue) => {
  if (newValue) {
    generateShortcode();
  }
});

// Watch the global state for changes and update the local state
watch(() => newSpaceDetails.value.shortCode, (newVal) => {
  localShortCode.value = newVal;
});

onBeforeMount(() => {
  Location.getLocation(locationId);
});
</script>

<style scoped>
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}
</style>
