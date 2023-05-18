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
                                <ion-datetime-button :datetime="`installDate${device.id}`"></ion-datetime-button>
                                <ion-modal :keep-contents-mounted="true">
                                    <ion-datetime 
                                    :id="`installDate${device.id}`"
                                    :value="device.installDate.split('.',1)[0]"
                                    @ion-change="(e)=>{(device.installDate = String(e.target.value))}"
                                    />
                                </ion-modal>
                            </ion-col>
                            <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                                <ion-label color="light">Warranty expiry date</ion-label>
                                <ion-datetime-button :datetime="`warrantyDate${device.id}`"></ion-datetime-button>
                                <ion-modal :keep-contents-mounted="true">
                                    <ion-datetime 
                                    :id="`warrantyDate${device.id}`"
                                    :value="device.warrantyExpiryDate.split('.',1)[0]"
                                    @ion-change="(e)=>{(device.warrantyExpiryDate = String(e.target.value))}"
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
                                fill="clear" 
                                @click="deleteDevice()">
                                    or delete device
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </div>
                </ion-accordion>
                </ion-accordion-group>
            </ion-col>
            <ion-col size-xs="12">
                <NewDeviceModal />
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
import NewDeviceModal from '@/components/admin/spaces/NewDeviceModal.vue'
const Space = Spaces()
const {devices} = storeToRefs(Space);
const currentIndex = ref<number>(0)
const editDevice = () => {
    Space.editSpacesDevices(currentIndex.value)
}
const deleteDevice = () => {
    Space.deleteSpacesDevices(currentIndex.value)
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