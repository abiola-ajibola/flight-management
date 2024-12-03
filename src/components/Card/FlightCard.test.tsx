import {  render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { FlightCard } from "./FlightCard";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

const sampleFlight = {
  id: "e9890ca4-2bac-4e5b-b614-732176270bef",
  img: "https://robohash.org/e9890ca4-2bac-4e5b-b614-732176270bef/?size=200x200",
  status: "none",
  code: "AbcDef",
  capacity: 50,
  departureDate: "2020-10-23",
};

test("loads and displays a flight card", async () => {
  // ARRANGE
  const handleDelete = vi.fn();
  render(
    <MemoryRouter>
      <FlightCard flight={sampleFlight} onDelete={(id) => handleDelete(id)} />
    </MemoryRouter>
  );

  await userEvent.click(screen.getByText("Delete"));
  expect(handleDelete).toHaveBeenCalled();

  expect(screen.getByText(sampleFlight.code)).toBeInTheDocument();
  expect(screen.getByTestId("flight-card-image")).toBeInTheDocument();
  expect(screen.getByAltText(sampleFlight.code)).toBeInTheDocument();
});
