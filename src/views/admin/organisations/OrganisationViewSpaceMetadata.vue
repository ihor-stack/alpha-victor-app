<template>
  <ion-page class="ion-bg" id="organisation-edit-details">
    <ion-grid>
      <ion-row>
        <ion-col class="col-nav">
          <!-- <desktop-nav /> -->
        </ion-col>
        <ion-col>
          <ion-content
            class="col-content ion-padding-horizontal"
            :scroll-y="false"
          >
            <ion-button
              class="back-pos"
              fill="clear"
              color="light"
              @click="() => router.back()"
            >
              <span class="font-mono font-size-xs">&lt;&lt; back</span>
            </ion-button>
            <h1 class="font-bold font-size-lg color-light-gray">LinkedIn</h1>
            <h2 class="sub-head">
              LinkedIn &nbsp;>>&nbsp; Edit &nbsp;>>&nbsp; Details
            </h2>
            <ion-grid>
              <ion-row>
                <ion-col>
                  <div>
                    <ion-button expand="block">
                      Add new space type +
                    </ion-button>
                  </div>
                  <div>
                    <ion-label color="light">Space Types</ion-label>
                    
                    <ul class="type-options-menu">
                      <li class="type-options-menu-item">
                        <ion-item :router-link="{ name: 'Equipment' }" router-direction="root">
                          <span class="link-text">Room Equipment</span>
                          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
                        </ion-item>
                      </li>
                    </ul>
                    
                  </div>
                </ion-col>
                <ion-col class="padl">
                  <div>
                    <ion-button expand="block">
                      Add new space feature +
                    </ion-button>
                  </div>
                  <div>
                    <ion-label color="light">Space Features</ion-label>
                    <ion-input
                      class="font-size-sm custom-pad"
                      color="light"
                      placeholder="LIN"
                    ></ion-input>
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>
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
  IonInput,
  IonCol,
  IonGrid,
  IonRow,
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
.padl {
  padding-left: 20px;
}
.save-btn {
  padding-top: 10px;
  height: 20px;
  /* width: 35%; */
  width: 210px;
}
ion-input.custom-pad {
  --padding-bottom: 15px;
  --padding-top: 15px;
}

ion-label {
  font-size: 14px;
}
ion-row {
  height: 100%;
}
ion-thumbnail {
  --size: 100%;
}
.input-box {
  padding: 15px 30px;
  margin: 10px 0;
  display: inline-block;
  border: 0.75px solid #313131;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #181818;
}
.sub-head {
  font-size: 10px;
  color: #767676;
  margin-left: 45px;
  padding-bottom: 20px;
}
.back-pos {
  /* margin-left: -15px; */
  padding-bottom: 10px;
  text-transform: lowercase;
}
.title-pad {
  padding-left: 15px;
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
