<template>
  <div class="av-locations-layout">
    <div class="av-sidebar ion-padding">
      <div class="av-sidebar-cont">
        <ion-button
          class="ion-no-padding"
          fill="clear"
          color="dark"
          @click="handleBack"
        >
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
        <AdminLocationsNav />
      </div>
    </div>
    <div class="container ion-padding position-relative">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminLocationsNav from "@/components/shared/AdminLocationsNav";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const handleBack = () => {
  const currentRouteName = route.name as string;
  const { id: orgId, locationId, floorId } = route.params;

  if (currentRouteName === "OrganisationViewLocations") {
    router.push({
      name: "OrganisationView",
      params: { id: orgId },
    });
  } else if (currentRouteName === "OrganisationViewLocationsFloors") {
    router.push({
      name: "OrganisationViewLocations",
      params: { locationId },
    });
  } else if (currentRouteName === "OrganisationViewLocationsSpaces") {
    router.push({
      name: "OrganisationViewLocationsFloors",
      params: { locationId, floorId },
    });
  }
};
</script>

<style scoped>
ion-grid {
  width: 100%;
}

ion-row {
  width: 100%;
  min-height: 100vh;
  display: flex;
}

ion-button {
  margin: 20px 0;
}

.av-locations-layout {
  display: flex;
}

.av-sidebar {
  background: var(--av-darkest-gray);
  color: #fff;
  width: 260px;
  min-height: 100vh;
  height: 100%;
  display: block;
  position: sticky;
  top: 0;
}
.av-sidebar-cont {
  width: 200px;
}

.fixed-sidebar {
  width: 30%;
  max-width: 300px;
}
</style>
