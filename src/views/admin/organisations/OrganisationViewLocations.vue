<template>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="3" class="form-admin--group_field">
                <h1 class="font-bold font-size-lg color-light-gray">Locations</h1>
                <div v-for="location in locations" :key="location.id">
                    <ion-item
                    class="font-size-sm"
                    color="light"
                    >
                        <ion-label>
                            {{location.name}}
                        </ion-label>
                    </ion-item>
                    <ion-item
                    class="font-size-sm"
                    color="light"
                    v-for="(floor, index) in location.floors" :key="index"
                    >   
                        <ion-icon :icon="returnDownForwardOutline" slot="start"/>
                        <ion-label>
                        {{floor}}
                        </ion-label>
                    </ion-item>
                </div>
                
            </ion-col>
                <!-- <ion-col size-xs="12" size-sm="9" class="form-admin--group_field">
                    <h1 class="font-bold font-size-lg color-light-gray">1 Wilton Park</h1>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    ></ion-input>
                </ion-col> -->
        </ion-row>
    </ion-grid>

</template>

<script setup lang="ts">
    
  import {
      IonButton,
      IonGrid,
      IonRow,
      IonCol,
      IonLabel,
      IonItem,
      IonInput
    } from "@ionic/vue";
    import { returnDownForwardOutline } from 'ionicons/icons';
  
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
   
    </style>
    