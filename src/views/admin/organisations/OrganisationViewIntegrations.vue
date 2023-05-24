<template>
  <h1 class="title-admin font-bold font-size-lg color-light-gray">Ubiquisense</h1>
  <ion-grid class="form-admin">
    <ion-row class="form-admin--group" >
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">
          Client ID
        </ion-label>
        <ion-input
          class="font-size-sm"
          type="password"
          :value="integration.integration.value.clientId"
          @ion-input="integration.integration.value.clientId = String($event.target.value)">
        </ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">
          Client Secret
        </ion-label>
        <ion-input
          class="font-size-sm"
          type="password"
          :value="integration.integration.value.clientSecret"
          @ion-input="integration.integration.value.clientSecret = String($event.target.value)">
        </ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">
          Select organisation
        </ion-label>
        <AdminSelect v-model="selectedOrg" :options="organisations.formattedOrgSelect.value"/>
      </ion-col>
    </ion-row> 
  </ion-grid>
  <ion-button class="font-size-xs text-lowercase" @click="SaveEdit">
    Save Changes
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
  IonSelect, 
  IonSelectOption,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { Integrations } from "@/stores/adminIntegrations";
import { Organisations } from "@/stores/adminOrganisations";

import AdminSelect from '@/components/admin/AdminSelect.vue'
import { SelectItem, Integration } from "@/types";

const store = Integrations()
const orgStore = Organisations()
const integration = storeToRefs(store)
const organisations = storeToRefs(orgStore)
const selectedOrg = ref({} as SelectItem)

const SaveEdit = () =>{
  const newEdit: Integration = {
    clientId: integration.integration.value.clientId,
    clientSecret: integration.integration.value.clientSecret,
    selectedOrgnisation: String(selectedOrg.value.aditionalInfo)
  }
  store.editIntegration(newEdit)
}

onBeforeMount(() =>{
  store.getSingleIntegration()
  orgStore.getOrgsSelectItem()
})
</script>
  
<style scoped>
h1{
  margin-bottom: 38px;
}
</style>
  