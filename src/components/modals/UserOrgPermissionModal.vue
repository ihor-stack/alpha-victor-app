<template>
  <ion-modal :is-open="isOpen" @didDismiss="handleDismiss">
    <common-modal :title="name" :handleDismiss="() => handleDismiss()">
      <ion-content>
        <ion-row>
          <ion-col size="12" class="form-admin--group_field">
            <ion-label class="font-size-sm">{{ organisationName }}</ion-label>
            <ion-select placeholder="Select role" v-model="state.groupId">
              <ion-select-option
                v-for="option in userGroups"
                :key="option.id"
                :value="option.id"
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
          :disabled="!state.groupId"
          @click="handleClickSave(state.groupId)"
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
  "organisationName",
  "currentUserGroup",
  "userGroups",
  "handleClickSave",
  "handleDismiss",
]);

const state = reactive({
  groupId: props.currentUserGroup,
});
</script>

<style scoped>
.form-admin--group_field {
  padding-right: 0;
}
ion-modal {
  --width: 490px;
  --height: 300px;
}

ion-modal::part(content) {
  --border-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
</style>
