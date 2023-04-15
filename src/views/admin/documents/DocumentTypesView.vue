<template>
    <h1 class="font-bold font-size-lg color-light-gray">Document Types Test</h1>
    <ion-grid>
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
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-button @click="AddDocument()">Add new +</ion-button>
        </ion-col>
        <ion-col>
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
    IonLabel,
    IonItem,
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
  </style>
  