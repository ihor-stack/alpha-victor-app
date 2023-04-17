<template>
    <ion-grid class="form-admin">
        <ion-row class="form-admin--group">
            <ion-col size-xs="12" size-sm="9" class="form-admin--group_field">
                <AdminLocationDetails />
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
    IonButton
} from "@ionic/vue";
import AdminLocationDetails from '@/components/admin/locations/AdminLocationDetails.vue'

</script>

<style scoped>
.floor_padding {
padding: 15px;
}
</style>
