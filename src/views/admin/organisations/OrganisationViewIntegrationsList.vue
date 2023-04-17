<template>
  <h1 class="font-bold font-size-lg color-light-gray">Integration</h1>
  <ion-item 
  v-for="item in items" 
  v-bind:key="item.id" 
  button 
  :router-link="{ name: 'OrganisationViewIntegrations' }" 
  router-direction="root">
    <ion-label color="light" >
      <h2>{{item.name}}</h2>
      <p>Integration</p>
    </ion-label>
    <ion-icon :icon="chevronForwardOutline" slot="end" color="light"></ion-icon>
  </ion-item>
  </template>
  
  <script setup lang="ts">
  
import {
    IonIcon,
    IonLabel,
    IonItem,
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
p {
  margin-left: 3%;
  font-family: "Akkurat-Mono";
  font-size: var(--av-font-xs);
}
  </style>
  