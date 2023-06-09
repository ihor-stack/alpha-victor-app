<template>
  <div class="modal-panel">
    <div class="modal-panel-container">
      <ion-header>
        <div class="modal-panel__header">
          <h1
            class="modal-panel__title color-light-gray font-bold font-size-normal"
          >
            Select Organisation
          </h1>
          <p class="modal-panel__comment color-light-gray font-size-sm">
            Here you can select the organisation that you’d like to see spaces
            in.
          </p>
        </div>
      </ion-header>
      <ion-content :scroll-y="false">
        <div class="modal-panel__section modal-panel__select-equipment">
          <h2
            class="color-light-gray font-size-xs font-bold modal-panel__heading"
          >
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
import { reactive, computed, defineProps } from "vue";
import {
  IonContent,
  IonHeader,
  IonFooter,
  IonButton,
  IonSelect,
  IonSelectOption,
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
  organisationStore.setId(state.organisation);
  props.handleDismiss();
};
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}

.modal-panel {
  height: 40%;
  border-radius: 40px 40px 0px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
}

.modal-panel-container {
  position: relative;
  height: 100%;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 45px 32px 32px;
}

.modal-panel__header {
  margin-bottom: 20px;
}

.modal-panel__title {
  margin-bottom: 12px;
}

.modal-panel__section {
  margin-bottom: 20px;
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
  color: var(--av-light-gray);
  font-size: 12px;
  line-height: 16px;
}
</style>
