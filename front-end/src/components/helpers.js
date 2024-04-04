// total runs is sorted on page load

// average run distance - all runs
export function getAverageDistance(activites) {
  let total = 0;
  activites.map((activity) => {
    total += activity.distance;
  });
  const totalKM = total / 1000;
  const averageDistance = (totalKM / activites.length).toFixed(2);
  return averageDistance;
}

// last 5 avg distance
function getLast5AvgDistance(last5) {
  let total = 0;
  last5.map((activity) => {
    total += activity.distance;
  });
  const totalKM = total / 1000;
  const averageDistance = (totalKM / last5.length).toFixed(2);
  return averageDistance;
}

// last 5 avg speed
export async function getLast5AvgSpeed(last5) {
  let total = 0;
  last5.map((run) => {
    total += run.average_speed;
  });
  const average = total / 5;
  const kiloPerHour = (average * 3.6).toFixed(2); // Convert S.I (m/s) units to KMH -- https://www.reddit.com/r/Strava/comments/pxbqql/strava_api_what_are_the_activitys_speed_fields/
  return kiloPerHour;
}

// year to date >> monthly count and distance
// month to date >> weekly count and distance
// week to date >> daily count and distance

// last 5 stats / date // where // dist // time // avg speed
// get lastest 5 runs loop activities index 0 - 4
export function getLast5(activities) {
  const last5 = [];
  for (let i = 0; i < 5; i++) {
    const activity = {
      date: new Date(activities[i].start_date).toLocaleDateString("en-uk"), // will need formatting
      location: activities[i].location_country,
      distance: (activities[i].distance / 1000).toFixed(2), // returns km
      time: (activities[i].elapsed_time / 60).toFixed(2),
      avgSpeed: (activities[i].average_speed * 3.6).toFixed(2), // returns km/h
    };
    last5.push(activity);
  }
  console.log(last5);
  return last5;
}
