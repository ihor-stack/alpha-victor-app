<template>
  <div class="space">
    <div class="space__image">
      <div class="space__image__gradient"></div>
      <img src="@/theme/img/space-the-johnson.jpg" />
    </div>
    <div class="space__info">
      <div>
        <div class="space__info__top">
          <h6 class="category color-light-gray">
            {{ props.space.spaceType }}
          </h6>
          <occupied-status :occupied="props.space.occupied" />
        </div>
        <div class="space__info__bottom">
          <h5 class="name font-bold color-light-gray">
            {{ props.space.spaceName }}
          </h5>
          <div class="capacity">
            <img
              src="@/theme/icons/capacity.svg"
              class="capacity-icon"
            />
            <span
              class="capacity-number color-light-gray font-size-xxs font-mono"
              >&gt;&gt;10</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Space } from "@/types";
import { defineProps } from "vue";
import OccupiedStatus from "../shared/OccupiedStatus.vue";

interface Props {
  space: Space
}

const props = defineProps<Props>();
</script>

<style scoped>
.space {
  position: relative;
  height: 200px;
  margin-bottom: 32px;
  border-radius: 4px;
  overflow: hidden;
}
.space__image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.space__image__gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}
.space__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.space__info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1;
  padding: 0 10px 12px;
}

.space__info__top,
.space__info__bottom {
  display: flex;
  justify-content: space-between;
}

.space__info .name {
  margin-left: 10px;
  padding-right: 30px;
  word-break: break-all;
}

.space__info .category {
  font-size: 10px;
  margin-bottom: 4px;
}

.space__info .capacity {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.space__info .capacity-icon {
  margin-right: 4px;
}
</style>