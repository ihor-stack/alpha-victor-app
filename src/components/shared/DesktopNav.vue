<template>
  <div class="side-nav">
    <desktop-header class="no-background">
      <template #start>
        <div class="header-spacing">
          <ion-title class="no-lp">
            <router-link to="/dashboard">
              <img
                src="@/theme/img/logo/logo-without-name.svg"
                class="logo"
                alt="AlphaVictor logo"
              />
            </router-link>
          </ion-title>
          <ion-button fill="clear" color="light" @click="logout">
            <ion-icon
              :icon="logOutOutline"
              color="light"
              class="logout"
            ></ion-icon>
            <span class="font-mono font-size-xs low-caps">logout</span>
          </ion-button>
        </div>
      </template>
    </desktop-header>
    <ion-content class="ion-padding no-tp">
      <ul class="nav-menu">
        <!-- <li class="nav-menu-link">
          <router-link to="/" class="font-size-lg color-light-gray"
            >Home</router-link
          >
        </li> -->
        <li class="nav-menu-link arrow-align">
          <router-link to="/dashboard" class="font-size-sm color-light-gray"
            >Dashboard</router-link
          >
          <ion-icon
            :icon="chevronForwardOutline"
            color="light"
            class="arrow-right"
          ></ion-icon>
        </li>

        <li class="nav-menu-link arrow-align">
          <router-link to="/space" class="font-size-sm color-light-gray"
            >Favourites</router-link
          >
          <ion-icon
            :icon="chevronForwardOutline"
            color="light"
            class="arrow-right"
          ></ion-icon>
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link to="/space" class="font-size-sm color-light-gray"
            >Find a space</router-link
          >
          <ion-icon
            :icon="chevronForwardOutline"
            color="light"
            class="arrow-right"
          ></ion-icon>
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link to="/space" class="font-size-sm color-light-gray"
            >Recently viewed</router-link
          >
          <ion-icon
            :icon="chevronForwardOutline"
            color="light"
            class="arrow-right"
          ></ion-icon>
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link to="/admin" class="font-size-sm color-light-gray"
            >Account settings</router-link
          >
          <ion-icon
            :icon="chevronForwardOutline"
            color="light"
            class="arrow-right"
          ></ion-icon>
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link to="/about" class="font-size-sm color-light-gray"
            >About Alpha Victor</router-link
          >
          <ion-icon
            :icon="chevronForwardOutline"
            color="light"
            class="arrow-right"
          ></ion-icon>
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link to="/admin" class="font-size-sm color-light-gray"
            >Terms & conditions</router-link
          >
          <ion-icon
            :icon="chevronForwardOutline"
            color="light"
            class="arrow-right"
          ></ion-icon>
        </li>
        <div class="spacer-line"></div>
        <li class="sub-title font-size-xxs color-light-gray">administration</li>
        <li class="nav-menu-link arrow-align">
          <router-link to="/admin/organisations" class="font-size-sm color-light-gray"
            >Organisations</router-link
          >
          <ion-icon
            :icon="chevronForwardOutline"
            color="light"
            class="arrow-right"
          ></ion-icon>
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link to="/admin/equipment" class="font-size-sm color-light-gray"
            >Equipment</router-link
          >
          <ion-icon
            :icon="chevronForwardOutline"
            color="light"
            class="arrow-right"
          ></ion-icon>
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link to="/admin/documents" class="font-size-sm color-light-gray"
            >Document Types</router-link
          >
          <ion-icon
            :icon="chevronForwardOutline"
            color="light"
            class="arrow-right"
          ></ion-icon>
        </li>
      </ul>
    </ion-content>
  </div>
  <!-- <ion-menu>
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
  </ion-menu> -->
</template>

<script setup lang="ts">
import {
  IonMenu,
  IonTitle,
  IonContent,
  IonMenuToggle,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import DesktopHeader from "@/components/shared/DesktopHeader.vue";
import {
  closeOutline,
  logOutOutline,
  chevronForwardOutline,
} from "ionicons/icons";
import AppHeader from "./AppHeader.vue";

const logout = () => {
  console.log("logging out");
};
</script>

<style scoped>
.side-nav {
  height: 100%;
  width: 30%;
  max-width: 300px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #0000ff;
  transition: 0.5s;
}
ion-menu {
  --min-width: 100vw;
  --background: #0000ff;
}
@media only screen and (max-width: 1023px) {
  .side-nav {
    display: none;
  }
}
ion-content {
  --background: none;
}

.logout {
  transform: rotate(180deg);
}
.low-caps {
  text-transform: lowercase;
  padding-top: 1px;
  padding-left: 5px;
}
.arrow-align {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.arrow-right {
  margin-top: -3px;
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
  padding-bottom: 21px;
}
.sub-title {
  padding-bottom: 20px;
}
.no-tp {
  --padding-top: unset;
}
.no-lp {
  padding-inline: unset !important;
}
.header-spacing {
  width: 250px;
  display: flex;
  justify-content: space-between;
}
</style>
