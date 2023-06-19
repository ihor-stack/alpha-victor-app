<template>
  <div class="panorama-wrapper">
    <div>
      <ion-row class="form-admin--group">
        <ion-col v-if="space.imagePath" size-xs="12" size-sm="2" class="form-admin--group_field">
          <div class="img-container">
            <img :src="space.imagePath || space.photos?.[0]?.path" alt="" />
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
            <ion-icon :icon="locationOutline" color="light"></ion-icon>
            Howard Street Belfast
          </span>
          <span
            class="font-size-xs font-mono color-light-gray header-left--label"
          >
            <ion-icon :icon="peopleOutline" color="light"></ion-icon>
            &gt;&gt; {{ space.capacity }}
          </span>
        </ion-col>
      </ion-row>
    </div>
    <div class="panorama-content">
      <div id="pano" ref="panorama"></div>
      <ion-row>
        <ion-col>
          <ion-chip class="font-size-xs font-mono">
            <ion-icon :icon="locate" color="secondaryContrast" />
            <ion-label>Set starting view</ion-label>
          </ion-chip>
        </ion-col>
      </ion-row>
      <div
        v-for="hotspot in currentPanorama?.hotspots"
        :key="hotspot.hotspotId"
        :id="hotspot.hotspotId"
        class="hotspot"
        :style="{
          display: state.panoramaRendered ? 'block' : 'none',
        }"
      >
        <div class="hotspotContent">
          <div class="dotContainer">
            <div class="dot" @mouseup="hotspotClicked(hotspot, $event)">
              <img src="img/av.svg" />
            </div>
          </div>
          <div class="label" v-if="hotspot.type == 'annotation'">
            {{ hotspot.text }}
          </div>
          <div
            class="label"
            v-if="hotspot.type == 'device' && hotspot.deviceId"
          ></div>
        </div>
      </div>
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
          >Delete panorama</ion-button
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
import * as Marzipano from "marzipano";
import { storeToRefs } from "pinia";
import { Spaces } from "@/stores/adminSpaces";
import { onBeforeMount, computed, watch, nextTick, reactive } from "vue";
import { useRoute } from "vue-router";
import { Hotspot } from "@/types";
import PanoramaModal from "@/components/admin/spaces/PanoramaModal.vue";

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
  panoramaRendered: false,
});
const options = {
  controls: {
    mouseViewMode: "drag",
  },
};
const deg2rad = (degrees: number) => {
  return (Math.PI / 180) * degrees;
};

const viewer = computed(
  () => new Marzipano.Viewer(document.getElementById("pano"), options)
);
const source = computed(() =>
  Marzipano.ImageUrlSource.fromString(currentPanorama?.value?.path)
);

const limiter = Marzipano.RectilinearView.limit.hfov(deg2rad(60), deg2rad(100));
const geometry = new Marzipano.EquirectGeometry([{ width: 1000 }]);

let scene: any;
let view: any;
let clickedX = 0;
let clickedY = 0;

watch(currentPanorama, (newValue) => {
  if (newValue?.path) setupPanorama();
});

const setupPanorama = () => {
  view = new Marzipano.RectilinearView(
    {
      yaw: currentPanorama?.value?.initialViewYaw,
      pitch: currentPanorama?.value?.initialViewPitch,
      fov: currentPanorama?.value?.initialViewHfov,
    },
    limiter
  );

  scene = viewer.value.createScene({
    source: source.value,
    geometry: geometry,
    view: view,
  });

  if (currentPanorama?.value?.path) scene.switchTo();
  setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
  }, 10);

  const layer = scene.layer();
  const store = layer.textureStore();

  const drawHotspot = (hotspot: Hotspot, isDegs = false) => {
    scene
      .hotspotContainer()
      .createHotspot(document.getElementById(hotspot.hotspotId), {
        yaw: isDegs ? deg2rad(hotspot.yaw) : hotspot.yaw,
        pitch: isDegs ? deg2rad(hotspot.pitch) : hotspot.pitch,
      });
    state.panoramaRendered = true;
  };

  const panoClicked = async (x: number, y: number) => {
    const loc = view.screenToCoordinates({
      x: x,
      y: y,
    });
    const newHotspot: Hotspot = {
      hotspotId: crypto.randomUUID(),
      pitch: loc.pitch,
      yaw: loc.yaw,
      text: "New hotspot",
      type: "device",
    };
    Space.addHotspot(spaceId, newHotspot).then((res) => {
      drawHotspot(res);
    });
  };

  store.addEventListener("textureLoad", () => {
    nextTick(() => {
      currentPanorama?.value?.hotspots?.forEach((hotspot) => {
        drawHotspot(hotspot);
      });
    });
  });

  const mouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    clickedX = e.offsetX;
    clickedY = e.offsetY;
  };

  const mouseUp = (e: MouseEvent) => {
    if (
      Math.abs(e.offsetX - clickedX) < 6 &&
      Math.abs(e.offsetY - clickedY) < 6
    ) {
      panoClicked(e.offsetX, e.offsetY);
      return;
    }
  };

  const pano = document.getElementById("pano");
  if (pano) {
    pano.addEventListener("mousedown", mouseDown);
    pano.addEventListener("mouseup", mouseUp);
    pano.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
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
  Space.deletePanorama(spaceId);
  setupPanorama();
  viewer.value.destroyAllScenes();
};

const hotspotClicked = (hostpot: Hotspot, event: Event) => {
  event.stopPropagation();
  state.selectedHotspot = hostpot;
  state.editModalOpen = true;
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
.hotspot {
  width: 80px;
  margin-left: -40px;
  margin-top: -15px;
  transition: margin-top 0s 0.1s;
  position: relative;
}
.hotspot:hover {
  margin-top: -20px;
  transition: margin-top 0.3s 0s;
}

.hotspotContent {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.hotspotContent .dot {
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: width 0s 0.1s, height 0s 0.1s;
  border: none;
  display: block;
}
.hotspotContent .dot img {
  width: 100%;
}
.hotspot:hover .dot {
  width: 30px;
  height: 30px;
  transition: width 0.3s 0s, height 0.3s 0s;
}

.hotspotContent .label {
  margin-top: 5px;
  background: rgba(var(--ion-color-secondary-contrast-rgb), 0.9);
  padding: 3px;
  border-radius: 3px;
  color: var(--ion-color-secondary);
  text-align: center;
  text-transform: uppercase;
  font-family: Bold;
  font-size: 0.6em;
  line-height: 0.9em;
  opacity: 0;
  transition: opacity 0.3s;
}

.hotspot .label.error {
  opacity: 1;
  background: rgba(var(--ion-color-warning-rgb), 0.9);
  color: var(--ion-color-warning-contrast);
}

.hotspot:hover .label {
  opacity: 1;
  transition: opacity 0.3s 0.3s;
}
</style>
