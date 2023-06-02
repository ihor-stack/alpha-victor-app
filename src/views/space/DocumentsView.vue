<template>
  <ion-page>
    <app-header title="Documents">
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
      <documents-list :documents="state.documents" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import DocumentsList from "@/components/space/DocumentsList.vue";
import { useRoute, useRouter } from "vue-router";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import { adminAPI } from "@/axios";
const router = useRouter();
const route = useRoute();

const state = reactive({
  documents: [],
});

const getDocuments = (equipmentId: string) => {
  if (!equipmentId) return;
  loadingService.show("Loading...");
  adminAPI
    .get(`/Document/Equipment/${equipmentId}`)
    .then((response) => {
      state.documents = response.data;
    })
    .catch((error) => {
      state.documents = [];
      toastService.show("Error", error, "error", "top");
    })
    .finally(() => {
      loadingService.close();
    });
};

onBeforeMount(() => {
  const equipmentId: string = route.params.equipmentId as string;
  getDocuments(equipmentId);
});
</script>

<style scoped>
ion-content {
  --background: #000000;
}
</style>
