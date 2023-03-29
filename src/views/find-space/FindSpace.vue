<template>
  <ion-page>
    <app-header title="Find a space">
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
    <div class="search-container">
      <div class="space-search">
        <ion-input 
          type="search"
          placeholder="Search space or location"
          class="space-search-input font-bold font-size-sm" 
          v-model="state.searchTerm" 
          :clear-input="true"
        />
        <ion-button fill="clear" expand="block" size="small" class="space-search-icon">
          <img src="@/theme/icons/qr-code.svg" class="qr-code-icon" />
        </ion-button>
      </div>
    </div>
    <ion-content>
      <ion-router-outlet></ion-router-outlet>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonMenuButton,
  IonRouterOutlet,
  IonInput
} from "@ionic/vue";
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "@/components/shared/AppHeader.vue";
const router = useRouter();

interface State {
  searchTerm: string
}

const state: State = reactive({
  searchTerm: '',
});

watch(
  () => state.searchTerm,
  (term) => term.length > 0 ? 
    router.replace({ name: "FindSpace", query: { search: term } }) 
    : 
    router.replace({ name: "FindSpace", })
);
</script>

<style scoped>
.search-container {
  padding: 0 30px 30px;
}

.space-search {
  background: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.space-search-input {
  flex: 1;
  --padding-start: 18px;
  --padding-end: 18px;
  --padding-top: 18px;
  --padding-bottom: 18px;
  border: 0;
  color: #000;
  background: #fff;
}

.space-search-input::placeholder {
  color: #000;
}

.space-search-input:focus-visible {
  outline: 0;
}

.space-search-icon {
  padding: 0 10px;
}

.space-search ion-button {
  --padding-start: 0px;
  --padding-top: 0px;
  --padding-bottom: 0px;
  --padding-end: 0px;
}

.locations-list {
  padding: 0 30px;
  margin-bottom: 30px;
}

.list-title {
  font-size: 18px;
}
</style>