# Graph API Reference

Complete reference for the `Graph<T>` class and its methods.

## Class Overview

```typescript
export class Graph<T> {
  constructor(directed?: boolean);
  
  // Node management
  addNode(node: T): void;
  getNodes(): T[];
  
  // Edge management
  addEdge(from: T, to: T, weight?: number): void;
  removeEdge(from: T, to: T): void;
  getNeighbors(node: T): Map<T, number>;
  hasEdge(from: T, to: T): boolean;
  getWeight(from: T, to: T): number | undefined;
  getEdges(): Array<[T, T, number]>;
  
  // Traversal algorithms
  bfs(start: T, visit: (node: T) => void): void;
  dfs(start: T, visit: (node: T) => void): void;
  
  // Shortest path algorithm
  dijkstra(start: T): Map<T, number>;
  
  // Properties
  readonly directed: boolean;
}
```

## Constructor

### `constructor(directed?: boolean)`

Creates a new graph instance.

**Parameters:**
- `directed` (boolean, optional) — If `true`, creates a directed graph. If `false` or omitted, creates an undirected graph. Default: `false`

**Example:**
```typescript
const undirectedGraph = new Graph<string>();
const directedGraph = new Graph<string>(true);
```

## Node Management

### `addNode(node: T): void`

Adds a node to the graph. If the node already exists, this method has no effect.

**Parameters:**
- `node` (T) — The node to add

**Example:**
```typescript
const graph = new Graph<string>();
graph.addNode('A');
graph.addNode('B');
```

### `getNodes(): T[]`

Returns an array of all nodes in the graph.

**Returns:** `T[]` — Array of all nodes

**Example:**
```typescript
const graph = new Graph<string>();
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');

console.log(graph.getNodes());  // ['A', 'B', 'C']
```

## Edge Management

### `addEdge(from: T, to: T, weight?: number): void`

Adds a weighted edge from one node to another. Automatically creates nodes if they don't exist.

**Parameters:**
- `from` (T) — The source node
- `to` (T) — The destination node
- `weight` (number, optional) — The edge weight. Default: `1`

**Behavior:**
- For undirected graphs: Creates a bidirectional edge
- For directed graphs: Creates a unidirectional edge from `from` to `to`
- Overwrites existing edge weight if edge already exists

**Example:**
```typescript
const graph = new Graph<string>();

// Add edge with default weight (1)
graph.addEdge('A', 'B');

// Add edge with custom weight
graph.addEdge('B', 'C', 5);

// For undirected graph, both directions are set
graph.addEdge('A', 'B', 2);
console.log(graph.hasEdge('A', 'B'));  // true
console.log(graph.hasEdge('B', 'A'));  // true (automatic)
```

### `removeEdge(from: T, to: T): void`

Removes an edge from the graph.

**Parameters:**
- `from` (T) — The source node
- `to` (T) — The destination node

**Behavior:**
- For undirected graphs: Removes the edge in both directions
- For directed graphs: Removes only the directed edge

**Example:**
```typescript
const graph = new Graph<string>();
graph.addEdge('A', 'B', 5);
graph.removeEdge('A', 'B');
console.log(graph.hasEdge('A', 'B'));  // false
```

### `hasEdge(from: T, to: T): boolean`

Checks if an edge exists between two nodes.

**Parameters:**
- `from` (T) — The source node
- `to` (T) — The destination node

**Returns:** `boolean` — `true` if edge exists, `false` otherwise

**Example:**
```typescript
const graph = new Graph<string>();
graph.addEdge('A', 'B');

console.log(graph.hasEdge('A', 'B'));  // true
console.log(graph.hasEdge('A', 'C'));  // false
```

### `getWeight(from: T, to: T): number | undefined`

Returns the weight of an edge between two nodes.

**Parameters:**
- `from` (T) — The source node
- `to` (T) — The destination node

**Returns:** `number | undefined` — The edge weight, or `undefined` if edge doesn't exist

**Example:**
```typescript
const graph = new Graph<string>();
graph.addEdge('A', 'B', 10);

console.log(graph.getWeight('A', 'B'));  // 10
console.log(graph.getWeight('A', 'C'));  // undefined
```

### `getNeighbors(node: T): Map<T, number>`

Returns all neighbors of a node with their edge weights.

**Parameters:**
- `node` (T) — The node to query

**Returns:** `Map<T, number>` — Map where keys are neighboring nodes and values are edge weights. Empty map if node has no neighbors.

**Example:**
```typescript
const graph = new Graph<string>();
graph.addEdge('A', 'B', 5);
graph.addEdge('A', 'C', 3);

const neighbors = graph.getNeighbors('A');
console.log(neighbors);  // Map { 'B' => 5, 'C' => 3 }

for (const [neighbor, weight] of neighbors) {
  console.log(`${neighbor}: ${weight}`);
}
```

### `getEdges(): Array<[T, T, number]>`

Returns all edges in the graph as an array of tuples.

**Returns:** `Array<[T, T, number]>` — Array of `[from, to, weight]` tuples

**Behavior:**
- For undirected graphs: Each edge appears only once (using node comparison to avoid duplicates)
- For directed graphs: Each directed edge appears once

**Example:**
```typescript
const graph = new Graph<string>();
graph.addEdge('A', 'B', 5);
graph.addEdge('B', 'C', 3);

const edges = graph.getEdges();
console.log(edges);  // [['A', 'B', 5], ['B', 'C', 3]]

for (const [from, to, weight] of edges) {
  console.log(`${from} -> ${to} (weight: ${weight})`);
}
```

## Traversal Algorithms

### `bfs(start: T, visit: (node: T) => void): void`

Performs breadth-first search starting from a given node. Explores all neighbors at the current depth before moving to the next depth level.

**Parameters:**
- `start` (T) — The starting node
- `visit` ((node: T) => void) — Callback function called once for each visited node

**Behavior:**
- Uses a queue to explore nodes level by level
- Only visits reachable nodes from the starting node
- Each node is visited exactly once

**Example:**
```typescript
const graph = new Graph<string>();
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');

const visited: string[] = [];
graph.bfs('A', (node) => {
  visited.push(node);
  console.log('Visiting:', node);
});

console.log(visited);  // ['A', 'B', 'C', 'D']
```

**Use Cases:**
- Level-order traversal
- Finding shortest path (unweighted)
- Finding all reachable nodes
- Connectivity analysis

### `dfs(start: T, visit: (node: T) => void): void`

Performs depth-first search starting from a given node. Explores as deep as possible before backtracking.

**Parameters:**
- `start` (T) — The starting node
- `visit` ((node: T) => void) — Callback function called once for each visited node

**Behavior:**
- Uses recursion to explore nodes
- Explores one branch completely before moving to the next
- Each node is visited exactly once

**Example:**
```typescript
const graph = new Graph<string>();
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');

const visited: string[] = [];
graph.dfs('A', (node) => {
  visited.push(node);
  console.log('Visiting:', node);
});

console.log(visited);  // ['A', 'B', 'D', 'C', 'E'] or similar DFS order
```

**Use Cases:**
- Detecting cycles
- Topological sorting
- Finding connected components
- Solving mazes

## Shortest Path Algorithms

### `dijkstra(start: T): Map<T, number>`

Computes shortest paths from a starting node to all other nodes using Dijkstra's algorithm.

**Parameters:**
- `start` (T) — The starting node

**Returns:** `Map<T, number>` — Map where keys are nodes and values are shortest distances from start. Unreachable nodes have distance `Infinity`.

**Requirements:**
- All edge weights must be non-negative
- Works with both directed and undirected graphs

**Behavior:**
- Returns distances to all nodes reachable from the start node
- Unreachable nodes have distance `Infinity`
- Complexity: O(V²) where V is the number of vertices

**Example:**
```typescript
const graph = new Graph<string>();
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'C', 1);
graph.addEdge('B', 'D', 5);
graph.addEdge('C', 'D', 8);
graph.addEdge('C', 'E', 10);
graph.addEdge('D', 'E', 2);

const distances = graph.dijkstra('A');

console.log(distances.get('A'));  // 0
console.log(distances.get('B'));  // 3 (via C)
console.log(distances.get('C'));  // 2
console.log(distances.get('D'));  // 8 (via C, B)
console.log(distances.get('E'));  // 10 (via C, B, D)
```

## Properties

### `readonly directed: boolean`

Indicates whether the graph is directed or undirected.

**Example:**
```typescript
const undirectedGraph = new Graph<string>();
console.log(undirectedGraph.directed);  // false

const directedGraph = new Graph<string>(true);
console.log(directedGraph.directed);    // true
```

## Complete Example

```typescript
import { Graph } from '@rgsoft/graph';

// Create a weighted, undirected graph representing cities and distances
const cityGraph = new Graph<string>();

// Add edges representing roads between cities
cityGraph.addEdge('NewYork', 'Boston', 215);
cityGraph.addEdge('NewYork', 'Philadelphia', 95);
cityGraph.addEdge('Philadelphia', 'Washington', 140);
cityGraph.addEdge('Boston', 'Washington', 440);

// Find shortest paths from New York
const distances = cityGraph.dijkstra('NewYork');

console.log('Distance to Boston:', distances.get('Boston'));           // 215
console.log('Distance to Philadelphia:', distances.get('Philadelphia')); // 95
console.log('Distance to Washington:', distances.get('Washington'));   // 235 (via Philly)

// Explore reachable cities using BFS
console.log('Reachable cities:');
cityGraph.bfs('NewYork', (city) => {
  console.log(`  - ${city} (distance: ${distances.get(city)})`);
});
```
