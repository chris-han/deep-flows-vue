// src/composables/useWorkflowStore.ts
import CustomNode from '../components/nodes/CustomNode.vue'
import ProcessNode from '../components/nodes/ProcessNode.vue'
import { shallowRef, markRaw } from 'vue';

interface Node {
  id: string;
  type: string;
  position: { x: number, y: number };
  data: { type: string
    content: string};
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
    process: markRaw(ProcessNode),  // Add 'process' type
    custom: markRaw(CustomNode),
    default: markRaw(CustomNode)
  };

  const handleAddNode = (type: string, position?: { x: number; y: number }) => {
    const nodePosition = position || { x: 0, y: 0 };
    console.log('Drop event triggered', position, 'type:', type);
    
    const newNode = {
      id: `node-${nodeId++}`,
      type: type,
      position: nodePosition,
      data: { 
        type: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize first letter
        content: '',
        processType: type === 'process' ? 'transform' : undefined // Set default process type
      }
    };
    nodes.value = [...nodes.value, newNode];
  };

  const handleConnect = (params: Edge) => {
    const newEdge: Edge = {
      id: `edge-${params.source}-${params.target}`,
      source: params.source,
      target: params.target,
      type: params.type,
    };
    edges.value = [...edges.value, newEdge];
  };

  return {
    nodes,
    edges,
    handleAddNode,
    handleConnect,
    nodeTypes, // Dummy node type for example purposes; adjust as needed
  };
};