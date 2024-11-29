<script setup lang="ts">
import { useVueFlow } from '@vue-flow/core'
import { onMounted } from 'vue'
import { initialNodes, initialEdges } from '../../data/initialData'

const { setNodes, setEdges } = useVueFlow()

onMounted(() => {
  setNodes(initialNodes)
  setEdges(initialEdges)
})
</script>

<template>
  <!-- Vue Flow will automatically render nodes and edges -->
</template>