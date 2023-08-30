<template>
  <div class="side-nav">
    <desktop-header class="no-background">
      <template #start>
        <div class="header-spacing">
          <ion-button
            class="switch-organisation"
            v-if="
              isAuthenticated &&
              !userPermission.isGuest &&
              organisationList.length > 1
            "
            shape="round"
            @click="state.modalOpen = true"
          >
            <img
              src="@/theme/icons/switch-location.svg"
              :alt="$t('components.shared.desktopNav.switchOrganisationAlt')"
            />
          </ion-button>
          <ion-title class="no-lp">
            <div class="logo-wraper" @click="handleNavigate('/')">
              <img v-if="theme.logo" :src="theme?.logo" class="logo" />
              <img
                v-else
                src="@/theme/img/logo/logo-without-name.svg"
                class="logo"
                :alt="$t('components.shared.desktopNav.AlphaVictorAlt')"
              />
            </div>
          </ion-title>
          <ion-button
            v-if="isAuthenticated && !userPermission.isGuest"
            fill="clear"
            @click="logout"
            class="logout-button"
          >
            <ion-icon :icon="logOutOutline" class="logout"></ion-icon>
            <span class="font-bold font-size-xs low-caps">{{
              $t("components.shared.desktopNav.logout")
            }}</span>
          </ion-button>
        </div>
      </template>
    </desktop-header>
    <ion-content class="ion-padding no-tp">
      <ul class="nav-menu">
        <li
          class="nav-menu-link"
          v-if="isAuthenticated && !userPermission.isGuest"
        >
          <ion-item
            lines="none"
            :detail="true"
            button
            @click="handleNavigate('/dashboard')"
          >
            <ion-label text-wrap="true" class="ion-no-margin">
              {{ $t("components.shared.desktopNav.dashboard") }}
            </ion-label>
          </ion-item>
        </li>

        <li
          class="nav-menu-link"
          v-if="!isAuthenticated || userPermission.isGuest"
        >
          <ion-item
            lines="none"
            :detail="true"
            button
            @click="handleNavigate('/')"
          >
            <ion-label text-wrap="true" class="ion-no-margin">
              {{ $t("components.shared.desktopNav.dashboard") }}
            </ion-label>
          </ion-item>
        </li>

        <li
          class="nav-menu-link"
          v-if="isAuthenticated && !userPermission.isGuest"
        >
          <ion-item
            lines="none"
            :detail="true"
            button
            @click="handleNavigate('/favourites')"
          >
            <ion-label text-wrap="true" class="ion-no-margin">
              {{ $t("components.shared.desktopNav.favourites") }}
            </ion-label>
          </ion-item>
        </li>
        <li
          class="nav-menu-link"
          v-if="isAuthenticated && !userPermission.isGuest"
        >
          <ion-item
            lines="none"
            :detail="true"
            button
            @click="handleNavigate('/find-space/location')"
          >
            <ion-label text-wrap="true" class="ion-no-margin">
              {{ $t("components.shared.desktopNav.findSpace") }}
            </ion-label>
          </ion-item>
        </li>
        <li
          class="nav-menu-link"
          v-if="isAuthenticated && !userPermission.isGuest"
        >
          <ion-item
            lines="none"
            :detail="true"
            button
            @click="handleNavigate('/recently-viewed')"
          >
            <ion-label text-wrap="true" class="ion-no-margin">
              {{ $t("components.shared.desktopNav.recentlyViewed") }}
            </ion-label>
          </ion-item>
        </li>
        <li
          class="nav-menu-link"
          v-if="isAuthenticated && !userPermission.isGuest"
        >
          <ion-item
            lines="none"
            :detail="true"
            button
            @click="handleNavigate('/settings')"
          >
            <ion-label text-wrap="true" class="ion-no-margin">
              {{ $t("components.shared.desktopNav.accountSettings") }}
            </ion-label>
          </ion-item>
        </li>
        <li class="nav-menu-link">
          <ion-item
            lines="none"
            :detail="true"
            button
            @click="handleNavigate('/about')"
          >
            <ion-label text-wrap="true" class="ion-no-margin">
              {{ $t("components.shared.desktopNav.about") }}
            </ion-label>
          </ion-item>
        </li>
        <li class="nav-menu-link">
          <ion-item
            lines="none"
            :detail="true"
            button
            @click="handleNavigate('/terms-and-conditions')"
          >
            <ion-label text-wrap="true" class="ion-no-margin">
              {{ $t("components.shared.desktopNav.tos") }}
            </ion-label>
          </ion-item>
        </li>
        <div
          v-if="
            userPermission.isGlobalAdmin || userPermission.isOrganisationAdmin
          "
        >
          <div class="spacer-line"></div>
          <li class="nav-menu-link">
            <ion-item lines="none">
              <ion-label text-wrap="true" class="ion-no-margin font-size-xxs">
                {{ $t("components.shared.desktopNav.administration") }}
              </ion-label>
            </ion-item>
          </li>

          <li class="nav-menu-link">
            <ion-item
              lines="none"
              :detail="true"
              button
              @click="handleNavigate('/admin/organisations')"
            >
              <ion-label text-wrap="true" class="ion-no-margin">
                {{ $t("components.shared.desktopNav.organisations") }}
              </ion-label>
            </ion-item>
          </li>
          <li class="nav-menu-link" v-if="userPermission.isGlobalAdmin">
            <ion-item
              lines="none"
              :detail="true"
              button
              @click="handleNavigate('/admin/equipment')"
            >
              <ion-label text-wrap="true" class="ion-no-margin">
                {{ $t("components.shared.desktopNav.equipment") }}
              </ion-label>
            </ion-item>
          </li>
          <li class="nav-menu-link" v-if="userPermission.isGlobalAdmin">
            <ion-item
              lines="none"
              :detail="true"
              button
              @click="handleNavigate('/admin/documents')"
            >
              <ion-label text-wrap="true" class="ion-no-margin">
                {{ $t("components.shared.desktopNav.documentTypes") }}
              </ion-label>
            </ion-item>
          </li>
          <li class="nav-menu-link">
            <ion-item
              lines="none"
              :detail="true"
              button
              @click="handleNavigate('/admin/users')"
            >
              <ion-label text-wrap="true" class="ion-no-margin">
                {{ $t("components.shared.desktopNav.users") }}
              </ion-label>
            </ion-item>
          </li>
        </div>
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

import { logOutOutline } from "ionicons/icons";
import { storeToRefs } from "pinia";

import DesktopHeader from "@/components/shared/DesktopHeader.vue";
import OrganisationSelectModal from "@/components/modals/OrganisationSelectModal.vue";

import Auth from "@/auth";
import { Account as useAccountStore } from "@/stores/publicAccount";
import { auth as useAuthStore } from "@/stores/authStore";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
import confirmToLeaveService from "@/services/confirmToLeaveService";

const router = useRouter();
const authService = new Auth();
const accountStore = useAccountStore();
const authStore = useAuthStore();
const { userPermission } = storeToRefs(accountStore);
const { isAuthenticated } = storeToRefs(authStore);
const organisationStore = useOrganisationStore();
const { theme, organisationList } = storeToRefs(organisationStore);

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
  accountStore.logout();
};

const handleNavigate = (route: string) => {
  if (confirmToLeaveService.confirm.value.isEditing) {
    confirmToLeaveService.show(() => router.push(route));
  } else {
    router.push(route);
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

.logo-wraper {
  cursor: pointer;
}

.logo {
  max-height: 50px;
}

.logout-button {
  --color: var(--ion-color-primary-contrast, #fff);
}
</style>
