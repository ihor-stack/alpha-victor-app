<template>
  <ion-page>
    <ion-content>
      <div class="outer-container">
        <div class="space-header">
          <div class="space-header__background">
            <img src="@/theme/img/space-the-johnson-large.jpg" class="space-header__background__image" />
            <div class="space-header__background__gradient"></div>
          </div>
          <div class="space-header__foreground">
            <header>
              <ion-button fill="clear" color="light" size="small" class="back">
                <span class="font-mono font-size-xs">&lt;&lt; back</span>
              </ion-button>
              <img src="@/theme/img/logo/logo-without-name.svg" class="logo" alt="AlphaVictor logo" />
              <ion-button fill="clear" size="small" class="favourite">
                <img src="@/theme/icons/favourite.svg" class="nav-menu" alt="Nav Menu Button" />
              </ion-button>
            </header>
            <div class="space-header__info">
              <div class="space-header__info__left">
                <div class="capacity">
                  <img src="@/theme/icons/capacity.svg" class="capacity-icon" />
                  <span class="capacity-number color-light-gray font-size-xxs font-mono">>>10</span>
                </div>
                <h1 class="name font-bold color-light-gray">{{  space.spaceName  }}</h1>
                <div class="location">
                  <img src="@/theme/icons/location.svg" class="icon" />
                  <span class="font-mono font-size-xxs color-light-gray">{{ space.location }}</span>
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
          <space-options-list :issues="space.issues" />
        </div>
        <!-- Space CTAs -->
        <div class="space-cta-container">
          <ion-button color="danger" fill="outline" expand="block">
            <img src="@/theme/icons/danger.svg" />
            Call SOS
          </ion-button>
          <div>
            <ion-button>Give Feedback</ion-button>
            <ion-button>Report Issue</ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent, IonButton } from "@ionic/vue";
  import OccupiedStatus from "@/components/OccupiedStatus.vue";
  import SpaceFeaturesSlider from "@/components/space/SpaceFeaturesSlider.vue";
  import SpaceWiFiInfo from "@/components/space/SpaceWiFiInfo.vue";
  import SpaceOptionsList from "@/components/space/SpaceOptionsMenu.vue";
  import { Space } from "@/types";

  const space: Space = {
    shortCode: 1,
    spaceType: 'Conference Room',
    spaceName: 'The Johnson',
    occupied: true,
    capacity: 10,
    imageUrl: 'space-the-johnson.jpg',
    location: '2b.ground.floor',
    spaceFeatures: [
      {
        name: "Smart TV",
        category: "screen"
      },
      {
        name: "WiFi",
        category: "wifi"
      },
      {
        name: "Phone",
        category: "phone"
      },
      {
        name: "Presenting",
        category: "presenting"
      }
    ],
    issues: [
      {
        title: 'WiFi signal poor',
        status: 1,
        comment: 'Router needs upgraded',
        log: [
          'Constant drop-outs on video calls'
        ]
      }
    ]
  }
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
  justify-content: space-between;
  padding: 0 30px 24px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header .back {
  --padding-start: 0;
}

header .favourite {
  --padding-end: 0;
}

.space-header__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
  padding: 10px 30px 0;
}

.space-cta-container {
  flex: 0 0 20vh;
  padding: 0 30px;
}
</style>