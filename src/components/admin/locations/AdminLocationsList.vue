<template>
    <ion-content>
    <ion-grid class="form-admin">
        <h1 class="font-bold font-size-lg color-light-gray">First Floor</h1>
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Floor name</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Short name</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" class="form-admin--group_field">
                <h2 class="font-bold font-size-lg color-light-gray">Spaces</h2>
                <AdminFloorsField />
            </ion-col>
        </ion-row>
    </ion-grid>
    </ion-content>
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
h1{
    margin-bottom: 48px;
}
h2{
    margin-top: 30px;
    margin-bottom: 16px;
}
</style>
