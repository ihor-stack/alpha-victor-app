<template>
    <div>
        <h1 class="title-admin font-bold font-size-lg color-light-gray">Wifi Password</h1>
        <ion-grid class="form-admin">
            <ion-row class="form-admin--group">
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <ion-label color="light">Wifi Network</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="wifi.wifiName"
                    @ion-input="wifi.wifiName = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">                
                    <ion-label color="light">Wifi password</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="wifi.wifiPassword"
                    @ion-input="wifi.wifiPassword = String($event.target.value)"
                    ></ion-input>
                </ion-col>

                <ion-col size-xs="12" class="form-admin--group_field">
                    <AdminSelect
                        label="Wifi security type"
                        v-model="securityTypeSelected"
                        :options="securityTypesList"
                        idPrefix="security-type-select"
                    />
                </ion-col>
 
                <ion-col size-xs="12" class="form-admin--group_field">
                    <ion-label color="light">Show wifi password</ion-label>
                    <ion-input
                    color="light"
                    class="form-toggle"
                    :disabled="true"
                    >
                        <ion-label color="light">Show wifi password within space</ion-label>
                        <ion-toggle color="primary" :checked="wifi.showWifiPassword" @ionChange="wifi.showWifiPassword = $event.detail.checked" />
                    </ion-input>
                </ion-col>

                <ion-col size-xs="12">
                    <ion-button class="button-wide" @click="saveChanges">
                        Save changes
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
    </div>
</template>

<script setup lang="ts">
    
import {
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    IonLabel,
    IonToggle,
    IonItem,
    IonIcon
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import {Spaces} from '@/stores/adminSpaces'
import AdminSelect from "@/components/admin/AdminSelect.vue"
import { onBeforeMount, ref } from "vue"

const Space = Spaces()

enum SecurityTypes {
  None = 0,
  WEP = 1,
  WPA = 2,
  WPA2 = 3,
  WPA3 = 4
}

const securityTypesList = Object.keys(SecurityTypes)
  .filter(key => isNaN(Number(key)))
  .map(key => ({ id: SecurityTypes[key as any], title: key }));

const { wifi, securityTypeSelected, editSpacesWifi } = storeToRefs(Space);
securityTypeSelected.value = securityTypesList.find(item => item.id === wifi.value.wifiSecurityType);

async function saveChanges() {
  wifi.value.wifiSecurityType = securityTypeSelected.value.id;
  await Space.editSpacesWifi();
}

onBeforeMount(() => {
    Space.getSpaceDetailsWifi()
})
</script>

<style scoped>
ion-button {
    margin-top: 50px;
}
</style>
    