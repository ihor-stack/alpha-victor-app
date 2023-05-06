<template>
    <ion-content>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="3" class="form-admin--group_field">
                <img 
                src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                alt="location pic" 
                height="135"/>
            </ion-col>
            <ion-col size-xs="12" size-sm="4" class="form-admin--group_field">
                <h1 class="font-bold font-size-lg color-light-gray">The Johnson</h1>
                <p class="font-size-sm font-mono color-light-gray">
                    <ion-icon :icon="locationOutline" color="light"></ion-icon>
                    2B Ground Floor
                </p>
                <p class="font-size-sm font-mono color-light-gray">
                    <ion-icon :icon="peopleOutline" color="light"></ion-icon>
                    &gt;&gt; 10
                </p>
            </ion-col>
            <ion-col size-xs="12" size-sm="4" class="form-admin--group_field" id="container">
                <div><ion-icon :icon="qrCodeOutline" color="light" class="large_icons"></ion-icon></div>
                <div class="vl"></div>
                <div><ion-icon :icon="scanOutline" color="light" class="large_icons"></ion-icon></div>
            </ion-col>
            <ion-col size-xs="12" class="form-admin--group_field">
                <space-features-slider :features="spaceFeatures" />
            </ion-col>
        </ion-row>
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Space name</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Space shortcode</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Room type</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Capacity</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Typeform ID</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Decision Tree</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
        </ion-row>
        <ion-row class="form-admin--group_field component_container">
            <ion-col size-xs="12" class="form-admin--group_field">
                <ion-label color="light">Photos</ion-label>
                <AdminFloorsField />
            </ion-col>
            <ion-col size-xs="12" class="form-admin--group_field">
                <ion-label color="light">Documents</ion-label>
                <AdminFloorsField />
            </ion-col>
        </ion-row>
        <ion-row class="form-admin--group_field">
            <ion-col size-xs="12">
                <ion-item 
                v-for="(space, index) in spaceRoutes" 
                v-bind:key="index"
                button 
                :router-link="{ name: space.route }" 
                router-direction="root">
                    <ion-label color="light" >
                    <h2>{{space.title}}</h2>
                    </ion-label>
                    <ion-icon :icon="chevronForwardOutline" slot="end" color="light"></ion-icon>
                </ion-item>
            </ion-col>
        </ion-row>
    </ion-grid>
    </ion-content>
</template>

<script setup lang="ts">

import {
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonItem,
    IonInput,
    IonThumbnail,
    IonIcon
} from "@ionic/vue";
import AdminFloorsField from '@/components/admin/locations/AdminFloorsField.vue'
import { 
    chevronForwardOutline, 
    locationOutline, 
    peopleOutline, 
    qrCodeOutline, 
    scanOutline
} from 'ionicons/icons';
import SpaceFeaturesSlider from "@/components/space/SpaceFeaturesSlider.vue";

const spaceRoutes = [
    {title: 'Panorama' , route: 'AdminLocationDevices'},
    {title: 'Devices' , route: ''},
    {title: 'Beacon' , route: ''},
    {title: 'Integrations' , route: ''},
    {title: 'Wifi Password' , route: ''}
]
const spaceFeatures = [
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
  ]
</script>

<style scoped>
ion-row {
    margin-bottom: 3%;
}
.component_container {
    margin-top: 30px;
}
.large_icons{
    font-size: 100px;
}
.vl {
  border-left: 3px solid var(--av-light-gray);
  height: 120px;
  width: 3px;
  margin-left: 15px;
}
#container {
  display: flex;                  
  flex-direction: row;            
  flex-wrap: nowrap;              
  justify-content: space-between; 
}
#container > div {
  width: 100px;
  height: 100px;
}
</style>
