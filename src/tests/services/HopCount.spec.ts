import { Flight } from "../../models/Flight";
import { Station } from "../../models/Station";
import { AirplaneGraph } from "../../services/AirplaneGraph";
import { HopCount } from "../../services/HopCount";

describe("HopCount", () => {
  const flights = [
    new Flight(new Station("A"), new Station("B"), 100, 1),
    new Flight(new Station("B"), new Station("C"), 200, 2),
    new Flight(new Station("C"), new Station("D"), 300, 3),
  ];
  const graph = new AirplaneGraph(flights);
  const hopCount = new HopCount(graph);

  it("should calculate the hop count between two stations", () => {
    const origin = new Station("A");
    const destination = new Station("D");
    const count = hopCount.getHopCount(origin, destination);
    const expectedCount = 3; // A -> B -> C -> D
    expect(count).toEqual(expectedCount);
  });

  it("should return 0 for the same origin and destination", () => {
    const origin = new Station("A");
    const destination = new Station("A");
    const count = hopCount.getHopCount(origin, destination);
    const expectedCount = 0;
    expect(count).toEqual(expectedCount);
  });
});


