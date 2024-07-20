import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header.jsx";
import "../App.css";
import Footer from "../components/Footer";
import Graph from "../components/Graph";

import {
  filterActivitiesByType,
  getAccessToken,
  getAthlete,
  getAthleteActivities,
} from "../components/helpers.js";
import Last5RunsTable from "../components/Last5RunsTable.jsx";
import TopStatContainer from "../components/TopStatContainer.jsx";
import OtherStats from "../components/OtherStats.jsx";
import SliderToggle from "../components/SliderToggle.jsx";

function DisplayResults() {
  const [athlete, setAthlete] = useState({});
  const [allActivities, setAllActivities] = useState([]);
  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);
  const [currentlyDisplaying, setCurrentlyDisplaying] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  let stravaData = {};

  // state is not a variable!! try to refactor with just runs as state and pass to other comps

  // populate interface with run data as default
  // useEffect(() => {
  //   const getActivities = async () => {
  //     setLoadingState(true);
  //     const response = await fetch("https://stravajs2-0.onrender.com/"); // change to hosted name or setup in env
  //     // const response = await fetch("http://localhost:3000/");
  //     const data = await response.json();
  //     const activities = data.payload;
  //     const allRuns = filterActivitiesByType("Run", activities);
  //     setAllActivities(activities);
  //     setActivitiesToDisplay(allRuns);
  //     setLoadingState(false);
  //     setCurrentlyDisplaying("Runs");
  //   };
  //   getActivities();
  //   return () => {};
  // }, []);

  // define outside of use effect to avoid errors
  const bigAPICall = async () => {
    setLoadingState(true);
    // obtain access token for user
    const accessToken = await getAccessToken(state.code);
    if (accessToken) {
      stravaData = accessToken;
    } else {
      navigate("/error", {
        replace: true,
        state: {
          message: "Failed to get access token, please try again",
        },
      });
    }
    // obtain user data
    const athlete = await getAthlete(stravaData.accessToken);
    if (athlete) {
      setAthlete(athlete);
    } else {
      navigate("/error", {
        replace: true,
        state: {
          message: "Failed to get athlete data, please try again",
        },
      });
    }
    // obtain acitivities for auth user
    const activities = await getAthleteActivities(stravaData.accessToken);
    if (activities) {
      setAllActivities(activities);
    } else {
      navigate("/error", {
        replace: true,
        state: {
          message: "Failed to get athlete activities, please tick both boxes",
        },
      });
    }
    const allRuns = filterActivitiesByType("Run", activities);
    setActivitiesToDisplay(allRuns);
    setLoadingState(false);
    setCurrentlyDisplaying("Runs");
  };

  useEffect(() => {
    bigAPICall();
  }, []);

  const populateWalks = () => {
    const allWalks = filterActivitiesByType("Walk", allActivities);
    setActivitiesToDisplay(allWalks);
    setCurrentlyDisplaying("Walks");
  };

  const populateRuns = () => {
    const allRuns = filterActivitiesByType("Run", allActivities);
    setActivitiesToDisplay(allRuns);
    setCurrentlyDisplaying("Runs");
  };

  return (
    <>
      <Header />
      <div className="main">
        <TopStatContainer
          loadingState={loadingState}
          activities={activitiesToDisplay}
          currentlyDisplaying={currentlyDisplaying}
        />
        <SliderToggle
          populateRuns={populateRuns}
          populateWalks={populateWalks}
          loadingState={loadingState}
        />

        <div className="graph-collection">
          <Graph
            data={activitiesToDisplay}
            graphNum={1}
            time={"month"}
            title={"Monthly Total (km)"}
            lineGraph={true}
            loadingState={loadingState}
            currentlyDisplaying={currentlyDisplaying}
          />
          <Graph
            data={activitiesToDisplay}
            graphNum={2}
            time={"day"}
            title={"Daily Total (km)"}
            lineGraph={false}
            loadingState={loadingState}
          />
        </div>
        <div className="bottom-stat-collection">
          <Last5RunsTable
            loadingState={loadingState}
            activities={activitiesToDisplay}
            currentlyDisplaying={currentlyDisplaying}
          />
          <OtherStats
            loadingState={loadingState}
            activities={activitiesToDisplay}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DisplayResults;
