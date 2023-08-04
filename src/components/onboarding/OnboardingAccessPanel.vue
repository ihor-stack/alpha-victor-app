<template>
  <div class="access-panel">
    <div class="access-panel-container">
      <div class="image">
        <slot name="image"></slot>
      </div>
      <div class="main-content">
        <div class="dot-text-container">
          <DotText :text="dotText" offset="50" />
        </div>
        <div class="heading-container">
          <h1 class="headline font-size-xl color-light-gray font-bold">
            <slot name="heading"></slot>
          </h1>
        </div>
        <div class="info-text-container">
          <p class="info-text">
            <slot name="info-text"></slot>
          </p>
        </div>
        <div class="ion-margin-top">
          <LanguageSelect
            v-if="isLanguage"
            v-model="state.language"
            :defaultValue="state.language"
          />
        </div>
        <div class="button-container">
          <ion-button expand="block" @click="ctaFunc(state.language)">
            {{
              isLanguage
                ? $t("pages.allowAccess.modal.confirm")
                : $t("components.onboarding.enableButton")
            }}
          </ion-button>
        </div>
        <div class="link-container text-center">
          <p class="color-mid-gray font-sm">
            <span @click="skipPermissions" class="color-light-gray link"
              >Skip permissions</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from "@ionic/vue";
import DotText from "../shared/DotText.vue";
import { useRouter } from "vue-router";
import { reactive } from "vue";

import LanguageSelect from "@/components/shared/LanguageSelect.vue";

const router = useRouter();

defineProps<{
  dotText: string;
  isLanguage: boolean;
  ctaFunc: (language?: number) => void;
  signIn: () => void;
}>();

interface State {
  language: number;
}

const state: State = reactive({
  language: 0,
});

const skipPermissions = async () => {
  return router.replace({ name: "Dashboard" });
};
</script>

<style scoped>
.access-panel {
  border-radius: 40px 40px 0px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
}

.access-panel-container {
  height: 100%;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
}

.image {
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}

.dot-text-container {
  margin-bottom: 10px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.headline {
  letter-spacing: 0.015em;
  margin-left: 18px;
  text-indent: -20px;
  margin-bottom: 12px;
}

.info-text {
  font-size: 1rem;
  line-height: 1.125rem;
  color: #f4f7ff;
}

.link-container {
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 0 0;
  font-size: 13px;
}

.link {
  cursor: pointer;
}

.link:hover {
  opacity: 0.5;
}

.button-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
