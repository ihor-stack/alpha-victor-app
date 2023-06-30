<template>
  <ion-row class="form-admin--group_field">
    <ion-col
      size-xs="12"
      size-md="6"
      class="form-admin--group_field"
      v-for="image in images"
      v-bind:key="image.id"
    >
      <ion-item
        button
        class="form-admin--group_field-item rev-margin ion-no-padding"
      >
        <ion-thumbnail slot="start">
          <img alt="image" :src="image.path" />
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
          &gt;&gt; remove
        </ion-button>
      </ion-item>
    </ion-col>
  </ion-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ImageGallery",
  props: {
    images: {
      type: Array,
    },
  },
  emits: {
    "image-removed": (payload: string) => typeof payload === "string",
  },
  setup(props, { emit }) {
    const removeImage = (id: string) => {
      emit("image-removed", id);
    };

    return {
      removeImage,
    };
  },
});
</script>

<style scoped>
ion-thumbnail {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
