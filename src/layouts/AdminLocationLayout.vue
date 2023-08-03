<template>
  <div class="av-locations-layout">
    <div class="av-sidebar ion-padding" :class="sidebarActive ? 'active' : ''">
      <div class="av-sidebar-cont">
        <AdminLocationsNav />
      </div>
    </div>
    <div class="container ion-padding position-relative">
      <ion-button
        class="ion-no-padding"
        fill="clear"
        color="dark"
        @click="onClickBack"
      >
        <span class="font-mono font-size-xs">{{
          $t("locationLayout.back")
        }}</span>
      </ion-button>

      <ion-button
        class="av-sidebar-toggle ion-no-padding"
        :class="sidebarActive ? 'av-sidebar-toggle--active' : ''"
        fill="clear"
        color="dark"
        @click="toggleSidebarStatus"
      >
        <span class="font-size-xs">{{ sidebarActive ? 'Hide' : 'View' }} locations</span>
        <ion-icon
          :icon="sidebarActive ? menuOutline : menu"
          class="font-size-xs"
        ></ion-icon>
      </ion-button>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { menuOutline, menu } from 'ionicons/icons';
import AdminLocationsNav from "@/components/shared/AdminLocationsNav";
import { useRouter, useRoute } from "vue-router";
import confirmToLeaveService from "@/services/confirmToLeaveService";

const router = useRouter();
const route = useRoute();

const sidebarActive = ref(false);

const toggleSidebarStatus = () => {
  sidebarActive.value = !sidebarActive.value;
};

const onClickBack = () => {
  if (confirmToLeaveService.confirm.value.isEditing) {
    confirmToLeaveService.show(() => handleBack());
  } else {
    handleBack();
  }
};

const handleBack = () => {
  const currentRouteName = route.name as string;
  const { id: orgId, locationId, floorId, spaceId } = route.params;
  const spacesRoutes = [
    "OrganisationViewLocationsDevices",
    "OrganisationViewLocationsBeacon",
    "OrganisationViewLocationsAnnouncement",
    "OrganisationViewLocationsIntegrations",
    "OrganisationViewLocationsWifi",
    "OrganisationViewLocationsPanorama",
  ];

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
  } else if (spacesRoutes.includes(currentRouteName)) {
    router.push({
      name: "OrganisationViewLocationsSpaces",
      params: { locationId, floorId, spaceId },
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
  margin: 0 0 20px 0;
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

@media only screen and (max-width: 1023px) {
  .av-sidebar.active {
    left: 0;
  }
  .av-sidebar {
    transition: all .25s;
    width: 100%;
    height: 100%;
    position: fixed;
    left: -100%;
    right: 0;
    top: 0;
    z-index: 999;
  }

  .av-sidebar-cont {
    height: 100%;
    overflow-y: scroll;
  }
  .av-sidebar-toggle {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 9999;
    border: 1px solid var(--av-darker-gray);
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    padding: 8px;
  }
  .av-sidebar-toggle--active {
    opacity: 0.6;
  }
  .av-sidebar-toggle button {
    overflow: visible !important;
  }
  .av-sidebar-toggle ion-icon {
    margin-left: 10px;
  }
}

.fixed-sidebar {
  width: 30%;
  max-width: 300px;
}
</style>
