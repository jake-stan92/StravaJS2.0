import express from "express";
import cors from "cors";

import {
  filterActivitiesByType,
  filterByYear,
  getAthleteAccessCode,
  getAthleteActivities,
  getAthletes,
} from "./models/athletes.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));

// global date data here
const todaysDate = new Date();
const currentYear = todaysDate.getFullYear();

// returning this years runs
app.get("/", async (req, res) => {
  // use func to get all athletes
  const athletes = await getAthletes();

  const athleteCode = await getAthleteAccessCode(athletes[0]);

  const activities = await getAthleteActivities(athleteCode);

  // const allRuns = await filterActivitiesByType("Run", activities);

  // return all acitivities and filter in front end
  const thisYearsActivities = await filterByYear(currentYear, activities);

  res.status(200).json({ status: "success", payload: thisYearsActivities });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
