<template>
  <div class="h-screen w-full relative" 
       @drop="handleDrop" 
       @dragover="handleDragOver"
       @dragenter="handleDragEnter"
       @keydown="handleKeyDown"> 
    <div class="absolute top-0 left-0 z-10">
      <ToolbarMenu @add-node="handleAddNode" />
    </div>
    <VueFlow 
      :id="'vue-flow-instance'"  
      v-model:nodes="nodes"  
      v-model:edges="edges" 
      :node-types="nodeTypes"
      class="workflow-container"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"      
      @connect="onConnect"
      @nodeContextMenu="onNodeContextMenu"
      @edgeContextMenu="onEdgeContextMenu"
      @nodeMouseEnter.passive
      @nodeMouseMove.passive
      @nodeMouseLeave.passive
      @paneScroll.passive
      @paneDrag.passive 
    >
      <WorkflowBackground />
      <WorkflowControls />
      <WorkflowNodes />
      <div v-if="showContextMenu" 
           :style="contextMenuStyle" 
           class="context-menu">
        <div class="menu-item" @click="handleDelete">
          Delete
        </div>
        <div class="menu-item color-menu">
          Change color to
          <div class="color-options">
            <div v-for="color in colors" 
                :key="color"
                class="color-option"
                :style="{ backgroundColor: color }"
                @click="handleColorChange(color)">
            </div>
          </div>
        </div>
      </div>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { VueFlow, Node, Edge, NodeMouseEvent, EdgeMouseEvent } from '@vue-flow/core'; 
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

const { 
  nodeTypes, 
  handleAddNode, 
  handleConnect, 
  nodes, 
  edges,
  removeNode,
  removeEdge,
  updateNodeProperty
} = useWorkflowStore();

// Context menu state
const showContextMenu = ref(false);
const contextMenuStyle = ref({});
const selectedElement = ref<{ id: string, type: 'node' | 'edge' } | null>(null);
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];



const handleColorChange = (color: string) => {
  if (selectedElement.value) {
    if (selectedElement.value.type === 'node') {
      const nodeId = selectedElement.value.id;
      
      updateNodeProperty(nodeId, { contentBgColor: color });
    } else if (selectedElement.value.type === 'edge') {
      const edgeIndex = edges.value.findIndex(e => e.id === selectedElement.value.id);
      if (edgeIndex !== -1) {
        edges.value = edges.value.map((edge, index) => 
          index === edgeIndex 
            ? { ...edge, style: { ...edge.style, stroke: color } }
            : edge
        );
      }
    }
  }
  showContextMenu.value = false;
  selectedElement.value = null;
};

// Handle keyboard delete
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Delete' && selectedElement.value) {
    if (selectedElement.value.type === 'node') {
      removeNode(selectedElement.value.id);
    } else {
      removeEdge(selectedElement.value.id);
    }
    selectedElement.value = null;
  }
};

// Context menu handlers
const onNodeContextMenu = (event: { event: MouseEvent, node: Node }) => {
  event.event.preventDefault();
  showContextMenu.value = true;
  selectedElement.value = { id: event.node.id, type: 'node' };
  contextMenuStyle.value = {
    position: 'absolute',
    top: `${event.event.clientY}px`,
    left: `${event.event.clientX}px`,
  };
};

const onEdgeContextMenu = (event: { event: MouseEvent, edge: Edge }) => {
  event.event.preventDefault();
  showContextMenu.value = true;
  selectedElement.value = { id: event.edge.id, type: 'edge' };
  contextMenuStyle.value = {
    position: 'absolute',
    top: `${event.event.clientY}px`,
    left: `${event.event.clientX}px`,
  };
};
const handleDelete = () => {
  if (selectedElement.value) {
    if (selectedElement.value.type === 'node') {
      removeNode(selectedElement.value.id);
    } else {
      removeEdge(selectedElement.value.id);
    }
  }
  showContextMenu.value = false;
  selectedElement.value = null;
};

// Close context menu when clicking outside
const closeContextMenu = () => {
  showContextMenu.value = false;
  selectedElement.value = null;
};

onMounted(() => {
  document.addEventListener('click', closeContextMenu);
});

onUnmounted(() => {
  document.removeEventListener('click', closeContextMenu);
});

const onConnect = (params: Edge) => {
  handleConnect(params); 
};

// Add a deep watcher for nodes if necessary
watch(nodes, (newValue) => {
  // Any necessary logic on nodes change
}, { deep: true });


const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const nodeType = event.dataTransfer?.getData('node-type');
  
  if (nodeType === 'process') {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    };
    handleAddNode('process', position, { label: 'process content...' });
  }
};

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
<style scoped>
.context-menu {
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 1000;
  min-width: 150px;
}
.color-menu {
  position: relative;
}
.color-options {
  display: none;
  position: absolute;
  left: 100%;
  top: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
.color-menu:hover .color-options {
  display: flex;
  gap: 8px;
}

.color-option {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #ddd;
}

.color-option:hover {
  transform: scale(1.1);
}

.menu-item {
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
}

.menu-item:hover {
  background-color: #f5f5f5;
}
</style>