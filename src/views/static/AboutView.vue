<template>
  <ion-page>
    <app-header :title="$t('pages.about.header')">
      <template #start>
        <ion-menu-button fill="clear"> </ion-menu-button>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">{{
            $t("pages.about.back")
          }}</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content>
      <div class="text-content">
        <ion-text class="font-size-xs">
          <p>{{ $t("pages.about.sentence1") }}</p></ion-text
        >
        <ion-text class="font-size-xs">
          <p>
            {{ $t("pages.about.sentence2") }}
          </p>
        </ion-text>
      </div>
      <div class="links">
        <ul class="list list--condensed">
          <ListItem
            primary-text="Contact us"
            secondary-text="Get In Contact"
            :click-handler="openContactModal"
          />
          <ListItem
            primary-text="Legal notices"
            secondary-text="The Legal Bit"
            :click-handler="() => router.push({ path: '/legal-notices' })"
          />
        </ul>
      </div>
    </ion-content>
    <ion-modal
      :is-open="state.contactModalOpen"
      :initial-breakpoint="1"
      :breakpoints="[0, 1]"
      @willDismiss="handleDismissContactModal"
    >
      <contact-us-modal />
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
import { reactive } from "vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import ListItem from "@/components/shared/ListItem.vue";
import ContactUsModal from "@/components/modals/ContactUsModal.vue";
import { useRouter } from "vue-router";
const router = useRouter();

interface State {
  contactModalOpen: boolean;
}

const state: State = reactive({
  contactModalOpen: false,
});

const openContactModal = () => {
  state.contactModalOpen = true;
};

const handleDismissContactModal = () => {
  state.contactModalOpen = false;
};
</script>

<style scoped>
ion-modal {
  --max-height: 85vh;
}

.text-content,
.links {
  padding: 12px 30px;
}
.text-content p {
  margin-bottom: 28px;
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
