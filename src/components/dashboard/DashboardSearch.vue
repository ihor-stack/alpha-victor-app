<template>
  <div class="container">
    <input
      type="search"
      placeholder="Enter shortcode"
      v-model="state.shortcode"
      class="search-input font-bold font-size-sm"
    />
    <ion-button
      fill="clear"
      expand="block"
      size="small"
      class="search-icon"
      :disabled="state.shortcode?.length < 1"
      @click="searchByShortcode"
    >
      <img src="@/theme/icons/qr-code.svg" class="qr-code-icon" />
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { IonButton } from "@ionic/vue";
import { useRouter } from "vue-router";
import { publicAPI } from "@/axios";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";

const router = useRouter();

const state = reactive({
  shortcode: "",
});

const searchByShortcode = () => {
  loadingService.show("Loading...");
  publicAPI
    .get(`Space/FindShortcode?request=${state.shortcode}`)
    .then((response) => {
      console.log(response);
      if (response?.data?.id) {
        router.push(`/space/${response.data.id}`);
      }
    })
    .catch((error) => {
      toastService.show("Error", error, "error", "top");
    })
    .finally(() => {
      loadingService.close();
    });
};
</script>

<style scoped>
.container {
  background: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.search-input {
  flex: 1;
  padding: 18px;
  border: 0;
  color: #000;
  background: #fff;
}

.search-input::placeholder {
  color: #000;
}

.search-input:focus-visible {
  outline: 0;
}

.search-icon {
  padding: 0 10px;
}

.container ion-button {
  --padding-start: 0px;
  --padding-top: 0px;
  --padding-bottom: 0px;
  --padding-end: 0px;
}
</style>
