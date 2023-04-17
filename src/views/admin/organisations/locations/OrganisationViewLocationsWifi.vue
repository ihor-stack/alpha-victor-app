<template>
    <h1 class="font-bold font-size-lg color-light-gray">Wifi Password</h1>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Wifi Network</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">                
                <ion-label color="light">Wifi password</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" class="form-admin--group_field">
                <ion-item>
                    <ion-label color="light">Show wifi password</ion-label>
                    <ion-toggle  color="light" justify="space-between">Space Between Label and Control</ion-toggle>
                </ion-item>
            </ion-col>
            <ion-col size-xs="12" class="form-admin--group_field">
                <ion-button>
                    Save changes
                </ion-button>
            </ion-col>
            <ion-col size-xs="12" >
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
        </ion-row>
    </ion-grid>
</template>

<script setup lang="ts">
    
import {
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    IonLabel,
    IonToggle,
    IonItem,
    IonIcon
} from "@ionic/vue";
import { chevronForwardOutline } from 'ionicons/icons';

const items = [
    {title: 'Pronestor' , route: ''},
]
</script>

<style scoped>

</style>
    