<template>
    <ion-grid class="form-admin">
        <ion-thumbnail>
        <img 
        src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
        alt="location pic" />
        </ion-thumbnail>
        <h1 class="font-bold font-size-lg color-light-gray">The Johnson</h1>
        <ion-row>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Space name</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Space shortcode</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Room type</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Capacity</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Typeform ID</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Decision Tree</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col size-xs="12">
                <ion-label color="light">Photos</ion-label>
                <AdminFloorsField />
            </ion-col>
            <ion-col size-xs="12">
                <ion-label color="light">Documents</ion-label>
                <AdminFloorsField />
            </ion-col>
        </ion-row>
        <ion-row>
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
import { chevronForwardOutline } from 'ionicons/icons';
const spaceRoutes = [
    {title: 'Panorama' , route: 'AdminLocationDevices'},
    {title: 'Devices' , route: ''},
    {title: 'Beacon' , route: ''},
    {title: 'Integrations' , route: ''},
    {title: 'Wifi Password' , route: ''}
]
</script>

<style scoped>
.floor_padding {
padding: 15px;
}
</style>
