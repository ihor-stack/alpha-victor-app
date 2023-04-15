<template>
    <h1 class="font-bold font-size-lg color-light-gray">NUC7iDNKE</h1>
    <ion-grid>
      <ion-row>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-item>
            <ion-label color="light" slot="start">Manufacturer</ion-label>
            <ion-input label="Manufacturer" color="light"></ion-input>
          </ion-item> 
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-item>
            <ion-label color="light" slot="start">Model</ion-label>
            <ion-input color="light" label="Model"></ion-input>
          </ion-item> 
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-item>
            <ion-label color="light" slot="start">Serial number</ion-label>
            <ion-input color="light" label="Serial number"></ion-input>
          </ion-item> 
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
          <ion-button>Add New Document+</ion-button>
        </ion-col>
        <ion-col size-xs="12" class="save-button" >
          <ion-button>Save Changes</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
</template>
  
<script setup lang="ts">
  import {
    IonItem,
    IonLabel,
    IonIcon,
    IonInput,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonGrid
  } from "@ionic/vue";
  import { ref } from "vue";
  import DocumentField from '@/components/admin/DocumentField.vue'
  

</script>
  
<style scoped>
  .save-button {
    margin-top: 5%;
  }
 
</style>
  