<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow } from '@vue-flow/core';
import WorkflowBackground from './workflow/WorkflowBackground.vue';
import WorkflowControls from './workflow/WorkflowControls.vue';
import WorkflowNodes from './workflow/WorkflowNodes.vue';
import WorkflowToolbar from './workflow/WorkflowToolbar.vue';
import { useWorkflowStore } from '../composables/useWorkflowStore';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import '@vue-flow/minimap/dist/style.css';

const { nodeTypes, handleAddNode } = useWorkflowStore();
const nodes = ref([]); // Reactive state for nodes
</script>

<template>
  <div class="h-screen w-full">
    <VueFlow v-model:nodes="nodes">
      :node-types="nodeTypes" class="workflow-container" :default-zoom="1.5"
      :min-zoom="0.2" :max-zoom="4" >
      <WorkflowBackground />
      <WorkflowControls />
      <WorkflowNodes />
      <template #panel-top-left>
        <WorkflowToolbar @add-node="handleAddNode" />
      </template>
    </VueFlow>
  </div>
</template>

<style>
.workflow-container {
  width: 100%;
  height: 100%;
}

:root {
  --vf-node-bg: #fff;
  --vf-node-text: #222;
  --vf-connection-path: #b1b1b7;
  --vf-handle: #555;
}
</style>
