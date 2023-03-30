<template>
  <ion-menu content-id="content">
    <app-header class="no-background">
      <template #start>
        <ion-button fill="clear" color="light" @click="logout">
          <ion-icon
            :icon="logOutOutline"
            color="light"
            class="logout"
          ></ion-icon>
          <span class="font-mono font-size-xs">logout</span>
        </ion-button>
      </template>

      <template #end>
        <ion-menu-toggle>
          <ion-icon :icon="closeOutline" color="light" size="large"></ion-icon>
        </ion-menu-toggle>
      </template>
    </app-header>
    <ion-content class="ion-padding">
      <ul class="nav-menu">
        <li class="nav-menu-link">
          <router-link to="/" class="font-size-lg color-light-gray"
            >Home</router-link
          >
        </li>
        <li class="nav-menu-link">
          <router-link to="/settings" class="font-size-lg color-light-gray"
            >Settings</router-link
          >
        </li>
        <li class="nav-menu-link">
          <router-link to="/dashboard" class="font-size-lg color-light-gray"
            >Dashboard</router-link
          >
        </li>
        <li class="nav-menu-link">
          <router-link to="/space" class="font-size-lg color-light-gray"
            >Space</router-link
          >
        </li>
        <div class="spacer-line"></div>
        <li class="nav-menu-link">
          <router-link to="/admin" class="font-size-lg color-light-gray"
            >Admin</router-link
          >
        </li>
      </ul>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import {
  IonMenu,
  IonContent,
  IonMenuToggle,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { closeOutline, logOutOutline } from "ionicons/icons";
import AppHeader from "./AppHeader.vue";

const logout = () => {
  console.log("logging out");
};
</script>

<style scoped>
ion-menu {
  --min-width: 100vw;
  --background: #0000ff;
}
/* @media only screen and (min-width: 1024px) {
  ion-menu {
    --min-width: 30%;
  }
} */
ion-content {
  --background: none;
}

.logout {
  transform: rotate(180deg);
}

.nav-menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-menu-link {
  margin-bottom: 32px;
}

.spacer-line {
  border-top: 0.75px solid;
  border-bottom: none;
  padding-bottom: 32px;
}
</style>
