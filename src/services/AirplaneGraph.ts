import { Flight } from "../models/Flight";
import { Station } from "../models/Station";

export class AirplaneGraph {
  private flights: Flight[];

  constructor(flights: Flight[]) {
    this.flights = flights;
  }

  public getNeighbors(station: Station): Station[] {
    const neighbors: Station[] = [];

    for (const flight of this.flights) {
      if (flight.origin.name === station.name) {
        neighbors.push(flight.destination);
      }
    }

    return neighbors;
  }

  public getFlight(origin: Station, destination: Station): Flight | undefined {
    return this.flights.find(
      (flight) =>
        flight.origin.name === origin.name && flight.destination.name === destination.name
    );
  }

  public getShortestPath(origin: Station, destination: Station): Station[] {
    const queue: Station[] = [];
    const distances: Record<string, number> = {};
    const previous: Record<string, Station | null> = {};

    for (const flight of this.flights) {
      distances[flight.origin.name] = Infinity;
      distances[flight.destination.name] = Infinity;
      previous[flight.origin.name] = null;
      previous[flight.destination.name] = null;
    }

    distances[origin.name] = 0;
    queue.push(origin);

    while (queue.length > 0) {
      const current = queue.shift() as Station;

      if (current.name === destination.name) {
        break;
      }

      const neighbors = this.getNeighbors(current);

      for (const neighbor of neighbors) {
        const flight = this.getFlight(current, neighbor);
        if (!flight) {
          continue;
        }

        const distance = distances[current.name] + flight.duration;
        if (distance < distances[neighbor.name]) {
          distances[neighbor.name] = distance;
          previous[neighbor.name] = current;
          queue.push(neighbor);
        }
      }
    }

    const shortestPath: Station[] = [];
    let currentStation: Station | null = destination;

    while (currentStation !== null) {
      shortestPath.unshift(currentStation);
      currentStation = previous[currentStation.name];
    }

    return shortestPath;
  }
}

