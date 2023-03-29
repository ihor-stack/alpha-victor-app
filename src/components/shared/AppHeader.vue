<template>
  <ion-header :class="['ion-no-border', noBackground ? 'no-background' : '']">
    <ion-toolbar>
      <ion-buttons slot="start">
        <slot name="start"></slot>
      </ion-buttons>

      <ion-title>
        <router-link to="/dashboard">
          <img src="@/theme/img/logo/logo-without-name.svg" class="logo" alt="AlphaVictor logo" />
        </router-link>
      </ion-title>

      <ion-buttons slot="end">
        <slot name="end"></slot>
      </ion-buttons>
    </ion-toolbar>
    <div class="title" v-if="props.title">
      <h1 class="font-bold font-size-lg color-light-gray">
        {{ props.title }}
      </h1>
    </div>
  </ion-header>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { IonHeader, IonToolbar, IonTitle, IonButtons } from "@ionic/vue";

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  noBackground: {
    type: Boolean,
    required: false,
    default: false
  }
});
</script>

<style scoped>
ion-header {
  background: #000000;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12px 24px;
}

ion-buttons {
  min-height: 50px;
}

.no-background {
  background: none;
}
</style>
