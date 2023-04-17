<template>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="9" class="form-admin--group_field">
                <AdminLocationsList />
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
    } from "@ionic/vue";
    import AdminLocationsList from '@/components/admin/locations/AdminLocationsList.vue'
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
    