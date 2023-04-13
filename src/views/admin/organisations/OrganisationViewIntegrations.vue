<template>
  <h1 class="font-bold font-size-lg color-light-gray">Integration</h1>
  <ion-item v-for="item in items" v-bind:key="item.id">
    <ion-label color="light">
      <h2>{{item.name}}</h2>
      <p>Integration</p>
    </ion-label>
    <ion-icon :icon="chevronForwardOutline" slot="end" color="light"></ion-icon>
  </ion-item>
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
  import { chevronForwardOutline
, star } from 'ionicons/icons';

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
 
  </style>
  