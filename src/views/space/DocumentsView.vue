<template>
  <ion-page>
    <ion-content>
      <app-header :showLower="true">
        <template #app-header-left>
          <ion-button fill="clear" color="light" @click="goBack">
            <span class="font-mono font-size-xs">&lt;&lt; back</span>
          </ion-button>
        </template>
        <template #app-header-title>Documents</template>
      </app-header>
      <ion-content>
        <div class="container">
          <div class="grouped-list">
            <div class="grouped-list__header">
              <h4 class="font-mono color-light-gray font-size-xxs">installation.guides</h4>
            </div>
            <ul class="grouped-list__list">
              <li v-for="document in roomDocuments" :key="document.id">
                <router-link :to="{ name: 'DocumentViewer' }" class="grouped-list__item">
                  <div class="grouped-list__item__info">
                    <div class="grouped-list__item__icon">
                      <!-- PDF preview will go here -->
                      <img src="@/theme/img/example-pdf.svg" />
                    </div>
                    <div>
                      <p class="color-light-gray font-bold font-size-xs">{{ document.title }}</p>
                      <span class="color-dark-gray font-mono font-size-xxs">uploaded.{{ document.dateUploaded }}</span>
                    </div>
                  </div>
                  <div class="grouped-list__item__link">
                    <span class="color-light-gray font-mono font-size-xxs">&gt;&gt; view</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
// import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

// interface Document {
//   id: number
//   title: string
//   dateUploaded: string
//   url: string
// }

// interface State {
//   modalOpen: boolean
//   selectedDocument: Document | null
// }

// const state: State = reactive({
//   modalOpen: false,
//   selectedDocument: null,
// });

// const handleDismiss = () => {
//   state.modalOpen = false;
// };

// const handleClick = (item: any) => {
//   state.selectedDocument = item;
//   state.modalOpen = !state.modalOpen;
// };

const goBack = () => {
  router.back();
};

const roomDocuments = [
  {
    id: 1,
    title: "Crestron RMC3 Reference",
    dateUploaded: "2020-03-10",
    url: '@/theme/sample.pdf'
  },
  {
    id: 2,
    title: "QM98N Setup",
    dateUploaded: "2020-03-10",
    url: '@/theme/sample.pdf'
  },
  {
    id: 3,
    title: "Clickshare C10 Installation",
    dateUploaded: "2020-03-10",
    url: '@/theme/sample.pdf'
  }
];
</script>

<style scoped>
.container {
  padding: 0px 30px 20px;
}

.grouped-list__header {
  padding-bottom: 10px;
  border-bottom: 0.75px solid #313131;
  margin-bottom: 18px;
}

.grouped-list__list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.grouped-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.grouped-list__item__icon {
  width: 60px;
  height: 40px;
  background: url('@/theme/backgrounds/triangle-background.svg') no-repeat center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grouped-list__item__info {
  display: flex;
  align-items: center;
}

ion-modal {
  --max-height: 80vh;
}
</style>
