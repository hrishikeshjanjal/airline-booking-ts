import { Flight } from "../../models/Flight";
import { Station } from "../../models/Station";
import { AirplaneGraph } from "../../services/AirplaneGraph";
import { CostCalculator } from "../../services/CostCalculate";


//failing test case for cost calculation
describe("CostCalculator", () => {
  const flights = [
    new Flight(new Station("A"), new Station("B"), 100, 1),
    new Flight(new Station("B"), new Station("C"), 200, 2),
    new Flight(new Station("C"), new Station("D"), 300, 3),
    new Flight(new Station("A"), new Station("D"), 400, 4),
  ];
  const graph = new AirplaneGraph(flights);
  const calculator = new CostCalculator(graph);

  it("should calculate the cheapest cost between two stations", () => {
    const origin = new Station("A");
    const destination = new Station("D");
    const cheapestCost = calculator.getCheapestCost(origin, destination);
    const expectedCost = 300; // 100 (A -> B) + 200 (B -> C)
    expect(cheapestCost).toEqual(expectedCost);
  });

  it("should return 0 if no path exists", () => {
    const origin = new Station("A");
    const destination = new Station("E");
    const cheapestCost = calculator.getCheapestCost(origin, destination);
    const expectedCost = 0;
    expect(cheapestCost).toEqual(expectedCost);
  });

  it("should return 0 for the same origin and destination", () => {
    const origin = new Station("A");
    const destination = new Station("A");
    const cheapestCost = calculator.getCheapestCost(origin, destination);
    const expectedCost = 0;
    expect(cheapestCost).toEqual(expectedCost);
  });
});
