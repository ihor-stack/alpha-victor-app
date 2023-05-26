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
      <CustomList
        :listData="filteredArticles"
        :selectedItem="state.selectedArticle"
        :handleSelectItem="(item) => (state.selectedArticle = item)"
      ></CustomList>
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
import CustomList from "./CustomList.vue";

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
  isAddingArticle: false,
  newArticleTitle: {
    error: false,
    value: "",
  },
  newArticleRichText: {
    error: false,
    value: "",
  },
});

const filteredArticles = computed(() => {
  const articles = organisationsStore.currentOrganisationDetails?.articles;

  return articles.filter(
    (a) => a.title?.toLowerCase().indexOf(state.searchTerm.toLowerCase()) > -1
  );
});

const onAddArticle = () => {
  organisationsStore.createVideo({
    title: state.newArticleTitle.value,
    richText: state.newArticleRichText.value,
  });
  organisationsStore.createAarticle(
    {
      title: state.newArticleTitle.value,
      url: state.newArticleRichText.value,
    },
    (res) => {
      state.newArticleTitle.value = "";
      state.newArticleRichText.value = "";
      state.selectedArticle = res;
    }
  );
};
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}
</style>
