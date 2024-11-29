// src/composables/useWorkflowStore.ts
import CustomNode from '../components/nodes/CustomNode.vue'
import { shallowRef, markRaw } from 'vue';

interface Node {
  id: string;
  type: string;
  position: { x: number, y: number };
  data: { label: string };
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

let nodeId = 0;

export const useWorkflowStore = () => {
  const nodes = shallowRef<Node[]>([]);
  const edges = shallowRef<Edge[]>([]);

  const nodeTypes = {
    process: markRaw(CustomNode),  // Add 'process' type
    custom: markRaw(CustomNode),
    default: markRaw(CustomNode)
  };

  const handleAddNode = (type: string, position?: { x: number; y: number }) => {
    const nodePosition = position || { x: 0, y: 0 };
    console.log('Drop event triggered', position, 'type:', type); // Enhanced logging
    
    const newNode = {
      id: `node-${nodeId++}`,
      type: type,  // Make sure this matches one of the keys in nodeTypes
      position: nodePosition,
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` }
    };
    nodes.value = [...nodes.value, newNode]; // Use immutable update pattern
  };

  const handleConnect = (params: Edge) => {
    const newEdge: Edge = {
      id: `edge-${params.source}-${params.target}`,
      source: params.source,
      target: params.target,
      type: params.type,
    };
    edges.value.push(newEdge);
  };

  return {
    nodes,
    edges,
    handleAddNode,
    handleConnect,
    nodeTypes, // Dummy node type for example purposes; adjust as needed
  };
};