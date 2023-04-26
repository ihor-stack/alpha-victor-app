<template>
  <ion-app>
    <app-menu />
    <ion-router-outlet id="content" />
    <AdminAlert />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import AppMenu from './components/shared/AppMenu.vue';
import AdminAlert from '@/components/admin/AdminAlert.vue'
</script>

<style>
  .ion-page-hidden {
    display: none !important;
  }
</style>