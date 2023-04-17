<template>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="9" class="form-admin--group_field">
                <AdminLocationDevices />
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
import AdminLocationDevices from '@/components/admin/locations/AdminLocationDevices.vue'
  
</script>

<style scoped>
.floor_padding {
padding: 15px;
}
</style>
    