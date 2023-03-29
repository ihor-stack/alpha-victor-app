<template>
  <ion-page>
    <app-header :no-background="true">
      <template #start>
        <ion-button fill="clear" color="light" size="small" class="back" @click="() => router.back()">
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
      <template #end>
        <ion-button fill="clear" size="small" class="favourite">
          <img src="@/theme/icons/favourite.svg" class="nav-menu" alt="Nav Menu Button" />
        </ion-button>
      </template>
    </app-header>
    <ion-content :fullscreen="true">
      <div class="outer-container">
        <div class="space-header">
          <div class="space-header__background">
            <img src="@/theme/img/space-the-johnson-large.jpg" class="space-header__background__image" />
            <div class="space-header__background__gradient"></div>
          </div>
          <div class="space-header__foreground">
            <div class="space-header__info">
              <div class="space-header__info__left">
                <div class="capacity">
                  <img src="@/theme/icons/capacity.svg" class="capacity-icon" />
                  <span class="capacity-number color-light-gray font-size-xxs font-mono">&gt;&gt;10</span>
                </div>
                <h1 class="name font-bold color-light-gray">
                  {{ space.spaceName }}
                </h1>
                <div class="location">
                  <img src="@/theme/icons/location.svg" class="icon" />
                  <span class="font-mono font-size-xxs color-light-gray">{{
                    space.location
                  }}</span>
                </div>
              </div>
              <div class="space-header__info__right">
                <ion-button size="small" fill="clear" class="icon-360">
                  <img src="@/theme/icons/360.svg" />
                </ion-button>
                <occupied-status :occupied="space.occupied" />
              </div>
            </div>
          </div>
        </div>

        <!-- Space features slider -->
        <div class="space-features-slider-container">
          <space-features-slider :features="space.spaceFeatures" />
        </div>
        <!-- Space WIFI details -->
        <div class="space-wifi-info-container">
          <space-wi-fi-info />
        </div>
        <!-- Space options menu -->
        <div class="space-options-menu-container">
          <space-options-menu :issues="space.issues" />
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <div class="space-cta-container">
        <button type="button" class="sos-button">
          <div class="icon"></div>
          <div>
            <span class="text">Call SOS</span>
          </div>
        </button>

        <div class="ctas">
          <ion-button expand="block">Give Feedback</ion-button>
          <ion-button 
            color="light" 
            expand="block" 
            @click="() => router.push({ name: 'ReportIssue' })"
          >
            Report Issue
          </ion-button>
        </div>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonFooter } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import OccupiedStatus from "@/components/shared/OccupiedStatus.vue";
import SpaceFeaturesSlider from "@/components/space/SpaceFeaturesSlider.vue";
import SpaceWiFiInfo from "@/components/space/SpaceWiFiInfo.vue";
import SpaceOptionsMenu from "@/components/space/SpaceOptionsMenu.vue";
import { Space } from "@/types";
import { useRouter } from "vue-router";

const router = useRouter();

const space: Space = {
  shortCode: 1,
  spaceType: "Conference Room",
  spaceName: "The Johnson",
  occupied: true,
  capacity: 10,
  imageUrl: "space-the-johnson.jpg",
  location: "2b.ground.floor",
  spaceFeatures: [
    {
      name: "Smart TV",
      category: "screen",
    },
    {
      name: "WiFi",
      category: "wifi",
    },
    {
      name: "Phone",
      category: "phone",
    },
    {
      name: "Presenting",
      category: "presenting",
    },
  ],
  issues: [
    {
      title: "WiFi signal poor",
      status: 1,
      comment: "Router needs upgraded",
      log: ["Constant drop-outs on video calls"],
    },
  ],
};
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

.sos-button {
  background: rgba(255, 55, 55, 0.075);
  border: 0.75px solid #ff3737;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 28px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #ff3737;
  padding: 10px 18px;
}

.sos-button:active {
  background: #ff3737;
}

.sos-button span {
  display: inline-block;
  font-size: 14px;
  line-height: 14px;
  vertical-align: sub;
}

.sos-button .icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: no-repeat center/cover url("@/theme/icons/danger.svg");
  margin-right: 9px;
}

.sos-button:active span {
  color: #000000;
}

.sos-button:active .icon {
  background: no-repeat center/cover url("@/theme/icons/danger-black.svg");
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
