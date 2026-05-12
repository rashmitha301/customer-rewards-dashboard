import { renderHook, waitFor } from "@testing-library/react";
import { useRewardsData } from "./useRewardsData";
import * as api from "../services/api";

jest.mock("../services/api");

describe("useRewardsData", () => {
  it("should fetch and transform data", async () => {
    api.fetchTransactions.mockResolvedValue([
      {
        customerId: "C1",
        price: 120,
        purchaseDate: "2026-05-10"
      }
    ]);

    const { result } = renderHook(() => useRewardsData());

    await waitFor(() => {
      expect(result.current.transactions.length).toBe(1);
    });

    expect(result.current.loading).toBe(false);

    expect(result.current.transactions[0]).toMatchObject({
      customerId: "C1",
      price: 120
    });
  });
});
