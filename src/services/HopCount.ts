import { Station } from "../models/Station";
import { AirplaneGraph } from "./AirplaneGraph";

export class HopCount {
  private graph: AirplaneGraph;
  constructor(graph: AirplaneGraph) {
    this.graph = graph;
  }
  public getHopCount(origin: Station, destination: Station): number {
    if (origin === destination) {
      return 0;
    }
    const shortestPath = this.graph.getShortestPath(origin, destination);
    return shortestPath.length - 1;
  }
}

