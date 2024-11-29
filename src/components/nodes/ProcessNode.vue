<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

const props = defineProps<{
  data: {
    type: string
    content: string
    processType?: 'transform' | 'filter' | 'aggregate'  // Added process-specific types
  }
  id: string
}>()
</script>

<template>
  <div class="process-node">
    <Handle type="target" position="left" :position="Position.Left" />
    <div class="process-node-content p-4 bg-white rounded-lg shadow-md">
      <div class="text-sm font-semibold mb-2">
        <span class="process-icon">⚙️</span>
        {{ props.data.type }}
      </div>
      <select 
        v-if="props.data.processType"
        v-model="props.data.processType"
        class="w-full p-2 mb-2 border rounded"
      >
        <option value="transform">Transform</option>
        <option value="filter">Filter</option>
        <option value="aggregate">Aggregate</option>
      </select>
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
.process-node {
  min-width: 200px;
}

.process-node-content {
  border: 1px solid #ddd;
  background-color: #f8f9fa;
}

.process-icon {
  margin-right: 4px;
}

select {
  background-color: white;
}
</style>