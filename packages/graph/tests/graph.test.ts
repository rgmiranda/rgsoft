import { describe, expect, it, vi } from 'vitest';
import { Graph } from '../src'

describe(Graph.name, () => {

  it('adds non-directional edges', () => {
    const g = new Graph<string>();

    g.addEdge('A', 'B', 1);
    g.addEdge('A', 'C', 2);
    expect(g.hasEdge('A', 'B')).toBeTruthy();
    expect(g.hasEdge('B', 'A')).toBeTruthy();
    expect(g.hasEdge('A', 'C')).toBeTruthy();
    expect(g.hasEdge('C', 'A')).toBeTruthy();
    expect(g.hasEdge('C', 'B')).toBeFalsy();
    expect(g.getWeight('C', 'A')).toBe(2);
    expect(g.getWeight('A', 'B')).toBe(1);
    expect(g.getNodes().length).toBe(3);
    expect(g.getEdges().length).toBe(2);
  });

  it('adds directional edges', () => {
    const g = new Graph<string>(true);

    g.addEdge('A', 'B', 1);
    g.addEdge('A', 'C', 2);
    expect(g.hasEdge('A', 'B')).toBeTruthy();
    expect(g.hasEdge('B', 'A')).toBeFalsy();
    expect(g.hasEdge('A', 'C')).toBeTruthy();
    expect(g.hasEdge('C', 'A')).toBeFalsy();
    expect(g.hasEdge('C', 'B')).toBeFalsy();
    expect(g.getWeight('A', 'C')).toBe(2);
    expect(g.getWeight('A', 'B')).toBe(1);
    expect(g.getNodes().length).toBe(3);
    expect(g.getEdges().length).toBe(2);
  });

  it("removes non-directional edges", () => {
    const g = new Graph<string>();

    g.addEdge("A", "B", 1);
    g.addEdge("A", "C", 2);
    g.addEdge("C", "D", 3);
    expect(g.hasEdge("C", "A")).toBeTruthy();
    expect(g.hasEdge("A", "C")).toBeTruthy();
    expect(g.getNodes().length).toBe(4);
    expect(g.getEdges().length).toBe(3);
    g.removeEdge("C", "A");
    expect(g.hasEdge("C", "A")).toBeFalsy();
    expect(g.hasEdge("A", "C")).toBeFalsy();
    expect(g.getNodes().length).toBe(4);
    expect(g.getEdges().length).toBe(2);
  });

  it('removes directional edges', () => {
    const g = new Graph<string>(true);

    g.addEdge("A", "B", 1);
    g.addEdge("A", "C", 2);
    g.addEdge("C", "A", 4);
    g.addEdge("C", "D", 3);
    expect(g.hasEdge("C", "A")).toBeTruthy();
    expect(g.hasEdge("A", "C")).toBeTruthy();
    expect(g.getNodes().length).toBe(4);
    expect(g.getEdges().length).toBe(4);
    g.removeEdge("C", "A");
    expect(g.hasEdge("C", "A")).toBeFalsy();
    expect(g.hasEdge("A", "C")).toBeTruthy();
    expect(g.getWeight("A", "C")).toBe(2);
    expect(g.getNodes().length).toBe(4);
    expect(g.getEdges().length).toBe(3);
  });

  describe('BFS', () => {
    it('explores a non-directional graph using the bfs algorithm', () => {
      const g = new Graph<string>();
      g.addEdge("A", "B");
      g.addEdge("A", "C");
      g.addEdge("C", "D");
      g.addEdge("E", "F");
      const visit = vi.fn();
  
      g.bfs("C", visit);
      expect(visit).toHaveBeenCalledWith("C");
      expect(visit).toHaveBeenCalledWith("A");
      expect(visit).toHaveBeenCalledWith("B");
      expect(visit).toHaveBeenCalledWith("D");
      expect(visit).not.toHaveBeenCalledWith("E");
      expect(visit).not.toHaveBeenCalledWith("F");
      
      vi.clearAllMocks();
      g.bfs("E", visit);
      expect(visit).toHaveBeenCalledWith("E");
      expect(visit).toHaveBeenCalledWith("F");
      expect(visit).not.toHaveBeenCalledWith("C");
      expect(visit).not.toHaveBeenCalledWith("A");
      expect(visit).not.toHaveBeenCalledWith("B");
      expect(visit).not.toHaveBeenCalledWith("D");
    });
  
    it('explores a directional graph using the bfs algorithm', () => {
      const g = new Graph<string>(true);
      g.addEdge("A", "B");
      g.addEdge("A", "C");
      g.addEdge("C", "D");
      g.addEdge("E", "F");
      const visit = vi.fn();
  
      g.bfs("C", visit);
      expect(visit).toHaveBeenCalledWith("C");
      expect(visit).toHaveBeenCalledWith("D");
      expect(visit).not.toHaveBeenCalledWith("A");
      expect(visit).not.toHaveBeenCalledWith("B");
      expect(visit).not.toHaveBeenCalledWith("E");
      expect(visit).not.toHaveBeenCalledWith("F");
      
      vi.clearAllMocks();
      g.bfs("F", visit);
      expect(visit).toHaveBeenCalledWith("F");
      expect(visit).not.toHaveBeenCalledWith("E");
      expect(visit).not.toHaveBeenCalledWith("C");
      expect(visit).not.toHaveBeenCalledWith("A");
      expect(visit).not.toHaveBeenCalledWith("B");
      expect(visit).not.toHaveBeenCalledWith("D");
    });

    it('visits in order', () => {
      const g = new Graph<string>();
      g.addEdge("A", "B");
      g.addEdge("A", "C");
      g.addEdge("C", "D");

      const order: string[] = [];
      g.bfs("A", (node) => order.push(node));
      expect(order).toEqual(["A", "B", "C", "D"]);
    });
  });

  describe('DFS', () => {
    it('explores a non-directional graph using the DFS algorithm', () => {
      const g = new Graph<string>();
      g.addEdge("A", "B");
      g.addEdge("A", "C");
      g.addEdge("C", "D");
      g.addEdge("E", "F");
      const visit = vi.fn();
  
      g.dfs("C", visit);
      expect(visit).toHaveBeenCalledWith("C");
      expect(visit).toHaveBeenCalledWith("A");
      expect(visit).toHaveBeenCalledWith("B");
      expect(visit).toHaveBeenCalledWith("D");
      expect(visit).not.toHaveBeenCalledWith("E");
      expect(visit).not.toHaveBeenCalledWith("F");
      
      vi.clearAllMocks();
      g.dfs("E", visit);
      expect(visit).toHaveBeenCalledWith("E");
      expect(visit).toHaveBeenCalledWith("F");
      expect(visit).not.toHaveBeenCalledWith("C");
      expect(visit).not.toHaveBeenCalledWith("A");
      expect(visit).not.toHaveBeenCalledWith("B");
      expect(visit).not.toHaveBeenCalledWith("D");
    });
  
    it('explores a directional graph using the DFS algorithm', () => {
      const g = new Graph<string>(true);
      g.addEdge("A", "B");
      g.addEdge("A", "C");
      g.addEdge("C", "D");
      g.addEdge("E", "F");
      const visit = vi.fn();
  
      g.dfs("C", visit);
      expect(visit).toHaveBeenCalledWith("C");
      expect(visit).toHaveBeenCalledWith("D");
      expect(visit).not.toHaveBeenCalledWith("A");
      expect(visit).not.toHaveBeenCalledWith("B");
      expect(visit).not.toHaveBeenCalledWith("E");
      expect(visit).not.toHaveBeenCalledWith("F");
      
      vi.clearAllMocks();
      g.dfs("F", visit);
      expect(visit).toHaveBeenCalledWith("F");
      expect(visit).not.toHaveBeenCalledWith("E");
      expect(visit).not.toHaveBeenCalledWith("C");
      expect(visit).not.toHaveBeenCalledWith("A");
      expect(visit).not.toHaveBeenCalledWith("B");
      expect(visit).not.toHaveBeenCalledWith("D");
    });

    it('visits in order', () => {
      const g = new Graph<string>();
      g.addEdge("A", "B");
      g.addEdge("A", "C");
      g.addEdge("C", "D");

      const order: string[] = [];
      g.dfs("A", (node) => order.push(node));
      expect(order).toEqual(["A", "B", "C", "D"]);
    });
  });

  describe('Dijkstra', () => {
    it('calculates the shortest path', () => {
      const g = new Graph<string>();
  
      g.addEdge("A", "B");
      g.addEdge("A", "C");
      g.addEdge("C", "D");
      g.addEdge("D", "E");
      g.addEdge("F", "E");
      g.addEdge("A", "E");
      g.addEdge("G", "H");
  
      const d = g.dijkstra("A");
      expect(d.get("A")).toBe(0);
      expect(d.get("B")).toBe(1);
      expect(d.get("C")).toBe(1);
      expect(d.get("D")).toBe(2);
      expect(d.get("E")).toBe(1);
      expect(d.get("F")).toBe(2);
      expect(d.get("G")).toBe(Infinity);
      expect(d.get("H")).toBe(Infinity);
    });
  });
});
