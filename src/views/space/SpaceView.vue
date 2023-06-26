<template>
  <ion-page>
    <app-header :no-background="true">
      <template #start>
        <ion-button
          fill="clear"
          size="small"
          class="back"
          @click="() => router.back()"
        >
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
      <template #end>
        <ion-button
          fill="clear"
          size="small"
          class="favourite"
          @click="setFavoriteSpace"
        >
          <ion-icon
            slot="icon-only"
            :icon="isFavourite ? heart : heartOutline"
          />
        </ion-button>
      </template>
    </app-header>
    <ion-content :fullscreen="true" :scroll-y="false">
      <div class="outer-container">
        <div class="space-header">
          <div class="space-header__background">
            <img
              :src="currentSpace.imagePath"
              class="space-header__background__image"
            />
            <div class="space-header__background__gradient"></div>
          </div>
          <div class="space-header__foreground">
            <div class="space-header__info">
              <div class="space-header__info__left">
                <div class="capacity">
                  <img src="@/theme/icons/capacity.svg" class="capacity-icon" />
                  <span
                    class="capacity-number color-light-gray font-size-xxs font-mono"
                    >&gt;&gt;{{ currentSpace.capacity }}</span
                  >
                </div>
                <h1 class="name font-bold color-light-gray">
                  {{ currentSpace.name }}
                </h1>
                <div class="location">
                  <img src="@/theme/icons/location.svg" class="icon" />
                  <span class="font-mono font-size-xxs color-light-gray">{{
                    currentSpace.floorName
                  }}</span>
                </div>
              </div>
              <div class="space-header__info__right">
                <ion-button
                  size="small"
                  fill="clear"
                  class="icon-360"
                  :href="`/panorama/${spaceId}`"
                >
                  <img src="@/theme/icons/360.svg" />
                </ion-button>
                <occupied-status :occupied="currentSpace.occupied" />
              </div>
            </div>
          </div>
        </div>

        <div class="space-features-slider-container">
          <space-features-slider :features="currentSpace.spaceFeatures" />
        </div>

        <div v-if="currentSpace.showWifi" class="space-wifi-info-container">
          <space-wi-fi-info
            :wifiNetwork="currentSpace.wifiNetwork"
            :wifiPassword="currentSpace.wifiPassword"
            :wifiSecurityType="currentSpace.wifiSecurityType"
          />
        </div>

        <div class="space-options-menu-container">
          <space-options-menu
            :currentSpace="currentSpace"
            :showDevices="devices.length ? true : false"
          />
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <div class="space-cta-container">
        <div class="announcement" v-if="currentSpace.announcementTitle">
          <h4 class="color-light-gray">{{ currentSpace.announcementTitle }}</h4>
          <p class="color-light-gray">
            {{ currentSpace.announcementText }}
          </p>
        </div>

        <div class="ctas">
          <ion-button
            color="light"
            expand="block"
            @click="state.reportIssueModalOpen = true"
          >
            Report Issue
          </ion-button>
          <ion-button expand="block">Give Feedback</ion-button>
        </div>
      </div>
    </ion-footer>
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
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount, computed, reactive } from "vue";
import {
  IonPage,
  IonContent,
  IonButton,
  IonFooter,
  IonIcon,
  IonModal,
} from "@ionic/vue";
import { heartOutline, heart } from "ionicons/icons";
import { useRoute, useRouter } from "vue-router";
import AppHeader from "@/components/shared/AppHeader.vue";
import OccupiedStatus from "@/components/shared/OccupiedStatus.vue";
import SpaceFeaturesSlider from "@/components/space/SpaceFeaturesSlider.vue";
import SpaceWiFiInfo from "@/components/space/SpaceWiFiInfo.vue";
import SpaceOptionsMenu from "@/components/space/SpaceOptionsMenu.vue";
import { storeToRefs } from "pinia";
import ReportIssueModal from "@/components/modals/ReportIssueModal.vue";

import { Spaces as useSpacesStore } from "@/stores/publicSpaces";

const route = useRoute();
const router = useRouter();
const spacesStore = useSpacesStore();
const spaceId: string = route.params.spaceId as string;

const state = reactive({
  reportIssueModalOpen: false,
});

const { currentSpace } = storeToRefs(spacesStore);
const { devices } = storeToRefs(spacesStore);

const isFavourite = computed(() =>
  spacesStore.favouriteSpaces?.some((item) => item.id === spaceId)
);
const setFavoriteSpace = () => {
  spacesStore.setFavouriteSpace(spaceId, !isFavourite.value);
};

onBeforeMount(() => {
  if (spacesStore.currentSpace?.id !== spaceId) {
    spacesStore.getSpaceDetails(spaceId);
    spacesStore.getSpaceDevices(spaceId);
  }
  spacesStore.setRecentlyViewedSpace(spaceId);
});
</script>

<style scoped>
.outer-container {
  display: flex;
  flex-direction: column;
  background: none;
}

.space-header {
  flex: 0 0 28vh;
  position: relative;
}

.space-header__background,
.space-header__foreground {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.space-header__background img {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.space-header__background__gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
}

.space-header__foreground {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 0 24px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.back {
  --padding-start: 0;
  --padding-top: 0;
  --padding-bottom: 0;
}

.favourite {
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  min-height: 50px;
}

.space-header__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 30px;
}

.space-header__info__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.capacity {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.capacity img {
  margin-right: 4px;
}

.name {
  font-size: 28px;
}

.location {
  display: flex;
  align-items: center;
}

.location .icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 4px;
}

.icon-360 {
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  margin: 0 0 12px 0;
}

.space-features-slider-container {
  padding-left: 30px;
}

.space-wifi-info-container {
  padding: 24px 30px 0px;
}

.space-options-menu-container {
  flex: 1;
  padding: 10px 30px 0;
}

.space-cta-container {
  flex: 0 0 20vh;
  padding: 0 30px 20px;
}

.announcement {
  background: #181818;
  border: 0.75px solid #313131;
  border-radius: 4px;
  color: #ffffff;
  padding: 14px 12px;
  margin-bottom: 12px;
}

.announcement h4 {
  margin-bottom: 4px;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
}

.announcement p {
  font-size: 10px;
  line-height: 16px;
}

.ctas {
  display: flex;
}

.ctas ion-button {
  flex: 1;
  font-size: 15px;
}

.ctas ion-button:not(:last-of-type) {
  margin-right: 12px;
}
</style>
