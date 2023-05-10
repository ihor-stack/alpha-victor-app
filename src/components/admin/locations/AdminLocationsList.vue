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
                <ion-item 
                v-for="(space, index) in floor.spaces" 
                :key="index" 
                button
                :router-link="redirect(String(space.spaceId))"
                router-direction="root">
                <ion-label color="light" >
                    <h2>{{space.name}}</h2>
                    <p>Location</p>
                </ion-label>
                <ion-icon :icon="chevronForwardOutline" slot="end" color="light"></ion-icon>
                </ion-item>
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
import { chevronForwardOutline } from 'ionicons/icons';
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const Floor = Floors()
const { floor } = storeToRefs(Floor);

const redirect = (id: string) => {
  cookies.set('spaceId', id)
  if( cookies.get('locationId') && cookies.get('spaceId')){
    return { 
      name: 'OrganisationViewLocationsSpaces', 
      params: { 
        id: cookies.get('orgId'),
        locationId: cookies.get('spaceId'),
        floorId: cookies.get('floorId'),
        spaceId: cookies.get('spaceId')
        } 
    }
  }
}
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
