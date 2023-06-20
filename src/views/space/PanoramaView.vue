<template>
  <ion-page>
    <app-header title="Panorama">
      <template #start>
        <ion-button
          fill="clear"
          color="light"
          @click="() => router.back()"
          class="back"
        >
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content>
      <div id="pano"></div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import { useRoute, useRouter } from "vue-router";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import { publicAPI } from "@/axios";
const router = useRouter();
const route = useRoute();

const state = reactive({
  documents: [],
});

onBeforeMount(() => {
  const spaceId: string = route.params.spaceId as string;
});
</script>

<style scoped>
ion-content {
  --background: #000000;
}
</style>
