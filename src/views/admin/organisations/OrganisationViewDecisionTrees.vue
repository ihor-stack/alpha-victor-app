<template>
  <h1 class="title-admin font-bold font-size-lg color-light-gray">Decision Trees</h1>

  <ion-grid class="form-admin">

    <ion-row class="form-admin--group">
      <ion-col size-xs="4" size-sm="4" class="form-admin--group_field">
        <ion-input class="font-size-sm" color="light" placeholder="Add new decision tree"></ion-input>
      </ion-col>
      <ion-col size-xs="2" size-sm="2" class="form-admin--group_field">
        <ion-button>Add new +</ion-button>
      </ion-col>
    </ion-row>

    <ion-row>
      Current decisions trees
      <ion-item :router-link="{ name: 'OrganisationViewDecisionTreeDetails' }" router-direction="root">
        Boardroom DT
      </ion-item>
      <ion-item :router-link="{ name: 'OrganisationViewDecisionTreeDetails' }" router-direction="root">
        Boardroom DT
      </ion-item>
    </ion-row>

  </ion-grid>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
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
