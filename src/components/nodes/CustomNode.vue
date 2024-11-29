<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

const props = defineProps<{
  data: {
    type: string
    content: string
  }
  id: string
}>()
</script>

<template>
  <div class="custom-node">
    <Handle type="target" position="left" :position="Position.Left" />
    <div class="custom-node-content p-4 bg-white rounded-lg shadow-md">
      <div class="text-sm font-semibold mb-2">{{ props.data.type }}</div>
      <input
        type="text"
        v-model="props.data.content"
        class="w-full p-2 border rounded"
        :placeholder="`${props.data.type} content...`"
        @touchstart.passive
        @touchmove.passive
        @touchend.passive
      />
    </div>
    <Handle type="source" position="right" :position="Position.Right" />
  </div>
</template>

<style scoped>
.custom-node {
  min-width: 150px;
}

.custom-node-content {
  border: 1px solid #ddd;
}
</style>