<template>
  <h1 class="font-bold font-size-lg color-light-gray">Document Types</h1>
  <ion-grid >
    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="Enter new Document Type"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-button>Add new +</ion-button>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Current Document Types</ion-label >
          <ion-item>
            <ion-input
            class="font-size-sm"
            color="light"
            placeholder="Document Type"
            value="Document"
            />
            <ion-button color="light" slot="end"  style="align-self: flex-end" >>> remove</ion-button>
          </ion-item>
        
          <!-- <ion-card color="light">
            <ion-card-content color>
              <div id="spaced-content">
              <div>Document</div>
              <div>>> remove</div>
            </div>
            </ion-card-content>
          </ion-card> -->
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
    IonInput,
    IonLabel,
    IonItem
  } from "@ionic/vue";
  import { ref } from "vue";
  import { chevronForwardOutline } from "ionicons/icons";
  
  const documents = ref([
    { id: 1, name: 'User Manual' },
    { id: 2, name: 'Quick Start Guide' },
    { id: 3, name: 'Schematics' },
  ]);
  </script>
  
  <style scoped>
  #spaced-content {
  display: flex;
  justify-content: space-between;
}
  </style>
  