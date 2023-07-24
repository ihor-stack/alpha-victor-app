<template>
  <div class="ion-padding">
    <ion-button
      class="ion-no-padding"
      fill="clear"
      color="dark"
      @click="() => router.back()"
    >
      <span class="font-mono font-size-xs">&lt;&lt; back</span>
    </ion-button>
    <router-view />
  </div>
</template>

<style scoped>
ion-button {
  margin-bottom: 20px;
}
</style>