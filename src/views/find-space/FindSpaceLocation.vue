<template>
  <ion-page>
    <ion-content v-if="searchNavigationTree">
      <ion-list lines="inset" :inset="true">
        <ion-list-header class="ion-no-padding">
          {{ $t("pages.findSpace.location.title") }}
        </ion-list-header>
        <ion-item
          v-for="(location, index) in searchNavigationTree"
          :key="index"
          :detail="true"
          button
          class="ion-no-padding"
          @click="router.push(`/find-space/location/${location.id}/floor`)"
        >
          <ion-label text-wrap="true">
            <h3 class="font-bold">{{ location.name }}</h3>
            <p class="font-mono font-size-xxs">
              {{ location.city }}
            </p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
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
import { useRouter } from "vue-router";

const router = useRouter();
const organisationStore = useOrganisationStore();
const { searchNavigationTree } = storeToRefs(organisationStore);
defineProps(["searchTerm"]);
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
