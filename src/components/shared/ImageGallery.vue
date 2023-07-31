<template>
  <ion-row class="form-admin--group_field">
    <ion-reorder-group :disabled="false" @ionItemReorder="handleReorder($event)">
      <ion-item
        button
        class="form-admin--group_field-item rev-margin ion-no-padding"
        v-for="image in images"
        v-bind:key="image.id"
      >
        <ion-thumbnail slot="start">
          <img :alt="$t('components.shared.imageGallery.imageAlt')" :src="image.path" />
        </ion-thumbnail>
        <ion-label>
          {{ image.name }}
        </ion-label>
        <ion-button
          class="button-red text-lowercase"
          slot="end"
          fill="clear"
          size="small"
          @click="removeImage(image.id)"
        >
          {{ $t('components.shared.imageGallery.removeButton')}}
        </ion-button>
        <ion-reorder slot="end" v-if="images.length > 1">
          <ion-icon :icon="menuOutline"></ion-icon>
        </ion-reorder>
      </ion-item>
    </ion-reorder-group>
  </ion-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { menuOutline } from "ionicons/icons";

const props = defineProps(['images']);
const emit = defineEmits<{
  (e: 'image-removed', id: string): void
  (e: 'image-reordered', id: string[]): void
}>();

const removeImage = (id: string) => {
  emit("image-removed", id);
};

const images = ref(props.images);

const handleReorder = (event: CustomEvent) => {
  const { from, to } : { from: number, to: number} = event.detail;

  event.detail.complete();

  [images.value[from], images.value[to]] = [images.value[to], images.value[from]];

  emit("image-reordered", images.value);
};
</script>

<style scoped>
ion-reorder-group {
  width: 100%;
}
ion-thumbnail {
  margin-top: 0;
  margin-bottom: 0;
}
ion-col {
  display: block;
}
ion-reorder {
  height: 100%;
  width: 30px;
  display: flex;
  align-items: center;
}
ion-reorder ion-icon {
  font-size: 1.5rem;
  opacity: .15;
}
</style>