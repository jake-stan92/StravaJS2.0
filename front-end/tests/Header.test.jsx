import { describe, expect, test, it } from "vitest";
import { render, screen, fireEven } from "@testing-library/react";
import Header from "../src/components/Header";

describe("Header", () => {
  test("renders", () => {
    render(<Header />);
    expect(screen.getByText("StravaJS")).toBeDefined();
  });
});
