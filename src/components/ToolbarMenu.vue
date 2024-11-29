<template>
  <div class="toolbar-menu">
    <div class="toolbar-item" 
         draggable="true"
         @dragstart.passive="startDrag"
         @drag.passive="onDrag"
         @dragend.passive="stopDrag"
         title="Drag generic node"
         aria-label="Drag generic node">
      <span>🟦</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['add-node']);

const startDrag = (event: DragEvent) => {
  console.log('startDrag triggered'); // Debug log
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', 'generic'); // Using text/plain instead of custom type
    event.dataTransfer.setData('node-type', 'generic');
    event.dataTransfer.effectAllowed = 'move';
    
    // Create and set drag image
    const dragImage = document.createElement('div');
    dragImage.innerHTML = '🟦';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    event.dataTransfer.setDragImage(dragImage, 0, 0);
    
    // Clean up the temporary element after drag starts
    setTimeout(() => document.body.removeChild(dragImage), 0);
  }
  // emit('add-node', 'generic');
};

const onDrag = (event: DragEvent) => {
  console.log('Dragging...'); // Debug log
};

const stopDrag = (event: DragEvent) => {
  console.log('stopDrag triggered'); // Debug log
};
</script>
<!-- 
<style>
.toolbar-menu {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  border-right: 1px solid #ddd;
}

.toolbar-item {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.toolbar-item span {
  font-size: 24px;
}
</style> -->

<style scoped>
.toolbar-item {
  cursor: grab;
  user-select: none;
}

.toolbar-item:active {
  cursor: grabbing;
}
</style>