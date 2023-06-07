<template>
  <ion-page>
    <ion-content>
      <div class="locations-list">
        <h2 class="list-title font-bold color-light-gray">
          {{ location?.name }}
        </h2>
        <ion-list>
          <ion-item
            :detail="true"
            button
            lines="full"
            v-for="(floor, index) in location?.floors || []"
            :key="index"
          >
            <router-link
              :to="`/find-space/floor/${floor.id}/room`"
              class="list-item__info"
            >
              <div>
                <div class="list-item__details">
                  <p
                    class="primaryText font-bold font-size-sm color-light-gray"
                  >
                    {{ floor.name }}
                  </p>
                  <span class="color-dark-gray font-mono font-size-xxs">
                    {{ `${floor.spaces?.length || 0}.spaces` }}
                  </span>
                </div>
              </div>
            </router-link>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonList, IonItem } from "@ionic/vue";
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
ion-list {
  background: transparent;
}
ion-item {
  --background: transparent;
}
.locations-list {
  padding: 0 30px;
  margin-bottom: 30px;
}
.list-item__info {
  width: 100%;
}
</style>
