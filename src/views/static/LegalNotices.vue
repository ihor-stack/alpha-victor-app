<template>
  <ion-page>
    <app-header title="Legal Notices">
      <template #start>
        <ion-button fill="clear" color="light" @click="() => router.back()" class="back">
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
        <h2>Barcode scanner</h2>
        <p>@capacitor-community/barcode-scanner</p>
        <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>

        <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>

        <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
      </div>
      <div class="text-content">
        <h2>Google Maps</h2>
        <p>@googlemaps/js-api-loader</p>

        <p>Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.</p>
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