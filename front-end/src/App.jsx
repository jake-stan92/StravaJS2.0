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
      console.log(allRuns);
      // console.log(allWalks);
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

  return (
    <>
      <Header />
      <div className="main">
        <TopStatContainer
          loadingState={loadingState}
          activities={activitiesToDisplay}
          currentlyDisplaying={currentlyDisplaying}
        />
        <button onClick={populateWalks}>Set Walks</button>
        <button onClick={populateRuns}>Set Runs</button>

        {/* <div className="test-div">
          {activitiesToDisplay.map((activity) => {
            return <p>{activity.type}</p>;
          })}
        </div> */}

        <div className="graph-collection">
          <Graph
            data={activitiesToDisplay}
            graphNum={1}
            time={"month"}
            title={"Monthly Total (km)"}
            lineGraph={true}
            // state={monthlyTotals}
            loadingState={loadingState}
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
