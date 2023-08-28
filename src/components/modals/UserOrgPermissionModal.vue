<template>
  <ion-modal :is-open="isOpen" @didDismiss="handleDismiss" class="auto-height">
    <common-modal :title="name" :handleDismiss="() => handleDismiss()">
      <ion-content>
        <ion-row>
          <ion-col size="12" class="form-admin--group_field">
            <AdminSelect
              :label="organisation.name"
              v-model="selectedUserGroup"
              :options="userGroupOptions"
              :isSearchable="true"
              :isMultiple="true"
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
          :disabled="state.groupIds.length < 1"
          @click="handleClickSave(state.groupIds)"
        >
          {{
            $t("components.modals.userOrgPermissionModal.saveAndCloseButton")
          }}
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
  "organisation",
  "currentUserGroups",
  "userGroups",
  "handleClickSave",
  "handleDismiss",
]);

const state = reactive({
  groupIds: props.currentUserGroups,
});

const userGroupOptions = computed(() => {
  return props.userGroups.map((userGroup: any, index: number) => {
    return {
      id: index,
      title: userGroup.name,
      additionalInfo: userGroup.id,
    };
  });
});

const selectedUserGroup = computed({
  get() {
    return userGroupOptions.value.filter((userGroup: any) =>
      state.groupIds.includes(userGroup.additionalInfo)
    );
  },
  set(newValue) {
    console.log(newValue);
    if (newValue) {
      state.groupIds = newValue.map((item: any) => item.additionalInfo);
    }
  },
});
</script>

<style scoped>
.form-admin--group_field {
  padding-right: 0;
}
ion-modal {
  --width: 490px;
  --height: 350px;
}

ion-modal::part(content) {
  --border-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
</style>
