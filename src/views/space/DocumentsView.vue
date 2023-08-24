<template>
  <ion-page>
    <app-header :title="$t('pages.space.documents.title')">
      <template #start>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">{{
            $t("pages.space.documents.back")
          }}</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content :fullscreen="true">
      <documents-list :documents="documents" :spaceId="spaceId" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from "vue";
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import DocumentsList from "@/components/space/DocumentsList.vue";
import { useRoute, useRouter } from "vue-router";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
const router = useRouter();
const route = useRoute();
const spacesStore = useSpacesStore();

const spaceId: string = route.params.spaceId as string;
const equipmentId: string = route.params.equipmentId as string;
const documentType = route.query.documentType;

const documents = computed(() => {
  const documents: any = equipmentId
    ? spacesStore.devices.find((device) => device.id === equipmentId)?.documents
    : spacesStore.documents;
  if (documentType) {
    return (
      documents?.filter(
        (document: any) => document.documentType.name === documentType
      ) || []
    );
  }
  return documents || [];
});

onBeforeMount(() => {
  if (spaceId !== spacesStore.currentSpace?.id) {
    spacesStore.getSpaceDocuments(spaceId);
    if (equipmentId) {
      spacesStore.getSpaceDevices(spaceId);
    }
  }
});
</script>

<style scoped></style>
