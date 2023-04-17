<template>
    <ion-grid class="form-admin">
        <h1 class="font-bold font-size-lg color-light-gray">Devices</h1>
        <p>Facilities Panel - HDMI, VGA & Audio</p>
        <ion-row>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Serial number</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Installer</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Install date</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Warranty expiry date</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12">
                <ion-label color="light">Description</ion-label>
                <ion-textarea
                class="font-size-sm"
                color="light"
                ></ion-textarea>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col size-xs="12">
                <ion-label color="light">Photos</ion-label>
                <AdminFloorsField />
            </ion-col>
            <ion-col size-xs="12">
                <ion-button>
                    Save changes
                </ion-button>
                <ion-button>
                    or delete device
                </ion-button>
            </ion-col>
            <ion-col size-xs="12">
                <ion-item 
                v-for="(item, index) in items" 
                v-bind:key="index"
                button 
                :router-link="{ name: item.route }" 
                router-direction="root">
                    <ion-label color="light" >
                    <h2>{{item.title}}</h2>
                    </ion-label>
                    <ion-icon :icon="chevronForwardOutline" slot="end" color="light"></ion-icon>
                </ion-item>
            </ion-col>
            <ion-col size-xs="12">
                <ion-button>
                    Add new device +
                </ion-button>
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
    IonTextarea
} from "@ionic/vue";
import AdminFloorsField from '@/components/admin/locations/AdminFloorsField.vue'
import { chevronForwardOutline } from 'ionicons/icons';
const items = [
    {title: 'USD Extender TX' , route: ''},
    {title: 'Academy 16U' , route: ''},
    {title: 'Extron DTP HD DA 4K' , route: ''},
]
</script>

<style scoped>
.floor_padding {
padding: 15px;
}
</style>
