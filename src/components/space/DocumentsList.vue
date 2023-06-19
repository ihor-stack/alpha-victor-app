<template>
  <div class="documents-list__container">
    <div class="documents-list" v-for="(documents, documentTypeName) in groupedDocuments" :key="documentTypeName">
      <div class="documents-list__header">
        <h4 class="font-mono color-light-gray font-size-xxs">
          {{ documentTypeName }}
        </h4>
      </div>
      <ul class="documents-list__list">
        <li v-for="document in documents" :key="document.id">
          <router-link
            :to="{ name: 'DocumentViewer', params: { id: document.id } }"
            class="documents-list__item"
          >
            <div class="documents-list__item__info">
              <div class="documents-list__item__icon">
                <!-- PDF preview will go here -->
                <img src="@/theme/img/example-pdf.svg" />
              </div>
              <div>
                <p class="color-light-gray font-bold font-size-xs">
                  {{ document.name }}
                </p>
                <span class="color-dark-gray font-mono font-size-xxs"
                  >uploaded.{{ document.dateUploaded }}</span
                >
              </div>
            </div>
            <div class="documents-list__item__link">
              <span class="color-light-gray font-mono font-size-xxs"
                >&gt;&gt; view</span
              >
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

interface DocumentType {
  id: string;
  name: string;
}

interface Document {
  id: number;
  name: string;
  dateUploaded: string;
  documentType: DocumentType;
}

interface Props {
  documents: Document[];
}

const props = defineProps<Props>();

const groupedDocuments = computed(() => {
  return props.documents.reduce((grouped: Record<string, Document[]>, document: Document) => {
    const key = document.documentType.name;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(document);
    return grouped;
  }, {} as Record<string, Document[]>);
});
</script>

<style scoped>
.documents-list__container {
  padding: 0px 30px 20px;
}
.documents-list__header {
  padding-bottom: 10px;
  border-bottom: 0.75px solid #313131;
  margin-bottom: 18px;
}

.documents-list__list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.documents-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.documents-list__item__icon {
  width: 60px;
  height: 40px;
  background: url("@/theme/backgrounds/triangle-background.svg") no-repeat
    center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.documents-list__item__info {
  display: flex;
  align-items: center;
}
</style>
