<template>
  <ion-page>
    <app-header :title="currentSpace.name">
      <template #start>
        <ion-button
          fill="clear"
          color="light"
          @click="() => router.back()"
          class="back"
        >
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
      <div class="location">
        <img src="@/theme/icons/location.svg" class="icon" />
        <span class="font-mono font-size-xxs color-light-gray">{{
          currentSpace.floorName
        }}</span>
      </div>
    </app-header>
    <ion-content>
      <div id="pano"></div>
    </ion-content>
  </ion-page>
  <ion-modal
    :is-open="state.modalOpen"
    :initial-breakpoint="1"
    :breakpoints="[0, 1]"
    :handleDismiss="() => handleDismiss()"
    @willDismiss="handleDismiss"
  >
    <room-equipment-modal
      :deviceDetails="state.selectedEquipment"
      :spaceId="spaceId"
    />
  </ion-modal>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, watch } from "vue";
import { IonContent, IonPage, IonButton, IonModal } from "@ionic/vue";
import "pannellum";
import "pannellum/build/pannellum.css";
import { storeToRefs } from "pinia";
import AppHeader from "@/components/shared/AppHeader.vue";
import RoomEquipmentModal from "@/components/modals/RoomEquipmentModal.vue";
import { useRoute, useRouter } from "vue-router";
import { Hotspot, Device } from "@/types";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";

const router = useRouter();
const route = useRoute();
const spacesStore = useSpacesStore();

const { currentSpace, currentPanorama, devices } = storeToRefs(spacesStore);
const spaceId: string = route.params.spaceId as string;

const state = reactive({
  modalOpen: false,
  selectedEquipment: null as any,
});

let viewer: any;
let panoramaRendered = false;

const handleDismiss = () => {
  state.modalOpen = false;
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
    hfov: 90,
    yaw: 0,
    pitch: 0,
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
  if (currentPanorama?.value?.initialViewPitch)
    viewer.setPitch(currentPanorama.value.initialViewPitch);
  if (currentPanorama?.value?.initialViewYaw)
    viewer.setPitch(currentPanorama.value.initialViewYaw);
  if (currentPanorama?.value?.initialViewHfov)
    viewer.setPitch(currentPanorama.value.initialViewHfov);
};

watch(currentPanorama, (newValue) => {
  if (newValue?.path) setupPanorama();
});

onBeforeMount(() => {
  if (spacesStore.currentSpace?.id !== spaceId) {
    spacesStore.getSpaceDetails(spaceId);
    spacesStore.getSpaceDevices(spaceId);
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
</style>
