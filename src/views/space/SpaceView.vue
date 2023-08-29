<template>
  <ion-page>
    <app-header :no-background="true">
      <template #start>
        <ion-button
          fill="clear"
          size="small"
          class="back color-light-gray"
          @click="() => router.back()"
        >
          <span class="font-mono font-size-xs">{{
            $t("pages.space.space.back")
          }}</span>
        </ion-button>
      </template>
      <template #end>
        <ion-button
          fill="clear"
          size="small"
          class="favourite color-light-gray"
          v-if="!isGuestUser"
          @click="setFavoriteSpace"
        >
          <ion-icon
            slot="icon-only"
            :icon="isFavourite ? heart : heartOutline"
          />
        </ion-button>
      </template>
    </app-header>
    <ion-content
      v-if="!state.isLoadingSpaceDetails"
      :fullscreen="true"
      class="fade-in"
    >
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
                  v-if="currentSpace.panoramaId"
                  size="small"
                  fill="clear"
                  class="icon-360"
                  :href="`/panorama/${spaceId}`"
                >
                  <img src="@/theme/icons/360.svg" />
                </ion-button>
                <occupied-status
                  v-if="currentSpace.occupied"
                  :occupied="currentSpace.currentOccupancy !== 0"
                  :currentOccupancy="currentSpace.currentOccupancy"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="space-features-slider-container"
          v-if="
            currentSpace &&
            currentSpace.spaceFeatures &&
            currentSpace.spaceFeatures.length
          "
        >
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
            :showPhotos="
              currentSpace.photos && currentSpace.photos.length > 1
                ? true
                : false
            "
            :showDocuments="documents.length ? true : false"
          />
        </div>
      </div>
    </ion-content>
    <ion-footer v-if="!state.isLoadingSpaceDetails">
      <div class="space-cta-container">
        <ion-item
          class="announcement ion-no-padding"
          text-wrap
          lines="none"
          v-if="currentSpace.announcementTitle"
        >
          <ion-label text-wrap="true">
            <h4 class="wrap-text">{{ currentSpace.announcementTitle }}</h4>
            <p class="wrap-text">
              {{ currentSpace.announcementText }}
            </p>
          </ion-label>
        </ion-item>

        <div class="ctas">
          <ion-button
            expand="block"
            @click="state.reportIssueModalOpen = true"
            v-if="!isGuestUser"
          >
            {{ $t("pages.space.space.reportIssue") }}
          </ion-button>

          <ion-button
            v-if="currentSpace.typeformId"
            expand="block"
            color="dark"
            @click="goToFeedback"
          >
            {{ $t("pages.space.space.giveFeedback") }}
          </ion-button>
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
import { onBeforeMount, watch, computed, reactive } from "vue";
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
import ReportIssueModal from "@/components/modals/ReportIssueModal.vue";
import { storeToRefs } from "pinia";
import mixpanel from "mixpanel-browser";

import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
import { Account as useAccountStore } from "@/stores/publicAccount";

const route = useRoute();
const router = useRouter();
const spacesStore = useSpacesStore();
const accountStore = useAccountStore();

const spaceId: string = route.params.spaceId as string;
const isGuestUser = computed(() => accountStore.userPermission.isGuest);

const state = reactive({
  reportIssueModalOpen: false,
  isLoadingSpaceDetails: false,
});

const { currentSpace, documents } = storeToRefs(spacesStore);
const { devices } = storeToRefs(spacesStore);

const isFavourite = computed(() =>
  spacesStore.favouriteSpaces?.some((item) => item.id === spaceId)
);

const setFavoriteSpace = () => {
  spacesStore.setFavouriteSpace(spaceId, !isFavourite.value);
};

const goToFeedback = () => {
  router.push({ name: "Feedback" });
};

const checkSpaceAccess = () => {
  if (
    currentSpace.value &&
    currentSpace.value.organisationAnonymousAccess === false &&
    isGuestUser.value
  ) {
    currentSpace.value;
    router.push({ name: "NoSpacesFound" });
  }
};

watch(currentSpace, () => {
  checkSpaceAccess();
});

onBeforeMount(() => {
  const from = route.query?.from;
  const trackKey = from === "byQR" ? "QR Code Scanned" : "Space Viewed";

  state.isLoadingSpaceDetails = true; // Set to loading when starting fetch
  if (spacesStore.currentSpace?.id !== spaceId) {
    spacesStore.getSpaceDetails(spaceId).then((res) => {
      if (res?.name) {
        mixpanel.track(trackKey, {
          organisaLon: res.organisationName,
          location: res.locationName,
          ﬂoor: res.floorName,
          space: res.name,
        });
      }
      state.isLoadingSpaceDetails = false; // Set to false once fetch is complete
    });
    spacesStore.getSpaceDevices(spaceId);
    spacesStore.getSpaceDocuments(spaceId);
  } else {
    checkSpaceAccess();
    state.isLoadingSpaceDetails = false; // Set to false if no fetch needed

    mixpanel.track(trackKey, {
      organisaLon: spacesStore.currentSpace.organisationName,
      location: spacesStore.currentSpace.locationName,
      ﬂoor: spacesStore.currentSpace.floorName,
      space: spacesStore.currentSpace.name,
    });
  }

  if (!isGuestUser.value) {
    spacesStore.setRecentlyViewedSpace(spaceId);
  }
});
</script>

<style scoped>
.outer-container {
  display: flex;
  flex-direction: column;
  background: none;
  height: 100%;
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
  padding: 0 20px;
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
  padding-left: 20px;
}

.space-wifi-info-container {
  padding: 0 20px;
}

.space-options-menu-container {
  flex: 1;
  padding: 10px 20px 0;
}

.space-cta-container {
  flex: 0 0 20vh;
  padding: 15px;
}

ion-footer {
  padding: 8px 15px;
}

.announcement {
  background: var(--av-red);
  border-radius: 4px;
  padding: 4px 12px;
  margin-bottom: 12px;
  color: #fff;
}

.announcement .item-inner {
  border: none !important;
}

.announcement h4 {
  margin-bottom: 6px;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: -0.02rem;
}

.announcement p {
  font-size: 12px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.75);
}

.ctas {
  display: flex;
}

.ctas ion-button {
  flex: 1;
}

.ctas ion-button:not(:last-of-type) {
  margin-right: 12px;
}

ion-content {
  --offset-bottom: 0px !important;
}

.outer-container:before {
  background-image: none;
}
</style>
