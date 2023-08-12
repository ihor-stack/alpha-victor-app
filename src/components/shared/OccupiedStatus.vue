<template>
  <p
    class="occupied-status font-mono font-size-xxs text-spaced"
    :class="occupied ? 'color-red' : 'color-green'"
  >
    <span class="dot" :class="occupied ? 'occupied' : 'vacant'"></span>
    space.{{ occupied ? `occupied(${currentOccupancy})` : "vacant" }}
  </p>
</template>

<script setup lang="ts">
interface Props {
  occupied: boolean;
  currentOccupancy: number;
}

defineProps<Props>();
</script>

<style scoped>
.occupied-status {
  display: flex;
  align-items: center;
}

.occupied-status .dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;
  position: relative;
}

.occupied-status .dot::after {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  left: 0px;
}

.dot.occupied {
  background-color: rgba(255, 55, 55, 0.25);
}

.dot.occupied::after {
  background: #ff3737;
}

.dot.vacant {
  background: rgba(55, 177, 76, 0.25);
}

.dot.vacant::after {
  background: #37b14c;
}
</style>
