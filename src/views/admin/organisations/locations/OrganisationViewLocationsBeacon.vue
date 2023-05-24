<template>
    <div>
        <h1 class="title-admin font-bold font-size-lg color-light-gray">Beacon</h1>
        <ion-grid class="form-admin">
            <ion-row class="form-admin--group">
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">Major</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    type="number"
                    :value="major"
                    @ion-input="major = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">                
                    <ion-label color="light">Minor</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    type="number"
                    :value="minor"
                    @ion-input="minor = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" >
                    <ion-item 
                    v-for="(beacon, index) in beacons" 
                    v-bind:key="index">
                        <ion-label color="light" >
                        <h2>{{beacon.beaconId}}</h2>
                        </ion-label>
                    </ion-item>
                </ion-col>
                <ion-col size-xs="12" >
                    <ion-button 
                    class="button-wide"
                    @click="Space.getSpacesBeacon(minor, major)">
                        Scan for beacons
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
        IonItem
    } from "@ionic/vue";
    import { storeToRefs } from "pinia";
    import {Spaces} from '@/stores/adminSpaces'
    import { ref } from "vue";

    const Space = Spaces()
    const major = ref('')
    const minor = ref('')
    const { beacons } = storeToRefs(Space);

</script>