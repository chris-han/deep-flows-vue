<template>
  <div class="toolbar-menu">
    <div class="toolbar-item" 
         @mousedown="startDrag('generic')"
         @mouseup="stopDrag"
         title="Drag generic node"
         aria-label="Drag generic node">
      <span>🟦</span>
    </div>
    <!-- Add more toolbar items here for different node types -->
  </div>
</template>

<script setup lang="ts">
// import { defineEmits } from 'vue';

const emit = defineEmits(['add-node']);

const startDrag = (type: string) => {
  document.addEventListener('dragend', stopDrag);
  const blob = new Blob([''], { type: 'text/plain' });
  const dataTransfer = new DataTransfer();
  dataTransfer.setData('node-type', type); // Set the node type in the dataTransfer
  const dragImage = document.createElement('span');
  dragImage.innerText = 'Dragging...'; // Optional: Customize this
  document.body.appendChild(dragImage);
  dataTransfer.setDragImage(dragImage, 0, 0);
  document.dispatchEvent(new DragEvent('dragstart', { dataTransfer }));
};

const stopDrag = () => {
  document.removeEventListener('dragend', stopDrag);
};
</script>

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
</style>