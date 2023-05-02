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
                <ion-grid class="form-admin" color="medium">
                    <ion-row class="form-admin--group">
                        <ion-col size-xs="12" class="form-admin--group_field">
                            <h1 class="font-bold font-size-lg color-light-gray">1 Wilton Park</h1>
                            <AdminLocationsForm />
                            <div class="button-div-margin">
                                <ion-button class="font-size-xs text-lowercase">
                                    Save changes
                                </ion-button>
                                <ion-button 
                                class="font-size-xs text-lowercase export-button" 
                                fill="outline" 
                                color="--av-light-gray">
                                    Export QR Codes
                                </ion-button>
                            </div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-content>
        </div>
    </ion-split-pane>
</template>

<script setup lang="ts"> 
  import {
      IonGrid,
      IonRow,
      IonCol,
      IonLabel,
      IonItem,
      IonAccordion,
      IonAccordionGroup,
      IonButton,
      IonIcon,
      IonSplitPane,
      IonMenu,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent
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

    onBeforeMount(() =>{
        Location.getNavigationThree()
    })
    // const locations = ref([
    //     {
    //         id: 1,
    //         name: '1  Wilton Park',
    //         floors: [
    //             {title: 'Ground Floor', rooms: ['room1', 'room2', 'room3']},
    //             {title: 'First Floor', rooms: ['room1', 'room2']},
    //             {title: 'Second Floor', rooms: ['room1', 'room2', 'room3']},
    //             {title: 'Third Floor', rooms: ['room1']}]
    //     },
    //     {
    //         id: 2,
    //         name: '58 Howard Street',
    //         floors: [
    //             {title: 'Ground Floor', rooms: ['room1', 'room2', 'room3']},
    //             {title: 'First Floor', rooms: ['room1', 'room2',]}]
    //     },
    //     {
    //         id: 3,
    //         name: '75 Howard Street',
    //         floors: [
    //             {title: 'Ground Floor', rooms: ['room1']},
    //             {title: 'First Floor', rooms: ['room1', 'room2']},
    //             {title: 'Second Floor', rooms: ['room1', 'room2', 'room3']}]
    //     }
    // ])
    const setLocation = (id: string) => {
        currentLocation.value === id ? currentLocation.value = '0' : currentLocation.value = id
    };
    const setFloor = (id: string, floor: string) => {
        currentLocation.value === id && currentFloor.value === floor ? 
        currentFloor.value = '' : currentFloor.value = floor
    };
    </script>
    
    <style scoped>
    ion-content{
        margin: 0%;
    }
   .floor_padding {
        padding: 15px;
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
    