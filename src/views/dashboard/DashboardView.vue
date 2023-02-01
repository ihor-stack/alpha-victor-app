<template>
  <ion-page>
    <ion-content>
      <div class="outer-container">
        <header>
          <ion-button fill="clear" color="light">
            <span class="font-mono font-size-xs">&lt;&lt; back</span>
          </ion-button>
          <img src="@/theme/img/logo/logo-without-name.svg" class="logo" alt="AlphaVictor logo" />
          <ion-button fill="clear">
            <img src="@/theme/icons/nav-menu.svg" class="nav-menu" alt="Nav Menu Button" />
          </ion-button>
        </header>
        <div class="dashboard-search-container">
          <dashboard-search />
        </div>
        <div class="dashboard-sliders">
          <div class="dashboard-slider-container">
            <dashboard-slider title="Recently Viewed" cta-url="/" :slides="spaces" />
          </div>
          <div class="dashboard-slider-container">
            <dashboard-slider title="My Favourites" cta-url="/" :slides="spaces" />
          </div>
        </div>
        <div class="cta-container">
          <ion-button expand="block">Explore Spaces</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent, IonButton } from "@ionic/vue";
  import DashboardSearch from "@/components/dashboard/DashboardSearch.vue";
  import DashboardSlider from "@/components/dashboard/DashboardSlider.vue";
  import { Space } from "@/types";

  const spaces: Space[] = [
    {
      shortCode: 1,
      spaceType: 'Conference Room',
      spaceName: 'The Johnson',
      occupied: true,
      capacity: 10,
      imageUrl: 'space-the-johnson.jpg'
    },
    {
      shortCode: 2,
      spaceType: 'Conference Room',
      spaceName: 'The Henderson',
      occupied: false,
      capacity: 10,
      imageUrl: 'space-the-henderson.jpg'
    },
    {
      shortCode: 3,
      spaceType: 'Meeting Room',
      spaceName: 'The Red Room',
      occupied: true,
      capacity: 8,
      imageUrl: 'space-the-red-room.jpg'
    }
  ]
</script>

<style scoped>

.outer-container {
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 12vh;
}

.dashboard-search-container {
  padding: 0 32px 32px;
}

.dashboard-sliders {
  flex: 1;
}

.dashboard-slider-container:not(:last-of-type) {
  margin-bottom: 32px;
}

.cta-container {
  padding: 0 32px;
  flex: 0 0 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>