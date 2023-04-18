<template>
    <ion-grid class="form-admin">
        <h1 class="font-bold font-size-lg color-light-gray">Devices</h1>
        <ion-row>
            <ion-col size-xs="12">
                <ion-accordion-group>
                <ion-accordion 
                    v-for="(item, index) in items" 
                    v-bind:key="index"
                    :value="index"
                >
                    <ion-item slot="header" color="--av-darkest-gray">
                    <ion-label color="light">{{item.title}}</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                        <ion-row class="form-admin--group">
                            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                                <ion-label color="light">Serial number</ion-label>
                                <ion-input
                                class="font-size-sm"
                                color="light"
                                ></ion-input>
                            </ion-col>
                            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                                <ion-label color="light">Installer</ion-label>
                                <ion-input
                                class="font-size-sm"
                                color="light"
                                ></ion-input>
                            </ion-col>
                            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                                <ion-label color="light">Install date</ion-label>
                                <ion-input
                                class="font-size-sm"
                                color="light"
                                ></ion-input>
                            </ion-col>
                            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                                <ion-label color="light">Warranty expiry date</ion-label>
                                <ion-input
                                class="font-size-sm"
                                color="light"
                                ></ion-input>
                            </ion-col>
                            <ion-col size-xs="12" class="form-admin--group_field">
                                <ion-label color="light">Description</ion-label>
                                <ion-textarea
                                class="font-size-sm"
                                color="light"
                                fill="solid"
                                ></ion-textarea>
                            </ion-col>
                            <ion-col size-xs="12" class="form-admin--group_field">
                                <ion-label color="light">Photos</ion-label>
                                <AdminFloorsField />
                            </ion-col>
                            <ion-col size-xs="12" class="form-admin--group_field">
                                <ion-button class="font-size-sm text-lowercase">
                                    Save changes
                                </ion-button>
                                <ion-button 
                                class="font-size-sm text-lowercase  delete-button" 
                                fill="clear" >
                                    or delete device
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </div>
                </ion-accordion>
                </ion-accordion-group>
            </ion-col>
            <ion-col size-xs="12">
                <ion-button class="font-size-sm text-lowercase">
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
    IonLabel,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
} from "@ionic/vue";
import AdminFloorsField from '@/components/admin/locations/AdminFloorsField.vue'

const items = [
    {title: 'Facilities Panel - HDMI, VGA & Audio', route: ''},
    {title: 'USD Extender TX' , route: ''},
    {title: 'Academy 16U' , route: ''},
    {title: 'Extron DTP HD DA 4K' , route: ''},
]
</script>

<style scoped>
ion-button {
    width: 246px
}
ion-icon {
    color: white
}
.delete-button{
    color: var(--av-red)
}
</style>