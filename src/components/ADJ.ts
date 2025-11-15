export class Graph {
  adj: Map<string, string[]>;

  constructor(data?: Record<string, string[]>) {
    this.adj = new Map();
    if (data) {
      for (const country in data) {
        this.adj.set(country, data[country]);
      }
    }
  }

  addEdge(country: string, neighbor: string) {
    if (!this.adj.has(country)) this.adj.set(country, []);
    if (!this.adj.has(neighbor)) this.adj.set(neighbor, []);

    if (!this.adj.get(country)!.includes(neighbor))
      this.adj.get(country)!.push(neighbor);
    if (!this.adj.get(neighbor)!.includes(country))
      this.adj.get(neighbor)!.push(country);
  }
}
