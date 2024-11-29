import type { Node, Edge } from '@vue-flow/core'

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    label: 'Input Node',
    position: { x: 100, y: 100 },
    data: { type: 'input', content: 'extract from sql' }
  },
  {
    id: '2',
    type: 'custom',
    label: 'Process Node',
    position: { x: 400, y: 100 },
    data: { type: 'process', content: 'transform the data' }
  }
]

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' }
]