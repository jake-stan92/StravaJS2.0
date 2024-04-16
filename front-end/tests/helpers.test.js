import { getAvgDistance, getAvgSpeed } from "../src/components/helpers";
import { expect, test } from "vitest";

test("avergae distance of 2 runs @ 10km and 10km is 10.00", () => {
  const activities = [
    {
      distance: 10000,
    },
    {
      distance: 10000,
    },
  ];
  expect(getAvgDistance(activities)).toBe(10.0);
});

test("avergae distance of 2 runs @ 12km and 23.5km is 17.75", () => {
  const activities = [
    {
      distance: 12000,
    },
    {
      distance: 23500,
    },
  ];
  expect(getAvgDistance(activities)).toBe(17.75);
});

test("average speed of 2 runs @10km/h and 20km/h = 15", () => {
  const activities = [
    {
      average_speed: 2.77,
    },
    {
      average_speed: 4.16,
    },
  ];
  expect(getAvgSpeed(activities)).toBe(12.47);
});
