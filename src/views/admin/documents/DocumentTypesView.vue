<template>
    <h1 class="font-bold font-size-lg color-light-gray">Document Types</h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group" >
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-input
            class="font-size-sm"
            color="light"
            placeholder="Enter new Document Type"
            :value="newDocument"
            @ionInput="newDocument = $event.target.value;">
          </ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" >
          <ion-button 
          @click="AddDocument()" 
          class="font-size-sm text-lowercase"
          :disabled="newDocument ? false : true"  >
            Add new +
          </ion-button>
        </ion-col>
      </ion-row> 
    </ion-grid>
    <ion-grid >
      <ion-row class="form-admin--group" >
        <ion-col size-xs="12"  class="form-admin--group_field">
          <DocumentField />
        </ion-col>
      </ion-row> 
    </ion-grid>
  </template>
  
  <script setup lang="ts">
  
import {
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonInput
  } from "@ionic/vue";
  import DocumentField from '@/components/admin/DocumentField.vue'
  import { ref } from "vue";
  import {adminDocuments} from '@/stores/adminStore'

  const store = adminDocuments()

  const newDocument = ref()

  const AddDocument = () => {
    store.add({id: store.documentsArray.length + 1, title: newDocument.value, dateUploaded: new Date().toDateString()})
    newDocument.value = null
  };

  </script>
  
  <style scoped>
  ion-button {
    margin-bottom: 5%;
    width: 246px;
    height: 45px
  }
  </style>
  