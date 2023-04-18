<template>
    <h1 class="font-bold font-size-lg color-light-gray">Integrations</h1>
    <h2 class="font-bold font-size-sm color-light-gray">Ubiqisense</h2>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Select location</ion-label>
                <ion-select 
                class='custom-select' 
                color="light" 
                placeholder="Select Location" 
                interface="popover">
                    <ion-select-option value="apples">location 1</ion-select-option>
                    <ion-select-option value="oranges">location 2</ion-select-option>
                    <ion-select-option value="bananas">location 3</ion-select-option>
                </ion-select>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">                
                <ion-label color="light">Location ID</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-button class="font-size-sm text-lowercase">
                    Save changes
                </ion-button>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-button 
                class="font-size-sm text-lowercase delete-button" 
                fill="clear" >
                    or delete integration
                </ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" class="form-admin--group_field">
                <ion-item 
                v-for="(item, index) in items" 
                v-bind:key="index"
                button 
                :router-link="{ name: item.route }" 
                router-direction="root">
                    <ion-label color="light" >
                    <h2>{{item.title}}</h2>
                    </ion-label>
                    <ion-icon :icon="chevronForwardOutline" slot="end" color="light"></ion-icon>
                </ion-item>
            </ion-col>
        </ion-row>
    </ion-grid>
    <ion-button class="font-size-sm text-lowercase add-button">
        Add new integration +
    </ion-button>
</template>

<script setup lang="ts">
    
import {
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonItem,
    IonIcon
} from "@ionic/vue";
import { chevronForwardOutline } from 'ionicons/icons';

const items = [
    {title: 'Pronestor' , route: ''},
]
</script>

<style scoped>
h1{
    margin-bottom: 38px;
}
h2{
    margin-bottom: 21px;
}
ion-select{
    max-height: 48px;
}
ion-button {
    width: 246px
}
.delete-button{
    color: var(--av-red)
}
.add-button{
    margin-top: 500px;
}
</style>
    