// total runs is sorted on page load

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
  // console.log(currentDate);
  const thisWeeksDates = weeklyDates(currentDate);
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
  return avgHeartRate.toFixed(2);
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
  return highestHR;
}

// next stats
// run.average_heartrate 157.2
// run.kudos_count 1 === most liked and total likes
// run.max_heartrate 179
// .max_speed

export function weeklyDates(currentDate) {
  // return dates of the week for a given day
  const week = [];
  // Starting Monday not Sunday
  currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
  for (let i = 0; i < 7; i++) {
    let date = new Date(currentDate);
    week.push(date.toDateString());
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return week;
}

// const thisWeek = weeklyDates(new Date());
// const testDate = new Date("2024-04-06T17:25:36Z").toDateString("en-uk");

// returns the week number for a given date
export function getWeekNum(date) {
  const currentDate = new Date(date);
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil(days / 7);

  return weekNumber;
}

// console.log(calculateWeekNum(new Date()));

// console.log(weeklyDates(new Date(2022, 6, 21)));

function getDateOfWeek(w, y) {
  let date = new Date(y, 0, 1 + (w - 1) * 7);
  date.setDate(date.getDate() + (1 - date.getDay())); // 0 - Sunday, 1 - Monday etc
  return date;
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
