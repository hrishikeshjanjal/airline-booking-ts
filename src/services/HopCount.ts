import { AirplaneGraph } from "./AirplaneGraph";

export class HopCount {
  private graph: AirplaneGraph;
  constructor(graph: AirplaneGraph) {
    this.graph = graph;
  }
  public getHopCount(origin: string, destination: string): number {
    if (origin === destination) {
      return 0;
    }
    const shortestPath = this.graph.getShortestPath(origin, destination);
    return shortestPath.length - 1;
  }
}
