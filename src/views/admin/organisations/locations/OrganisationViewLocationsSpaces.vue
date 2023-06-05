<template>
  <div>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="2" class="form-admin--group_field">
          <div class="img-container">
            <img
              src="https://imageio.forbes.com/specials-images/imageserve/61b8b4834a7373c7800e631a/Business-people-video-conferencing-in-meeting-room/960x0.jpg?format=jpg&width=960"
              alt=""
            />
          </div>
        </ion-col>
        <ion-col
          size-xs="12"
          size-sm="6"
          class="form-admin--group_field header-left"
        >
          <h1 class="font-bold font-size-lg color-light-gray">
            {{ space.spaceName }}
          </h1>
          <span
            class="font-size-xs font-mono color-light-gray header-left--label"
          >
            <ion-icon :icon="locationOutline" color="light"></ion-icon>
            Howard Street Belfast
          </span>
          <span
            class="font-size-xs font-mono color-light-gray header-left--label"
          >
            <ion-icon :icon="peopleOutline" color="light"></ion-icon>
            &gt;&gt; {{ space.capacity }}
          </span>
        </ion-col>
        <ion-col
          size-xs="12"
          size-sm="4"
          class="form-admin--group_field header-right"
        >
          <div class="header-right--icon">
            <ion-icon
              :icon="qrCodeOutline"
              color="light"
              class="large_icons"
            ></ion-icon>
          </div>
          <div class="header-right--icon">
            <ion-icon
              :icon="scanOutline"
              color="light"
              class="large_icons"
            ></ion-icon>
          </div>
        </ion-col>
        <ion-col size-xs="12">
          <space-features-slider :features="space.spaceFeatures" />
        </ion-col>
      </ion-row>
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">Space name</ion-label>
          <ion-input
            class="font-size-sm"
            color="light"
            :value="space.spaceName"
            @ion-input="space.spaceName = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">Space shortcode</ion-label>
          <ion-input
            class="font-size-sm"
            color="light"
            :value="space.shortcode"
            @ion-input="space.shortcode = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">Room type</ion-label>
          <AdminSelect v-model="roomTypeSelected" :options="formattedSelect" idPrefix="room-type-select" />
          
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">Capacity</ion-label>
          <ion-input
            class="font-size-sm"
            color="light"
            :value="space.capacity"
            @ion-input="space.capacity = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">Typeform ID</ion-label>
          <ion-input
            class="font-size-sm"
            color="light"
            :value="space.typeformId"
            @ion-input="space.typeformId = String($event.target.value)"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">Decision Tree</ion-label>
          <AdminSelect v-model="decisionTreeSelected" :options="decisionTreeList" idPrefix="decision-tree-select" />
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />

      <ion-row>
        <ion-col size-xs="6">
          <ion-label color="light">Photos</ion-label>
        </ion-col>
        <ion-col size-xs="6">
          <PhotoModal />
        </ion-col>
      </ion-row>
 
      <ImageGallery :images="space.photos" @image-removed="handleImageRemoved" />

      <!-- <hr class="form-admin--divider" />

            <ion-row>
                <ion-col size-xs="6">
                    <ion-label color="light">Documents</ion-label>
                </ion-col>
                <ion-col size-xs="6">
                    <DocumentModal />
                </ion-col>
            </ion-row>

            <ion-row class="form-admin--group_field component_container">
                <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
                    <div v-for="document in space.documents" :key="document.id">
                        <ItemField
                        v-model="document.name"
                        :data="document"
                        icon=""
                        :id="document.id"
                        placeholder="Document Type"
                        />
                    </div>
                </ion-col>
            </ion-row>

            <hr class="form-admin--divider" /> -->

      <ul class="list">
        <li
          v-for="(space, index) in spaceRoutes"
          v-bind:key="index"
          class="list-item"
        >
          <router-link
            :to="redirect(space.route)"
            router-direction="root"
            class="list-item__info"
          >
            <div class="list-item__details">
              <p class="primaryText font-bold font-size-sm color-light-gray">
                {{ space.title }}
              </p>
            </div>
          </router-link>
          <span class="arrow-right"></span>
        </li>
      </ul>
    </ion-grid>
    <div class="button-pair">
      <ion-button class="button-wide" @click="Space.updateSpace()">
        Save changes
      </ion-button>
      <ion-button class="button-wide button-red button-outline" color="red">
        Delete space
      </ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
  IonThumbnail,
} from "@ionic/vue";
import {
  locationOutline,
  peopleOutline,
  qrCodeOutline,
  scanOutline,
} from "ionicons/icons";
import SpaceFeaturesSlider from "@/components/space/SpaceFeaturesSlider.vue";
import { storeToRefs } from "pinia";
import { Spaces } from "@/stores/adminSpaces";
import { useCookies } from "vue3-cookies";
import { onBeforeMount, ref } from "vue";
import AdminSelect from "@/components/admin/AdminSelect.vue";
import { Organisations } from '@/stores/adminOrganisations'
import DocumentModal from "@/components/admin/spaces/DocumentModal.vue";
import PhotoModal from "@/components/admin/spaces/PhotoModal.vue";
import ImageGallery from "@/components/shared/ImageGallery.vue";

const { cookies } = useCookies();
const Space = Spaces();
  
const organisation = Organisations()
const { space, currentSpace, formattedSelect, roomTypeSelected } = storeToRefs(Space);
const { decisionTreeList, decisionTreeSelected } = storeToRefs(organisation);

const redirect = (route: string) => {
  if (
    cookies.get("floorId") &&
    cookies.get("orgId") &&
    cookies.get("spaceId")
  ) {
    return {
      name: route,
      params: {
        id: cookies.get("orgId"),
        locationId: cookies.get("locationId"),
        floorId: cookies.get("floorId"),
        spaceId: cookies.get("spaceId"),
      },
    };
  }
};

const handleImageRemoved = (photoId: string) => {
  Space.deleteSpacesPhoto(photoId)
};

// const removeSpacesDocument = (data: Spaces) => {
//     Space.deleteSpacesDocument(data.id);
// };

const spaceRoutes = [
  { title: "Panorama", route: "" },
  { title: "Devices", route: "OrganisationViewLocationsDevices" },
  { title: "Beacon", route: "OrganisationViewLocationsBeacon" },
  { title: "Integrations", route: "OrganisationViewLocationsIntegrations" },
  { title: "Wifi Password", route: "OrganisationViewLocationsWifi" },
];

onBeforeMount(() => {
  Space.getSpaceDetails();
  organisation.getDecisionTrees()
});
</script>

<style scoped>
.img-container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-left--label {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.header-left--label ion-icon {
  width: 15px;
  height: 15px;
  margin-right: 10px;
}

.header-right {
  display: flex;
  justify-content: end;
}
.header-right--icon ion-icon {
  width: 50px;
  height: 50px;
  border-right: 1px solid var(--av-dark-grey);
  margin: 0 25px;
}
</style>
