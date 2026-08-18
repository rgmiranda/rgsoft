# Graph Library

The graph library provides a flexible, generic graph data structure for representing and manipulating directed and undirected graphs. It includes support for weighted edges and common graph algorithms including breadth-first search, depth-first search, and Dijkstra's shortest path algorithm.

This package is useful for network analysis, route planning, dependency resolution, social network algorithms, and any application requiring graph-based data structures and algorithms.

## Contents

- [API Reference](api.md) — Complete Graph class API with all methods and properties
- [Algorithms](algorithms.md) — Traversal and pathfinding algorithms (BFS, DFS, Dijkstra)

## Quick Start

```typescript
import { Graph } from '@rgsoft/graph';

// Create an undirected graph
const graph = new Graph<string>();

// Add nodes and edges
graph.addNode('A');
graph.addNode('B');
graph.addEdge('A', 'B', 1);  // edge from A to B with weight 1

// Add more edges
graph.addEdge('B', 'C', 2);
graph.addEdge('A', 'C', 4);

// Check connectivity
console.log(graph.hasEdge('A', 'B'));  // true
console.log(graph.getWeight('A', 'B')); // 1

// Get all nodes
console.log(graph.getNodes());  // ['A', 'B', 'C']

// Traverse the graph
graph.bfs('A', (node) => {
  console.log('Visited:', node);
});

// Find shortest paths
const distances = graph.dijkstra('A');
console.log(distances.get('C'));  // 3 (shortest path A->B->C)
```

## Creating Graphs

### Undirected Graph (Default)

```typescript
const graph = new Graph<string>();
// or explicitly
const graph = new Graph<string>(false);

// Edges are bidirectional
graph.addEdge('A', 'B', 5);
console.log(graph.hasEdge('A', 'B'));  // true
console.log(graph.hasEdge('B', 'A'));  // true (automatic)
```

### Directed Graph

```typescript
const directedGraph = new Graph<string>(true);

// Edges are unidirectional
directedGraph.addEdge('A', 'B', 5);
console.log(directedGraph.hasEdge('A', 'B'));  // true
console.log(directedGraph.hasEdge('B', 'A'));  // false
```

## Generic Type Parameter

The `Graph<T>` class is generic and works with any comparable type:

```typescript
// Graph with string nodes
const stringGraph = new Graph<string>();

// Graph with number nodes
const numberGraph = new Graph<number>();
numberGraph.addEdge(1, 2, 10);
numberGraph.addEdge(2, 3, 5);

// Graph with custom object nodes (if they're comparable)
interface Node {
  id: string;
  name: string;
}

// Note: Custom objects should be compared carefully in your code
```

## Key Features

- **Flexible Node Types** — Use any type for nodes (strings, numbers, objects)
- **Weighted Edges** — Assign numeric weights to edges (default weight is 1)
- **Directed & Undirected** — Support for both graph types
- **Traversal Algorithms** — BFS and DFS for graph exploration
- **Shortest Path** — Dijkstra's algorithm for finding shortest paths
- **Edge Management** — Add, remove, and query edges and nodes
- **Neighbor Discovery** — Efficient neighbor lookup for graph algorithms

## Use Cases

- **Route Planning** — Find shortest paths between locations
- **Network Analysis** — Analyze connectivity and distances in networks
- **Dependency Resolution** — Represent and traverse dependency graphs
- **Social Networks** — Model and analyze social connections
- **Game Development** — Represent game worlds, state machines, or decision trees
- **Recommendation Systems** — Build graph-based recommendations
