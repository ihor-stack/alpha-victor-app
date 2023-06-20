<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      Locations
    </h1>
    <ion-accordion-group
      class="locations-tree-wrapper"
      accessKey="locationGroup"
    >
      <ion-accordion
        class="location-wrapper"
        :value="location.locationId"
        v-for="(location, index) in navigationTree[0].locations"
        :key="index"
      >
        <ion-item
          slot="header"
          size="small"
          color="dark"
          @click="router.push(getLocationRoute(location.locationId))"
        >
          <ion-label color="light">{{ location.locationName }}</ion-label>
        </ion-item>
        <div slot="content">
          <ion-accordion-group
            accessKey="floorGroup"
            class="floors-tree-wrapper"
            v-if="location.floors.length"
          >
            <ion-accordion
              v-for="(floor, floorIndex) in location.floors"
              :key="floorIndex"
              :value="`floor-${floor.floorId}`"
            >
              <ion-item
                slot="header"
                class="floor-header"
                :class="{ active: floorId === floor.floorId }"
                lines="none"
                @click="router.push(getFloorRoute(floor.floorId))"
              >
                <ion-label>{{ floor.floorName }}</ion-label>
              </ion-item>
              <div slot="content">
                <ul class="space-wrapper" v-if="floor.spaces.length">
                  <li
                    v-for="(space, spaceIndex) in floor.spaces"
                    :key="spaceIndex"
                  >
                    <router-link
                      :to="getSpaceRoute(floor.floorId, space.spaceId)"
                      :class="{ active: spaceId === space.spaceId }"
                      >{{ space.spaceName }}</router-link
                    >
                  </li>
                </ul>
              </div>
            </ion-accordion>
          </ion-accordion-group>
        </div>
      </ion-accordion>
    </ion-accordion-group>
    <NewLocationModal />
  </div>
</template>
<script setup lang="ts">
import { IonLabel, IonItem, IonAccordionGroup, IonAccordion } from "@ionic/vue";
import { onBeforeMount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Locations } from "@/stores/adminLocations";
import { Floors } from "@/stores/adminFloors";
import { storeToRefs } from "pinia";
import NewLocationModal from "@/components/modals/NewLocationModal.vue";

const router = useRouter();
const route = useRoute();

const organisationId = route.params.id as string;
const locationId = route.params.locationId as string;
const floorId = computed(() => route.params.floorId as string);
const spaceId = computed(() => route.params.spaceId as string);
const Location = Locations();
const Floor = Floors();
const { navigationTree } = storeToRefs(Location);

const getLocationRoute = (id: string) => {
  return {
    name: "OrganisationViewLocations",
    params: {
      id: organisationId,
      locationId: id,
    },
  };
};

const getFloorRoute = (floorId: string) => {
  return {
    name: "OrganisationViewLocationsFloors",
    params: { id: organisationId, locationId, floorId },
  };
};

const getSpaceRoute = (floorId: string, spaceId: string) => {
  return {
    name: "OrganisationViewLocationsSpaces",
    params: { id: organisationId, locationId, floorId, spaceId },
  };
};

onBeforeMount(() => {
  Location.getNavigationTree(organisationId);
  Floor.getFloors(locationId);
});
</script>

<style scoped>
ion-content {
  margin: 0%;
}
ion-button {
  width: 246px;
}

.locations-tree-wrapper {
  list-style-type: none;
  margin: 20px 0 0;
  padding: 0;
}

.floors-tree-wrapper {
  margin: 10px 0 10px 10px;
  padding-left: 25px;
  border-left: 1px solid #353535;
  border-bottom-left-radius: 10px;
}

.floors-tree-wrapper ion-accordion ion-item[slot="header"] {
  --background: transparent;
  --background-hover-opacity: 0;
  --background-focused-opacity: 0;
  font-size: 12px;
  color: var(--av-dark-gray);
  --min-height: unset;
}

.floor-header.active {
  color: #ffffff !important;
}

.space-wrapper {
  list-style: none;
  margin: 0;
  border-left: 1px solid #353535;
  border-bottom-left-radius: 10px;
}

.space-wrapper li {
  margin-bottom: 15px;
}

.space-wrapper li a {
  color: var(--av-dark-gray);
}

.space-wrapper li a.active {
  color: #ffffff !important;
}

.location-wrapper a {
  color: #fff;
  font-size: 12px;
}

ion-accordion {
  background: transparent;
}

ion-accordion ion-item {
  padding: 0;
}

ion-accordion.accordion-expanded > ion-item {
  background: var(--av-darker-gray);
}

ion-accordion > ion-item ion-label {
  color: #fff;
}
</style>
