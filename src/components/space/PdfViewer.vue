<template>
  <ion-content
    :scroll-y="true"
    :scroll-x="true"
    :scroll-events="true"
    @ion-scroll="handleScroll($event)"
    ref="panel"
  >
    <div class="document-panel__controls" slot="fixed">
      <div class="document-panel__controls__pages">
        <ion-input
          type="number"
          :min="1"
          :max="pages"
          :value="page"
          :clear-on-edit="true"
          :debounce="4000"
          enterkeyhint="go"
          inputmode="numeric"
          class="document-panel__controls__page-input"
          @ion-input="jumpToPage($event)"
          ref="input"
        />
        <span>/</span>
        {{ pages }}
      </div>
      <div class="document-panel__controls__zoom">
        <ion-icon
          :icon="removeOutline"
          @click="zoomOut"
          :class="{ toolbarIcon: true, disabled: scale <= 0.25 }"
        />
        <div class="document-panel__controls__zoom__value">
          {{ Math.round(scale * 100) }}%
        </div>
        <ion-icon
          :icon="addOutline"
          @click="zoomIn"
          :class="{ toolbarIcon: true, disabled: scale >= 3 }"
        />
      </div>
      <div class="document-panel__controls__rotate">
        <ion-icon :icon="reloadOutline" @click="rotate" />
      </div>
      <div class="document-panel__controls__download">
        <ion-icon
          :icon="downloadOutline"
          class="download-panel__controls__download__icon"
        />
        <ion-icon :icon="ellipsisVertical" />
      </div>
    </div>
    <div class="document-panel">
      <div class="document-panel__pdf">
        <pdf
          v-for="i in pages"
          :src="props.url"
          :key="i"
          :id="i"
          :page="i"
          :resize="fit"
          v-model:scale="scale"
          :rotate="rotation"
          style="border-bottom: 2px solid #181818"
          :annotation="true"
          ref="pdfViewer"
        >
          <template slot="loading">Loading...</template>
        </pdf>
      </div>
    </div>
  </ion-content>
</template>

<script setup lang="ts">
import { IonContent, IonIcon, IonInput } from "@ionic/vue";
import {
  addOutline,
  removeOutline,
  downloadOutline,
  ellipsisVertical,
  reloadOutline,
} from "ionicons/icons";
import { ref, onMounted } from "vue";
import pdf from "pdfvuer";

const props = defineProps(["url"]);

const page = ref(1);
const scale = ref(1);
const pages = ref(1);
const loaded = ref(false);
const fit = ref(true);
const rotation = ref(0);
const path = ref();
const panel = ref();

onMounted(() => {
  setupPDF();
});

const setupPDF = async () => {
  path.value = props.url;
  const pdfData = await pdf.createLoadingTask(path.value);
  pages.value = pdfData.numPages;
  loaded.value = true;
};

const handleScroll = (ev: CustomEvent) => {
  changePage(ev.detail.scrollTop);
};

const rotate = () => {
  rotation.value += 90;
  if (rotation.value > 359) rotation.value = 0;
};

const jumpToPage = (ev: CustomEvent) => {
  const target = ev.detail.data;
  const targetPagePos = findPos(document.getElementById(target?.toString()));
  panel.value.$el.scrollEl.scrollTop = targetPagePos - 75;
};

const zoomIn = () => {
  fit.value = false;
  scale.value = Math.min(3, scale.value + 0.1);
};

const zoomOut = () => {
  fit.value = false;
  scale.value = Math.max(0.25, scale.value - 0.1);
};

const findPos = (obj: { [key: string]: any } | null) => {
  if (obj) {
    return obj.offsetTop;
  }
};

const changePage = (currentScrollPos: number) => {
  let i = 1;
  const count = pages.value;
  do {
    if (
      currentScrollPos + 75 >= findPos(document.getElementById(i.toString())) &&
      currentScrollPos - 75 <=
        findPos(document.getElementById((i + 1).toString()))
    ) {
      page.value = i;
    }
    i++;
  } while (i < count);
  if (currentScrollPos + 75 >= findPos(document.getElementById(i.toString()))) {
    page.value = i;
  }
};
</script>

<style scoped>
ion-content {
  --padding-top: 75px;
}

ion-input {
  --padding-bottom: 0;
  --padding-top: 0;
  --padding-end: 0;
}
.document-panel {
  background-color: #181818;
}

.document-panel__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #181818;
  padding: 0 24px;
  color: #ffffff;
  top: 0;
  left: 0;
  right: 0;
  height: 75px;
}

.document-panel__controls__pages,
.document-panel__controls__zoom,
.document-panel__controls__rotate,
.document-panel__controls__download {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.document-panel__controls__pages {
  border-right: 0.75px solid #717375;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
}

.document-panel__controls__pages span {
  display: inline-block;
  padding-right: 8px;
  padding-left: 6px;
}

.document-panel__controls__zoom {
  justify-content: center;
  padding: 0 20px;
  border-right: 0.75px solid #717375;
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
  margin-bottom: 250px;
}
</style>
