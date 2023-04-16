<template>
    <ion-grid class="form-admin">
        <h1 class="font-bold font-size-lg color-light-gray">First Floor</h1>
        <ion-row>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Floor name</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Short name</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12">
                <AdminFloorsField />
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
    IonInput
} from "@ionic/vue";
import AdminFloorsField from '@/components/admin/locations/AdminFloorsField.vue'

</script>

<style scoped>
.floor_padding {
padding: 15px;
}
</style>
