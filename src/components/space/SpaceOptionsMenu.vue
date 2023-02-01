<template>
  <div class="container">
    <ul class="space-options-menu">
      <li class=space-options-menu-item>
        <router-link :to="{}">
          <p class="label font-bold font-size-sm color-light-gray">Room Equipment</p>
          <span class="arrow-right"></span>
        </router-link>
      </li>
      <li class=space-options-menu-item>
        <router-link :to="{}">
          <p class="label font-bold font-size-sm color-light-gray">Get Help</p>
          <span class="arrow-right"></span>
        </router-link>
      </li>
      <li class=space-options-menu-item>
        <router-link :to="{}">
          <div class="with-counter">
            <p class="label font-bold font-size-sm color-light-gray">Known Issues</p>
            <div v-if="issues && issues.length > 0" class="counter">
              <div>
                <span>{{ issues.length }}</span>
              </div>
            </div>
          </div>
          <span class="arrow-right"></span>
        </router-link>
      </li>
      <li class=space-options-menu-item>
        <router-link :to="{}">
          <p class="label font-bold font-size-sm color-light-gray">Documents</p>
          <span class="arrow-right"></span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Issue } from "@/types";

interface Props {
  issues: Issue[]
}

defineProps<Props>();
</script>

<style scoped>
.space-options-menu {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.space-options-menu-item a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
}

.space-options-menu-item:not(:first-of-type) {
  border-top: 0.75px solid #313131;
}

.space-options-menu-item .arrow-right {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url('@/theme/icons/arrow-right.svg');
  background-repeat: no-repeat;
  background-size: 8px 12px;
  background-position: center;
}

.space-options-menu-item .with-counter {
  display: flex;
  align-items: center;
}

.space-options-menu-item .counter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: #37B14C;
  border-radius: 50%;
  margin-left: 10px;
}

.space-options-menu-item .counter span {
  font-weight: 700;
  font-size: 11px;
  line-height: 11px;
  color: #FFFFFF;
}
</style>