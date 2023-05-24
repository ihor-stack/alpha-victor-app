<template>
  <common-modal
    title="Select article"
    description="You can select an article to be presented via the list below."
    :handleDismiss="() => handleDismiss()"
  >
    <ion-content>
      <ion-row>
        <ion-col size="12">
          <input-with-icon
            iconPosition="start"
            color="light"
            type="search"
            placeholder="Search for an article"
            v-model="state.searchTerm"
            :icon="search"
          ></input-with-icon>
        </ion-col>
      </ion-row>
      <ul class="list">
        <li
          class="list-item"
          v-for="article in filteredArticles"
          :key="article.id"
          @click="state.selectedArticle = article"
        >
          <p class="primaryText font-bold font-size-sm color-light-gray">
            {{ article.title }}
          </p>
          <div class="font-size-xs">
            <ion-row
              v-if="article.id === state.selectedArticle?.id"
              class="color-green ion-align-items-center"
            >
              <ion-icon :icon="checkmarkCircle" size="small" />
              <ion-col> selected </ion-col>
            </ion-row>
            <span v-else>>> select</span>
          </div>
        </li>
      </ul>
    </ion-content>
    <ion-footer>
      <ion-button
        class="ion-text-capitalize"
        fill="outline"
        expand="block"
        color="light"
      >
        Add new article +</ion-button
      >
      <ion-button
        class="ion-text-capitalize ion-margin-top"
        expand="block"
        @click="handleClickConfirm({ article: state.selectedArticle })"
      >
        Confirm Selection</ion-button
      >
      <ion-button
        class="ion-text-capitalize"
        color="light"
        fill="clear"
        expand="block"
        @click="handleClickBack"
      >
        Back to destination
      </ion-button>
    </ion-footer>
  </common-modal>
</template>
<script setup>
import { reactive, computed } from "vue";
import { IonContent, IonButton, IonFooter, IonRow, IonCol } from "@ionic/vue";
import CommonModal from "@/components/modals/CommonModal.vue";
import InputWithIcon from "@/components/shared/InputWithIcon.vue";
import { checkmarkCircle, search } from "ionicons/icons";

import { Organisations as useOrganisationsStore } from "@/stores/adminOrganisations";

const organisationsStore = useOrganisationsStore();

const props = defineProps([
  "editTreeNode",
  "handleClickConfirm",
  "handleDismiss",
  "handleClickBack",
]);

const state = reactive({
  searchTerm: "",
  selectedArticle: props.editTreeNode?.article,
});

const filteredArticles = computed(() => {
  const articles = organisationsStore.currentOrganisationDetails?.articles;

  return articles.filter(
    (a) => a.title?.toLowerCase().indexOf(state.searchTerm.toLowerCase()) > -1
  );
});
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}

.list-item {
  padding: 20px 0;
}
</style>
