import React from "react";
import LoadingIcon from "./LoadingIcon";
import "./OtherStats.css";

import { getAvgHeartRate, getHighestHR, getActivityLikes } from "./helpers";

const OtherStats = (props) => {
  const avgHeartRate = getAvgHeartRate(props.runs);
  const highestHR = getHighestHR(props.runs);
  const activityLikes = getActivityLikes(props.runs);
  return (
    <div className="other-stats">
      {!props.loadingState ? (
        <>
          <p className="subtitle">Other Stats</p>
          <div className="other-stat filled">
            <span className="circle"></span>
            <p>Average HR</p>
            <p>{String(avgHeartRate)} bpm</p>
          </div>
          <div className="other-stat">
            <span className="circle"></span>
            <p>Highest HR</p>
            <p>{String(highestHR)} bpm</p>
          </div>
          <div className="other-stat filled">
            <span className="circle"></span>
            <p>Most liked activity</p>
            <p>{activityLikes.mostLikes} Likes</p>
          </div>
          <div className="other-stat">
            <span className="circle"></span>
            <p>Total Likes</p>
            <p>{activityLikes.totalLikes}</p>
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
