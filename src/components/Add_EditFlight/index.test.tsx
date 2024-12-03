import { MemoryRouter } from "react-router-dom";
import { AddOrEditFlight } from ".";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";

test("loads and displays flight creation form", async () => {
  render(
    <MemoryRouter>
      <AddOrEditFlight />
    </MemoryRouter>
  );

  expect(screen.getByText("Add New Flight")).toBeInTheDocument();
  expect(
    await screen.findByPlaceholderText("Capacity of the flight")
  ).toBeInTheDocument();
  expect(
    await screen.findByPlaceholderText("Code of the flight")
  ).toBeInTheDocument();
  expect(
    await screen.findByPlaceholderText("Date of departure")
  ).toBeInTheDocument();
  expect(
    await screen.findByPlaceholderText("Select an image")
  ).toBeInTheDocument();
  expect(await screen.findByRole("button")).toBeInTheDocument();
});
