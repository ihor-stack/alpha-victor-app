<template>
  <h1 class="title-admin font-bold font-size-lg color-light-gray">
    {{ $t("pages.admin.organisations.view.integrations.header") }}
  </h1>
  <ion-grid class="form-admin">
    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label text-wrap="true">
          {{ $t("pages.admin.organisations.view.integrations.clientId") }}
        </ion-label>
        <ion-input
          class="font-size-sm"
          type="password"
          :value="integration.integration.value.clientId"
          @ion-input="
            integration.integration.value.clientId = String(
              $event.target.value
            );
            confirmToLeaveService.setEditing(true);
          "
        >
        </ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label text-wrap="true">
          {{ $t("pages.admin.organisations.view.integrations.clientSecret") }}
        </ion-label>
        <ion-input
          class="font-size-sm"
          type="password"
          :value="integration.integration.value.clientSecret"
          @ion-input="
            integration.integration.value.clientSecret = String(
              $event.target.value
            );
            confirmToLeaveService.setEditing(true);
          "
        >
        </ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label text-wrap="true">{{
          $t("pages.admin.integrations.selectOrganisation")
        }}</ion-label>
        <AdminSelect
          v-model="integration.integration.value.ubiqisenseOrganisationId"
          :options="ubiqisenseOptions"
          valueKey="ubiqisenseOrganisationId"
        />
      </ion-col>
    </ion-row>
  </ion-grid>
  <ion-button class="button-wide" @click="SaveEdit">
    {{ $t("pages.admin.organisations.view.integrations.saveBtn") }}
  </ion-button>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import { onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";
import { Integrations } from "@/stores/adminIntegrations";
import { Organisations } from "@/stores/adminOrganisations";
import AdminSelect from "@/components/admin/AdminSelect.vue";

import { Integration } from "@/types";
import confirmToLeaveService from "@/services/confirmToLeaveService";

const store = Integrations();
const orgStore = Organisations();
const integration = storeToRefs(store);

const route = useRoute();

const orgId = String(route.params.id);
const integrationId = String(route.params.integrationId);

const SaveEdit = () => {
  const newEdit: Integration = {
    clientId: integration.integration.value.clientId,
    clientSecret: integration.integration.value.clientSecret,
    selectedOrgnisation: orgId,
    ubiqisenseOrganisationId:
      integration.integration.value.ubiqisenseOrganisationId,
  };
  store.editIntegration(integrationId, newEdit);
};

const ubiqisenseOptions = computed(() => {
  return integration.ubiqisenses.value?.map((option, index) => ({
    id: index,
    title: option.name,
    ubiqisenseOrganisationId: option.id,
  }));
});

onBeforeMount(() => {
  store.getSingleIntegration(orgId, integrationId);
  store.getUbiqisenses(orgId);
  orgStore.getOrgsSelectItem();
});
</script>

<style scoped>
h1 {
  margin-bottom: 38px;
}
</style>
