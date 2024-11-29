<template>
  <div class="toolbar-menu">
    <div class="toolbar-item" 
         draggable="true"
         @dragstart.passive="startDrag"
         @drag.passive="onDrag"
         @dragend.passive="stopDrag"
         title="Drag process node"
         aria-label="Drag process node">
      <span class="process-icon">⚙️</span>
      <span class="process-label">Process</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['add-node']);

const startDrag = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', 'process');
    event.dataTransfer.setData('node-type', 'process');
    event.dataTransfer.effectAllowed = 'move';
    
    const dragImage = document.createElement('div');
    dragImage.innerHTML = '⚙️';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    event.dataTransfer.setDragImage(dragImage, 0, 0);
    
    setTimeout(() => document.body.removeChild(dragImage), 0);
  }
};

const onDrag = (event: DragEvent) => {
  console.log('Dragging process node...');
};

const stopDrag = (event: DragEvent) => {
  console.log('Process node drag ended');
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