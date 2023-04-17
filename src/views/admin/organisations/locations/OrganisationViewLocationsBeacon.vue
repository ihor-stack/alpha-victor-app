<template>
    <h1 class="font-bold font-size-lg color-light-gray">Beacon</h1>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Major</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">                
                <ion-label color="light">Minor</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" class="form-admin--group_field">
                <ion-button>
                    Scan for beacons
                </ion-button>
            </ion-col>
            <ion-col size-xs="12" class="form-admin--group_field">
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
    IonInput,
    IonButton,
    IonLabel
} from "@ionic/vue";
import AdminLocationDevices from '@/components/admin/locations/AdminLocationDevices.vue'
  
</script>

<style scoped>
.floor_padding {
padding: 15px;
}
</style>
    