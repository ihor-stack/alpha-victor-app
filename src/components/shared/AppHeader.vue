<template>
  <header class="app-header">
    <div class="app-header__upper">
      <div class="app-header__left">
        <slot name="app-header-left"></slot>
      </div>
      <div class="app-header__center">
        <img src="@/theme/img/logo/logo-without-name.svg" class="logo" alt="AlphaVictor logo" />
      </div>
      <div class="app-header__right">
        <slot name="app-header-right"></slot>
      </div>
    </div>
    <div class="app-header__lower" v-if="props.title">
      <h1 class="font-bold font-size-lg color-light-gray">
        {{ props.title }}
      </h1>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: false,
  }
});
</script>

<style scoped>
.app-header__upper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0 12px;
  width: 100%;
}

.app-header__left,
.app-header__center,
.app-header__right {
  flex: 1;
  display: flex;
  align-items: center;
}

.app-header__center {
  justify-content: center;
}

.app-header__right {
  justify-content: flex-end;
}

.app-header__lower {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 20px;
}
</style>
