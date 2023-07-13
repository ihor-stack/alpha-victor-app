<template>
  <ion-page>
    <app-header title="Step By Step Guides">
      <template #start>
        <ion-button fill="clear" @click="handleBack" class="back">
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content :fullscreen="true">
      <GetHelpList></GetHelpList>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import GetHelpList from "@/components/space/getHelp/GetHelpList.vue";

const router = useRouter();
const handleBack = () => router.back();
</script>

<style scoped></style>
