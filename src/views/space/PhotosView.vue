<template>
  <ion-page>
    <app-header :title="$t('pages.space.photos.title')">
      <template #start>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">{{
            $t("pages.space.documents.back")
          }}</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <space-photo-modal
            v-for="(photo, index) in currentSpace.photos"
            :key="index"
            :path="photo.path"
            :photos="currentSpace.photos"
            :index="index"
          />
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import {
  IonContent,
  IonPage,
  IonButton,
  IonGrid,
  IonRow,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import AppHeader from "@/components/shared/AppHeader.vue";
import { useRoute, useRouter } from "vue-router";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
import SpacePhotoModal from "@/components/modals/SpacePhotoModal.vue";

const router = useRouter();
const route = useRoute();
const spacesStore = useSpacesStore();

const spaceId: string = route.params.spaceId as string;
const { currentSpace } = storeToRefs(spacesStore);

onBeforeMount(() => {
  if (spaceId !== spacesStore.currentSpace?.id) {
    spacesStore.getSpaceDetails(spaceId);
  }
});
</script>

<style scoped>
ion-grid {
  --ion-grid-column-padding-xs: 10px;
  --ion-grid-column-padding-sm: 10px;
  --ion-grid-column-padding-md: 10px;
  --ion-grid-column-padding-lg: 10px;
  --ion-grid-column-padding-xl: 10px;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  cursor: pointer;
}
</style>
