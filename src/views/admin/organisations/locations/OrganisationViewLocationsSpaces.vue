<template>
  <div v-if="!state.isLoadingSpaceDetails">
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
            <ion-icon :icon="locationOutline"></ion-icon>
            {{ space.location?.name }}
          </span>
          <span
            class="font-size-xs font-mono color-light-gray header-left--label"
          >
            <ion-icon :icon="peopleOutline"></ion-icon>
            &gt;&gt; {{ space.capacity }}
          </span>
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
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.locations.spaces.name")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="space.spaceName"
            @ion-input="
              space.spaceName = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.locations.spaces.shortcode")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="space.shortcode"
            @ion-input="
              space.shortcode = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
            @ionBlur="transformToUpper"
            @keyup.enter="transformToUpper"
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.locations.spaces.roomType")
          }}</ion-label>
          <AdminSelect
            v-if="formattedSelect.length"
            v-model="roomTypeSelected"
            :options="formattedSelect"
            idPrefix="room-type-select"
            :handleChange="() => confirmToLeaveService.setEditing(true)"
          />
          <ion-label text-wrap="true" class="empty-state" v-else>{{
            $t("pages.admin.organisations.view.locations.spaces.notifyRoomType")
          }}</ion-label>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.locations.spaces.capacity")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="space.capacity"
            @ion-input="
              space.capacity = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.locations.spaces.typeform")
          }}</ion-label>
          <ion-input
            class="font-size-sm"
            :value="space.typeformId"
            @ion-input="
              space.typeformId = String($event.target.value);
              confirmToLeaveService.setEditing(true);
            "
          ></ion-input>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.locations.spaces.decision")
          }}</ion-label>
          <AdminSelect
            v-if="decisionTreeList.length"
            :options="decisionTreeList"
            v-model="decisionTreeSelected"
            idPrefix="decision-tree-select"
            :handleChange="() => confirmToLeaveService.setEditing(true)"
          />
          <ion-label text-wrap="true" class="empty-state" v-else>{{
            $t(
              "pages.admin.organisations.view.locations.spaces.notifyDecisionTree"
            )
          }}</ion-label>
        </ion-col>
      </ion-row>

      <ion-row class="form-admin--group">
        <ion-col size-xs="12" class="form-admin--group_field ion-no-padding">
          <div class="photos-container">
            <ion-item lines="none" class="ion-no-padding">
              <ion-label text-wrap="true">{{
                $t("pages.admin.organisations.view.locations.spaces.photos")
              }}</ion-label>
              <PhotoModal
                :isFirstPhoto="isFirstPhoto"
                :queryParams="`spaceId=${spaceId}`"
                :hasCaption="true"
                :callback="() => Space.getSpaceDetails(spaceId)"
              />
            </ion-item>
            <ImageGallery
              v-if="space.photos && space.photos.length"
              :images="space.photos"
              :toggleImageFeatured="toggleImageFeatured"
              @image-reordered="handleImageReordered"
              @image-removed="handleImageRemoved"
            />
          </div>
        </ion-col>

        <ion-col size-xs="12" class="form-admin--group_field ion-no-padding">
          <div class="photos-container">
            <ion-item lines="none" class="ion-no-padding">
              <ion-label text-wrap="true">{{
                $t("pages.admin.organisations.view.locations.spaces.documents")
              }}</ion-label>
              <DocumentModal :organisationId="organisationId" />
            </ion-item>
            <div v-for="doc in space.documents" :key="doc.id">
              <ItemField
                :modelValue="doc.name"
                :data="doc"
                icon=""
                :id="doc.id"
                fontSize="xs"
                :hideRemove="false"
                @update:modelValue="
                (value: string) => updateDocumentName({ ...doc, name: value })
              "
                @remove="removeSpacesDocument"
              />
            </div>
          </div>
        </ion-col>
      </ion-row>

      <ul class="list">
        <li
          v-for="(space, index) in spaceRoutes"
          v-bind:key="index"
          class="list-item"
        >
          <router-link
            :to="redirect(space)"
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
        {{ $t("pages.admin.organisations.view.locations.spaces.saveBtn") }}
      </ion-button>
      <ion-button
        class="button-wide button-red button-outline"
        color="red"
        @click="deleteSpace"
      >
        {{ $t("pages.admin.organisations.view.locations.spaces.deleteBtn") }}
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
import { locationOutline, peopleOutline } from "ionicons/icons";
import SpaceFeaturesSlider from "@/components/admin/spaces/SpaceFeaturesSlider.vue";
import { storeToRefs } from "pinia";
import { Spaces } from "@/stores/adminSpaces";
import { onBeforeMount, watch, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import AdminSelect from "@/components/admin/AdminSelect.vue";
import { Organisations } from "@/stores/adminOrganisations";
import { adminDocuments } from "@/stores/adminDocumentTypes";
import DocumentModal from "@/components/admin/spaces/DocumentModal.vue";
import PhotoModal from "@/components/admin/spaces/PhotoModal.vue";
import ImageGallery from "@/components/shared/ImageGallery.vue";
import ItemField from "@/components/admin/ItemField.vue";
import confirmToLeaveService from "@/services/confirmToLeaveService";
import { Photo, SpaceDetailsDocs } from "@/types";
import { Locations } from "@/stores/adminLocations";

const route = useRoute();

const organisationId = route.params.id as string;
const locationId = computed(() => route.params.locationId as string);
const floorId = computed(() => route.params.floorId as string);
const spaceId = computed(() => route.params.spaceId as string);
const DocTypes = adminDocuments();

const Space = Spaces();
const Location = Locations();
const organisation = Organisations();

const {
  space,
  formattedSelect,
  roomTypeSelected,
  decisionTreeSelected,
  integrations,
} = storeToRefs(Space);

const { organisationDetails } = storeToRefs(organisation);
const decisionTreeList = computed(
  () =>
    organisationDetails.value.decisionTrees?.map((tree, index) => ({
      id: index,
      title: tree.name,
      additionalInfo: tree.id,
    })) || []
);
const state = reactive({
  isLoadingSpaceDetails: true,
});

const isFirstPhoto = computed(() => !space.value.photos?.length);
const redirect = (routeItem) => {
  return {
    name: routeItem.route,
    params: {
      id: organisationId,
      locationId: locationId.value,
      floorId: floorId.value,
      spaceId: spaceId.value,
    },
    query: routeItem.query,
  };
};

const transformToUpper = () => {
  space.value.shortcode = space.value.shortcode.toUpperCase();
};

const handleImageRemoved = (photoId: string) => {
  Space.deletePhoto(photoId).then(() => {
    Space.getSpaceDetails(spaceId.value);
  });
};

const handleImageReordered = (photos: Photo[]) => {
  Space.reorderPhotos(photos).then(() => {
    Space.getSpaceDetails(spaceId.value);
  });
};

const toggleImageFeatured = (photo: Photo) => {
  Space.updatePhoto(String(photo.id), {
    featured: true,
    name: photo.name,
    caption: photo.caption || "",
  }).then(() => {
    Space.getSpaceDetails(spaceId.value);
  });
};

const removeSpacesDocument = (doc: SpaceDetailsDocs) => {
  Space.deleteSpacesDocument(doc.id, spaceId.value);
};

const updateDocumentName = (updatedDoc: SpaceDetailsDocs) => {
  DocTypes.updateDocumentName(updatedDoc.id, updatedDoc.name).then(() => {
    Space.getSpaceDetails(spaceId.value);
  });
};

const deleteSpace = async () => {
  await Space.deleteSpace(
    spaceId.value,
    organisationId,
    locationId.value,
    floorId.value
  );
  await Location.getNavigationTree(organisationId);
};

const spaceRoutes = computed(() => {
  const routes: any[] = [
    { title: "Panorama", route: "OrganisationViewLocationsPanorama" },
    { title: "Devices", route: "OrganisationViewLocationsDevices" },
    { title: "Announcement", route: "OrganisationViewLocationsAnnouncement" },
    { title: "Beacon", route: "OrganisationViewLocationsBeacon" },
    { title: "Wifi Password", route: "OrganisationViewLocationsWifi" },
  ];
  if (integrations.value?.length > 0) {
    routes.push({
      route: "OrganisationViewLocationsIntegrations",
      title: "Integrations",
      query: {
        spaceIntegrationId: spaceIntegrationId?.value,
      },
    });
  }
  return routes;
});

const spaceIntegrationId = computed(() => integrations.value?.[0]?.id);

watch(
  () => route.params?.spaceId,
  (newValue) => {
    if (newValue) {
      Space.getSpaceDetails(newValue as string);
      Space.getIntegrations(newValue as string);
    }
  }
);

onBeforeMount(async () => {
  try {
    await Promise.all([
      Space.getSpaceDetails(spaceId.value),
      Space.getIntegrations(spaceId.value),
    ]);
  } finally {
    // TO DO - Refactor later to more elegant solution
    setTimeout(() => {
      state.isLoadingSpaceDetails = false;
    }, 1000); // 1 seconds
  }
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

.header-left {
  margin-left: 20px;
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

.photos-container {
  margin: 0 !important;
}

.form-admin--group_field.ion-no-padding {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

ion-item {
  --background: transparent;
}
</style>
