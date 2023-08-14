<template>
  <form class="container" v-on:submit.prevent="searchByShortcode">
    <input
      type="search"
      :placeholder="$t('pages.dashboard.placeholder')"
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
import { reactive, inject, ref } from "vue";
import { IonButton } from "@ionic/vue";
import { useRouter } from "vue-router";
import { publicAPI } from "@/axios";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import mixpanel from "mixpanel-browser";

const router = useRouter();

const state = reactive({
  shortcode: "",
});

const isScanning = inject("isScanning") as ReturnType<typeof ref>;
const searchByQrCode = async () => {
  const body = document.querySelector("body");

  await BarcodeScanner.checkPermission({ force: true });
  BarcodeScanner.hideBackground();

  if (body) {
    body.classList.add("scanner-active");
  }

  isScanning.value = true;

  const startScanning = async () => {
    const scanPromise = BarcodeScanner.startScan();

    const timeoutPromise = new Promise(() => {
      setTimeout(() => {
        closeScanner();
      }, 10000); // 10 seconds
    });

    return Promise.race([scanPromise, timeoutPromise]);
  };

  const result = await startScanning();

  // if the result has content
  if (result.hasContent) {
    // Remove our base URL and prefix from content.
    const qrUrl = new URL(result.content);

    // Path name should be in the format <base>/qr/<shortcode>. Split on /qr/
    const pathName = qrUrl.pathname;

    if (pathName.indexOf("/qr/") == -1) {
      isScanning.value = false;
      toastService.show("Error", "The QR code is not valid.", "error", "bottom");
      return;    
    }

    const spaceShort = pathName.replace("/qr/", "");

    const loadId = loadingService.show("Loading...");
    publicAPI
      .get(
        `Space/SpaceByQR/${spaceShort}`
      )
      .then((response) => {
        if (response?.data?.spaceId) {
          router.push(`/space/${response.data.spaceId}?from=byQR`);
        }
      })
      .catch(() => {
        toastService.show("Error", "The QR code is not valid.", "error", "bottom");
      })
      .finally(() => {
        closeScanner();
        loadingService.close(loadId);
      });
  }

  isScanning.value = false;
};

const closeScanner = () => {
  BarcodeScanner.stopScan();
  const body = document.querySelector("body");

  if (body) {
    body.classList.remove("scanner-active");
  }

  isScanning.value = false;
};

const searchByShortcode = () => {
  if (state.shortcode?.length < 1) return;
  mixpanel.track("Shortcode Entered", {
    shortcode: state.shortcode,
  });
  const loadId = loadingService.show("Loading...");
  publicAPI
    .get(`Space/FindShortcode?request=${state.shortcode}`, {
      headers: {
        'X-AV-ErrorHandler': 'shortcode'
      }
    })
    .then((response) => {
      if (response?.data?.spaceId) {
        router.push(`/space/${response.data.spaceId}`);
      }
    })
    .catch((error) => {
      if (error.response?.status === 404) {
        toastService.show(
          "Error",
          "We couldn't find any spaces by that shortcode",
          "error",
          "bottom"
        );
      }
    })
    .finally(() => {
      loadingService.close(loadId);
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

.scanner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.6);
}

.scanner-overlay .close {
  color: #fff;
  font-size: 100px;
}
</style>
