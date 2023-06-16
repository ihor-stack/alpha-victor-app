<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ organisationDetails?.name }}
    </h1>
    <ul class="organisation-options-menu">
      <li class="organisation-options-menu-item">
        <ion-item
          :router-link="{ name: 'OrganisationViewDetails' }"
          router-direction="root"
        >
          <span class="link-text">Details</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item
          :router-link="{ name: 'OrganisationViewTheme' }"
          router-direction="root"
        >
          <span class="link-text">Theme</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item
          :router-link="{ name: 'OrganisationViewSpaceMetadata' }"
          router-direction="root"
        >
          <span class="link-text">Space Metadata</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item
          :router-link="{ name: 'OrganisationViewDocumentTypes' }"
          router-direction="root"
        >
          <span class="link-text">Document Types</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item
          :router-link="{
            name: 'OrganisationViewDecisionTrees',
            params: { id: organisationDetails?.id },
          }"
          router-direction="root"
        >
          <span class="link-text">Decision Trees</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item
          :router-link="{ name: 'OrganisationViewIntegrationsList' }"
          router-direction="root"
        >
          <span class="link-text">Integrations</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item
          v-if="locations.length > 0"
          :router-link="redirectToLocation(locations[0].id)"
          router-direction="root"
        >
          <span class="link-text">Locations</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item v-if="locations.length < 1" router-direction="root">
          <NewLocationModal />
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
    </ul>
    <div class="delete-div">
      <DeleteOrganisationModal />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonItem, IonIcon } from "@ionic/vue";
import { onBeforeMount } from "vue";
import { chevronForwardOutline } from "ionicons/icons";
import { Organisations } from "@/stores/adminOrganisations";
import { Locations } from "@/stores/adminLocations";
import { storeToRefs } from "pinia";
import { useCookies } from "vue3-cookies";
import { useRoute } from "vue-router";
import DeleteOrganisationModal from "@/components/modals/DeleteOrganisationModal.vue";
import NewLocationModal from "@/components/modals/NewLocationModal.vue";

const { cookies } = useCookies();
const route = useRoute();

const organisation = Organisations();
const location = Locations();

const { organisationDetails } = storeToRefs(organisation);
const { locations } = storeToRefs(location);

const redirectToLocation = (id: string) => {
  cookies.set("locationId", id);
  if (cookies.get("locationId")) {
    return { name: "OrganisationViewLocations", params: { locationId: id } };
  }
};

onBeforeMount(() => {
  const organisationId = route.params.id as string;
  console.log(organisation.organisationDetails, organisationId);
  if (organisation.organisationDetails?.id !== organisationId) {
    organisation.setId(organisationId);
    organisation.getOrgDetails();
    location.getLocations();
  }
});
</script>

<style scoped>
/* check why the button can only change color to red 
if both back ground color on style and color="red" are used together */
.delete-div {
  height: 322px;
  position: relative;
}
.organisation-options-menu {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.organisation-options-menu-item ion-item {
  --background: none;
  --color: #ffffff;
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  --inner-padding-top: 8px;
  --inner-padding-bottom: 8px;
  --border-color: #222222;
  cursor: pointer;
}

.organisation-options-menu-item ion-item ion-icon {
  margin-right: 0;
}

.organisation-options-menu-item .link-text {
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
}

.organisation-options-menu-item .arrow-right {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("@/theme/icons/arrow-right.svg");
  background-repeat: no-repeat;
  background-size: 8px 12px;
  background-position: center;
}

.organisation-options-menu-item .with-counter {
  display: flex;
  align-items: center;
}

.organisation-options-menu-item .counter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: #37b14c;
  border-radius: 50%;
  margin-left: 10px;
}

.organisation-options-menu-item .counter span {
  font-weight: 700;
  font-size: 11px;
  line-height: 11px;
  color: #ffffff;
}

ion-content.transparent::part(scroll)::-webkit-scrollbar {
  display: none;
}
</style>
