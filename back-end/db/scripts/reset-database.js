import { pool } from "../index.js";
async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
        DROP TABLE IF EXISTS athletes CASCADE;
    `);

    // Create the manufacturers table
    await pool.query(`
        CREATE TABLE athletes (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            client_id VARCHAR(255) NOT NULL,
            client_secret VARCHAR(255) NOT NULL,
            refresh_token VARCHAR(255) NOT NULL
        );
    `);

    // Popualte athletes table - single value to start
    await pool.query(`
      INSERT INTO athletes (name, client_id, client_secret, refresh_token)
      VALUES 
        ('Jake Stanier', '', '', '')
        `);

    // Validate script
    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();
