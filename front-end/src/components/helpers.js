// filter activity by type (run vs walk)
export function filterActivitiesByType(type, activities) {
  const filteredActivities = [];

  activities.map((activity) => {
    if (activity.type === type) {
      filteredActivities.push(activity);
    }
  });
  return filteredActivities;
}

// total distance
export function getTotalDistance(activities) {
  let total = 0;
  activities.map((activity) => {
    total += activity.distance;
  });
  const totalKM = total / 1000;
  return totalKM.toFixed(2);
}

// avg distance
export function getAvgDistance(activities) {
  let total = 0;
  activities.map((activity) => {
    total += activity.distance;
  });
  const totalKM = total / 1000;
  const averageDistance = (totalKM / activities.length).toFixed(2);
  return Number(averageDistance);
}

// avg speed
export function getAvgSpeed(activities) {
  let total = 0;
  activities.map((run) => {
    total += run.average_speed;
  });
  const average = total / activities.length;
  const kiloPerHour = (average * 3.6).toFixed(2); // Convert S.I (m/s) units to KMH -- https://www.reddit.com/r/Strava/comments/pxbqql/strava_api_what_are_the_activitys_speed_fields/
  return Number(kiloPerHour);
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
export function getDailyTotal(activities) {
  const currentDate = new Date(); // alter date here for weekly graph, default current week ( 2024, 1, 28 )
  const thisWeeksDates = weeklyDates(currentDate);
  // console.log(thisWeeksDates);
  const dailyTotals = [
    {
      day: "Mon",
      count: 0,
      distance: 0,
    },
    {
      day: "Tue",
      count: 0,
      distance: 0,
    },
    {
      day: "Wed",
      count: 0,
      distance: 0,
    },
    {
      day: "Thu",
      count: 0,
      distance: 0,
    },
    {
      day: "Fri",
      count: 0,
      distance: 0,
    },
    {
      day: "Sat",
      count: 0,
      distance: 0,
    },
    {
      day: "Sun",
      count: 0,
      distance: 0,
    },
  ]; // sun 0 monday 1 tue 2
  for (let i = 0; i < activities.length; i++) {
    const activityDate = new Date(activities[i].start_date);
    const formattedDate = activityDate.toDateString("en-uk");
    if (thisWeeksDates.includes(formattedDate)) {
      let dayOfActivity = Number(activityDate.getDay()); // 0-6 index monday 0
      if (dayOfActivity === 0) {
        dayOfActivity = 7;
      }
      dailyTotals[dayOfActivity - 1].count++;
      dailyTotals[dayOfActivity - 1].distance += (
        activities[i].distance / 1000
      ).toFixed(2);
    }
  }
  return dailyTotals;
}

export function getAvgHeartRate(activities) {
  let avgHeartRate = 0;
  let totalHR = 0;
  activities.map((run) => {
    if (run.average_heartrate) {
      totalHR += run.average_heartrate;
    }
  });
  avgHeartRate = totalHR / activities.length;
  return Math.round(avgHeartRate);
}

export function getHighestHR(activities) {
  let highestHR = 0;
  activities.map((run) => {
    if (run.max_heartrate) {
      if (run.max_heartrate > highestHR) {
        highestHR = run.max_heartrate;
      }
    }
  });
  return Math.round(highestHR);
}

export function getActivityLikes(activities) {
  let totalLikes = 0;
  let mostLikedActvity = 0;
  activities.map((run) => {
    totalLikes += run.kudos_count;
    if (run.kudos_count > mostLikedActvity) {
      mostLikedActvity = run.kudos_count;
    }
  });
  return { mostLikes: mostLikedActvity, totalLikes: totalLikes };
}

function weeklyDates(currentDate) {
  const dates = [];
  const firstDayOfWeek = startOfWeek(currentDate);
  dates.push(firstDayOfWeek.toDateString());
  for (let i = 0; i < 6; i++) {
    const nextDay = new Date(
      firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1)
    );
    dates.push(nextDay.toDateString());
  }
  // console.log(dates);
  return dates;
}

// returns the week number for a given date
export function startOfWeek(date) {
  // Calculate the difference between the date's day of the month and its day of the week
  var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

  // Set the date to the start of the week by setting it to the calculated difference
  return new Date(date.setDate(diff));
}

function populateSelect(weekNum) {
  const options = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < weekNum; i++) {
    const weekStart = new Date(
      weeklyDates(getDateOfWeek(i + 1, currentYear))[0]
    );
    const weekEnd = new Date(weeklyDates(getDateOfWeek(i + 1, currentYear))[6]);
    options.push(
      `Week ${
        i + 1
      } = ${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`
    );
  }
  return options;
}
