<template>
  <ion-grid class="form-admin">
    <h1 class="title-admin font-bold font-size-lg color-light-gray">Devices</h1>
    <ion-row>
      <ion-col size-xs="12">
        <ion-accordion-group>
          <ion-accordion
            v-for="(device, index) in devices"
            v-bind:key="index"
            :value="String(index)"
            class="list"
            @click="currentIndex = index"
          >
            <div class="list-item" slot="header" color="--av-darkest-gray">
              <div class="list-item__info">
                <div class="list-item__details">
                  <p
                    class="primaryText font-bold font-size-sm color-light-gray"
                  >
                    {{ device.name }}
                  </p>
                </div>
              </div>
              <span class="arrow-right"></span>
            </div>
            <div slot="content">
              <ion-row class="form-admin--group">
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label color="light">Serial number</ion-label>
                  <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="device.serialNumber"
                    @ion-input="
                      device.serialNumber = String($event.target.value)
                    "
                  ></ion-input>
                </ion-col>
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label color="light">Installer</ion-label>
                  <ion-input
                    class="font-size-sm"
                    color="light"
                    :value="device.installer"
                    @ion-input="device.installer = String($event.target.value)"
                  ></ion-input>
                </ion-col>
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label color="light">Install date</ion-label>
                  <ion-datetime-button
                    :datetime="`installDate${device.id}`"
                    class="date-button"
                  ></ion-datetime-button>
                  <ion-modal :keep-contents-mounted="true">
                    <ion-datetime
                      :id="`installDate${device.id}`"
                      :value="device?.installDate?.split('.', 1)[0]"
                      presentation="date"
                      @ion-change="
                        (e: any) => {
                          device.installDate = String(e.target.value);
                        }
                      "
                    />
                  </ion-modal>
                </ion-col>
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label color="light">Warranty expiry date</ion-label>
                  <ion-datetime-button
                    :datetime="`warrantyDate${device.id}`"
                  ></ion-datetime-button>
                  <ion-modal :keep-contents-mounted="true">
                    <ion-datetime
                      :id="`warrantyDate${device.id}`"
                      :value="device.warrantyExpiryDate.split('.', 1)[0]"
                      presentation="date"
                      @ion-change="
                        (e: any) => {
                          device.warrantyExpiryDate = String(e.target.value);
                        }
                      "
                    />
                  </ion-modal>
                </ion-col>
                <ion-col size-xs="12" class="form-admin--group_field">
                  <ion-label color="light">Description</ion-label>
                  <ion-textarea
                    class="font-size-sm"
                    color="light"
                    :value="device.description"
                    @ion-input="
                      device.description = String($event.target.value)
                    "
                  ></ion-textarea>
                  <ion-item lines="none">
                    <ion-label color="light">Photos</ion-label>
                    <PhotoModal
                      :queryParams="`deviceId=${device.id}`"
                      :hiddenFeatureImageToggle="true"
                      :callback="() => Space.getSpaceDetailsDevices(spaceId)"
                    />
                  </ion-item>
                  <ImageGallery
                    :images="device.photos"
                    @image-removed="handleImageRemoved"
                  />
                </ion-col>
                <ion-col size-xs="12">
                  <ion-button class="button-wide" @click="editDevice()">
                    Save changes
                  </ion-button>
                  <ion-button
                    class="button-wide button-red"
                    fill="clear"
                    @click="deleteDevice()"
                  >
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
  IonModal,
} from "@ionic/vue";
//import AdminFloorsField from '@/components/admin/locations/AdminFloorsField.vue'
import { Spaces } from "@/stores/adminSpaces";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import NewDeviceModal from "@/components/admin/spaces/NewDeviceModal.vue";
import PhotoModal from "@/components/admin/spaces/PhotoModal.vue";
import ImageGallery from "@/components/shared/ImageGallery.vue";

const route = useRoute();

const spaceId = route.params.spaceId as string;
const Space = Spaces();
const { devices } = storeToRefs(Space);
const currentIndex = ref<number>(0);
const editDevice = () => {
  Space.editSpacesDevices(currentIndex.value, spaceId);
};
const deleteDevice = () => {
  Space.deleteSpacesDevices(currentIndex.value, spaceId);
};

const handleImageRemoved = (photoId: string) => {
  Space.deletePhoto(photoId).then(() => {
    Space.getSpaceDetailsDevices(spaceId);
  });
};
onBeforeMount(() => [Space.getSpaceDetailsDevices(spaceId)]);
</script>

<style scoped>
ion-datetime-button {
  margin-top: 20px;
}
ion-item {
  --background: transparent;
  margin-top: 16px;
}
</style>
