<template>
  <div class="h-screen w-full">
    <VueFlow
      :id="'vue-flow-instance'"  <!-- Use the id parameter -->
      :node-types="nodeTypes"
      class="workflow-container"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
    >
      <WorkflowBackground />
      <WorkflowControls />
      <WorkflowNodes />
      <Panel position="top-left" class="workflow-panel">
        <WorkflowToolbar @add-node="handleAddNode" />
      </Panel>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { VueFlow, Panel } from '@vue-flow/core';
import WorkflowBackground from './WorkflowBackground.vue';
import WorkflowControls from './WorkflowControls.vue';
import WorkflowNodes from './WorkflowNodes.vue';
import WorkflowToolbar from './WorkflowToolbar.vue';
import { useWorkflowStore } from '../../composables/useWorkflowStore';

const { nodeTypes, handleAddNode } = useWorkflowStore();
</script>

<style>
.workflow-container {
  width: 100%;
  height: 100%;
}

.workflow-panel {
  z-index: 5;
}

:root {
  --vf-node-bg: #fff;
  --vf-node-text: #222;
  --vf-connection-path: #b1b1b7;
  --vf-handle: #555;
}
</style>