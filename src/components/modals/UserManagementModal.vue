<template>
  <ion-modal :is-open="isOpen" @didDismiss="handleDismiss" class="auto-height">
    <common-modal :title="name" :handleDismiss="() => handleDismiss()">
      <div>
        <ion-row>
          <ion-col size="12">
            <ion-label class="font-size-sm">{{ $t('components.modals.userManagementModal.assignedOrganisationLabel') }}</ion-label>
            <ion-item
              class="orgItemWrapper"
              v-for="org in assignedOrganisations"
              :key="org.id"
              button
              @click="handleClickAssignedOrg(org)"
            >
              <ion-label>
                {{ org.name }}
                <span class="color-dark-gray">{{
                  ` / ${org.permission?.name}`
                }}</span>
              </ion-label>
              <ion-button
                @click="removeUserFromOrg($event, org.id)"
                class="color-red removeButton"
                slot="end"
                fill="clear"
                size="small"
                v-if="!hideRemove && !editMode"
              >
                {{ $t('components.modals.userManagementModal.removeButton')}}
              </ion-button>
            </ion-item>
          </ion-col>
        </ion-row>
        <div class="divider">
          <div></div>
          <span>{{ $t('components.modals.userManagementModal.dividerSpan')}}</span>
        </div>
        <ion-row>
          <ion-col size="12" class="form-admin--group_field">
            <ion-label class="font-size-sm">{{ $t('components.modals.userManagementModal.addOrganisationLabel')}}</ion-label>
            <ion-select
              interface="action-sheet"
              :placeholder="$t('components.modals.userManagementModal.selectOrganisationPlaceholder')"
              v-model="state.organisationId"
            >
              <ion-select-option
                v-for="option in organisations"
                :key="option.organisationId"
                :value="option.organisationId"
              >
                {{ option.name }}
              </ion-select-option>
            </ion-select>
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
          {{ $t('components.modals.userManagementModal.saveAndCloseButton')}}
        </ion-button>
      </ion-footer>
    </common-modal>
  </ion-modal>
</template>
<script setup>
import { reactive } from "vue";
import {
  IonModal,
  IonContent,
  IonButton,
  IonFooter,
  IonRow,
  IonCol,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import CommonModal from "@/components/modals/CommonModal.vue";

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
