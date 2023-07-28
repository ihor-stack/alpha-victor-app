<template>
  <ion-page>
    <app-header>
      <template #start>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">{{
            $t("pages.space.document.back")
          }}</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content :scroll-y="false" :fullscreen="true">
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
import { Document, DetailedSpace } from "@/types/index";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
import mixpanel from "mixpanel-browser";

const router = useRouter();
const route = useRoute();
const spacesStore = useSpacesStore();
const documentId: string = route.params.id as string;
const spaceId: string = route.params.spaceId as string;

interface State {
  documentData: Document;
}

const state: State = reactive({
  documentData: {
    id: documentId,
    name: "",
    path: "",
  } as Document,
});

const getDocument = async () => {
  let spaceDetails: DetailedSpace | null = spacesStore.currentSpace;
  if (spaceId && spacesStore.currentSpace?.id !== spaceId) {
    spaceDetails = await spacesStore.getSpaceDetails(spaceId);
  }
  const loadId = loadingService.show("Loading...");
  adminAPI
    .get(`/Document/${documentId}`)
    .then((response) => {
      state.documentData = response.data;
      if (spaceId) {
        mixpanel.track("Document Viewed", {
          organisaLon: spaceDetails?.organisationName,
          location: spaceDetails?.locationName,
          ﬂoor: spaceDetails?.floorName,
          space: spaceDetails?.name,
          document: response.data.name,
        });
      }
    })
    .catch((error) => {
      toastService.show("Error", error, "error", "bottom");
    })
    .finally(() => {
      loadingService.close(loadId);
    });
};

onBeforeMount(() => getDocument());
</script>

<style scoped></style>
