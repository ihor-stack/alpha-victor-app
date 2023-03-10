<template>
  <ion-page>
    <ion-content :scroll-y="false">
      <app-header>
        <template #app-header-left>
          <ion-button fill="clear" color="light" @click="goBack">
            <span class="font-mono font-size-xs">&lt;&lt; back</span>
          </ion-button>
        </template>
      </app-header>
      
      <PdfViewer url="http://localhost:8100/assets/sample2.pdf" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import AppHeader from "@/components/shared/AppHeader.vue";
import PdfViewer from "@/components/space/PdfViewer.vue";
import { useRouter } from "vue-router";
import { 
  IonPage, 
  IonContent, 
  IonButton 
} from "@ionic/vue";
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
</style>
