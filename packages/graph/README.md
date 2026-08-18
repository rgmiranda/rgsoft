# Graph

A flexible, generic graph data structure library with support for directed and undirected weighted graphs, plus common graph traversal and shortest-path algorithms.

## Installation

```sh
npm install @rgsoft/graph
```

## Documentation

- [Main Documentation](../../docs/graph/index.md) — Overview and quick start guide
- [API Reference](../../docs/graph/api.md) — Complete Graph class API with all methods
- [Algorithms](../../docs/graph/algorithms.md) — Traversal algorithms (BFS, DFS) and shortest path (Dijkstra)

## Quick Start

```typescript
import { Graph } from '@rgsoft/graph';

// Create an undirected graph
const graph = new Graph<string>();

// Add weighted edges
graph.addEdge('A', 'B', 1);
graph.addEdge('B', 'C', 2);
graph.addEdge('A', 'C', 4);

// Check connectivity
console.log(graph.hasEdge('A', 'B'));  // true

// Traverse the graph
graph.bfs('A', (node) => console.log(node));

// Find shortest paths
const distances = graph.dijkstra('A');
console.log(distances.get('C'));  // 3
```

## Features

- **Generic Type Support** — Works with any node type
- **Directed & Undirected** — Create either graph type
- **Weighted Edges** — Assign numeric weights to edges
- **Traversal Algorithms** — BFS and DFS for graph exploration
- **Shortest Path** — Dijkstra's algorithm for finding shortest paths
- **Edge Management** — Add, remove, and query edges and nodes

## Development

```sh
npm run build    # Build the package
npm run test     # Run tests
npm run coverage # Generate coverage report
```
