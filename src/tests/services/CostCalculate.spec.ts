import { AirplaneGraph } from "../../services/AirplaneGraph";
import { CostCalculator } from "../../services/CostCalculate";

describe("CostCalculator", () => {
  let costCalculator: CostCalculator;
  beforeEach(() => {
    const flights = [
      { origin: "A", destination: "B", cost: 100, duration: 1 },
      { origin: "A", destination: "C", cost: 200, duration: 2 },
      { origin: "B", destination: "C", cost: 50, duration: 1 },
      { origin: "B", destination: "D", cost: 150, duration: 2 },
      { origin: "C", destination: "D", cost: 100, duration: 1 },
    ];
    const airplaneGraph = new AirplaneGraph(flights);
    costCalculator = new CostCalculator(airplaneGraph);
  });

  it("should calculate the cheapest cost between two cities", () => {
    const cheapestCost = costCalculator.getCheapestCost("A", "D");
    expect(cheapestCost).toBe(250);
  });
  it('should return 0 for the same origin and destination', () => {
    const cheapestCost = costCalculator.getCheapestCost('A', 'A');
    expect(cheapestCost).toBe(0);
  });
  it('should return 0 if no path exists', () => {
    const cheapestCost = costCalculator.getCheapestCost('A', 'E');
    expect(cheapestCost).toBe(0);
  });

  it('should handle negative costs correctly', () => {
    const flights = [
      { origin: 'A', destination: 'B', cost: -100, duration: 1 },
      { origin: 'B', destination: 'C', cost: -50, duration: 2 },
      { origin: 'C', destination: 'D', cost: -150, duration: 1 },
    ];
    const airplaneGraph = new AirplaneGraph(flights);
    const calculator = new CostCalculator(airplaneGraph);
    const cheapestCost = calculator.getCheapestCost('A', 'D');
    expect(cheapestCost).toBe(-300);
  });
});
