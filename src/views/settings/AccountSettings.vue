<template>
  <ion-page>
    <app-header title="Account Settings">
      <template #start>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>

      <template #end>
        <ion-menu-button fill="clear"> </ion-menu-button>
      </template>
    </app-header>

    <ion-content>
      <ion-list lines="inset">
        <ion-item
          :detail="true"
          button
          color="light"
          @click="handleUrlChange('/settings/profile')"
        >
          <ion-label>
            <h2 class="name font-bold font-size-sm">
              {{ accountDetails.name ? accountDetails.name : "No name set" }}
            </h2>
            <p class="email font-mono font-size-xxs text-lowercase">
              {{ accountDetails.email ? accountDetails.email : "No email set" }}
            </p>
          </ion-label>
        </ion-item>
        <ion-item
          :detail="true"
          button
          v-for="(option, index) in options"
          :key="index"
          @click="handleUrlChange(option.path)"
        >
          <ion-label>
            <h2 class="font-bold font-size-sm">
              {{ option.title }}
            </h2>
            <p class="font-mono font-size-xxs text-lowercase">
              {{ useDotify(option.subtitle) }}
            </p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-modal
      :is-open="state.modalOpen"
      :initial-breakpoint="1"
      :breakpoints="[0, 1]"
      @willDismiss="handleDismiss"
    >
      <router-view id="settings-modal"></router-view>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonMenuButton,
  IonModal,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/vue";
import { ref, reactive, onBeforeMount, watch } from "vue";
import { Account } from "@/stores/publicAccount";
import { storeToRefs } from "pinia";

import AppHeader from "@/components/shared/AppHeader.vue";
import { useRouter } from "vue-router";
import { useDotify } from "@/composables/utilities";

const publicAccount = Account();
const { accountDetails } = storeToRefs(publicAccount);

const router = useRouter();

interface State {
  modalOpen: boolean;
  selectedOption: string | undefined;
}

const state: State = reactive({
  modalOpen: false,
  selectedOption: undefined,
});

const handleUrlChange = (url: string) => {
  router.push({ path: url });
  state.modalOpen = true;
};

const handleDismiss = () => {
  state.modalOpen = false;
};

const options = [
  {
    title: "Notifications",
    subtitle: "Notifications Settings",
    path: "/settings/notifications",
  },
  {
    title: "Bluetooth",
    subtitle: "Bluetooth Settings",
    path: "/settings/bluetooth",
  },
  {
    title: "Location",
    subtitle: "Location Settings",
    path: "/settings/location",
  },
  {
    title: "Password",
    subtitle: "Password Settings",
    path: "/settings/password",
  },
  {
    title: "Language",
    subtitle: "Language Settings",
    path: "/settings/language",
  },
  {
    title: "Delete Account",
    subtitle: "Delete Your Account",
    path: "/settings/delete-account",
  },
];

watch(
  () => state.modalOpen,
  (modalOpen) => {
    if (modalOpen === false) {
      router.go(-1);
    }
  }
);

onBeforeMount(() => {
  publicAccount.getAccount();
});
</script>

<style scoped>
ion-modal {
  --max-height: 85vh;
}
ion-item::part(detail-icon) {
  opacity: 1;
}

ion-label {
  margin: 18px 0 16px;
}

.profile-image {
  width: 50px;
  height: 50px;
}

.name {
  font-size: 18px;
  line-height: 1.2;
  margin-bottom: 4px;
}
</style>
