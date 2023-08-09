<template>
  <ion-page>
    <app-header :title="currentSpace.name">
      <template #start>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">{{
            $t("pages.space.panorama.back")
          }}</span>
        </ion-button>
      </template>
      <ion-item lines="none">
        <ion-icon :icon="locationOutline" size="small" slot="start" />
        <ion-label text-wrap="true" class="font-mono font-size-xxs">{{
          currentSpace.floorName
        }}</ion-label>
      </ion-item>
    </app-header>
    <ion-content>
      <div id="pano"></div>
      <ion-chip
        class="font-size-xs font-mono startingViewButton"
        @click="setInitialView"
        v-if="currentPanorama?.path"
      >
        <ion-icon :icon="locate" color="secondaryContrast" />
        <ion-label text-wrap="true">{{
          $t("pages.space.panorama.startingView")
        }}</ion-label>
      </ion-chip>
    </ion-content>
  </ion-page>
  <ion-modal
    :is-open="state.modalOpen"
    :initial-breakpoint="1"
    :breakpoints="[0, 1]"
    @willDismiss="handleDismiss"
  >
    <room-equipment-modal
      :deviceDetails="state.selectedEquipment"
      :spaceId="spaceId"
      :handleDismiss="() => handleDismiss()"
      :handleClickReportIssue="handleClickReportIssue"
    />
  </ion-modal>
  <ion-modal
    :is-open="state.reportIssueModalOpen"
    :initial-breakpoint="1"
    :breakpoints="[0, 1]"
    @willDismiss="state.reportIssueModalOpen = false"
  >
    <report-issue-modal
      :spaceId="spaceId"
      :handleReportIssue="() => (state.reportIssueModalOpen = false)"
    />
  </ion-modal>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, watch } from "vue";
import {
  IonContent,
  IonPage,
  IonButton,
  IonModal,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/vue";
import { locationOutline, locate } from "ionicons/icons";
import "pannellum";
import "pannellum/build/pannellum.css";
import { storeToRefs } from "pinia";
import AppHeader from "@/components/shared/AppHeader.vue";
import RoomEquipmentModal from "@/components/modals/RoomEquipmentModal.vue";
import ReportIssueModal from "@/components/modals/ReportIssueModal.vue";
import { useRoute, useRouter } from "vue-router";
import { Hotspot, Device } from "@/types";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
import mixpanel from "mixpanel-browser";

const router = useRouter();
const route = useRoute();
const spacesStore = useSpacesStore();

const { currentSpace, currentPanorama, devices } = storeToRefs(spacesStore);
const spaceId: string = route.params.spaceId as string;

const state = reactive({
  modalOpen: false,
  reportIssueModalOpen: false,
  selectedEquipment: null as any,
});

let viewer: any;
let panoramaRendered = false;

const handleDismiss = () => {
  state.modalOpen = false;
};

const handleClickReportIssue = () => {
  state.modalOpen = false;
  state.reportIssueModalOpen = true;
};

const hotspotClicked = (event: MouseEvent, args: { id: string }) => {
  const selectedHotspot = currentPanorama.value.hotspots.find(
    (h) => h.hotspotId === args.id
  );
  if (selectedHotspot && selectedHotspot.deviceId) {
    state.selectedEquipment = devices.value?.find(
      (device: Device) => device.id === selectedHotspot.deviceId
    );
    viewer.setPitch(selectedHotspot?.pitch);
    viewer.setYaw(selectedHotspot?.yaw);
    state.modalOpen = true;
    mixpanel.track("Panorama Device Selected", {
      organisaLon: spacesStore.currentSpace.organisationName,
      location: spacesStore.currentSpace.locationName,
      ﬂoor: spacesStore.currentSpace.floorName,
      space: spacesStore.currentSpace.name,
      device: selectedHotspot.deviceName,
    });
  }
};

const drawHotspot = (hotspot: Hotspot) => {
  const newHotspot = {
    ...hotspot,
    id: hotspot.hotspotId,
    clickHandlerFunc: hotspotClicked,
    clickHandlerArgs: { id: hotspot.hotspotId },
  };
  viewer.addHotSpot(newHotspot);
};

const setupPanorama = () => {
  if (!currentPanorama.value?.path || panoramaRendered) return;
  panoramaRendered = true;
  const options = {
    type: "equirectangular",
    panorama: currentPanorama?.value?.path,
    autoLoad: true,
    autoRotate: -10,
    autoRotateStopDelay: 1,
    orientationOnByDefault: true,
    draggable: true,
    mouseZoom: true,
    doubleClickZoom: true,
    compass: false,
    hfov: currentPanorama.value?.initialViewHfov ?? 90,
    yaw: currentPanorama.value?.initialViewYaw ?? 0,
    pitch: currentPanorama.value?.initialViewPitch ?? 0,
    minHfov: 30,
    maxHfov: 120,
  };
  if (!viewer) viewer = (window as any).pannellum.viewer("pano", options);
  const drawHotspots = () => {
    currentPanorama.value?.hotspots?.forEach((hotspot) => {
      drawHotspot(hotspot);
    });
  };

  viewer.on("load", drawHotspots);
};

const setInitialView = () => {
  viewer.setPitch(currentPanorama.value?.initialViewPitch ?? 0);
  viewer.setYaw(currentPanorama.value?.initialViewYaw ?? 0);
  viewer.setHfov(currentPanorama.value?.initialViewHfov ?? 0);
};

watch(currentPanorama, (newValue) => {
  if (newValue?.path) setupPanorama();
});

onBeforeMount(() => {
  if (spacesStore.currentSpace?.id !== spaceId) {
    spacesStore.getSpaceDetails(spaceId).then((res) => {
      if (res?.name) {
        mixpanel.track("Panorama Viewed", {
          organisaLon: res.organisationName,
          location: res.locationName,
          ﬂoor: res.floorName,
          space: res.name,
        });
      }
    });
    spacesStore.getSpaceDevices(spaceId);
  } else {
    mixpanel.track("Panorama Viewed", {
      organisaLon: spacesStore.currentSpace.organisationName,
      location: spacesStore.currentSpace.locationName,
      ﬂoor: spacesStore.currentSpace.floorName,
      space: spacesStore.currentSpace.name,
    });
  }
  spacesStore.getPanorama(spaceId);
});
</script>

<style scoped>
ion-modal {
  --max-height: 80vh;
}

.location {
  display: flex;
  align-items: center;
  justify-content: center;
}

.location .icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 4px;
}

ion-icon {
  margin-right: 8px;
}

.startingViewButton {
  position: absolute;
  top: 15px;
  right: 15px;
  --background: #ffffff;
  --color: var(--av-primary);
}
</style>
