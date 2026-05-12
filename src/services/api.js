import logger from '../utils/logger';

/**
 * Fetches transaction data
 */
export const fetchTransactions = async () => {
  try {
    const response = await fetch('/mock/transactions.json');

    if (!response.ok) {
      const errorMsg = `API Error: ${response.status} ${response.statusText}`;
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    const data = await response.json();
    logger.info('Transactions fetched successfully');
    return data;

  } catch (error) {
    logger.error('Failed to fetch transactions', error);
    throw error;
  }
};