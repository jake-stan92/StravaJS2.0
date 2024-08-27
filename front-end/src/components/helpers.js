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

// function populateSelect(weekNum) {
//   const options = [];
//   const currentYear = new Date().getFullYear();
//   for (let i = 0; i < weekNum; i++) {
//     const weekStart = new Date(
//       weeklyDates(getDateOfWeek(i + 1, currentYear))[0]
//     );
//     const weekEnd = new Date(weeklyDates(getDateOfWeek(i + 1, currentYear))[6]);
//     options.push(
//       `Week ${
//         i + 1
//       } = ${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`
//     );
//   }
//   return options;
// }

export const getAthlete = async (token) => {
  const response = await fetch(`https://www.strava.com/api/v3/athlete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response);
  if (response.ok) {
    const data = await response.json();
    const athlete = {
      firstName: data.firstname,
      lastName: data.lastname,
    };
    // console.log("athlete data obtained:");
    // console.log(data);
    return athlete;
  } else {
    return null;
  }
};

// need to filter by year here - currently returning all activities ever!
export const getAthleteActivities = async (token) => {
  //get current year
  const date = new Date();
  const currentYear = date.getFullYear();
  let filteredDataByYear = [];

  const response = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?per_page=200`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    // console.log(response);
    const data = await response.json();
    data.map((activity) => {
      const activityDate = new Date(activity.start_date);
      const activityYear = activityDate.getFullYear();
      if (activityYear === currentYear) {
        filteredDataByYear.push(activity);
      }
    });
    // console.log("activity data obtained:");
    // console.log(data);
    return filteredDataByYear;
  } else {
    return null;
  }
};

export const getAccessToken = async (code) => {
  // work on error page here in case they untick the private box on strava auth page -- DONE
  const response = await fetch(
    `https://www.strava.com/oauth/token?client_id=113640&client_secret=d743f84535dd4b63545fb9cd24dca659a4201caf&code=${code}&grant_type=authorization_code`,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    //   navigate("/error");
    return null;
  } else {
    const data = await response.json();
    // console.log(data);
    const stravaData = {
      expiresAt: data.expires_at,
      refreshToken: data.refresh_token,
      accessToken: data.access_token,
    };
    return stravaData;
    // console.log(stravaData.accessToken);
  }
};
