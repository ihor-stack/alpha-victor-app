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
            type="password">
          </ion-input>
        </ion-item>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-select 
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
  } from "@ionic/vue";
  import { chevronForwardOutline } from 'ionicons/icons';
  import { ref } from "vue";

  const items = ref([
    { id: 1, name: 'Ubiquisense' },
    { id: 2, name: 'Pronestor' },
    { id: 3, name: 'Third option' },
  ]);

  </script>
  
  <style scoped>
    ion-select::part(text) {
      color: white;
    }
    ion-select-option::part(text) {
    --border-radius: 4px;
    --inner-border-radius: 4px;
  
    --color: #ddd;
    --color-checked: #6815ec;
    }
    ion-alert::part(text) {
      color: #c00000;
      background-color: #c00000;
    }
    ion-alert::part(text) {
      color: #c00000;
      background-color: #c00000 !important;
    }
    ion-radio::part(text) {
      --border-radius: 4px;
      --inner-border-radius: 4px;

      --color: #ddd;
      --color-checked: #6815ec;
    }
  </style>
  