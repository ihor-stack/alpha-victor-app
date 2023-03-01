<template>
  <div class="dot-text-container" :style="{ marginLeft: props.offset + 'px' }">
    <p class="dot-text">>> {{ props.text }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  offset?: string;
}

const props = withDefaults(defineProps<Props>(), {
  offset: () => "0",
});
</script>

<style scoped>
.dot-text {
  font-family: var(--av-font-mono);
  color: var(--av-light-gray);
  font-size: var(--av-font-sm);
  line-height: var(--av-font-sm);
  letter-spacing: 0.015em;
}
</style>
