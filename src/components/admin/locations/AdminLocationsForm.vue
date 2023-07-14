<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ location.name }}
    </h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group_field">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>Location name</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.name"
            @ion-input="location.name = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>Location prefix</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.prefix"
            @ion-input="location.prefix = String($event.target.value)"
          ></ion-input>
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />

      <ion-row class="form-admin--group_field">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>Main contact name</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.mainContactName"
            @ion-input="location.mainContactName = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>Email address</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.email"
            @ion-input="location.email = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>Phone number</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.phone"
            @ion-input="location.phone = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>SOS Number</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.sosNumber"
            @ion-input="location.sosNumber = String($event.target.value)"
          ></ion-input>
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />

      <ion-row class="form-admin--group_field">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>Public Wifi</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.wifiSsid"
            @ion-input="location.wifiSsid = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>Wifi Password</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.wifiPassword"
            @ion-input="location.wifiPassword = String($event.target.value)"
          ></ion-input>
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />

      <ion-row class="form-admin--group_field">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>Address Line 1</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.addressLine0"
            @ion-input="location.addressLine0 = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>Address Line 2</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.addressLine1"
            @ion-input="location.addressLine1 = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>City</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.city"
            @ion-input="location.city = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label>Postcode</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.postcode"
            @ion-input="location.postcode = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" class="button-pair">
          <ion-button class="button-wide" @click="saveChanges(location.id)">
            Save changes
          </ion-button>
          <ion-button
            class="button-wide button-outline"
            fill="outline"
            color="--av-light-gray"
            @click="exportQrCodes()"
          >
            Export QR Codes
          </ion-button>
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />

      <h1 class="title-admin font-bold font-size-lg color-light-gray">
        Floors
      </h1>

      <ul class="list" v-if="floors.length > 0">
        <li
          class="list-item"
          slot="header"
          color="--av-darkest-gray"
          v-for="floor in floors"
          v-bind:key="floor.id"
        >
          <router-link :to="getFloorRoute(floor.id)">
            <span class="primaryText font-bold font-size-sm color-light-gray">{{
              floor.name
            }}</span>
            <span class="arrow-right"></span>
          </router-link>
        </li>
      </ul>

      <canvas ref="canvas" width="100" height="100" hidden></canvas>

      <NewFloorModal />
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import {
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonButton,
  IonItem,
} from "@ionic/vue";

import { Locations } from "@/stores/adminLocations";
import { Floors } from "@/stores/adminFloors";
import { getQR } from "@/composables/qr";
import { getPNG } from "@/composables/png";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, watch } from "vue";
import NewFloorModal from "@/components/modals/NewFloorModal.vue";
import { useRoute } from "vue-router";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { flowerOutline } from "ionicons/icons";
import { Organisations } from "@/stores/adminOrganisations";
import toastService from "@/services/toastService";

const route = useRoute();

const organisationId = route.params.id as string;
const locationId = route.params.locationId as string;

const Location = Locations();
const Organisation = Organisations();
const { location } = storeToRefs(Location);
const { organisationDetails } = storeToRefs(Organisation);
const Floor = Floors();
const { floors } = storeToRefs(Floor);
const canvas = ref();

const saveChanges = (id: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const postCodePattern = /^[a-zA-Z0-9\s-]*$/;
  const phoneNumberPattern = /^[0-9-]*$/;
  let isValid = true;
  // Validate the email
  if (!emailPattern.test(location.value.email)) {
    toastService.show(
      "Error",
      "Please enter a valid email address",
      "error",
      "top"
    );
    isValid = false;
  }

  // Validate the phone number
  if (!phoneNumberPattern.test(location.value.phone)) {
    toastService.show(
      "Error",
      "Please enter a valid phone number",
      "error",
      "top"
    );
    isValid = false;
  }

  // Validate the postcode
  if (!postCodePattern.test(location.value.postcode)) {
    toastService.show(
      "Error",
      "Please enter a valid postcode",
      "error",
      "top"
    );
    isValid = false;
  }

  if (isValid) {
    // If all validations pass, then save the changes
    Location.updateLocation(organisationId, id);
  }
};

const exportQrCodes = async () => {
  const zip = new JSZip();

  const locationFolder = zip.folder(location.value.name);
  const qrFolder = locationFolder?.folder("QR Codes");

  for (let i = 0; i < floors.value.length; i++) {
    const f = floors.value[i];
    const floorFolder = qrFolder?.folder(f.name);

    for (let j = 0; j < f.spaces.length; j++) {
      const s = f.spaces[j];

      const qrUrl = `${process.env.VUE_APP_BASE_URL}/qr/${location.value.prefix}/${location.value.prefix}/${f.shortName}/${s.shortCode}`;
      const qr = getQR(qrUrl);
      const pngData = await getPNG(qr.display, 400, 400);

      floorFolder?.file(`${s.name}.png`, pngData, { binary: true });
    }
  }

  const content = await zip.generateAsync({ type: "blob" });

  const zipName = location.value.name;
  saveAs(content, zipName);
};

const getFloorRoute = (floorId: string) => {
  return {
    name: "OrganisationViewLocationsFloors",
    params: { id: organisationId, locationId, floorId },
  };
};

watch(
  () => route.params?.locationId,
  (newValue) => {
    if (newValue) {
      Floor.getFloors(newValue as string);
      Location.getLocation(newValue as string);
    }
  }
);

onBeforeMount(() => {
  Organisation.getOrgDetails(organisationId);
  Floor.getFloors(locationId);
  Location.getLocation(locationId);
});
</script>

<style scoped>
ion-content {
  margin: 0%;
}
.list {
  margin-bottom: 30px;
}
</style>
