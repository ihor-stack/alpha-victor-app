<template>
  <ion-col size="6" @click="state.modalOpen = true">
    <img :src="path" />
    <ion-modal
      :is-open="state.modalOpen"
      @willDismiss="handleDismiss"
      :initial-breakpoint="1"
      :breakpoints="[0, 1]"
      class="auto-height"
    >
      <ion-page>
        <div class="modal-panel">
          <div class="close-wrapper" @click="state.modalOpen = false">
            Tap to dismiss
            <ion-icon :icon="closeCircle" size="primary" />
          </div>
          <div class="modal-panel-container">
            <img :src="photos[state.currentIndex].path" />
            <div class="control-wrapper">
              <div class="control" @click="onPrev">
                {{ $t("pages.space.photos.prev") }}
              </div>
              <div>{{ `${state.currentIndex + 1} / ${photos.length}` }}</div>
              <div class="control" @click="onNext">
                {{ $t("pages.space.photos.next") }}
              </div>
            </div>
          </div>
        </div>
      </ion-page>
    </ion-modal>
  </ion-col>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { IonPage, IonCol, IonModal, IonIcon } from "@ionic/vue";
import { closeCircle } from "ionicons/icons";

const props = defineProps(["photos", "index", "path"]);
const state = reactive({
  modalOpen: false,
  currentIndex: props.index,
});

const handleDismiss = () => {
  state.modalOpen = false;
};

const onPrev = () => {
  if (state.currentIndex === 0) {
    return;
  } else {
    state.currentIndex--;
  }
};

const onNext = () => {
  if (state.currentIndex < props.photos.length - 1) {
    state.currentIndex++;
  } else {
    return;
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  cursor: pointer;
  object-fit: cover;
}
ion-modal::part(content) {
  background: transparent;
  --height: 80%;
  box-shadow: none;
}

ion-modal::part(backdrop) {
  background: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0) 100%);
}
.close-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 8px;
}
.close-wrapper ion-icon {
  font-size: 16px;
}
.control-wrapper {
  display: flex;
  align-items: center;
  gap: 25px;
  margin: 22px auto;
  font-size: 12px;
}
.control {
  cursor: pointer;
}
.modal-panel {
  height: 100%;
  width: 100%;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px;
}

.modal-panel-container {
  padding: 0;
  height: auto;
  /* background: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0) 100%); */
}
</style>
