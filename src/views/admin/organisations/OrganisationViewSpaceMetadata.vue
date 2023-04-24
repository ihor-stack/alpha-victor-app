<template>
  <h1 class="font-bold font-size-lg color-light-gray">LinkedIn</h1>
  <ion-grid class="form-admin">
    <ion-row class="form-admin--group">
        <ion-col size-xs="6" class="form-admin--group_field">
          <SpaceTypeModal />
        </ion-col>
        <ion-col size-xs="6" class="form-admin--group_field">
          <SpaceFeatureModal />
        </ion-col>
    </ion-row>
    <ion-row class="form-admin--group">
        <ion-col size-xs="6" class="form-admin--group_field">
          <ion-label color="light">Space Types</ion-label>
          <DocumentField />
        </ion-col>
        <ion-col size-xs="6" class="form-admin--group_field">
          <ion-label color="light">Space Features</ion-label>
          <DocumentField />
        </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonLabel,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import DocumentField from '@/components/admin/DocumentField.vue'
import SpaceTypeModal from '@/components/admin/space-metadata/SpaceTypeModal.vue'
import SpaceFeatureModal from '@/components/admin/space-metadata/SpaceFeatureModal.vue'

const router = useRouter();

</script>

<style scoped>
 ion-button {
  margin-bottom: 5%;
  width: 246px;
}
ion-row{
  margin-top: 30px;
}
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
