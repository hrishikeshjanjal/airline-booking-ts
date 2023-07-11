import { Flight } from "../models/Flight";

export class AirplaneGraph {
  private flights: Flight[];

  constructor(flights: Flight[]) {
    this.flights = flights;
  }

  public getNeighbors(city: string): string[] {
    const neighbors: string[] = [];

    for (const flight of this.flights) {
      if (flight.origin === city) {
        neighbors.push(flight.destination);
      }
    }

    return neighbors;
  }

  // cost calculation
  public getFlight(origin: string, destination: string): Flight | undefined {
    return this.flights.find(
      (flight) => flight.origin === origin && flight.destination === destination
    );
  }

  // cost calculation
  // hop count
  public getShortestPath(origin: string, destination: string): string[] {
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const queue: string[] = [];

    distances[origin] = 0;
    queue.push(origin);

    while (queue.length > 0) {
      const current = queue.shift() as string;

      if (current === destination) {
        break;
      }

      const neighbors = this.getNeighbors(current);

      for (const neighbor of neighbors) {
        const distance = distances[current] + 1;

        if (!distances[neighbor] || distance < distances[neighbor]) {
          distances[neighbor] = distance;
          previous[neighbor] = current;
          queue.push(neighbor);
        }
      }
    }
    if (!previous[destination]) {
      return [];
    }
    return this.reconstructPath(origin, destination, previous);
  }

  
  private reconstructPath(
    origin: string,
    destination: string,
    previous: Record<string, string | null>
  ): string[] {
    const path: string[] = [];
    let current = destination;

    while (current !== origin) {
      path.unshift(current);
      current = previous[current] as string;
    }

    path.unshift(origin);
    return path;
  }
}

