// src/composables/useWorkflowStore.ts
import CustomNode from '../components/nodes/CustomNode.vue'
import ProcessNode from '../components/nodes/ProcessNode.vue'
import { shallowRef, markRaw } from 'vue';
import { Stack } from 'typescript-collections';
// const selectedObjectIdStack: Stack<number> = new Stack<number>();


interface Node {
  id: string;
  type: string;
  position: { x: number, y: number };
  data: { type: string
    content: string
    contentBgColor: string
  };
  
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  color?: string;
}

interface SelectedOjbject {
  id: string;
  type: string; //'node' | 'edge'
}


export const useWorkflowStore = () => {
  const nodes = shallowRef<Node[]>([]);
  const edges = shallowRef<Edge[]>([]);
  const selectedObjectStack:Stack<SelectedOjbject> = new Stack<SelectedOjbject>();

  const nodeTypes = {
    process: markRaw(ProcessNode),  // Add 'process' type
    custom: markRaw(CustomNode),
    default: markRaw(CustomNode)
  };

  const handleAddNode = (type: string, position?: { x: number; y: number }) => {
    const nodePosition = position || { x: 0, y: 0 };
    console.log('Drop event triggered', position, 'type:', type);

    const nodeId = `node,${crypto.randomUUID()}`;
    const newNode = {
      id: nodeId,
      type: type,
      position: nodePosition,
      data: {
        type: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize first letter
        content: '',
        processType: type === 'process' ? 'transform' : undefined // Set default process type
      }
    };
    nodes.value = [...nodes.value, newNode];
    selectedObjectStack.push({id: nodeId, type: 'node'}); //used tracking selected object for undo/redo functionality  
    return newNode;
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

  const removeNode = (nodeId: string) => {
    nodes.value = nodes.value.filter(node => node.id !== nodeId);
    // Also remove connected edges
    edges.value = edges.value.filter(edge => 
      edge.source !== nodeId && edge.target !== nodeId
    );
  };
  
  const removeEdge = (edgeId: string) => {
    edges.value = edges.value.filter(edge => edge.id !== edgeId);
  };

  const updateNodeProperty = (nodeId: string, properties: Record<string, any>) => {
    console.log(properties)
    const nodeIndex = nodes.value.findIndex(node => node.id === nodeId);
    if (nodeIndex !== -1) {
      nodes.value = nodes.value.map((node, index) => 
        index === nodeIndex 
          ? { ...node, data: { ...node.data, ...properties } }
          : node
      );
    }
  };

  return {
    nodes,
    edges,
    selectedObjectStack,
    handleAddNode,
    handleConnect,
    nodeTypes, 
    removeNode,
    removeEdge,
    updateNodeProperty,
  };
};