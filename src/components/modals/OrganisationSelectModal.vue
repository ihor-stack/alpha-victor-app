<template>
  <div class="modal-panel">
    <div class="modal-panel-container">
      <ion-header class="ion-no-border">
        <ion-item class="modal-panel__header" lines="none">
          <ion-label text-wrap="true">
            <h2 class="font-bold">
              {{
                $t(
                  "components.modals.organisationSelectModal.selectOrganisationHeader"
                )
              }}
            </h2>
            <p class="font-size-sm">
              {{
                $t(
                  "components.modals.organisationSelectModal.selectOrganisationParagraph"
                )
              }}
            </p>
          </ion-label>
        </ion-item>
      </ion-header>
      <ion-content>
        <div class="modal-panel__section modal-panel__select-equipment">
          <h2 class="font-size-xs font-bold modal-panel__heading">
            {{
              $t(
                "components.modals.organisationSelectModal.selectOrganisationHeader"
              )
            }}
          </h2>

          <ion-select
            interface="action-sheet"
            class="modal-panel__select-organisation__select"
            :placeholder="
              $t(
                'components.modals.organisationSelectModal.selectOrganisationPlaceholder'
              )
            "
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
          {{ $t("components.modals.organisationSelectModal.confirmButton") }}
          {{ state.organisation ? organisationName : "organisation" }}
        </ion-button>
      </ion-footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from "vue";
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
import { storeToRefs } from "pinia";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
const organisationStore = useOrganisationStore();

const props = defineProps(["handleDismiss"]);
const { currentOrganisationId } = storeToRefs(organisationStore);

const state = reactive({
  organisation: currentOrganisationId,
});

watch(currentOrganisationId, (newValue) => {
  if (newValue?.length > 0) {
    state.organisation = newValue;
  }
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
  organisationStore.getOrgTheme(state.organisation);
  props.handleDismiss();
};
</script>

<style scoped>
.modal-panel {
  @media only screen and (max-width: 1063px) {
    height: 40%;
  }
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
  font-size: 15px;
  line-height: 16px;
}

ion-item::part(native) {
  padding-left: 0px;
}
</style>
