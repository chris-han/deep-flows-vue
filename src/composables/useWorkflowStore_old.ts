import { ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import type { Node, Edge } from '@vue-flow/core'
import CustomNode from '../components/nodes/CustomNode.vue'
import { initialNodes, initialEdges } from '../data/initialData'

export function useWorkflowStore() {
  const { nodes, edges, setNodes, setEdges, onConnect, addEdges } = useVueFlow({
    defaultNodes: initialNodes,
    defaultEdges: initialEdges,
  })

  const nodeTypes = {
    custom: CustomNode
  }

  const handleAddNode = () => {
    const id = `${nodes.value.length + 1}`
    const newNode = {
      id,
      type: 'custom',
      label: `Node ${id}`,
      position: { x: 100 + Math.random() * 100, y: 100 + Math.random() * 100 },
      data: { type: 'process', content: '' }
    }
    setNodes([...nodes.value, newNode])
  }

  // const handleAddNode = (type: string, position?: { x: number; y: number }) => {
  //   // Use provided position or default position if none provided
  //   const nodePosition = position || { x: 0, y: 0 };
  //   console.log('Drop event triggered',position);
  //   // Create node with the specified position
  //   const id = `${nodes.value.length + 1}`
  //   const newNode = {
  //     id,
  //     type: 'custom',
  //     position: nodePosition,
  //     data: { type: 'process', content: '' }
  //   };
  //   setNodes([...nodes.value, newNode])
  // };

  onConnect((params) => {
    addEdges([params])
  })

  return {
    nodes,
    edges,
    nodeTypes,
    handleAddNode
  }
}