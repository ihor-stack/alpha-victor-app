<template>
  <div>
    <ion-label text-wrap="true" v-if="label">
      {{ label }}
    </ion-label>
    <ion-input
      :id="`${props.idPrefix}-popover`"
      readonly
      :value="displayValue"
      @click="openPopover($event)"
      :placeholder="placeholder"
    />
    <template v-if="isMultiple">
      <ion-chip v-for="(val, index) in modelValue" :key="index">
        <ion-label text-wrap="true">{{ val.title }}</ion-label>
        <ion-icon
          :icon="closeCircle"
          @click="removeValue(Number(index))"
        ></ion-icon>
      </ion-chip>
    </template>
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
          <div v-if="isMultiple">
            <div
              v-if="isSelected(option)"
              class="color-green selected-item-wrapper"
            >
              <ion-icon :icon="checkmarkCircle" size="small" />selected
            </div>
            <div v-else class="color-primary">>> select</div>
          </div>
        </li>
      </ul>
    </ion-popover>
  </div>
</template>

<script setup lang="ts">
import {
  IonLabel,
  IonInput,
  IonPopover,
  IonSearchbar,
  IonIcon,
  IonChip,
} from "@ionic/vue";
import { checkmarkCircle, closeCircle } from "ionicons/icons";
import { SelectItem } from "@/types/index";
import { onUpdated, reactive, computed } from "vue";

interface Props {
  label?: string;
  idPrefix: string;
  modelValue?: SelectItem | SelectItem[];
  options: SelectItem[];
  isSearchable?: boolean;
  placeholder?: string;
  isMultiple?: boolean;
  handleChange?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
});

const state = reactive({
  options: props.options,
  popoverOpen: false,
  event: {} as Event,
});

const displayValue = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.map((val) => val.title).join(", ");
  } else {
    return props.modelValue?.title || "";
  }
});

const emit = defineEmits(["update:modelValue"]);

function openPopover(e: Event) {
  state.event = e;
  state.popoverOpen = true;
}

function removeValue(index: number) {
  const prevValues = [...(props.modelValue || [])];
  prevValues.splice(index, 1);
  emit("update:modelValue", prevValues);
}

function isSelected(option: SelectItem) {
  return props.modelValue?.some(
    (value: SelectItem) => value.title === option.title
  );
}

function onOptionClick(option: SelectItem) {
  if (props.isMultiple) {
    let newValue = props.modelValue;
    if (isSelected(option)) {
      newValue = props.modelValue?.filter(
        (value: SelectItem) => value.title !== option.title
      );
    } else {
      newValue = [...newValue, option];
    }
    emit("update:modelValue", newValue);
  } else {
    state.popoverOpen = false;
    emit("update:modelValue", option);
  }
  props.handleChange && props.handleChange();
}

function handleSearch(event: any) {
  const query = event.target?.value?.toLowerCase();
  state.options = props.options.filter((option) =>
    option.title.toLowerCase().includes(query)
  );
}

onUpdated(() => {
  state.options = props.options;
});
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}
ion-popover .admin-select--item:hover {
  color: var(--av-mid-gray);
}
ion-popover .admin-select--item:last-of-type {
  border-bottom: none;
}
ion-searchbar,
ion-searchbar .searchbar-input {
  background: #fff;
}

.selected-item-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

ion-chip {
  --background: var(--av-primary);
  --color: var(--av-light-gray);
  margin-top: 15px;
}
</style>
