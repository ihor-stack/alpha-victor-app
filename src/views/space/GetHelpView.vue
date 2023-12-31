<template>
  <ion-page>
    <app-header>
      <template #start>
        <ion-button fill="clear" @click="handleBack" class="back">
          <span class="font-mono font-size-xs">{{
            $t("pages.space.getHelp.back")
          }}</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content :fullscreen="true">
      <div class="title">
        <ion-item class="ion-no-padding" lines="none">
          <h1 class="title-admin font-bold font-size-lg">
            {{ $t("pages.space.getHelp.title") }}
          </h1>
        </ion-item>
      </div>
      <GetHelpList></GetHelpList>
    </ion-content>
    <ion-footer
      v-if="currentSpace.sosNumberPublic || userPermission.isVipUser"
    >
      <div
        class="sos-container"
        ref="container"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <span class="label">Emergency Call</span>
        <button class="sos-button" :style="{ width: `${swipeDist}px` }">
          <span>SOS</span>
        </button>
      </div>
      <p>Swipe to call Emergency Services</p>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { IonPage, IonContent, IonFooter, IonButton } from "@ionic/vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { Capacitor, Plugins } from "@capacitor/core";
import AppHeader from "@/components/shared/AppHeader.vue";
import GetHelpList from "@/components/space/getHelp/GetHelpList.vue";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
import { useRoute } from "vue-router";
import { Account as useAccountStore } from "@/stores/publicAccount";

const route = useRoute();

const spacesStore = useSpacesStore();
const accountStore = useAccountStore();
const spaceId: string = route.params.spaceId as string;

const { currentSpace } = storeToRefs(spacesStore);
const { userPermission } = storeToRefs(accountStore);

const { Browser } = Plugins;

const router = useRouter();
const handleBack = () => router.back();

const startX = ref<number>(0);
const endX = ref<number>(0);
const container = ref<HTMLDivElement | null>(null);
const button = ref<HTMLElement | null>(null);
const swipeDist = ref(60);

const onTouchStart = (e) => {
  startX.value = e.touches[0].clientX;
  swipeDist.value = 60;
};

const onTouchMove = (e: TouchEvent) => {
  endX.value = e.touches[0].clientX;
  const width = Math.max(endX.value - startX.value, 60);
  const containerWidth = container.value?.offsetWidth;

  if (containerWidth) {
    swipeDist.value = Math.min(width, containerWidth - 20);
  }
};

const onTouchEnd = (e) => {
  const screenWidth = window.innerWidth;
  if (swipeDist.value > screenWidth * 0.6) {
    callPhoneNumber();
  }
  swipeDist.value = 60;
};

async function callPhoneNumber() {
  if (Capacitor.platform === "ios" || Capacitor.platform === "android") {
    await Browser.open({ url: "tel:18001010101" });
  } else {
    window.open("tel:18001010101", "_blank");
  }
}

onBeforeMount(async () => {
  spacesStore.getSpaceDetails(spaceId);
});
</script>

<style scoped>
ion-content {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  flex-grow: 1;
}

ion-footer {
  padding: 25px;
  position: fixed;
  bottom: 0;
}

ion-footer p {
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}

ion-title,
.title-admin {
  width: 100%;
  text-align: center;
}

.sos-container {
  position: relative;
  height: 80px;
  border: 1px solid var(--av-red);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: var(--av-red);
  padding: 10px;
  overflow: hidden;
}

.sos-container .label {
  position: absolute;
  top: 50%;
  margin: auto;
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
  color: var(--av-red);
}

.sos-button {
  position: relative;
  background: var(--av-red);
  color: #fff;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 10px;
  font-size: 20px;
  height: 60px;
  width: 60px;
  padding: 10px;
  transition: transform 0.1s;
  z-index: 999;
}

.sos-button span {
  display: block;
  margin: 0;
  padding: 0;
  text-align: right;
}
</style>
