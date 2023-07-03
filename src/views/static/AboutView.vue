<template>
  <ion-page>
    <app-header title="About Alpha Victor">
      <template #start>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
      <template #end>
        <ion-menu-button fill="clear">
          <img src="@/theme/icons/nav-menu.svg" class="nav-menu" alt="Nav Menu Button" />
        </ion-menu-button>
      </template>
    </app-header>
    <ion-content>
      <div class="text-content">
        <p class="color-light-gray font-size-xs">Alpha Victor seeks to continually enhance the user experience in the workspace. The platform also provides workplace teams with the information they need to make future decisions on the design of new, better performing spaces.</p>

        <p class="color-light-gray font-size-xs">Alpha Victor delivers dynamic user guides for users of the space alongside a simple way for them to give their feedback, whether at home or in the office.</p>
      </div>
      <div class="links">
        <ul class="list list--condensed">
          <ListItem primary-text="Contact us" secondary-text="Get In Contact" :click-handler="openContactModal" />
          <ListItem primary-text="Legal notices" secondary-text="The Legal Bit" :click-handler="() => router.push({ path: '/legal-notices' })" />
        </ul>
      </div>
    </ion-content>
    <ion-modal :is-open="state.contactModalOpen" :initial-breakpoint="1" :breakpoints="[0, 1]" @willDismiss="handleDismissContactModal">
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
  IonModal
} from "@ionic/vue";
import { reactive } from "vue";
import AppHeader from '@/components/shared/AppHeader.vue';
import ListItem from "@/components/shared/ListItem.vue";
import ContactUsModal from "@/components/modals/ContactUsModal.vue";
import { useRouter } from "vue-router";
const router = useRouter();

interface State {
  contactModalOpen: boolean
}

const state: State = reactive({
  contactModalOpen: false
});

const openContactModal = () => {
  state.contactModalOpen = true;
}

const handleDismissContactModal = () => {
  console.log("Dismissing Contact Modal");
}
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
</style>