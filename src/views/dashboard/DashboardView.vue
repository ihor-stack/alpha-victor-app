<template>
  <ion-page id="dashboard" class="outer-container">
    <app-header :no-background="true">
      <template #start>
        <ion-button
          class="switch-organisation"
          shape="round"
          @click="state.modalOpen = true"
        >
          <img
            src="@/theme/icons/switch-location.svg"
            :alt="$t('pages.dashboard.alt')"
          />
        </ion-button>
      </template>
      <template #end>
        <ion-menu-button fill="solid"> </ion-menu-button>
      </template>
    </app-header>
    <ion-content :scroll-y="false">
      <div class="dashboard-search-container">
        <dashboard-search />
      </div>

      <div class="dashboard-sliders" v-if="nearbySpaces?.length">
        <div class="dashboard-slider-container">
          <dashboard-slider :title="$t('pages.dashboard.slider.title1')" :slides="nearbySpaces" />
        </div>
      </div>

      <div class="dashboard-sliders" v-if="recentlyViewedSpaces?.length">
        <div class="dashboard-slider-container">
          <dashboard-slider
            :title="$t('pages.dashboard.slider.title2')"
            cta-url="/recently-viewed"
            :slides="recentlyViewedSpaces"
          />
        </div>
      </div>

      <ion-item
        v-if="!nearbySpaces.length && !recentlyViewedSpaces.length"
        lines="none"
      >
        <ion-label>
          <h1 class="color-white">{{ $t("pages.dashboard.noSpacesFound") }}</h1>
          <p>{{ $t("pages.dashboard.shortCodeTip") }}</p>
        </ion-label>
      </ion-item>
    </ion-content>
    <ion-footer class="ion-no-border">
      <router-link to="/find-space/location">
        <ion-button expand="block">{{
          $t("pages.dashboard.exploreBtn")
        }}</ion-button>
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
import { reactive, onBeforeMount, onBeforeUnmount, computed, watch } from "vue";
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
import { Capacitor } from "@capacitor/core";
import { storeToRefs } from "pinia";

import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
import { IBeacon, Beacon } from "@ionic-native/ibeacon";

const spacesStore = useSpacesStore();
const organisationStore = useOrganisationStore();
const { currentOrganisationId } = storeToRefs(organisationStore);
interface State {
  modalOpen: boolean;
  observedBeacons: Beacon[];
}

const state: State = reactive({
  modalOpen: false,
  observedBeacons: [],
});

const handleDismiss = () => {
  state.modalOpen = false;
};

const recentlyViewedSpaces = computed(
  () => spacesStore.recentlyViewedSpaces || []
);

const nearbySpaces = computed(() => spacesStore.nearbySpaces || []);

let beaconRegion: any = null;

const startRangingBeacons = async () => {
  await IBeacon.requestAlwaysAuthorization();
  const delegate = IBeacon.Delegate();

  delegate.didRangeBeaconsInRegion().subscribe((data) => {
    if (data.beacons.length > 0) {
      data.beacons.forEach((b) => {
        if (
          state.observedBeacons.filter(
            (ob) => ob.minor == b.minor && ob.major == b.major
          ).length == 0
        ) {
          state.observedBeacons.push(b);
          spacesStore.getNearbySpace(b.uuid, b.major, b.minor);
        }
      });
    }
  });

  // TODO: Assuming for now we'll always be using the one Beacon with the same UUID. Extracted when originally testing.
  beaconRegion = IBeacon.BeaconRegion(
    "spaceBeacon",
    "f7826da6-4fa2-4e98-8024-bc5b71e0893e"
  );

  await IBeacon.startRangingBeaconsInRegion(beaconRegion);
};

watch(currentOrganisationId, (newValue) => {
  if (newValue?.length > 0) {
    spacesStore.getRecentlyViewedSpaces();
  }
});

onBeforeMount(() => {
  spacesStore.getFavouriteSpaces();
  organisationStore.getOrganisations();
  if (Capacitor.getPlatform() !== "web") {
    startRangingBeacons();
  }
  if (currentOrganisationId) {
    spacesStore.getRecentlyViewedSpaces();
  }
});

onBeforeUnmount(() => {
  if (beaconRegion !== null) {
    IBeacon.stopRangingBeaconsInRegion(beaconRegion);
  }

  state.observedBeacons.splice(0, state.observedBeacons.length);
});
</script>

<style scoped>
.outer-container {
  display: flex;
  flex-direction: column;
}
.dashboard-search-container {
  padding: 20px 20px 32px;
  background: 0;
}
.dashboard-sliders {
  flex: 1;
  margin-bottom: 32px;
}
.dashboard-slider-container:not(:last-of-type) {
  margin-bottom: 32px;
}
.switch-organisation {
  width: 50px;
  height: 50px;
  --background: var(--ion-color-primary);
  --border-radius: 50% !important;
}

body.dark .switch-organisation {
  --background: rgba(255, 255, 255, 0.1);
}

ion-content {
  --background: none;
}

ion-footer {
  padding: 20px 22px 40px;
}
ion-item {
  --background: transparent;
  text-align: center;
}
</style>
