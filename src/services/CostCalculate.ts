import { AirplaneGraph } from "./AirplaneGraph";

export class CostCalculator {
  private graph: AirplaneGraph;

  constructor(graph: AirplaneGraph) {
    this.graph = graph;
  }

  public getCheapestCost(origin: string, destination: string): number {
    const shortestPath = this.graph.getShortestPath(origin, destination);
    if (shortestPath.length === 0) {
      return 0;
    }

    let totalCost = 0;
    for (let i = 0; i < shortestPath.length - 1; i++) {
      const currentCity = shortestPath[i];
      const nextCity = shortestPath[i + 1];
      const flight = this.graph.getFlight(currentCity, nextCity);
      if (flight) {
        totalCost += flight.cost;
      }
    }

    return totalCost;
  }
}
