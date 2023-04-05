<template>
  <ion-page id="dashboard" class="outer-container">
    <app-header :no-background="true">
      <template #start>
        <ion-button fill="clear" color="light" class="switch-organisation" @click="state.modalOpen = true">
          <img src="@/theme/icons/switch-location.svg" alt="Switch Organisation">
        </ion-button>
      </template>
      <template #end>
        <ion-menu-button fill="clear">
          <img src="@/theme/icons/nav-menu.svg" class="nav-menu" alt="Nav Menu Button" />
        </ion-menu-button>
      </template>
    </app-header>
    <ion-content :scroll-y="false">
      <div class="dashboard-search-container">
        <dashboard-search />
      </div>
      <div class="dashboard-sliders">
        <div class="dashboard-slider-container">
          <dashboard-slider title="Nearby spaces" cta-url="" :slides="spaces" />
        </div>
        <div class="dashboard-slider-container">
          <dashboard-slider title="Recently viewed" cta-url="/recently-viewed" :slides="spaces" />
        </div>
      </div>
    </ion-content>
    <ion-footer class="ion-no-border">
      <ion-button expand="block" @click="exploreSpaces">Explore Spaces</ion-button>
    </ion-footer>
    <ion-modal :is-open="state.modalOpen" :initial-breakpoint="0.4" :breakpoints="[0, 0.4]" @willDismiss="handleDismiss">
      <organisation-select-modal />
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
  import { reactive } from "vue";
  import { IonPage, IonContent, IonFooter, IonButton, IonMenuButton, IonModal } from "@ionic/vue";
  import AppHeader from "@/components/shared/AppHeader.vue";
  import DashboardSearch from "@/components/dashboard/DashboardSearch.vue";
  import DashboardSlider from "@/components/dashboard/DashboardSlider.vue";
  import OrganisationSelectModal from "@/components/modals/OrganisationSelectModal.vue";
  import { Space } from "@/types";
  import { useRouter } from "vue-router";
  const router = useRouter();

  interface State {
    modalOpen: boolean;
  }

  const state: State = reactive({
    modalOpen: false,
  })

  const handleDismiss = () => {
    state.modalOpen = false;
  };

  const spaces: Space[] = [
    {
      shortCode: 1,
      spaceType: 'Conference Room',
      spaceName: 'The Johnson',
      occupied: true,
      capacity: 10,
      imageUrl: 'space-the-johnson.jpg',
      spaceFeatures: [],
      issues: []
    },
    {
      shortCode: 2,
      spaceType: 'Conference Room',
      spaceName: 'The Henderson',
      occupied: false,
      capacity: 10,
      imageUrl: 'space-the-henderson.jpg',
      spaceFeatures: [],
      issues: []
    },
    {
      shortCode: 3,
      spaceType: 'Meeting Room',
      spaceName: 'The Red Room',
      occupied: true,
      capacity: 8,
      imageUrl: 'space-the-red-room.jpg',
      spaceFeatures: [],
      issues: []
    }
  ]

  const exploreSpaces = () => {
    router.push({ name: 'Space' });
  }
</script>

<style scoped>
.outer-container {
  display: flex;
  flex-direction: column;
}
.dashboard-search-container {
  padding: 0 32px 32px;
  background: 0;
}
.dashboard-sliders {
  flex: 1;
}
.dashboard-slider-container:not(:last-of-type) {
  margin-bottom: 32px;
}
.switch-organisation {
  height: 50px;
}

ion-content {
  --background: none;
}

ion-footer {
  padding: 20px 32px;
}
</style>