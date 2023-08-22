<template>
  <ion-row class="form-admin--group_field">
    <ion-reorder-group
      :disabled="false"
      @ionItemReorder="handleReorder($event)"
    >
      <ion-item
        class="form-admin--group_field-item rev-margin ion-no-padding"
        v-for="image in images"
        v-bind:key="image.id"
      >
        <ion-thumbnail slot="start">
          <img
            :alt="$t('components.shared.imageGallery.imageAlt')"
            :src="image.path"
          />
        </ion-thumbnail>
        <ion-label class="font-size-xs" text-wrap="true">
          {{ image.name }}
        </ion-label>
        <ion-radio-group
          :value="image.id"
          v-if="toggleImageFeatured"
          slot="end"
        >
          <span class="font-size-xs">Featured</span>
          <ion-radio
            color="dark"
            :value="image.featured ? image.id : 'not-selected'"
            @click="handleImageToggleFeature(image)"
          />
        </ion-radio-group>
        <ion-button
          class="button-red text-lowercase delete-button"
          slot="end"
          fill="clear"
          size="small"
          @click="removeImage(image.id)"
        >
          {{ $t("components.shared.imageGallery.removeButton") }}
        </ion-button>
        <ion-reorder slot="end" v-if="images.length > 1">
          <ion-icon :icon="reorderThree"></ion-icon>
        </ion-reorder>
      </ion-item>
    </ion-reorder-group>
  </ion-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reorderThree } from "ionicons/icons";
import { Photo } from "@/types";

const props = defineProps(["images", "toggleImageFeatured"]);
const emit = defineEmits<{
  (e: "image-removed", id: string): void;
  (e: "image-reordered", id: Photo[]): void;
}>();

const removeImage = (id: string) => {
  emit("image-removed", id);
};

const handleImageToggleFeature = (photo: Photo) => {
  props.toggleImageFeatured(photo);
};

const handleReorder = (event: CustomEvent) => {
  const { from, to }: { from: number; to: number } = event.detail;
  event.detail.complete();
  const orderedImages = [...props.images];
  orderedImages.splice(from, 1);
  orderedImages.splice(to, 0, props.images[from]);
  emit(
    "image-reordered",
    orderedImages.map((image, order) => ({ ...image, order }))
  );
};
</script>

<style scoped>
ion-label {
  font-size: 12px;
}
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
ion-radio-group {
  display: flex;
  align-items: center;
}
ion-radio-group span {
  margin-right: 10px;
}
ion-reorder {
  display: flex;
  align-items: center;
}
ion-reorder ion-icon {
  font-size: 1.5rem;
  opacity: 0.15;
}

.delete-button {
  position: relative;
  z-index: 10;
}
</style>
