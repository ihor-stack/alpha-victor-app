<template>
  <ion-page>
    <div ref="upper">
      <app-header>
        <template #app-header-left>
          <ion-button fill="clear" color="light" @click="goBack">
            <span class="font-mono font-size-xs">&lt;&lt; back</span>
          </ion-button>
        </template>
      </app-header>
      <div class="document-panel__controls">
        <div class="document-panel__controls__pages">
          <div class="ft cl">{{ page }} / {{ pages }}</div>
        </div>
        <div class="document-panel__controls__zoom">
          <ion-icon :icon="removeOutline" @click="zoomOut" :class="{ toolbarIcon: true, disabled: scale <= 0.25 }" />
          <div class="document-panel__controls__zoom__value">{{ Math.round(scale * 100) }}%</div>
          <ion-icon :icon="addOutline" @click="zoomIn" :class="{ toolbarIcon: true, disabled: scale >= 3 }" />
        </div>
        <div class="document-panel__controls__download">
          <ion-icon :icon="downloadOutline" class="download-panel__controls__download__icon" />
          <ion-icon :icon="ellipsisVertical" />
        </div>
      </div>
    </div>
    <ion-content :scroll-y="true" :scroll-x="true" :scroll-events="true" @ion-scroll="handleScroll($event)">
      <div class="document-panel" ref="panel">
        <div class="document-panel__pdf">
          <pdf :src="url" v-for="i in pages" :key="i" :id="i" :page="i" v-model:scale="scale" :resize="fit"
            style="border-bottom: 2px solid #181818;" :annotation="true" ref="pdfViewer">
            <template slot="loading">Loading...</template>
          </pdf>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import AppHeader from "@/components/shared/AppHeader.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onIonViewWillEnter, IonPage, IonContent, IonIcon, IonButton } from "@ionic/vue";
import {
  addOutline,
  removeOutline,
  downloadOutline,
  ellipsisVertical
} from "ionicons/icons";
import pdf from "pdfvuer";
const router = useRouter();

// interface Document {
//   id: number
//   title: string
//   dateUploaded: string
//   url: string
// }

// const props = defineProps<{document: Document | null}>()
const page = ref(1);
const scale = ref(1);
const pages = ref(1);
const loaded = ref(false);
const fit = ref(true);
const url = ref("http://localhost:8100/assets/sample2.pdf");
const pdfViewer = ref([]);
const panel = ref();

const setupPDF = async () => {
  url.value = "http://localhost:8100/assets/sample2.pdf";
  const pdfData = await pdf.createLoadingTask(url.value);
  pages.value = pdfData.numPages;
  loaded.value = true;
};

const goBack = () => {
  router.back();
};

onIonViewWillEnter(() => {
  setupPDF();
});

const zoomIn = () => {
  fit.value = false;
  scale.value = Math.min(3, scale.value + 0.10);
};

const zoomOut = () => {
  fit.value = false;
  scale.value = Math.max(0.25, scale.value - 0.10);
};

const handleScroll = (ev: CustomEvent) => {
  changePage(ev.detail.scrollTop);
};

const findPos = (obj: {[key: string]: any} | null) => {
  if(obj) {
    return obj.offsetTop;
  }
};

const changePage = (currentScrollPos: number) => {
  let i = 1;
  const count = pages.value;
  do {
    if(currentScrollPos >= findPos(document.getElementById(i.toString())) && currentScrollPos <= findPos(document.getElementById((i+1).toString()))) {
      page.value = i
    }
    i++
  } while (i < count)
  if (currentScrollPos >= findPos(document.getElementById(i.toString()))) {
    page.value = i
  }
}
</script>

<!-- <style src="pdfvuer/dist/pdfvuer.css"></style> -->
<style scoped>
.document-panel {
  background-color: #181818;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.document-panel__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #181818;
  padding: 20px 24px;
  color: #ffffff;
}

.document-panel__controls__pages,
.document-panel__controls__zoom,
.document-panel__controls__download {
  display: flex;
  align-items: center;
  flex: 1;
}

.document-panel__controls__pages {
  border-right: 0.75px solid #717375;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
}

.document-panel__controls__zoom {
  justify-content: center;
  padding: 0 20px;
}

.document-panel__controls__zoom__value {
  margin-left: 18px;
  margin-right: 18px;
}

.document-panel__controls__download {
  justify-content: flex-end;
}

.download-panel__controls__download__icon {
  margin-right: 24px;
}

.document-panel__pdf {
  flex: 1;
}
</style>
