<template>
  <ion-page>
    <ion-content :scroll-y="false">
      <app-header>
        <template #start>
          <ion-button fill="clear" @click="() => router.back()" class="back">
            <span class="font-mono font-size-xs">&lt;&lt; back</span>
          </ion-button>
        </template>
      </app-header>
      <PdfViewer
        :url="state.documentData.path"
        v-if="state.documentData.path"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from "vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import PdfViewer from "@/components/space/PdfViewer.vue";
import { useRouter, useRoute } from "vue-router";
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { adminAPI } from "@/axios";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";
import { Document } from "@/types/index";

const router = useRouter();
const route = useRoute();
const documentId: string = route.params.id as string;

interface State {
  documentData: Document;
}

const state: State = reactive({
  documentData: {
    id: documentId,
    name: "",
    path: "",
  },
});

const getDocument = () => {
  loadingService.show("Loading...");
  adminAPI
    .get(`/Document/${documentId}`)
    .then((response) => {
      state.documentData = response.data;
    })
    .catch((error) => {
      toastService.show("Error", error, "error", "top");
    })
    .finally(() => {
      loadingService.close();
    });
};

onBeforeMount(() => getDocument());
</script>

<style scoped></style>
