<template>
  <ion-page>
    <app-header title="Account Settings">
      <template #start>
        <ion-button
          fill="clear"
          color="light"
          @click="() => router.back()"
          class="back"
        >
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>

      <template #end>
        <ion-menu-button fill="clear">
          <img
            src="@/theme/icons/nav-menu.svg"
            class="nav-menu"
            alt="Nav Menu Button"
          />
        </ion-menu-button>
      </template>
    </app-header>

    <div class="profile" @click="handleUrlChange('/settings/profile')">
      <div class="profile-info">
        <div class="profile-details">
          <h2 class="name font-bold font-size-sm color-light-gray">
            {{ accountDetails.name ? accountDetails.name : 'No name set' }} 
          </h2>
          <p
            class="email font-mono font-size-xxs color-dark-gray text-lowercase"
          >
            {{ accountDetails.email ? accountDetails.email : 'No email set' }} 
          </p>
        </div>
      </div>
      <span class="arrow-right"></span>
    </div>
    <ion-content>
      <ul class="settings-list">
        <li
          v-for="(option, index) in options"
          :key="index"
          class="list-item"
          @click="handleUrlChange(option.path)"
        >
          <div class="list-item__info">
            <div class="list-item__details">
              <p class="primaryText font-bold font-size-sm color-light-gray">
                {{ option.title }}
              </p>
              <p
                class="secondaryText font-mono font-size-xxs color-dark-gray text-lowercase"
              >
                {{ useDotify(option.subtitle) }}
              </p>
            </div>
          </div>
          <span class="arrow-right"></span>
        </li>
      </ul>
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
} from "@ionic/vue";
import { ref, reactive, onBeforeMount, watch } from "vue";
import { Account } from "@/stores/publicAccount";
import { storeToRefs } from "pinia";

import AppHeader from "@/components/shared/AppHeader.vue";
import { useRouter } from "vue-router";
import { useDotify } from "@/composables/utilities";

const publicAccount = Account()
const { accountDetails } = storeToRefs(publicAccount)

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
  publicAccount.getAccount()
})
</script>

<style scoped>
ion-modal {
  --max-height: 85vh;
}
.profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 30px;
  background: #181818;
  border: 0.75px solid #313131;
}

.profile-info {
  display: flex;
  align-items: center;
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
.arrow-right {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("@/theme/icons/arrow-right.svg");
  background-repeat: no-repeat;
  background-size: 8px 12px;
  background-position: center;
}

.settings-list {
  list-style-type: none;
  margin: 0;
  padding: 0 30px;
}
</style>
