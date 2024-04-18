import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Graph from "./components/Graph";

import { getMonthlyTotals, getDailyTotal } from "./components/helpers.js";
import Last5RunsTable from "./components/Last5RunsTable.jsx";
import TopStatContainer from "./components/TopStatContainer.jsx";
import OtherStats from "./components/OtherStats.jsx";

function App() {
  const [runs, setRuns] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [dailyTotals, setDailytotals] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  // state is not a variable!! try to refactor with just runs as state and pass to other comps

  useEffect(() => {
    const populateRuns = async () => {
      setLoadingState(true);
      const response = await fetch("https://stravajs2-0.onrender.com/"); // change to hosted name or setup in env
      // const response = await fetch("http://localhost:3000/");
      const data = await response.json();
      const runData = data.payload;
      setRuns(runData);
      setMonthlyTotals(getMonthlyTotals(runData));
      setDailytotals(getDailyTotal(runData));
      setLoadingState(false);
      console.log(runData);
    };
    populateRuns();
    return () => {};
  }, []);

  return (
    <>
      <Header />
      <div className="main">
        <TopStatContainer loadingState={loadingState} runs={runs} />

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
          <Last5RunsTable loadingState={loadingState} runs={runs} />
          <OtherStats loadingState={loadingState} runs={runs} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
