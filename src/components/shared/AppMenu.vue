<template>
  <ion-menu content-id="content">
    <app-header class="no-background">
      <template #start>
        <ion-button fill="clear" color="light" class="logout-button" @click="logout">
          <ion-icon :icon="logOutOutline" color="light" class="logout"></ion-icon>
          <span class="font-mono font-size-xs logout-text">logout</span>
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
          <ion-menu-toggle>
            <ion-item router-link="/dashboard" lines="none" router-direction="root">
              <span class="link-text">Dashboard</span>
            <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
            </ion-item>
          </ion-menu-toggle>
        </li>
        <li class="nav-menu-link">
          <ion-menu-toggle>
            <ion-item router-link="/favourites" lines="none" router-direction="root">
              <span class="link-text">Favourites</span>
            <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
            </ion-item>
          </ion-menu-toggle>
        </li>
        <li class="nav-menu-link">
          <ion-menu-toggle>
            <ion-item router-link="/find-space" lines="none" router-direction="root">
              <span class="link-text">Find a space</span>
            <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
            </ion-item>
          </ion-menu-toggle>
        </li>
        <li class="nav-menu-link">
          <ion-menu-toggle>
            <ion-item router-link="/recently-viewed" lines="none" router-direction="root">
              <span class="link-text">Recently viewed</span>
            <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
            </ion-item>
          </ion-menu-toggle>
        </li>
        <li class="nav-menu-link">
          <ion-menu-toggle>
            <ion-item router-link="/settings" lines="none" router-direction="root">
              <span class="link-text">Account settings</span>
            <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
            </ion-item>
          </ion-menu-toggle>
        </li>
        <li class="nav-menu-link">
          <ion-menu-toggle>
            <ion-item router-link="/about" lines="none" router-direction="root">
              <span class="link-text">About Alpha Victor</span>
            <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
            </ion-item>
          </ion-menu-toggle>
        </li>
        <li class="nav-menu-link">
          <ion-menu-toggle>
            <ion-item router-link="/terms-and-conditions" lines="none" router-direction="root">
              <span class="link-text">Terms &amp; conditions</span>
            <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
            </ion-item>
          </ion-menu-toggle>
        </li>
        <hr />
        <li class="nav-menu-link">
          <ion-menu-toggle>
            <ion-item router-link="/admin" lines="none" router-direction="root">
              <span class="link-text">Admin</span>
            <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
            </ion-item>
          </ion-menu-toggle>
        </li>
      </ul>
    </ion-content>
    <ion-footer>
      <div class="footer">
        <div class="footer-contact">
          <p class="contact font-mono">contact</p>
        </div>
        <div class="footer-hello">
          <a href="mailto: hello@alphavictor.com">hello@alphavictor.com</a>
          <div class="footer-details">
            <p class="font-mono">AlphaVictor® is a registered trademark of Uncoded Limited, a registered company in England and Wales with company number 11435074</p>
            <ul class="footer-links">
              <li>
                <a href="">
                  <img src="@/theme/icons/linkedin.svg" />
                </a>
              </li>
              <li>
                <a href="">
                  <img src="@/theme/icons/instagram.svg" />
                </a>
              </li>
              <li>
                <a href="">
                  <img src="@/theme/icons/linkbox.svg" />
                </a>
              </li>
              <li>
                <a href="">
                  <img src="@/theme/icons/email.svg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ion-footer>
  </ion-menu>
</template>

<script setup lang="ts">
import {
  IonMenu,
  IonContent,
  IonFooter,
  IonMenuToggle,
  IonItem,
  IonButton,
  IonIcon
} from "@ionic/vue";
import { closeOutline, logOutOutline, chevronForwardOutline } from "ionicons/icons";
import AppHeader from "./AppHeader.vue";

const logout = () => {
  console.log("logging out");
}
</script>

<style scoped>
ion-menu {
  --min-width: 100vw;
  --background: url('@/theme/backgrounds/menu-background.svg') no-repeat var(--av-primary);
}

ion-content {
  --background: none;
}

.logout-button {
  margin-left: 0;
  --padding-start: 0;
}

.logout {
  transform: rotate(180deg);
}

.logout-text {
  display: inline-block;
  margin-left: 6px;
}

.nav-menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-menu-link {
  width: 100%;
  margin-bottom: 12px;
}

.nav-menu-link ion-item {
  --background: none;
  --color: #FFFFFF;
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
}

.nav-menu-link ion-item ion-icon {
  margin-right: 0;
}

.nav-menu-link .link-text {
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: #FFFFFF;
}

hr {
  background-color: #FFFFFF;
  margin-bottom: 12px;
}

ion-footer {
  height: 140px;
  padding: 0 30px 40px 30px;
  display: flex;
  align-items: stretch;
}

.footer {
  flex: 1;
  display: flex;
  align-items: flex-end;
}

.footer-contact {
  flex-basis: 8%;
  position: relative;
}

.contact {
  position: absolute;
  bottom: -10px;
  left: 0;
  font-weight: 400;
  font-size: 10px;
  line-height: 10px;
  color: #FFFFFF;
  letter-spacing: 0.015em;
  transform: rotate(-90deg);
  transform-origin: 0% 0%;
}

.footer-hello {
  border-left: 1px solid #FFFFFF;
  padding-left: 10px;
  height: 100%;
  flex-basis: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.footer-hello > a {
  font-weight: 700;
  font-size: 10px;
  line-height: 10px;
  color: #FFFFFF;
  display: inline-block;
  padding: 12px 0;
}

.footer-details {
  flex: 1;
  padding-left: 12px;
  margin-left: 6px;
  border-left: 1px solid #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.footer-details p {
  font-family: 'Akkurat Mono';
  font-weight: 400;
  font-size: 8px;
  line-height: 10px;
  color: #FFFFFF;
}

.footer-links {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: flex-end;
}

.footer-links li {
  display: inline-block;
  width: 24px;
  height: 24px;
}

.footer-links li:not(:last-of-type) {
  margin-right: 18px;
}

.footer-links li a {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>