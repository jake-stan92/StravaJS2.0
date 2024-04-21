import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Graph from "./components/Graph";

import {
  getMonthlyTotals,
  getDailyTotal,
  filterActivitiesByType,
} from "./components/helpers.js";
import Last5RunsTable from "./components/Last5RunsTable.jsx";
import TopStatContainer from "./components/TopStatContainer.jsx";
import OtherStats from "./components/OtherStats.jsx";
import SliderToggle from "./components/SliderToggle.jsx";

function App() {
  const [allActivities, setAllActivities] = useState([]);
  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);
  const [currentlyDisplaying, setCurrentlyDisplaying] = useState("");
  // const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [dailyTotals, setDailytotals] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  // state is not a variable!! try to refactor with just runs as state and pass to other comps

  // populate interface with run data as default
  useEffect(() => {
    const getActivities = async () => {
      setLoadingState(true);
      // const response = await fetch("https://stravajs2-0.onrender.com/"); // change to hosted name or setup in env
      const response = await fetch("http://localhost:3000/");
      const data = await response.json();
      const activities = data.payload;
      const allRuns = filterActivitiesByType("Run", activities);
      // const allWalks = filterActivitiesByType("Walk", allActivities);
      setAllActivities(activities);
      setActivitiesToDisplay(allRuns);
      // setMonthlyTotals(getMonthlyTotals(allRuns));
      setDailytotals(getDailyTotal(allRuns));
      setLoadingState(false);
      setCurrentlyDisplaying("Runs");
      // console.log(runData);
      // console.log(allRuns);
    };
    getActivities();
    return () => {};
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

  // const handleToggle = (e) => {
  //   if (e.target.value === "on") {
  //     e.target.value = "off";
  //     populateWalks();
  //   } else if (e.target.value === "off") {
  //     e.target.value = "on";
  //     populateRuns();
  //   }

  //   console.log(e.target.value);
  // };

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
            // state={monthlyTotals}
            loadingState={loadingState}
            currentlyDisplaying={currentlyDisplaying}
          />
          <Graph
            data={activitiesToDisplay}
            graphNum={2}
            time={"day"}
            title={"Daily Total (km)"}
            lineGraph={false}
            // state={dailyTotals}
            loadingState={loadingState}
          />
        </div>
        {/* <div className="bottom-stat-collection">
          <Last5RunsTable loadingState={loadingState} runs={runs} />
          <OtherStats loadingState={loadingState} runs={runs} />
        </div> */}
      </div>
      <Footer />
    </>
  );
}

export default App;
