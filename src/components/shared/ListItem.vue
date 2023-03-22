<template>
  <li class="list-item"
    @click="props.clickHandler()">
    <div class="list-item__info">
      <slot name="icon"></slot>
      <div class="list-item__details">
        <p class="primaryText font-bold font-size-sm color-light-gray">
          {{ props.primaryText }}
        </p>
        <p v-if="props.secondaryText"
          class="secondaryText font-mono font-size-xxs color-dark-gray text-lowercase">
          {{ useDotify(props.secondaryText) }}
        </p>
      </div>
    </div>
    <span class="arrow-right"></span>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useDotify } from "@/composables/utilities";

interface Props {
  primaryText: string
  secondaryText: string
  clickHandler?: any
}

const props = defineProps<Props>();
</script>

<style scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
}
.list-item:not(:first-of-type) {
  border-top: 0.75px solid #313131;
}
.list-item__info {
  display: flex;
  align-items: center;
}
.list-item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}
.list-item__details .secondaryText {
  margin-top: 8px;
  margin-left: 10px;
}
.list-item .arrow-right {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("@/theme/icons/arrow-right.svg");
  background-repeat: no-repeat;
  background-size: 8px 12px;
  background-position: center;
}

</style>