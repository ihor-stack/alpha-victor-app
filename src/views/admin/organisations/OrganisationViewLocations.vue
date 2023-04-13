<template>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="3" class="form-admin--group_field">
                <h1 class="font-bold font-size-lg color-light-gray">Locations</h1>
                
            <ion-item
            class="font-size-sm"
            color="light"
            >
                <ion-label>
                    1 Wilton Park
                </ion-label>
            </ion-item>
            <ion-item
            class="font-size-sm"
            color="light"
            >   
                <ion-icon :icon="returnDownForwardOutline" slot="start"/>
                <ion-label>
                   Ground Floor
                </ion-label>
            </ion-item>
            </ion-col>
            <ion-col size-xs="12" size-sm="9" class="form-admin--group_field">
                <h1 class="font-bold font-size-lg color-light-gray">1 Wilton Park</h1>
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
  
    const items = ref([
      { id: 1, name: 'Ubiquisense' },
      { id: 2, name: 'Pronestor' },
      { id: 3, name: 'Third option' },
    ]);
  
    </script>
    
    <style scoped>
   
    </style>
    