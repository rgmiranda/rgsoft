# Graph Algorithms

Comprehensive guide to the graph algorithms included in the library.

## Breadth-First Search (BFS)

### Overview

Breadth-First Search explores a graph level by level, visiting all neighbors at distance k before visiting nodes at distance k+1.

### Method Signature

```typescript
bfs(start: T, visit: (node: T) => void): void
```

### How It Works

1. Start at a given node
2. Mark it as visited and call the visit callback
3. Add all unvisited neighbors to a queue
4. Dequeue a node and repeat until queue is empty

### Characteristics

- **Time Complexity:** O(V + E) where V is vertices and E is edges
- **Space Complexity:** O(V) for the visited set and queue
- **Use Cases:** Shortest path (unweighted), level-order traversal, connectivity

### Example

```typescript
const graph = new Graph<string>();
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');
graph.addEdge('D', 'F');

console.log('BFS traversal from A:');
graph.bfs('A', (node) => {
  console.log(node);  // A, B, C, D, E, F (level by level)
});
```

### Finding Shortest Path (Unweighted)

BFS can be used to find the shortest path in an unweighted graph:

```typescript
function bfsShortestPath(
  graph: Graph<string>,
  start: string,
  end: string
): string[] | null {
  const visited = new Set<string>();
  const queue: Array<[string, string[]]> = [[start, [start]]];
  visited.add(start);

  while (queue.length > 0) {
    const [node, path] = queue.shift()!;

    if (node === end) {
      return path;
    }

    for (const neighbor of graph.getNeighbors(node).keys()) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }

  return null;  // No path found
}

const path = bfsShortestPath(graph, 'A', 'F');
console.log(path);  // ['A', 'B', 'D', 'F'] or similar
```

## Depth-First Search (DFS)

### Overview

Depth-First Search explores as deep as possible along one path before backtracking. It fully explores one branch before moving to another.

### Method Signature

```typescript
dfs(start: T, visit: (node: T) => void): void
```

### How It Works

1. Start at a given node
2. Mark it as visited and call the visit callback
3. Recursively visit each unvisited neighbor
4. Backtrack when no unvisited neighbors remain

### Characteristics

- **Time Complexity:** O(V + E) where V is vertices and E is edges
- **Space Complexity:** O(V) for the visited set and recursion stack
- **Use Cases:** Cycle detection, topological sorting, connected components

### Example

```typescript
const graph = new Graph<string>();
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');

console.log('DFS traversal from A:');
graph.dfs('A', (node) => {
  console.log(node);  // A, B, D, C, E (depth first)
});
```

### Detecting Cycles

DFS can be used to detect cycles in directed graphs:

```typescript
function hasCycle(graph: Graph<string>): boolean {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function dfsVisit(node: string): boolean {
    visited.add(node);
    recursionStack.add(node);

    for (const neighbor of graph.getNeighbors(node).keys()) {
      if (!visited.has(neighbor)) {
        if (dfsVisit(neighbor)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true;  // Back edge found, cycle exists
      }
    }

    recursionStack.delete(node);
    return false;
  }

  for (const node of graph.getNodes()) {
    if (!visited.has(node)) {
      if (dfsVisit(node)) {
        return true;
      }
    }
  }

  return false;
}

const directedGraph = new Graph<string>(true);
directedGraph.addEdge('A', 'B');
directedGraph.addEdge('B', 'C');
directedGraph.addEdge('C', 'A');  // Creates cycle

console.log(hasCycle(directedGraph));  // true
```

### Finding Connected Components

DFS can be used to find connected components in an undirected graph:

```typescript
function findConnectedComponents(graph: Graph<string>): string[][] {
  const visited = new Set<string>();
  const components: string[][] = [];

  function dfsCollect(node: string, component: string[]): void {
    visited.add(node);
    component.push(node);

    for (const neighbor of graph.getNeighbors(node).keys()) {
      if (!visited.has(neighbor)) {
        dfsCollect(neighbor, component);
      }
    }
  }

  for (const node of graph.getNodes()) {
    if (!visited.has(node)) {
      const component: string[] = [];
      dfsCollect(node, component);
      components.push(component);
    }
  }

  return components;
}

const graph = new Graph<string>();
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.addEdge('D', 'E');
graph.addNode('F');  // Isolated node

console.log(findConnectedComponents(graph));
// [['A', 'B', 'C'], ['D', 'E'], ['F']]
```

## Dijkstra's Shortest Path Algorithm

### Overview

Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a weighted graph with non-negative edge weights.

### Method Signature

```typescript
dijkstra(start: T): Map<T, number>
```

### How It Works

1. Initialize distances: start node = 0, all others = Infinity
2. Mark all nodes as unvisited
3. Repeat until all nodes are visited:
   - Select unvisited node with minimum distance
   - For each neighbor, update distance if a shorter path is found
   - Mark selected node as visited

### Characteristics

- **Time Complexity:** O(V²) with this implementation, O((V + E) log V) with priority queue
- **Space Complexity:** O(V) for distance and visited tracking
- **Requirements:** All edge weights must be non-negative
- **Use Cases:** GPS navigation, network routing, game pathfinding

### Example

```typescript
const graph = new Graph<string>();

// Represents travel time between cities
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'C', 1);
graph.addEdge('B', 'D', 5);
graph.addEdge('C', 'D', 8);
graph.addEdge('C', 'E', 10);
graph.addEdge('D', 'E', 2);

const distances = graph.dijkstra('A');

console.log('Shortest distances from A:');
for (const [node, distance] of distances) {
  if (distance !== Infinity) {
    console.log(`  ${node}: ${distance}`);
  }
}
```

### Building a Shortest Path Tree

To find not just distances but also the actual shortest paths, extend the algorithm:

```typescript
function dijkstraWithPath(
  graph: Graph<string>,
  start: string
): Map<string, { distance: number; path: string[] }> {
  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const visited = new Set<string>();

  // Initialize
  for (const node of graph.getNodes()) {
    distances.set(node, Infinity);
    previous.set(node, null);
  }
  distances.set(start, 0);

  // Dijkstra
  while (visited.size < graph.getNodes().length) {
    let current: string | null = null;
    let minDistance = Infinity;

    for (const [node, distance] of distances) {
      if (!visited.has(node) && distance < minDistance) {
        current = node;
        minDistance = distance;
      }
    }

    if (current === null) break;
    visited.add(current);

    for (const [neighbor, weight] of graph.getNeighbors(current)) {
      const newDist = distances.get(current)! + weight;
      if (newDist < distances.get(neighbor)!) {
        distances.set(neighbor, newDist);
        previous.set(neighbor, current);
      }
    }
  }

  // Reconstruct paths
  const result = new Map<string, { distance: number; path: string[] }>();
  for (const node of graph.getNodes()) {
    const distance = distances.get(node)!;
    const path: string[] = [];

    let current: string | null = node;
    while (current !== null) {
      path.unshift(current);
      current = previous.get(current) ?? null;
    }

    if (distance !== Infinity) {
      result.set(node, { distance, path });
    }
  }

  return result;
}

const graph = new Graph<string>();
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'D', 5);
graph.addEdge('C', 'D', 8);
graph.addEdge('C', 'B', 1);

const paths = dijkstraWithPath(graph, 'A');

for (const [node, { distance, path }] of paths) {
  console.log(`${node}: ${path.join(' -> ')} (distance: ${distance})`);
}
// Output:
// A: A (distance: 0)
// B: A -> C -> B (distance: 3)
// C: A -> C (distance: 2)
// D: A -> C -> B -> D (distance: 8)
```

## Algorithm Comparison

| Algorithm | Time Complexity | Use Case | Requirements |
|-----------|-----------------|----------|--------------|
| BFS | O(V + E) | Unweighted shortest path, level-order | Unweighted graph |
| DFS | O(V + E) | Cycle detection, components | Any graph |
| Dijkstra | O(V²) or O((V+E)log V) | Weighted shortest path | Non-negative weights |

## Common Patterns

### Check if Graph is Connected

```typescript
function isConnected(graph: Graph<string>): boolean {
  const nodes = graph.getNodes();
  if (nodes.length === 0) return true;

  const visited = new Set<string>();
  graph.bfs(nodes[0], (node) => visited.add(node));

  return visited.size === nodes.length;
}
```

### Find All Nodes at Distance K

```typescript
function nodesAtDistance(
  graph: Graph<string>,
  start: string,
  distance: number
): string[] {
  const result: string[] = [];
  const visited = new Set<string>();
  const queue: Array<[string, number]> = [[start, 0]];
  visited.add(start);

  while (queue.length > 0) {
    const [node, dist] = queue.shift()!;

    if (dist === distance) {
      result.push(node);
    }

    if (dist < distance) {
      for (const neighbor of graph.getNeighbors(node).keys()) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, dist + 1]);
        }
      }
    }
  }

  return result;
}
```
