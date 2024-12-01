// src/composables/useWorkflowStore.ts
import CustomNode from '../components/nodes/CustomNode.vue'
import ProcessNode from '../components/nodes/ProcessNode.vue'
import Prefect_FlowNode from '../components/nodes/Prefect_FlowNode.vue';
import Prefect_TaskNode from '../components/nodes/Prefect_TaskNode.vue';
import { shallowRef, markRaw } from 'vue';
import { Stack } from 'typescript-collections';
// const selectedObjectIdStack: Stack<number> = new Stack<number>();


interface Node {
  id: string;
  type: string;//this is required by VueFlow, value has to be registered in nodeTypes
  position: { x: number, y: number };
  data: {     
    title: string
    content: string
    processType: string
    contentBgColor?: string
  };
  
}

interface Edge {
  id: string;
  type?: string;//can't use 'edge' directly, this is required by VueFlow
  source: string;
  target: string;
  color?: string;
}

interface SelectedOjbject {
  id: string;
  type: 'node' | 'edge';
}


export const useWorkflowStore = () => {
  const nodes = shallowRef<Node[]>([]);
  const edges = shallowRef<Edge[]>([]);
  const selectedObjectStack:Stack<SelectedOjbject> = new Stack<SelectedOjbject>();

  const nodeTypes = {
    process: markRaw(ProcessNode),  // Add 'process' type
    custom: markRaw(CustomNode),
    default: markRaw(ProcessNode),
    prefect_flow: markRaw(Prefect_FlowNode),
    prefect_task: markRaw(Prefect_TaskNode)
  };

  const handleAddNode = (type: string, position?: { x: number; y: number }, data?: { title: string; content: string; processType: string }) => {
    const nodePosition = position || { x: 0, y: 0 };
    console.log('Drop event triggered', position, 'title:', data?.title, 'type:',type); // Use optional chainingconsole.log('Drop event triggered', position,'title:',data.title, 'type:', data.processType);

    const nodeId = `node,${crypto.randomUUID()}`;
    const newNode: Node = {
      id: nodeId,
      type: type, //this is required by VueFlow, value has to be registered in nodeTypes
      position: nodePosition,
      data: data || { title: '', content: '', processType: ''}
      // data: {
      //   type: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize first letter
      //   content: '',
      //   processType: type === 'process' ? 'transform' : undefined // Set default process type
      // }
    };
    nodes.value = [...nodes.value, newNode];
    selectedObjectStack.push({id: nodeId, type: 'node'}); //used tracking selected object for undo/redo functionality  
    return newNode;
  };

  const handleConnect = (params: Edge) => {
    console.log('Connecting:', params); // Log the parameters to inspect them
    // console.log('edge type:', params.type);
    const newEdge: Edge = {
      id: `edge-${params.source}-${params.target}`,
      type: params.type, //can't use 'edge' directly, this is required by VueFlow, can be optional
      source: params.source,
      target: params.target,      
      color: params.color,
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