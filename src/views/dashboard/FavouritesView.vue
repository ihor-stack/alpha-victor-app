<template>
  <ion-page id="favourites">
    <app-header title="Favourites">
      <template #start>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
      <template #end>
        <ion-menu-button fill="clear"> </ion-menu-button>
      </template>
    </app-header>
    <ion-content :fullscreen="true">
      <ion-list :inset="true">
        <ion-item
          v-for="favourite in spaces"
          :key="favourite.shortCode"
          :href="`/space/${favourite.id}`"
          lines="none"
          :detail="false"
        >
          <ion-thumbnail slot="start">
            <img v-if="favourite.imagePath" :src="favourite.imagePath" />
            <img v-else src="@/theme/img/space-the-henderson-square.png" />
          </ion-thumbnail>
          <ion-label>
            <p class="category">{{ favourite.roomType }}</p>
            <h3 class="name font-bold">{{ favourite.name }}</h3>
          </ion-label>
          <ion-button
            fill="solid"
            size="small"
            slot="end"
           
            shape="round"
            @click="setFavoriteSpace(favourite.id)"
          >
            <ion-icon :icon="heart" />
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer class="ion-padding">
      <router-link to="/find-space/location">
        <ion-button expand="block">Explore Spaces</ion-button>
      </router-link>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from "vue";
import {
  IonPage,
  IonContent,
  IonButton,
  IonMenuButton,
  IonFooter,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonIcon,
} from "@ionic/vue";
import { heart } from "ionicons/icons";
import AppHeader from "@/components/shared/AppHeader.vue";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
import { useRouter } from "vue-router";

const router = useRouter();
const spacesStore = useSpacesStore();

const spaces = computed(() => spacesStore.favouriteSpaces || []);

const isFavourite = (spaceId = "") =>
  spacesStore.favouriteSpaces?.some((item) => item.id === spaceId);

const setFavoriteSpace = (spaceId = "") => {
  if (spaceId) spacesStore.setFavouriteSpace(spaceId, !isFavourite(spaceId));
};

onBeforeMount(() => {
  spacesStore.getFavouriteSpaces();
});
</script>

<style scoped>
.favourites-list {
  list-style-type: none;
  margin: 0;
  padding: 20px 30px;
}
ion-item::part(native) {
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  height: 80px;
  padding-left: 0;
  gap: 12px;
  margin-bottom: 20px;
}
ion-thumbnail {
  width: 80px;
  height: 100%;
  margin: 0 !important;
}
ion-button::part(native) {
  padding: 12px;
}
.name {
  font-size: 18px;
  margin-left: 10px;
}

.category {
  font-size: 10px;
  margin-bottom: 4px;
}
</style>
