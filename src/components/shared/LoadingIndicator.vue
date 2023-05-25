<template>
  <ion-loading class="custom-loading" :trigger="props.isLoading" :message="props.message" :duration="props.duration"></ion-loading>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { IonLoading } from "@ionic/vue";

interface Props {
  duration?: number;
  message: string;
  isLoading: boolean;
}

const props = defineProps<Props>();
</script>

<style scoped>
ion-loading.custom-loading {
  --background: #e3edff;
  --spinner-color: #1c6dff;

  color: #1c6dff;
}
</style>