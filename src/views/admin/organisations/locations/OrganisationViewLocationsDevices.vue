<template>
    <ion-grid class="form-admin">
        <h1 class="font-bold font-size-lg color-light-gray">Devices</h1>
        <ion-row>
            <ion-col size-xs="12">
                <ion-accordion-group>
                <ion-accordion 
                    v-for="(device, index) in devices" 
                    v-bind:key="index"
                    :value="String(index)"
                    @click="currentIndex = index"
                >
                    <ion-item slot="header" color="--av-darkest-gray">
                    <ion-label color="light">{{device.name}}</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                        <ion-row class="form-admin--group">
                            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                                <ion-label color="light">Serial number</ion-label>
                                <ion-input
                                class="font-size-sm"
                                color="light"
                                :value="device.serialNumber"
                                @ion-input="device.serialNumber = String($event.target.value)"
                                ></ion-input>
                            </ion-col>
                            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                                <ion-label color="light">Installer</ion-label>
                                <ion-input
                                class="font-size-sm"
                                color="light"
                                :value="device.installer"
                                @ion-input="device.installer = String($event.target.value)"
                                ></ion-input>
                            </ion-col>
                            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                                <ion-label color="light">Install date</ion-label>
                                <ion-datetime-button datetime="datetime1"></ion-datetime-button>
                                <ion-modal :keep-contents-mounted="true">
                                    <ion-datetime 
                                    id="datetime1" 
                                    :value="device.installDate.split('.',1)[0]"
                                    @ion-change="device.installDate = String($event.target.value), check(index)"
                                    />
                                </ion-modal>
                                <!-- <ion-input
                                class="font-size-sm"
                                color="light"
                                type="date"
                                :value="device.installDate"
                                @ion-input="device.installDate = String($event.target.value)"
                                ></ion-input> -->
                            </ion-col>
                            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                                <ion-label color="light">Warranty expiry date</ion-label>
                                <ion-datetime-button datetime="datetime2"></ion-datetime-button>
                                <ion-modal :keep-contents-mounted="true">
                                    <ion-datetime 
                                    id="datetime2" 
                                    :value="device.warrantyExpiryDate.split('.',1)[0]"
                                    @ion-change="device.warrantyExpiryDate = String($event.target.value), check(index)"
                                    />
                                </ion-modal>
                            </ion-col>
                            <ion-col size-xs="12" class="form-admin--group_field">
                                <ion-label color="light">Description</ion-label>
                                <ion-textarea
                                class="font-size-sm"
                                color="light"
                                fill="solid"
                                :value="device.description"
                                @ion-input="device.description = String($event.target.value)"
                                ></ion-textarea>
                            </ion-col>
                            <ion-col size-xs="12" class="form-admin--group_field">
                                <ion-label color="light">Photos</ion-label>
                                <!-- <AdminFloorsField /> -->
                            </ion-col>
                            <ion-col size-xs="12" class="form-admin--group_field">
                                <ion-button class="font-size-sm text-lowercase" @click="editDevice()">
                                    Save changes
                                </ion-button>
                                <ion-button 
                                class="font-size-sm text-lowercase delete-button" 
                                fill="clear" >
                                    or delete device
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </div>
                </ion-accordion>
                </ion-accordion-group>
            </ion-col>
            <ion-col size-xs="12">
                <ion-button class="font-size-sm text-lowercase">
                    Add new device +
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
    IonInput,
    IonTextarea,
    IonButton,
    IonAccordion,
    IonAccordionGroup,
    IonDatetime,
    IonDatetimeButton,
    IonModal
} from "@ionic/vue";
//import AdminFloorsField from '@/components/admin/locations/AdminFloorsField.vue'
import {Spaces} from '@/stores/adminSpaces'
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const Space = Spaces()
const {devices} = storeToRefs(Space);
const currentIndex = ref<number>(0)
const editDevice = () => {
    Space.editSpacesDevices(currentIndex.value)
}
const items = [
    {title: 'Facilities Panel - HDMI, VGA & Audio', route: ''},
    {title: 'USD Extender TX' , route: ''},
    {title: 'Academy 16U' , route: ''},
    {title: 'Extron DTP HD DA 4K' , route: ''},
]
const check = (index: number) => {
    console.log(devices.value[index].installDate)
    console.log(devices.value[index].warrantyExpiryDate)
}
onBeforeMount(() =>[
    Space.getSpacesDevices()
])
</script>

<style scoped>
ion-button {
    width: 246px
}
ion-icon {
    color: white
}
.delete-button{
    color: var(--av-red)
}
</style>