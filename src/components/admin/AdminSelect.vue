<template>
  <div>
    <ion-label v-if="label">
      {{ label }}
    </ion-label>
    <ion-input
      :id="`${props.idPrefix}-popover`"
      readonly
      :value="props.modelValue ? props.modelValue.title : ''"
      @click="openPopover($event)"
    />
    <ion-popover
      :is-open="state.popoverOpen"
      :event="state.event"
      @didDismiss="state.popoverOpen = false"
      size="cover"
      v-if="props.options.length > 0"
    >
      <ion-searchbar
        :debounce="1000"
        @ionInput="handleSearch($event)"
        v-if="isSearchable"
      ></ion-searchbar>
      <ul class="admin-select">
        <li
          class="admin-select--item"
          v-for="option in state.options"
          :key="option.id"
          @click="onOptionClick(option)"
        >
          {{ option.title }}
        </li>
      </ul>
    </ion-popover>
  </div>
</template>

<script setup lang="ts">
import { IonLabel, IonInput, IonPopover, IonSearchbar } from "@ionic/vue";
import { SelectItem } from "@/types/index";
import { reactive } from "vue";

interface Props {
  label?: string;
  idPrefix: string;
  modelValue?: SelectItem;
  options: SelectItem[];
  isSearchable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
});

const state = reactive({
  options: props.options,
  popoverOpen: false,
  event: {} as Event,
});

const emit = defineEmits(["update:modelValue"]);

function openPopover(e: Event) {
  state.event = e;
  state.popoverOpen = true;
}

function onOptionClick(option: SelectItem) {
  state.popoverOpen = false;
  emit("update:modelValue", option);
}

function handleSearch(event: any) {
  const query = event.target?.value?.toLowerCase();
  state.options = props.options.filter((option) =>
    option.title.toLowerCase().includes(query)
  );
}
</script>
<style scoped>
ion-popover {
  --background: transparent;
  --backdrop-opacity: 0.6;
  --box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.6);
  --color: white;
  --width: 300px;
}
ion-popover::part(backdrop) {
  background-color: var(--av-darkest-gray);
}
ion-popover .admin-select {
  background-color: white;
  padding: 0 15px;
  list-style: none;
  border-radius: 0 0 10px 10px;
  margin-top: 0;
}
ion-popover .admin-select--item {
  color: #000;
  padding: 20px 0;
  border-bottom: 1px solid var(--av-mid-gray);
  cursor: pointer;
}
ion-popover .admin-select--item:hover {
  color: var(--av-mid-gray);
}
ion-popover .admin-select--item:last-of-type {
  border-bottom: none;
}
ion-searchbar, ion-searchbar .searchbar-input {
  background: #fff;
}
</style>
