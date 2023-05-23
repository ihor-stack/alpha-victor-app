<template>
    <div>
        <h1 class="title-admin font-bold font-size-lg color-light-gray">Wifi Password</h1>
        <ion-grid class="form-admin">
            <ion-row class="form-admin--group">
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">Wifi Network</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="wifi.wifiName"
                    @ion-input="wifi.wifiName = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">                
                    <ion-label color="light">Wifi password</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="wifi.wifiPassword"
                    @ion-input="wifi.wifiPassword = String($event.target.value)"
                    ></ion-input>
                </ion-col>

                <ion-col size-xs="12" class="form-admin--group_field">
                    <ion-label color="light">Show wifi password</ion-label>
                    <ion-input
                    color="light"
                    class="form-toggle"
                    :disabled="true"
                    >
                        <ion-label color="light">Show wifi password within space</ion-label>
                        <ion-toggle color="primary" :value="wifi.showWifiPassword" @ion-input="wifi.showWifiPassword = $event.target.value" />
                    </ion-input>
                </ion-col>

                <ion-col size-xs="12">
                    <ion-button class="button-wide" @click="Space.editSpacesWifi()">
                        Save changes
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
    IonInput,
    IonButton,
    IonLabel,
    IonToggle,
    IonItem,
    IonIcon
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import {Spaces} from '@/stores/adminSpaces'
import { onBeforeMount } from "vue";

const Space = Spaces()
const { wifi } = storeToRefs(Space);

onBeforeMount(() => {
    Space.getSpacesWifi()
})
</script>

<style scoped>
ion-button {
    margin-top: 50px;
}
</style>
    