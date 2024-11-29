// src/composables/useWorkflowStore.ts

import { ref } from 'vue';

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
  const nodes = ref<Node[]>([]);
  const edges = ref<Edge[]>([]);

  const handleAddNode = (type = 'default') => {
    const newNode: Node = {
      id: `node-${nodeId++}`,
      type,
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node ${nodeId}` }
    };
    nodes.value.push(newNode);
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
    nodeTypes: { default: true }, // Dummy node type for example purposes; adjust as needed
  };
};