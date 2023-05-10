<template>
  <div class="container">
    <input
      type="search"
      placeholder="Enter shortcode"
      class="search-input font-bold font-size-sm"
    />
    <ion-button fill="clear" expand="block" size="small" class="search-icon">
      <img src="@/theme/icons/qr-code.svg" class="qr-code-icon" />
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from "@ionic/vue";
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
