import { AirplaneGraph } from "../../services/AirplaneGraph";

describe("FlightGraph", () => {
  let airplaneGraph: AirplaneGraph;
  beforeEach(() => {
    const flights = [
      { origin: "A", destination: "B", cost: 100, duration: 1 },
      { origin: "A", destination: "C", cost: 200, duration: 2 },
      { origin: "B", destination: "C", cost: 50, duration: 1 },
      { origin: "B", destination: "D", cost: 150, duration: 2 },
      { origin: "C", destination: "D", cost: 100, duration: 1 },
    ];
    airplaneGraph = new AirplaneGraph(flights);
  });

  it("should return the neighbors of a city", () => {
    const neighbors = airplaneGraph.getNeighbors("A");
    expect(neighbors).toEqual(["B", "C"]);
  });

  it("should get a flight between two cities", () => {
    const flight = airplaneGraph.getFlight("B", "D");
    expect(flight).toEqual({
      origin: "B",
      destination: "D",
      cost: 150,
      duration: 2,
    });
  }); 

  it("should calculate the shortest path between two cities", () => {
    const shortestPath = airplaneGraph.getShortestPath("A", "D");
    expect(shortestPath).toEqual(["A", "B", "D"]);
  });
});
