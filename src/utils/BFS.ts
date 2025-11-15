import { Graph } from "./Adjacency";

export interface Step {
  current: string;
  queue: string[];
  visited: string[];
}

export interface BFSProps {
  steps: Step[];
  visited: string[];
  shortestPath: string[];
}

export function BFS(graph: Graph, start: string, target: string): BFSProps {
  const queue: string[] = [start];
  const visitedSet = new Set<string>();
  const steps: Step[] = [];
  const parent: Record<string, string | null> = { [start]: null };

  while (queue.length) {
    const current = queue.shift()!;
    visitedSet.add(current);

    steps.push({
      current,
      queue: [...queue],
      visited: Array.from(visitedSet),
    });

    if (current == target) {
      break;
    }

    for (const neighbor of graph.adj.get(current) || []) {
      if (!visitedSet.has(neighbor) && !queue.includes(neighbor)) {
        queue.push(neighbor);
        parent[neighbor] = current;
      }
    }
  }

  const shortestPath: string[] = [];
  if (visitedSet.has(target)) {
    let node: string | null = target;
    while (node) {
      shortestPath.unshift(node);
      node = parent[node];
    }
  }

  //   console.log("BFS Run:");
  //   console.log("Start:", start);
  //   console.log("Target:", target);
  //   console.log("Visited countries:", Array.from(visitedSet));
  //   console.log("Shortest path:", shortestPath);
  //   console.log("-------------------------");

  return { steps, visited: Array.from(visitedSet), shortestPath };
}
