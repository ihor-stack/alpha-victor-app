<template>
  <ion-header :class="['app-header ion-no-border', noBackground ? 'no-background' : '']">
    <ion-toolbar>
      <ion-buttons slot="start" mode="md" class="app-header--left" v-if="!isGuestUser">
        <slot name="start"></slot>
      </ion-buttons>

      <ion-title>
        <router-link to="/dashboard">
          <img v-if="theme.logo" :src="theme?.logo" class="logo" />
          <img
            v-else
            src="@/theme/img/logo/logo-without-name.svg"
            class="logo"
            :alt='$t("components.shared.shared.appHeader.alphaVictorAlt")'
          />
        </router-link>
      </ion-title>

      <ion-buttons slot="end" mode="md" class="app-header--right" v-if="!isGuestUser">
        <slot name="end"></slot>
      </ion-buttons>
    </ion-toolbar>
    <div class="title" v-if="props.title">
      <ion-item class="ion-no-padding" lines="none">
        <h1 class="title-admin font-bold font-size-lg">
          {{ props.title }}
        </h1>
      </ion-item>
      <slot></slot>
    </div>
  </ion-header>
</template>

<script setup lang="ts">
import { computed } from "vue";

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonItem,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
import { Account as useAccountStore } from "@/stores/publicAccount";

const accountStore = useAccountStore();
const organisationStore = useOrganisationStore();

const isGuestUser = computed(() => accountStore.userPermission.isGuest);
const { theme } = storeToRefs(organisationStore);

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  noBackground: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
 
<style scoped>
ion-title {
  text-align: center;
}
.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 12px 24px;
}
.title .title-admin {
  margin-bottom: 8px;
}
.title ion-item {
  --background: transparent;
}

ion-buttons {
  min-height: 50px;
}

.no-background {
  background: none;
}
.logo {
  height: 50px;
}

.app-header--right, .app-header--left {
  min-width: 100px;
}

.app-header--left {
  justify-content: start;
}

.app-header--right {
  justify-content: end;
}

@media only screen and (min-width: 1023px) {
  ion-toolbar {
    display: none;
  }
  .title {
    margin-top: 30px;
  }
}
</style>
