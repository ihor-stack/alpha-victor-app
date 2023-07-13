<template>
  <ion-header :class="['ion-no-border', noBackground ? 'no-background' : '']">
    <ion-toolbar>
      <ion-buttons slot="start" mode="md">
        <slot name="start"></slot>
      </ion-buttons>

      <ion-title>
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

      <ion-buttons slot="end" mode="md">
        <slot name="end"></slot>
      </ion-buttons>
    </ion-toolbar>
    <div class="title" v-if="props.title">
      <ion-item lines="none">
        <h1 class="title-admin font-bold font-size-lg">
          {{ props.title }}
        </h1>
      </ion-item>
      <slot></slot>
    </div>
  </ion-header>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonItem,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";

const organisationStore = useOrganisationStore();
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
</style>
