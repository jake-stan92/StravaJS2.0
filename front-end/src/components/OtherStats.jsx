import React from "react";
import LoadingIcon from "./LoadingIcon";

const OtherStats = (props) => {
  return (
    <div className="other-stats">
      {!props.loadingState ? (
        <>
          <h3>Other Stats</h3>
          <div className="other-stat">
            <p>highest heartrate</p>
            <p>120</p>
          </div>
          <div className="other-stat">
            <p>most liked activity</p>
            <p>date & likes</p>
          </div>
          <div className="other-stat">
            <p>total likes</p>
            <p>13</p>
          </div>
          <div className="other-stat">
            <p>highest avg temp</p>
            <p>32</p>
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
