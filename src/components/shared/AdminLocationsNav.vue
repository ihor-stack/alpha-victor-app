<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg">
      {{ $t("components.shared.adminLocationsNav.locationsHeader") }}
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
          class="location-item"
          @click="router.push(getLocationRoute(location.locationId))"
        >
          <ion-label text-wrap="true">{{ location.locationName }}</ion-label>
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
                <ion-label text-wrap="true">{{ floor.floorName }}</ion-label>
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
  padding-left: 10px;
}
.locations-tree-wrapper > ion-accordion {
  border-bottom: 1px solid #2c2c2c;
  padding-top: 5px;
  padding-bottom: 5px;
}
.locations-tree-wrapper > ion-accordion:last-child {
  border: none;
}
.locations-tree-wrapper > ion-accordion > ion-item {
  border-radius: 6px;
}
button {
  background: none !important;
}
ion-item.location-item {
  --background: none;
  --color: #fff;

  --background-hover: none;
  --border-width: 0;
}

ion-accordion-group {
  position: relative;
}

ion-accordion ion-accordion-group.accordion-group-expand-compact ion-accordion {
  overflow: visible;
}
ion-accordion
  ion-accordion-group.accordion-group-expand-compact
  ion-accordion:after {
  position: absolute;
  top: -1em;
  left: 0;
  display: block;
  height: calc(100% + 2em);
  width: 1em;
  border-left: 1px solid #353535;
  content: "";
}
ion-accordion
  ion-accordion-group.accordion-group-expand-compact
  ion-accordion:first-child:last-child:after {
  position: absolute;
  top: -1em;
  left: 0;
  display: block;
  height: 2.3em;
  width: 1em;
  border-left: 1px solid #353535;
  content: "";
}
ion-accordion
  ion-accordion-group.accordion-group-expand-compact
  ion-accordion:not(:first-child):last-child:after {
  display: none;
}
.accordion-expanded ion-item {
  background: none;
}
ion-accordion ion-item {
  position: relative;
}
ion-accordion ion-accordion ion-item:after {
  position: absolute;
  top: 1.5em;
  left: 0;
  display: block;
  height: 0.5em;
  width: 1em;
  border-bottom: 1px solid #353535;
  border-left: 1px solid #353535;
  border-radius: 0 0 0 1em;
  content: "";
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
  background: none;
}

.space-wrapper {
  position: relative;
  list-style: none;
  margin: 0;
  margin-left: 20px;
  padding-top: 20px;
  padding-left: 20px;
}
.space-wrapper:after {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  height: calc(100% - 1em);
  width: 1em;
  border-left: 1px solid #353535;
  content: "";
}

.space-wrapper li {
  margin-bottom: 15px;
  position: relative;
}
.space-wrapper li:after {
  position: absolute;
  top: 0;
  left: -1.25em;
  display: block;
  height: 0.5em;
  width: 1em;
  border-bottom: 1px solid #353535;
  border-left: 1px solid #353535;
  border-radius: 0 0 0 1em;
  content: "";
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

.locations-tree-wrapper > ion-accordion.accordion-expanded > ion-item {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

ion-accordion > ion-item ion-label {
  color: #fff;
}
</style>
