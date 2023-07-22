<template>
  <ion-page id="recently-viewed">
    <app-header :title="$t('pages.recentlyViewed.header')">
      <template #start>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">{{ $t('pages.recentlyViewed.back')}}</span>
        </ion-button>
      </template>
      <template #end>
        <ion-menu-button fill="clear"> </ion-menu-button>
      </template>
    </app-header>
    <ion-content>
      <ion-list :inset="true">
        <ion-item
          v-for="space in recentlyViewedSpaces"
          :key="space.shortCode"
          class="space"
          button
          :href="`/space/${space.id}`"
          :detail="false"
        >
          <space-card :space="space" />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import {
  IonPage,
  IonContent,
  IonButton,
  IonMenuButton,
  IonList,
  IonItem,
} from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import SpaceCard from "@/components/dashboard/SpaceCard.vue";
import { useRouter } from "vue-router";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
import { storeToRefs } from "pinia";

const spacesStore = useSpacesStore();
const router = useRouter();

const { recentlyViewedSpaces } = storeToRefs(spacesStore);

onBeforeMount(() => {
  spacesStore.getRecentlyViewedSpaces();
});
</script>

<style scoped>
ion-item::part(native) {
  padding-left: 0px;
}
ion-item {
  --inner-padding-end: 0;
}

.space {
  position: relative;
  height: 200px;
  width: 100%;
  margin-bottom: 32px;
  border-radius: 4px;
  overflow: hidden;
}
.space__image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.space__image__gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}
.space__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.space__info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1;
  padding: 0 10px 12px;
}

.space__info__top,
.space__info__bottom {
  display: flex;
  justify-content: space-between;
}

.space__info .name {
  margin-left: 10px;
  padding-right: 30px;
  word-break: break-all;
}

.space__info .category {
  font-size: 10px;
  margin-bottom: 4px;
}

.space__info .capacity {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.space__info .capacity-icon {
  margin-right: 4px;
}
</style>
