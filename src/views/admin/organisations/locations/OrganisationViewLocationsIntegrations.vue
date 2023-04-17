<template>
    <h1 class="font-bold font-size-lg color-light-gray">Integrations</h1>
    <ion-label color="light">Ubiqisense</ion-label>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Select location</ion-label>
                <ion-select color="light" placeholder="Select Location" class="form-admin--group_field" interface="popover">
                    <ion-select-option value="apples">location 1</ion-select-option>
                    <ion-select-option value="oranges">location 2</ion-select-option>
                    <ion-select-option value="bananas">location 3</ion-select-option>
                </ion-select>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">                
                <ion-label color="light">Location ID</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-button>
                    Save changes
                </ion-button>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-button>
                    or delete integration
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
    IonButton
} from "@ionic/vue";
import { chevronForwardOutline } from 'ionicons/icons';

const items = [
    {title: 'Pronestor' , route: ''},
]
</script>

<style scoped>
.floor_padding {
padding: 15px;
}
</style>
    