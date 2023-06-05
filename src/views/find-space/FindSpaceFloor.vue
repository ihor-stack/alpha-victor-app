<template>
  <ion-page>
    <ion-content>
      <div class="locations-list">
        <h2 class="list-title font-bold color-light-gray">Popular locations</h2>
        <ul class="list list--condensed">
          <router-link
            v-for="(floor, index) in state.floors"
            :key="index"
            :to="`/find-space/floor/${floor.id}/room`"
          >
            <li
              v-for="(floor, index) in state.floors"
              :key="index"
              class="list-item"
            >
              <div class="list-item__info">
                <div class="list-item__details">
                  <p
                    class="primaryText font-bold font-size-sm color-light-gray"
                  >
                    {{ floor.shortName }}
                  </p>
                  <span class="color-dark-gray font-mono font-size-xxs">
                    {{ floor.name }}
                  </span>
                </div>
              </div>
              <span class="arrow-right"></span>
            </li>
          </router-link>
        </ul>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { onBeforeMount, reactive } from "vue";
import { useRoute } from "vue-router";
import { adminAPI } from "@/axios";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import { SingleFloor } from "@/types/index";

const route = useRoute();
const locationId: string = route.params.locationId as string;

interface State {
  floors: SingleFloor[];
}

const state: State = reactive({
  floors: [],
});

const getFloors = () => {
  loadingService.show("Loading...");
  adminAPI
    .get(`/Floor?locationId=${locationId}`)
    .then((response) => {
      state.floors = response.data;
    })
    .catch((error) => {
      state.floors = [];
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
.search-container {
  padding: 0 30px 30px;
}
.space-search {
  background: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.space-search-input {
  flex: 1;
  --padding-start: 18px;
  --padding-end: 18px;
  --padding-top: 18px;
  --padding-bottom: 18px;
  border: 0;
  color: #000;
  background: #fff;
}

.space-search-input::placeholder {
  color: #000;
}

.space-search-input:focus-visible {
  outline: 0;
}

.space-search-icon {
  padding: 0 10px;
}

.space-search ion-button {
  --padding-start: 0px;
  --padding-top: 0px;
  --padding-bottom: 0px;
  --padding-end: 0px;
}
.locations-list {
  padding: 0 30px;
  margin-bottom: 30px;
}
.list-title {
  font-size: 18px;
}
</style>
