<template>
  <div class="documents-list__container">
    <div class="documents-list">
      <div class="documents-list__header">
        <h4 class="font-mono color-light-gray font-size-xxs">installation.guides</h4>
      </div>
      <ul class="documents-list__list">
        <li v-for="document in props.documents" :key="document.id">
          <router-link :to="{ name: 'DocumentViewer' }" class="documents-list__item">
            <div class="documents-list__item__info">
              <div class="documents-list__item__icon">
                <!-- PDF preview will go here -->
                <img src="@/theme/img/example-pdf.svg" />
              </div>
              <div>
                <p class="color-light-gray font-bold font-size-xs">{{ document.title }}</p>
                <span class="color-dark-gray font-mono font-size-xxs">uploaded.{{ document.dateUploaded }}</span>
              </div>
            </div>
            <div class="documents-list__item__link">
              <span class="color-light-gray font-mono font-size-xxs">&gt;&gt; view</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface Document {
  id: number;
  title: string;
  dateUploaded: string;
}

interface Props {
  documents: Document[]
}

const props = defineProps<Props>()
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
  background: url('@/theme/backgrounds/triangle-background.svg') no-repeat center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.documents-list__item__info {
  display: flex;
  align-items: center;
}

</style>