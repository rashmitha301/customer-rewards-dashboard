/**
 * Calculates reward points based on the purchase amount.
 *
 * Rules:
 * - No points for amount ≤ 50
 * - 1 point for every dollar spent between 51–100
 * - 2 points for every dollar spent above 100
 *
 * @param {number} amount - The transaction amount (must be a finite number).
 * @returns {number} Total reward points earned.
 * @throws {Error} Will throw an error if the amount is not a valid finite number.
 *
 * @example
 * calculateRewardPoints(40);   // 0
 * calculateRewardPoints(75);   // 25
 * calculateRewardPoints(120);  // 90
 */
export const calculateRewardPoints = (amount) => {
  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    throw new Error(`Invalid amount: ${amount}`);
  }
  const amt = Math.floor(amount);
  if (amt <= 50) return 0;
  if (amt <= 100) return amt - 50;
  return 50 + (amt - 100) * 2;
};
