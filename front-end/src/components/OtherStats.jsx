import React from "react";
import LoadingIcon from "./LoadingIcon";
import "./OtherStats.css";

import { getAvgHeartRate } from "./helpers";

const OtherStats = (props) => {
  const avgHeartRate = getAvgHeartRate(props.runs);
  return (
    <div className="other-stats">
      {!props.loadingState ? (
        <>
          <h3>Other Stats</h3>
          <div className="other-stat">
            <p>Average HR</p>
            <p>{String(avgHeartRate)}</p>
          </div>
          <div className="other-stat">
            <p>Highest HR</p>
            <p>32</p>
          </div>
          <div className="other-stat">
            <p>most liked activity</p>
            <p>date & likes</p>
          </div>
          <div className="other-stat">
            <p>total likes</p>
            <p>13</p>
          </div>
        </>
      ) : (
        <div className="other-stat-loading">
          <LoadingIcon />
        </div>
      )}
    </div>
  );
};

export default OtherStats;
