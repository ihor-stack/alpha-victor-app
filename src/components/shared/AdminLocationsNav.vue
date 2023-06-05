<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">Locations</h1>
    <ul class="nav-menu">
      <li class="nav-menu-link" v-for="(location, index) in navigationTree[0].locations" :key="index">
        <div class="nav-menu-link-title">
          <router-link :to="getLocationRoute(location.locationId)">
            {{ location.locationName }}
            <ion-icon :icon="chevronForwardOutline" slot="end" color="light"></ion-icon>
          </router-link>
        </div>
        <ul v-if="location.floors.length">
          <li v-for="(floor, floorIndex) in location.floors" :key="floorIndex">
            <router-link :to="getFloorRoute(floor.floorId)">{{ floor.floorName }}</router-link>
            <ul v-if="floor.spaces.length">
              <li v-for="(space, spaceIndex) in floor.spaces" :key="spaceIndex">
                <router-link :to="getSpaceRoute(space.spaceId)">{{ space.spaceName }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <NewLocationModal />
  </div>
</template>
<script setup lang="ts"> 
import {
IonLabel,
IonItem,
IonIcon,
} from "@ionic/vue";
import { chevronForwardOutline } from 'ionicons/icons';
import { onBeforeMount, ref } from "vue";
import { Locations } from '@/stores/adminLocations'
import { Floors } from '@/stores/adminFloors'
import { storeToRefs } from 'pinia'
import { useCookies } from "vue3-cookies"
import NewLocationModal from '@/components/modals/NewLocationModal.vue'

const { cookies } = useCookies();
const Location = Locations();
const Floor = Floors();
const { navigationTree } = storeToRefs(Location);
const { floors } = storeToRefs(Floor);

const getLocationRoute = (locationId: string) => {
  cookies.set('locationId', locationId);
  if (cookies.get("locationId") && cookies.get("orgId")) {
    return {
      name: "OrganisationViewLocations",
      params: { id: cookies.get("orgId"), locationId: cookies.get("locationId") },
    };
  }
};

const getFloorRoute = (floorId: string) => {
  cookies.set('floorId', floorId);
  const locationId = cookies.get("locationId");
  if (locationId && cookies.get("orgId")) {
    return {
      name: "OrganisationViewLocationsFloors",
      params: { id: cookies.get("orgId"), locationId, floorId },
    };
  }
};

const getSpaceRoute = (spaceId: string) => {
  const locationId = cookies.get("locationId");
  const floorId = cookies.get("floorId");
  if (locationId && floorId && cookies.get("orgId")) {
    return {
      name: "OrganisationViewLocationsSpaces",
      params: { id: cookies.get("orgId"), locationId, floorId, spaceId },
    };
  }
};

onBeforeMount(() => {
  Location.getNavigationTree();
  Floor.getFloors();
});
</script>
    
<style scoped>
ion-content{
    margin: 0%;
}
ion-button {
    width: 246px
}

.nav-menu {
  list-style-type: none;
  margin: 20px 0 0;
  padding: 0;
}

.nav-menu li ul {
  list-style: none;
  padding-left: 25px;
  margin: 10px 0 10px 10px;
  border-left: 1px solid #353535;
  border-bottom-left-radius: 10px;
}

.nav-menu > li > ul:last-of-type {
  margin-bottom: 30px;
}

.nav-menu > li > ul > li > ul a {
  color: var(--av-dark-gray);
}

.nav-menu-link-title a {
  font-size: 14px;
  padding: 15px 10px;
  width: 100%;
  display: block;
  border-top: 1px solid #353535;
}

.nav-menu-link-title a.router-link-active {
  background: #353535;
  border-radius: 5px;
  border-top: none;
  border-bottom: none;
}

.nav-menu-link:last-of-type .nav-menu-link-title a {
  border-bottom: 1px solid #353535;
}

.nav-menu-link a {
  color: #fff;
  font-size: 12px;
}

.nav-menu-link ion-icon {
  float: right;
}
</style>