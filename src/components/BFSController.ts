import { Graph } from "../utils/Adjacency";
import { BFS } from "../utils/BFS";

import borderData from "@/src/data/borders.json";
import type { CoordsWithCountry } from "./MapView";

export class BFSController {
  graph: Graph;

  constructor(data?: Record<string, string[]>) {
    this.graph = new Graph(data || borderData);
  }

  runBFS(start: CoordsWithCountry, end: CoordsWithCountry) {
    return BFS(this.graph, start.country, end.country);
  }
}
