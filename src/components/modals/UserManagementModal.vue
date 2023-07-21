<template>
  <ion-modal :is-open="isOpen" @didDismiss="handleDismiss">
    <common-modal :title="name" :handleDismiss="() => handleDismiss()">
      <ion-content>
        <ion-row>
          <ion-col size="12">
            <ion-label class="mb-2">Assigned Organisations</ion-label>
            <ion-item
              class="orgItemWrapper"
              v-for="org in assignedOrganisations"
              :key="org.id"
            >
              <ion-label>
                {{ org.name }}
                <span class="color-dark-gray">{{
                  ` / ${org.permission}`
                }}</span>
              </ion-label>
              <ion-button
                @click="removeUserFromOrg(org.id)"
                class="color-red removeButton"
                slot="end"
                fill="clear"
                size="small"
                v-if="!hideRemove && !editMode"
              >
                &gt;&gt; remove
              </ion-button>
            </ion-item>
          </ion-col>
        </ion-row>
        <div class="divider">
          <div></div>
          <span>or</span>
        </div>
        <ion-row>
          <ion-col size="12" class="form-admin--group_field">
            <ion-label>Add to organisation</ion-label>
            <ion-select
              interface="action-sheet"
              placeholder="Select organisation"
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
      </ion-content>
      <ion-footer>
        <ion-button
          class="ion-text-capitalize"
          expand="block"
          :disabled="!state.organisationId"
          @click="handleClickSave(state.organisationId)"
        >
          Save and close
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
}
ion-button.removeButton::part(native) {
  padding: 0 !important;
}
.divider {
  position: relative;
  padding: 32px 0;
}
.divider div {
  border: 0.75px solid #ffffff;
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
}
</style>
