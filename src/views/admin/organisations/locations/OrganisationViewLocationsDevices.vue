<template>
  <ion-grid class="form-admin">
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ $t("pages.admin.organisations.view.locations.devices.title") }}
    </h1>
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
            <div slot="content" class="border">
              <ion-row class="form-admin--group">
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label>{{
                    $t("pages.admin.organisations.view.locations.devices.sn")
                  }}</ion-label>
                  <ion-input
                    class="font-size-sm"
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
                  <ion-label>{{
                    $t(
                      "pages.admin.organisations.view.locations.devices.installer"
                    )
                  }}</ion-label>
                  <ion-input
                    class="font-size-sm"
                    :value="device.installer"
                    @ion-input="device.installer = String($event.target.value)"
                  ></ion-input>
                </ion-col>
              </ion-row>

              <ion-row class="form-admin--group">
                <ion-col
                  size-xs="12"
                  size-sm="6"
                  class="form-admin--group_field"
                >
                  <ion-label>{{
                    $t(
                      "pages.admin.organisations.view.locations.devices.installDate"
                    )
                  }}</ion-label>
                  <div class="custom-input date-wrapper">
                    <ion-datetime-button
                      :datetime="`installDate${device.id}`"
                    ></ion-datetime-button>
                  </div>
                  <ion-modal :keep-contents-mounted="true">
                    <ion-datetime
                      :id="`installDate${device.id}`"
                      :value="device?.installDate?.split('.', 1)[0]"
                      presentation="date"
                      show-default-buttons
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
                  <ion-label>{{
                    $t(
                      "pages.admin.organisations.view.locations.devices.expiryDate"
                    )
                  }}</ion-label>
                  <div class="custom-input date-wrapper">
                    <ion-datetime-button
                    :datetime="`warrantyDate${device.id}`"
                    ></ion-datetime-button>
                  </div>
                  <ion-modal :keep-contents-mounted="true">
                    <ion-datetime
                      :id="`warrantyDate${device.id}`"
                      :value="device.warrantyExpiryDate.split('.', 1)[0]"
                      presentation="date"
                      show-default-buttons
                      @ion-change="
                        (e: any) => {
                          device.warrantyExpiryDate = String(e.target.value);
                        }
                      "
                    />
                  </ion-modal>
                </ion-col>
              </ion-row>

              <ion-row class="form-admin--group">
                <ion-col size-xs="12" class="form-admin--group_field">
                  <ion-label>{{
                    $t(
                      "pages.admin.organisations.view.locations.devices.description"
                    )
                  }}</ion-label>
                  <ion-textarea
                    class="font-size-sm"
                    :value="device.description"
                    @ion-input="
                      device.description = String($event.target.value)
                    "
                  ></ion-textarea>
                  <ion-item lines="none" class="ion-no-padding">
                    <ion-label>{{
                      $t(
                        "pages.admin.organisations.view.locations.devices.photos"
                      )
                    }}</ion-label>
                    <PhotoModal
                      :queryParams="`deviceId=${device.id}`"
                      :hiddenFeatureImageToggle="true"
                      :disableUpload="device.photos && device.photos.length >= 1"
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
                    {{
                      $t(
                        "pages.admin.organisations.view.locations.devices.saveBtn"
                      )
                    }}
                  </ion-button>
                  <ion-button
                    class="button-wide button-red"
                    fill="clear"
                    @click="deleteDevice()"
                  >
                    {{
                      $t(
                        "pages.admin.organisations.view.locations.devices.deleteBtn"
                      )
                    }}
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
.border {
  padding: 25px;
  border-radius: 5px;
  border: 1px solid var(--av-darker-gray);
}

.date-wrapper {
  padding: 9px;
  margin-top: 5px;
  border-radius: 5px;
  margin-bottom: 0;
}

.date-wrapper ion-datetime-button {
  width: fit-content;
}

.date-wrapper ion-datetime-button::part(native) {
  background: transparent;
  padding-left: 0;
  width: 100%;
}

ion-item {
  --background: transparent;
  margin-top: 16px;
}
</style>
