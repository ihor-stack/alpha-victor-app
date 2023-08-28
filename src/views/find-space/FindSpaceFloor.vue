<template>
  <ion-page>
    <ion-content>
      <ion-list lines="inset" :inset="true">
        <ion-list-header class="ion-no-padding">
          {{ location?.name }}
        </ion-list-header>
        <ion-item
          v-for="(floor, index) in location?.floors || []"
          :key="index"
          :detail="true"
          class="ion-no-padding"
          button
          @click="router.push(`/find-space/floor/${floor.id}/room`)"
        >
          <ion-label text-wrap="true">
            <h3 class="font-bold">{{ floor.name }}</h3>
            <p class="font-mono font-size-xxs">
              {{ `${floor.spaceCount}.spaces` }}
            </p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";

const organisationStore = useOrganisationStore();
const route = useRoute();
const router = useRouter();
const locationId: string = route.params.locationId as string;
const { searchNavigationTree } = storeToRefs(organisationStore);

const location = computed(() =>
  searchNavigationTree.value?.find((location) => location.id === locationId)
);
</script>

<style scoped>
ion-content {
  --background: none;
}

ion-item::part(detail-icon) {
  opacity: 1;
}

ion-list-header {
  margin-bottom: 20px;
}

ion-label p {
  margin-left: 10px;
}
</style>
