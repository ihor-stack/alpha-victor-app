<template>
  <h1 class="font-bold font-size-lg color-light-gray">Ubiquisense</h1>
  <ion-grid>
    <ion-row class="form-admin--group" >
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-item>
          <ion-label color="light" slot='start'>
            Client ID
          </ion-label>
          <ion-input
            class="font-size-sm"
            color="light"
            placeholder="Enter Client ID"
            type="password">
          </ion-input>
        </ion-item>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-item>
          <ion-label color="light" slot='start'>
            Client Secret
          </ion-label>
          <ion-input
            class="font-size-sm"
            color="light"
            placeholder="Enter Client Secret"
            :value="newDocument"
            type="password"
            @ionInput="newDocument = $event.target.value;">
          </ion-input>
        </ion-item>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field"  >
          <ion-select 
            interface="action-sheet" 
            placeholder="Select language" 
            class="custom-select"
          >
            <ion-select-option value="english">English</ion-select-option>
            <ion-select-option value="french">French</ion-select-option>
            <ion-select-option value="german">German</ion-select-option>
          </ion-select>
      </ion-col>
    </ion-row> 
  </ion-grid>
  <ion-button>Save Changes</ion-button>
  </template>
  
  <script setup lang="ts">
  
import {
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonItem,
    IonInput,
    IonSelect, 
    IonSelectOption,
    IonAlert
  } from "@ionic/vue";
  import { chevronForwardOutline } from 'ionicons/icons';
  import { ref } from "vue";

  const items = ref([
    { id: 1, name: 'Ubiquisense' },
    { id: 2, name: 'Pronestor' },
    { id: 3, name: 'Third option' },
  ]);
  const newDocument = ref()
  const currentDocument = ref();
  const editedDocument = ref();

  </script>
  
  <style scoped>
  /* ion-radio-group{
    background-color: white;
  }
  ion-select {
    background-color: grey; 
  }
  ion-select::part(text) {
    color: white;
  }
  ion-select::content {
    color: white;
  } */

  </style>
  