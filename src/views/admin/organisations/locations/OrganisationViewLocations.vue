<template>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="3" class="form-admin--group_field">
                <h1 class="font-bold font-size-lg color-light-gray">Locations</h1>
                <ion-accordion-group>
                    <ion-accordion v-for="location in locations" :key="location.id">
                        <ion-item slot="header" color="medium">
                            <ion-label>{{location.name}}</ion-label>
                        </ion-item>
                        <ion-item
                        class="font-size-sm"
                        color="medium"
                        slot="content"
                        v-for="(floor, index) in location.floors" :key="index"
                        >   
                            <ion-icon :icon="returnDownForwardOutline" slot="start"/>
                            <ion-label class="floor_padding">
                            {{floor}}
                            </ion-label>
                            <ion-icon :icon="chevronForwardOutline" slot="end"/>
                        </ion-item>
                    </ion-accordion>
                </ion-accordion-group>                
            </ion-col>
            <ion-col size-xs="12" size-sm="9" class="form-admin--group_field">
                <h1 class="font-bold font-size-lg color-light-gray">1 Wilton Park</h1>
                <AdminLocationsForm />
                <ion-button>
                    Save changes
                </ion-button>
                <ion-button>
                    Export QR Codes
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
    } from "@ionic/vue";
    import { returnDownForwardOutline, chevronForwardOutline } from 'ionicons/icons';
    import AdminLocationsForm from '@/components/admin/locations/AdminLocationsForm.vue'
    
    import { ref } from "vue";
  
    const locations = ref([
        {
            id: 1,
            name: '1  Wilton Park',
            floors: ['Ground Floor','First Floor', 'Second Floor', 'Third Floor']
        },
        {
            id: 2,
            name: '58 Howard Street',
            floors: ['Ground Floor','First Floor']
        },
        {
            id: 3,
            name: '75 Howard Street',
            floors: ['Ground Floor','First Floor', 'Second Floor']
        }
    ])
  
    </script>
    
    <style scoped>
   .floor_padding {
    padding: 15px;
   }
    </style>
    