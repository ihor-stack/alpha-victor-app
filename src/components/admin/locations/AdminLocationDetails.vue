<template>
    <ion-grid class="form-admin">
        <ion-thumbnail>
        <img 
        src="https://docs-demo.ionic.io/assets/madison.jpg" 
        alt="The Wisconsin State Capitol building in Madison, WI at night" />
        </ion-thumbnail>
        <h1 class="font-bold font-size-lg color-light-gray">The Johnson</h1>
        <ion-row>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Space name</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Space shortcode</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Room type</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Capacity</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Typeform ID</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6">
                <ion-label color="light">Decision Tree</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
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

</script>

<style scoped>
.floor_padding {
padding: 15px;
}
</style>
