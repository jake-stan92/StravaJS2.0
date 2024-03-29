import express from "express";

import { getAthletes } from "./models/athletes.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

const athletes = await getAthletes();
console.log(athletes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
