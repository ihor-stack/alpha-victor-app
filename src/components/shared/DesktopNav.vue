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
              <img v-if="theme.logo" :src="theme?.logo" class="logo" />
              <img
                v-else
                src="@/theme/img/logo/logo-without-name.svg"
                class="logo"
                alt="AlphaVictor"
              />
            </router-link>
          </ion-title>
          <ion-button fill="clear" @click="logout" class="logout-button">
            <ion-icon :icon="logOutOutline" class="logout"></ion-icon>
            <span class="font-bold font-size-xs low-caps">{{
              $t("desktopNav.logout")
            }}</span>
          </ion-button>
        </div>
      </template>
    </desktop-header>
    <ion-content class="ion-padding no-tp">
      <ul class="nav-menu">
        <li class="nav-menu-link">
          <router-link to="/dashboard">
            <ion-item lines="none" :detail="true">
              <ion-label class="ion-no-margin">
                {{ $t("desktopNav.dashboard") }}
              </ion-label>
            </ion-item>
          </router-link>
        </li>

        <li class="nav-menu-link">
          <router-link to="/favourites">
            <ion-item lines="none" :detail="true">
              <ion-label class="ion-no-margin">
                {{ $t("desktopNav.favourites") }}
              </ion-label>
            </ion-item>
          </router-link>
        </li>
        <li class="nav-menu-link">
          <router-link to="/find-space/location">
            <ion-item lines="none" :detail="true">
              <ion-label class="ion-no-margin">
                {{ $t("desktopNav.findSpace") }}
              </ion-label>
            </ion-item>
          </router-link>
        </li>
        <li class="nav-menu-link">
          <router-link to="/recently-viewed">
            <ion-item lines="none" :detail="true">
              <ion-label class="ion-no-margin">
                {{ $t("desktopNav.recentlyViewed") }}
              </ion-label>
            </ion-item>
          </router-link>
        </li>
        <li class="nav-menu-link">
          <router-link to="/settings">
            <ion-item lines="none" :detail="true">
              <ion-label class="ion-no-margin">
                {{ $t("desktopNav.accountSettings") }}
              </ion-label>
            </ion-item>
          </router-link>
        </li>
        <li class="nav-menu-link">
          <router-link to="/about">
            <ion-item lines="none" :detail="true">
              <ion-label class="ion-no-margin">
                {{ $t("desktopNav.about") }}
              </ion-label>
            </ion-item>
          </router-link>
        </li>
        <li class="nav-menu-link">
          <router-link to="/terms-and-conditions">
            <ion-item lines="none" :detail="true">
              <ion-label class="ion-no-margin">
                {{ $t("desktopNav.tos") }}
              </ion-label>
            </ion-item>
          </router-link>
        </li>
        <div class="spacer-line"></div>
        <li class="nav-menu-link">
          <ion-item lines="none">
            <ion-label class="ion-no-margin font-size-xxs">
              {{ $t("desktopNav.administration") }}
            </ion-label>
          </ion-item>
        </li>

        <li class="nav-menu-link">
          <router-link to="/admin/organisations">
            <ion-item lines="none" :detail="true">
              <ion-label class="ion-no-margin">
                {{ $t("desktopNav.organisations") }}
              </ion-label>
            </ion-item>
          </router-link>
        </li>
        <li class="nav-menu-link" v-if="userPermission.isGlobalAdmin">
          <router-link to="/admin/equipment">
            <ion-item lines="none" :detail="true">
              <ion-label class="ion-no-margin">
                {{ $t("desktopNav.equipment") }}
              </ion-label>
            </ion-item>
          </router-link>
        </li>
        <li class="nav-menu-link" v-if="userPermission.isGlobalAdmin">
          <router-link to="/admin/documents">
            <ion-item lines="none" :detail="true">
              <ion-label class="ion-no-margin">
                {{ $t("desktopNav.documentTypes") }}
              </ion-label>
            </ion-item>
          </router-link>
        </li>
        <li class="nav-menu-link">
          <router-link to="/admin/users">
            <ion-item lines="none" :detail="true">
              <ion-label class="ion-no-margin">
                {{ $t("desktopNav.users") }}
              </ion-label>
            </ion-item>
          </router-link>
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
import {
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/vue";
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
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";

const router = useRouter();
const authService = new Auth();
const accountStore = useAccountStore();
const authStore = useAuthStore();
const { userPermission } = storeToRefs(accountStore);
const organisationStore = useOrganisationStore();
const { theme } = storeToRefs(organisationStore);

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
  background-color: var(--ion-color-primary, #3880ff);
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
  --padding-start: 0;
  --padding-end: 0;
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

.nav-menu-link a:hover {
  opacity: 0.5;
}

.spacer-line {
  border-top: 0.75px solid;
  border-bottom: none;
  margin-top: 20px;
  border-color: var(--ion-color-primary-contrast, #fff);
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
  align-items: center;
}

.nav-menu-link ion-item {
  color: var(--ion-color-primary-contrast, #fff);
}

ion-item::part(detail-icon) {
  opacity: 1;
}

.logo {
  height: 50px;
}

.logout-button {
  --color: var(--ion-color-primary-contrast, #fff);
}
</style>
