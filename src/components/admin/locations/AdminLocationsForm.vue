<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ location.name }}
    </h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group_field">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t(
              "components.admin.locations.adminLocationsForm.locationNameLabel"
            )
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.name"
            @ion-input="
              location.name = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t(
              "components.admin.locations.adminLocationsForm.locationPrefixLabel"
            )
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            @ionBlur="transformToUpper"
            @keyup.enter="transformToUpper"
            :value="location.prefix"
            @ion-input="
              location.prefix = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />

      <ion-row class="form-admin--group_field">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("components.admin.locations.adminLocationsForm.contactNameLabel")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.mainContactName"
            @ion-input="
              location.mainContactName = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t(
              "components.admin.locations.adminLocationsForm.emailAddressLabel"
            )
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.email"
            @ion-input="
              location.email = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("components.admin.locations.adminLocationsForm.phoneNumberLabel")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.phone"
            @ion-input="
              location.phone = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("components.admin.locations.adminLocationsForm.sosNumberLabel")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.sosNumber"
            @ion-input="
              location.sosNumber = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("components.admin.locations.adminLocationsForm.sosVIPLabel")
          }}</ion-label>
          <ion-input class="form-toggle" :disabled="true">
            <ion-label text-wrap="true">{{
              $t("components.admin.locations.adminLocationsForm.sosVIPText")
            }}</ion-label>
            <ion-toggle
              color="primary"
              :checked="location.sosNumberPublic"
              @ionChange="
                location.sosNumberPublic = $event.detail.checked;
                confirmToLeaveService.setEditing(true);
              "
            />
          </ion-input>
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />

      <ion-row class="form-admin--group_field">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("components.admin.locations.adminLocationsForm.publicWifiLabel")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.wifiSsid"
            @ion-input="
              location.wifiSsid = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t(
              "components.admin.locations.adminLocationsForm.wifiPasswordLabel"
            )
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.wifiPassword"
            @ion-input="
              location.wifiPassword = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />

      <ion-row class="form-admin--group_field">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t(
              "components.admin.locations.adminLocationsForm.addressLine1Label"
            )
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.addressLine0"
            @ion-input="
              location.addressLine0 = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t(
              "components.admin.locations.adminLocationsForm.addressLine2Label"
            )
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.addressLine1"
            @ion-input="
              location.addressLine1 = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("components.admin.locations.adminLocationsForm.cityLabel")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.city"
            @ion-input="
              location.city = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("components.admin.locations.adminLocationsForm.postcodeLabel")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="location.postcode"
            @ion-input="
              location.postcode = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" class="button-pair">
          <ion-button class="button-wide" @click="saveChanges(location.id)">
            {{
              $t(
                "components.admin.locations.adminLocationsForm.saveChangesButton"
              )
            }}
          </ion-button>
          <ion-button
            class="button-wide button-outline"
            fill="outline"
            color="--av-light-gray"
            @click="exportQrCodes()"
          >
            {{
              $t(
                "components.admin.locations.adminLocationsForm.exportQRCodesButton"
              )
            }}
          </ion-button>
          <DeleteLocationModal
            :organisationId="organisationId"
            :locationId="locationId"
          />
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />

      <h1 class="title-admin font-bold font-size-lg color-light-gray">
        {{ $t("components.admin.locations.adminLocationsForm.floorsHeader") }}
      </h1>

      <ul class="list" v-if="floors.length > 0">
        <ion-reorder-group
          :disabled="false"
          @ionItemReorder="handleReorder($event)"
        >
          <li
            class="list-item"
            slot="header"
            color="--av-darkest-gray"
            v-for="floor in floors"
            v-bind:key="floor.id"
          >
            <router-link :to="getFloorRoute(floor.id)">
              <div class="floor-name-wrapper">
                <ion-reorder v-if="floors.length > 1">
                  <ion-icon
                    :icon="reorderThree"
                    class="color-light-gray"
                  ></ion-icon>
                </ion-reorder>
                <span
                  class="primaryText font-bold font-size-sm color-light-gray"
                  >{{ floor.name }}</span
                >
              </div>
              <span class="arrow-right"></span>
            </router-link>
          </li>
        </ion-reorder-group>
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
  IonToggle,
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
import { Organisations } from "@/stores/adminOrganisations";
import DeleteLocationModal from "@/components/modals/DeleteLocationModal.vue";
import toastService from "@/services/toastService";
import confirmToLeaveService from "@/services/confirmToLeaveService";
import { reorderThree } from "ionicons/icons";

const route = useRoute();

const organisationId = route.params.id as string;
const locationId = route.params.locationId as string;

const Location = Locations();
const Organisation = Organisations();
const { location } = storeToRefs(Location);
const Floor = Floors();
const { floors } = storeToRefs(Floor);
const canvas = ref();

const transformToUpper = () => {
  location.value.prefix = location.value.prefix.toUpperCase();
};

const saveChanges = (id: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const postCodePattern = /^[A-Za-z]{1,2}\d{1,2}[A-Za-z\d]? ?\d[A-Za-z]{2}$/;
  const phoneNumberPattern = /^[0-9-]*$/;
  let isValid = true;

  // Validate the prefix
  if (!location.value.prefix || location.value.prefix.length < 3) {
    toastService.show(
      "Error",
      "Location prefix must have at least 3 characters",
      "error",
      "bottom"
    );
    isValid = false;
  }

  // Validate the email
  if (location.value.email && !emailPattern.test(location.value.email)) {
    toastService.show(
      "Error",
      "Please enter a valid email address",
      "error",
      "bottom"
    );
    isValid = false;
  }

  // Validate the phone number
  if (location.value.phone && !phoneNumberPattern.test(location.value.phone)) {
    toastService.show(
      "Error",
      "Please enter a valid phone number",
      "error",
      "bottom"
    );
    isValid = false;
  }

  // Validate the postcode
  if (
    location.value.postcode &&
    !postCodePattern.test(location.value.postcode)
  ) {
    toastService.show(
      "Error",
      "Please enter a valid postcode",
      "error",
      "bottom"
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
      const qrUrl = `${process.env.VUE_APP_BASE_URL}/qr/${s.shortCode}`;
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

const handleReorder = (event: CustomEvent) => {
  const { from, to }: { from: number; to: number } = event.detail;
  event.detail.complete();
  const requestBody = [
    {
      id: floors.value[from].id,
      order: to,
    },
  ];
  if (to < from) {
    for (let index = to; index < from; index++) {
      requestBody.push({
        id: floors.value[to].id,
        order: index + 1,
      });
    }
  } else {
    for (let index = from + 1; index <= to; index++) {
      requestBody.push({
        id: floors.value[to].id,
        order: index - 1,
      });
    }
  }
  Floor.updateFloorOrder(requestBody);
};

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

.floor-name-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
