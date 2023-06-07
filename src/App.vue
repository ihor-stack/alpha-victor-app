<template>
  <ion-app>
    <app-menu />
    <router-view id="content" />
    <LoadingIndicator
      v-if="loadingService.loading.value.isLoading"
      :message="loadingService.loading.value.message"
      :isLoading="loadingService.loading.value.isLoading"
      :duration="loadingService.loading.value.duration"
    />
    <CustomToast
      v-if="toastService.toast.value.isOpen"
      :status="toastService.toast.value.status"
      :message="toastService.toast.value.message"
      :position="toastService.toast.value.position"
      :header="toastService.toast.value.header"
      :duration="toastService.toast.value.duration"
      :isOpen="toastService.toast.value.isOpen"
    />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp } from "@ionic/vue";
import AppMenu from "./components/shared/AppMenu.vue";
import CustomToast from "@/components/shared/CustomToast.vue";
import LoadingIndicator from "@/components/shared/LoadingIndicator.vue";

/* Services */
import toastService from "./services/toastService";
import loadingService from "./services/loadingService";
</script>

<style>
.ion-page-hidden {
  display: none !important;
}
</style>
