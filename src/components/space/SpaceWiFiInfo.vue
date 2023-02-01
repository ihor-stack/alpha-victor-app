<template>
  <div class="container">
    <div class="wifi-network">
      <p class="label font-mono color-light-gray text-spaced">wifi.network</p>
      <p class="font-size-xs color-light-gray font-bold">oktra_guest</p>
    </div>
    <div class="wifi-password">
      <p class="label font-mono color-light-gray text-spaced">wifi.password</p>
      <p class="font-size-xs color-light-gray font-bold">goswell</p>
    </div>
    <div class="wifi-connect">
      <ion-button expand="block" size="small">Connect</ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: space-between;
    background: #181818;
    border: 0.75px solid #313131;
    border-radius: 4px;
    padding: 12px 0;
  }

  .wifi-network,
  .wifi-password,
  .wifi-connect {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    padding: 0 12px;
  }

  .wifi-connect {
    flex: 1;
  }

  .wifi-connect ion-button {
    width: 100%;
    --padding-top: 12px;
    --padding-bottom: 12px;
  }

  .wifi-network {
    border-right: 0.75px solid #313131;
  }

  .label {
    font-size: 8px;
    margin-bottom: 4px;
  }
</style>