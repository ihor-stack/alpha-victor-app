<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ state.name }}
    </h1>
    <ul class="organisation-options-menu">
      <li class="organisation-options-menu-item">
        <ion-item
          :router-link="{ name: 'OrganisationViewDetails' }"
          router-direction="root"
        >
          <span class="link-text">{{
            $t("pages.admin.organisations.view.details.title")
          }}</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item
          :router-link="{ name: 'OrganisationViewTheme' }"
          router-direction="root"
        >
          <span class="link-text">{{
            $t("pages.admin.organisations.view.theme.title")
          }}</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item
          :router-link="{ name: 'OrganisationViewSpaceMetadata' }"
          router-direction="root"
        >
          <span class="link-text">{{
            $t("pages.admin.organisations.view.spaceMetadata.title")
          }}</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item
          :router-link="{ name: 'OrganisationViewDocumentTypes' }"
          router-direction="root"
        >
          <span class="link-text">{{
            $t("pages.admin.organisations.view.documentTypes.title")
          }}</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" />
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
          <span class="link-text">{{
            $t("pages.admin.organisations.view.decisionTrees.title")
          }}</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item
          :router-link="{ name: 'OrganisationViewIntegrationsList' }"
          router-direction="root"
        >
          <span class="link-text">{{
            $t("pages.admin.organisations.view.integrations.title")
          }}</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item
          v-if="locations.length > 0"
          :router-link="{
            name: 'OrganisationViewLocations',
            params: { locationId: locations[0].id },
          }"
          router-direction="root"
        >
          <span class="link-text">{{
            $t("pages.admin.organisations.view.locations.title")
          }}</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item v-if="locations.length < 1" router-direction="root">
          <NewLocationModal />
          <ion-icon slot="end" :icon="chevronForwardOutline" />
        </ion-item>
      </li>
    </ul>
    <div class="delete-div">
      <DeleteOrganisationModal :organisationId="organisationId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonItem, IonIcon } from "@ionic/vue";
import { onBeforeMount, reactive } from "vue";
import { chevronForwardOutline } from "ionicons/icons";
import { Organisations } from "@/stores/adminOrganisations";
import { Locations } from "@/stores/adminLocations";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import DeleteOrganisationModal from "@/components/modals/DeleteOrganisationModal.vue";
import NewLocationModal from "@/components/modals/NewLocationModal.vue";

const route = useRoute();

const organisation = Organisations();
const location = Locations();

const state = reactive({
  name: "",
});

const { organisationDetails } = storeToRefs(organisation);
const { locations } = storeToRefs(location);
const organisationId = route.params.id as string;

onBeforeMount(() => {
  organisation.setId(organisationId);
  organisation.setOrgId(organisationId);
  organisation.getOrgDetails(organisationId).then(() => {
    state.name = organisation.currentOrganisationDetails.name;
  });
  location.getLocations(organisationId);
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
