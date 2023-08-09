<template>
  <div class="container">
    <div class="wifi-network">
      <p class="label font-mono text-spaced">{{$t('components.space.spaceWifiInfo.wifiNetworkParagraph')}}</p>
      <p class="font-size-xs font-bold">{{ wifiNetwork }}</p>
    </div>
    <div class="wifi-password">
      <p class="label font-mono text-spaced">{{ $t('components.space.spaceWifiInfo.wifiPasswordParagraph') }}</p>
      <p class="font-size-xs font-bold">{{ wifiPassword }}</p>
    </div>
    <div class="wifi-connect" v-if="showConnectButton">
      <ion-button
        @click="($event) => doWifiConnect()"
        expand="block"
        size="small"
        >{{$t('components.space.spaceWifiInfo.connectButton')}}</ion-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { IonButton } from "@ionic/vue";
import { isPlatform } from "@ionic/vue";
import { Wifi } from "@uncoded-limited/connect";

const props = defineProps(["wifiNetwork", "wifiPassword", "wifiSecurityType"]);

const showConnectButton = isPlatform("ios") || isPlatform("android");

const doWifiConnect = async () => {
  let wifiSecurityTypeStr = "";

  if (props.wifiSecurityType == 1) wifiSecurityTypeStr = "WEP";
  if (props.wifiSecurityType == 2) wifiSecurityTypeStr = "WPA";
  if (props.wifiSecurityType == 3) wifiSecurityTypeStr = "WPA2";
  if (props.wifiSecurityType == 4) wifiSecurityTypeStr = "WPA3";

  await Wifi.connect({
    ssid: props.wifiNetwork,
    password: props.wifiPassword,
    passwordType: wifiSecurityTypeStr,
  });
};
</script>

<style scoped>
.container {
  display: flex;
  background: var(--ion-color-light);
  border: 0.75px solid #313131;
  border-radius: 4px;
  padding: 12px 0;
}

@media only screen and (max-width: 1023px) {
.container {
  justify-content: space-between;
}
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
