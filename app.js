import express from "express";
import cors from "cors";

import { getAthletes } from "./models/athletes.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", async (req, res) => {
  // use func to get all athletes
  const athletes = await getAthletes();
  res.status(200).json({ status: "success", payload: athletes });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
