// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "../db/index.js";

export async function getAthletes() {
  // Query the database and return all resource twos
  const queryText = "SELECT * FROM athletes";
  // Plan SQL command
  const result = await pool.query(queryText);
  // Use pool to send query to database.
  return result.rows;
}

// export async function getModelsById(id) {
//   // Query the database and return the resource with a matching id or null
//   // Set SQL query
//   const queryText = "SELECT * FROM models WHERE id = $1";
//   // Pass query to DB
//   const result = await pool.query(queryText, [id]);
//   return result.rows[0];
// }

// export async function createModels(resource) {
//   // Query the database to create an resource and return the newly created resource
//   // Define SQL query for new model
//   const queryText = "INSERT INTO models (model, engine_displacement, BHP, drivetrain, manufacturer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
//   const values = [resource.model, resource.engine_displacement, resource.BHP, resource.drivetrain, resource.manufacturer_id]
//   // Use pool to send the SQL query to render database
//   const result = await pool.query(queryText, values);
//   // return result
//   return result.rows[0];
// }

// export async function updateModelsById(id, updates) {
//   // Query the database to update the resource and return the newly updated resource or null
// }

// export async function deleteModelsById(id) {
//   // Query the database to delete the resource and return the deleted resource or null
// }
