import { AirplaneGraph } from "../../services/AirplaneGraph";
import { HopCount } from "../../services/HopCount";

  describe("HopCounter", () => {
  let hopCounter: HopCount;
  beforeEach(() => {
    const flights = [
      { origin: "A", destination: "B", cost: 100, duration: 1 },
      { origin: "A", destination: "C", cost: 200, duration: 2 },
      { origin: "B", destination: "C", cost: 50, duration: 1 },
      { origin: "B", destination: "D", cost: 150, duration: 2 },
      { origin: "C", destination: "D", cost: 100, duration: 1 },
    ];
    const airplaneGraph = new AirplaneGraph(flights);
    hopCounter = new HopCount(airplaneGraph);
  });

  it("should calculate the hop count between two cities", () => {
    const hopCount = hopCounter.getHopCount("A", "D");
    expect(hopCount).toBe(2);
  });
  it('should return -1 if no path exists', () => {
    const hopCount = hopCounter.getHopCount('A', 'E');
    expect(hopCount).toBe(-1);
  });
  it('should return 0 for the same origin and destination', () => {
    const hopCount = hopCounter.getHopCount('A', 'A');
    expect(hopCount).toBe(0);
  });
});
