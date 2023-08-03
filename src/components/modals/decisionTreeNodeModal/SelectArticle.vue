<template>
  <common-modal
    :title="$t('components.modals.decisionTreeNodeModal.selectArticle.selectArticleTitle')"
    :description="$t('components.modals.decisionTreeNodeModal.selectArticle.selectArticleDescription')"
    :handleDismiss="() => handleDismiss()"
  >
    <div>
      <template v-if="state.isAddingArticle">
        <ion-row>
          <ion-col size="12" class="form-admin--group_field">
            <ion-label text-wrap="true">{{ $t('components.modals.decisionTreeNodeModal.selectArticle.articleTitleLabel') }}</ion-label>
            <ion-input
              :placeholder="$t('components.modals.decisionTreeNodeModal.selectArticle.articleTitleInputPlaceholder')"
              v-model="state.newArticleTitle.value"
            ></ion-input>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="editor-wrapper">
            <editor
              api-key="no-api-key"
              v-model="state.newArticleRichText.value"
              :init="{
                height: 258,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'formatselect | bold italic backcolor | \
                bullist numlist outdent indent | removeformat | help',
                content_style: 'body {background: #181818; color: #ffffff;}',
              }"
            />
          </ion-col>
        </ion-row>
      </template>
      <template v-else>
        <ion-row>
          <ion-col size="12">
            <input-with-icon
              iconPosition="start"
              type="search"
              :placeholder="$t('components.modals.decisionTreeNodeModal.selectArticle.searchInputPlaceholder')"
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
      </template>
    </div>
    <ion-footer>
      <template v-if="state.isAddingArticle">
        <ion-button
          class="ion-text-capitalize"
          expand="block"
          @click="onAddArticle"
        >
          {{ $t('components.modals.decisionTreeNodeModal.selectArticle.addArticleButton') }}
        </ion-button>
        <ion-button
          class="ion-text-capitalize ion-margin-top"
          fill="outline"
          expand="block"
          @click="state.isAddingArticle = false"
        >
        {{$t('components.modals.decisionTreeNodeModal.selectArticle.cancelButton')}}
        </ion-button>
      </template>
      <template v-else>
        <ion-button
          class="ion-text-capitalize"
          fill="outline"
          expand="block"
          @click="state.isAddingArticle = true"
        >
          {{$t('components.modals.decisionTreeNodeModal.selectArticle.addNewArticleButton')}}</ion-button
        >
        <ion-button
          class="ion-text-capitalize ion-margin-top"
          expand="block"
          @click="handleClickConfirm({ article: state.selectedArticle })"
        >
        {{$t('components.modals.decisionTreeNodeModal.selectArticle.confirmSelectionButton')}}</ion-button
        >
      </template>
      <ion-button
        class="ion-text-capitalize"
        fill="clear"
        expand="block"
        @click="handleClickBack"
      >
        {{$t('components.modals.decisionTreeNodeModal.selectArticle.backToDestinationButton')}}
      </ion-button>
    </ion-footer>
  </common-modal>
</template>
<script setup>
import { reactive, computed } from "vue";
import {
  IonContent,
  IonButton,
  IonFooter,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
} from "@ionic/vue";
import Editor from "@tinymce/tinymce-vue";
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
  organisationsStore.createAarticle(
    {
      title: state.newArticleTitle.value,
      richText: state.newArticleRichText.value,
    },
    (res) => {
      state.newArticleTitle.value = "";
      state.newArticleRichText.value = "";
      state.selectedArticle = res;
      state.isAddingArticle = false;
    }
  );
};
</script>

<style scoped>
.editor-wrapper {
  padding: 0 0 10px;
}
</style>
