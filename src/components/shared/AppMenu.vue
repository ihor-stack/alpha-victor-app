<template>
  <ion-menu content-id="content">
    <app-header class="no-background">
      <template #start>
        <ion-menu-toggle>
          <ion-button
            fill="clear"
            class="logout-button color-light-gray"
            @click="logout"
          >
            <ion-icon :icon="logOutOutline" class="logout"></ion-icon>
            <span class="font-mono font-size-xs logout-text">{{
              $t("appMenu.logout")
            }}</span>
          </ion-button>
        </ion-menu-toggle>
      </template>

      <template #end>
        <ion-menu-toggle>
          <ion-icon
            class="color-light-gray"
            :icon="closeOutline"
            size="large"
          ></ion-icon>
        </ion-menu-toggle>
      </template>
    </app-header>
    <ion-content class="ion-padding">
      <ul class="nav-menu">
        <li class="nav-menu-link">
          <ion-menu-toggle>
            <ion-item
              router-link="/dashboard"
              lines="none"
              router-direction="root"
              :detail="true"
            >
              <span class="link-text">{{ $t("appMenu.dashboard") }}</span>
            </ion-item>
          </ion-menu-toggle>
        </li>
        <li class="nav-menu-link" v-if="!isGuestUser">
          <ion-menu-toggle>
            <ion-item
              router-link="/favourites"
              lines="none"
              router-direction="root"
              :detail="true"
            >
              <span class="link-text">{{ $t("appMenu.favourites") }}</span>
            </ion-item>
          </ion-menu-toggle>
        </li>
        <li class="nav-menu-link" v-if="!isGuestUser">
          <ion-menu-toggle>
            <ion-item
              router-link="/find-space/location"
              lines="none"
              router-direction="root"
              :detail="true"
            >
              <span class="link-text">{{ $t("appMenu.findSpace") }}</span>
            </ion-item>
          </ion-menu-toggle>
        </li>
        <li class="nav-menu-link" v-if="!isGuestUser">
          <ion-menu-toggle>
            <ion-item
              router-link="/recently-viewed"
              lines="none"
              router-direction="root"
              :detail="true"
            >
              <span class="link-text">{{ $t("appMenu.recentlyViewed") }}</span>
            </ion-item>
          </ion-menu-toggle>
        </li>
        <li class="nav-menu-link" v-if="!isGuestUser">
          <ion-menu-toggle>
            <ion-item
              router-link="/settings"
              lines="none"
              router-direction="root"
              :detail="true"
            >
              <span class="link-text">{{ $t("appMenu.accountSettings") }}</span>
            </ion-item>
          </ion-menu-toggle>
        </li>
        <li class="nav-menu-link">
          <ion-menu-toggle>
            <ion-item
              router-link="/about"
              lines="none"
              router-direction="root"
              :detail="true"
            >
              <span class="link-text">{{ $t("appMenu.about") }}</span>
            </ion-item>
          </ion-menu-toggle>
        </li>
        <li class="nav-menu-link">
          <ion-menu-toggle>
            <ion-item
              router-link="/terms-and-conditions"
              lines="none"
              router-direction="root"
              :detail="true"
            >
              <span class="link-text">{{ $t("appMenu.tos") }}</span>
            </ion-item>
          </ion-menu-toggle>
        </li>
        <hr />
        <li class="nav-menu-link" v-if="canAccessAdmin">
          <ion-menu-toggle>
            <ion-item
              router-link="/admin/organisations"
              lines="none"
              router-direction="root"
              :detail="true"
            >
              <span class="link-text">{{ $t("appMenu.admin") }}</span>
            </ion-item>
          </ion-menu-toggle>
        </li>
      </ul>
    </ion-content>
    <ion-footer>
      <div class="footer">
        <div class="footer-contact">
          <p class="contact font-mono">{{ $t("appMenu.contact") }}</p>
        </div>
        <div class="footer-hello">
          <a href="mailto: hello@alphavictor.com">hello@alphavictor.com</a>
          <div class="footer-details">
            <p class="font-mono">{{ $t("appMenu.footer") }}</p>
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
import { computed } from "vue";
import {
  IonMenu,
  IonContent,
  IonFooter,
  IonMenuToggle,
  IonItem,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import {
  closeOutline,
  logOutOutline,
  chevronForwardOutline,
} from "ionicons/icons";

import { useRouter } from "vue-router";
import Auth from "@/auth";
import AppHeader from "./AppHeader.vue";
import { Account as useAccountStore } from "@/stores/publicAccount";

const router = useRouter();
const authService = new Auth();
const accountStore = useAccountStore();

const canAccessAdmin = computed(
  () =>
    accountStore.userPermission.isGlobalAdmin ||
    accountStore.userPermission.organisationGroups?.some(
      (group) => group.name === "OrganisationAdmin"
    )
);
const isGuestUser = computed(() => accountStore.userPermission.isGuest);

const logout = async () => {
  const authRes = await authService.logout();
  if (authRes) {
    return router.replace({ name: "Home" });
  }
};
</script>

<style scoped>
ion-menu {
  --min-width: 100vw;
  --background: url("@/theme/backgrounds/menu-background.svg") no-repeat
    var(--ion-color-primary, #3880ff);
}

ion-content {
  --background: none;
}

ion-item::part(detail-icon) {
  opacity: 1;
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
  cursor: pointer;
}

.nav-menu-link ion-item {
  --background: none;
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
}

hr {
  background-color: #ffffff;
  margin-bottom: 12px;
}

ion-footer {
  height: 140px;
  padding: 0 20px 40px 20px;
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
  color: #ffffff;
  letter-spacing: 0.015em;
  transform: rotate(-90deg);
  transform-origin: 0% 0%;
}

.footer-hello {
  border-left: 1px solid #ffffff;
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
  color: #ffffff;
  display: inline-block;
  padding: 12px 0;
}

.footer-details {
  flex: 1;
  padding-left: 12px;
  margin-left: 6px;
  border-left: 1px solid #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.footer-details p {
  font-family: "Akkurat Mono";
  font-weight: 400;
  font-size: 8px;
  line-height: 10px;
  color: #ffffff;
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

@media only screen and (min-width: 1023px) {
  ion-menu {
    display: none;
  }
}
</style>
