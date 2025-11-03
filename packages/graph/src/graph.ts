export class Graph<T> {
  private readonly map: Map<T, Map<T, number>> = new Map();

  constructor(public readonly directed = false) {}

  addNode(node: T): void {
    if (!this.map.has(node)) {
      this.map.set(node, new Map());
    }
  }

  addEdge(from: T, to: T, weight = 1): void {
    this.addNode(from);
    this.addNode(to);

    this.map.get(from)!.set(to, weight);

    if (!this.directed) {
      this.map.get(to)!.set(from, weight);
    }
  }

  removeEdge(from: T, to: T): void {
    this.map.get(from)?.delete(to);
    if (!this.directed) {
      this.map.get(to)?.delete(from);
    }
  }

  getNeighbors(node: T): Map<T, number> {
    return this.map.get(node) ?? new Map();
  }

  getWeight(from: T, to: T): number | undefined {
    return this.map.get(from)?.get(to);
  }

  hasEdge(from: T, to: T): boolean {
    return this.map.get(from)?.has(to) ?? false;
  }

  getNodes(): T[] {
    return Array.from(this.map.keys());
  }

  getEdges(): Array<[T, T, number]> {
    const edges: Array<[T, T, number]> = [];
    for (const [from, neighbors] of this.map) {
      for (const [to, weight] of neighbors) {
        if (this.directed || from <= to) {
          edges.push([from, to, weight]);
        }
      }
    }
    return edges;
  }

  /**
   * Breadth-First Search (BFS)
   * Explores all neighbors level by level.
   */
  bfs(start: T, visit: (node: T) => void): void {
    const visited = new Set<T>();
    const queue: T[] = [start];

    while (queue.length > 0) {
      const node = queue.shift()!;
      if (visited.has(node)) continue;

      visit(node);
      visited.add(node);

      for (const neighbor of this.getNeighbors(node).keys()) {
        if (!visited.has(neighbor)) queue.push(neighbor);
      }
    }
  }

  /**
   * Depth-First Search (DFS)
   * Explores as deep as possible before backtracking.
   */
  dfs(start: T, visit: (node: T) => void): void {
    const visited = new Set<T>();

    const traverse = (node: T) => {
      if (visited.has(node)) return;
      visit(node);
      visited.add(node);
      for (const neighbor of this.getNeighbors(node).keys()) {
        traverse(neighbor);
      }
    };

    traverse(start);
  }

  /**
   * Dijkstra’s Algorithm
   * Computes shortest paths from a given start node.
   */
  dijkstra(start: T): Map<T, number> {
    const distances = new Map<T, number>();
    const visited = new Set<T>();

    // Inicializar todas las distancias con infinito
    for (const node of this.getNodes()) {
      distances.set(node, Infinity);
    }
    distances.set(start, 0);

    while (visited.size < this.map.size) {
      // Tomar el nodo no visitado más cercano
      let current: T | null = null;
      let minDistance = Infinity;

      for (const [node, distance] of distances.entries()) {
        if (!visited.has(node) && distance < minDistance) {
          current = node;
          minDistance = distance;
        }
      }

      if (current === null) break;
      visited.add(current);

      for (const [neighbor, weight] of this.getNeighbors(current)) {
        const newDist = distances.get(current)! + weight;
        if (newDist < distances.get(neighbor)!) {
          distances.set(neighbor, newDist);
        }
      }
    }

    return distances;
  }
}
