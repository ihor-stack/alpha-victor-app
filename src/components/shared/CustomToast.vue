<template>
  <ion-toast
    :is-open="props.isOpen"
    :header="props.header"
    :message="props.message"
    :duration="5000"
    position="top"
    :icon="
      props.status === 'success' ? checkmarkCircle :
      props.status === 'problem' ? alertCircle :
      props.status === 'error' ? closeCircle :
      null"
    :cssClass="
      [
        'customToast', 
        props.status === 'success' ? 'customToastSuccess' :
        props.status === 'problem' ? 'customToastProblem' :
        props.status === 'error' ? 'customToastError' :
        'customToastGeneric'
      ]"
  ></ion-toast>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { IonToast } from "@ionic/vue";
import { alertCircle, checkmarkCircle, closeCircle } from "ionicons/icons";

interface Props {
  status: 'generic' | 'success' | 'problem' | 'error';
  header?: string;
  message: string;
  isOpen: boolean;
}

const props = defineProps<Props>();
</script>

<style scoped>
</style>