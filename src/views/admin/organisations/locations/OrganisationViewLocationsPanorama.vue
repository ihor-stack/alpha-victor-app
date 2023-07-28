<template>
  <div class="panorama-wrapper">
    <div>
      <ion-row class="form-admin--group">
        <ion-col
          v-if="space.featuredImagePath || space.photos?.[0]?.path"
          size-xs="12"
          size-sm="2"
          class="form-admin--group_field"
        >
          <div class="img-container">
            <img :src="space.featuredImagePath" alt="" />
          </div>
        </ion-col>
        <ion-col
          size-xs="12"
          size-sm="6"
          class="form-admin--group_field header-left"
        >
          <h1 class="font-bold font-size-lg color-light-gray">
            {{ space.spaceName }}
          </h1>
          <span
            class="font-size-xs font-mono color-light-gray header-left--label"
          >
            <ion-icon :icon="locationOutline"></ion-icon>
            {{ space.location?.name }}
          </span>
          <span
            class="font-size-xs font-mono color-light-gray header-left--label"
          >
            <ion-icon :icon="peopleOutline"></ion-icon>
            &gt;&gt; {{ space.capacity }}
          </span>
        </ion-col>
      </ion-row>
    </div>
    <div class="panorama-content">
      <div id="pano"></div>
      <ion-row>
        <ion-col>
          <ion-chip class="font-size-xs font-mono" @click="setInitialView">
            <ion-icon :icon="locate" color="secondaryContrast" />
            <ion-label>{{ $t("pages.admin.organisations.view.locations.panorama.label") }}</ion-label>
          </ion-chip>
        </ion-col>
      </ion-row>
      <ion-row class="ion-justify-content-center">
        <ion-button color="primary">
          <label for="panormaSelect">
            <span>{{
              currentPanorama?.path ? "Change panorama" : "Add panorama"
            }}</span>
          </label>
          <input
            id="panormaSelect"
            type="file"
            style="display: none"
            @change="onFileSelected"
          />
        </ion-button>
        <ion-button
          @click="deletePanorama"
          color="danger"
          :disabled="!currentPanorama?.path"
          >{{ $t("pages.admin.organisations.view.locations.panorama.deleteBtn") }}</ion-button
        >
      </ion-row>
    </div>
  </div>
  <PanoramaModal
    v-if="state.selectedHotspot?.hotspotId"
    :modalOpen="state.editModalOpen"
    :spaceId="spaceId"
    :devices="devices"
    :selectedHotspot="state.selectedHotspot"
    :handleDismiss="
      () => {
        state.editModalOpen = false;
        state.selectedHotspot = {} as Hotspot;
      }
    "
    :deleteHotspotFromViewer="(hotspotId: string) => viewer.removeHotSpot(hotspotId)"
    :drawHotspot="drawHotspot"
  />
</template>

<script setup lang="ts">
import {
  IonRow,
  IonCol,
  IonChip,
  IonButton,
  IonLabel,
  IonIcon,
} from "@ionic/vue";
import { locationOutline, peopleOutline, locate } from "ionicons/icons";
import "pannellum";
import "pannellum/build/pannellum.css";
import { storeToRefs } from "pinia";
import { Spaces } from "@/stores/adminSpaces";
import { onBeforeMount, watch, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { Hotspot } from "@/types";
import PanoramaModal from "@/components/admin/spaces/PanoramaModal.vue";
import toastService from "@/services/toastService";

const route = useRoute();

const spaceId = route.params.spaceId as string;
const Space = Spaces();
const { space, currentPanorama, devices } = storeToRefs(Space);

const state = reactive({
  newPanorama: {
    fileName: "",
    contentType: "",
    base64ImagePayload: "",
    initialViewPitch: 0,
    initialViewYaw: 0,
    initialViewHfov: 0,
  },
  editModalOpen: false,
  selectedHotspot: {} as Hotspot,
});

let viewer: any;
let click: any;
let panoramaRendered = false;

watch(currentPanorama, (newValue) => {
  if (newValue?.path) setupPanorama();
});

const hotspotClicked = (event: MouseEvent, args: { id: string }) => {
  const selectedHotspot = currentPanorama.value.hotspots.find(
    (h) => h.hotspotId === args.id
  );
  if (selectedHotspot) {
    state.selectedHotspot = selectedHotspot;
    viewer.setPitch(selectedHotspot?.pitch);
    viewer.setYaw(selectedHotspot?.yaw);
    state.editModalOpen = true;
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
    // panorama: "img/admin/mockPanorama.jpeg",
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

  const startClick = (e: MouseEvent) => {
    click = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const endClick = (e: MouseEvent) => {
    const movement = {
      x: Math.abs(click.x - e.clientX),
      y: Math.abs(click.y - e.clientY),
    };
    if (movement.x == 0 && movement.y == 0) addHotspot(e);
    click = null;
  };

  viewer.on("mousedown", startClick);
  viewer.on("mouseup", endClick);
  viewer.on("load", drawHotspots);
  if (currentPanorama?.value?.initialViewPitch)
    viewer.setPitch(currentPanorama.value.initialViewPitch);
  if (currentPanorama?.value?.initialViewYaw)
    viewer.setPitch(currentPanorama.value.initialViewYaw);
  if (currentPanorama?.value?.initialViewHfov)
    viewer.setPitch(currentPanorama.value.initialViewHfov);

  const addHotspot = (event: MouseEvent) => {
    if (event.movementX > 0 || event.movementY > 0) return;
    const location = viewer.mouseEventToCoords(event);
    const newHotspot: Hotspot = {
      hotspotId: crypto.randomUUID(),
      pitch: location[0],
      yaw: location[1],
      text: "New hotspot",
      type: "device",
    };
    Space.addHotspot(spaceId, newHotspot).then((res) => {
      drawHotspot(res);
    });
  };
};

async function onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const base64String = reader.result as string;
    const base64Payload = base64String.split(",")[1];
    state.newPanorama.fileName = file.name;
    state.newPanorama.contentType = file.type;
    state.newPanorama.base64ImagePayload = base64Payload;
    if (currentPanorama?.value?.path) {
      Space.updatePanorama(spaceId, state.newPanorama);
    } else {
      Space.addPanorama(spaceId, state.newPanorama);
    }
  };
}

const deletePanorama = async () => {
  Space.deletePanorama(spaceId).then(() => {
    panoramaRendered = false;
    location.reload();
  });
};

const setInitialView = () => {
  Space.setInitialView(viewer.getPitch(), viewer.getYaw(), viewer.getHfov());
  toastService.show("Success", "View was set to starting point", "success", "bottom");
};

onBeforeMount(() => {
  if (space.value?.id !== spaceId) {
    Space.getSpaceDetails(spaceId);
  }
  Space.getPanorama(spaceId);
  Space.getSpaceDetailsDevices(spaceId);
});
</script>

<style scoped>
.panorama-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.panorama-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  position: relative;
  padding-top: 20px;
}
.img-container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.header-left {
  margin-left: 20px;
}
.header-left--label {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.header-left--label ion-icon {
  width: 15px;
  height: 15px;
  margin-right: 10px;
}

#pano {
  height: calc(100% + 30px);
  width: calc(100vw - 260px);
  position: absolute;
  overflow: hidden;
  cursor: default;
  left: -30px;
  bottom: -30px;
}
ion-chip {
  --background: #ffffff;
  --color: var(--av-primary);
}
</style>
