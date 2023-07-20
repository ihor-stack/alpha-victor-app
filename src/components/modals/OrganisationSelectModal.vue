<template>
  <div class="modal-panel">
    <div class="modal-panel-container">
      <ion-header class="ion-no-border">
        <ion-item class="modal-panel__header" lines="none">
          <ion-label>
            <h2 class="modal-panel__title font-bold">Select Organisation</h2>
            <p class="modal-panel__comment color-light-gray font-size-sm">
              Here you can select the organisation that you’d like to see spaces
              in.
            </p>
          </ion-label>
        </ion-item>
      </ion-header>
      <ion-content>
        <div class="modal-panel__section modal-panel__select-equipment">
          <h2 class="font-size-xs font-bold modal-panel__heading">
            Select Organisation
          </h2>

          <ion-select
            interface="action-sheet"
            class="modal-panel__select-organisation__select"
            placeholder="Select organisation"
            :value="state.organisation"
            @ion-change="handleChange"
          >
            <ion-select-option
              v-for="organisation in organisationStore.organisationList"
              :key="organisation.organisationId"
              :value="organisation.organisationId"
            >
              {{ organisation.name }}
            </ion-select-option>
          </ion-select>
        </div>
      </ion-content>
      <ion-footer>
        <ion-button expand="block" @click="handleConfirm">
          Confirm
          {{ state.organisation ? organisationName : "organisation" }}
        </ion-button>
      </ion-footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import {
  IonContent,
  IonHeader,
  IonFooter,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
const organisationStore = useOrganisationStore();

const props = defineProps(["handleDismiss"]);

const state = reactive({
  organisation: organisationStore.getId,
});

const organisationName = computed(
  () =>
    organisationStore.organisationList.find(
      (org) => org.organisationId === state.organisation
    )?.name || ""
);

const handleChange = (event: CustomEvent) => {
  state.organisation = event.detail.value;
};

const handleConfirm = () => {
  organisationStore.setOrganisationId(state.organisation);
  props.handleDismiss();
};
</script>

<style scoped>
.modal-panel {
  height: 40%;
}

.modal-panel__heading {
  margin-bottom: 5px;
}

.modal-panel__select-organisation__select {
  appearance: none;
  background: none;
  border: 0.75px solid #313131;
  border-radius: 8px;
  width: 100%;
  padding: 12px;
  font-size: 12px;
  line-height: 16px;
}

ion-item::part(native) {
  padding-left: 0px;
}
</style>
