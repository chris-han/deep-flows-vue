<template>
  <div class="node">
    <Handle type="target" position="left" :position="Position.Left" />
    <div class="node-content" :style="{ backgroundColor: props.data.contentBgColor }">
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

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { watch } from 'vue'
import BaseNode from './BaseNode.vue'
import './BaseNode.vue';

const props = defineProps<{
  data: {
    type: string
    content: string
    processType?: 'transform' | 'filter' | 'aggregate'
    contentBgColor: string
  }
  id: string  
}>()

watch(() => props.data.contentBgColor, (newColor) => {
  document.querySelector('.node-content').style.backgroundColor = newColor;
});
</script>

<style>
.process-icon {
  margin-right: 4px;
}

select {
  background-color: rgb(255, 255, 255);
}
</style>
