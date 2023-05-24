<template>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">NUC7iDNKE</h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group" >
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
            <ion-label color="light">Manufacturer</ion-label>
            <ion-input label="Manufacturer" color="light"></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
            <ion-label color="light" >Model</ion-label>
            <ion-input color="light" label="Model"></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
            <ion-label color="light">Serial number</ion-label>
            <ion-input color="light" label="Serial number"></ion-input>
        </ion-col>
        <ion-col size-xs="12" class="form-admin--group_field">
          
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <DocumentField />
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <DocumentField />
        </ion-col>
        <ion-col size-xs="12" class="form-admin--group_field">
          <EquimentDocumentModal />
        </ion-col>
        <ion-col size-xs="12" >
          <ion-button 
          class="font-size-xs text-lowercase save-button ">
            Save Changes
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
</template>
  
<script setup lang="ts">
  import {
    IonLabel,
    IonInput,
    IonRow,
    IonCol,
    IonButton,
    IonGrid
  } from "@ionic/vue";
  import DocumentField from '@/components/admin/DocumentField.vue'
  import EquimentDocumentModal from '@/components/admin/equipment/EquimentDocumentModal.vue'

</script>
  
<style scoped>
.save-button {
  margin-top: 5%;
}
.new-document-button {
  color: var(--av-light-gray);
}
ion-button {
  width: 246px
}
</style>
  