<template>
  <ion-app>
    <app-menu />
    <ion-router-outlet id="content" />
    <AdminAlertModal />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import AppMenu from "./components/shared/AppMenu.vue";
import AdminAlertModal from "@/components/admin/AdminAlertModal.vue";
</script>

<style>
.ion-page-hidden {
  display: none !important;
}
</style>
