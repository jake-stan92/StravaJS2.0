import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Graph from "./components/Graph";

import {
  getLast5,
  getAvgDistance,
  getAvgSpeed,
  getMonthlyTotals,
  getDailyTotal,
} from "./components/helpers.js";
import Last5RunsTable from "./components/Last5RunsTable.jsx";
import TopStatContainer from "./components/TopStatContainer.jsx";

function App() {
  const [runs, setRuns] = useState([]);
  const [last5, setLast5] = useState([]);
  // const [last5AvgDistance, setLast5AverageDistance] = useState(0);
  // const [last5AvgSpeed, setLast5AverageSpeed] = useState(0);
  // const [avgDistanceTotal, setAvgDistanceTotal] = useState(0);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [dailyTotals, setDailytotals] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  // state is not a variable!! try to refactor with just runs as state and pass to other comps

  useEffect(() => {
    const populateRuns = async () => {
      setLoadingState(true);
      const response = await fetch("https://stravajs2-0.onrender.com/"); // change to hosted name or setup in env
      const data = await response.json();
      setLoadingState(false);
      const runData = data.payload;
      const last5Data = getLast5(runData);
      setRuns(runData);
      // console.log(runData);
      setLast5(last5Data);
      // setAvgDistanceTotal(getAvgDistance(runData));
      setMonthlyTotals(getMonthlyTotals(runData));
      // setLast5AverageDistance(getAvgDistance(last5Data));
      // setLast5AverageSpeed(getAvgSpeed(last5Data));
      setDailytotals(getDailyTotal(runData));
    };
    populateRuns();
    return () => {};
  }, []);

  return (
    <>
      <Header />
      <div className="main">
        <TopStatContainer
          loadingState={loadingState}
          runs={runs}
          // last5AvgDistance={last5AvgDistance}
          // avgDistanceTotal={avgDistanceTotal}
          // last5AvgSpeed={last5AvgSpeed}
        />

        <div className="graph-collection">
          <Graph
            data={monthlyTotals}
            graphNum={1}
            time={"month"}
            title={"Monthly Total (km)"}
            lineGraph={true}
            state={monthlyTotals}
            loadingState={loadingState}
          />
          <Graph
            data={dailyTotals}
            graphNum={2}
            time={"day"}
            title={"Daily Total (km)"}
            lineGraph={false}
            state={dailyTotals}
            loadingState={loadingState}
          />
        </div>
        <div className="bottom-stat-collection">
          <Last5RunsTable data={last5} loadingState={loadingState} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
