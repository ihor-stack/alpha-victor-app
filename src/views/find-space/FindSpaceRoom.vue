<template>
  <ion-page id="recently-viewed">
    <ion-content>
      <SearchSpace :spaces="state.spaces" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { useRoute } from "vue-router";
import { publicAPI } from "@/axios";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import { Space } from "@/types/index";
import SearchSpace from "@/components/findSpace/SearchSpace.vue";

const route = useRoute();
const floorId = route.params.floorId;

interface State {
  spaces: Space[];
}

const state: State = reactive({
  spaces: [],
});

const getFloor = () => {
  const loadId = loadingService.show("Loading...");
  publicAPI
    .get(`/Floor/${floorId}/Spaces`)
    .then((response) => {
      state.spaces = response.data;
    })
    .catch((error) => {
      state.spaces = [];
      toastService.show("Error", error, "error", "top");
    })
    .finally(() => {
      loadingService.close(loadId);
    });
};

onBeforeMount(() => {
  getFloor();
});
</script>

<style scoped></style>
