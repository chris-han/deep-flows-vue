<template>
    <div class="node" ref="node">
      <Handle type="target" position="left" :position="Position.Left" />
      <div class="node-content" :style="{ backgroundColor: props.data.contentBgColor }">
        <div class="text-sm font-semibold mb-2">
          <span class="task-icon">🛠️</span>
          Task: {{ props.data.label }}
        </div>
        <input
          type="text"
          v-model="props.data.content"
          class="w-full p-2 border rounded"
          :placeholder="`Task content...`"
        />
      </div>
      <Handle type="source" position="right" :position="Position.Right" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { Handle, Position } from '@vue-flow/core';
  import { ref, onMounted } from 'vue';
  
  const props = defineProps<{
    data: {
      label: string;
      content: string;
      contentBgColor: string;
    }
    id: string  
  }>();
  
  const node = ref(null);
  
  onMounted(() => {
    if (node.value) {
      node.value.querySelector('.node-content').style.backgroundColor = props.data.contentBgColor;
    }
  });
  </script>
  
  <style>
  .task-icon {
    margin-right: 4px;
  }
  </style>