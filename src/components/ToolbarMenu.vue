<template>
  <div class="toolbar-menu">
    <div class="toolbar-item" 
         draggable="true"
         node-type="process"
         @dragstart.passive="startDrag"
         @drag.passive="onDrag"
         @dragend.passive="stopDrag"
         title="Drag process node"
         aria-label="Drag process node">
      <span class="process-icon">⚙️</span>
      <span class="process-label">Process</span>
    </div>
    <div class="toolbar-item" 
         draggable="true"
         node-type="prefect_task"
         @dragstart.passive="startDrag"
         @drag.passive="onDrag"
         @dragend.passive="stopDrag"
         title="Drag task node"
         aria-label="Drag task node">
      <span class="process-icon">🛠️</span>
      <span class="process-label">Task</span>
    </div>
    <div class="toolbar-item" 
         draggable="true"
         node-type="prefect_flow"
         @dragstart.passive="startDrag"
         @drag.passive="onDrag"
         @dragend.passive="stopDrag"
         title="Drag flow node"
         aria-label="Drag flow node">
      <span class="process-icon">🌊</span>
      <span class="process-label">Flow</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['add-node']);

const startDrag = (event: DragEvent) => {
  if (event.dataTransfer) {
    const nodeType = event.currentTarget.getAttribute('node-type'); // Get node type from attribute
    event.dataTransfer.setData('text/plain', nodeType);
    event.dataTransfer.setData('node-type', nodeType);
    event.dataTransfer.effectAllowed = 'move';

    const dragImage = document.createElement('div');
    dragImage.innerHTML = event.currentTarget.querySelector('.process-icon')?.innerHTML || '';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    event.dataTransfer.setDragImage(dragImage, 0, 0);

    setTimeout(() => document.body.removeChild(dragImage), 0);
  }
};

const onDrag = (event: DragEvent) => {
  const nodeType = event.dataTransfer?.getData('node-type');
  // const nodeType = event.currentTarget.getAttribute('node-type'); // Get node type from attribute
  console.log(`Dragging ${nodeType} node`);
};

const stopDrag = (event: DragEvent) => {
  const nodeType = event.currentTarget.getAttribute('node-type'); // Get node type from attribute
  console.log(`${nodeType} Node drag ended`);
};
</script>


<style scoped>
.toolbar-menu {
  background: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
}

.toolbar-item {
  cursor: grab;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  gap: 4px;
  width: 100%;
}

.toolbar-item:active {
  cursor: grabbing;
}

.process-icon {
  font-size: 24px;
}

.process-label {
  font-size: 12px;
  color: #666;
}
</style>