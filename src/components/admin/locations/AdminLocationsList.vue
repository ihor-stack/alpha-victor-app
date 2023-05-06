<template>
    <ion-grid class="form-admin">
        <h1 class="font-bold font-size-lg color-light-gray">First Floor</h1>
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Floor name</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                :value="floor.name"
                @ion-input="floor.name = String($event.target.value)"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Short name</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                :value="floor.shortName"
                @ion-input="floor.shortName = String($event.target.value)"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <h2 class="font-bold font-size-lg color-light-gray">Spaces</h2>

            </ion-col>
            <!-- <ion-col size-xs="12" class="form-admin--group_field">
                <h2 class="font-bold font-size-lg color-light-gray">Spaces</h2>
                <AdminFloorsField />
            </ion-col> -->
            <ion-col size-xs="12" class="form-admin--group_field">
                <div class="button-div-margin">
                    <ion-button class="font-size-sm text-lowercase" @click="Floor.saveFloor">
                        Save changes
                    </ion-button>
                    <ion-button 
                    class="font-size-sm text-lowercase export-button" 
                    fill="outline" 
                    color="--av-light-gray">
                        Export QR Codes
                    </ion-button>
                </div>
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
    IonButton
} from "@ionic/vue";
//import AdminFloorsField from '@/components/admin/locations/AdminFloorsField.vue'
import {Floors} from '@/stores/adminFloors'
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
const Floor = Floors()
const { floor } = storeToRefs(Floor);

onBeforeMount(() =>{
    Floor.getFloorDetails()
})
</script>

<style scoped>
h1{
    margin-bottom: 48px;
}
h2{
    margin-top: 30px;
    margin-bottom: 16px;
}
ion-button {
        width: 246px
    }
    .export-button {
        color: var(--av-light-gray);
        margin-left: 26px;
    }
    .button-div-margin{
        margin-top: 10%;
        width: 100%
    }
</style>
