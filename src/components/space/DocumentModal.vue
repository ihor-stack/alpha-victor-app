<template>
  <div class="equipment-panel">
    <div class="equipment-panel-container">
      <h1 class="color-light-gray font-bold font-size-lg">{{ props.document.title }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(
  ['document'],
);
</script>

<style scoped>
.equipment-panel {
  height: 100%;
  border-radius: 40px 40px 0px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
}

.equipment-panel-container {
  position: relative;
  height: 100%;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
}
</style>
