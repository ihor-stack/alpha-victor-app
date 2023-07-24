<template>
  <div v-show="isScanning" class="barcode-scanner--area--container">
    <button class="close-button" @click="closeScanner">
      <ion-icon
        class="color-white"
        :icon="closeOutline"
        size="large"
      ></ion-icon>
    </button>
    <div class="square surround-cover">
      <div class="barcode-scanner--area--outer surround-cover">
        <div class="barcode-scanner--area--inner"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { closeOutline } from "ionicons/icons";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

const isScanning = inject('isScanning') as ReturnType<typeof ref>;

const closeScanner = () => {
  BarcodeScanner.stopScan();
  isScanning.value = false;
};
</script>

<style scoped>
.square {
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: 0.3s;
}
.square:after {
  content: '';
  top: 0;
  display: block;
  padding-bottom: 100%;
}
.square > div {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.surround-cover {
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.5);
}
.barcode-scanner--area--container {
  position: fixed;
  top: 0;
  right: 0;
  bottom:0;
  left: 0;
  z-index: 9999;
  width: 80%;
  max-width: min(500px, 80vh);
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.barcode-scanner--area--outer {
  display: flex;
  border-radius: 1em;
}
.barcode-scanner--area--inner {
  width: 100%;
  margin: 1rem;
  border: 2px solid #fff;
  box-shadow: 0px 0px 2px 1px rgb(0 0 0 / 0.5),
    inset 0px 0px 2px 1px rgb(0 0 0 / 0.5);
  border-radius: 1rem;
}
.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  z-index: 99999;
}
</style>