<template>
  <ion-page class="ion-bg" id="organisation-edit">
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
            <h1 class="title-pad">LinkedIn</h1>
            <h2 class="ion-padding-bottom sub-head">
              LinkedIn &nbsp;>>&nbsp; Edit
            </h2>
            <ion-item
              lines="full"
              href="/organisation-edit-details"
              detail="true"
              :detailIcon="chevronForwardOutline"
              class="ion-bg"
            >
              <ion-label>Details</ion-label>
            </ion-item>
            <ion-item
              lines="full"
              href="/organisation-edit/#"
              detail="true"
              :detailIcon="chevronForwardOutline"
              class="ion-bg"
            >
              <ion-label>Theme</ion-label>
            </ion-item>
            <ion-item
              lines="full"
              href="/organisation-edit/#"
              detail="true"
              :detailIcon="chevronForwardOutline"
              class="ion-bg"
            >
              <ion-label>Space Metadata</ion-label>
            </ion-item>
            <ion-item
              lines="full"
              href="/organisation-edit/#"
              detail="true"
              :detailIcon="chevronForwardOutline"
              class="ion-bg"
            >
              <ion-label>Document Types</ion-label>
            </ion-item>
            <ion-item
              lines="full"
              href="/organisation-edit/#"
              detail="true"
              :detailIcon="chevronForwardOutline"
              class="ion-bg"
            >
              <ion-label>Decision Trees</ion-label>
            </ion-item>
            <ion-item
              lines="full"
              href="/organisation-edit/#"
              detail="true"
              :detailIcon="chevronForwardOutline"
              class="ion-bg"
            >
              <ion-label>Integrations</ion-label>
            </ion-item>
            <ion-item
              lines="none"
              href="/organisation-edit/#"
              detail="true"
              :detailIcon="chevronForwardOutline"
              class="ion-bg"
            >
              <ion-label>Locations</ion-label>
            </ion-item>
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
import { chevronForwardOutline } from "ionicons/icons";
import DesktopNav from "@/components/shared/DesktopNav.vue";
import OrganisationsSelect from "@/components/admin/OrganisationsSelect.vue";
import { Organisation } from "@/types";
import { useRouter } from "vue-router";

const router = useRouter();

const organisations: Organisation[] = [
  {
    shortCode: 1,
    organisationType: "Conference Room",
    organisationName: "The Johnson",
    occupied: true,
    capacity: 10,
    imageUrl: "space-the-johnson.jpg",
    organisationFeatures: [],
    issues: [],
  },
];

const exploreOrgnistion = () => {
  router.push({ name: "Organisation" });
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
.sub-head {
  font-size: 10px;
  color: #767676;
  margin-left: 45px;
}
.back-pos {
  /* margin-left: -15px; */
  padding-bottom: 10px;
  text-transform: lowercase;
}
.title-pad {
  padding-left: 15px;
}
.sub-head {
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
