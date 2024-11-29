<template>
  <div class="h-screen w-full" @drop.prevent="handleDrop" @dragover.prevent>
    <ToolbarMenu @add-node="handleAddNode" />
    <VueFlow 
      :id="'vue-flow-instance'"  
      v-model:nodes="nodes"   
      :node-types="nodeTypes"
      class="workflow-container"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
      @nodeDrop="onNodeDrop"
      @connect="onConnect"    
    >
      <WorkflowBackground />
      <WorkflowControls />
      <WorkflowNodes />
      <template #panel-top-left>
        <WorkflowToolbar @add-node="handleAddNode" />
      </template>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { VueFlow, Node, Edge } from '@vue-flow/core'; 
import WorkflowBackground from './workflow/WorkflowBackground.vue';
import WorkflowControls from './workflow/WorkflowControls.vue';
import WorkflowNodes from './workflow/WorkflowNodes.vue';
import WorkflowToolbar from './workflow/WorkflowToolbar.vue';
import ToolbarMenu from './ToolbarMenu.vue'; 
import { useWorkflowStore } from '../composables/useWorkflowStore';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import '@vue-flow/minimap/dist/style.css';

const { nodeTypes, handleAddNode, handleConnect, nodes } = useWorkflowStore();

const onNodeDrop = (event: DragEvent) => {
  const type = event.dataTransfer?.getData('node-type'); 
  if (type) handleAddNode(type);
};

const onConnect = (params: Edge) => {
  handleConnect(params); 
};

// Add a deep watcher for nodes if necessary
watch(nodes, (newValue) => {
  // Any necessary logic on nodes change
}, { deep: true });

</script>

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