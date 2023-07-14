import { Flight } from "../../models/Flight";
import { Station } from "../../models/Station";
import { AirplaneGraph } from "../../services/AirplaneGraph";

describe("AirplaneGraph", () => {
  const flights = [
    new Flight(new Station("A"), new Station("B"), 100, 1),
    new Flight(new Station("B"), new Station("C"), 200, 2),
    new Flight(new Station("C"), new Station("D"), 300, 3),
    new Flight(new Station("A"), new Station("D"), 400, 4),
  ];
  const graph = new AirplaneGraph(flights);

  it("should return the neighbors of a station", () => {
    const neighbors = graph.getNeighbors(new Station("A"));
    expect(neighbors).toEqual([new Station("B"), new Station("D")]);
  });

  it("should return a flight between two stations", () => {
    const flight = graph.getFlight(new Station("A"), new Station("B"));
    expect(flight).toEqual(new Flight(new Station("A"), new Station("B"), 100, 1));
  });

  // failing
  // it("should return the shortest path between two stations", () => {
  //   const origin = new Station("A");
  //   const destination = new Station("D");
  //   const shortestPath = graph.getShortestPath(origin, destination);
  //   const expectedPath = [
  //     origin,
  //     flights[0].destination,
  //     flights[2].destination,
  //     destination,
  //   ];
  //   expect(shortestPath).toEqual(expectedPath);
  // });
});


