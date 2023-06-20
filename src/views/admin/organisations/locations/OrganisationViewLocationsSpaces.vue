<template>
  <div>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col
          v-if="space.featuredImagePath || space.photos?.[0]?.path"
          size-xs="12"
          size-sm="2"
          class="form-admin--group_field"
        >
          <div class="img-container">
            <img
              :src="space.featuredImagePath || space.photos?.[0]?.path"
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
          <space-features-slider
            :features="space.spaceFeatures"
            :allFeatures="space.spaceFeatures"
          />
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
          <AdminSelect
            v-model="roomTypeSelected"
            :options="formattedSelect"
            idPrefix="room-type-select"
          />
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
          <AdminSelect
            :options="decisionTreeList"
            v-model="decisionTreeSelected"
            idPrefix="decision-tree-select"
          />
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />
      <ion-item lines="none">
        <ion-label color="light">Photos</ion-label>
        <PhotoModal
          :isFirstPhoto="isFirstPhoto"
          :queryParams="`spaceId=${spaceId}`"
          :callback="() => Space.getSpaceDetails(spaceId)"
        />
      </ion-item>
      <ImageGallery
        :images="space.photos"
        @image-removed="handleImageRemoved"
      />
      <hr class="form-admin--divider" />
      <ion-item lines="none">
        <ion-label color="light">Documents</ion-label>
        <DocumentModal />
      </ion-item>

      <ion-row class="form-admin--group_field component_container">
        <ion-col
          size-xs="12"
          size-md="6"
          class="form-admin--group_field"
          v-for="document in space.documents"
          :key="document.id"
        >
          <ion-item
            button
            class="form-admin--group_field-item rev-margin"
            lines="none"
          >
            <ion-label color="light">
              {{ document.name }}
            </ion-label>
            <ion-button
              class="button-red text-lowercase"
              slot="end"
              fill="clear"
              size="small"
              @click="removeSpacesDocument(document.id)"
            >
              &gt;&gt; remove
            </ion-button>
          </ion-item>
        </ion-col>
      </ion-row>

      <hr class="form-admin--divider" />

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
      <ion-button class="button-wide" @click="Space.updateSpace(spaceId)">
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
} from "@ionic/vue";
import {
  locationOutline,
  peopleOutline,
  qrCodeOutline,
  scanOutline,
} from "ionicons/icons";
import SpaceFeaturesSlider from "@/components/admin/spaces/SpaceFeaturesSlider.vue";
import { storeToRefs } from "pinia";
import { Spaces } from "@/stores/adminSpaces";
import { onBeforeMount, watch, computed } from "vue";
import { useRoute } from "vue-router";
import AdminSelect from "@/components/admin/AdminSelect.vue";
import { Organisations } from "@/stores/adminOrganisations";
import DocumentModal from "@/components/admin/spaces/DocumentModal.vue";
import PhotoModal from "@/components/admin/spaces/PhotoModal.vue";
import ImageGallery from "@/components/shared/ImageGallery.vue";

const route = useRoute();

const organisationId = route.params.id as string;
const locationId = route.params.locationId as string;
const floorId = route.params.floorId as string;
const spaceId = route.params.spaceId as string;

const Space = Spaces();
const organisation = Organisations();

const { space, formattedSelect, roomTypeSelected, decisionTreeSelected } = storeToRefs(Space);
const { decisionTreeList } = storeToRefs(organisation);

const isFirstPhoto = computed(() => !space.value.photos?.length);
const redirect = (route: string) => {
  return {
    name: route,
    params: {
      id: organisationId,
      locationId,
      floorId,
      spaceId,
    },
  };
};

const handleImageRemoved = (photoId: string) => {
  Space.deletePhoto(photoId).then(() => {
    Space.getSpaceDetails(spaceId);
  });
};

const removeSpacesDocument = (documentId: string) => {
  Space.deleteSpacesDocument(documentId, spaceId);
};

const spaceRoutes = [
  { title: "Panorama", route: "OrganisationViewLocationsPanorama" },
  { title: "Devices", route: "OrganisationViewLocationsDevices" },
  { title: "Announcement", route: "OrganisationViewLocationsAnnouncement" },
  { title: "Beacon", route: "OrganisationViewLocationsBeacon" },
  { title: "Integrations", route: "OrganisationViewLocationsIntegrations" },
  { title: "Wifi Password", route: "OrganisationViewLocationsWifi" },
];

watch(
  () => route.params?.spaceId,
  (newValue) => {
    if (newValue) {
      Space.getSpaceDetails(newValue as string);
    }
  }
);

onBeforeMount(() => {
  Space.getSpaceDetails(spaceId);
  organisation.getDecisionTrees();
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

ion-item {
  --background: transparent;
}
</style>
