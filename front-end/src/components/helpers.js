// total runs is sorted on page load

// avg distance
export function getAvgDistance(activities) {
  let total = 0;
  activities.map((activity) => {
    total += activity.distance;
  });
  const totalKM = total / 1000;
  const averageDistance = (totalKM / activities.length).toFixed(2);
  return averageDistance;
}

// avg speed
export function getAvgSpeed(activities) {
  let total = 0;
  activities.map((run) => {
    total += run.average_speed;
  });
  const average = total / 5;
  const kiloPerHour = (average * 3.6).toFixed(2); // Convert S.I (m/s) units to KMH -- https://www.reddit.com/r/Strava/comments/pxbqql/strava_api_what_are_the_activitys_speed_fields/
  return kiloPerHour;
}

// year to date >> monthly count and distance

export function getMonthlyTotals(activities) {
  const monthlyTotals = [
    { month: "Jan", count: 0, distance: 0 },
    { month: "Feb", count: 0, distance: 0 },
    { month: "Mar", count: 0, distance: 0 },
    { month: "Apr", count: 0, distance: 0 },
    { month: "May", count: 0, distance: 0 },
    { month: "Jun", count: 0, distance: 0 },
    { month: "Jul", count: 0, distance: 0 },
    { month: "Aug", count: 0, distance: 0 },
    { month: "Sep", count: 0, distance: 0 },
    { month: "Oct", count: 0, distance: 0 },
    { month: "Nov", count: 0, distance: 0 },
    { month: "Dec", count: 0, distance: 0 },
  ];
  for (let i = 0; i < activities.length; i++) {
    const activityMonth = Number(activities[i].start_date.slice(5, 7));
    monthlyTotals[activityMonth - 1].count++;
    monthlyTotals[activityMonth - 1].distance += // formatting distance here
      Number((activities[i].distance / 1000).toFixed(2));
  }
  return monthlyTotals;
}

// month to date >> weekly count and distance
// week to date >> daily count and distance

// get lastest 5 runs loop activities index 0 - 4
export function getLast5(activities) {
  const last5 = [];
  for (let i = 0; i < 5; i++) {
    last5.push(activities[i]);
  }
  return last5;
}
