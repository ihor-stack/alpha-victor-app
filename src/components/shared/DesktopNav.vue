<template>
  <div class="side-nav">
    <desktop-header class="no-background">
      <template #start>
        <div class="header-spacing">
          <ion-button
            class="switch-organisation"
            shape="round"
            @click="state.modalOpen = true"
          >
            <img
              src="@/theme/icons/switch-location.svg"
              alt="Switch Organisation"
            />
          </ion-button>
          <ion-title class="no-lp">
            <router-link to="/dashboard">
              <img
                src="@/theme/img/logo/logo-without-name.svg"
                class="logo"
                alt="AlphaVictor logo"
              />
            </router-link>
          </ion-title>
          <ion-button fill="clear" color="dark" @click="logout">
            <ion-icon
              :icon="logOutOutline"
              class="logout"
              color="dark"
            ></ion-icon>
            <span class="font-bold font-size-xs low-caps">{{
              $t("desktopNav.logout")
            }}</span>
          </ion-button>
        </div>
      </template>
    </desktop-header>
    <ion-content class="ion-padding no-tp">
      <ul class="nav-menu">
        <li class="nav-menu-link arrow-align">
          <router-link to="/dashboard" class="font-size-sm color-light-gray"
            >{{ $t("desktopNav.dashboard") }}
            <ion-icon
              :icon="chevronForwardOutline"
              class="arrow-right"
            ></ion-icon
          ></router-link>
        </li>

        <li class="nav-menu-link arrow-align">
          <router-link to="/favourites" class="font-size-sm color-light-gray"
            >{{ $t("desktopNav.favourites") }}
            <ion-icon
              :icon="chevronForwardOutline"
              class="arrow-right"
            ></ion-icon
          ></router-link>
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link
            to="/find-space/location"
            class="font-size-sm color-light-gray"
            >{{ $t("desktopNav.findSpace") }}
            <ion-icon
              :icon="chevronForwardOutline"
              class="arrow-right"
            ></ion-icon
          ></router-link>
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link
            to="/recently-viewed"
            class="font-size-sm color-light-gray"
            >{{ $t("desktopNav.recentlyViewed") }}
            <ion-icon
              :icon="chevronForwardOutline"
              class="arrow-right"
            ></ion-icon
          ></router-link>
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link to="/settings" class="font-size-sm color-light-gray"
            >{{ $t("desktopNav.accountSettings") }}
            <ion-icon
              :icon="chevronForwardOutline"
              class="arrow-right"
            ></ion-icon
          ></router-link>
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link to="/about" class="font-size-sm color-light-gray"
            >{{ $t("desktopNav.about") }}
            <ion-icon
              :icon="chevronForwardOutline"
              class="arrow-right"
            ></ion-icon
          ></router-link>
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link
            to="/terms-and-conditions"
            class="font-size-sm color-light-gray"
            >{{ $t("desktopNav.tos") }}
            <ion-icon
              :icon="chevronForwardOutline"
              class="arrow-right"
            ></ion-icon
          ></router-link>
        </li>
        <div class="spacer-line"></div>
        <li class="sub-title font-size-xxs color-light-gray">
          {{ $t("desktopNav.administration") }}
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link
            to="/admin/organisations"
            class="font-size-sm color-light-gray"
            >{{ $t("desktopNav.organisations") }}
            <ion-icon
              :icon="chevronForwardOutline"
              class="arrow-right"
            ></ion-icon
          ></router-link>
        </li>
        <li
          class="nav-menu-link arrow-align"
          v-if="userPermission.isGlobalAdmin"
        >
          <router-link
            to="/admin/equipment"
            class="font-size-sm color-light-gray"
            >{{ $t("desktopNav.equipment") }}
            <ion-icon
              :icon="chevronForwardOutline"
              class="arrow-right"
            ></ion-icon>
          </router-link>
        </li>
        <li
          class="nav-menu-link arrow-align"
          v-if="userPermission.isGlobalAdmin"
        >
          <router-link
            to="/admin/documents"
            class="font-size-sm color-light-gray"
            >{{ $t("desktopNav.documentTypes") }}
            <ion-icon
              :icon="chevronForwardOutline"
              class="arrow-right"
            ></ion-icon
          ></router-link>
        </li>
        <li class="nav-menu-link arrow-align">
          <router-link to="/admin/users" class="font-size-sm color-light-gray"
            >{{ $t("desktopNav.users") }}
            <ion-icon
              :icon="chevronForwardOutline"
              class="arrow-right"
            ></ion-icon
          ></router-link>
        </li>
      </ul>
    </ion-content>

    <ion-modal
      :is-open="state.modalOpen"
      :initial-breakpoint="0.4"
      :breakpoints="[0, 0.4]"
      @willDismiss="handleDismiss"
    >
      <organisation-select-modal :handleDismiss="handleDismiss" />
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { IonTitle, IonContent, IonButton, IonIcon } from "@ionic/vue";
import { useRouter } from "vue-router";

import {
  closeOutline,
  logOutOutline,
  chevronForwardOutline,
} from "ionicons/icons";
import { storeToRefs } from "pinia";

import DesktopHeader from "@/components/shared/DesktopHeader.vue";
import OrganisationSelectModal from "@/components/modals/OrganisationSelectModal.vue";

import Auth from "@/auth";
import { Account as useAccountStore } from "@/stores/publicAccount";
import { auth as useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authService = new Auth();
const accountStore = useAccountStore();
const authStore = useAuthStore();
const { userPermission } = storeToRefs(accountStore);

interface State {
  modalOpen: boolean;
}

const state: State = reactive({
  modalOpen: false,
});

const handleDismiss = () => {
  state.modalOpen = false;
};

const logout = async () => {
  const authRes = await authService.logout();
  if (authRes) {
    authStore.setAuthStatus(false);
    return router.replace({ name: "Home" });
  }
};
</script>

<style scoped>
ion-title {
  text-align: center;
}
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

.nav-menu-link a {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.nav-menu-link a:hover {
  opacity: 0.5;
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
