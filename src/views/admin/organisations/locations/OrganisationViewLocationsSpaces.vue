<template>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="9" class="form-admin--group_field">
                <AdminLocationDetails />
                <div class="button-div-margin">
                    <ion-button class="font-size-sm text-lowercase">
                        Save changes
                    </ion-button>
                    <ion-button 
                    class="delete-button font-size-sm text-lowercase" 
                    color="red">
                        Delete space
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
import AdminLocationDetails from '@/components/admin/locations/AdminLocationDetails.vue'

</script>

<style scoped>
    ion-button {
        width: 246px;
        margin-right: 20px;
    }
    .delete-button{
        background-color: var(--av-red);
        border-radius: 8px;
        }
    .button-div-margin{
        margin-top: 10%;
        width: 100%
    }
</style>
