<template>
  <ion-page id="dashboard" class="outer-container">
    <app-header :no-background="true">
      <template #start>
        <ion-button
          fill="clear"
          color="light"
          class="switch-organisation"
          @click="state.modalOpen = true"
        >
          <img
            src="@/theme/icons/switch-location.svg"
            alt="Switch Organisation"
          />
        </ion-button>
      </template>
      <template #end>
        <ion-menu-button fill="clear">
          <img
            src="@/theme/icons/nav-menu.svg"
            class="nav-menu"
            alt="Nav Menu Button"
          />
        </ion-menu-button>
      </template>
    </app-header>
    <ion-content :scroll-y="false">
      <div class="dashboard-search-container">
        <dashboard-search />
      </div>
      <div class="dashboard-sliders" v-if="recentlyViewedSpaces?.length">
        <div class="dashboard-slider-container">
          <dashboard-slider
            title="Recently viewed"
            cta-url="/recently-viewed"
            :slides="recentlyViewedSpaces"
          />
        </div>
      </div>
      <ion-item v-else lines="none">
        <ion-label>
          <h1>no.spaces.found</h1>
          <p>Please enter a short code or explore spaces.</p>
        </ion-label>
      </ion-item>
    </ion-content>
    <ion-footer class="ion-no-border">
      <ion-button expand="block" @click="exploreSpaces"
        >Explore Spaces</ion-button
      >
    </ion-footer>
    <ion-modal
      :is-open="state.modalOpen"
      :initial-breakpoint="0.4"
      :breakpoints="[0, 0.4]"
      @willDismiss="handleDismiss"
    >
      <organisation-select-modal :handleDismiss="handleDismiss" />
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, computed } from "vue";
import {
  IonPage,
  IonContent,
  IonFooter,
  IonButton,
  IonMenuButton,
  IonModal,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import DashboardSearch from "@/components/dashboard/DashboardSearch.vue";
import DashboardSlider from "@/components/dashboard/DashboardSlider.vue";
import OrganisationSelectModal from "@/components/modals/OrganisationSelectModal.vue";
import { useRouter } from "vue-router";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";

const router = useRouter();
const spacesStore = useSpacesStore();
const organisationStore = useOrganisationStore();

interface State {
  modalOpen: boolean;
}

const state: State = reactive({
  modalOpen: false,
});

const handleDismiss = () => {
  state.modalOpen = false;
};

const exploreSpaces = () => {
  router.push({ name: "FindSpace" });
};

const recentlyViewedSpaces = computed(
  () => spacesStore.recentlyViewedSpaces || []
);

onBeforeMount(() => {
  spacesStore.getFavouriteSpaces();
  spacesStore.getRecentlyViewedSpaces();
  organisationStore.getOrganisations();
});
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
ion-item {
  --background: transparent;
  text-align: center;
}
</style>
