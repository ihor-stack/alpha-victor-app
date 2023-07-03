<template>
  <ion-page>
    <app-header title="Terms & Conditions">
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
        <h2>Privacy Policy</h2>
        <p>Last updated August 26th, 2022</p>
        <p>This privacy notice for Uncoded Limited (doing business as Alpha Victor) ('Alpha Victor', 'we', 'us', or 'our',), describes how and why we might collect, store, use, and/or share ('process') your information when you use our services ('Services'), such as when you:</p>
        <p>Visit our website at http://www.alphavictor.com, or any website of ours that links to this privacy notice
        Download and use our mobile application (OnlineInside), or any other application of ours that links to this privacy notice</p>
        <p>Engage with us in other related ways, including any sales, marketing, or events</p>
        <p>Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at hello@uncoded.com.</p>
      </div>
      <div class="text-content">
        <h2>Summary of key points</h2>
        <p>This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for. You can also click here to go directly to our table of contents.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonMenuButton,
} from "@ionic/vue";
import AppHeader from '@/components/shared/AppHeader.vue';
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
.text-content,
.links {
  padding: 12px 30px;
}
.text-content {
  margin-bottom: 28px;
}
.text-content h2 {
  color: var(--av-light-gray);
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 18px;;
}
.text-content p {
  color: var(--av-light-gray);
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 16px;
}
</style>