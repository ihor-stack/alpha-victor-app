<template>
    <div>
        <h1 class="title-admin font-bold font-size-lg color-light-gray">{{ location.name }}</h1>
        <ion-grid class="form-admin">
            <ion-row class="form-admin--group_field">
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">Location name</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="location.name"
                    @ion-input="location.name = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">Location prefix</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="location.prefix"
                    @ion-input="location.prefix = String($event.target.value)"
                    ></ion-input>
                </ion-col>
            </ion-row>

            <hr class="form-admin--divider" />

            <ion-row class="form-admin--group_field">
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">Main contact name</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="location.mainContactName"
                    @ion-input="location.mainContactName = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">Email address</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="location.email"
                    @ion-input="location.email = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">Phone number</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="location.phone"
                    @ion-input="location.phone = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">SOS Number</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="location.sosNumber"
                    @ion-input="location.sosNumber = String($event.target.value)"
                    ></ion-input>
                </ion-col>
            </ion-row>

            <hr class="form-admin--divider" />

            <ion-row class="form-admin--group_field">
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">Public Wifi</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="location.wifiSsid"
                    @ion-input="location.wifiSsid = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">Wifi Password</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="location.wifiPassword"
                    @ion-input="location.wifiPassword = String($event.target.value)"
                    ></ion-input>
                </ion-col>
            </ion-row>

            <hr class="form-admin--divider" />

            <ion-row class="form-admin--group_field">
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">Address Line 1</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="location.addressLines[0]"
                    @ion-input="location.addressLines[0] = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">Address Line 2</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="location.addressLines[1]"
                    @ion-input="location.addressLines[1] = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">City</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="location.city"
                    @ion-input="location.city = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">Area Code</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="location.postcode"
                    @ion-input="location.postcode = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" class="button-pair">
                    <ion-button class="button-wide" @click="saveChanges(location.id)">
                        Save changes
                    </ion-button>
                    <ion-button 
                    class="button-wide button-outline" 
                    fill="outline" 
                    color="--av-light-gray">
                        Export QR Codes
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
    </div>
</template>

<script setup lang="ts">
import {
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonInput,
    IonButton,
    IonItem
} from "@ionic/vue";
import {Locations} from '@/stores/adminLocations'
import { storeToRefs } from "pinia"
import { onBeforeMount } from "vue"
import { useCookies } from "vue3-cookies"

const { cookies } = useCookies();
const Location = Locations()
const { location } = storeToRefs(Location);

const saveChanges = (id: string) => {
    Location.updateLocation(id)
}

onBeforeMount(() =>{
    Location.getLocation()
})
</script>

<style scoped>
ion-content{
    margin: 0%;
}
</style>
