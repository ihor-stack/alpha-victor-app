<template>
  <ion-page class="ion-bg" id="admin">
    <ion-grid>
      <ion-row>
        <ion-col class="col-nav">
          <desktop-nav />
        </ion-col>
        <ion-col>
          <ion-content class="col-content ion-padding" :scroll-y="false">
            <ion-button
              class="back-pos"
              fill="clear"
              color="light"
              @click="() => router.back()"
            >
              <span class="font-mono font-size-xs">&lt;&lt; back</span>
            </ion-button>
            <h1 class="ion-padding-bottom">Organisations</h1>
            <router-link to="#">
              <ion-item
                lines="full"
                href="#"
                detail="true"
                :detailIcon="chevronForwardOutline"
                class="ion-bg"
              >
                <ion-thumbnail class="ion-img" slot="start">
                  <img
                    class="org-logo"
                    src="@/theme/img/mclaren.svg"
                    alt="mclaren"
                  />
                </ion-thumbnail>
                <ion-label>McLaren</ion-label>
              </ion-item>
            </router-link>
            <router-link to="/admin/orgnisation-edit">
              <ion-item
                lines="full"
                href="#"
                detail="true"
                :detailIcon="chevronForwardOutline"
                class="ion-bg"
              >
                <ion-thumbnail class="ion-img" slot="start">
                  <img
                    class="org-logo"
                    src="@/theme/img/linkedin.svg"
                    alt="linkedin"
                  />
                </ion-thumbnail>
                <ion-label>LinkedIn</ion-label>
              </ion-item>
            </router-link>
            <router-link to="#">
              <ion-item
                href="#"
                detail="true"
                :detailIcon="chevronForwardOutline"
                class="ion-bg"
                lines="none"
              >
                <ion-thumbnail class="ion-img" slot="start">
                  <img
                    class="org-logo"
                    src="@/theme/img/apple.svg"
                    alt="apple"
                  />
                </ion-thumbnail>
                <ion-label>Apple</ion-label>
              </ion-item>
            </router-link>
          </ion-content>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonThumbnail,
} from "@ionic/vue";
import { reactive, watch } from "vue";
import { chevronForwardOutline } from "ionicons/icons";
import DesktopNav from "@/components/shared/DesktopNav.vue";
import OrganistionsSelect from "@/components/admin/OrganisationsSelect.vue";
import { Organisation } from "@/types";
import { useRouter } from "vue-router";

const router = useRouter();

// const organisations: Organisation[] = [
//   {
//     shortCode: 1,
//     organisationType: "Conference Room",
//     organisationName: "The Johnson",
//     occupied: true,
//     capacity: 10,
//     imageUrl: "space-the-johnson.jpg",
//     organisationFeatures: [],
//     issues: [],
//   },
// ];

interface State {
  modalOpen: boolean;
  selectedOption: string | undefined;
}

const state: State = reactive({
  modalOpen: false,
  selectedOption: undefined,
});

const handleUrlChange = (url: string) => {
  router.push({ path: url });
  state.modalOpen = true;
};

const exploreOrgnistion = () => {
  router.push({ name: "Organistion" });
};
</script>

<style scoped>
.ion-bg {
  background-color: #000000;
  --ion-item-background: #000000;
  padding-bottom: 15px;
}
ion-col {
  height: 100vh;
}
ion-thumbnail {
  --size: 100%;
}
.item-detail-icon {
  stroke: white !important;
}
.back-pos {
  margin-left: -15px;
  text-transform: lowercase;
}
.ion-img {
  display: flex;
  justify-content: center;
}
.org-logo {
  object-fit: contain;
  width: auto;
  height: 40px;
}
.org-list {
  list-style-type: none;
}
.org-item {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.org-sub {
  display: flex;
  align-content: center;
}
.col-nav {
  width: 30vw;
}
.col-content {
  width: 68vw;
}
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
.switch-location {
  height: 50px;
}

ion-content {
  padding-left: 250px;
  --background: none;
}

ion-footer {
  padding: 20px 32px;
}
.admin-container {
  display: flex;
  justify-content: center;
}
.back {
  margin-top: 2rem;
  margin-left: 21rem;
}
</style>
