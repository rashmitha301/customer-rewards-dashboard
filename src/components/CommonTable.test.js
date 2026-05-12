import React from "react";
import { render, screen } from "@testing-library/react";
import CommonTable from "./CommonTable";

const mockColumns = [
  { field: "name", header: "Name" },
  { field: "amount", header: "Amount" }
];

const mockData = [
  { name: "Rashmitha", amount: 100 }
];

describe("CommonTable", () => {
  it("renders table data correctly", () => {
    render(
      <CommonTable
        title="Test Table"
        columns={mockColumns}
        data={mockData}
        keyField={(row) => row.id}
      />
    );

    expect(screen.getByText("Rashmitha")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});