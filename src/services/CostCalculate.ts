import { Station } from "../models/Station";
import { AirplaneGraph } from "./AirplaneGraph";

export class CostCalculator {
  private graph: AirplaneGraph;

  constructor(graph: AirplaneGraph) {
    this.graph = graph;
  }

  public getCheapestCost(origin: Station, destination: Station): number {
    const shortestPath = this.graph.getShortestPath(origin, destination);
    if (shortestPath.length === 0) {
      return 0;
    }

    let totalCost = 0;
    for (let i = 0; i < shortestPath.length - 1; i++) {
      const currentStation = shortestPath[i];
      const nextStation = shortestPath[i + 1];
      const flight = this.graph.getFlight(currentStation, nextStation);
      if (flight) {
        totalCost += flight.cost;
      } else {
        // If there is no direct flight, find the flight in reverse order
        const reverseFlight = this.graph.getFlight(nextStation, currentStation);
        if (reverseFlight) {
          totalCost += reverseFlight.cost;
        }
      }
    }

    return totalCost;
  }
}


