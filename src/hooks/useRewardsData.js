import { useEffect, useState } from "react";
import { fetchTransactions } from "../services/api";
import { calculateRewardPoints } from "../utils/calculatePoints";
import { enrichDate } from "../utils/dateUtils";
import logger from "../utils/logger";

export const useRewardsData = () => {
  const [rewardsData, setRewardsData] = useState({
    transactions: [],
    loading: false,
    errorMessage: null
  });

  useEffect(() => {
    const loadTransactions = async () => {
      setRewardsData((prev) => ({
        ...prev,
        loading: true,
        errorMessage: null
      }));
      try {
        logger.info("Fetching transactions...");
        const data = await fetchTransactions();
        const transactions = data.map((item) => ({
          ...item,
          rewardPoints: calculateRewardPoints(item.price),
          ...enrichDate(item.purchaseDate)
        }));
        logger.info("Transactions processed successfully", transactions);
        setRewardsData({
          transactions,
          loading: false,
          errorMessage: null
        });
      } catch (error) {
        logger.error("Error in useRewardsData hook", error);
        setRewardsData({
          transactions: [],
          loading: false,
          errorMessage: error.message
        });
      }
    };
    loadTransactions();
  }, []);

  return rewardsData;
};
