<template>
  <ion-app>
    <app-menu />
    <ion-router-outlet id="content" />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import AppMenu from './components/shared/AppMenu.vue';
</script>

<style>
  .ion-page-hidden {
    display: none !important;
  }
</style>