import React, { useState, useMemo, useCallback } from "react";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import { useRewardsData } from "./hooks/useRewardsData";
import CommonTable from "./components/CommonTable";
import Loader from "./components/Loader";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { formatDate, getLast3MonthsRange } from "./utils/dateUtils";

function App() {
  const { transactions, loading, errorMessage } = useRewardsData();
  const [dateRange, setDateRange] = useState(getLast3MonthsRange());
  const [tempRange, setTempRange] = useState(getLast3MonthsRange());
  const today = formatDate(new Date());

  const handleFilter = useCallback(() => {
    if (tempRange.start > tempRange.end) {
      alert("Start date cannot be after End date");
      return;
    }
    setDateRange(tempRange);
  }, [tempRange, setDateRange]);

  const normalizedTransactions = useMemo(
    () =>
      transactions.map((t) => ({
        ...t,
        purchaseDateObj: new Date(t.purchaseDate)
      })),
    [transactions]
  );

  const filteredTransactions = useMemo(() => {
    return normalizedTransactions.filter(
      (t) =>
        t.purchaseDateObj >= dateRange.start &&
        t.purchaseDateObj <= dateRange.end
    );
  }, [normalizedTransactions, dateRange.start, dateRange.end]);

  const monthlyRewardsData = useMemo(() => {
    return Object.values(
      filteredTransactions.reduce((acc, t) => {
        const key = `${t.customerId}-${t.month}-${t.year}`;

        if (!acc[key]) {
          acc[key] = {
            customerId: t.customerId,
            name: t.customerName,
            monthYear: `${t.month}-${t.year}`,
            points: 0,
            sortKey: t.sortKey
          };
        }

        acc[key].points += t.rewardPoints;
        return acc;
      }, {})
    ).sort((a, b) => a.sortKey - b.sortKey);
  }, [filteredTransactions]);

  const totalData = useMemo(
    () =>
      Object.values(
        transactions.reduce((acc, t) => {
          if (!acc[t.customerId]) {
            acc[t.customerId] = {
              customerId: t.customerId,
              customerName: t.customerName,
              rewardPoints: 0
            };
          }

          acc[t.customerId].rewardPoints += t.rewardPoints;

          return acc;
        }, {})
      ),
    [transactions]
  );

  if (loading) return <Loader />;

  if (errorMessage) {
    return (
      <Container sx={{ mt: 6 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          gap={2}
        >
          <ErrorOutlineIcon color="error" sx={{ fontSize: 50 }} />

          <Typography variant="h5" color="error">
            Something went wrong
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {errorMessage}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Box>
      </Container>
    );
  }

  const rewardsColumns = [
    { field: "customerId", header: "ID" },
    { field: "name", header: "Customer Name" },
    { field: "monthYear", header: "Month-Year" },
    { field: "points", header: "Points", isSortable: true }
  ];
  const totalColumns = [
    { field: "customerId", header: "ID" },
    { field: "customerName", header: "Customer Name" },
    { field: "rewardPoints", header: "Total Points", isSortable: true }
  ];
  const transactionColumns = [
    { field: "transactionId", header: "Transaction Id" },
    { field: "customerId", header: "ID" },
    { field: "customerName", header: "Customer Name" },
    { field: "purchaseDate", header: "Date" },
    { field: "product", header: "Products" },
    { field: "price", header: "Price($)", isSortable: true },
    { field: "rewardPoints", header: "Points" }
  ];

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Rewards Dashboard
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3, mt: 3 }}>
        <TextField
          label="Start Date"
          type="date"
          value={formatDate(tempRange.start)}
          onChange={(e) =>
            setTempRange((prev) => ({
              ...prev,
              start: new Date(e.target.value)
            }))
          }
          InputLabelProps={{ shrink: true }}
          inputProps={{ max: today }}
        />

        <TextField
          label="End Date"
          type="date"
          value={formatDate(tempRange.end)}
          onChange={(e) =>
            setTempRange((prev) => ({
              ...prev,
              end: new Date(e.target.value)
            }))
          }
          InputLabelProps={{ shrink: true }}
          inputProps={{ max: today }}
        />

        <Button
          variant="contained"
          onClick={handleFilter}
          disabled={tempRange.start > tempRange.end}
          sx={{ backgroundColor: "#4982b4" }}
        >
          Filter
        </Button>
      </Box>
      <CommonTable
        title="Transactions"
        columns={transactionColumns}
        data={filteredTransactions}
        rowsPerPage={10}
        keyField={(row) => row.transactionId}
      />
      <CommonTable
        title="Monthly Rewards"
        columns={rewardsColumns}
        data={monthlyRewardsData}
        rowsPerPage={10}
        keyField={(row) => `${row.customerId}-${row.monthYear}`}
      />
      <CommonTable
        title="Total Rewards"
        columns={totalColumns}
        data={totalData}
        rowsPerPage={5}
        keyField={(row) => row.customerId}
      />
    </Container>
  );
}

export default App;
