<template>
  <h1 class="font-bold font-size-lg color-light-gray">Ubiquisense</h1>
  <ion-grid class="form-admin">
    <ion-row class="form-admin--group" >
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">
            Client ID
          </ion-label>
          <ion-input
            class="font-size-sm"
            type="password">
          </ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">

          <ion-label color="light">
            Client Secret
          </ion-label>
          <ion-input
            class="font-size-sm"
            type="password">
          </ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-select 
            interface="popover"
            placeholder="Select organisation" 
            class="issues-panel__select-equipment__select"
            color="light"
          >
            <ion-select-option 
            value="english" v-for="(org, id) in oganisations" 
            :key="id">
              {{org.name}}
            </ion-select-option>
          </ion-select>
      </ion-col>
    </ion-row> 
  </ion-grid>
  <ion-button class="font-size-xs text-lowercase">
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
    IonItem,
    IonInput,
    IonSelect, 
    IonSelectOption,
  } from "@ionic/vue";
  import { ref } from "vue";

  const oganisations = ref([
    { id: 1, name: 'option1' },
    { id: 2, name: 'option2' },
    { id: 3, name: 'option3' },
  ]);

  </script>
  
<style scoped>

</style>
  