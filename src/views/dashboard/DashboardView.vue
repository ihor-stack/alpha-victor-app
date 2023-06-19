<template>
  <ion-page id="dashboard" class="outer-container">
    <app-header :no-background="true">
      <template #start>
        <ion-button
          fill="clear"
          color="light"
          class="switch-organisation"
          @click="state.modalOpen = true"
        >
          <img
            src="@/theme/icons/switch-location.svg"
            alt="Switch Organisation"
          />
        </ion-button>
      </template>
      <template #end>
        <ion-menu-button fill="clear">
          <img
            src="@/theme/icons/nav-menu.svg"
            class="nav-menu"
            alt="Nav Menu Button"
          />
        </ion-menu-button>
      </template>
    </app-header>
    <ion-content :scroll-y="false">
      <div class="dashboard-search-container">
        <dashboard-search />
      </div>
      <div class="dashboard-sliders" v-if="recentlyViewedSpaces?.length">
        <div class="dashboard-slider-container">
          <dashboard-slider
            title="Recently viewed"
            cta-url="/recently-viewed"
            :slides="recentlyViewedSpaces"
          />
        </div>
      </div>
      <div class="dashboard-sliders" v-if="nearbySpaces?.length">
        <div class="dashboard-slider-container">
          <dashboard-slider
            title="Nearby spaces"
            :slides="nearbySpaces"
          />
        </div>
      </div>
      <ion-item v-if="!nearbySpaces.length && !recentlyViewedSpaces.length" lines="none">
        <ion-label>
          <h1 class="">no.spaces.found</h1>
          <p>Please enter a short code or explore spaces.</p>
        </ion-label>
      </ion-item>
    </ion-content>
    <ion-footer class="ion-no-border">
      <router-link to="/find-space/location">
        <ion-button expand="block">Explore Spaces</ion-button>
      </router-link>
    </ion-footer>
    <ion-modal
      :is-open="state.modalOpen"
      :initial-breakpoint="0.4"
      :breakpoints="[0, 0.4]"
      @willDismiss="handleDismiss"
    >
      <organisation-select-modal :handleDismiss="handleDismiss" />
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onBeforeUnmount, computed } from "vue";
import {
  IonPage,
  IonContent,
  IonFooter,
  IonButton,
  IonMenuButton,
  IonModal,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import DashboardSearch from "@/components/dashboard/DashboardSearch.vue";
import DashboardSlider from "@/components/dashboard/DashboardSlider.vue";
import OrganisationSelectModal from "@/components/modals/OrganisationSelectModal.vue";
import { Capacitor } from '@capacitor/core';
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
import { IBeacon, Beacon } from "@ionic-native/ibeacon";

const spacesStore = useSpacesStore();
const organisationStore = useOrganisationStore();


interface State {
  modalOpen: boolean;
  observedBeacons: Beacon[]
}

const state: State = reactive({
  modalOpen: false,
  observedBeacons: []
});

const handleDismiss = () => {
  state.modalOpen = false;
};

const recentlyViewedSpaces = computed(
  () => spacesStore.recentlyViewedSpaces || []
);

const nearbySpaces = computed(
  () => spacesStore.nearbySpaces || []
);

let beaconRegion : any = null;

const startRangingBeacons = async () => {

  await IBeacon.requestAlwaysAuthorization();
  const delegate = IBeacon.Delegate();

  delegate.didRangeBeaconsInRegion().subscribe(data => {

    if (data.beacons.length > 0) {
      
      data.beacons.forEach(b => {

        if (state.observedBeacons.filter(ob => ob.minor == b.minor && ob.major == b.major).length == 0) {
          state.observedBeacons.push(b);
          spacesStore.getNearbySpace(b.uuid, b.major, b.minor);
        }
      })

    }
  });
  
  beaconRegion = IBeacon.BeaconRegion('spaceBeacon', 'f7826da6-4fa2-4e98-8024-bc5b71e0893e');

  await IBeacon.startRangingBeaconsInRegion(beaconRegion);
};

onBeforeMount(() => {
  spacesStore.getFavouriteSpaces();
  spacesStore.getRecentlyViewedSpaces();
  organisationStore.getOrganisations();
  if (Capacitor.getPlatform() !== 'web') {
    startRangingBeacons();
  }
});

onBeforeUnmount(() => {

  if (beaconRegion !== null) {
    IBeacon.stopRangingBeaconsInRegion(beaconRegion);
  }

});

</script>

<style scoped>
.outer-container {
  display: flex;
  flex-direction: column;
}
.dashboard-search-container {
  padding: 0 32px 32px;
  background: 0;
}
.dashboard-sliders {
  flex: 1;
}
.dashboard-slider-container:not(:last-of-type) {
  margin-bottom: 32px;
}
.switch-organisation {
  height: 50px;
}

ion-content {
  --background: none;
}

ion-footer {
  padding: 20px 32px;
}
ion-item {
  --background: transparent;
  text-align: center;
}
</style>
