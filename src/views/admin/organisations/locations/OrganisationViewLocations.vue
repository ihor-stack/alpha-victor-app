<template>
    <ion-split-pane when="xs" content-id="locations">
        <ion-menu content-id="locations">
            <ion-header>
                <ion-toolbar color="dark">
                <ion-title>
                    <h1 class="font-bold font-size-lg color-light-gray">Locations</h1>
                </ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content color="dark">
                <ion-accordion-group >
                    <ion-accordion v-for="location in navigationThree[0]?.locations" :key="location.locationId">
                        <ion-item 
                        slot="header" 
                        :color="currentLocation === location.locationId ? 'medium' : 'dark'" 
                        @click="setLocation(location.locationId)">
                            <ion-label>{{location.locationName}}</ion-label>
                        </ion-item>
                        <ion-accordion-group slot="content">
                            <ion-accordion v-for="(floor, index) in location.floors" :key="index">
                                <ion-item 
                                slot="header" 
                                :color="currentFloor === floor.floorName ? 'medium' : 'dark'" 
                                @click="setFloor(location.locationId, floor.floorName)">
                                <ion-label>
                                    <ion-icon :icon="returnDownForwardOutline" size="small"/>
                                    {{floor.floorName}}
                                </ion-label>
                                </ion-item>
                                <ion-item
                                class="font-size-sm"
                                color="dark"
                                slot="content"
                                v-for="(space, index) in floor.spaces" :key="index"
                                @click="setSpace(location.locationId, floor.floorName, space.spaceName)"
                                >   
                                    <ion-label>
                                        <ion-icon :icon="returnDownForwardOutline" size="small"/>
                                        {{space.spaceName}}
                                    </ion-label>
                                    <ion-icon :icon="chevronForwardOutline" size="small" slot="end"/>
                                </ion-item>
                            </ion-accordion>
                        </ion-accordion-group>
                    </ion-accordion>
                </ion-accordion-group> 
            </ion-content>
        </ion-menu>
        <div class="ion-page" id="locations">
            <ion-content class="ion-padding">
                <ion-nav :root="component"/>
            </ion-content>
        </div>
    </ion-split-pane>
</template>

<script setup lang="ts"> 
import {
IonLabel,
IonItem,
IonAccordion,
IonAccordionGroup,
IonIcon,
IonSplitPane,
IonMenu,
IonHeader,
IonToolbar,
IonTitle,
IonContent,
IonNav
} from "@ionic/vue";
import { returnDownForwardOutline, chevronForwardOutline } from 'ionicons/icons';
import AdminLocationsForm from '@/components/admin/locations/AdminLocationsForm.vue'
import { onBeforeMount, ref } from "vue";
import {Locations} from '@/stores/adminLocations'
import { storeToRefs } from 'pinia'

const Location = Locations()
const { navigationThree } = storeToRefs(Location);

const currentLocation = ref('0');
const currentFloor = ref('')
const currentSpace = ref('')
const component = AdminLocationsForm

const setLocation = (id: string) => {
    if(currentLocation.value === id ){
        currentLocation.value = '0'
    } else {
        currentLocation.value = id
        Location.getLocation(id)
    }
};
const setFloor = (id: string, floor: string) => {
    currentLocation.value === id && currentFloor.value === floor ? 
    currentFloor.value = '' : currentFloor.value = floor
};
const setSpace = (id: string, floor: string, space: string) => {
    currentLocation.value === id && currentFloor.value === floor &&  currentSpace.value === space? 
    currentSpace.value = '' : currentSpace.value = space
}

onBeforeMount(() =>{
    Location.getNavigationThree()
})
</script>
    
<style scoped>
ion-content{
    margin: 0%;
}
ion-button {
    width: 246px
}
</style>
