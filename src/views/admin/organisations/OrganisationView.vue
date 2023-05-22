<template>
  <div>
    <h1 class="font-bold font-size-lg color-light-gray">{{ organisationDetails.name }}</h1>
    <ul class="organisation-options-menu">
      <li class="organisation-options-menu-item">
        <ion-item :router-link="{ name: 'OrganisationViewDetails' }" router-direction="root">
          <span class="link-text">Details</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item :router-link="{ name: 'OrganisationViewTheme' }" router-direction="root">
          <span class="link-text">Theme</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item :router-link="{ name: 'OrganisationViewSpaceMetadata' }" router-direction="root">
          <span class="link-text">Space Metadata</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item :router-link="{ name: 'OrganisationViewDocumentTypes' }" router-direction="root">
          <span class="link-text">Document Types</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item :router-link="{ name: 'OrganisationViewDecisionTrees' }" router-direction="root">
          <span class="link-text">Decision Trees</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item :router-link="{ name: 'OrganisationViewIntegrationsList' }" router-direction="root">
          <span class="link-text">Integrations</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
      <li class="organisation-options-menu-item">
        <ion-item :router-link="{ name: 'OrganisationViewLocations' }" router-direction="root">
          <span class="link-text">Locations</span>
          <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
        </ion-item>
      </li>
    </ul>
    <div class="delete-div">
      <ion-button class="delete-button font-size-sm text-lowercase" color="red">
      Delete organisation
      </ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IonItem,
  IonIcon,
  IonButton
} from "@ionic/vue"
import { onBeforeMount, ref } from "vue"
import { chevronForwardOutline } from "ionicons/icons"
import {Organisations} from '@/stores/adminOrganisations'
import { storeToRefs } from 'pinia'

const organisation = Organisations()
const { organisationDetails } = storeToRefs(organisation);

onBeforeMount(() =>{
  organisation.getOrgDetails()
})
</script>

<style scoped>
/* check why the button can only change color to red 
if both back ground color on style and color="red" are used together */
.delete-button{
  background-color: var(--av-red);
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 8px;
}
.delete-div{
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
  --color: #FFFFFF;
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
