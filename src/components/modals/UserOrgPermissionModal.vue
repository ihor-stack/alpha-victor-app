<template>
  <ion-modal :is-open="isOpen" @didDismiss="handleDismiss" class="auto-height">
    <common-modal :title="name" :handleDismiss="() => handleDismiss()">
      <ion-content>
        <ion-row>
          <ion-col size="12" class="form-admin--group_field">
            <AdminSelect
              :label="organisationName"
              v-model="selectedUserGroup"
              :options="userGroupOptions"
              :isSearchable="true"
              idPrefix="user-group-select"
              placeholder="Select role"
            />
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
<script setup lang="ts">
import { computed, reactive } from "vue";
import {
  IonModal,
  IonContent,
  IonButton,
  IonFooter,
  IonRow,
  IonCol,
} from "@ionic/vue";
import CommonModal from "@/components/modals/CommonModal.vue";
import AdminSelect from "@/components/admin/AdminSelect.vue";

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

const userGroupOptions = computed(() => {
  return props.userGroups.map((userGroup: any, index: number) => {
    return {
      id: index,
      title: userGroup.name,
      additionalInfo: userGroup.id
    }
  })
})

const selectedUserGroup = computed({
  get() {
    return userGroupOptions.value.find(
      (userGroup: any) => state.groupId === userGroup.additionalInfo
    );
  },
  set(newValue) {
    if (newValue) {
      state.groupId = newValue.additionalInfo
    }
  },
})
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
