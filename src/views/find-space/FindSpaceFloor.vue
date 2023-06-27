<template>
  <ion-page>
    <ion-content>
      <ion-list lines="inset" :inset="true">
        <ion-list-header>
          <ion-label class="font-bold font-size-lg">{{
            location?.name
          }}</ion-label>
        </ion-list-header>
        <ion-item
          v-for="(floor, index) in location?.floors || []"
          :key="index"
          :href="`/find-space/floor/${floor.id}/room`"
          :detail="true"
        >
          <ion-label>
            <h3 class="font-bold">{{ floor.name }}</h3>
            <p class="font-mono font-size-xxs">
              {{ `${floor.spaces?.length || 0}.spaces` }}
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
import { onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";

const organisationStore = useOrganisationStore();
const route = useRoute();
const locationId: string = route.params.locationId as string;
const { searchNavigationTree } = storeToRefs(organisationStore);

const location = computed(() =>
  searchNavigationTree.value?.find((location) => location.id === locationId)
);

onBeforeMount(() => {
  if (searchNavigationTree.value?.length < 1) {
    organisationStore.getSearchNavigationTree();
  }
});
</script>

<style scoped>
ion-item::part(detail-icon) {
  opacity: 1;
}
</style>
