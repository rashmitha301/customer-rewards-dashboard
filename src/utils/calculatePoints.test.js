import { calculateRewardPoints } from "./calculatePoints";

describe("calculatePoints", () => {
  it("should return 0 for amount < 50", () => {
    expect(calculateRewardPoints(40)).toBe(0);
  });

  it("should return correct points for amount between 50 and 100", () => {
    expect(calculateRewardPoints(70)).toBe(20); // 70 - 50
  });

  it("should return correct points for amount > 100", () => {
    expect(calculateRewardPoints(120)).toBe(90);
    // (120 - 100)*2 + (100-50)
  });
});
