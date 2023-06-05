<template>
    <ion-grid class="form-admin">
        <h1 class="title-admin font-bold font-size-lg color-light-gray">{{ floor.name }}</h1>
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Floor name</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                :value="floor.name"
                @ion-input="floor.name = String($event.target.value)"
                ></ion-input>
            </ion-col>
            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                <ion-label color="light">Short name</ion-label>
                <ion-input
                class="font-size-sm"
                color="light"
                :value="floor.shortName"
                @ion-input="floor.shortName = String($event.target.value)"
                ></ion-input>
            </ion-col>

            <ion-col size-xs="12" class="button-pair">
                <ion-button class="button-wide" @click="Floor.updateFloor(floor.id)">
                    Save floor
                </ion-button>
                <NewFloorModal />
            </ion-col>
            
            <hr class="form-admin--divider" />

            <ion-col size-xs="12" class="form-admin--group_field">
                <h4 class="font-bold font-size-normal color-light-gray">Spaces</h4>
                <ion-item 
                v-for="(space, index) in floor.spaces" 
                :key="index" 
                button
                :router-link="redirect(String(space.spaceId))"
                router-direction="root"
                class="form-admin--group_field-item ion-no-padding">
                    <img src="https://imageio.forbes.com/specials-images/imageserve/61b8b4834a7373c7800e631a/Business-people-video-conferencing-in-meeting-room/960x0.jpg?format=jpg&width=960" alt="" />
                    <ion-label color="light" >
                        {{space.name}}
                    </ion-label>
                    <ion-icon :icon="chevronForwardOutline" slot="end" color="light"></ion-icon>
                </ion-item>
            </ion-col>
            
            <ion-col size-xs="12" class="button-pair">
                <NewSpaceModal />
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
    IonButton
} from "@ionic/vue";
//import AdminFloorsField from '@/components/admin/locations/AdminFloorsField.vue'
import { Floors } from '@/stores/adminFloors'
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { chevronForwardOutline } from 'ionicons/icons';
import { useCookies } from "vue3-cookies";
import NewFloorModal from '@/components/modals/NewFloorModal.vue'
import NewSpaceModal from '@/components/modals/NewSpaceModal.vue'

const { cookies } = useCookies();
const Floor = Floors()
const { floor } = storeToRefs(Floor);

const redirect = (id: string) => {
  cookies.set('spaceId', id)
  if( cookies.get('locationId') && cookies.get('spaceId')){
    return { 
      name: 'OrganisationViewLocationsSpaces', 
      params: { 
        id: cookies.get('orgId'),
        locationId: cookies.get('spaceId'),
        floorId: cookies.get('floorId'),
        spaceId: cookies.get('spaceId')
        } 
    }
  }
}
onBeforeMount(() =>{
    Floor.getFloorDetails()
})
</script>

<style scoped>
h2{
    margin-top: 30px;
    margin-bottom: 16px;
}
ion-button {
    width: 246px
}
.export-button {
    color: var(--av-light-gray);
    margin-left: 26px;
}
.button-div-margin{
    margin-top: 10%;
    width: 100%
}
</style>
