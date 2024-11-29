<template>
  <div class="node">
    <Handle type="target" position="left" :position="Position.Left" />
    <div class="node-content" :style="{ backgroundColor: contentBgColor }">
      <slot></slot>
    </div>
    <Handle type="source" position="right" :position="Position.Right" />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
const props = defineProps<{
  data: {
    type: string
    content: string
    contentBgColor: string
  }
  id: string  
}>()
</script>

<style>
.node {
  min-width: 150px;
}

.node-content {
  border: 1px solid #ddd;
  background-color: #d3d317;
  padding: 1rem; /* p-4 */ 
  border-radius: 0.5rem; /* rounded-lg */ 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
}
</style>
