<template>
  <ion-page class="outer-container">
    <app-header :title="$t('pages.accountSettings.header')">
      <template #start>
        <ion-menu-button fill="clear"> </ion-menu-button>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">{{
            $t("pages.accountSettings.back")
          }}</span>
        </ion-button>
      </template>
    </app-header>

    <ion-content>
      <ion-list lines="full" :inset="true">
        <ion-item
          :detail="true"
          button
          @click="handleUrlChange('/settings/profile')"
        >
          <ion-label text-wrap="true">
            <h2 class="name font-bold font-size-sm">
              {{
                accountDetails.name
                  ? accountDetails.name
                  : $t("pages.accountSettings.noNameSet")
              }}
            </h2>
            <p class="email font-mono font-size-xxs text-lowercase">
              {{
                accountDetails.email
                  ? accountDetails.email
                  : $t("pages.accountSettings.noEmailSet")
              }}
            </p>
          </ion-label>
        </ion-item>
        <ion-item
          :detail="true"
          button
          v-for="(option, index) in filteredOptions"
          :key="index"
          @click="handleUrlChange(option.path)"
        >
          <ion-label text-wrap="true">
            <h2 class="font-bold font-size-sm">
              {{ $t(`pages.findSpace.options.${option.key}.title`) }}
            </h2>
            <p class="font-mono font-size-xxs text-lowercase">
              {{ useDotify($t(`pages.findSpace.options.${option.key}.title`)) }}
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
import { reactive, onBeforeMount, watch, computed } from "vue";
import { Capacitor } from "@capacitor/core";
import { Account } from "@/stores/publicAccount";
import { storeToRefs } from "pinia";

import AppHeader from "@/components/shared/AppHeader.vue";
import { useRouter } from "vue-router";
import { useDotify } from "@/composables/utilities";

const isMobile = Capacitor.getPlatform() !== "web";

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
    key: "notifications",
    device: "mobile",
    path: "/settings/notifications",
  },
  {
    key: "bluetooth",
    device: "mobile",
    path: "/settings/bluetooth",
  },
  {
    key: "location",
    device: "mobile",
    path: "/settings/location",
  },
  {
    key: "password",
    device: "all",
    path: "/settings/password",
  },
  {
    key: "language",
    device: "all",
    path: "/settings/language",
  },
  {
    key: "deleteAccount",
    device: "all",
    path: "/settings/delete-account",
  },
];

const filteredOptions = computed(() => {
  return options.filter((option) => {
    return option.device === "all" || (isMobile && option.device === "mobile");
  });
});

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
ion-content {
  --background: none;
}

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

.back {
  display: none;
}

@media only screen and (min-width: 1023px) {
  .back {
    display: block;
  }
  ion-menu-button {
    display: none;
  }
}
</style>
