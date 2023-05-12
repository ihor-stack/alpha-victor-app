<template>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="3" class="form-admin--group_field">
                <img 
                src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                alt="location pic" 
                height="135"/>
            </ion-col>
            <ion-col size-xs="12" size-sm="4" class="form-admin--group_field">
                <h1 class="font-bold font-size-lg color-light-gray">{{currentSpace}}</h1>
                <p class="font-size-sm font-mono color-light-gray">
                    <ion-icon :icon="locationOutline" color="light"></ion-icon>
                    2B Ground Floor
                </p>
                <p class="font-size-sm font-mono color-light-gray">
                    <ion-icon :icon="peopleOutline" color="light"></ion-icon>
                    &gt;&gt; 10
                </p>
            </ion-col>
            <ion-col size-xs="12" size-sm="4" class="form-admin--group_field" id="container">
                <div><ion-icon :icon="qrCodeOutline" color="light" class="large_icons"></ion-icon></div>
                <div class="vl"></div>
                <div><ion-icon :icon="scanOutline" color="light" class="large_icons"></ion-icon></div>
            </ion-col>
            <ion-col size-xs="12" class="form-admin--group_field">
                <space-features-slider :features="spaceFeatures" />
            </ion-col>
        </ion-row>
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Space name</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                :value="space.spaceName"
                @ion-input="space.spaceName = String($event.target.value)"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Space shortcode</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                :value="space.shortcode"
                @ion-input="space.shortcode = String($event.target.value)"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Room type</ion-label>
                <AdminSelect v-model="optionSelected" :options="formattedSelect"/>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Capacity</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                :value="space.capacity"
                @ion-input="space.capacity = String($event.target.value)"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Typeform ID</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                :value="space.typeformId"
                @ion-input="space.typeformId = String($event.target.value)"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Decision Tree</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                ></ion-input>
            </ion-col>
        </ion-row>
        <ion-row class="form-admin--group_field component_container">
            <ion-col size-xs="6" class="form-admin--group_field">
                <ion-label color="light">Photos</ion-label>6
            </ion-col>
            <ion-col size-xs="6" class="form-admin--group_field">
                <ion-chip color="light">
                    <ion-icon :icon="addOutline" ></ion-icon>
                    <ion-label>Add New Photo</ion-label>
                </ion-chip>
            </ion-col>
            <ion-col 
            size-xs="12" 
            size-md="6" 
            class="form-admin--group_field" 
            v-for="photo in space.photos" 
            v-bind:key="photo.id">
                <ion-item >
                    <ion-thumbnail slot="start">
                        <img 
                        alt="Photo" 
                        :src="photo.path" />
                    </ion-thumbnail>
                    <ion-label color="light">{{ photo.name }}</ion-label>
                    <ion-button 
                        class="remove-button text-lowercase"
                        slot="end"  
                        fill="clear"
                        size="small"
                        >
                        &gt;&gt; remove
                    </ion-button>
                </ion-item>
            </ion-col>
            <ion-col size-xs="6" class="form-admin--group_field">
                <ion-label color="light">Documents</ion-label>6
            </ion-col>
            <ion-col size-xs="6" class="form-admin--group_field">
                <DocumentModal />
            </ion-col>
            <ion-col size-xs="12" class="form-admin--group_field">
                <ion-item v-for="document in space.documents" v-bind:key="document.id">
                    <ion-label color="light">{{ document.name }}</ion-label>
                    <ion-button 
                        class="remove-button text-lowercase"
                        slot="end"  
                        fill="clear"
                        size="small"
                        >
                        &gt;&gt; remove
                    </ion-button>
                </ion-item>
            </ion-col>
        </ion-row>
        <ion-row class="form-admin--group_field">
            <ion-col size-xs="12">
                <ion-item 
                v-for="(space, index) in spaceRoutes" 
                v-bind:key="index"
                button 
                :router-link="redirect(space.route)"
                router-direction="root">
                    <ion-label color="light" >
                    <h2>{{space.title}}</h2>
                    </ion-label>
                    <ion-icon :icon="chevronForwardOutline" slot="end" color="light"></ion-icon>
                </ion-item>
            </ion-col>
        </ion-row>
    </ion-grid>
    <div class="button-div-margin">
        <ion-button 
        class="font-size-sm text-lowercase" 
        @click='Space.saveSpace()'>
            Save changes
        </ion-button>
        <ion-button 
        class="delete-button font-size-sm text-lowercase" 
        color="red">
            Delete space
        </ion-button>
    </div>
</template>

<script setup lang="ts">

import {
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonItem,
    IonInput,
    IonIcon,
    IonButton,
    IonThumbnail,
    IonChip
} from "@ionic/vue";
import { 
    chevronForwardOutline, 
    locationOutline, 
    peopleOutline, 
    qrCodeOutline, 
    scanOutline
} from 'ionicons/icons';
import SpaceFeaturesSlider from "@/components/space/SpaceFeaturesSlider.vue";
import { storeToRefs } from "pinia";
import {Spaces} from '@/stores/adminSpaces'
import { useCookies } from "vue3-cookies";
import { onBeforeMount, ref } from "vue";
import AdminSelect from  '@/components/admin/AdminSelect.vue'
import {addOutline} from 'ionicons/icons'
import DocumentModal from '@/components/admin/spaces/DocumentModal.vue'
const { cookies } = useCookies();
const Space = Spaces()
const { space, currentSpace, formattedSelect, optionSelected } = storeToRefs(Space);
const SpaceHeader = ref('')
onBeforeMount(()=>{
    Space.getSpaces();
})
const redirect = (route: string) => {
    if( cookies.get('floorId') && cookies.get('orgId')  && cookies.get('spaceId')){
        return { 
        name: route, 
        params: { 
            id: cookies.get('orgId'),
            locationId: cookies.get('locationId'),
            floorId: cookies.get('floorId'),
            spaceId: cookies.get('spaceId')}
        }
    }
}
const spaceRoutes = [
    {title: 'Panorama' , route: ''},
    {title: 'Devices' , route: 'OrganisationViewLocationsDevices'},
    {title: 'Beacon' , route: 'OrganisationViewLocationsBeacon'},
    {title: 'Integrations' , route: 'OrganisationViewLocationsIntegrations'},
    {title: 'Wifi Password' , route: 'OrganisationViewLocationsWifi'}
]
const spaceFeatures = [
    {
      name: "Smart TV",
      category: "screen",
    },
    {
      name: "WiFi",
      category: "wifi",
    },
    {
      name: "Phone",
      category: "phone",
    },
    {
      name: "Presenting",
      category: "presenting",
    },
  ]
</script>

<style scoped>
ion-row {
    margin-bottom: 3%;
}
/* ion-button {
    width: 246px;
    margin-right: 20px;
} */
.remove-button {
  color: var(--av-red);
  font-family: "Akkurat-Mono";
}
.delete-button{
    background-color: var(--av-red);
    border-radius: 8px;
    }
.button-div-margin{
    margin-top: 10%;
    width: 100%
}
.component_container {
    margin-top: 30px;
}
.large_icons{
    font-size: 100px;
}
.vl {
  border-left: 3px solid var(--av-light-gray);
  height: 120px;
  width: 3px;
  margin-left: 15px;
}
#container {
  display: flex;                  
  flex-direction: row;            
  flex-wrap: nowrap;              
  justify-content: space-between; 
}
#container > div {
  width: 100px;
  height: 100px;
}
</style>
