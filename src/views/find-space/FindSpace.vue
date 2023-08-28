<template>
  <ion-page class="outer-container">
    <app-header :title="$t('pages.findSpace.header')">
      <template #start>
        <ion-menu-button fill="clear"> </ion-menu-button>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">{{
            $t("pages.findSpace.back")
          }}</span>
        </ion-button>
      </template>
    </app-header>
    <div class="search-container">
      <div class="space-search">
        <ion-input
          type="search"
          fill="outline"
          :placeholder="$t('pages.findSpace.placeholder')"
          class="space-search-input"
          v-model="state.searchTerm"
          :clear-input="true"
          :debounce="700"
        />
      </div>
    </div>
    <ion-content>
      <SearchSpace v-if="state.searchTerm" :spaces="state.spaces" />
      <router-view v-else-if="state.isLoaded"></router-view>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonMenuButton,
  IonInput,
} from "@ionic/vue";
import { reactive, watch, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import AppHeader from "@/components/shared/AppHeader.vue";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
import { publicAPI } from "@/axios";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import { Space } from "@/types/index";
import SearchSpace from "@/components/findSpace/SearchSpace.vue";

const router = useRouter();
const organisationStore = useOrganisationStore();
const { currentOrganisationId } = storeToRefs(organisationStore);

interface State {
  searchTerm: string;
  spaces: Space[];
  isLoaded: boolean;
}

const state: State = reactive({
  searchTerm: "",
  spaces: [],
  isLoaded: false,
});

watch(
  () => state.searchTerm,
  (term) => {
    if (term.length > 0) {
      searchSpace(term);
    } else {
      state.spaces = [];
    }
  }
);

const searchSpace = (term: string) => {
  const loadId = loadingService.show("Loading...");
  publicAPI
    .get(`/Dashboard/Find?request=${term}`)
    .then((response) => {
      state.spaces = response.data;
    })
    .catch((error) => {
      state.spaces = [];
      toastService.show("Error", error, "error", "bottom");
    })
    .finally(() => {
      loadingService.close(loadId);
    });
};

onBeforeMount(() => {
  organisationStore
    .getSearchNavigationTree(currentOrganisationId.value)
    .then(() => {
      state.isLoaded = true;
    });
});
</script>

<style scoped>
ion-content {
  --background: none;
}
.search-container {
  padding: 0 20px 30px;
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
  color: #000;
  background: #fff;
  border-radius: 8px;
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
