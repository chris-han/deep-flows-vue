<script setup lang="ts">
defineEmits<{
  (e: 'add-node'): void
}>()
</script>

<template>
  <div class="bg-white p-4 rounded shadow-lg">
    <h3 class="text-lg font-bold mb-2">Workflow Editor</h3>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      @click="$emit('add-node')"
    >
      Add Node
    </button>
  </div>
</template>