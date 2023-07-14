<template>
  <ion-page>
    <app-header title="Feedback">
      <template #start>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content :scroll-y="false" :fullscreen="true">
      EMBED TYPEFORM USING TYPEFORM ID
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from "vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import { useRouter, useRoute } from "vue-router";
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { adminAPI } from "@/axios";

const router = useRouter();
</script>

<style scoped></style>
