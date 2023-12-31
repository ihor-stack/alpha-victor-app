<template>
  <ion-modal :is-open="isOpen" @didDismiss="handleDismiss" class="auto-height">
    <common-modal :title="name" :handleDismiss="() => handleDismiss()">
      <div>
        <ion-row>
          <ion-col size="12">
            <ion-label text-wrap="true">{{
              $t(
                "components.modals.userManagementModal.assignedOrganisationLabel"
              )
            }}</ion-label>
            <ion-item
              class="orgItemWrapper"
              v-for="org in assignedOrganisations"
              :key="org.id"
              button
              @click="handleClickAssignedOrg(org)"
            >
              <ion-label text-wrap="true">
                {{ org.name }}
                <span class="color-dark-gray">{{
                  ` / ${org.permissions
                    .map((permission) => permission.name)
                    .join(", ")}`
                }}</span>
              </ion-label>
              <ion-button
                @click="removeUserFromOrg($event, org.id)"
                class="color-red removeButton"
                slot="end"
                fill="clear"
                size="small"
              >
                {{ $t("components.modals.userManagementModal.removeButton") }}
              </ion-button>
            </ion-item>
          </ion-col>
        </ion-row>
        <div class="divider">
          <div></div>
          <span>{{
            $t("components.modals.userManagementModal.dividerSpan")
          }}</span>
        </div>
        <ion-row>
          <ion-col size="12" class="form-admin--group_field">
            <AdminSelect
              label="Add to an organisation"
              v-model="selectedOrganisation"
              :options="organisationOptions"
              :isSearchable="true"
              idPrefix="organisation-select"
              placeholder="Select organisation"
            />
          </ion-col>
        </ion-row>
      </div>
      <ion-footer>
        <ion-button
          class="ion-text-capitalize"
          expand="block"
          :disabled="!state.organisationId"
          @click="handleClickSave(state.organisationId)"
        >
          {{ $t("components.modals.userManagementModal.saveAndCloseButton") }}
        </ion-button>
      </ion-footer>
    </common-modal>
  </ion-modal>
</template>
<script setup lang="ts">
import { reactive, computed } from "vue";
import {
  IonModal,
  IonButton,
  IonFooter,
  IonRow,
  IonCol,
  IonLabel,
} from "@ionic/vue";
import CommonModal from "@/components/modals/CommonModal.vue";
import AdminSelect from "@/components/admin/AdminSelect.vue";
import { AdminOrganisation } from "@/types/index";

const props = defineProps([
  "isOpen",
  "name",
  "assignedOrganisations",
  "organisations",
  "handleClickSave",
  "removeUserFromOrg",
  "handleDismiss",
  "handleClickAssignedOrg",
]);

const state = reactive({
  organisationId: "",
});

const organisationOptions = computed(() => {
  return props.organisations.map(
    (organisation: AdminOrganisation, index: number) => {
      return {
        id: index,
        title: organisation.name,
        additionalInfo: organisation.organisationId,
      };
    }
  );
});

const selectedOrganisation = computed({
  get() {
    return organisationOptions.value.find(
      (organisation: any) =>
        state.organisationId === organisation.additionalInfo
    );
  },
  set(newValue) {
    if (newValue) {
      state.organisationId = newValue.additionalInfo;
    }
  },
});

// Reset the selected organisation and organisationId
const resetSelectedOrganisation = () => {
  state.organisationId = "";
  selectedOrganisation.value = null;
};

const handleClickSave = (organisationId: string) => {
  props.handleClickSave(organisationId);

  // Reset the selected organisation
  resetSelectedOrganisation();
};
</script>

<style scoped>
ion-item {
  border: 1px solid #313131;
  border-radius: 5px;
  --background: transparent;
  margin-top: 10px;
  font-size: 14px;
}
ion-button.removeButton::part(native) {
  padding: 0 !important;
}
.divider {
  position: relative;
  padding: 32px 0;
}
.divider div {
  border: 1px solid #313131;
}
.divider span {
  background: #121212;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
}

.form-admin--group_field {
  padding-right: 0;
  margin: 0 !important;
}

ion-modal::part(content) {
  --border-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
</style>
