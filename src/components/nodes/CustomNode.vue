<template>
  <div class="node">
    <Handle type="target" position="left" :position="Position.Left" />
    <div class="node-content" :style="{ backgroundColor: props.data.contentBgColor }">
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

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { watch } from 'vue'
import BaseNode from './BaseNode.vue'
import './BaseNode.vue';

const props = defineProps<{
  data: {
    type: string
    content: string
    contentBgColor: string
  }
  id: string  
}>()

watch(() => props.data.contentBgColor, (newColor) => {
  document.querySelector('.node-content').style.backgroundColor = newColor;
});
</script>
