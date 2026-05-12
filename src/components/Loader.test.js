import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader", () => {
  it("renders loader", () => {
    render(<Loader />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
