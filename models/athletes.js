// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "../db/index.js";

// get a list of all athletes
export async function getAthletes() {
  // Query the database and return all resource twos
  const queryText = "SELECT * FROM athletes";
  // Plan SQL command
  const result = await pool.query(queryText);
  // Use pool to send query to database.
  return result.rows;
}

// get access code for one athlete
export async function getAthleteAccessCode(athlete) {
  const auth_link = "https://www.strava.com/oauth/token";

  let athleteAccessToken = {};

  const response = await fetch(auth_link, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    // parameters: {
    //   pageSize: 200,
    // },
    body: JSON.stringify({
      client_id: athlete["client_id"],
      client_secret: athlete["client_secret"],
      refresh_token: athlete["refresh_token"],
      grant_type: "refresh_token",
    }),
  });

  const data = await response.json();

  athleteAccessToken = {
    id: athlete.id,
    athlete: athlete.name,
    accessToken: data.access_token,
  };
  return athleteAccessToken;
}

// get all activities for one athlete
export async function getAthleteActivities(athlete) {
  const activities_url = "https://www.strava.com/api/v3/athlete/activities";
  const activitiesLink = `${activities_url}?per_page=100&access_token=${athlete.accessToken}`; // total results is handled here - could be ${}
  const response = await fetch(activitiesLink);
  const athleteData = await response.json();
  return athleteData;
}

// filter results by type - "Run" "Walk"
export async function filterActivitiesByType(type, activities) {
  const filteredActivities = [];

  activities.map((activity) => {
    if (activity.type === type) {
      filteredActivities.push(activity);
    }
  });
  return filteredActivities;
}

// Filter activities by current year
export async function filterByYear(year, activities) {
  const filteredActivities = [];
  activities.map((activity) => {
    const activityDateStr = activity.start_date;
    const activityYear = Number(activityDateStr.slice(0, 4));
    if (activityYear === year) {
      filteredActivities.push(activity);
    }
  });
  return filteredActivities;
}

// carry on filtering here, filter down to week, can add different routes in front end in future

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
