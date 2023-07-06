<template>
  <form class="container" v-on:submit.prevent="searchByShortcode">
    <input
      type="search"
      placeholder="Enter shortcode"
      v-model="state.shortcode"
      class="search-input font-size-sm"
    />
    <ion-button
      fill="clear"
      expand="block"
      size="small"
      class="search-icon"
      @click="searchByQrCode"
    >
      <img src="@/theme/icons/qr-code.svg" class="qr-code-icon" />
    </ion-button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { IonButton } from "@ionic/vue";
import { useRouter } from "vue-router";
import { publicAPI } from "@/axios";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

const router = useRouter();

const state = reactive({
  shortcode: "",
});

const searchByQrCode = async () => {
  const body = document.querySelector('body');

  if (body) {
    body.classList.add('scanner-active');
  }

  await BarcodeScanner.checkPermission({ force: true });
  BarcodeScanner.hideBackground();

  const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

  if (body) {
    body.classList.remove('scanner-active');
  }

  // if the result has content
  if (result.hasContent) {
    console.log(result.content); // log the raw scanned content

    loadingService.show("Loading...");
    publicAPI
      .get(`Space/FindShortcode?request=${result.content}`)
      .then((response) => {
        console.log(response);
        if (response?.data?.id) {
          router.push(`/space/${response.data.id}`);
        }
      })
      .catch((error) => {
        toastService.show("Error", "The QR code is not valid.", "error", "top");
      })
      .finally(() => {
        loadingService.close();
      });
  }
};

const searchByShortcode = () => {
  if (state.shortcode?.length < 1) return;

  loadingService.show("Loading...");
  publicAPI
    .get(`Space/FindShortcode?request=${state.shortcode}`)
    .then((response) => {
      console.log(response);
      if (response?.data?.id) {
        router.push(`/space/${response.data.id}`);
      }
    })
    .catch(() => {
      toastService.show("Error", "We couldn't find any spaces by that shortcode", "error", "top");
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
  border: 1px solid;
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
