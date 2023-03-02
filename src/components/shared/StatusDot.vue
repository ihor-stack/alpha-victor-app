<template>
  <div class="status-dot">
    <p v-if="props.status === 0" class="color-dark-gray font-mono font-size-xxs">
      <span class="dot dot--low-impact"></span>
      {{ statusFormat(props.status) }}
    </p>
    <p v-else-if="props.status === 1" class="color-dark-gray font-mono font-size-xxs">
      <span class="dot dot--high-impact"></span>
      {{ statusFormat(props.status) }}
    </p>
    <p v-else class="color-dark-gray font-mono font-size-xxs">
      <span class="dot dot--resolved"></span>
      {{ statusFormat(props.status) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps(['status']);
const statusFormat = (status: number) => {
  switch (status) {
    case 0:
      return 'low.impact';
    case 1:
      return 'high.impact';
    case 2:
      return 'resolved';
    default: ''
  }
}
</script>

<style scoped>
</style>