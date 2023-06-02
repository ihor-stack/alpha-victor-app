<template>
  <ion-page id="recently-viewed">
    <ion-content>
      <ion-list class="spaces-list" lines="none">
        <ion-item
          v-for="space in state.floor?.spaces"
          :key="space.spaceId"
          class="space"
          button
          :href="`/space/${space.spaceId}`"
        >
          <space-card :space="space" />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { IonPage, IonContent, IonList, IonItem } from "@ionic/vue";
import SpaceCard from "@/components/dashboard/SpaceCard.vue";
import { useRoute } from "vue-router";
import { adminAPI } from "@/axios";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import { SingleFloor } from "@/types/index";

const route = useRoute();
const floorId = route.params.floorId;

interface State {
  floor: SingleFloor;
}

const state: State = reactive({
  floor: {} as SingleFloor,
});

const getFloors = () => {
  loadingService.show("Loading...");
  adminAPI
    .get(`/Floor/${floorId}`)
    .then((response) => {
      state.floor = response.data;
    })
    .catch((error) => {
      state.floor = {} as SingleFloor;
      toastService.show("Error", error, "error", "top");
    })
    .finally(() => {
      loadingService.close();
    });
};

onBeforeMount(() => {
  getFloors();
});
</script>

<style scoped>
ion-content {
  --background: #000000;
}
ion-list {
  background: transparent;
}

ion-item {
  --background: transparent;
}
</style>
