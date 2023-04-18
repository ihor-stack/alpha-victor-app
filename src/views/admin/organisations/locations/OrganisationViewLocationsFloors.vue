<template>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="9" class="form-admin--group_field">
                <AdminLocationsList />
                <div class="button-div-margin">
                    <ion-button class="font-size-sm text-lowercase">
                        Save changes
                    </ion-button>
                    <ion-button 
                    class="font-size-sm text-lowercase export-button" 
                    fill="outline" 
                    color="--av-light-gray">
                        Export QR Codes
                    </ion-button>
                </div>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script setup lang="ts">
    
  import {
      IonGrid,
      IonRow,
      IonCol,
      IonButton
    } from "@ionic/vue";
    import AdminLocationsList from '@/components/admin/locations/AdminLocationsList.vue'

  
    </script>
    
    <style scoped>
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
    