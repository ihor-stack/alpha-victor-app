<template>
  <h1 class="font-bold font-size-lg color-light-gray">LinkedIn</h1>
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
  <ion-button>
    Delete organisation
  </ion-button>
</template>

<script setup lang="ts">
import { IonItem, IonIcon } from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
</script>

<style scoped>
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
