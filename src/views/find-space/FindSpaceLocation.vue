<template>
  <ion-content>
    <ion-list lines="inset" :inset="true">
      <ion-list-header>
        <ion-label class="font-bold font-size-lg">Locations</ion-label>
      </ion-list-header>
      <ion-item
        v-for="(location, index) in searchNavigationTree"
        :key="index"
        :href="`/find-space/location/${location.id}/floor`"
        :detail="true"
      >
        <ion-label>
          <h3 class="font-bold">{{ location.name }}</h3>
          <p class="font-mono font-size-xxs">
            {{ location.city }}
          </p>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
import { storeToRefs } from "pinia";
const organisationStore = useOrganisationStore();
defineProps(["searchTerm"]);
const { searchNavigationTree } = storeToRefs(organisationStore);
</script>

<style scoped>
ion-item::part(detail-icon) {
  opacity: 1;
}
</style>
